---
title: Cursor MCP layout on this machine
tags:
  - cursor
  - mcp
created: 2026-08-20
updated: 2026-08-20
status: active
type: reference
layer: library
ctx_session: cursor c7b93dca (PR #38); 94d56f6d GitHub plugin
---

# Cursor MCP layout

## Judgment

| Need | Where |
|------|--------|
| filesystem / memory / Codex Sol·Terra·Luna | Global `%USERPROFILE%\.cursor\mcp.json` from cursorsetup `mcp.template.json` |
| GitHub for agents | **Cursor GitHub plugin**, not a second `github` server in `mcp.json` |
| excel / playwright / extra GitHub PAT MCP | cursorsetup `mcp.optional.json` only if asked |
| Same server name in project and global | **Project** `.cursor/mcp.json` wins |

Codex CLI does not read Cursor `mcp.json`. Codex MCP lives in `%USERPROFILE%\.codex\config.toml` (`install.ps1 -InstallCodex`).

Context7 was removed from the default template. Do not add it back without a new reason.

Secrets stay in local gitignored files. Templates keep placeholders.

## Related

- [github-plugin-mcp.md](github-plugin-mcp.md)
- cursorsetup `mcp/README.md`
