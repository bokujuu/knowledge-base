---
title: RibbonX xlam ビルド自動化 — リボンが出ない問題
tags:
  - excel
  - ribbonx
  - xlam
  - python
  - automation
  - troubleshooting
  - procedure
created: 2026-06-22
updated: 2026-06-22
status: active
type: troubleshooting
---

# RibbonX xlam ビルド自動化 — リボンが出ない問題

## Symptom

- `python` + `zipfile` で `customUI14.xml` を `.xlam` に注入し、静的検証（パーツ存在・`_rels/.rels`・Content Types）は通る
- しかし Excel 起動後、カスタムリボンタブが表示されない
- Office RibbonX Editor で同じ xlam を Open → **XML を変えず Save** → Excel 再起動すると表示される

## Environment

- OS: Windows 10/11
- Application: Microsoft 365 / Excel 16
- Build: Python 3 + `pywin32`、VBA は COM 注入、RibbonX は OOXML zip 注入
- Reference repo: [excel-addins](https://github.com/bokujuu/excel-addins)（`Excel業務ツール.xlam`）

## Cause

根本原因は Ribbon XML の内容より **OOXML パッケージ構造の未正規化**であることが多い。

| 要因 | 説明 |
|------|------|
| ビルド順序 | VBA 注入後の Excel Save の**後**に zip 注入すると、注入結果が Excel 正規化を経ない |
| `[Content_Types].xml` | ElementTree で全体再シリアライズすると `ns0:` 付与で RibbonX が無効化される |
| 二重 Custom UI | `customUI.xml` と `customUI14.xml` 併記で旧形式が優先されうる |
| パッケージ差分 | inject-only と Editor Save の差は relationship 順序・ZIP メタデータが主（XML 本体は同一のことも） |
| リボンキャッシュ | デプロイ後に UI が更新されない場合の補助要因 |

Office RibbonX Editor に公式 CLI はない（[issue #214](https://github.com/fernandreu/office-ribbonx-editor/issues/214)）。CI への GUI 組み込みは非現実的。

## Solution

### 推奨ビルドフロー

```
template.xlam
  → COM: *.bas 注入 → Save
  → inject_ribbon(customUI14.xml)
  → COM: Open → Save → Close    # パッケージ正規化
  → verify_ribbon_package()
```

### OOXML 注入の要点

- `[Content_Types].xml` は**文字列パッチ**で `Override` を追加（`application/vnd.ms-office.customUI+xml`）
- `_rels/.rels` に `ui/extensibility` → `customUI/customUI14.xml`
- `customUI14.xml` のみ同梱（`customUI.xml` は入れない）
- コールバック名はプロジェクト prefix（例: `ExcelToolkit_*`）でグローバル一意に

### 検証（3 層）

1. **静的** — ZIP 整合、rels、namespace、callback 名と `.bas` の一致
2. **COM** — `ComTest_RibbonLoaded`（headless では未発火のことあり）
3. **対話** — Excel 完全終了 → 起動 → タブ表示・代表ボタン

## Workaround

- デプロイ後にリボンが古いまま: `%LOCALAPPDATA%\Microsoft\Office\16.0\Excel\Ribbon` を削除して Excel 再起動
- 緊急時のみ RibbonX Editor で xlam を Save（通常はビルド正規化で不要）

## Prevention

- `inject_ribbon` 単体でビルドを終えない
- `Generate Callbacks` は使わず `RibbonCallbacks.bas` を SoT にする
- パッケージ差分は `debug_ribbon_package_diff.py` で inject-only vs 正規化後を比較する

## Related Notes

- [Excel technology index](README.md)
- [bokujuu_cursorsetup integration](../../ai/bokujuu-cursorsetup-integration.md)
- Global skill: `excel-xlam-ribbon-build`（bokujuu_cursorsetup）
- Inquiry memo（excel-addins）: `docs/ribbonx-build-inquiry.md`
