---
'type-plus': minor
---

Accept a type function (`$Fn`) as the criteria of `FindLast` (and `ArrayPlus.FindLast`), as `FindFirst` and `Find` already do.

With a type function, a union entry is matched one member at a time, and for an array the matching element types come back with `| undefined`:

```ts
type R = FindLast<[1, 'x', { a: 1 }, 2], IsObject.$Fn> // { a: 1 }
type R = FindLast<Array<1 | { a: 1 }>, IsObject.$Fn> // { a: 1 } | undefined
```

This gives `FindLast` the strict mode that every other type taking a `Criteria` now has through `Equal.$Fn<X>`, which matches an entry exactly and does not widen (#298):

```ts
type R = FindLast<[1, 2, 3], number> // 3
type R = FindLast<[1, 2, 3], Equal.$Fn<number>> // never
```
