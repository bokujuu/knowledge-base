---
title: ローカルリアルタイム翻訳の実行可能性
tags:
  - ai
  - llm
  - research
  - reference
created: 2026-07-10
updated: 2026-07-10
status: active
type: research
summary: DeepL風ローカル即時翻訳の実行可能性（MT/NLLB/軽量LLM、スペック・ライセンス）
---

# ローカルリアルタイム翻訳の実行可能性

## TL;DR

- DeepL/Google風の「打ちながら訳が更新される」体験は、他サービス・自ホスト・ローカルMTでも再現しうる。核はエンジンより **debounce（打ち終わり待ち）+ 最新結果のみ採用**。
- 翻訳特化は **MT**（機械翻訳）。**NLLB** はその多言語翻訳専用モデルの一例。一般のチャット用軽量LLMとは別物。
- **作業ノートPC**（i5-1345U / RAM約16GB / Iris Xe）では小型MTの試用は現実的だが、打鍵リアルタイムは我慢ライン。軽量LLMは補助向き。
- **プライベートPC**（RAM 64GB / RTX 5080 16GB VRAM / Win11 / 容量不問）なら、小型〜中型MTの即時翻訳は十分現実的。軽量〜中型LLMもGPUで実用可。
- **NLLBは CC-BY-NC（非商用）**。社内・商用は Opus/Argos 系や MIT・Apache 系LLMを優先検討。

## 主要な質問・依頼内容

1. DeepL/Google翻訳のような即時反映システムの他例はあるか。ローカル実装の運用はどうなるか（n秒周期でフォームを回すイメージか）。
2. MT・NLLBとは何か。このPCでモデル取得・試用できるか。
3. 知りたいのはマシンスペック適合、取得可能性、ライセンス。軽量LLMについても同様に知りたい。
4. 作業PCは C 空き確保後に試す方針。プライベートPC条件での実行可能性も確認。

## 実施した調査・確認事項

### 作業ノートPCの実測スペック

| 項目 | 値 |
|------|-----|
| CPU | 13th Gen Intel Core i5-1345U（10コア / 12スレッド） |
| RAM | 約 15.6 GB |
| GPU | Intel Iris Xe Graphics（内蔵） |
| C: 空き | 約 61.7 GB（調査時点） |

### プライベートPC（申告）

| 項目 | 値 |
|------|-----|
| RAM | 64 GB |
| GPU | NVIDIA GeForce RTX 5080（**16 GB GDDR7**、公式スペック確認） |
| OS | Windows 11 |
| ストレージ | 容量は制約にしない |

### 既存の類似システム（調査メモ）

- クラウド: DeepL / Google / Bing / Yandex など
- OS・ブラウザ: Windows Translator、Apple Translation、Firefox Translations（Bergamot）
- 自ホスト: LibreTranslate、Argos Translate、Lingva
- ローカル特化寄りの例: NLLB + CTranslate2、Zellig、FreeTranslate など

### ローカル実装の運用像

- 固定 `setInterval` より **入力イベント + debounce（概ね150–400ms）**
- 日本語は IME 確定（`compositionend`）後に走らせると安定しやすい
- モデルは **常駐**、推論はオンデマンド。古いリクエストは破棄（latest-only）
- エンジン候補: 翻訳特化MT（NLLB / Opus / LibreTranslate）＞ 一般LLM

## 重要なポイント・発見事項

### 用語

- **MT（Machine Translation）**: 文を別言語に写すことに特化した機械翻訳。DeepLもMTサービスの一種。
- **NLLB（No Language Left Behind）**: Metaの多言語翻訳専用モデル。CTranslate2 はそれを高速実行するエンジン。
- **軽量LLM**: おおむね 1B〜8B、量子化で数GB。会話・言い換えもできるが、打鍵連動翻訳では遅延・揺らぎが不利になりやすい。

### 実行可能性（作業ノートPC前提）

| 系統 | 取得 | このPCでの見込み | 打鍵リアルタイム向き |
|------|------|------------------|----------------------|
| Opus-MT / Argos / LibreTranslate | 可 | 試しやすい本命。CPUでも現実的 | ○〜△ |
| NLLB distilled 600M | 可（HF等） | 動くが遅め〜我慢ライン | △ |
| NLLB 1.3B / 3.3B | 可 | 重い。リアルタイムUX向きでない | ×〜△ |
| 軽量LLM 1–3B（Ollama等） | 可 | 十分動く | △（試せるが追従は厳しい） |
| 軽量LLM 7–8B | 可 | 動くがRAM余裕少なめ | ×寄り |
| 14B超 | 可だが非推奨 | 厳しい | × |

### 実行可能性（プライベートPC前提）

| 観点 | 作業ノートPC | プライベートPC |
|------|--------------|----------------|
| ボトルネック | RAM・内蔵GPU・空き容量 | ほぼなし（VRAM 16GBが上限の主因） |
| 小型MT（Opus/Argos/NLLB 600M） | 我慢〜実用 | **余裕でリアルタイム向き** |
| NLLB 1.3B級 | 重い | **快適に常駐可** |
| 軽量LLM 1–8B | 動くが打鍵追従は厳しい | **GPUで十分速い。補助〜簡易リアルタイムも可** |
| 中型LLM 〜14B（量子化） | 厳しい | **VRAM内に収まりやすい。実用可** |
| 大モデル 30B超 / 70B | 不可寄り | 量子化次第で動くが、**打鍵リアルタイム向きではない** |

