#!/usr/bin/env python3
"""
sensenova_img.py — SenseNova (日日新) image generation / editing CLI.

Stdlib-only wrapper around the SenseNova API (base https://token.sensenova.cn):

  * POST /v1/images/generations  -> text-to-image  (model sensenova-u1.5-lite)
  * POST /v1/images/edits        -> reference + prompt image edit (sync)

Purpose: generate concept / design-preview images BEFORE building UI, plus
general image generation & editing. No third-party dependencies — pure stdlib.

Environment: SENSENOVA_API_KEY must be set (Bearer token). Every documented
request field is always sent explicitly (watermark in particular, so behaviour
never depends on silently changing server defaults).

Exit codes: 0 on success, 1 on any error.
"""

import argparse
import base64
import json
import mimetypes
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

API_BASE = "https://token.sensenova.cn"
GENERATIONS_URL = API_BASE + "/v1/images/generations"
EDITS_URL = API_BASE + "/v1/images/edits"

DEFAULT_MODEL = "sensenova-u1.5-lite"
DEFAULT_OUTPUT_DIR = "output"
CACHE_DIR_NAME = ".sensenova_cache"

MIN_DIM, MAX_DIM = 512, 4096   # width/height must be multiples of 32, in range
MAX_ASPECT = 3.0               # aspect ratio <= 3:1 (or reciprocal 1:3)

HTTP_TIMEOUT_SECONDS = 300     # generation may take minutes; allow a long read

# ---------------------------------------------------------------------------
# Terminal helpers (utf-8 safe so CJK output never crashes the script)
# ---------------------------------------------------------------------------

class _Stream:
    def __init__(self, stream):
        self.stream = stream

    def write(self, text):
        try:
            self.stream.write(text + "\n")
            self.stream.flush()
        except UnicodeEncodeError:  # pragma: no cover - exotic terminal encoding
            self.stream.write(
                text.encode("ascii", "backslashreplace").decode("ascii") + "\n")
            self.stream.flush()


out = _Stream(sys.stdout)
err = _Stream(sys.stderr)


def die(message, code=1):
    """Print a clear error to stderr and exit nonzero."""
    err.write("[sensenova-img] error: " + message)
    sys.exit(code)


# ---------------------------------------------------------------------------
# Small helpers
# ---------------------------------------------------------------------------

def get_api_key():
    """Read SENSENOVA_API_KEY; die with setup guidance if missing."""
    key = (os.environ.get("SENSENOVA_API_KEY") or "").strip()
    if not key:
        die(
            "环境变量 SENSENOVA_API_KEY 未设置 (env var SENSENOVA_API_KEY is not set).\n"
            "  请先在 Shell 中设置密钥 (export it in your shell first):\n"
            "    export SENSENOVA_API_KEY='你的密钥'    # Linux / macOS (bash/zsh)\n"
            "    setx SENSENOVA_API_KEY \"你的密钥\"     # Windows (cmd)\n"
            "  密钥在 SenseNova 控制台申请 (obtain it from the SenseNova console)."
        )
    return key


def utc_now():
    return datetime.now(timezone.utc)


def human_time(ts):
    """Format a unix timestamp (or ISO string) for display, UTC."""
    if ts is None:
        return "unknown"
    try:
        return datetime.fromtimestamp(int(ts), tz=timezone.utc).strftime(
            "%Y-%m-%d %H:%M:%S UTC")
    except (OSError, ValueError, OverflowError, TypeError):
        return "unknown"


def safe_name(name, fallback_prefix):
    """
    Turn a user-supplied --name into a safe file stem: strip path separators
    and leading dots (no traversal). Fall back to '<prefix>_<UTC-stamp>'.
    """
    if name:
        cleaned = "".join(c for c in name if c not in "/\\").strip().strip(".")
        if cleaned:
            return cleaned
    return "%s_%s" % (fallback_prefix, utc_now().strftime("%Y%m%d_%H%M%S"))


