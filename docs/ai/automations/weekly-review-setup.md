---
title: Weekly Review Automation Setup
tags:
  - ai
  - cursor
  - automation
  - procedure
created: 2026-06-17
updated: 2026-06-29
status: active
type: procedure
summary: Cursor Automations で週次レビュー（PR 報告）を設定する手順
---

# Weekly Review Automation Setup

週次で未決事項をレビューし、**PR で報告する** Cursor Automation の設定手順です。

## 成果物

| 成果物 | 場所 |
|--------|------|
| Instruction（プロンプト） | [.cursor/automations/weekly-review/INSTRUCTIONS.md](../../../.cursor/automations/weekly-review/INSTRUCTIONS.md) |
| 補助資料 | [.cursor/automations/weekly-review/references/](../../../.cursor/automations/weekly-review/references/) |
| 週次報告（正本） | `docs/ai/reviews/YYYY-MM-DD-weekly-review.md`（Automation が PR で追加） |

## 前提

1. Cursor で Cloud Agents / Automations が使える
2. GitHub 連携済み（`bokujuu/knowledge-base` にアクセス可）
3. Pull request creation が使える

**Secrets は不要**（Cursor の GitHub OAuth で足りる）。

## 設定手順

### 1. Automation を作成

[cursor.com/automations](https://cursor.com/automations) → **New Automation**

### 2. Trigger

| 項目 | 値 |
|------|-----|
| Type | Scheduled |
| Cron | `0 0 * * 1`（月曜 09:00 JST） |

試用中は **Run now** で手動実行を推奨。

### 3. Repository

| 項目 | 値 |
|------|-----|
| Scope | **Single repository** |
| Repo | `bokujuu/knowledge-base` |
| Branch | `main` |

### 4. Tools

| Tool | 設定 |
|------|------|
| **Pull request creation** | **ON（必須）** |
| Memories | ON 推奨 |
| Send to Slack | 任意 |

### 5. Instructions

[INSTRUCTIONS.md](../../../.cursor/automations/weekly-review/INSTRUCTIONS.md) の**全文**を貼り付ける。

リポジトリを Automation に紐づけている場合、実行時に clone されるため、Instruction 内のパスはそのまま参照可能です。

### 6. 初回テスト

1. **Run now**
2. Agents Window で実行ログを確認
3. PR `review: weekly knowledge-base review YYYY-MM-DD` が作成されているか確認
4. `docs/ai/reviews/` に報告書があるか確認
5. 問題なければスケジュールを有効化

## 人間の運用（マージ後）

1. PR の **Top 3 for human decision** を読む
2. 決めたこと → 該当ノートに反映（自分で編集 or 次回 Automation に依頼）
3. PR をマージしてレビュー履歴を残す

## 未決事項の書き方

[detection-rules.md](../../../.cursor/automations/weekly-review/references/detection-rules.md) 参照。

```markdown
## Open Questions

- [ ] （論点を1行で）
```

## ローカル補助

```bash
python3 scripts/python/weekly_review_scan.py
```

## Related

- [automations/README.md](README.md)
- [reviews/README.md](../reviews/README.md)
- [pr-policy.md](../../../.cursor/automations/weekly-review/references/pr-policy.md)

## References

- [Cursor Docs — Automations](https://cursor.com/docs/cloud-agent/automations)
