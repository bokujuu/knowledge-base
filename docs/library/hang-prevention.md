---
title: Non-interactive hangs
tags:
  - windows
  - excel
  - testing
created: 2026-07-03
updated: 2026-08-20
status: active
type: reference
layer: library
ctx_event: 10b16cb8, 471d2e42
---

# Non-interactive hangs

## Judgment

Windows `pause` in `.bat` and Excel VBA modal dialogs will stall an agent verify loop. Defense is: do not emit pause in agent CI, detect hang with a **watchdog on the output stream**, recover with a wall-clock timeout.

Watchdogs that match only English "Press any key" miss Japanese pause prompts. Read the stream, do not assume a locale.

Human-attended pause can stay. Agent runs use `NO_PAUSE` (or equivalent) plus a timeout calibrated from measured p95, not a guessed hour.

COM Excel tests: design verify so it does not wait on a modal. Silent/core VBA paths.

Portable kit: cursorsetup `non-interactive-hang` templates. Repo-specific verify commands stay in that repo.

## Related

- cursorsetup `docs/fast-agent-test-loop.md`
