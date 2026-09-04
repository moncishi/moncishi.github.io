# sensenova-img — SenseNova (日日新) 图像生成 / 编辑 CLI

纯 Python 标准库实现的命令行工具，封装 SenseNova 图像 API（模型 `sensenova-u1.5-lite`）。
无需安装任何第三方依赖，`python3` 直接运行。

A dependency-light Python CLI wrapping the SenseNova image API (`sensenova-u1.5-lite`).
**Stdlib only — no `pip install` needed.**

## 用途 / Purpose

- **UI 设计前的概念图预览（design preview）**：在动手写 Astro/前端 UI 之前，先生成设计风格概念图，对齐视觉方向。
- **通用文生图 / 图生图编辑**：日常生成配图、按参考图编辑图片。

Generate concept images *before* building UI, plus general text-to-image / image editing.

## 安装 / Install

无需安装（No installation required）。仓库内即用：

```sh
cd tools/sensenova-img
python3 sensenova_img.py --help
```

## 环境变量 / Environment

请求需要 Bearer 密钥，从环境变量读取（必填；缺失时命令会给出清晰提示并以退出码 1 结束）：

```sh
export SENSENOVA_API_KEY='你的密钥'     # Linux / macOS (bash / zsh)
setx SENSENOVA_API_KEY "你的密钥"       # Windows (cmd)
```

密钥在 SenseNova 开放平台控制台申请。*Obtain the key from the SenseNova console.*

## 子命令一：generate — 文生图 / text-to-image

```sh
python3 sensenova_img.py generate "一只海獭宝宝漂浮在平静海面上，柔和晨光，写实摄影风格"
```

常用参数 / common flags（`--help` 可查看全部）：

```sh
python3 sensenova_img.py generate "一句话描述你的概念图" \
  --model sensenova-u1.5-lite \   # 默认即此模型 / this is the default
  --size 1024x1024 \              # 默认 auto；见下方尺寸说明
  --no-watermark \                # 去掉水印（见“水印说明”）
  --format webp \                 # png | jpeg | webp，默认 png
  --url \                         # 返回临时 URL 而非 base64（约 24h 失效）
  --no-extend \                   # 关闭自动润色 prompt
  --out output \                  # 输出目录，默认 ./output，自动创建
  --name hero_sea_otter           # 输出文件名前缀
```

## 子命令二：edit — 图生图 / image edit

必须提供至少一张参考图 `--image`（可重复，第一张为主编辑目标）。`--image` 接受**公开 http(s) 图片 URL** 或 **base64 Data-URL**（前缀 `data:image/*;base64,`）。同步返回，无需轮询。

```sh
python3 sensenova_img.py edit "把背景改成雪山，人物保持不变" \
  --image "https://example.com/portrait.jpg"
```

多参考图 / multiple references：

```sh
python3 sensenova_img.py edit "把人物换到第 2 张图的场景里" \
  --image "https://example.com/person.jpg" \
  --image "https://example.com/mountain-scene.jpg"
```

`edit` 支持与 `generate` 相同的可选参数（`--size` / `--no-watermark` / `--format` / `--url` / `--no-extend` / `--out` / `--name`）。

## 尺寸说明 / size

- `--size` 默认 `auto`，交给服务端决定。
- 支持 `1024x1024`、`2048x2048`、`4096x4096`、`2720x1536`、`1536x2720`、`1664x2496`、`2496x1664` 等；也可传 `WxH` 自定义。
- 本地仅做轻量合法性检查（**不**过度校验）：宽高须为 32 的倍数、范围 512–4096、长宽比 ≤ 3:1（或 1:3）。其余由服务端裁决。

## 请求字段语义 / field semantics

每次请求都会**显式发送以下全部字段**（不做任何省略，避免服务端默认值悄悄变化）：

| 字段 | 取值 | 说明 |
|---|---|---|
| `model` | `sensenova-u1.5-lite`（默认） | 可用 `--model` 覆盖 |
| `prompt` | string（必填） | generate=画面描述；edit=编辑指令 |
| `n` | 恒为 `1` | API 仅支持 1 张 |
| `size` | `auto` 或 `WxH` | 见“尺寸说明” |
| `watermark` | `true` / `false` | **始终显式发送**；`--no-watermark` → `false` |
| `output_format` | `png` / `jpeg` / `webp` | `--format`，默认 `png` |
| `response_format` | `b64_json` / `url` | 默认 `b64_json`；`--url` → `url` |
| `prompt_extend` | `true` / `false` | 默认开启自动润色 prompt；`--no-extend` 关闭 |

## 水印 / watermark ⚠️

- 默认 `watermark=true`（带水印）。
- `--no-watermark` 会将 `watermark=false`（当前**免费 beta**，未来会转为收费功能——README 发布后请注意价格变更）。
- 无论开或关，`watermark` 字段都会**显式发送**，不依赖服务端默认值。

`watermark=false` is a **free beta today, but will become a paid feature** — mind future pricing.

## response_format 与输出 / output & `--url` 行为

- 默认 `b64_json`：图片解码后保存到 `--out/<name>[_NN].<ext>`（`.jpeg` 存为 `.jpg`），并打印保存路径；同一次返回多张时文件名带 `_01/_02` 序号。同时在 `--out/.sensenova_cache/` 下保存本次请求的 `.request.json`（便于复现/排查，不含密钥）。
- `--url`：**不下载图片**，把返回的临时 URL 写入同目录 `<name>.url.txt` 与 `<name>.url.md` 侧车文件留档。
- ⚠️ **URL 是临时链接，约 24 小时后失效**（expire ~24h）。需要长期使用请用默认 b64 模式保存原图，或在失效前下载。

## 退出码 / exit codes

- `0` 成功；`1` 错误（缺少密钥、prompt 为空、edit 无 `--image`、HTTP/网络失败等——均输出到 stderr）。
- 非 2xx 时尝试读取响应体并展示其中的结构化 `message`（若有）。
- 请求超时上限 300s（生成大图可能较慢）。

## 错误信息 / errors（示例）

```text
[sensenova-img] error: 环境变量 SENSENOVA_API_KEY 未设置 (env var SENSENOVA_API_KEY is not set).
```

## 说明 / notes

- 本工具**纯标准库**：`argparse` + `urllib`，无 `requests` / `openai` 依赖，随处可跑。
- `output/` 与 `.sensenova_cache/` 已被 `.gitignore` 忽略，不会误提交生成物。
- API 端点：`POST https://token.sensenova.cn/v1/images/generations`（generate）、`POST https://token.sensenova.cn/v1/images/edits`（edit）。
