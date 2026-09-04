---
name: context-minimizer
description: Minimize repository context loaded into the agent by using targeted search, symbol references, file ranges and scoped skills.
icon: scan-search
color: cyan
---

# Context Minimizer

## Rules
1. Search before opening.
2. Open only the relevant symbol or small file range when possible.
3. Follow imports/references only when needed to understand behavior.
4. Ignore generated files, node_modules, build output, caches, lockfiles and assets unless directly relevant.
5. Prefer `paths`-scoped skills so unrelated guidance is not loaded.
6. Keep reference documentation outside SKILL.md and load it only when needed.
7. Do not create a giant project-context document containing duplicated source code.
8. Prefer summaries of architecture over copied implementation details.

## Investigation sequence
- exact symbol
- direct caller/callee
- relevant types
- test
- implementation
- validation

Stop as soon as the evidence is sufficient.
