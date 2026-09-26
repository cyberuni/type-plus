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
`UnionKeys` distributes first, so it gives the keys any member has. That is the constraint `ObjectPlus.Omit` and
`omit` use, which is why they work on a union where the built-in `Omit` does not.

## The JSON types

```ts
type JsonTypes = JsonPrimitive | JsonObject | JsonArray
type JsonPrimitive = boolean | number | string | null
type JsonObject = { [key in string]?: JsonTypes }
type JsonArray = Array<JsonTypes>
```

🧰 *type util* — the values that survive a JSON round trip.

```ts
import type { JsonTypes } from 'type-plus'

type R = { a: 1 } extends JsonTypes ? true : false // true
type R = Date extends JsonTypes ? true : false // false
type R = undefined extends JsonPrimitive ? true : false // false
```

Use `JsonTypes` as the constraint on data that has crossed a JSON boundary. It admits exactly what comes
back, so a `Date`, a `Map`, a function or `undefined` is rejected where it is put in rather than silently
lost on the way out.

Two details follow from that. `undefined` is absent from `JsonPrimitive`, because JSON has no such value
and `JSON.stringify` drops the properties holding it. And every property of `JsonObject` is optional, so
reading one yields `JsonTypes | undefined` — the honest type for parsed data, where no key is guaranteed
to be there.

Before 8.0 these were `JSONTypes`, `JSONPrimitive`, `JSONObject` and `JSONArray`. The old names remain
as deprecated aliases and go in 9.0.

## Reference

| Type | Description |
| --- | --- |
| `PrimitiveTypes` | every built-in type |
| `ComposableTypes` | the types that can carry custom properties |
| `NonComposableTypes` | the types that cannot |
| `UnionKeys<T>` | keys of `T`, collected across a union |
| `JsonTypes` | any value JSON can hold |
| `JsonPrimitive` | `boolean \| number \| string \| null` |
| `JsonObject` | string keys holding `JsonTypes`, all optional |
| `JsonArray` | `Array<JsonTypes>` |

Source: [`src/composable-types.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/composable-types.ts),
[`src/primitive.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/primitive.ts),
[`src/union-keys.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/union-keys.ts) and
[`src/json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/json.ts).
