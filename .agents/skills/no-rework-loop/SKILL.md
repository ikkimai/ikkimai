---
name: no-rework-loop
description: Prevent expensive agent loops, repeated edits, speculative fixes and validation churn.
icon: refresh-cw
color: yellow
---

# No Rework Loop

## Rules
1. Form a concrete hypothesis before editing.
2. Make one coherent patch rather than many tiny speculative patches.
3. Validate the changed area before expanding scope.
4. If validation fails, inspect the failure before changing anything else.
5. Never repeatedly rerun the same command without new information.
6. Do not alternate between unrelated fixes in the same task.
7. Preserve the user's working state and avoid reset/rewrite cycles.
8. Do not "fix" warnings unrelated to the task.
9. If an external dependency or environment is the cause, stop coding and report it.

## Loop breaker
If two consecutive attempts fail for different reasons:
- stop
- summarize evidence
- inspect only the new failure
- choose a narrower approach

Do not escalate to a repository-wide rewrite.
