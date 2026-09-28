---
'type-plus': major
---

The `IsXxx` and `IsNotXxx` predicates that take the `distributive` option now distribute over unions by default.

A 7.x predicate checked a union as a whole.
A v8 predicate checks each member and combines the answers,
so a union with members that pass and members that fail answers `boolean`:

```ts
type R = IsString<'a' | 1> // 7.x: false, 8.0: boolean
type R = IsTrue<boolean> // 7.x: false, 8.0: boolean
```

Pass `{ distributive: false }` to keep the 7.x result:

```ts
type R = IsString<'a' | 1, { distributive: false }> // false
type R = IsTrue<boolean, { distributive: false }> // false
```

A result used as `extends true` needs no change, because `boolean extends true` is still false.
A result compared with `extends false` does change.
