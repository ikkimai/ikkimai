---
name: task-decomposer
description: Break large requests into efficient implementation slices so the agent does not attempt an unnecessarily huge context-heavy change in one run.
icon: list-checks
color: purple
---

# Task Decomposer

## Rules
1. Detect whether the request contains multiple independent features.
2. Separate them into the smallest useful vertical slices.
3. For each slice define:
   - target behavior
   - files likely involved
   - validation
4. Implement one slice at a time when doing so reduces context or risk.
5. Do not create a plan with excessive micro-steps.
6. Keep shared infrastructure changes reusable across subsequent slices.
7. If a task can be completed safely in one focused pass, do not split it unnecessarily.

## Default order
1. foundation/data model
2. core behavior
3. UI/integration
4. validation
5. polish only if requested
