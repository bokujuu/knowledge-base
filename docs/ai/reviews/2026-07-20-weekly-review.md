---
title: Weekly Review 2026-07-20
tags:
  - ai
  - review
  - automation
created: 2026-07-20
updated: 2026-07-20
status: active
type: index
summary: 試用フェーズ第6回週次レビュー — Open Questions 13件継続、07-13報告未マージ、主目的6週未決
---

# Weekly Review 2026-07-20

## Summary

試用フェーズ第6回の週次レビューです。`docs/research/` 配下の Open Questions 13 件（運用モデル 4 + agent 調査 9）は前週から未変更で、主目的の決定が 6 週連続のボトルネックです。前回マージ済みの報告（2026-07-06）以降、`main` には work 向け参照ノート `cost-disclosure-security-terminology.md` が 1 件追加されたのみで、新たな未決論点は増えていません。一方、2026-07-13 の週次レビュー PR は `main` 未マージのため、報告履歴に再び 1 週分の欠落があります（06-29 欠落と合わせて 2 週）。

## Open items

| 優先度 | ファイル | 論点 | 提案アクション |
|--------|----------|------|----------------|
| 高 | `docs/research/github-knowledge-limits.md` | knowledge-base の主目的はどれに近いか（長期保管庫 / 作業の外部記憶 / AI 参照セット） | **人間が今週決める** — 6 週連続未決。work / personal / agent 調査の配置判断の根幹 |
| 高 | `docs/research/github-knowledge-limits.md` | 週次レビュー Automation + PR 報告の運用で十分か | 07-06 マージで実証は前進。07-13 未マージで再発。マージ SLA と未マージブランチ整理を確定 |
| 高 | `docs/research/agent-docs-verbalization-research.md` | Phase 2 移行候補（reviewable-html-workbench / validate_agent_docs / AGENTS.md ルーター化 等）の優先順位 | 主目的と cursorsetup 方針を決めてから、採用候補を 1〜2 件に絞る |
| 中 | `docs/research/agent-docs-verbalization-research.md` | skill 化と人間向けノートの境界をどう運用するか | 主目的決定後に `knowledge-base-repo-setup.md` へ 1 段落追記案 |
| 中 | `docs/research/agent-docs-verbalization-research.md` | 専門家レビュー・失敗談の type（`research` / `troubleshooting`） | 次に追加するノートで試行し、テンプレに反映 |
| 中 | `docs/research/agent-skill-evaluation-reference.md` | `maintain-knowledge-base` 向け最小 eval（10 ケース程度）を作るか | 週次レビュー運用が定着してから着手 |
| 中 | `docs/research/agent-skill-evaluation-reference.md` | Cursor 向け簡易計測・KPI・外部ベンチの選び方（3 件） | 参照ノートとして維持。採用判断は Phase 2 と同時 |
| 中 | `docs/research/github-knowledge-limits.md` | 既存の散在メモがあれば、カテゴリに沿って移行 | 棚卸しノート（draft）未作成 — 主目的決定後 |
| 中 | `docs/research/github-knowledge-limits.md` | よく使うプロジェクトは Multi-root Workspace で knowledge-base を追加 | 主目的が「AI 参照セット」寄りなら優先度を上げる |
| 中 | `docs/ai/reviews/` | 2026-06-29 / 2026-07-13 の週次レビュー報告が `main` に存在しない | マージ・cherry-pick・欠落認定のいずれかを人間が判断 |
| 低 | `docs/ai/reviews/` | リモートに `cursor/weekly-review-2026-*` 等の古いブランチが多数残存 | マージ済み・不要ブランチをクローズ |
| 低 | `docs/ai/ryo-lu-closer-to-material-judgment.md` | 英語原文の安定した公開 URL が未確認（日本語訳リンクはあり） | 見つかれば References に追記 |
| 低 | `docs/personal/learning/english-meeting-bad-knowhow.md` | personal / work 境界の再確認（運用モデル決定後） | 主目的決定後に見直し |
| 低 | `docs/technology/` | powerquery 等、README のみのサブトピック | Excel ノート追加で前進。必要時に個別ノート化 |

優先度の目安:

- **高** — 試用の方向性に直結、または放置すると迷いが増える
- **中** — 整理するとよいが急がない
- **低** — 観察・メモレベル

## Top 3 for human decision

1. **knowledge-base の主目的** — 長期保管庫 / 作業の外部記憶 / AI 参照セットのどれ（または組み合わせ）に寄せるか。6 週連続未決。移行・索引・personal/work 境界の判断が止まっている。
2. **週次レビュー報告の欠落整理** — 06-29 と 07-13 の 2 週分が `main` に無い。cherry-pick で補完するか、06-22 → 07-06 → 07-20 を正本として欠落を認めるか、07-13 をマージするかを決める。
3. **agent 調査の Phase 2 優先順位** — `agent-docs-verbalization-research.md` の 5 件のうち、まず cursorsetup へ移す候補を 1〜2 件に絞るか、Phase 1（knowledge-base 調査ハブ）のまま維持するか。

## Duplicates / related topics

