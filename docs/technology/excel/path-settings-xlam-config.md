---
title: path-settings xlsx — xlam ビルド設定のテーブル運用
tags:
  - excel
  - xlam
  - python
  - automation
  - procedure
created: 2026-06-22
updated: 2026-06-22
status: active
type: procedure
---

# path-settings xlsx — xlam ビルド設定のテーブル運用

Excel 統合アドイン（`.xlam`）では、実環境パス・メール別名・ファイルアクセス一覧を **人間が編集する xlsx** に集約し、ビルド時に VBA モジュール `PathConfig` として埋め込む。

参照実装: [excel-addins](https://github.com/bokujuu/excel-addins)（ローカルワークスペース）

関連: [RibbonX xlam ビルド](ribbonx-xlam-build.md)（RibbonX 注入・正規化は別トピック）

## ファイル

| ファイル | 用途 |
|----------|------|
| `config/path-settings.example.xlsx` | git 管理する雛形 |
| `config/path-settings.local.xlsx` | 実パス入り（gitignore） |

## シート構成（すべて Excel テーブル）

| シート | テーブル名 | 列 |
|--------|------------|-----|
| `Paths` | `PathSettingsTable` | key / value / description / required |
| `FileAccess` | `FileAccessTable` | label / path / open_method / enabled / order |
| `EmailMap` | `EmailMapTable` | short_name / email / enabled |

**重要**: 行追加時に `ws.append` でテーブル外へ書かない。データ行を追記したあとテーブル範囲を広げる。ビルドスクリプトは **テーブル内のデータ行のみ** 読み取る（テーブル外の行は無視）。

## Paths — 必須キー

| key | 用途 |
|-----|------|
| `PCAF_REF_FILE` | PCAF メール宛先参照ブック |
| `PCAF_SAVE_DEFAULT` | PCAF 既定保存フォルダ |
| `PCAF_SAVE_ALTERNATE` | PCAF 代替保存フォルダ |
| `FILE_SAVE_BACKUP_DIR` | 一般ファイルのバックアップ先 |
| `FILE_SAVE_LOG_WORKBOOK` | 更新履歴台帳 |
| `FIXED_ASSET_SAVE_ROOT` | 固定資産稟議の保存先ルート |

## Paths — 任意キー（メール・UI）

| key | 用途 |
|-----|------|
| `PCAF_MAIL_CC` | PCAF メール CC（通常） |
| `PCAF_MAIL_CC_EXTRA_PROD_SWITCH` | 製品切替時の追加 CC |
| `PCAF_SAVE_DEFAULT_LABEL` | 保存先ダイアログ表示名（省略時: 既定） |
| `PCAF_SAVE_ALTERNATE_LABEL` | 保存先ダイアログ表示名（省略時: 代替） |

## EmailMap

新担当の姓 → メールアドレス。ビルド時に `PathConfig.ConfigMailAlias` として VBA に埋め込む。VBA 内のハードコードは避ける。

## FileAccess

リボン「ファイルアクセス」の番号選択メニュー。`ConfiguredFileLabel` / `ConfiguredFilePath` / `ConfiguredFileOpenMethod` として埋め込む。

## ビルド

```bat
scripts\build_excel_toolkit.bat
```

1. `verify_excel_toolkit.py`（設定整合・bas 検証）
2. `update_xlam.py`（PathConfig 生成 → xlam 注入）

`path-settings.local.xlsx` が無い場合は example + `--allow-missing-paths` でビルド。

## 運用メモ

- 実行時に xlsx を読まない（ビルド時注入のみ）
- レガシー Sheet1 の To/宛名は参照ブック側のデータのまま（config 化しない）
- local 更新後は必ず再ビルド

## Related Notes

- [Excel technology index](README.md)
- [RibbonX xlam build](ribbonx-xlam-build.md)
