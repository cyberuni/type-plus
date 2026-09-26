---
'type-plus': minor
---

Add `.$Fn` to every one-input predicate, so each of them can be passed to `Filter`, `Find`, `Some` and `DropMatch`.

The special-type, primitive, numeric and structure predicates (`IsAny` … `IsUnion`), `HasNull`, `HasUndefined`, `HasVoid`, and every `IsNot…` counterpart, including `IsNotObject`, now expose `.$Fn<$O>`, the same shape as `IsObject.$Fn`:

```ts
type R = TuplePlus.Filter<[1, 'a', 2.5], IsInteger.$Fn> // [1]
type R = $Fn.Apply<IsNotString.$Fn, 1> // true
```

Prefer `IsNotX.$Fn` over `$Fn.Not<IsX.$Fn>`: it costs about 110 fewer instantiations per `Filter` call on a 10-entry tuple (TypeScript 6.0).
