---
'type-plus': patch
---

Correct the TSDoc for the numeric types.

`IsNegative<any>`, `IsPositive<any>`, `IsNotNegative<any>` and `IsNotPositive<any>`
were documented as `boolean`. The special types are not numeric, so the sign checks
reject them: `IsNegative<any>` and `IsPositive<any>` are `false`, and their negations
are `true`. `IsInteger<number>` and `IsNotInteger<number>` were documented as `false`
and `true`; the wide `number` type contains both integers and non-integers, so both
resolve to `boolean`.

The numeric predicates now document their `filter` selection, union distribution and
`$Branch` options in the same shape as the rest of the library, and the stale
`$SelectionBranch` name in the `number` and `bigint` examples is replaced by the
`$Branch` each type actually exports.

The `number` examples for disabling union distribution used `number | 1`, which
TypeScript collapses to `number` — so they demonstrated nothing and stated the wrong
result. They now use `1 | string`, which is a real union.

Every documented example across `numeric`, `number` and `bigint` is now asserted by
that type's own spec, so an example that drifts from the implementation fails to
compile.
