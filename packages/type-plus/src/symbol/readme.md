# symbol

`symbol` is a primitive type of `Symbol` in TypeScript.

## Type Checking

`IsSymbol<T>` and `IsNotSymbol<T>` check whether a type is a `symbol`.

Note that when creating a `Symbol`, the type of the `Symbol` is `unique symbol` and not `symbol`.

There is no way to declare a `unique symbol` type in TypeScript, so `IsSymbol` treats `unique symbol` the same way as `symbol`.

```ts
import type { IsSymbol } from 'type-plus'

type R = IsSymbol<symbol> // true

const s = Symbol() // unique symbol
type R = IsSymbol<typeof s> // true

type R = IsSymbol<1> // false
```

Pass `{ selection: 'filter' }` to get the type back instead of a boolean:

```ts
type R = IsSymbol<symbol, { selection: 'filter' }> // symbol
type R = IsSymbol<1, { selection: 'filter' }> // never
```

- [`IsSymbol<T, $O>`](./is_symbol.ts): is `T` a `symbol`.
- [`IsNotSymbol<T, $O>`](./is_not_symbol.ts): is `T` not a `symbol`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#symbol
