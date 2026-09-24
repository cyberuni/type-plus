---
'type-plus': major
---

Remove `IsStrictFunction` and `IsNotStrictFunction`. Use `IsFunction<T, { exact: true }>` and `IsNotFunction<T, { exact: true }>` instead; they give the same result for every option.

`IsFunction` and `IsNotFunction` now honor `exact`. With `{ exact: true }` they match only the type `Function` itself, not a function signature. Before, `IsFunction` accepted `exact` and ignored it, and `IsNotFunction` rejected it. `IsFunction<() => void, { exact: true }>` is now `false`; it was `true`.

`testType.strictFunction` still works and is now built on `IsFunction` with `exact: true`. Passing `exact: false` to it does not loosen the check.

Every predicate with `$Options` now exports a `$Default` that spells out the value each option takes when it is left out. `IsFalse`, `IsBoolean`, `IsBigintLiteral`, `IsObject` and 46 others gained one; `IsNotFunction.$Default` now includes `$Exact.Default`.
