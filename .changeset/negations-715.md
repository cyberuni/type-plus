---
'type-plus': minor
---

Add the missing negations of the predicates:
`IsNotUnion`, `IsNotLiteral`, `IsNotOptionalKey`, `IsNotEmptyObject`, `IsNotRecord`,
`HasNoKey`, `HasNoNull`, `HasNoUndefined` and `HasNoVoid`.

Each one inverts its positive form, keeps the same rules, and has the same `$Options`, `$Default`, `$Branch` and `.$Fn` surface
(`IsNotLiteral` has no `.$Fn`, because `IsLiteral` has none).
The filter form keeps the input that fails the positive check:

```ts
type R = IsNotUnion<number, { selection: 'filter' }> // number
type R = HasNoNull<1 | 2, { selection: 'filter' }> // 1 | 2
type R = HasNoKey<{ a: 1; b: 2 }, 'a' | 'c', { selection: 'filter' }> // 'c'
```

For a predicate without a counterpart, such as `IsDisjoint`, negate its type function with `$Fn.Not`.

This change is not breaking: it only adds exports.
