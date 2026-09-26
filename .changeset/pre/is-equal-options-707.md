---
'type-plus': major
---

Merge `Equal` into `IsEqual<A, B, $O>`, move `IsLiteral` and `Some` onto `$Options`,
and remove the last deprecated positional aliases (#707).

**Behavior change: `IsEqual` no longer treats symbols as equal to each other.**
The old `IsEqual` fell back to "both are symbols, so equal" whenever the structural check failed.
It now uses `Equal`'s implementation, which has no such fallback:

| | before | after |
| --- | --- | --- |
| `IsEqual<typeof s1, typeof s1>` | `true` | `true` |
| `IsEqual<typeof s1, typeof s2>` (two distinct `unique symbol`s) | `true` | `false` |
| `IsEqual<typeof s1, symbol>` | `true` | `false` |

`testType.equal` routes through `IsEqual`, so an assertion such as
`testType.equal<typeof s, symbol>(true)` now fails to compile and must become `(false)`.

`IsEqual` and `IsNotEqual` take the `$Options` object in place of positional `Then`/`Else`,
and gain `{ selection: 'filter' }`, `$Branch` and `$Fn`.
`IsNotEqual<A, B, { selection: 'filter' }>` keeps `A` when it differs from `B`,
which is the filter form #275 asked for.

`Some`'s `Mode` moves into `$O` as `mode`, beside `selection` and the branch overrides.

Migration:

| Before | After |
| --- | --- |
| `Equal<A, B, $O>` | `IsEqual<A, B, $O>` |
| `Equal.$Fn`, `Equal.$Branch`, `Equal.$Same`, ... | `IsEqual.$Fn`, `IsEqual.$Branch`, `IsEqual.$Same`, ... |
| `IsEqual<A, B, Then, Else>` | `IsEqual<A, B, { $then: Then; $else: Else }>` |
| `IsNotEqual<A, B, Then, Else>` | `IsNotEqual<A, B, { $then: Then; $else: Else }>` |
| `NotEqual<A, B>` | `IsNotEqual<A, B>` |
| `IsLiteral<T, Then, Else>` | `IsLiteral<T, { $then: Then; $else: Else }>` |
| `Some<A, C, 'strict'>` | `Some<A, C, { mode: 'strict' }>` |
| `Some<A, C, Mode, Then, Else>` | `Some<A, C, { mode: Mode; $then: Then; $else: Else }>` |
| `CanAssign<A, B>`, `IsAssign<A, B>` | `Assignable<A, B>` |
| `StrictCanAssign<A, B>` | `Assignable<A, B, { distributive: false }>` |
| `Extendable<A, B>` | `Assignable.$<A, B, { selection: 'filter' }>` |
| `NotExtendable<A, B>` | `NotAssignable.$<A, B, { selection: 'filter' }>` |
| `IsExtend<A, B, Then, Else>` | `Assignable.$<A, B, { $then: Then; $else: Else }>` |
| `IsNotExtend<A, B, Then, Else>` | `NotAssignable.$<A, B, { $then: Then; $else: Else }>` |

`StringIncludes` and `NotUnknownOr` keep their positional parameters by design.
