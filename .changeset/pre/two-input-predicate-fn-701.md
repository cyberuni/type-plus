---
'type-plus': minor
---

Add `.$Fn` to the two-input predicates `Assignable`, `NotAssignable`, `Equal`, `HasKey` and `IsOptionalKey`.

A type function has one input, so the entry being checked is the function's input and the other input is fixed as `.$Fn`'s first type parameter, ahead of the options:

```ts
type R = TuplePlus.Filter<[1, number, 1], Equal.$Fn<1>> // [1, 1]
type R = TuplePlus.Find<[string, 1], Assignable.$Fn<number>> // 1
type R = TuplePlus.Filter<[{ a: 1 }, {}], HasKey.$Fn<'a'>> // [{ a: 1 }]
```

`Equal.$Fn<X>` gives `Filter`, `Find` and `DropMatch` an exact match, which is what `Some`'s `'strict'` mode does.
