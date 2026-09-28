---
'type-plus': major
---

Move `ArrayPlus.IsReadonly`, `IsEmptyObject`, `IsRecord` and `IsDisjoint` onto `$O` (#720).

Each now takes `$O extends $StrictOptions<$O, X.$Options> = {}` and exports `$Options`, `$Default`,
`$Branch` and `$Fn`, so it gains `$then`/`$else`, `{ selection: 'filter' }` and the `$Then`/`$Else`
branch selectors. `IsDisjoint.$Fn<B>` fixes `B` and takes `A` as the input, like the other two-input
predicates. The default call form of `IsEmptyObject`, `IsRecord` and `IsReadonly` gives the same result
as before.

**Breaking: `ArrayPlus.IsReadonly` drops its legacy options.**
`IsReadonly.Options` and `IsReadonly.DefaultOptions` are replaced by `IsReadonly.$Options` and
`IsReadonly.$Default`. The `$notArray` branch is removed: a value that is not an array now resolves to
`$else`, and passing `$notArray` is a compile error. The `$never` branch stays, and `$any`, `$unknown`
and `$void` are added.

**Behavior change: `IsDisjoint` now always returns `true` or `false`.**
It checks `keyof A & keyof B` for shared keys, which fixes two wrong results:

| | before | after |
| --- | --- | --- |
| `IsDisjoint<{ a: 1; c: 1 }, { a: 1; b: 1 }>` (each side has a key the other lacks) | `boolean` | `false` |
| `IsDisjoint<{ a: 1 }, {}>` | `never` | `true` |

`ANotB`, `KeysWithDiffType`, `LeftJoin` and `Merge` only test `IsDisjoint<A, B> extends true`, so
their results do not change.

Migration:

| Before | After |
| --- | --- |
| `IsReadonly<A, IsReadonly.Options>` | `IsReadonly<A, IsReadonly.$Options>` |
| `IsReadonly.DefaultOptions` | `IsReadonly.$Default` |
| `IsReadonly<A, { $notArray: X }>` | `IsArray<A, { $then: IsReadonly<A>; $else: X }>` |
| `IsReadonly<A, { $then: T; $else: E; $notArray: E }>` | `IsReadonly<A, { $then: T; $else: E }>` |
