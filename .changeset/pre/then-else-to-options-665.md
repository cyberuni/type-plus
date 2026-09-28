---
'type-plus': major
---

Move the last positional `Then`/`Else` types onto the `$Options` object (#665).

`If`, `HasKey`, `IsOptionalKey`, `IsUnion`, `ArrayPlus.IsIndexOutOfBound` and
`StringPlus.Includes` were the remaining branching types taking their two
outcomes as positional type parameters. They now take `$O`, like the rest of
the `IsXXX` family, which also gives them `{ selection: 'filter' }` and the
`$Branch` selectors for free.

Following #661, the positional parameters are replaced in place rather than
kept alongside the options object: position 3 cannot hold either a `Then` or an
options object without guessing which one a caller meant.

Migration:

| Before | After |
| --- | --- |
| `If<Condition, Then, Else>` | `If<Condition, { $then: Then; $else: Else }>` |
| `HasKey<T, K, Then, Else>` | `HasKey<T, K, { $then: Then; $else: Else }>` |
| `IsOptionalKey<T, K, Then, Else>` | `IsOptionalKey<T, K, { $then: Then; $else: Else }>` |
| `IsUnion<T, Then, Else>` | `IsUnion<T, { $then: Then; $else: Else }>` |
| `UnionType<T>` | `IsUnion<T, { selection: 'filter' }>` |
| `UnionType<T, Then, Else>` | `IsUnion<T, { $then: Then; $else: Else }>` |
| `IsIndexOutOfBound<A, N, Then, Else>` | `IsIndexOutOfBound<A, N, { $then: Then; $else: Else }>` |
| `StringPlus.Includes<S, Search, Then, Else>` | `StringPlus.Includes<S, Search, { $then: Then; $else: Else }>` |

`UnionType` is removed rather than migrated. It defaulted to
`Then = T, Else = never`, which is filter semantics, and `$O` spells that
natively — so the `UnionType` / `IsUnion` pair collapses into one type plus an
option, the same collapse #659 applied to the `LooseArrayType` family.

The default call form of every type is unchanged: `IsUnion<T>` is still
`true`/`false`, `IsIndexOutOfBound<A, N>` is still `true`/`false`.

The filter subject is the value being checked, which for the two key
predicates is the key rather than the record. That makes the filter form a key
selection: `IsOptionalKey<T, keyof T, { selection: 'filter' }>` is
`OptionalKeys<T>`.

`StringIncludes` keeps its positional `Then`/`Else`. It is the low-level string
check that `StringPlus.Includes` is built on, and was not part of #665's sweep.
