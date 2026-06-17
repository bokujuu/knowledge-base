# knowledge-base Repository Setup Specification

## 1. Purpose

This document is a setup specification for creating and maintaining a personal knowledge repository named `knowledge-base`.

The repository is intended to serve as a long-term, plain-text-centered storage location for personal and professional knowledge. It should be usable by both humans and AI agents, while avoiding unnecessary dependence on a specific application or proprietary format.

The repository should be suitable for:

- Personal knowledge accumulation
- Technical notes
- Work-related procedures and operational rules
- Research notes
- Hobby-related information
- AI-assisted retrieval and editing
- Obsidian-style Markdown usage
- Git-based version control
- Long-term portability

The primary format is Markdown. Structured data may be stored as CSV, JSON, JSONL, SQLite, or Parquet when appropriate.

---

## 2. Repository Name

Use the following repository name:

```text
knowledge-base
```

Recommended GitHub description:

```text
Personal knowledge base containing notes, references, documentation, and research.
```

Recommended visibility:

```text
Private
```

Reason:

- The repository may contain personal notes.
- It may contain work-related information.
- It may later include drafts, logs, references, or semi-structured data that should not be public.
- Private visibility allows the repository to be used as a personal knowledge infrastructure without excessive filtering.

---

## 3. Core Design Policy

The repository should follow these principles.

### 3.1 Plain Text First

Prefer files that can be read without special software.

Recommended formats:

- `.md`
- `.txt`
- `.csv`
- `.json`
- `.jsonl`
- `.yaml`
- `.toml`
- `.ps1`
- `.py`
- `.ahk`

Acceptable binary or semi-binary formats:

- `.parquet`
- `.sqlite`
- `.pdf`
- `.png`
- `.jpg`
- `.webp`
- `.xlsx`

Binary files should be stored only when they are useful as source materials, attachments, or datasets.

### 3.2 Markdown as the Primary Knowledge Format

Most notes should be written in Markdown.

Markdown is preferred because it is:

- Human-readable
- Git-friendly
- Searchable
- Portable
- Usable in Obsidian
- Easy for AI agents to parse
- Durable across future tool changes

### 3.3 GitHub as the Source of Truth

GitHub should be treated as the canonical storage location.

Other tools such as Obsidian, VS Code, local scripts, or AI agents may read and modify the repository, but the repository itself remains the source of truth.

### 3.4 Obsidian as a Viewer and Editor

Obsidian may be used as a viewer, editor, tag manager, and graph-based navigator.

Do not make the repository dependent on Obsidian-only features unless there is a clear reason.

Allowed Obsidian features:

- Wikilinks
- Tags
- Front matter
- Canvas files, if useful
- Local graph view

Use with caution:

- Dataview queries
- Plugin-specific syntax
- Plugin-generated metadata
- Complex canvas-only knowledge structures

The repository should remain useful even if Obsidian is no longer used.

### 3.5 AI Compatibility

AI agents should be able to:

- Search files
- Read Markdown notes
- Create new notes
- Update existing notes
- Summarize topics
- Create index files
- Normalize metadata
- Detect duplicate or obsolete notes
- Maintain folder structure

AI agents should not assume that the entire repository can be loaded into context at once. Retrieval should be based on search, tags, file paths, and indexes.

---

## 4. Initial Repository Structure

Create the following directory structure.

```text
knowledge-base/
├─ README.md
├─ AGENTS.md
├─ .gitignore
├─ .gitattributes
│
├─ docs/
│  ├─ _index.md
│  ├─ _templates/
│  │  ├─ note-template.md
│  │  ├─ research-template.md
│  │  ├─ procedure-template.md
│  │  ├─ troubleshooting-template.md
│  │  └─ glossary-template.md
│  │
│  ├─ work/
│  │  └─ README.md
│  ├─ technology/
│  │  └─ README.md
│  ├─ ai/
│  │  └─ README.md
│  ├─ personal/
│  │  └─ README.md
│  ├─ research/
│  │  └─ README.md
│  └─ glossary/
│     └─ README.md
│
├─ data/
│  ├─ README.md
│  ├─ csv/
│  ├─ json/
│  ├─ jsonl/
│  ├─ parquet/
│  └─ sqlite/
│
├─ attachments/
│  ├─ README.md
│  ├─ images/
│  ├─ pdf/
│  └─ other/
│
├─ scripts/
│  ├─ README.md
│  ├─ powershell/
│  ├─ python/
│  └─ ahk/
│
└─ archive/
   └─ README.md
```

