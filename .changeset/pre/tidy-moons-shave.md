---
'type-plus': minor
---

`testType` type checks accept options.

Each check now takes an optional second type parameter carrying the behavioral
options of the `IsXXX` type behind it — `testType.$Options` is
`{ distributive?: boolean; exact?: boolean }`. `canAssign` and
`strictCanAssign` take it as their third and accept `distributive` only.

```ts
testType.string<'a', { exact: true }>(false)
testType.array<[string], { exact: false }>(true)
testType.string<'a' | 1, { distributive: true }>(true)
testType.strictCanAssign<number | string, number, { distributive: true }>(true)
```

Options are merged over each method's own defaults, so the existing
no-options call form keeps the behavior it has always had. The parameter
defaults to `{}` and sits after the type under test, so inference at existing
call sites is unchanged — the whole suite type-checks unmodified on TypeScript
5.4 through 7.

`any`, `unknown`, `never` and `equal` take no options — none of the types
behind them has a distributive or exact dimension. A new guide,
[Migrating from Then/Else to $Options][migration], documents how that older
signature maps onto `$O` and which types have yet to move.

[migration]: https://cyberuni.github.io/type-plus/guides/migrating-then-else-to-options/
