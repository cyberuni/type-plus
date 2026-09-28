---
'type-plus': patch
---

Fix TSDoc copy-paste bugs and tag drift.

The `$` type util docs of `IsNotBigintLiteral`, `IsNotSymbol`, `NotAssignable`, `IsNotTuple`, `IsNotObject`, `IsVoid`, `IsNotVoid`, `IsNotUndefined`, `IsNotStringLiteral` and `IsNumeric` described the wrong type or dropped the negation; they now describe what each checks.
`IsTemplateLiteral`, `IsNotTemplateLiteral`, `IsAny` and the `logical` predicates now use the same `🎭 *predicate*` and `🔢 *customize*` tags as every other predicate.

`EitherOrBoth`, `PrimitiveTypes`, `ComposableTypes` and `NonComposableTypes` now carry a tag and a pinned `@example`.
