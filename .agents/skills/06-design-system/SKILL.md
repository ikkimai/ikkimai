---
name: design-system
description: Enforce visual consistency by reusing the project's design tokens, components, typography, spacing and responsive patterns.
---

# Design System

## Rules
1. Inspect existing tokens before adding colors, sizes or spacing.
2. Reuse CSS variables/theme tokens/design primitives.
3. Do not invent arbitrary hex colors when a token exists.
4. Reuse existing typography hierarchy.
5. Follow existing border radius, shadows, spacing and responsive breakpoints.
6. Prefer semantic variants such as primary, secondary, destructive and muted.
7. Keep dark/light theme behavior consistent when supported.
8. Preserve keyboard navigation and visible focus states.
9. Do not solve a local visual issue by breaking global consistency.

## Visual Builder compatibility
Any visual property that should be editable by a page builder must use a stable, serializable property rather than hard-coded values buried in component logic.
