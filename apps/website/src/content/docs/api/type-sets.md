---
title: Type Sets and JSON
description: The named unions type-plus ships - TypeScript's primitive and composable type sets, the JSON value types, and UnionKeys.
sidebar:
  order: 17
---

A handful of exports sit at the root of `src/` rather than in a category. They have one thing in common:
each names a set of types that TypeScript itself leaves unnamed, so a constraint can say "a primitive" or
"anything JSON can hold" instead of spelling the union out again.

## `PrimitiveTypes`

```ts
type PrimitiveTypes = boolean | number | string | object | symbol | bigint | Function | undefined | null
```

📘 Every type built into the language.

```ts
import type { PrimitiveTypes } from 'type-plus'

type R = 1 extends PrimitiveTypes ? true : false // true
type R = { a: 1 } extends PrimitiveTypes ? true : false // true, via `object`
```

Note that this is broader than the ECMAScript definition of a primitive: `object` and `Function` are
included, so the set covers every type, not only the ones stored by value. Use `NonComposableTypes` below
for the value types alone.

## `ComposableTypes` and `NonComposableTypes`

```ts
type ComposableTypes = object | Function
type NonComposableTypes = boolean | number | string | symbol | bigint | undefined | null
```

The same set split by whether a value of the type can carry custom properties.

```ts
import type { ComposableTypes, NonComposableTypes } from 'type-plus'

type R = { a: 1 } extends ComposableTypes ? true : false // true
type R = (() => void) extends ComposableTypes ? true : false // true

type R = 1 extends NonComposableTypes ? true : false // true
type R = symbol extends NonComposableTypes ? true : false // true
```

The distinction matters when a type adds a marker property to its input, which is what
[branding](/type-plus/api/nominal/) does. A brand over a composable type intersects; a brand over a
non-composable one has to wrap.

## `UnionKeys`

```ts
type UnionKeys<T> = keyof T | (T extends unknown ? keyof T : never)
```

⚗️ *transform* — the keys of `T`, collected across every member of a union.

```ts
import type { UnionKeys } from 'type-plus'

type R = UnionKeys<{ a: 1 } | { b: 2 }> // 'a' | 'b'
type R = keyof ({ a: 1 } | { b: 2 }) // never
```

`keyof` on a union gives only the keys every member shares, which for disjoint members is `never`.
`UnionKeys` distributes first, so it gives the keys any member has. That is the constraint `Omit` and
`omit` use, which is why they work on a union where the built-in `Omit` does not.

## The JSON types

```ts
type JSONTypes = JSONPrimitive | JSONObject | JSONArray
type JSONPrimitive = boolean | number | string | null
type JSONObject = { [key in string]?: JSONTypes }
type JSONArray = Array<JSONTypes>
```

🧰 *type util* — the values that survive a JSON round trip.

```ts
import type { JSONTypes } from 'type-plus'

type R = { a: 1 } extends JSONTypes ? true : false // true
type R = Date extends JSONTypes ? true : false // false
type R = undefined extends JSONPrimitive ? true : false // false
```

Use `JSONTypes` as the constraint on data that has crossed a JSON boundary. It admits exactly what comes
back, so a `Date`, a `Map`, a function or `undefined` is rejected where it is put in rather than silently
lost on the way out.

Two details follow from that. `undefined` is absent from `JSONPrimitive`, because JSON has no such value
and `JSON.stringify` drops the properties holding it. And every property of `JSONObject` is optional, so
reading one yields `JSONTypes | undefined` — the honest type for parsed data, where no key is guaranteed
to be there.

## Reference

| Type | Description |
| --- | --- |
| `PrimitiveTypes` | every built-in type |
| `ComposableTypes` | the types that can carry custom properties |
| `NonComposableTypes` | the types that cannot |
| `UnionKeys<T>` | keys of `T`, collected across a union |
| `JSONTypes` | any value JSON can hold |
| `JSONPrimitive` | `boolean \| number \| string \| null` |
| `JSONObject` | string keys holding `JSONTypes`, all optional |
| `JSONArray` | `Array<JSONTypes>` |

Source: [`src/composable_types.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/composable_types.ts),
[`src/primitive.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/primitive.ts),
[`src/union_keys.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/union_keys.ts) and
[`src/json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/json.ts).
