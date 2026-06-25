---
title: エージェント文書・言語化とリポジトリ配置の検討
tags:
  - research
  - ai
  - cursor
  - github
  - reference
created: 2026-06-21
updated: 2026-06-21
status: active
type: research
summary: reviewable-html-workbench / ds-ai-coding-skills / mizchi「技術記事と言語化」を起点に、knowledge-base と bokujuu_cursorsetup の配置判断材料を整理
---

# エージェント文書・言語化とリポジトリ配置の検討

## Question

外部参照（reviewable-html-workbench、ds-ai-coding-skills、mizchi「技術記事と言語化」）を調査・検討するとき、成果物は **knowledge-base** と **bokujuu_cursorsetup** のどちらに置くべきか。

## Background

AI エージェント時代の知識表現は、従来の技術記事とは性質が異なる。スキル・AGENTS.md ルーター・レビュー可能な HTML など、複数のパターンが出てきている。

本リポジトリではすでに次の役割分担がある。

| リポジトリ | 役割 |
|------------|------|
| [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup) | Cursor / Codex の**グローバル設定**（User Rules 原本・Skills・Hooks 雛形） |
| `knowledge-base`（本 repo） | **知識本文**（ノート・調査・手順・参考資料） |

詳細は [bokujuu-cursorsetup-integration.md](../ai/bokujuu-cursorsetup-integration.md) を参照。

## Findings

### 参照 1: reviewable-html-workbench

- **URL**: https://github.com/u-ichi/reviewable-html-workbench
- **概要**: Claude Code / Codex CLI 向けプラグイン。エージェントが生成した HTML 設計資料・調査レポートをブラウザ上でインラインコメントレビューし、コメントをエージェントが読み取って改善するループを実現する。
- **含むもの**: Python 3.11+ ランタイム、3 skills（`visual-html-renderer` / `reviewable-design-doc` / `plan-preview`）、スキーマ駆動のドキュメントモデル。
- **示唆**: 「レビュー可能な成果物」の**ワークフロー基盤**。採用するならツール導入と運用手順の話。比較検討・評価ログは knowledge-base、確定した導入・運用は bokujuu_cursorsetup 側が自然。

### 参照 2: ds-ai-coding-skills

- **URL**: https://github.com/atsushi-green/ds-ai-coding-skills
- **概要**: DS 向けリポジトリテンプレート。エージェント指示を層分けする設計が明示されている。
- **層構造**:

| 層 | 置き場所 | 内容 |
|----|----------|------|
| 薄い共通指示 | `.github/copilot-instructions.md` | 最小ルール |
| ルーター | `AGENTS.md` | タスク種別で skill へ誘導 |
| 作業手順 | `.github/skills/*/SKILL.md` | 再現可能な手順 |
| プロジェクト知識 | `docs/agent/*` | データカタログ、指標定義など |

- **示唆**: 現構成とほぼ同型。
  - bokujuu_cursorsetup ≒ skills + user-rules（グローバル手順）
  - knowledge-base ≒ `docs/agent/*`（横断的なプロジェクト知識）
  - 各コード repo の AGENTS.md / `.cursor/rules` ≒ プロジェクト固有
- アーキテクチャ比較は knowledge-base。パターンをグローバル設定に**採用**したときだけ cursorsetup を更新する。

### 参照 3: 技術記事と言語化（mizchi / Zenn Fes）

- **URL**: https://files.speakerdeck.com/presentations/6087aaf0bb094a5a8e0b780c78a9d121/%E6%8A%80%E8%A1%93%E8%A8%98%E4%BA%8B%E3%81%A8%E8%A8%80%E8%AA%9E%E5%8C%96.pdf
- **概要**: AI 時代における技術記事の存在意義と、人間に求められる言語化についての provocation。
- **主要論点**:
  - AI 時代、技術記事の一次消費者は人間ではなく AI になりつつある。
  - **良いスキルと良い技術記事の要求はほぼ一致**（再現性・課題解決・焼き直しでないこと）。
  - 一方、**人間向け文書の価値**は概念獲得・視点の刺激・記憶に残るレトリック（スキル化しにくい）。
  - AI が人間に求めるのは**ゴールの言語化・資料選別・有益な対話**。
  - 暗黙知の言語化は重い。プログラマの言語化は「分析ツールを作る」ことにもなる。
  - それでも書くべきは**専門家のレビューと評価**（採用後の推移・失敗談）。
  - 「技術記事を書こうとしない。調査メモで OK。構造化すれば記事になる。」
- **示唆**: 考察・調査ノートの領域。最初から cursorsetup に書くより `docs/research/` が筋が良い。

## Evidence

### 置き場所の判定マトリクス

| 中身の種類 | knowledge-base | bokujuu_cursorsetup |
|------------|:--------------:|:-------------------:|
| 外部リポ・スライドの要約・比較 | ✅ | ❌ |
| 採用/不採用の検討ログ・Open Questions | ✅ | ❌ |
| 自分の解釈・スタンス・失敗談 | ✅ | ❌ |
| 参照 URL・引用・エビデンス | ✅ | ❌ |
| **確定した** Skill / User Rule の実体 | ❌ | ✅ |
| install.ps1 で配るグローバル skill | ❌ | ✅ |
| プラグイン導入の**確定**手順 | △ 手順メモ可 | ✅ 運用と一体なら |
| 調査から蒸留した 1 行ポリシー | △ 根拠リンク付き要約 | ✅ 実行可能な形で |