プライベートPC向けの優先順位:

1. **本命**: LibreTranslate / Argos、または NLLB（個人実験）を GPU 常駐 + debounce UI
2. **品質・文体の補助**: Qwen / Phi / Llama 系の 3B–8B（Ollama等）
3. **最初にやらなくてよいこと**: 70B級や「全部LLMでDeepL代替」

VRAM 16GBは「なんでも載る」ではなく、**同時常駐できるモデルサイズの上限**。翻訳用NLLB常駐 + 別で7B LLM、は現実的。70B級を打鍵ごとに回すのは筋が悪い。

### ライセンス（一般情報・法的助言ではない）

| 対象 | 目安 | 個人試用 | 社内・商用の感覚 |
|------|------|----------|------------------|
| NLLB-200 | CC-BY-NC 4.0 | 問題になりにくい | **原則注意（非商用）** |
| Opus-MT | 多く CC-BY 4.0 | 可 | 比較的有利（モデル個別確認） |
| Argos / LibreTranslate コード | MITが多い | 可 | コードは緩い。**各言語モデルは個別確認** |
| Phi 系 | MITが多い | 可 | 緩め寄り |
| Qwen2.5 小〜中 / Mistral 7B系 | Apache 2.0が多い | 可 | 緩め寄り（版・サイズで差あり得る） |
| Llama 3.2 | Llama Community License | 可 | 商用可方向だが規約・帰属・巨大サービス条項あり |
| Gemma | Gemma Terms | 可 | 商用可方向だが Google 条件に従う |

スペックが良くてもライセンスは変わらない。個人のプライベート利用なら実験しやすい。社内ツール化を見据えるなら Opus/Argos や MIT/Apache 系を優先。

## 決定事項・未決事項

### 決定・合意に近いこと

- 作業ノートPCでの実験は **Cドライブ空きを確保してから**。
- プライベートPCなら容量待ちは不要で、試すならそちらが本戦場。
- 「打ち切り待ち（debounce）」の発想は理解済み。

### 未決・次に決めること

- 最初に触る系統の選択（推奨候補）:
  1. Argos / LibreTranslate（小型MT・試しやすい）
  2. NLLB 600M（品質寄せの実験。**非商用ライセンスに注意**）
  3. 軽量LLM 1–3B（言い換え・補助。リアルタイム主戦場ではない）
- 用途が「個人実験」か「社内業務組み込み」かで、ライセンス優先度が変わる。
- インストール手段（Docker / Ollama / 素のHFモデル等）は未確定。

## 参考情報

### 関連する技術・概念

- **MT**: 機械翻訳全般。クラウドでもローカルでも同じカテゴリ。
- **NLLB**: Metaの多言語翻訳専用モデル。小型版（distilled 600M）がPC試用向き。
- **CTranslate2**: Transformer系翻訳モデルを高速推論するエンジン。
- **debounce**: 入力後しばらく無操作を待ってから翻訳を走らせるUI側の技法。
- **軽量LLM**: 小型の汎用言語モデル。翻訳もできるがMT特化より遅いことが多い。

### 検索・調査で確認した内容

#### ローカル翻訳ツール・モデル

- NLLB distilled 600M（ライセンス CC-BY-NC）
  - [Hugging Face - facebook/nllb-200-distilled-600M](https://huggingface.co/facebook/nllb-200-distilled-600M)
  - [Creative Commons - Attribution-NonCommercial 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
- ローカル実行・周辺ツール例
  - [Zellig — translate anything, locally](https://zellig.kodaskills.co/)
  - [GitHub - Kodaskills/zellig](https://github.com/Kodaskills/zellig)
  - [GitHub - Helsinki-NLP/Opus-MT](https://github.com/helsinki-nlp/opus-mt)
  - [LibreTranslate FAQ](https://docs.libretranslate.com/guides/faq/)
  - [Argos Open Tech Data](https://data.argosopentech.com/)

#### 軽量LLMの要件・ライセンス

- OllamaのRAM/モデルサイズの目安（外部解説）
  - [Local AI Master - Ollama System Requirements](https://localaimaster.com/blog/ollama-system-requirements)
- オープンウェイトモデルのライセンス比較（概観）
  - [GIGAGPU - Open-Weight LLM Licensing Comparison](https://gigagpu.com/open-weight-licensing-comparison/)
  - [Llama 3.2 Community License（GitHub）](https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/LICENSE)

#### GPUスペック

- [NVIDIA - GeForce RTX 5080](https://www.nvidia.com/en-gb/geforce/graphics-cards/50-series/rtx-5080/)（16 GB GDDR7）
- [TechPowerUp - GeForce RTX 5080 Specs](https://www.techpowerup.com/gpu-specs/geforce-rtx-5080.c4217)

### 由来

- Obsidian Vault セッションサマリー（2026-07-10）を knowledge-base 向けに移植・追記。
