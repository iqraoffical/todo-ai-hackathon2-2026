---
id: 1
title: Create-project-constitution
stage: constitution
date: 2026-01-01
surface: agent
model: Qwen
feature: none
branch: main
user: iqra
command: /sp.constitution
labels: [constitution, todo-app, python]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
 - .specify/templates/spec-template.md
 - .specify/templates/tasks-template.md
 - README.md
tests:
 - none
---

## Prompt

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.


/sp.constitution  Project: In-Memory Python Todo Console App

Core principles:
- Clean code with type hints and modular classes (Task class, TodoManager class)
- Proper error handling and validation
- No external dependencies except standard library
- Follow Python best practices (PEP8) and proper project structure with src/ folder

Key standards:
- All features must be testable via CLI
- Use list of Task objects for in-memory storage
- Modular functions for each feature in separate modules where appropriate
- Error messages clear and user-friendly

Constraints:
- In-memory only (no persistence)
- CLI interface with simple command parsing
- Features: Add, Delete, Update, View, Mark Complete

Success criteria:
- All 5 features work without errors in console
- Code is readable, maintainable, and passes manual tests
- Zero unhandled exceptions

## Response snapshot

I've successfully updated the project constitution and aligned the dependent templates. Here's a summary of what was accomplished:

1. Created a new constitution for the In-Memory Python Todo Console App at `.specify/memory/constitution.md` with version 1.0.0
2. Updated the plan template to include constitution checks
3. Updated the spec template to reflect the project's functional requirements
4. Updated the tasks template to align with the project's modular approach and CLI requirements
5. Created a README.md file that references the constitution

The constitution now properly reflects the core principles you provided:
- Clean code with type hints and modular classes
- Proper error handling and validation
- No external dependencies except standard library
- Python best practices (PEP8) and proper project structure
- Testable CLI interface
- In-memory storage with Task objects
- Clear and user-friendly error messages

The templates have been updated to ensure consistency with these principles, and a README file was created to provide project context.

Suggested commit message: `docs: create constitution for In-Memory Python Todo Console App with aligned templates`

## Outcome

- ✅ Impact: Created project constitution and updated templates for In-Memory Python Todo Console App
- 🧪 Tests: No tests required for this task
- 📁 Files: Updated constitution.md, plan-template.md, spec-template.md, tasks-template.md, and created README.md
- 🔁 Next prompts: None
- 🧠 Reflection: The constitution properly captures the project principles and templates are aligned

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A