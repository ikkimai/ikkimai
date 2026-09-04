---
name: component-reuse
description: Maximize reuse of existing UI components, hooks, utilities and design patterns to prevent duplication and context bloat.
---

# Component Reuse

## Rules
1. Search for an existing component before creating one.
2. Search for similar UI patterns before adding new CSS.
3. Prefer composition over duplicated components.
4. Reuse shared buttons, inputs, cards, modals, typography and layout primitives.
5. Extend an existing component when the behavior is genuinely shared.
6. Do not create a generic abstraction for a one-off requirement.
7. Preserve existing accessibility behavior.
8. Keep props explicit and typed.

## New component checklist
Only create a new component when:
- no suitable component exists
- reuse would make the existing component harder to understand
- the new behavior has a clear reusable boundary

## Before finishing
Search for duplicate implementations introduced by the change.
