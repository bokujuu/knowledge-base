---
title: Weekly Review 2026-06-17
tags:
  - ai
  - review
  - automation
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
summary: 試用フェーズ初回週次レビュー — 運用モデル未決4件と設定ドリフト1件
---

# Weekly Review 2026-06-17

## Summary

試用フェーズ初回の週次レビューです。未決事項は `docs/research/github-knowledge-limits.md` の Open Questions 4 件に集約されており、運用モデル（主目的・レビュー手段・メモ移行・Multi-root）が中心論点です。`status: draft` / `review` や `needs-discussion` タグ付きノートは実ノートにはなく、明示的マーカー運用はまだ始まったばかりです。加えて、Automation の cron 設定（月曜）とドキュメント記載（日曜）に不一致があり、試用中の設定ドリフトとして記録しました。

## Open items

| 優先度 | ファイル | 論点 | 提案アクション |
|--------|----------|------|----------------|
| 高 | `docs/research/github-knowledge-limits.md` | knowledge-base の主目的はどれに近いか（長期保管庫 / 作業の外部記憶 / AI 参照セット） | **人間が今週決める** — 試用の方向性の根幹 |
| 高 | `docs/research/github-knowledge-limits.md` | 週次レビュー Automation + PR 報告の運用で十分か | **人間が今週決める** — 本 PR が初回成果物。十分/not なら代替案を Open Questions に追記 |
| 中 | `docs/research/github-knowledge-limits.md` | 既存の散在メモがあれば、カテゴリに沿って移行 | 主目的決定後に移行計画を 1 ノート化 |
| 中 | `docs/research/github-knowledge-limits.md` | よく使うプロジェクトは Multi-root Workspace で knowledge-base を追加 | 主目的が「AI 参照セット」寄りなら優先度高 — `.code-workspace` 雛形を `docs/technology/` に置く案 |
| 中 | `docs/ai/automations/weekly-review-setup.md` / `.codex/automation-registry.json` | cron が `0 0 * * 0`（日曜 except 実際の Automation は `0 0 * * 1`（月曜） | 人間が正しい曜日を決め、setup ドキュメントと registry を揃える |
| 低 | `docs/technology/` | powerquery 等の技術ノートは未作成（README のみ） | 急がない — 移行・追加時にフォルダを育てる |
| 低 | `docs/work/` | 業務ノートは README のみ | 移行論点と連動 |

優先度の目安:

- **高** — 試用の方向性に直結、または放置すると迷いが増える
- **中** — 整理するとよいが急がない
- **低** — 観察・メモレベル

## Top 3 for human decision

1. **knowledge-base の主目的** — 長期保管庫 / 作業の外部記憶 / AI 参照セットのどれ（または組み合わせ）に寄せるか。以降の移行・索引・Automation の焦点が変わる。
2. **週次レビュー Automation + PR 報告で十分か** — 初回 PR を見て、頻度・形式・Slack 通知など追加が必要か判断する。
3. **散在メモの移行方針** — 移行対象の有無、優先カテゴリ（work / technology / personal 等）、いつまでにやるか。

## Duplicates / related topics

| 論点 | 関連ファイル | メモ |
|------|--------------|------|
| 運用モデル A/B/C | `.cursor/automations/weekly-review/references/trial-context.md` ↔ `github-knowledge-limits.md` Open Q1 | trial-context は候補の説明、limits は未決チェックボックス。統合は主目的決定後に limits を更新する形が自然 |
| Multi-root Workspace | `docs/ai/cursor-integration.md` ↔ `github-knowledge-limits.md` Open Q4 | integration は手順・理由、limits は未決。決定後 cursor-integration に「採用/not」を 1 行追記でよい |
| 週次レビューの仕組み | `weekly-review-setup.md`, `pr-policy.md`, 本報告 | Open Q2 はメタ論点。試用 2〜3 回後に再評価してもよい |

## Proposals

- [ ] `weekly-review-setup.md` と `.codex/automation-registry.json` の cron を実際の Automation 設定（現状 `0 0 * * 1`）に合わせて更新する
- [ ] 主目的が決まったら `github-knowledge-limits.md` の Interpretation に 1 段落追記し、該当 Open Question を `[x]` 化
- [ ] 移行対象メモの棚卸し用に `docs/research/memo-migration-inventory.md`（draft）を作成 — 一覧だけ先に置く
- [ ] Multi-root を採用する場合、`docs/technology/cursor-multi-root-workspace.md` に `.code-workspace` 例を置く
- [ ] 未決論点が増えたら `status: review` または `needs-discussion` タグを積極利用（検出精度向上）
- [ ] `weekly_review_scan.py` に `--exclude-unchecked-outside-open-section` オプション追加を検討（テンプレ例の誤検出防止は既に SKIP 済みだが、将来のノート増加に備える）

## Changes in this PR

- `docs/ai/reviews/2026-06-17-weekly-review.md` — 初回週次レビュー報告（正本）
- `docs/ai/reviews/README.md` — 報告一覧に今週分のリンクを追加
- `docs/research/github-knowledge-limits.md` — Related Notes に週次レビュー報告一覧へのリンクを追加

## Automation observations

**検出しやすかった:**

- `## Open Questions` 配下の `- [ ]` — `weekly_review_scan.py` と手動 grep で確実に拾える
- 試用フェーズの起点ノート（`github-knowledge-limits.md`）が未決の集約点として機能している

**検出しづらかった / 今回の学び:**

- Cursor Automation UI 上の cron（trigger: 月曜）と repo 内ドキュメント（日曜表記）の不一致 — リポジトリだけでは実設定が分からない。registry に実値を書く運用が必要
- 本文中の「未決」「要検討」見出しは現状ほぼ無く、Priority B ルールは未使用
- `status: draft` / `review`、タグ `needs-discussion` はテンプレート以外に未使用 — マーカー規約の普及が次の課題
- 初回のため過去レビューとの diff 比較ができない

**次回 Automation への改善案:**

- Memories に「cron ドリフトを毎回確認」を記録
- 報告書の Changes in this PR と PR 本文の二重記載をテンプレート上は許容しつつ、差分がないよう PR 作成時に整合チェック

## Next week

1. Top 3（主目的・レビュー手段・移行方針）について PR コメントまたはノートに決定を書く
2. cron 表記を実設定と揃える（採用曜日を決めてから）
3. 新しい未決が出たら該当ノートに `## Open Questions` を追加 — 次回スキャンで拾える状態を維持
