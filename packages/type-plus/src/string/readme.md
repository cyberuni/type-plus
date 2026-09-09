# string

## Type Checking

`IsString<T>` and `IsNotString<T>` check whether a type is `string` or a string literal.

```ts
import type { IsString } from 'type-plus'

type R = IsString<string> // true
type R = IsString<'a'> // true

type R = IsString<1> // false
```

Pass `{ selection: 'filter' }` to get the type back instead of a boolean:

```ts
type R = IsString<string, { selection: 'filter' }> // string
type R = IsString<'a', { selection: 'filter' }> // 'a'

type R = IsString<1, { selection: 'filter' }> // never
```

- [`IsString<T, $O>`](./is_string.ts): is `T` `string` or a string literal.
- [`IsNotString<T, $O>`](./is_not_string.ts): is `T` neither.

---

Pass `{ exact: true }` to accept only the wide `string` type and reject literals:

```ts
type R = IsString<string, { exact: true }> // true

type R = IsString<'a', { exact: true }> // false
```

The two options combine:

```ts
type R = IsString<string, { exact: true, selection: 'filter' }> // string
type R = IsString<'a', { exact: true, selection: 'filter' }> // never
```

## String Literals

- [`IsStringLiteral<T, $O>`](./is_string_literal.ts): is `T` a string literal.
- [`IsNotStringLiteral<T, $O>`](./is_not_string_literal.ts): is `T` not a string literal.
- [`IsTemplateLiteral<T, $O>`](./is_template_literal.ts): is `T` a template literal.
- [`IsNotTemplateLiteral<T, $O>`](./is_not_template_literal.ts): is `T` not a template literal.

## String Utilities

- [`StringIncludes<S, Search, Then = true, Else = false>`](./string.ts): check if `S` includes `Search`.
- [`StringSplit<S, Separator>`](./string.ts): split `S` by `Separator`.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
