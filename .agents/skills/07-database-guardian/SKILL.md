---
name: database-guardian
description: Safely modify database schemas, queries and persistence logic while preserving data integrity and migration conventions.
---

# Database Guardian

## Rules
1. Inspect the existing schema/model before changing persistence.
2. Identify relationships, constraints, indexes and nullable fields.
3. Never silently delete or rename production data.
4. Prefer additive migrations for potentially destructive changes.
5. Follow the project's migration tool and naming conventions.
6. Validate user input at the application boundary.
7. Avoid N+1 queries where the existing ORM/query layer provides a safe alternative.
8. Do not expose secrets or credentials in source code.
9. Keep database changes separate from unrelated UI refactors.

## Migration checklist
- schema/model updated
- migration created if required
- existing data considered
- indexes/constraints considered
- application queries updated
- targeted validation performed