---

## 5. Files to Create

The cloud agent should create the files described in this section.

---

## 5.1 README.md

Create `README.md` at the repository root with the following content.

```markdown
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
```

---

## 5.2 AGENTS.md

Create `AGENTS.md` at the repository root.

This file is intended for AI agents operating on the repository.

```markdown
# AGENTS.md

## Role of This Repository

This repository is a personal knowledge base. It contains notes, references, documentation, research, scripts, structured data, and supporting attachments.

The repository should be maintained carefully because it is intended for long-term use.

## General Rules for AI Agents

When editing this repository:

1. Prefer small, explicit changes.
2. Do not delete existing content unless explicitly instructed.
3. Do not overwrite notes without preserving important information.
4. Use Markdown for knowledge notes.
5. Use YAML front matter for metadata when useful.
6. Keep file names stable after creation unless renaming is clearly necessary.
7. Preserve user-written wording when possible.
8. If information appears outdated, mark it as outdated instead of deleting it.
9. When creating new files, place them in the most appropriate directory.
10. If uncertain where to place a note, place it under `docs/research/` or create a clearly named subfolder.

## Preferred File Types

Use:

- `.md` for notes and documentation
- `.csv` for simple tabular data
- `.json` for structured objects
- `.jsonl` for line-based structured records
- `.parquet` for larger analytical datasets
- `.sqlite` for relational local databases
- `.ps1` for PowerShell scripts
- `.py` for Python scripts
- `.ahk` for AutoHotKey scripts

Avoid storing proprietary or binary formats unless they are necessary as source materials.

## Markdown Front Matter

Use this format for standard notes:

```yaml
---
title: 
tags: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: active
type: note
---
```

Recommended `status` values:

- `active`
- `draft`
- `review`
- `outdated`
- `archived`

Recommended `type` values:

- `note`
- `reference`
- `procedure`
- `research`
- `troubleshooting`
- `glossary`
- `dataset`
- `script`
- `index`

## Writing Style

Write notes clearly and directly.

Prefer:

- Short headings
- Concrete examples
- Bullet lists where useful
- Code blocks for commands or scripts
- Tables for comparisons
- Links to related notes

Avoid:

- Vague titles
- Excessive nesting
- Duplicate notes
- Unexplained abbreviations
- Tool-specific syntax that reduces portability

## Tagging Rules

Use lowercase tags.

Prefer simple tags:

```text
excel
powerquery
python
powershell
ahk
d365
crm
ai
llm
automation
github
obsidian
research
procedure
troubleshooting
reference
```

Do not create many near-duplicate tags.

Avoid:

```text
PowerQuery
power-query
power_query
pq
```

Prefer one canonical tag:

```text
powerquery
```

## Linking Rules

Use Markdown links or Obsidian-style wikilinks where useful.

Acceptable:

```markdown
[Power Query](../technology/powerquery.md)
```

Acceptable for Obsidian use:

```markdown
[[Power Query]]
```

If using wikilinks, keep file names readable and stable.

## Directory Rules

Use `docs/work/` for work-related knowledge.

Use `docs/technology/` for technical notes.

Use `docs/ai/` for AI, LLM, agent, prompt, and automation notes.

Use `docs/personal/` for personal notes and hobby-related information.

Use `docs/research/` for investigation notes and unfinished research.

Use `docs/glossary/` for definitions of terms.

Use `data/` for structured data.

Use `attachments/` for images, PDFs, and other supporting files.

Use `scripts/` for reusable scripts.

Use `archive/` for obsolete or historical content.

## Maintenance Tasks

When asked to maintain the repository, AI agents may:

- Create index files
- Normalize front matter
- Add missing tags
- Detect duplicate notes
- Move outdated files to `archive/`
- Summarize long notes
- Split overly long notes
- Create glossary entries
- Generate README files for folders
- Convert notes into structured datasets where appropriate

## Safety and Privacy

Treat this repository as private.

Do not add secrets, passwords, API keys, tokens, personal identification numbers, or confidential third-party information unless explicitly instructed.

If a secret is detected, warn the user and recommend removing it from Git history if it has been committed.

## Commit Style

Use clear commit messages.

Examples:

```text
Add initial knowledge-base structure
Add Markdown note templates
Update tagging policy
Add Power Query reference notes
Archive outdated CRM memo
```
```

