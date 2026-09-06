---
'type-plus': minor
---

Add `testType.has*` for asserting union membership.

`testType.undefined<T>()` asks whether `T` *is* `undefined`. There was no way
to ask whether `T` *contains* `undefined`, which is the common shape when a
value is optional:

```ts
type R = number | undefined

testType.hasUndefined<R>(true)
```

Three assertions are added — `hasUndefined`, `hasNull` and `hasVoid` — backed
by the `HasUndefined`, `HasNull` and `HasVoid` predicates. `HasUndefined`
already existed; `HasNull` and `HasVoid` are new and are exported alongside it.

All three distribute over the union explicitly, checking each branch on its
own before folding the branches back into a single answer. `HasUndefined`
keeps the results it had; the explicit distribution matters for `HasVoid`,
because `IsVoid<number | undefined>` widens to `boolean` and would otherwise
report `number | undefined` as containing `void`.

There is no `hasAny`, `hasUnknown` or `hasNever`. A union absorbs those types,
so they can never be one branch among several, and `testType.any`,
`testType.unknown` and `testType.never` already answer the question.
