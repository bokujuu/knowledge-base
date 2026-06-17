---
name: maintain-knowledge-base
description: >-
  knowledge-base リポジトリのノート作成・front matter 正規化・索引更新・アーカイブ・
  タグ整理を行う。「ノートを追加して」「索引を更新して」「古いメモをアーカイブして」
  「front matter を揃えて」「重複ノートを整理して」等の依頼で使う。
  bokujuu_cursorsetup の repo-agent-bootstrap / japanese-technical-writing と併用可。
---

# maintain-knowledge-base — 知識ベースのメンテナンス

本リポジトリ専用の repo-local skill。グローバル設定は [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup) を参照。

## SoT（読む順）

1. [docs/technology/github/knowledge-base-repo-setup.md](../../docs/technology/github/knowledge-base-repo-setup.md) — 構成・命名・タグ・メタデータ
2. [AGENTS.md](../../AGENTS.md) — エージェント向けルール
3. [docs/_index.md](../../docs/_index.md) — トップ索引

## ノート作成

1. 適切なフォルダを選ぶ（迷ったら `docs/research/`）
2. [docs/_templates/](../../docs/_templates/) からテンプレートをコピー
3. ファイル名は lowercase 英語（例: `powerquery-relative-path.md`）
4. YAML front matter を埋める（`created` / `updated` は実日付）
5. 関連ノートへリンクを追加

## front matter 正規化

- `tags` は lowercase・正規形（`powerquery` not `PowerQuery`）
- `status` は `active` / `draft` / `review` / `outdated` / `archived` のいずれか
- `type` は AGENTS.md の推奨値に合わせる
- 意味のある更新時のみ `updated` を変更

## 索引・README 更新

- 主要トピック追加時: `docs/_index.md` と該当フォルダの `README.md` を更新
- 新サブフォルダ作成時: フォルダ内に `README.md`（front matter 付き index）を置く

## アーカイブ

削除よりアーカイブを優先:

1. `status: outdated` に変更、または
2. `archive/` へ移動（理由を先頭に 1 行メモ）、または
3. 先頭に `> This note may be outdated.` を追加

## メンテナンスチェックリスト

- [ ] 配置フォルダは適切か
- [ ] front matter は揃っているか
- [ ] タグは正規形か（重複タグなし）
- [ ] 関連ノートへのリンクはあるか
- [ ] 秘密情報・個人情報は含まれていないか
- [ ] 索引（`_index.md` / フォルダ README）を更新したか

## 借用 skill（グローバル）

| skill | いつ使う |
|-------|----------|
| `japanese-technical-writing` | 日本語ノートの新規作成・改稿 |
| `japanese-doc-review` | 日本語文書のレビュー |
| `cursor-session-doc` | 過去セッションをノート化する前の調査 |
| `repo-agent-bootstrap` | AGENTS.md / 本 skill の基盤メンテナンス |

## 報告テンプレート

```markdown
## knowledge-base メンテナンス

- **作業**: ノート追加 / 正規化 / アーカイブ / 索引更新
- **変更ファイル**: …
- **索引更新**: はい / いいえ
- **注意**: …（outdated 候補・重複・要レビュー）
```
