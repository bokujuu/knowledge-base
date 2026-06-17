# GitHub 活用の限界と knowledge-base の位置づけ

- 日付: 2026-06-17
- ステータス: 結論あり

## 背景

コード用 GitHub リポジトリに、メモ・調査・参考資料まで載せ始めると次の問題が出る。

- README が肥大化し、第三者にも用途が伝わりにくくなる
- Issue / Wiki は知識の検索・再利用に向かない
- プロジェクト A の作業中に、プロジェクト B の文脈が AI コンテキストに混ざる
- 「コード」と「知識」のライフサイクルが異なるのに、同じリポジトリで管理する

## 方針

| 置き場所 | 内容 |
|----------|------|
| 各プロジェクト repo | 実装・テスト・そのプロジェクト固有の設定 |
| `knowledge-base`（本 repo） | ノート、参考資料、ドキュメント、調査、検証記録 |

リポジトリ名は `knowledge-base`。Description は気取らず、将来用途が増えても破綻しにくい表現にする。

> Personal knowledge base and reference repository.

長期運用では、次の説明も README に併記してよい。

> Personal knowledge base containing notes, references, documentation, and research.

## カバーする用途

- 仕事
- 趣味
- 技術情報
- 調査メモ
- AI 関連
- 将来追加する内容

上記のどれが増えても、Description を書き換える必要がほぼない構成を目指す。

## Cursor での使い方（要約）

1. 知識の追加は `knowledge-base` を開いて行う
2. コード作業中は `@Folders` / `@Files` で必要な知識だけ参照
3. エージェント向けの配置ルールは [AGENTS.md](../AGENTS.md)

詳細: [docs/cursor-integration.md](../docs/cursor-integration.md)

## 次のアクション

- [ ] 既存の散在メモがあれば、カテゴリに沿って移行
- [ ] よく使うプロジェクトは Multi-root Workspace で knowledge-base を追加
