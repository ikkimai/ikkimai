---
name: api-contract
description: Keep frontend, backend and AI integrations aligned through explicit request/response contracts and minimal API changes.
---

# API Contract

## Rules
1. Find the existing endpoint/service before creating another one.
2. Preserve existing response contracts unless a breaking change is intentional.
3. Validate inputs at the boundary.
4. Type request and response data where the project supports it.
5. Keep authentication and authorization server-side.
6. Never expose API keys or service credentials in browser code.
7. Handle loading, errors and empty states explicitly.
8. For AI APIs, keep provider credentials in the backend.
9. Return structured data when the client needs to act on the response.
10. Do not make the frontend depend on provider-specific internals unnecessarily.

## AI command pattern
For natural-language commands, prefer:
User intent -> server validation -> structured action -> database/service -> result.

Never allow an LLM to execute arbitrary code or arbitrary database queries directly.
