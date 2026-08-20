---
title: Cursor GitHub plugin MCP auth
tags:
  - github
  - cursor
  - mcp
created: 2026-08-20
updated: 2026-08-20
status: active
type: reference
layer: library
ctx_session: cursor 94d56f6d; follow-up dac75190 (get_me OK, PR 403)
---

# Cursor GitHub plugin MCP

## Judgment

Use the **Cursor GitHub plugin** (`plugin-github-github`), not a second GitHub server in `~/.cursor/mcp.json`. GitHub in cursorsetup `mcp.optional.json` is optional; the plugin is the default on this machine.

Do not mix PAT and OAuth on that plugin.

- The plugin always sends `Authorization: Bearer ${PAT}` to `https://api.githubcopilot.com/mcp/`.
- If that header is present and GitHub returns 401, Cursor logs `OAuth fallback failed after MCP server returned 401 for configured Authorization header`. Browser Authorize never starts. Gmail can OAuth on the same PC because it has no PAT header.
- Fine-grained tokens (`github_pat_`) often 401 here. Classic `ghp_` with `repo`, token body only (no `Bearer ` prefix), is the PAT path.
- OAuth path: clear the plugin PAT field, save, Logout, Reload. Then `mcp_auth` can open the consent window.

`mcp_auth` success and `ready` in Settings do not mean this chat can call `get_me`. After auth or plugin reinstall, **open a new agent chat**. The old conversation can keep a stale connection id and expose only `mcp_auth`.

`get_me` succeeding does not mean pull-request write works. A Copilot MCP PAT can list the user and still 403 on `create_pull_request` / `merge_pull_request` (`Resource not accessible by personal access token`). Then use `gh` with the keyring OAuth token (`gho_`, `repo` scope). Do not retry the plugin PR tools after that 403 in the same session.

A 401 in Settings means the token reached GitHub and was rejected, not that global `mcp.json` collided. Check the plugin PAT first.

## Out of scope

Do not commit PATs. Do not add GitHub credentials to cursorsetup.

## Related

- [ctx-recall.md](ctx-recall.md)
- cursorsetup `mcp/README.md`
