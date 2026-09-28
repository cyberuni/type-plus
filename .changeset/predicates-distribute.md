---
'type-plus': major
---

The type predicates distribute over a union by default.

A 7.x predicate checked a union as a whole, so a union with any member that failed answered `false`.
A v8 predicate checks each member and combines the answers. A union whose members pass and fail now answers `boolean`:

```ts
type R = IsString<'a' | 1> // 7.x: false, 8.0: boolean
type R = IsTrue<boolean> // 7.x: false, 8.0: boolean
type R = IsNotString<'a' | 1> // 7.x: true,  8.0: boolean
```

The filter form keeps the members that pass. `IsString<'a' | 1, { selection: 'filter' }>` is `'a'`, where the 7.x `StringType<'a' | 1>` was `never`.

This applies to `IsArray`, `IsBigint`, `IsBoolean`, `IsFalse`, `IsFunction`, `IsInteger`, `IsNull`, `IsNumber`, `IsNumeric`, `IsObject`, `IsString`, `IsSymbol`, `IsTrue`, `IsTuple`, `IsUndefined`, `IsVoid`, and the `IsNot*` negation of each.
`IsPositive`, `IsNegative`, `IsNotPositive` and `IsNotNegative` already distributed in 7.x and do not change.

A result tested with `extends true` behaves as before, because `boolean` does not extend `true`.
A result tested with `extends false`, or compared with `IsEqual`, changes.

Migration: pass `{ distributive: false }` to keep the 7.x result.

```ts
type R = IsString<'a' | 1, { distributive: false }> // false
type R = IsString<'a' | 1, { distributive: false; selection: 'filter' }> // never
```

See [Predicates distribute over unions](https://cyberuni.github.io/type-plus/guides/migrating-to-v8/#predicates-distribute-over-unions) in the migration guide.
