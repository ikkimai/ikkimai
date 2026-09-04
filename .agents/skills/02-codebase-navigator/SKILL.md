---
name: codebase-navigator
description: Navigate a codebase efficiently using symbols, imports, routes, references and dependency relationships instead of broad file inspection.
---

# Codebase Navigator

## Rules
1. Start from the user-visible behavior or error.
2. Locate the route/page/component/service responsible for it.
3. Follow imports and references only as far as necessary.
4. Prefer existing implementations over creating new patterns.
5. For a component change, inspect:
   - component
   - direct styles
   - direct data source
   - direct parent
   - relevant tests
6. For an API change, inspect:
   - endpoint
   - request/response types
   - service/client
   - caller
   - validation
7. For database changes, inspect the model/schema and migration conventions before editing.
8. Do not inspect generated files, dependencies, build output, caches, or lockfiles unless directly relevant.

## Search strategy
Use exact symbol names first, then filenames, then semantic concepts.
Avoid broad searches across generated/vendor directories.
