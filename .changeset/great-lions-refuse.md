---
'type-plus': major
---

Remove the types and functions deprecated in v7.

| Removed | Replacement |
| --- | --- |
| `First` | `FindFirst`, `ArrayPlus.Find` |
| `isType.t()` | `isType()`, `testType.true()` |
| `isType.f()` | `isType()`, `testType.false()` |
| `isType.never()` | `isType()`, `testType.never()` |
| `isType.equal()` | `testType.equal()` |
| `CommonKeys` | `CommonPropKeys` |
| `PadLeft` | `PadStart` |

`isType()` itself is unchanged — only the `t`, `f`, `never` and `equal` members hanging off it are gone.

Newly deprecated, to be removed in the next major:

| Deprecated | Replacement |
| --- | --- |
| `Concat` | `ArrayPlus.Concat` |
| `drop()` | none — the type does not sufficiently cover the use cases |