△ の使い分け: cursorsetup に「何をするか」を書き、knowledge-base に「なぜそう判断したか」をリンクする。

### 今回 3 件それぞれの推奨

| 参照 | 第一候補 | cursorsetup に入る条件 |
|------|----------|------------------------|
| reviewable-html-workbench | `docs/research/` または `docs/ai/` | プラグイン導入を決め、レビュー手順を標準化したとき |
| ds-ai-coding-skills | `docs/research/`（アーキテクチャ比較） | AGENTS.md ルーター化・skill 分割・検証スクリプトを自分の基盤に採用したとき |
| 技術記事と言語化 | `docs/research/` または `docs/ai/` | `japanese-technical-writing` 等の skill 方針を更新するときのみ |

### 既存資産との対応

| 参照資料の概念 | 既存の資産 |
|----------------|------------|
| mizchi の retrospective-codify | cursorsetup の `retrospective-codify` skill |
| 日本語技術文書 | cursorsetup の `japanese-technical-writing` / `japanese-doc-review` |
| AGENTS.md 基盤 | cursorsetup の `repo-agent-bootstrap` |
| ナレッジの長期保管 | knowledge-base + `maintain-knowledge-base` skill |
| 設定と知識の分離 | [bokujuu-cursorsetup-integration.md](../ai/bokujuu-cursorsetup-integration.md) |

### 判断チェックリスト

1. **これはエージェントに毎回読ませたい「命令」か？** → Yes なら cursorsetup
2. **まだ採否が決まっていないか？** → Yes なら knowledge-base
3. **半年後に陳腐化しても履歴として残したいか？** → Yes なら knowledge-base（archive 可）
4. **install.ps1 で全マシンに配りたいか？** → Yes なら cursorsetup
5. **Obsidian でつなげて読みたい考察か？** → Yes なら knowledge-base

## Interpretation

### 暫定結論

| フェーズ | 置き場所 |
|----------|----------|
| 調査・検討・比較（今回） | **knowledge-base**（`docs/research/`） |
| 採用が固まった skill / rule / プラグイン運用 | **bokujuu_cursorsetup** |
| 特定プロジェクトだけの agent 知識 | そのプロジェクト repo の `docs/agent/` 等 |

**両方に同じ内容を書かない。** knowledge-base に厚く書き、cursorsetup には実行可能な薄い層だけ残す。

### 推奨の進め方（2 段階）

```text
Phase 1（今）: knowledge-base に調査ハブを置く
  - 外部参照の要約
  - Open Questions
  - 既存 cursorsetup skill との差分
  - 採用候補・不採用候補

Phase 2（判断後）: 採用分だけ bokujuu_cursorsetup へ
  - 新 skill / user-rule 更新
  - rule-index.md への追記
  - knowledge-base 側には「採用済み」リンクと要約だけ残す
```

mizchi の「調査メモから始めよ」、ds-ai-coding-skills の「docs/agent はプロジェクト知識」、本リポジトリの knowledge-base 設計は、いずれも Phase 1 を knowledge-base に置く方向で整合する。

## Open Questions

- [ ] reviewable-html-workbench を導入するか（Codex / Claude Code のどちらで使うか）
- [ ] ds-ai-coding-skills の `validate_agent_docs.py` 相当を cursorsetup に取り込むか
- [ ] AGENTS.md ルーター化を knowledge-base 自身にも強化するか（現状は AGENTS.md が配置ルール中心）
- [ ] mizchi の主張を踏まえ、skill 化と人間向けノートの境界をどう運用するか
- [ ] 専門家レビュー・失敗談を knowledge-base のどの type（`research` / `troubleshooting`）で残すか

## Related Notes

- [bokujuu-cursorsetup-integration.md](../ai/bokujuu-cursorsetup-integration.md)
- [github-knowledge-limits.md](github-knowledge-limits.md)
- [cursor-integration.md](../ai/cursor-integration.md)
- [ryo-lu-closer-to-material-judgment.md](../ai/ryo-lu-closer-to-material-judgment.md)
- [agent-skill-evaluation-reference.md](agent-skill-evaluation-reference.md) — スキル評価の参照（codex-skill-bench）

## References

- [reviewable-html-workbench](https://github.com/u-ichi/reviewable-html-workbench)
- [ds-ai-coding-skills](https://github.com/atsushi-green/ds-ai-coding-skills)
- [技術記事と言語化（mizchi / Zenn Fes PDF）](https://files.speakerdeck.com/presentations/6087aaf0bb094a5a8e0b780c78a9d121/%E6%8A%80%E8%A1%93%E8%A8%98%E4%BA%8B%E3%81%A8%E8%A8%80%E8%AA%9E%E5%8C%96.pdf)
- [bokujuu_cursorsetup rule-index](https://github.com/bokujuu/bokujuu_cursorsetup/blob/main/docs/rule-index.md)
