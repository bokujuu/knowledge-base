---
title: 原価非開示と利益判定におけるセキュリティ用語
tags:
  - work
  - security
  - reference
created: 2026-06-30
updated: 2026-06-30
status: active
type: reference
---

# 原価非開示と利益判定におけるセキュリティ用語

## Summary

製品原価を営業に直接示さない一方で、利益判定ルール（A/B/C 等）と計算ファイルを公開している運用は、**推論攻撃（Inference Attack）** に弱く、実質的には低い **Work Factor** に依存した **Security by Obscurity（隠蔽によるセキュリティ）** に近い。

一方、原価単価マスタの全件公開は **Least Privilege / Need-to-Know** の観点から制限すべきである。案件単位の利益率・総原価・総利益の表示は、**データ最小化（Data Minimization）** に沿った派生情報の開示として正当化できる。

## 背景（社内運用の整理）

| 項目 | 状態 |
|------|------|
| 製品原価 | 営業担当には提示しない決まり |
| 販売価格の承認 | 利益率に応じた A/B/C… 判定（例: 60% 以上なら A）が公知 |
| 判定の計算 | 全員に公開されたファイルで実行可能 |
| 実質的な状態 | ファイル操作と連立方程式で原価・利益率を逆算可能 |

つまり、情報保護はアクセス制御より「逆算の手間」に寄っている。

## 結論：使える言葉

社内説明・提案資料で使える用語は主に以下。

1. **Security by Obscurity / 隠蔽によるセキュリティ**
2. **Inference Attack / 推論攻撃**
3. **Work Factor / 攻撃コスト・解析コスト**
4. **Least Privilege / 最小権限**
5. **Need-to-Know / 知る必要性**
6. **Data Minimization / データ最小化**
7. **Defense in Depth / 多層防御**

今回の事情に最も合う表現:

> 現在の運用は、原価情報の直接開示は避けているが、公開された判定ロジックと計算ファイルにより、推論攻撃に弱い状態になっている。つまり、実質的には労力だけを障壁とする security by obscurity に近い。

## 1. Security by Obscurity（隠蔽によるセキュリティ）

**Security by Obscurity** は、仕組みや実装が知られていないことに依存する防御である。OWASP 系の説明でも、設計や実装の秘密性に依存して安全だと考える状態として説明され、**単独の防御としては弱い**とされる。

