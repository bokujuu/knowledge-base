---
title: bokujuu_cursorsetup Integration
tags:
  - ai
  - cursor
  - github
  - reference
created: 2026-06-17
updated: 2026-08-20
status: active
type: reference
layer: library
summary: knowledge-base と bokujuu_cursorsetup の役割分担
---

# bokujuu_cursorsetup Integration

## 役割分担

| リポジトリ | 役割 |
|------------|------|
| [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup) | Cursor / Codex の**グローバル設定**（User Rules 原本・Skills・Hooks 雛形）。常時入口は短く保つ |
| `knowledge-base`（本 repo） | **書庫**（判断・失敗・調査・再開材料）。入口は [desk.md](../desk.md) |

設定と知識を分離することで、どちらも長期運用しやすくする。

## bokujuu_cursorsetup で管理するもの

- `user-rules/` — Cursor Settings に手動貼り付けする User Rules 原本
- `skills/` — グローバル skill（`install.ps1` で `~/.codex/skills/` へ）
- `templates/` — プロジェクトルール・skill 雛形
- `hooks/`, `mcp/` — 任意の拡張

## knowledge-base で管理するもの

- Markdown ノート（`docs/`）
- 構造化データ（`data/`）
- 添付ファイル（`attachments/`）
- リポジトリ固有のメンテナンス skill（`.cursor/skills/maintain-knowledge-base/`）

## 本 repo のメンテナンスで借りるグローバル skill

`bokujuu_cursorsetup` を install 済みの環境では、次の skill が特に有用。

| skill | 用途 |
|-------|------|
| `japanese-technical-writing` | 日本語ノートの作成・改稿 |
| `japanese-doc-review` | 日本語文書のレビュー |
| `cursor-session-doc` | 過去 Cursor セッションの要約 |
| `repo-agent-bootstrap` | AGENTS.md / skill 基盤の整備 |
| `agent-handoff-recovery` | セッション折り返し時の状況整理 |
| `capture-external-intelligence` | 作業セッションから本 repo へ判断を残す |
| `retrospective-codify` | **退役**。cursorsetup の legacy 削除リスト。後任は `capture-external-intelligence` |

詳細なタスク別参照は [bokujuu_cursorsetup の rule-index](https://github.com/bokujuu/bokujuu_cursorsetup/blob/main/docs/rule-index.md) を参照。

## インストール（参考）

```powershell
git clone https://github.com/bokujuu/bokujuu_cursorsetup.git
cd bokujuu_cursorsetup
.\scripts\install.ps1
```

## Related Notes

- [cursor-integration.md](cursor-integration.md)
- [desk.md](../desk.md)
- [external-intelligence-operating-model.md](external-intelligence-operating-model.md)
- [knowledge-base-repo-setup.md](../technology/github/knowledge-base-repo-setup.md)
