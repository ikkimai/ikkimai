---
name: project-context
description: Maintain and use a compact map of the project before making changes. Prevents unnecessary repository-wide reading and reduces context/ticket usage.
---

# Project Context

## Purpose
Keep a concise understanding of the repository so tasks can be solved with the smallest useful amount of context.

## Rules
1. Before changing code, identify:
   - application entry points
   - relevant feature/module
   - data/API layer involved
   - shared components/design system
   - tests related to the requested behavior
2. Prefer repository search, symbol search, imports, and references over opening unrelated files.
3. Never read the entire repository unless explicitly required.
4. Treat existing architecture and conventions as the default.
5. If a project map exists, update it only when architecture actually changes.
6. Do not create documentation for trivial changes.
7. When uncertain, state the smallest missing piece of context and inspect only that.

## Output discipline
At the end of investigation, keep an internal summary containing:
- Relevant files
- Relevant symbols
- Existing pattern to reuse
- Planned change
- Validation command

Do not repeatedly rediscover the same information during a task.