- [Security through Obscurity - OWASP Juice Shop](https://help.owasp-juice.shop/part2/security-through-obscurity.html)

今回のケースは完全な「隠蔽」ではない。より正確には **不完全な隠蔽** または **解析コストに依存した隠蔽** である。

| 観点 | 状態 |
|------|------|
| 原価そのもの | 見せない |
| 利益率判定ルール | 公知 |
| 判定ファイル | 公開 |
| 逆算 | 入力を変えれば原価や利益率を求められる |

社内説明の例:

> 現行運用は、原価そのものをアクセス制御で守っているというより、原価を求めるための手間に依存している。これは security by obscurity に近く、統制としての強度が低い。

## 2. Inference Attack（推論攻撃）

本質は、**直接アクセスできない原価を、許可された情報から逆算できる** 点にある。セキュリティ・データ保護の文脈では **Inference Attack（推論攻撃）** と呼べる。推論攻撃は、許可された情報や一見センシティブでない情報を組み合わせて、制限されている情報を導出する攻撃である。データベース分野では、アクセス制御だけでは間接的な情報取得を防げないため、推論制御が必要になると論じられている。

- [Inference Attacks and Control on Database Structures (ResearchGate)](https://www.researchgate.net/publication/273127783_Inference_Attacks_and_Control_on_Database_Structures)

| 項目 | 状態 |
|------|------|
| 直接秘匿したい情報 | 製品原価 |
| 公開されている情報 | 販売価格、利益判定 A/B/C、判定ルール、計算ファイル |
| 起きていること | 原価を直接見ずに、利益率判定から原価を逆算できる |
| セキュリティ上の呼び方 | 推論攻撃、推論による情報漏えい、inference risk |

社内説明では Security by Obscurity よりこちらが実態に近い。

> 原価を直接表示していなくても、公開された利益判定と計算ロジックから原価を推論できるため、情報保護上は inference risk が存在する。

## 3. Work Factor（攻撃コスト・解析コスト）

労力を防御に使う考え方自体は完全に無意味ではない。セキュリティでは **Work Factor**、つまり攻撃や解析に必要なコストという考え方がある。暗号で総当たりに天文学的な時間がかかるなら、それは実質的な防御になる。

ただし、Excel 操作と連立方程式で求められる程度であれば **Work Factor が低い** ため、防御としては弱い。

> 労力を障壁にすること自体は work factor として一定の意味を持つが、今回の操作は専門的攻撃ではなく通常の表計算操作で実行可能であり、防御として評価できるほどの work factor ではない。

「労力による防御はすべて無意味」と言うと反論されやすい。**「今回の労力は低すぎるため、統制として扱うには弱い」** と言うほうが通りやすい。

## 4. Least Privilege / Need-to-Know（最小権限・知る必要性）

原価リストを全員に丸ごと表示しないことには正当性がある。**Least Privilege（最小権限）** は、ユーザーやプロセスのアクセス権を、割り当てられた業務を遂行するために必要な最小限に制限する原則である。

- [least privilege - NIST CSRC Glossary](https://csrc.nist.gov/glossary/term/least_privilege)

実務的には **Need-to-Know（知る必要性）** と言ってもよい。

| 論点 | 判断 |
|------|------|
| 製品別原価リストを全員に見せる | 不要。持ち出しリスクが高い |
| 個別案件の利益率を表示する | 業務判断に必要なら許容し得る |
| 個別案件の総原価・総利益を表示する | 案件承認に必要なら許容し得る |
| 原価単価一覧を出す | Need-to-Know を超える可能性が高い |

## 5. 原価単価と案件単位の派生情報の分離

守るべき対象を「原価そのもの」と雑に置くと、利益率表示も反対されやすい。守るべき対象を分解する。

| 情報 | リスク | 扱い |
|------|--------|------|
| 製品別の原価単価マスタ | 高い | 非表示・制限 |
| 原価リストの一括出力 | 高い | 非表示・制限 |
| 個別案件の総原価 | 中 | 案件関係者に限定して表示 |
| 個別案件の総利益 | 中 | 案件関係者に限定して表示 |
| 個別案件の利益率 | 中〜低 | 承認判断のため表示 |
| A/B/C 判定 | 低いが不透明 | 廃止または補助表示化 |

**「原価を全部見せたい」のではなく、「承認判断に必要な派生情報だけを見せたい」** という説明になる。

案件単位の開示は **Data Minimization（データ最小化）** — 目的達成に必要な量・範囲だけを扱う — に沿う。マスタ全件公開は一括持ち出し（bulk exfiltration）のリスクが大きい。

## 6. 提案の安全な言い方

> 原価リストを全件公開することには、一覧性・検索性・持ち出し容易性の観点でリスクがあるため、現行どおり制限すべきである。
> 一方で、個別案件の承認判断に必要な利益率、総原価、総利益は、すでに公開された判定ロジックと計算ファイルから推論可能である。
> したがって、A/B/C のような間接表示で隠すことは、実質的には低い work factor に依存した security by obscurity であり、統制としての効果は限定的である。
> 原価単価リストは制限しつつ、案件単位の派生情報として利益率・総原価・総利益を表示するほうが、業務上の透明性と情報保護のバランスがよい。

**Defense in Depth（多層防御）** として、一覧制限・権限・ログ・表示制御を組み合わせる説明も有効である。

## 7. キーワードの優先順位（社内資料向け）

| 優先度 | 用語 | 使い方 |
|--------|------|--------|
| 1 | 推論リスク / Inference Risk | 今回の実態に最も合う |
| 2 | 最小権限 / Least Privilege | 原価リストを出さない根拠 |
| 3 | Need-to-Know | 営業に必要な範囲だけ見せる根拠 |
| 4 | Work Factor | 労力を防御にすることの限界説明 |
| 5 | Security by Obscurity | 現行運用への批判概念 |
| 6 | Defense in Depth | 一覧制限、権限、ログ、表示制御を組み合わせる説明 |

## 8. そのまま使える短い説明

> 現行の A/B/C 判定は、原価を直接表示しないという意味では一定の抑止効果があるが、判定ルールと計算ファイルが公開されている以上、原価や利益率は推論可能である。
> これはアクセス制御による保護というより、利用者に逆算の手間を課すことによる保護であり、低い work factor に依存した security by obscurity に近い。
> 一方で、製品別原価リストを全件表示することは、一覧性と持ち出し容易性の観点でリスクが高いため、least privilege / need-to-know の観点から制限すべきである。
> したがって、原価単価マスタや全件リストは非公開のままとし、案件単位の承認判断に必要な利益率、総原価、総利益のみを表示する設計が妥当である。

この論理であれば、セキュリティを否定するのではなく、**「守るべき粒度を変える」** 提案になる。

## Related Notes

- [Work Notes](README.md)

## References

- [Security through Obscurity - OWASP Juice Shop](https://help.owasp-juice.shop/part2/security-through-obscurity.html)
- [Inference Attacks and Control on Database Structures (ResearchGate)](https://www.researchgate.net/publication/273127783_Inference_Attacks_and_Control_on_Database_Structures)
- [least privilege - NIST CSRC Glossary](https://csrc.nist.gov/glossary/term/least_privilege)
- [The Non-Security of Secrecy - Bruce Schneier](https://www.schneier.com/essays/archives/2004/10/the_non-security_of.html)
- [CWE-656: Reliance on Security Through Obscurity](https://cwe.mitre.org/data/definitions/656.html)
