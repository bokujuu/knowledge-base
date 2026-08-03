---
title: Weekly Review 2026-08-03
tags:
  - ai
  - review
  - automation
created: 2026-08-03
updated: 2026-08-03
status: active
type: index
summary: 試用フェーズ第8回週次レビュー — Open Questions 13件継続、未マージ報告4週、main は7/27以降更新なし
---

# Weekly Review 2026-08-03

## Summary

試用フェーズ第8回の週次レビューです。`docs/research/` 配下の Open Questions 13 件（運用モデル 4 + agent 調査 9）は前週から未変更で、主目的の決定が 8 週連続のボトルネックです。`main` は 2026-07-27 以降ドキュメント・scripts の更新がなく、試用は「書く」より「決める」フェーズが継続しています。2026-06-29 / 07-13 / 07-20 / 07-27 の週次レビュー PR は依然 `main` 未マージのため、報告履歴に 4 週分の欠落があります。

## Open items

| 優先度 | ファイル | 論点 | 提案アクション |
|--------|----------|------|----------------|
| 高 | `docs/research/github-knowledge-limits.md` | knowledge-base の主目的はどれに近いか（長期保管庫 / 作業の外部記憶 / AI 参照セット） | **人間が今週決める** — 8 週連続未決。work / personal / agent 調査 / scripts の配置判断の根幹 |
| 高 | `docs/research/github-knowledge-limits.md` | 週次レビュー Automation + PR 報告の運用で十分か | 07-06 マージで実証は前進。未マージ報告 4 週で再発。マージ SLA と未マージブランチ整理を確定 |
| 高 | `docs/research/agent-docs-verbalization-research.md` | Phase 2 移行候補（reviewable-html-workbench / validate_agent_docs / AGENTS.md ルーター化 等）の優先順位 | 主目的と cursorsetup 方針を決めてから、採用候補を 1〜2 件に絞る |
| 中 | `docs/research/agent-docs-verbalization-research.md` | skill 化と人間向けノートの境界をどう運用するか | 主目的決定後に `knowledge-base-repo-setup.md` へ 1 段落追記案 |
| 中 | `docs/research/agent-docs-verbalization-research.md` | 専門家レビュー・失敗談の type（`research` / `troubleshooting`） | 次に追加するノートで試行し、テンプレに反映 |
| 中 | `docs/research/agent-skill-evaluation-reference.md` | `maintain-knowledge-base` 向け最小 eval（10 ケース程度）を作るか | 週次レビュー運用が定着してから着手 |
| 中 | `docs/research/agent-skill-evaluation-reference.md` | Cursor 向け簡易計測・KPI・外部ベンチの選び方（3 件） | 参照ノートとして維持。採用判断は Phase 2 と同時 |
| 中 | `docs/research/github-knowledge-limits.md` | 既存の散在メモがあれば、カテゴリに沿って移行 | 棚卸しノート（draft）未作成 — 主目的決定後 |
| 中 | `docs/research/github-knowledge-limits.md` | よく使うプロジェクトは Multi-root Workspace で knowledge-base を追加 | 主目的が「AI 参照セット」寄りなら優先度を上げる |
| 中 | `scripts/renderer-demos/` | npm 依存を持つ比較デモが knowledge-base に追加 — 置き場所の妥当性 | 主目的決定後に「docs のみ」か「scripts も可」かを明文化 |
| 中 | `docs/ai/reviews/` | 2026-06-29 / 07-13 / 07-20 / 07-27 の週次レビュー PR が `main` 未マージ | 一括マージするか、本報告（08-03）を正として古いブランチをクローズ |
| 低 | `docs/ai/ryo-lu-closer-to-material-judgment.md` | 英語原文の安定した公開 URL が未確認（日本語訳リンクはあり） | 見つかれば References に追記 |
| 低 | `docs/personal/learning/english-meeting-bad-knowhow.md` | personal / work 境界の再確認（運用モデル決定後） | 主目的決定後に見直し |
| 低 | `docs/technology/` | powerquery 等、README のみのサブトピック | Excel ノート追加で前進。必要時に個別ノート化 |

優先度の目安:

- **高** — 試用の方向性に直結、または放置すると迷いが増える
- **中** — 整理するとよいが急がない
- **低** — 観察・メモレベル

## Top 3 for human decision

1. **knowledge-base の主目的** — 長期保管庫 / 作業の外部記憶 / AI 参照セットのどれ（または組み合わせ）に寄せるか。8 週連続未決。`scripts/renderer-demos/` のような実行可能デモの置き場所判断もここに依存する。
2. **週次レビュー PR のマージ運用** — 未マージ報告が 06-29 / 07-13 / 07-20 / 07-27 の 4 週に拡大。Automation 成果物を毎週 `main` に残す手順（誰がいつマージするか、未マージブランチの整理方針）を確定する。
3. **agent 調査の Phase 2 優先順位** — `agent-docs-verbalization-research.md` の 5 件のうち、まず cursorsetup へ移す候補を 1〜2 件に絞るか、Phase 1（knowledge-base 調査ハブ）のまま維持するか。

## Duplicates / related topics

