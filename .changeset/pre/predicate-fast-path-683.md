---
'type-plus': patch
---

Cut the type instantiations spent on special types. Results are unchanged.

`$Special` detects `any`, `unknown`, `never` and `void` with cheaper checks, which saves about 28
instantiations per use in every type built on it. `$MergeOptions` returns the defaults directly when
there are no options to merge.

`IsAny`, `IsNever`, `IsUnknown`, `IsVoid`, `IsObject`, `IsString` and `Assignable` also skip the
options machinery when called without options. The four special-type predicates check `T`
directly. The other three answer through the new `$Special.Values`, which picks an answer by special
type the same way `$Special` does.

Instantiations per use without options (TypeScript 6.0 and 7, 300 distinct inputs):

| Type | Before | After |
| --- | ---: | ---: |
| `IsAny` | 52 | 10 |
| `IsNever` | 53 | 13 |
| `IsUnknown` | 52 | 12 |
| `IsVoid` | 102 | 23 |
| `IsObject` | 101 | 25 |
| `IsString` | 97 | 24 |
| `Assignable` | 123 | 39 |