def check_size(value):
    """
    Sanity-check a size token like '1024x1024' (do NOT over-validate).

    Rules: two ints separated by 'x'; each a multiple of 32 within
    [MIN_DIM, MAX_DIM]; aspect ratio <= MAX_ASPECT (or its reciprocal).
    'auto' and any token passing these checks are accepted; the rest is the
    server's business. Returns None for 'auto'/failure, else (w, h).
    """
    s = (value or "").strip().lower()
    if s == "auto":
        return None
    parts = s.split("x")
    if len(parts) != 2:
        return None
    try:
        w, h = int(parts[0]), int(parts[1])
    except ValueError:
        return None
    if not (MIN_DIM <= w <= MAX_DIM and MIN_DIM <= h <= MAX_DIM):
        return None
    if w % 32 != 0 or h % 32 != 0:
        return None
    ratio = w / float(h)
    if ratio > MAX_ASPECT or ratio < 1.0 / MAX_ASPECT:
        return None
    return w, h


def size_arg_type(value):
    """argparse type= hook: accept 'auto' or a geometrically valid token."""
    if (value or "").strip().lower() != "auto" and check_size(value) is None:
        raise argparse.ArgumentTypeError(
            "invalid size %r — expect 'auto' or WxH like 1024x1024 "
            "(multiples of 32, 512..4096, aspect <= 3:1 or 1:3)" % value)
    return value


# ---------------------------------------------------------------------------
# HTTP
# ---------------------------------------------------------------------------

class ApiError(Exception):
    """Raised for any transport / API-level failure (message already human)."""


def post_json(url, payload, api_key, timeout=HTTP_TIMEOUT_SECONDS):
    """
    POST JSON to url with Bearer auth. Return parsed JSON on 2xx; on error,
    surface the structured `message` from the API body when present.
    """
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"),
                                 method="POST")
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json")
    req.add_header("Authorization", "Bearer " + api_key)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = ""
        try:
            parsed = json.loads(e.read().decode("utf-8"))
            detail = (parsed.get("message")
                      or (parsed.get("error") or {}).get("message")
                      or json.dumps(parsed, ensure_ascii=False))
        except Exception:
            pass
        raise ApiError("HTTP %d %s — %s" % (e.code, e.reason, detail)
                       if detail else "HTTP %d %s" % (e.code, e.reason))
    except urllib.error.URLError as e:
        raise ApiError("cannot reach %s: %s" % (url, e.reason))
    except TimeoutError:
        raise ApiError("request timed out after %ds (%s)" % (timeout, url))
    except json.JSONDecodeError:
        raise ApiError("server returned a non-JSON response from %s" % url)


# ---------------------------------------------------------------------------
# Request construction
# ---------------------------------------------------------------------------

def build_payload(args, with_images):
    """
    Common request JSON. Every documented field is always present:
    model / prompt / n / size / watermark / output_format / response_format /
    prompt_extend, plus images[] for the edits endpoint.
    """
    payload = {
        "model": args.model,
        "prompt": args.prompt,
        "n": 1,                                   # API only supports n=1
        "size": args.size,                        # 'auto' or validated token
        "watermark": not args.no_watermark,       # ALWAYS explicit (never omitted)
        "output_format": args.format,
        "response_format": "url" if args.url else "b64_json",
        "prompt_extend": not args.no_extend,
    }
    if with_images:
        # list of objects; first entry is the primary edit target.
        # Local file paths are auto-converted to data URLs; public URLs and
        # already-prefixed data URLs pass through unchanged.
        payload["images"] = [{"image_url": to_image_url(u)}
                             for u in (args.images or [])]
    return payload


def to_image_url(value):
    """
    Accept an edit input and normalise it to something the API accepts:
      * local file path  -> file:///…/x.png  read as bytes -> data:image/<mime>;base64,…
      * public http(s) URL / data:image/*;base64,…  -> passed through unchanged.
    Returns the normalised string. Raises SystemExit(1) on unreadable local file.
    """
    v = value.strip()
    if v.startswith("http://") or v.startswith("https://") or v.startswith("data:"):
        return v
    p = Path(v)
    if p.is_file():
        mime = mimetypes.guess_type(p.name)[0] or "application/octet-stream"
        b64 = base64.b64encode(p.read_bytes()).decode("ascii")
        return "data:%s;base64,%s" % (mime, b64)
    die("image input is not a readable local file, http(s) URL, or data URL: %s"
        % value)


def cache_payload(out_dir, stem, payload):
    """
    Write a copy of the exact request payload into .sensenova_cache/ next to
    the output dir (handy for debugging / re-runs; contains no secrets).
    """
    cache_dir = Path(out_dir) / CACHE_DIR_NAME
    cache_dir.mkdir(parents=True, exist_ok=True)
    cache_file = cache_dir / (stem + ".request.json")
    cache_file.write_text(json.dumps(payload, ensure_ascii=False, indent=2),
                          encoding="utf-8")
    return cache_file


