---
title: JSON
description: The types of the values that survive a JSON round trip - JsonTypes and its parts, JsonCompatible for interfaces, and the IsJson predicates.
sidebar:
  order: 19
---

The JSON types name what `JSON.parse` can give back and what `JSON.stringify` keeps. Use them as the
constraint on data that crosses a JSON boundary: a request or response body, a config file, a message
on a queue.

For the other named sets of types, such as `PrimitiveTypes`, see [Type Sets](/type-plus/api/type-sets/).

## `JsonTypes`, `JsonPrimitive`, `JsonObject` and `JsonArray`

```ts
type JsonTypes = JsonPrimitive | JsonObject | JsonArray
type JsonPrimitive = boolean | number | string | null
type JsonObject = { [key: string]: JsonTypes }
type JsonArray = readonly JsonTypes[]
```

🧰 *type util* — any value `JSON.parse` can produce.

```ts
import type { JsonTypes } from 'type-plus'

type R = { a: 1 } extends JsonTypes ? true : false // true
type R = { readonly a: readonly [1, 2] } extends JsonTypes ? true : false // true
type R = { a?: number } extends JsonTypes ? true : false // true

type R = Date extends JsonTypes ? true : false // false
type R = { a: undefined } extends JsonTypes ? true : false // false
```

`JsonTypes` admits exactly what survives the round trip, so a `Date`, a `Map`, a function or an
`undefined` value is rejected where it is put in rather than silently lost on the way out.

- `undefined` is absent from `JsonPrimitive`, because JSON has no such value.
- A `JsonObject` key may be absent but never `undefined`. `{ a?: number }` is accepted, because
  `JSON.stringify` drops a missing key and it comes back missing. `{ a: undefined }` is rejected.
- `JsonArray` is readonly, so readonly arrays, tuples and `as const` data are accepted.

Reading a key from a `JsonObject` is an index-signature read. Under `noUncheckedIndexedAccess` it is
`JsonTypes | undefined`, which is the honest type for parsed data, where no key is guaranteed to be there.
Without that option the read is `JsonTypes`. TypeScript has no index signature that rejects `undefined` on
the way in and adds it on the way out.

An `interface` is not assignable to `JsonTypes`, because TypeScript gives interfaces no implicit index
signature. Use `JsonCompatible` or `IsJson` for those.

## `JsonCompatible`

```ts
type JsonCompatible<T>
```

🧰 *type util* — `T` with every part that is not JSON replaced by a message naming where it is.

Use it as a self-referencing constraint to accept a JSON-safe value of any declared type, including an
`interface`:

```ts
import type { JsonCompatible } from 'type-plus'

function save<T extends JsonCompatible<T>>(value: T) { ... }

interface User { id: number; tags: string[]; nick?: string }
save(user) // ok
save({ a: [1, 2] } as const) // ok

interface Post { author: { profile: { createdAt: Date } } }
save(post)
// Type 'Date' is not assignable to type '"not JSON at $.author.profile.createdAt"'
save({ a: undefined })
// Type 'undefined' is not assignable to type '"not JSON at $.a"'
```

The path is a JSONPath from the root `$`. An array element shows as `[*]` and a tuple element by its index.

It rejects functions, objects with methods (such as `Date` and `Map`), `bigint`, `symbol`, and `undefined`
anywhere but the implicit value of an optional property.

## `IsJson` and `IsNotJson`

```ts
type IsJson<T, $O = {}>
type IsNotJson<T, $O = {}>
```

🎭 *predicate* — validate if `T` survives a JSON round trip, `T` being assignable to `JsonCompatible<T>`.

```ts
import type { IsJson } from 'type-plus'

type R = IsJson<User> // true
type R = IsJson<{ a: readonly [1, 2] }> // true
type R = IsJson<{ a: Date }> // false
type R = IsJson<{ a: undefined }> // false
type R = IsJson<string | Date> // boolean

type R = IsJson<string | Date, { selection: 'filter' }> // string
type R = IsJson<string | Date, { distributive: false }> // false
```

They take the `selection`, `distributive` and special-type branch options of the other predicates. See
[Type branching](/type-plus/api/type-branching/). To find out *where* a type fails, constrain with
`JsonCompatible`: its error names the path.

## Deprecated `JSON*` names

💀 **deprecated since 8.0.0**: the names before 8.0, kept as aliases until 9.0 — use `JsonTypes`,
`JsonPrimitive`, `JsonObject` and `JsonArray`. The new names title-case the acronym, as every type-plus
name does. See [Migrating to v8](/type-plus/guides/migrating-to-v8/#deprecated-in-80).

## Reference

| Type | Description |
| --- | --- |
| `JsonTypes` | any value `JSON.parse` can produce |
| `JsonPrimitive` | `boolean \| number \| string \| null` |
| `JsonObject` | string keys holding `JsonTypes`, never `undefined` |
| `JsonArray` | `readonly JsonTypes[]` |
| `JsonCompatible<T>` | `T` checked part by part; constrain with `T extends JsonCompatible<T>` |
| `IsJson<T, $O>` | whether `T` survives a JSON round trip |
| `IsNotJson<T, $O>` | whether `T` does not survive a JSON round trip |
| `JSONTypes`, `JSONPrimitive`, `JSONObject`, `JSONArray` | 💀 deprecated since 8.0.0, use the `Json*` names |

Source: [`src/json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/json.ts),
[`src/json-compatible.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/json-compatible.ts),
[`src/is-json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/is-json.ts) and
[`src/is-not-json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/is-not-json.ts).