| 論点 | 関連ファイル | メモ |
|------|--------------|------|
| 運用モデル A/B/C | `trial-context.md` ↔ `github-knowledge-limits.md` Open Q1 | 6 週未決。agent 調査ノートの Phase 1/2 枠と整合 |
| knowledge-base vs cursorsetup の境界 | `agent-docs-verbalization-research.md` ↔ `bokujuu-cursorsetup-integration.md` | 暫定結論は research ノートに記載済み |
| skill 評価 | `agent-skill-evaluation-reference.md` ↔ `maintain-knowledge-base` skill ↔ weekly-review Automation | 評価は未着手 |
| Multi-root Workspace | `cursor-integration.md` ↔ `github-knowledge-limits.md` Open Q4 | integration は手順済み、limits は未決 |
| 週次レビュー正本の欠落 | `2026-06-22`（マージ済）↔ `2026-06-29`（未マージ）↔ `2026-07-06`（マージ済）↔ `2026-07-13`（未マージ）↔ 本報告 | 欠落 2 週 |
| 過去提案の重複 | `2026-06-22` / `2026-07-06` / `2026-07-13`（未マージ）Proposals ↔ 本報告 Proposals | 主目的・移行・Multi-root 等は繰り返し |
| work ノートの増加 | `cost-disclosure-security-terminology.md` ↔ 主目的未決 | Open Questions なしの実務ノートは追加可能だが、境界判断は主目的後 |

## Proposals

- [ ] 主目的が決まったら `github-knowledge-limits.md` の Interpretation に 1 段落追記し、該当 Open Question を `[x]` 化
- [ ] 移行対象メモの棚卸し用に `docs/research/memo-migration-inventory.md`（`status: draft`）を作成
- [ ] Multi-root を採用する場合、`docs/technology/cursor-multi-root-workspace.md` に `.code-workspace` 例を置く
- [ ] 未決論点が増えたら `status: review` または `needs-discussion` タグを利用（検出精度向上）— agent 調査 2 件は候補
- [ ] `cursor/weekly-review-2026-06-17` / `2026-06-29` / `2026-07-06` / `2026-07-13` リモートブランチをクローズ（マージ済み・正本確定後）
- [ ] `weekly_review_scan.py` に `--git-since DATE` で新規マージファイル一覧を出すオプション追加
- [ ] 報告書テンプレートに「前週からの diff（マージされたノート・未解決 OQ）」セクションを常設化
- [ ] 週次レビュー PR のマージ SLA（例: 翌週レビュー前まで）を `weekly-review-setup.md` に追記
- [ ] 06-29 / 07-13 報告を cherry-pick するか、README に「欠落週」注記を 1 行入れるか人間が決める
- [ ] `github-knowledge-limits.md` に `status: review` と `needs-discussion` タグを付与（主目的が最優先未決のため検出精度向上）

## Changes in this PR

- `docs/ai/reviews/2026-07-20-weekly-review.md` — 第6回週次レビュー報告（正本）
- `docs/ai/reviews/README.md` — 報告一覧に今週分のリンクを追加

## Automation observations

**検出しやすかった:**

- `## Open Questions` 配下の `- [ ]` — `weekly_review_scan.py` で 13 件を確実に検出
- 前週報告（`2026-07-06-weekly-review.md`）の Proposals チェックリスト — 未完了提案の持ち越しが明確
- Memories の過去実行メモ — 07-13 実行・07-06 マージ済みの記録を参照できた
- cron 表記 — `weekly-review-setup.md` と `.codex/automation-registry.json` は `0 0 * * 1` で整合（07-06 マージ後、ドリフトなし）

**検出しづらかった / 今回の学び:**

- **未マージ PR の再発** — 07-13 報告が `main` に無いことは、スキャンスクリプトだけでは分からない。`git fetch` + リモートブランチ `cursor/weekly-review-*` の確認が必須
- **報告履歴の欠落が累積** — README は 07-06 まで。06-29 と 07-13 が欠落し、試用の学習ログが断片化
- `status: draft` / `review`、`needs-discussion` タグ — 実ノートには依然未使用（テンプレのみ）
- Priority B（本文「未決」「未確認」）— `agent-skill-evaluation-reference.md` の「採用は未決」は Open Questions とは別枠で、手動読取が必要
- **ドキュメント更新の停滞** — 07-06 以降 `main` に新規ノートは `cost-disclosure-security-terminology.md` の 1 件のみ。試用は「書く」より「決める」フェーズが継続

**前週（07-06 マージ後）からの diff:**

| 種別 | 内容 |
|------|------|
| マージされたノート | `docs/work/cost-disclosure-security-terminology.md`（work / security / reference、Open Questions なし） |
| 未解決 Open Questions | 13 件（変更なし） |
| 週次レビュー | 07-13 報告はリモートブランチ `cursor/weekly-review-2026-07-13` に存在するが `main` 未マージ |

**次回 Automation への改善案:**

- Memories に「未マージの `cursor/weekly-review-*` ブランチと README の最新日付を毎回照合」を維持
- 報告書に「前週からの diff」セクションを常設化（本報告で試行）
- `weekly_review_scan.py` に未マージ週次ブランチの検出ヒントを出すオプション追加を検討
- 主目的が 6 週未決の場合、報告の Top 3 冒頭に明示的にエスカレーションする（現状と同様だが継続）

## Next week

1. Top 3（主目的・報告欠落整理・agent Phase 2）について PR コメントまたはノートに決定を書く
2. 2026-07-13 報告 PR をマージするか、本報告（07-20）を正として 07-13 ブランチをクローズするか判断
3. 新しい未決が出たら該当ノートに `## Open Questions` を追加 — スキャンで拾える状態を維持
