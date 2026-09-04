---
name: token-budget-guard
description: Control agent effort and context size to minimize token and usage consumption. Use for normal coding tasks unless a deep investigation is clearly necessary.
icon: gauge
color: green
---

# Token Budget Guard

## Goal
Solve the task with the fewest useful agent steps, smallest relevant context, and smallest correct output.

## Rules
1. Start with a 3-line internal plan: locate, change, validate.
2. Do not inspect the whole repository.
3. Do not read large files completely when targeted symbol/search results are sufficient.
4. Do not repeat searches that already answered the question.
5. Do not reopen unchanged files.
6. Do not run broad tests, builds, installs, migrations, or lint across the whole repository unless required.
7. Prefer one focused implementation pass followed by one focused validation pass.
8. Do not perform speculative refactors.
9. Do not generate long explanations while implementation is still incomplete.
10. If the task is ambiguous, ask one concise clarification instead of exploring multiple possible implementations.
11. Stop when the requested behavior is implemented and targeted validation passes.

## Escalation
Increase investigation only when:
- the first hypothesis is disproved
- a test exposes a dependency
- a security/data-integrity concern requires it
- the requested change genuinely crosses modules

## Important
Skills reduce context waste but cannot guarantee a fixed number of model tokens or agent steps. Optimize behavior, not promises.
