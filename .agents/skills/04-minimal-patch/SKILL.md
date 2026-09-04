---
name: minimal-patch
description: Make surgical code changes with minimal surface area, preserving working behavior and project conventions.
---

# Minimal Patch

## Rules
1. Change only what is necessary to satisfy the request.
2. Preserve public APIs unless the user asks for a breaking change.
3. Preserve existing naming and architecture.
4. Prefer modifying an existing function/component over duplicating it.
5. Avoid opportunistic formatting of unrelated code.
6. Avoid unrelated refactors.
7. Keep diffs easy to review.
8. If a larger refactor is genuinely required, explain why before performing it.

## Safety
Before changing shared code, identify its callers.
Before changing a data contract, identify its consumers.
Before deleting code, search for references.

## Validation
After editing:
- inspect the diff
- run the narrowest relevant test/lint/typecheck
- fix only issues caused by the patch