---

## 5.3 .gitignore

Create `.gitignore`.

```gitignore
# OS files
.DS_Store
Thumbs.db
desktop.ini

# Temporary files
*.tmp
*.temp
*.bak
*.swp
*.swo

# Editor files
.vscode/settings.json
.idea/

# Python
__pycache__/
*.pyc
.venv/
venv/

# Node
node_modules/

# Obsidian workspace state
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# Obsidian trash
.trash/

# Logs
*.log

# Local secrets
.env
.env.*
*.secret
secrets/
```

Note:

- `.obsidian/workspace.json` is ignored because it is usually local UI state.
- Do not ignore the entire `.obsidian/` directory automatically. Some configuration may be useful to version-control later.

---

## 5.4 .gitattributes

Create `.gitattributes`.

```gitattributes
# Normalize text files
* text=auto

# Markdown and text
*.md text eol=lf
*.txt text eol=lf
*.csv text eol=lf
*.json text eol=lf
*.jsonl text eol=lf
*.yaml text eol=lf
*.yml text eol=lf
*.toml text eol=lf
*.ps1 text eol=lf
*.py text eol=lf
*.ahk text eol=lf

# Binary files
*.png binary
*.jpg binary
*.jpeg binary
*.webp binary
*.gif binary
*.pdf binary
*.xlsx binary
*.xlsm binary
*.parquet binary
*.sqlite binary
*.db binary
```

---

## 5.5 docs/_index.md

Create `docs/_index.md`.

```markdown
---
title: Knowledge Index
tags:
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
---

# Knowledge Index

This is the top-level index for Markdown notes.

## Main Areas

- [Work](work/README.md)
- [Technology](technology/README.md)
- [AI](ai/README.md)
- [Personal](personal/README.md)
- [Research](research/README.md)
- [Glossary](glossary/README.md)

## Common Tags

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
- `github`
- `obsidian`
- `research`
- `procedure`
- `troubleshooting`
- `reference`

## Maintenance Notes

This index should be updated when major topic areas are added.
```

---

## 5.6 Folder README Files

Create the following README files.

### docs/work/README.md

```markdown
---
title: Work Notes
tags:
  - work
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
---

# Work Notes

This folder contains work-related notes, procedures, operational rules, meeting summaries, troubleshooting records, and project documentation.

Recommended subfolders may include:

- `crm/`
- `d365/`
- `excel/`
- `procedures/`
- `projects/`
- `meetings/`
```

### docs/technology/README.md

```markdown
---
title: Technology Notes
tags:
  - technology
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
---

# Technology Notes

This folder contains technical notes and references.

Recommended topics:

- Excel
- Power Query
- PowerShell
- Python
- AutoHotKey
- Git
- GitHub
- Windows
- Local development environments
```

### docs/ai/README.md

```markdown
---
title: AI Notes
tags:
  - ai
  - llm
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
---

# AI Notes

This folder contains notes about AI, LLMs, AI agents, prompts, workflows, experiments, and automation.

Recommended topics:

- Cloud AI agents
- Local LLMs
- Prompt design
- RAG
- GitHub-based knowledge workflows
- Agent instructions
- Evaluation records
```

### docs/personal/README.md

```markdown
---
title: Personal Notes
tags:
  - personal
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
---

# Personal Notes

This folder contains personal notes, hobby-related information, references, ideas, observations, and learning records.
```

