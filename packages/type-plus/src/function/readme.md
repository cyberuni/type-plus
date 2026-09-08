# Function

`Function` is a type to represent functions.

## Type Checking

`IsFunction<T>` and `IsNotFunction<T>` check whether a type is a `Function`.

They are loose checks: they match `Function`, function signatures, function overloads, and
intersection types.

```ts
import type { IsFunction } from 'type-plus'

type R = IsFunction<Function> // true
type R = IsFunction<() => void> // true

type R = IsFunction<{ a: 1 }> // false
type R = IsFunction<never> // false
type R = IsFunction<unknown> // false
```

Pass `{ selection: 'filter' }` to get the type back instead of a boolean:

```ts
type R = IsFunction<() => void, { selection: 'filter' }> // () => void
type R = IsFunction<{ a: 1 }, { selection: 'filter' }> // never
```

- [`IsFunction<T, $O>`](./is_function.ts): is `T` a `Function`.
- [`IsNotFunction<T, $O>`](./is_not_function.ts): is `T` not a `Function`.

---

`IsStrictFunction<T>` and `IsNotStrictFunction<T>` are the strict forms: they match only the type
`Function` itself.

```ts
import type { IsStrictFunction } from 'type-plus'

type R = IsStrictFunction<Function> // true

type R = IsStrictFunction<() => void> // false
type R = IsStrictFunction<(() => void) & { a: 1 }> // false
```

- [`IsStrictFunction<T, $O>`](./is_strict_function.ts): is `T` exactly `Function`.
- [`IsNotStrictFunction<T, $O>`](./is_not_strict_function.ts): is `T` not exactly `Function`.

---

`AnyFunction` is a type to represent any function.

You can also use it to build specific signatures.

```ts
import type { AnyFunction } from 'type-plus'

type R = AnyFunction // (...args: any[]) => any
type R = AnyFunction<[a: string, b: number], boolean> // (a: string, b: number) => boolean
```

---

`ExtractFunction<T>` extracts the function type from a type.
Note that it does not work with function overloads.

```ts
import type { ExtractFunction } from 'type-plus'

type R = ExtractFunction<{
  (): void
  a: 1
}> // () => void
```

---

`extractFunction` is the function form of `ExtractFunction<T>`.

## References

- [mdn web docs: Function][mdn]

[mdn]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function