| 論点 | 関連ファイル | メモ |
|------|--------------|------|
| 運用モデル A/B/C | `trial-context.md` ↔ `github-knowledge-limits.md` Open Q1 | 8 週未決。agent 調査ノートの Phase 1/2 枠と整合 |
| knowledge-base vs cursorsetup の境界 | `agent-docs-verbalization-research.md` ↔ `bokujuu-cursorsetup-integration.md` | 暫定結論は research ノートに記載済み |
| skill 評価 | `agent-skill-evaluation-reference.md` ↔ `maintain-knowledge-base` skill ↔ weekly-review Automation | 評価は未着手 |
| Multi-root Workspace | `cursor-integration.md` ↔ `github-knowledge-limits.md` Open Q4 | integration は手順済み、limits は未決 |
| 報告履歴の欠落 | `2026-06-22`（マージ済）↔ `2026-06-29` / `07-13` / `07-20` / `07-27`（未マージ）↔ 本報告 | 4 週分の報告が `main` に無い |
| 過去提案の重複 | `2026-06-22` / `2026-07-06` / 未マージ 07-13〜27 Proposals ↔ 本報告 Proposals | 主目的・移行・Multi-root 等は繰り返し |
| コード vs 知識の境界 | `github-knowledge-limits.md` ↔ `scripts/renderer-demos/` | AGENTS.md は「アプリケーションコードを置かない」と記載。renderer-demos は例外か要判断 |

## Proposals

- [ ] 主目的が決まったら `github-knowledge-limits.md` の Interpretation に 1 段落追記し、該当 Open Question を `[x]` 化
- [ ] 移行対象メモの棚卸し用に `docs/research/memo-migration-inventory.md`（`status: draft`）を作成
- [ ] Multi-root を採用する場合、`docs/technology/cursor-multi-root-workspace.md` に `.code-workspace` 例を置く
- [ ] 未決論点が増えたら `status: review` または `needs-discussion` タグを利用（検出精度向上）— 本 PR で `github-knowledge-limits.md` に `status: review` を付与
- [ ] `cursor/weekly-review-2026-06-17` / `2026-06-29` / `2026-07-13` / `2026-07-20` / `2026-07-27` リモートブランチをクローズ（正本は 06-22 以降、未マージ分はマージ判断後）
- [ ] `weekly_review_scan.py` に `--git-since DATE` で新規マージファイル一覧を出すオプション追加
- [ ] 報告書テンプレートに「前週からの diff（マージされたノート・未解決 OQ）」セクションを常設化
- [ ] 週次レビュー PR のマージ SLA（例: 翌週レビュー前まで）を `weekly-review-setup.md` に追記
- [ ] `scripts/renderer-demos/` の置き場所方針を `knowledge-base-repo-setup.md` または `scripts/README.md` に明文化（別 repo 移行候補も検討）

## Changes in this PR

- `docs/ai/reviews/2026-08-03-weekly-review.md` — 第8回週次レビュー報告（正本）
- `docs/ai/reviews/README.md` — 報告一覧に今週分のリンクを追加
- `docs/research/github-knowledge-limits.md` — `status: review` に変更（8 週未決の主目的論点を検出しやすくする）

## Automation observations

**検出しやすかった:**

- `## Open Questions` 配下の `- [ ]` — `weekly_review_scan.py` で 13 件を確実に検出
- 前週報告（`2026-07-06-weekly-review.md`）の Proposals チェックリスト — 未完了提案の持ち越しが明確
- `git fetch` + リモートブランチ `cursor/weekly-review-*` — 未マージ報告 4 週を特定

**検出しづらかった / 今回の学び:**

- **未マージ PR の存在** — `main` 上に 06-29 / 07-13 / 07-20 / 07-27 報告が無いことは、スキャンスクリプトだけでは分からない
- **報告履歴の欠落が拡大** — README は 07-06 までしか載っておらず、未マージ報告が 4 週に増加
- `status: draft` / `review`、`needs-discussion` タグ — 実ノートには依然未使用（テンプレのみ）。本 PR で `github-knowledge-limits.md` に初適用
- Priority B（本文「未決」「未確認」）— `agent-skill-evaluation-reference.md` の「採用は未決」は Open Questions とは別枠で、手動読取が必要
- **main の停滞** — 07-27 以降 `main` にコミットなし。試用フェーズとして「決める」待ち状態が続いている
- **repo 構成のドリフト** — `scripts/renderer-demos/`（npm 依存）は Open Questions ではなく、`scripts/README.md` の手動確認で発見

**次回 Automation への改善案:**

- Memories に「未マージの `cursor/weekly-review-*` ブランチと README の最新日付を毎回照合」を維持
- 報告書に「前週からの diff」セクションを常設化（本報告で初導入）
- `weekly_review_scan.py` に未マージ週次ブランチの検出ヒントを出すオプション追加を検討

## 前週からの diff（2026-07-27 以降）

| 種別 | 内容 |
|------|------|
| マージ済みノート | なし（07-27 以降 `main` 更新なし） |
| マージ済み scripts | なし |
| 未解決 OQ | 13 件すべて継続（変更なし） |
| 未マージ報告 | `cursor/weekly-review-2026-06-29` / `2026-07-13` / `2026-07-20` / `2026-07-27` |
| 本 PR の小変更 | `github-knowledge-limits.md` に `status: review` を付与 |

## Next week

1. Top 3（主目的・PR マージ運用・agent Phase 2）について PR コメントまたはノートに決定を書く
2. 未マージの週次レビュー PR（06-29 / 07-13 / 07-20 / 07-27）を一括マージするか、本報告を正としてブランチをクローズするか判断
3. 新しい未決が出たら該当ノートに `## Open Questions` を追加 — スキャンで拾える状態を維持
