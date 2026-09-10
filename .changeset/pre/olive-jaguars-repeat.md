---
'type-plus': major
---

`ArrayPlus.IndexAt` now takes an options object instead of positional fallback type parameters.

The three positional parameters `Fail`, `Upper`, and `Lower` are replaced by
`Options`, which covers five cases:

| Option | Applies when | Default |
| --- | --- | --- |
| `$never` | `A` is `never` | `never` |
| `$array` | `A` is an array (not a tuple) | `N` |
| `caseEmptyTuple` | `A` is `[]` | `never` |
| `caseUpperBound` | `N` is past the upper bound | `A['length']` |
| `caseLowerBound` | `N` is past the lower bound | `0` |

The `$never` and `$array` cases are new: they were previously not customizable.
Only the cases you specify are overridden; the rest keep their defaults.

Migration:

```ts
// before
type R = IndexAt<[1], 1, 'f', 'u', 'l'>
// after
type R = IndexAt<[1], 1, { caseEmptyTuple: 'f'; caseUpperBound: 'u'; caseLowerBound: 'l' }>
```

Note that the old `Fail` parameter also covered the `A is never` case.
If you relied on that, set `$never` to the same type as `caseEmptyTuple`.

Default behavior is unchanged, so `IndexAt<A, N>` and `ArrayPlus.At` /
`ArrayPlus.IsIndexOutOfBound` are not affected.
