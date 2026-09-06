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

`src/numeric/numeric_docs.spec.ts` pins every documented example to the implementation,
so an example that drifts fails to compile.
