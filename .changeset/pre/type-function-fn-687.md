---
'type-plus': minor
---

Let the collection types take type-plus predicates as type functions.

`$Fn` is a type function and `$Fn.Apply<F, A>` calls it.
`TuplePlus.Filter`, `TuplePlus.Find`, `ArrayPlus.Find`, `Some`, `DropMatch` (and `TuplePlus.DropMatch`, `ArrayPlus.DropMatch`) accept either a plain type, matched with `extends` as before, or a `$Fn`, which matches when it returns `true`.
`IsObject.$Fn<$O>` is `IsObject` as a type function with its options applied, and `$Fn.Not<F>` negates one.

```ts
type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn<{ exact: true }>> // [object]
type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], $Fn.Not<IsObject.$Fn>> // [1, 'x']
```

A plain type costs about 10 more instantiations per `Filter` call on a 10-entry tuple (TypeScript 6.0, 100 distinct inputs).
Calling a `$Fn` costs about 6 per entry on top of the predicate itself.
