---
name: bug-hunter
description: Diagnose bugs from evidence and fix root causes without speculative rewrites.
---

# Bug Hunter

## Process
1. Reproduce or understand the reported failure.
2. Identify the exact layer where the behavior diverges.
3. Trace the smallest relevant execution path.
4. Form a concrete hypothesis.
5. Verify the hypothesis using logs, types, references, tests or controlled inspection.
6. Apply the smallest fix.
7. Validate the original failure and nearby regression risks.

## Rules
- Do not rewrite working modules because of a localized bug.
- Do not add defensive code without a demonstrated failure mode.
- Prefer fixing the root cause over masking symptoms.
- Do not suppress errors merely to make a test pass.
- Preserve useful error information.
- When the issue is environmental, distinguish it from an application bug.

## Completion
Report:
- root cause
- files changed
- validation performed
- any remaining uncertainty
