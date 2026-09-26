---
'type-plus': patch
---

Accept readonly arrays and tuples in `Reverse`, `DropFirst`, `DropLast`, `CommonPropKeys`, `TuplePlus.CommonPropKeys` and `MapToProp`.

These constrained their input to mutable arrays, so an `as const` tuple failed the constraint.
`Reverse`, `DropFirst` and `DropLast` keep `readonly` on the result, as `ArrayPlus.Reverse` does:
`Reverse<readonly [1, 2]>` is `readonly [2, 1]`, and `DropFirst<readonly ['x']>` is `readonly []`.
Mutable input gives the same result as before.