### docs/research/README.md

```markdown
---
title: Research Notes
tags:
  - research
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
---

# Research Notes

This folder contains research notes, investigation logs, unfinished inquiries, comparisons, and source-based summaries.

Use this folder when the final category is not yet clear.
```

### docs/glossary/README.md

```markdown
---
title: Glossary
tags:
  - glossary
  - index
created: 2026-06-17
updated: 2026-06-17
status: active
type: index
---

# Glossary

This folder contains definitions of terms, abbreviations, systems, tools, and concepts.
```

### data/README.md

```markdown
# data

This folder stores structured data.

Recommended formats:

- CSV for simple tables
- JSON for structured objects
- JSONL for record-oriented logs
- Parquet for larger analytical datasets
- SQLite for relational local datasets

Avoid storing sensitive data unless there is a clear reason.
```

### attachments/README.md

```markdown
# attachments

This folder stores supporting files such as images, PDFs, screenshots, and other reference materials.

Recommended subfolders:

- `images/`
- `pdf/`
- `other/`

When possible, reference attachments from Markdown notes using relative links.
```

### scripts/README.md

```markdown
# scripts

This folder stores reusable scripts.

Recommended subfolders:

- `powershell/`
- `python/`
- `ahk/`

Scripts should include comments explaining their purpose, expected inputs, and usage.
```

### archive/README.md

```markdown
# archive

This folder stores outdated, deprecated, historical, or superseded materials.

Do not delete old knowledge immediately if it may be useful for historical reference.

When moving a file to archive, consider adding a note explaining why it was archived.
```

---

## 5.7 Templates

Create the following templates under `docs/_templates/`.

---

### docs/_templates/note-template.md

```markdown
---
title: 
tags: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: draft
type: note
---

# Title

## Summary

Write a short summary.

## Details

Write the main content.

## Related Notes

- 

## References

- 
```

---

### docs/_templates/research-template.md

```markdown
---
title: 
tags:
  - research
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: draft
type: research
---

# Title

## Question

What is being investigated?

## Background

Why this topic matters.

## Findings

- 

## Evidence

- 

## Interpretation

What the findings likely mean.

## Open Questions

- 

## Related Notes

- 

## References

- 
```

---

### docs/_templates/procedure-template.md

```markdown
---
title: 
tags:
  - procedure
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: draft
type: procedure
---

# Title

## Purpose

Describe the purpose of this procedure.

## Scope

Describe when this procedure applies.

## Prerequisites

- 

## Steps

1. 
2. 
3. 

## Expected Result

Describe the expected result.

## Troubleshooting

| Problem | Possible Cause | Action |
|---|---|---|
|  |  |  |

## Related Notes

- 
```

---

### docs/_templates/troubleshooting-template.md

```markdown
---
title: 
tags:
  - troubleshooting
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: draft
type: troubleshooting
---

# Title

## Symptom

Describe the problem or error.

## Environment

- OS:
- Application:
- Version:
- Related system:

## Cause

Describe the known or suspected cause.

## Solution

Describe the solution.

## Workaround

Describe temporary workarounds, if any.

## Prevention

Describe how to prevent recurrence.

## Related Notes

- 
```

---

### docs/_templates/glossary-template.md

```markdown
---
title: 
tags:
  - glossary
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: draft
type: glossary
---

# Term

## Definition

Write the definition.

## Context

Describe where the term is used.

## Related Terms

- 

## Related Notes

- 
```

---

## 6. Naming Rules

### 6.1 File Names

Use lowercase English file names where possible.

Preferred:

```text
powerquery-relative-path.md
crm-owner-rule.md
github-knowledge-base-design.md
```

Avoid:

```text
memo.md
new.md
final.md
latest.md
test.md
名称未設定.md
```

### 6.2 Japanese Titles Are Allowed

File names may be English, but note titles may be Japanese.

Example:

```markdown
---
title: Power Queryの相対パス運用
tags:
  - powerquery
  - excel
  - procedure
created: 2026-06-17
updated: 2026-06-17
status: active
type: procedure
---

# Power Queryの相対パス運用
```

