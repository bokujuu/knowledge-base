---
title: Cursor Integration
tags:
  - ai
  - cursor
  - reference
created: 2026-06-17
updated: 2026-06-17
status: active
type: reference
summary: knowledge-base を Cursor で参照・編集する方法
---

# Cursor Integration

## 知識の追加・整理

```text
Cursor → Open Folder → knowledge-base
```

知識の作成・編集は、コードプロジェクトとは分けてこのリポジトリで行う。

## 他プロジェクトから参照

コードを書いている別リポジトリのワークスペースで、チャットに必要な知識だけを指定する。

| 方法 | 用途 |
|------|------|
| `@Folders` | `docs/research` などフォルダ単位 |
| `@Files` | 特定の Markdown 1 ファイル |
| Multi-root Workspace | コード repo + knowledge-base を同時に開く |

Multi-root の例（`.code-workspace`）:

```json
{
  "folders": [
    { "path": "../my-app" },
    { "path": "../knowledge-base" }
  ]
}
```

## コンテキストを絞る理由

`@codebase` でコードリポジトリ全体を検索すると、無関係なファイルが混ざりやすい。知識はこのリポジトリに分離し、**必要なフォルダ・ファイルだけ**を `@` で渡すと精度が上がる。

## エージェント向け

このリポジトリ内でエージェントに作業させる場合:

- [AGENTS.md](../../AGENTS.md) — 配置ルール・タグ・メンテナンス方針
- [.cursor/skills/maintain-knowledge-base/SKILL.md](../../.cursor/skills/maintain-knowledge-base/SKILL.md) — 標準メンテナンス手順

## User Rules との関係

Cursor の User Rules（常時適用の口調・タスク分類など）は [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup) で管理する。本リポジトリは **プロジェクト横断の知識本文** を置く場所であり、User Rules の置き場ではない。

## Related Notes

- [bokujuu-cursorsetup-integration.md](bokujuu-cursorsetup-integration.md)
- [github-knowledge-limits.md](../research/github-knowledge-limits.md)

## References

- [Cursor Docs — Rules](https://cursor.com/docs/rules)
- [Cursor Docs — Codebase Indexing](https://cursor.com/docs/context/codebase-indexing)
