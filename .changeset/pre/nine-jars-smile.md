---
'type-plus': patch
---

Document the 8 undocumented exports in `src/predicates/` and the 7 branch
markers in `src/$type/`.

Every `@example` is pinned by a compiled assertion in
`src/predicates/predicates_docs.spec.ts` and `src/$type/$type_docs.spec.ts`.

`$Then`, `$Else`, `$Selection`, `$Distributive` and `$Exact` are what the
`$Options`/`$Branch` convention rests on, so they now say what a caller passes
and what comes back.

Six of the predicates are listed in #665 for removal or migration. Each says so
in its own TSDoc rather than reading as current API.