This approach improves file portability while keeping content readable.

---

## 7. Metadata Rules

Use YAML front matter for notes that are intended to be reused, searched, or maintained.

Recommended fields:

```yaml
---
title: 
tags: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: active
type: note
summary: 
---
```

### 7.1 Field Definitions

| Field | Meaning |
|---|---|
| `title` | Human-readable title |
| `tags` | Topic tags |
| `created` | Creation date |
| `updated` | Last meaningful update date |
| `status` | Current state |
| `type` | Document type |
| `summary` | Short explanation of the note |

### 7.2 Status Values

| Status | Meaning |
|---|---|
| `active` | Currently valid |
| `draft` | Incomplete |
| `review` | Needs review |
| `outdated` | May be obsolete |
| `archived` | Retained for history |

### 7.3 Type Values

| Type | Meaning |
|---|---|
| `note` | General note |
| `reference` | Reference information |
| `procedure` | Step-by-step procedure |
| `research` | Investigation or research |
| `troubleshooting` | Error and solution |
| `glossary` | Term definition |
| `dataset` | Dataset explanation |
| `script` | Script documentation |
| `index` | Index page |

---

## 8. Tagging Rules

Tags should be consistent and not overly granular.

### 8.1 Recommended Initial Tags

```text
excel
powerquery
powershell
python
ahk
d365
crm
ai
llm
automation
github
obsidian
windows
research
procedure
troubleshooting
reference
personal
work
```

### 8.2 Tag Normalization

Use:

```text
powerquery
```

Do not mix:

```text
PowerQuery
power-query
power_query
pq
```

Use:

```text
d365
```

Do not mix:

```text
Dynamics365
dynamics-365
dynamics
```

Use:

```text
ai
llm
```

Do not overuse highly specific tags unless needed.

---

## 9. Linking Rules

Use links to connect related notes.

Examples:

```markdown
## Related Notes

- [[GitHub Knowledge Base Design]]
- [[Power Query Relative Path]]
- [[CRM Owner Rule]]
```

Markdown relative links are also acceptable.

```markdown
- [Power Query Relative Path](../technology/powerquery-relative-path.md)
```

If maximum portability is required, prefer Markdown links.

If Obsidian graph usage is important, wikilinks are acceptable.

A mixed approach is allowed, but avoid unnecessary inconsistency.

---

## 10. Data Storage Policy

Structured data should be placed under `data/`.

### 10.1 CSV

Use CSV when:

- Data is tabular
- Human review is useful
- File size is moderate
- Git diffs are useful

### 10.2 JSON

Use JSON when:

- Data is nested
- Data represents configuration
- AI or scripts need structured objects

### 10.3 JSONL

Use JSONL when:

- Data is a log
- Each line is an independent record
- Incremental appending is useful

### 10.4 Parquet

Use Parquet when:

- Data is large
- Analytical processing is expected
- Git diffs are not important
- Performance matters more than readability

### 10.5 SQLite

Use SQLite when:

- Relational structure is useful
- Queries are important
- Multiple related tables exist

---

## 11. Attachment Policy

Attachments should be stored only when they support notes.

Examples:

- Screenshots
- Diagrams
- PDFs
- Exported reports
- Reference images

Use relative links from notes.

Example:

```markdown
![System Diagram](../../attachments/images/system-diagram.png)
```

Large files should be avoided unless necessary.

If large binary files become common, consider Git LFS.

---

## 12. Archive Policy

Do not delete old notes casually.

When information becomes outdated:

1. Change `status` to `outdated`, or
2. Move the file to `archive/`, or
3. Add a warning section at the top.

Example:

```markdown
> This note may be outdated. It is retained for historical reference.
```

Archived notes may still be useful for understanding past decisions.

---

## 13. Suggested Initial Topics

After creating the repository, the agent may create placeholder files or folders for these topics if requested.

### Work

```text
docs/work/crm/
docs/work/d365/
docs/work/excel/
docs/work/procedures/
docs/work/projects/
docs/work/meetings/
```

