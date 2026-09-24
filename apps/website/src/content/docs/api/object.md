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
type IsObject<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}>
type IsNotObject<T, $O extends $StrictOptions<$O, IsNotObject.$Options> = {}>
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

`IsObject.$Fn<$O>` is `IsObject` as a [type function](/type-plus/guides/type-functions/), with the options `$O` applied.
Pass it to `Filter`, `Find`, `Some` or `DropMatch`:

```ts
type R = TuplePlus.Filter<[1, { a: 1 }, object], IsObject.$Fn<{ exact: true }>> // [object]
type R = $Fn.Apply<IsObject.$Fn, { a: 1 }> // true
```

## `AnyRecord` and `KeyTypes`

```ts
type KeyTypes = keyof any
type AnyRecord = Record<KeyTypes, any>
```

`KeyTypes` is `string | number | symbol`.
`AnyRecord` is the constraint most of the record utilities in this category use.

## `ObjectPlus.Pick`, `ObjectPlus.Omit`

🗑️ **removed in 8.0.0**: `Except` — use `ObjectPlus.Omit` instead.

```ts
type ObjectPlus.Pick<T, K extends UnionKeys<T>>
type ObjectPlus.Omit<T, K extends UnionKeys<T>>
```

These replace the built-in `Pick` and `Omit`. They distribute over unions,
so each branch of the union keeps its own keys. That is what the wider key constraint buys:
[`UnionKeys<T>`](/type-plus/api/type-sets/#unionkeys) collects the keys of every member, where
`keyof T` on a union gives only the shared ones.

```ts
import type { ObjectPlus } from 'type-plus'

type R = ObjectPlus.Pick<{ a: 1; b: 2 }, 'a'> // { a: 1 }
type R = ObjectPlus.Omit<{ a: 1; b: 2 }, 'a'> // { b: 2 }
type R = ObjectPlus.Omit<{ a: 1; b: 2 } | { a: 1; c: 3 }, 'a'> // { b: 2 } | { c: 3 }
```

They differ from the built-ins in ways that compile silently:

- On a union, `ObjectPlus.Pick` picks from each member. A member with none of the keys becomes `{}`,
  which accepts almost any value.
- On a union, `ObjectPlus.Omit` keeps each member's own keys, where the built-in keeps only the
  shared ones.

They also reject what the built-ins accept: a key no member has (the built-in `Omit` takes any
key), and a generic `T` assigned to `ObjectPlus.Pick<T, K>` or `ObjectPlus.Omit<T, K>`.

They live in `ObjectPlus` so that importing them does not shadow the built-in for the whole file.
The top-level `Pick` and `Omit` exports are deprecated aliases, kept for the v8 migration.

The runtime `pick()` and `omit()` return the same shapes:

```ts
const r = omit({ a: 1, b: 2 }, 'a') // { b: number }
```

## `Partial` and `Required` variants

🗑️ **removed in 8.0.0**: `PartialExcept` — use `PartialOmit` instead.

```ts
type ObjectPlus.Partial<T>
type PartialPick<T, U extends UnionKeys<T>>
type PartialOmit<T, U extends UnionKeys<T>>

type ObjectPlus.Required<T>
type RequiredPick<T, U extends keyof T>
type RequiredExcept<T, U extends keyof T>
```

`ObjectPlus.Partial<T>` adds `| undefined` to each property so it works under
`exactOptionalPropertyTypes`. With the flag off it is identical to the built-in `Partial`.
`ObjectPlus.Required<T>` removes `undefined` from each property, including properties that were
already required. The built-in `Required` only removes the `?`.
Both live in `ObjectPlus` for the same reason as `ObjectPlus.Pick`. The top-level `Partial` and
`Required` exports are deprecated aliases.
The `Pick`/`Except`/`Omit` variants apply the change to only some keys.

```ts
type R = PartialPick<{ a: 1; b: 2 }, 'a'> // { b: 2 } & { a?: 1 | undefined }
type R = RequiredExcept<{ a?: 1; b?: 2 }, 'b'> // { a: 1 } & { b?: 2 }
```

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
type IsOptionalKey<T, K, $O extends $StrictOptions<$O, IsOptionalKey.$Options> = {}>
type IsNotOptionalKey<T, K, $O extends $StrictOptions<$O, IsNotOptionalKey.$Options> = {}>
type OptionalProps<T extends AnyRecord>
type KnownKeys<T>
type HasKey<T, K, $O extends $StrictOptions<$O, HasKey.$Options> = {}>
type HasNoKey<T, K, $O extends $StrictOptions<$O, HasNoKey.$Options> = {}>
type ValueOf<T>
```

```ts
type R = OptionalKeys<{ a?: 1; b: number }> // 'a'
type R = RequiredKeys<{ a?: 1; b: number }> // 'b'
type R = IsOptionalKey<{ a?: 1 }, 'a'> // true
type R = IsNotOptionalKey<{ a?: 1 }, 'a'> // false
type R = OptionalProps<{ a?: 1; b: number }> // { a?: 1 }
type R = HasKey<{ a: 1 }, 'b'> // false
type R = HasNoKey<{ a: 1 }, 'b'> // true
type R = ValueOf<{ a: 1; b: 2 }> // 1 | 2
```

`KnownKeys<T>` drops index signature keys, keeping only the literal keys.

`IsNotOptionalKey` is the inverse of `IsOptionalKey`, so a key `T` does not have passes it.
`HasNoKey` is the inverse of `HasKey`.

`IsOptionalKey`, `IsNotOptionalKey`, `HasKey` and `HasNoKey` accept the full [type branching](/type-plus/api/type-branching/) options.
The filter form keeps the keys that pass, so it composes into a key selection:

```ts
type R = IsOptionalKey<{ a?: 1; b: 2 }, 'a' | 'b', { selection: 'filter' }> // 'a'
type R = IsNotOptionalKey<{ a?: 1; b: 2 }, 'a' | 'b', { selection: 'filter' }> // 'b'
type R = HasKey<{ a: 1; b: 2 }, 'a' | 'c', { selection: 'filter' }> // 'a'
type R = HasNoKey<{ a: 1; b: 2 }, 'a' | 'c', { selection: 'filter' }> // 'c'

type R = HasKey<{ a: 1 }, 'b', { $then: 'yes'; $else: 'no' }> // 'no'
```

Before 8.0.0 both took `Then` and `Else` positionally
(`HasKey<T, K, Then, Else>`); move them into `{ $then, $else }`.

## Comparing records

```ts
type IsDisjoint<A extends AnyRecord, B extends AnyRecord, $O extends $StrictOptions<$O, IsDisjoint.$Options> = {}>
type KeysWithDiffType<A extends AnyRecord, B extends AnyRecord>
type ANotB<A extends AnyRecord, B extends AnyRecord>
type BNotA<A extends AnyRecord, B extends AnyRecord>
```

```ts
type R = IsDisjoint<{ a: 1 }, { b: 2 }> // true
type R = KeysWithDiffType<{ a: 1; b: 2 }, { a: 1; b: 3 }> // 'b'
type R = ANotB<{ a: 1; b: 2 }, { a: 1 }> // { b: 2 }
```

`IsDisjoint` takes the [type branching](/type-plus/api/type-branching/) options and has `IsDisjoint.$Fn<B>`.
Before 8.0.0 it returned `boolean` when each side had a key the other lacked, and `never` when either
side was `{}`; it now returns `false` and `true` for those.

`ANotB` is `never` when the two types are equal, and `A` when they are disjoint.

## Combining records

```ts
type SpreadRecord<A extends AnyRecord, B extends AnyRecord>
type LeftJoin<A extends AnyRecord, B extends AnyRecord>
type ObjectPlus.Merge<A extends AnyRecord, B extends AnyRecord>
```

`SpreadRecord` is the type-level `{ ...a, ...b }` where `B` wins on conflicts.
`LeftJoin` keeps the keys of `A` not in `B`, then adds all of `B`.
Each property keeps its `?` and `readonly` modifiers from the side it comes from, so a key both declare takes `B`'s type and modifiers.
`ObjectPlus.Merge` also handles `Record` inputs and required/optional joins.
It models the spread faithfully, so the result is always writable: `readonly` on
either side is dropped, and a get-only accessor - which is a `readonly` property -
merges in as a plain writable data property.

```ts
type R = SpreadRecord<{ a: 1; b: 2 }, { b: 3 }> // { a: 1 } & { b: 3 }

import type { ObjectPlus } from 'type-plus'
type M = ObjectPlus.Merge<{ a: 1 }, { b: 2 }> // { a: 1 } & { b: 2 }
type G = ObjectPlus.Merge<{ get a(): 1 }, { b: 2 }> // { a: 1; b: 2 }
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
| `IsRecord<T, $O>` | `true` when `T` is assignable to `Record<any, any>` and is not an array. Takes the [type branching](/type-plus/api/type-branching/) options and has `IsRecord.$Fn`. |
| `IsNotRecord<T, $O>` | The inverse of `IsRecord`, with the same options and `IsNotRecord.$Fn`. |
| `ExcludePropType<T, U>` | Excludes `U` from the type of every property in `T`. |
| `ReplaceProperty<T, K, V>` | Replaces the type of key `K` in `T` with `V`. |
| `KeysOfOptional<T>` | 🗑️ removed in 8.0.0, use `OptionalKeys<T>` for the optional keys, `keyof T` for the key union |
| `RecordValue<R>` | Infers the value type of a `Record`. |

## Runtime functions

| Function | Description |
| --- | --- |
| `pick(subject, ...props)` | Picks the listed properties, typed as `ObjectPlus.Pick`. |
| `omit(subject, ...props)` | Omits the listed properties, typed as `ObjectPlus.Omit`. |
| `facade(subject, ...props)` | Picks properties to expose a narrower view of `subject`. |
| `split(target, ...splitters)` | Splits a record into several records plus the remainder. |
| `record(value?)` | Creates a `Record` with widened key types. |
| `hasKey(subject, ...keys)` | Checks the keys, typed as `HasKey`. |
| `hasProperty(value, prop)` | Type guard narrowing `value` to `value & Record<P, T[P]>`. |
| `getField(subject, key, defaultValue?)` | Reads a field from a possibly `null`/`undefined` subject. |
| `mapKey`, `filterKey`, `findKey`, `forEachKey`, `everyKey`, `someKey`, `reduceByKey` | Array-style iteration over the keys of a record. |
| `mapProperties(subject, mapper)` | Maps every property value of a record. |
| `replaceProperty(subject, key, value)` | Returns a copy with key `K` replaced, typed as `ReplaceProperty`. |

🗑️ **removed in 8.0.0**: `reduceKey` — use `reduceByKey` instead.
