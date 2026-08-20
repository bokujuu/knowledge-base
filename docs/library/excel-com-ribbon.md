---
title: Excel COM and RibbonX
tags:
  - excel
  - com
  - ribbonx
created: 2026-07-03
updated: 2026-08-20
status: active
type: reference
layer: library
ctx_event: 75d0d4ae-a9c3-7a00-9d9a-23dafa0bfb23, f496009f
---

# Excel COM and RibbonX

## Judgment

Keep **pywin32 COM**. Do not add xlwings as a second COM wrapper when the work is `Workbook.Queries`, refresh, or Ribbon packages.

Do not hand-edit shipped `.xlsm`. Build with a script. Prefer formulas over baked values.

## RibbonX

Zip-inject of `customUI14.xml` is not a finished build. Excel must **Open → Save → Close** so OOXML is normalized. Office RibbonX Editor Save was the human proof of the same gap.

- Patch `[Content_Types].xml` as **text**. Do not round-trip with ElementTree (`ns0:` kills the ribbon).
- Ship `customUI14.xml` only, not also `customUI.xml`.
- Callbacks: project prefix, unique.
- Verify in three layers: zip/static → COM smoke → interactive tab.

## Path / add-in config

Table maps and machine paths for an xlam belong in the add-in repo, not in a global skill. This library only remembers: local path files stay gitignored; build embeds them.

## Related

- [excel-existing-workbook.md](excel-existing-workbook.md)
- cursorsetup skill `excel-deliverable-quality`
