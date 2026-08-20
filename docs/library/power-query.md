---
title: Power Query edit order
tags:
  - powerquery
created: 2026-05-14
updated: 2026-08-20
status: active
type: reference
layer: library
ctx_session: 75618dbe, 9e4dc115, 876e6589
---

# Power Query

## Judgment

Keep behavior. Improve layout and notes first. `Table.Buffer` is a **second** move, after the query graph is readable.

Buffer helps when several later steps re-evaluate a heavy intermediate (multiple Pivot / SelectColumns branches). Place it **after** the heavy source work, not as decoration on every step.

`Table.StopFolding` is an explicit fold break. Do not sprinkle it.

Comments: purpose of the query and of non-obvious filters/merges. Japanese unless the repo forbids it. Do not comment every rename.

## Not global

M export/import, COM refresh, and book paths stay in the Power Query **project**. cursorsetup `power-query-refactor` is the portable policy only.

## Related

- [excel-existing-workbook.md](excel-existing-workbook.md)
