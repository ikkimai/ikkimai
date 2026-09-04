---
name: token-optimizer
description: Minimize unnecessary context, tool calls, repeated reasoning and large code rewrites while preserving correctness.
---

# Token Optimizer

## Core principle
Use the smallest amount of repository context and produce the smallest correct change.

## Rules
1. Do not read files unrelated to the task.
2. Do not reopen files already inspected unless their content may have changed.
3. Prefer targeted searches over directory-wide inspection.
4. Prefer patches over rewriting complete files.
5. Never paste or regenerate unchanged code.
6. Reuse existing components, utilities, types and styles.
7. Do not refactor unrelated code while fixing a task.
8. Do not add libraries when an existing dependency solves the problem.
9. Avoid speculative improvements.
10. Batch related inspections when possible.
11. Run the narrowest useful validation first.
12. Only expand investigation when evidence requires it.

## Before implementation
Create a short internal plan:
1. Find
2. Change
3. Validate

## Stop condition
Once the requested behavior works and targeted validation passes, stop. Do not continue optimizing unrelated code.
