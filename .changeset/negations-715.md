---
'type-plus': minor
---

Add the missing `IsNot*` twins: `IsNotUnion`, `IsNotLiteral`, `IsNotOptionalKey`, `IsNotEmptyObject` and `IsNotRecord`.

Each is the inverse of its positive form, with the same rules and the same `$Options`, `$Default`, `$Branch` and `.$Fn` surface
(`IsNotLiteral` has no `.$Fn`, as `IsLiteral` has none).
The filter form keeps the input that fails the positive check:

```ts
type R = IsNotUnion<number, { selection: 'filter' }> // number
type R = IsNotRecord<{ a: 1 } | number[], { selection: 'filter' }> // number[]
type R = IsNotOptionalKey<{ a?: 1; b: 2 }, 'a' | 'b', { selection: 'filter' }> // 'b'
```

Not breaking: these are new exports.
