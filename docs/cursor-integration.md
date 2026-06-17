# Cursor 連携ガイド

このリポジトリを Cursor で効果的に使うための手順です。

## 1. 知識の追加・整理（このリポジトリを開く）

```text
Cursor → File → Open Folder → knowledge-base
```

知識の作成・編集は、コードプロジェクトとは分けてこのリポジトリで行います。

## 2. 他プロジェクトから参照する

コードを書いている別リポジトリのワークスペースで、チャットに必要な知識だけを指定します。

| 方法 | 用途 |
|------|------|
| `@Folders` | `knowledge-base/research` などフォルダ単位 |
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

## 3. コンテキストを絞る理由

`@codebase` でコードリポジトリ全体を検索すると、無関係なファイルが混ざりやすくなります。知識はこのリポジトリに分離し、**必要なフォルダ・ファイルだけ**を `@` で渡すと精度が上がります。

## 4. エージェント向け

このリポジトリ内でエージェントに作業させる場合は、ルートの [AGENTS.md](../AGENTS.md) が適用されます。配置ルール・禁止事項を確認してください。

## 5. User Rules との関係

Cursor の User Rules（常時適用の口調・タスク分類など）は、Cursor 設定側で管理します。このリポジトリは **プロジェクト横断の知識本文** を置く場所であり、User Rules の置き場ではありません。

## 参考

- [Cursor Docs — Rules](https://cursor.com/docs/rules)
- [Cursor Docs — Codebase Indexing](https://cursor.com/docs/context/codebase-indexing)
