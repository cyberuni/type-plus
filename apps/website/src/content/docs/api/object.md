---
title: Object
description: Utilities to inspect, transform, and combine object and record types.
sidebar:
  order: 1
---

The `object` category covers types for inspecting keys, adjusting optionality, and combining records,
plus a set of runtime helpers that carry the matching type transformation.

Sources: [`packages/type-plus/src/object`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/object).

## `IsObject` / `IsNotObject`

```ts
type IsObject<T, $O extends IsObject.$Options = {}>
type IsNotObject<T, $O extends IsNotObject.$Options = {}>
```

Validate that `T` is an `object` or an object literal.
Note that `Function`, `Array`, and *tuple* are also objects.

```ts
type R = IsObject<{ a: 1 }> // true
type R = IsObject<Function> // true
type R = IsObject<number> // false

type R = IsNotObject<number> // true
```

Both accept [type branching](/type-plus/api/type-branching/) options
(`$any`, `$never`, `$unknown`, `$then`, `$else`, `selection`, `distributive`),
plus `exact` to require `T` to be exactly `object`:

```ts
type R = IsObject<{ a: 1 }, { selection: 'filter' }> // { a: 1 }
type R = IsObject<number, { selection: 'filter' }> // never
type R = IsObject<{} | bigint, { distributive: false }> // false
```

## `AnyRecord` and `KeyTypes`

```ts
type KeyTypes = keyof any
type AnyRecord = Record<KeyTypes, any>
```

`KeyTypes` is `string | number | symbol`.
`AnyRecord` is the constraint most of the record utilities in this category use.

## `Pick`, `Omit` / `Except`

```ts
type Pick<T, K extends UnionKeys<T>>
type Omit<T, K extends UnionKeys<T>>
type Except<T, K extends keyof T> // alias of Omit
```

These replace the built-in `Pick` and `Omit`. They distribute over unions,
so each branch of the union keeps its own keys.

```ts
type R = Pick<{ a: 1; b: 2 }, 'a'> // { a: 1 }
type R = Omit<{ a: 1; b: 2 }, 'a'> // { b: 2 }
type R = Omit<{ a: 1; b: 2 } | { a: 1; c: 3 }, 'a'> // { b: 2 } | { c: 3 }
```

The runtime `pick()` and `omit()` return the same shapes:

```ts
const r = omit({ a: 1, b: 2 }, 'a') // { b: number }
```

## `Partial` and `Required` variants

```ts
type Partial<T>
type PartialPick<T, U extends UnionKeys<T>>
type PartialExcept<T, U extends UnionKeys<T>>

type Required<T>
type RequiredPick<T, U extends keyof T>
type RequiredExcept<T, U extends keyof T>
```

`Partial<T>` adds `| undefined` to each property so it works under `exactOptionalPropertyTypes`.
`Required<T>` removes `undefined` from each property.
The `Pick`/`Except` variants apply the change to only some keys.

```ts
type R = PartialPick<{ a: 1; b: 2 }, 'a'> // { b: 2 } & { a?: 1 | undefined }
type R = RequiredExcept<{ a?: 1; b?: 2 }, 'b'> // { a: 1 } & { b?: 2 }
```

`PartialOmit` is available as another name for `PartialExcept`.

## `RecursivePartial` / `RecursiveRequired` / `RecursiveIntersect`

```ts
type RecursivePartial<T>
type RecursiveRequired<T>
type RecursiveIntersect<T, U>
```

`RecursivePartial` makes every property optional, all the way down, including array elements.

```ts
type R = RecursivePartial<{ a: number; b: { c: string } }>
// { a?: number | undefined; b?: { c?: string | undefined } | undefined }
```

`RecursiveIntersect` intersects `U` into `T` at every level.
The recursion terminates at level 7 due to a design limit of TypeScript.

## Key utilities

```ts
type OptionalKeys<T>
type RequiredKeys<T extends AnyRecord>
type IsOptionalKey<T, K, Then = true, Else = false>
type OptionalProps<T extends AnyRecord>
type KnownKeys<T>
type HasKey<T, K, Then = true, Else = false>
type ValueOf<T>
```

```ts
type R = OptionalKeys<{ a?: 1; b: number }> // 'a'
type R = RequiredKeys<{ a?: 1; b: number }> // 'b'
type R = IsOptionalKey<{ a?: 1 }, 'a'> // true
type R = OptionalProps<{ a?: 1; b: number }> // { a?: 1 }
type R = HasKey<{ a: 1 }, 'b'> // false
type R = ValueOf<{ a: 1; b: 2 }> // 1 | 2
```