# ---------------------------------------------------------------------------
# Response handling / saving (shared by generate & edit)
# ---------------------------------------------------------------------------

def save_results(resp_json, args, out_dir, stem, created):
    """
    Persist results and print a human-readable summary.

    b64_json mode -> decode each image into --out/<stem>[_NN].<ext>, plus a
                     .request.json cache copy.
    url mode      -> nothing image-like to save; write the temp URL into
                     <stem>.url.txt and <stem>.url.md sidecars (URL dies ~24h).
    """
    items = resp_json.get("data") or []
    if not items:
        die("response contained no image data: %s"
            % json.dumps(resp_json, ensure_ascii=False)[:500])

    out_path = Path(out_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    if args.url:
        # --- remote URL mode: persist the links in sidecars, nothing to decode.
        lines_txt = ["# sensenova-img result URL(s)", ""]
        lines_md = ["# sensenova-img result URL(s)", "",
                    "> ⚠️ URL 为临时链接，约 24 小时后失效 (temp links expire ~24h).", ""]
        for i, item in enumerate(items, 1):
            u = item.get("url")
            if not u:
                die("response_format=url but item %d has no 'url' field" % i)
            lines_txt.append("%d. %s" % (i, u))
            lines_md.append("%d. %s" % (i, u))
        txt_file = out_path / (stem + ".url.txt")
        md_file = out_path / (stem + ".url.md")
        txt_file.write_text("\n".join(lines_txt) + "\n", encoding="utf-8")
        md_file.write_text("\n".join(lines_md) + "\n", encoding="utf-8")
        saved = []
        extra = "url file: %s" % txt_file
    else:
        # --- base64 mode: decode and write image files.
        ext = {"png": "png", "jpeg": "jpg", "webp": "webp"}[args.format]
        saved = []
        for i, item in enumerate(items, 1):
            b64 = item.get("b64_json")
            if not b64:
                die("response_format=b64_json but item %d has no 'b64_json'" % i)
            suffix = "" if len(items) == 1 else "_%02d" % i
            f = out_path / ("%s%s.%s" % (stem, suffix, ext))
            f.write_bytes(base64.b64decode(b64))
            saved.append(f)
        payload = build_payload(args, with_images=bool(getattr(args, "images", None)))
        cache = cache_payload(out_path, stem, payload)
        extra = "request cache: %s" % cache

    # --- human-readable summary to stdout.
    endpoint = "edits" if getattr(args, "images", None) else "generations"
    out.write("-" * 62)
    out.write("SUCCESS / 成功  —  %s (%s)" % (endpoint, args.model))
    out.write("created : %s" % human_time(created))
    out.write("size    : %s" % args.size)
    out.write("watermark : %s" % ("true" if not args.no_watermark
                                  else "false (free beta)"))
    out.write("prompt_extend : %s" % ("true" if not args.no_extend else "false"))
    out.write("format  : %s (%s)" % (args.format,
                                     "url" if args.url else "b64_json -> file"))
    if saved:
        out.write("saved   :")
        for f in saved:
            out.write("          %s  (%d bytes)" % (f, f.stat().st_size))
    out.write(extra)
    out.write("-" * 62)


# ---------------------------------------------------------------------------
# Subcommands
# ---------------------------------------------------------------------------

def run_generate(args):
    """POST /v1/images/generations — text-to-image."""
    payload = build_payload(args, with_images=False)
    out.write("[sensenova-img] generating image (%s, size=%s) ..."
              % (args.model, args.size))
    resp = post_json(GENERATIONS_URL, payload, get_api_key())
    created = resp.get("created") or int(time.time())
    stem = safe_name(args.name, "gen")
    save_results(resp, args, Path(args.out), stem, created)


def run_edit(args):
    """POST /v1/images/edits — image edit (reference image(s) + prompt)."""
    if not args.images:
        die("edit requires at least one --image (reference image)")
    payload = build_payload(args, with_images=True)
    out.write("[sensenova-img] editing image (%s, refs=%d) ..."
              % (args.model, len(args.images)))
    resp = post_json(EDITS_URL, payload, get_api_key())
    created = resp.get("created") or int(time.time())
    stem = safe_name(args.name, "edit")
    save_results(resp, args, Path(args.out), stem, created)


# ---------------------------------------------------------------------------
# argparse
# ---------------------------------------------------------------------------

def add_common_flags(p, sub):
    """Flags shared by generate & edit (identical semantics)."""
    p.add_argument("--model", default=DEFAULT_MODEL,
                   help="模型 / model (default: %s)" % DEFAULT_MODEL)
    p.add_argument("--size", default="auto", type=size_arg_type,
                   help="size token, 'auto' (default) or WxH such as "
                        "1024x1024 / 2048x2048 / 4096x4096 / 2720x1536 / "
                        "1536x2720 / 1664x2496 / 2496x1664. Geometric check "
                        "only: multiples of 32, 512..4096, aspect <=3:1/1:3.")
    p.add_argument("--no-watermark", action="store_true",
                   help="watermark=false (no watermark). NOTE: watermark-free "
                        "is currently a free beta but will become paid; "
                        "'watermark' is ALWAYS sent explicitly regardless.")
    p.add_argument("--format", choices=["png", "jpeg", "webp"], default="png",
                   help="输出图片格式 / output image format (default: png)")
    p.add_argument("--url", action="store_true",
                   help="return images as temp URLs (response_format=url, "
                        "expire ~24h) instead of base64. URLs are also logged "
                        "to <name>.url.txt / <name>.url.md sidecars.")
    p.add_argument("--no-extend", action="store_true",
                   help="prompt_extend=false — disable automatic prompt "
                        "polish (default: true).")
    p.add_argument("--out", default=DEFAULT_OUTPUT_DIR,
                   help="输出目录 / output dir (default: %s)"
                        % DEFAULT_OUTPUT_DIR)
    p.add_argument("--name", default=None,
                   help="输出文件名前缀 / output file name prefix "
                        "(default: %s_<UTC timestamp>)" % sub)


def build_parser():
    parser = argparse.ArgumentParser(
        prog="sensenova_img.py",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description=(
            "SenseNova (日日新) 图像生成 / 编辑 CLI — 纯标准库实现，无需安装依赖。\n"
            "用途: UI 设计前的概念图预览 (design preview) + 通用文生图 / 图生图。\n"
            "\n"
            "SenseNova image generation / editing CLI — stdlib only. Use it to\n"
            "produce concept images before building UI, and for general image\n"
            "generation & editing.\n"
            "\n"
            "需要环境变量 / requires: SENSENOVA_API_KEY  (Bearer token)\n"
            "API base: %s" % API_BASE),
        epilog="退出码 / exit codes: 0 success, 1 error.",
    )
    sub = parser.add_subparsers(dest="subcommand", required=True,
                                metavar="{generate,edit}")

    p_gen = sub.add_parser(
        "generate",
        help="文生图 / text-to-image",
        description="文生图 / text-to-image — 根据描述生成图片。\n"
                    "POST %s" % GENERATIONS_URL,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p_gen.add_argument("prompt", help="图像描述 / prompt (REQUIRED)")
    add_common_flags(p_gen, "gen")
    p_gen.set_defaults(func=run_generate)

    p_edit = sub.add_parser(
        "edit",
        help="图生图 / image edit (reference + prompt)",
        description="图生图 / image edit — 传入至少一张参考图并按指令编辑；"
                    "第一张为主编辑目标。\n"
                    "POST %s" % EDITS_URL,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p_edit.add_argument("prompt", help="编辑指令 / edit instruction (REQUIRED)")
    add_common_flags(p_edit, "edit")
    p_edit.add_argument(
        "--image", action="append", default=None, dest="images",
        metavar="URL-OR-DATAURL",
        help="参考图 / reference image — 可重复。接受公开 http(s) 图片 URL 或 "
             "base64 Data-URL (data:image/*;base64,...)。第一张 = 主编辑目标。"
             "edit 子命令必填。")
    p_edit.set_defaults(func=run_edit)

    return parser


def main(argv=None):
    args = build_parser().parse_args(argv)

    # prompt required & non-empty after strip
    prompt = (args.prompt or "").strip()
    if not prompt:
        die("prompt is required and must not be empty — "
            "sensenova_img.py %s '<描述/instruction>'" % args.subcommand)
    args.prompt = prompt

    args.func(args)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except ApiError as exc:
        err.write("[sensenova-img] API error: %s" % exc)
        sys.exit(1)
    except KeyboardInterrupt:
        err.write("[sensenova-img] interrupted")
        sys.exit(130)
    except BrokenPipeError:  # downstream closed stdout (e.g. `| head`)
        sys.exit(0)
