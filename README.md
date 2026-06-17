# knowledge-base

Personal knowledge base containing notes, references, documentation, and research.

## Purpose

This repository is a long-term personal knowledge base for storing information that may be useful in the future.

It is designed to collect and organize knowledge across both professional and personal domains using durable, portable, and searchable formats.

## Main Use Cases

- Technical notes
- Work procedures
- Operational rules
- Research notes
- Hobby-related information
- AI and automation experiments
- Troubleshooting records
- Reusable references
- Structured datasets

## Design Principles

- Plain text first
- Markdown as the primary format
- Git-based version control
- Human-readable and machine-readable
- Searchable over overly decorative
- Connected knowledge over isolated notes
- Long-term portability
- Obsidian-compatible but not Obsidian-dependent
- AI-agent-readable but not AI-agent-dependent

## Repository Structure

```text
docs/          Markdown notes and documentation
data/          Structured data such as CSV, JSON, JSONL, SQLite, and Parquet
attachments/   Images, PDFs, and other supporting files
scripts/       Utility scripts and automation tools
archive/       Deprecated or historical materials
```

詳細な索引は [docs/_index.md](docs/_index.md) を参照してください。

## Metadata

Markdown notes should use YAML front matter where appropriate.

Example:

```yaml
---
title: Example Note
tags:
  - example
  - reference
created: 2026-06-17
updated: 2026-06-17
status: active
type: note
---
```

## Tagging Policy

Tags should be used to connect knowledge across folder boundaries.

Examples:

- `excel`
- `powerquery`
- `powershell`
- `python`
- `ahk`
- `d365`
- `crm`
- `ai`
- `llm`
- `automation`
- `research`
- `procedure`
- `troubleshooting`

## AI Usage

This repository may be used by AI agents for search, summarization, note creation, refactoring, and maintenance.

AI agents should retrieve only relevant files instead of attempting to load the entire repository into context.

See `AGENTS.md` for detailed instructions.

## Related Repositories

- [bokujuu_cursorsetup](https://github.com/bokujuu/bokujuu_cursorsetup) — Cursor / Codex のグローバル設定（User Rules・Skills）
- セットアップ仕様（SoT）: [docs/technology/github/knowledge-base-repo-setup.md](docs/technology/github/knowledge-base-repo-setup.md)