`KnownKeys<T>` drops index signature keys, keeping only the literal keys.

## Comparing records

```ts
type IsDisjoint<A extends AnyRecord, B extends AnyRecord>
type KeysWithDiffType<A extends AnyRecord, B extends AnyRecord>
type ANotB<A extends AnyRecord, B extends AnyRecord>
type BNotA<A extends AnyRecord, B extends AnyRecord>
```

```ts
type R = IsDisjoint<{ a: 1 }, { b: 2 }> // true
type R = KeysWithDiffType<{ a: 1; b: 2 }, { a: 1; b: 3 }> // 'b'
type R = ANotB<{ a: 1; b: 2 }, { a: 1 }> // { b: 2 }
```

`ANotB` is `never` when the two types are equal, and `A` when they are disjoint.

## Combining records

```ts
type SpreadRecord<A extends AnyRecord, B extends AnyRecord>
type LeftJoin<A extends AnyRecord, B extends AnyRecord>
type ObjectPlus.Merge<A extends AnyRecord, B extends AnyRecord>
```

`SpreadRecord` is the type-level `{ ...a, ...b }` where `B` wins on conflicts.
`LeftJoin` keeps the keys of `A` not in `B`, then adds all of `B`.
`ObjectPlus.Merge` also handles `Record` inputs and required/optional joins.

```ts
type R = SpreadRecord<{ a: 1; b: 2 }, { b: 3 }> // { a: 1 } & { b: 3 }

import type { ObjectPlus } from 'type-plus'
type M = ObjectPlus.Merge<{ a: 1 }, { b: 2 }> // { a: 1 } & { b: 2 }
```

## `Split`

```ts
type Split<T extends AnyRecord, S extends AnyRecord>
function split(target, ...splitters): [...entries, remaining]
```

Splits one record into several based on splitter objects.
The last entry of the result is whatever was not claimed by a splitter.

```ts
const [ab, rest] = split({ a: 1, b: 2, c: 3 }, { a: undefined, b: undefined })
// ab: { a: number; b: number }, rest: { c: number }
```

## `Properties`

```ts
type Properties<T>
```

Extracts the property map of `T`, preserving optional and readonly modifiers,
and merging the branches of an intersection.

```ts
type R = Properties<{ a: 1 } & { b: 2 }> // { a: 1; b: 2 }
```

## `AdjustExactOptionalProps`

```ts
type AdjustExactOptionalProps<T extends AnyRecord>
```

Adds `undefined` to the optional properties of `T` so the type works under the
[`exactOptionalPropertyTypes`](https://www.typescriptlang.org/tsconfig/#exactOptionalPropertyTypes) compiler flag.

```ts
type R = AdjustExactOptionalProps<{ a: 1; b?: 2 }> // { b?: 2 | undefined } & { a: 1 }
```

## Other types

| Type | Description |
| --- | --- |
| `IsRecord<T>` | `true` when `T` is assignable to `Record<any, any>` and is not an array. |
| `ExcludePropType<T, U>` | Excludes `U` from the type of every property in `T`. |
| `ReplaceProperty<T, K, V>` | Replaces the type of key `K` in `T` with `V`. |
| `KeysOfOptional<T>` | Infers the key type of a `Record`-like `T`. |
| `RecordValue<R>` | Infers the value type of a `Record`. |

## Runtime functions

| Function | Description |
| --- | --- |
| `pick(subject, ...props)` | Picks the listed properties, typed as `Pick`. |
| `omit(subject, ...props)` | Omits the listed properties, typed as `Omit`. |
| `facade(subject, ...props)` | Picks properties to expose a narrower view of `subject`. |
| `split(target, ...splitters)` | Splits a record into several records plus the remainder. |
| `record(value?)` | Creates a `Record` with widened key types. |
| `hasKey(subject, ...keys)` | Checks the keys, typed as `HasKey`. |
| `hasProperty(value, prop)` | Type guard narrowing `value` to `value & Record<P, T[P]>`. |
| `getField(subject, key, defaultValue?)` | Reads a field from a possibly `null`/`undefined` subject. |
| `mapKey`, `filterKey`, `findKey`, `forEachKey`, `everyKey`, `someKey`, `reduceKey` | Array-style iteration over the keys of a record. |
| `mapProperties(subject, mapper)` | Maps every property value of a record. |
| `replaceProperty(subject, key, value)` | Returns a copy with key `K` replaced, typed as `ReplaceProperty`. |
