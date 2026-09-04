---
description: Persistent efficiency guardrails to reduce unnecessary context, agent steps and token usage.
trigger: always_on
---

# Agent Efficiency

- Prefer targeted search and small file ranges over broad repository inspection.
- Do not read unrelated files.
- Reuse existing components and utilities.
- Make the smallest correct patch.
- Do not refactor unrelated code.
- Run the narrowest useful validation.
- Do not repeat failed commands without new evidence.
- Do not regenerate unchanged code.
- Stop when the requested behavior works and relevant validation passes.
- Never trade correctness or security for token savings.
