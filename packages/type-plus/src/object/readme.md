# object

## Type Checking

`IsObject<T>` and `IsNotObject<T>` check whether a type is `object` or an object type.

Note that `Function`, `Array` and *tuple* are also objects in TypeScript.

```ts
import type { IsObject } from 'type-plus'

type R = IsObject<object> // true
type R = IsObject<{}> // true
type R = IsObject<{ a: number }> // true

type R = IsObject<1> // false
```

Pass `{ selection: 'filter' }` to get the type back instead of a boolean:

```ts
type R = IsObject<{ a: 1 }, { selection: 'filter' }> // { a: 1 }
type R = IsObject<1, { selection: 'filter' }> // never
```

Pass `{ exact: true }` to accept only the wide `object` type:

```ts
type R = IsObject<object, { exact: true }> // true
type R = IsObject<{}, { exact: true }> // false
```

- [`IsObject<T, $O>`](./is_object.ts): is `T` an `object`.
- [`IsNotObject<T, $O>`](./is_not_object.ts): is `T` not an `object`.

## IsOptionalKey

> `IsOptionalKey<T, K, $O extends IsOptionalKey.$Options = {}>`

Validate if the key `K` in `T` is optional.

```ts
import type { IsOptionalKey } from 'type-plus'

type R = IsOptionalKey<{ a?: number }, 'a'> // true
type R = IsOptionalKey<{ a: number }, 'a'> // false

type R = IsOptionalKey<{ a?: number; b: number }, 'a' | 'b', { selection: 'filter' }> // 'a'
type R = IsOptionalKey<{ a?: number }, 'a', { $then: 'yes'; $else: 'no' }> // 'yes'
```

## OptionalKeys

> `OptionalKeys<T>`

Gets the optional keys of `T`.

```ts
import type { OptionalKeys } from 'type-plus'

type R = OptionalKeys<{ a?: number; b: string }> // 'a'
```

## OptionalProps

> `OptionalProps<T>`

Gets the optional properties of `T`.

```ts
import type { OptionalProps } from 'type-plus'

type R = OptionalProps<{ a?: number; b: string }> // { a?: number }
```

## [ObjectPlus.Merge](../mix_types/merge.ts)

`Merge<A, B, Options = { }>`

⚗️ *transform*
🔢 *customizable*

Merges type `A` and type `B`.

This type performs the same operations as `{ ...a, ...b }` but at the type level.

It handles cases like A or B are `Record`,
joining between required and optional props, etc.

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types