### Technology

```text
docs/technology/excel/
docs/technology/powerquery/
docs/technology/powershell/
docs/technology/python/
docs/technology/ahk/
docs/technology/github/
docs/technology/windows/
```

### AI

```text
docs/ai/agents/
docs/ai/llm/
docs/ai/prompts/
docs/ai/rag/
docs/ai/evaluations/
```

### Personal

```text
docs/personal/hobby/
docs/personal/ideas/
docs/personal/learning/
```

---

## 14. Initial Setup Tasks for Cloud Agent

A cloud agent receiving this document should perform the following tasks.

### Task 1: Create or Use Repository

Create or use a private GitHub repository named:

```text
knowledge-base
```

Description:

```text
Personal knowledge base containing notes, references, documentation, and research.
```

### Task 2: Create Directory Structure

Create the directory structure defined in Section 4.

Because Git does not track empty directories, add `README.md` or `.gitkeep` files where needed.

### Task 3: Create Core Files

Create:

- `README.md`
- `AGENTS.md`
- `.gitignore`
- `.gitattributes`
- `docs/_index.md`
- Folder-level `README.md` files
- Templates under `docs/_templates/`

### Task 4: Commit Changes

Create an initial commit.

Recommended commit message:

```text
Initialize personal knowledge base
```

### Task 5: Report Result

After completion, report:

- Created repository name
- Created files
- Created directories
- Any skipped items
- Any assumptions made

---

## 15. Recommended First Commit Contents

The first commit should include only repository structure, rules, and templates.

Do not add large data files or personal content in the first commit unless explicitly instructed.

Recommended first commit:

```text
README.md
AGENTS.md
.gitignore
.gitattributes
docs/_index.md
docs/_templates/note-template.md
docs/_templates/research-template.md
docs/_templates/procedure-template.md
docs/_templates/troubleshooting-template.md
docs/_templates/glossary-template.md
docs/work/README.md
docs/technology/README.md
docs/ai/README.md
docs/personal/README.md
docs/research/README.md
docs/glossary/README.md
data/README.md
attachments/README.md
scripts/README.md
archive/README.md
```

---

## 16. Optional Future Enhancements

These are not required for the initial setup.

### 16.1 Obsidian Setup

Optional files:

```text
.obsidian/
```

Recommended approach:

- Do not commit workspace state.
- Consider committing selected settings only after confirming they are useful.
- Avoid making the repository dependent on plugin-specific behavior.

### 16.2 GitHub Issues as Inbox

GitHub Issues may be used as a capture inbox.

Examples:

- A note to write later
- A topic to research
- A maintenance task
- A duplicate cleanup task

Suggested labels:

```text
inbox
research
note
cleanup
archive
question
```

### 16.3 GitHub Actions

Optional future automation:

- Check Markdown links
- Validate YAML front matter
- Detect broken internal links
- Generate indexes
- Lint Markdown

Do not add GitHub Actions during initial setup unless requested.

### 16.4 Search Index

Optional future search tools:

- ripgrep
- SQLite index
- local vector database
- full-text search
- Obsidian search
- GitHub code search

Initial setup does not require a dedicated search index.

---

## 17. Practical Operating Rules

Use the repository continuously but keep rules simple.

Recommended routine:

1. Capture information quickly.
2. Add basic tags.
3. Add links when obvious.
4. Refactor later.
5. Archive rather than delete.
6. Prefer one useful note over perfect taxonomy.

Avoid spending too much time designing the perfect folder hierarchy at the beginning.

The structure should evolve with actual usage.

---

## 18. Summary

This repository should function as a durable personal knowledge base.

GitHub provides:

- Version control
- Remote storage
- AI-agent compatibility
- Long-term accessibility

Markdown provides:

- Human readability
- Portability
- Obsidian compatibility
- Easy search and editing

The repository should be managed as a long-term knowledge infrastructure rather than a temporary memo folder.

The most important success factor is not the initial folder structure, but consistent capture, tagging, linking, and periodic maintenance.
