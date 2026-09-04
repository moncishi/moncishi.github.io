## Sending images to develop-group

After generating any image (e.g. UI concept images via `tools/sensenova-img/`), deliver it to the fixed Lark group **develop-group**. Recipient never changes; do not re-search or re-confirm.

**Recipient (fixed):** group chat `oc_038fb08137e8b99b71c3fb86758a2b33`, send as bot identity.

**Workflow (from repo root):**

```bash
# 1. Stage images — lark-cli requires cwd-relative paths, rejects absolute
mkdir -p .lark-send
cp <image1> <image2> .lark-send/

# 2. Send each image (one message per image)
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 lark-cli im +messages-send --as bot \
  --chat-id oc_038fb08137e8b99b71c3fb86758a2b33 \
  --image ./.lark-send/<name>.png

# 3. Send caption (separate message; --image and --text are mutually exclusive)
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 lark-cli im +messages-send --as bot \
  --chat-id oc_038fb08137e8b99b71c3fb86758a2b33 \
  --text $'caption line 1\ncaption line 2'

# 4. Clean up so generated images never get committed
rm -rf .lark-send
```

**Gotchas:**
- Use **bot** identity (`--as bot`), never user (user token is expired).
- Image paths must be **cwd-relative**; copy into `.lark-send/` first.
- Send each image and the caption as **separate messages**.
- Delete `.lark-send/` after sending.


## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Agent skills

### Issue tracker

Issues, specs, and tickets live as GitHub issues, operated via the `gh` CLI once the repo has a GitHub remote. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles use their default label strings: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: one `CONTEXT.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.
