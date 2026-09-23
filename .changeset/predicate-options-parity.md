---
'type-plus': major
---

`IsFunction` and `IsNotFunction` now honor `exact`. With `{ exact: true }` they match only the type `Function` itself, the same as `IsStrictFunction` and `IsNotStrictFunction`. Before, `IsFunction` accepted `exact` and ignored it, and `IsNotFunction` rejected it.

Breaking: `IsFunction<() => void, { exact: true }>` is now `false`; it was `true`.

`IsNotStrictFunction` now accepts `exact`, as `IsStrictFunction` does. Both are always exact, so the option has no effect on them.

Every predicate with `$Options` now exports a `$Default` that spells out the value each option takes when it is left out. `IsFalse`, `IsBoolean`, `IsBigintLiteral`, `IsObject` and 46 others gained one; `IsNotFunction.$Default` and `IsNotStrictFunction.$Default` now include `$Exact.Default`.
