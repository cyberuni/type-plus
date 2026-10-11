---
title: JSON
description: The types of the values that survive a JSON round trip - JsonTypes and its parts, JsonCompatible for interfaces, the IsJson predicates, and Serialized and Deserialized for typed JSON and flatted round trips.
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

## `Serialized` and `Deserialized`

```ts
type Serialized<T extends JsonCompatible<T>, $O = {}>
type Deserialized<S extends Serialized<any, { circular: boolean }>>
```

🧰 *type util* — a `string` that carries the type of the value it was serialized from, and the type
that parsing it gives back.

`JSON.parse` returns `any`. So does [flatted](https://github.com/WebReflection/flatted), which serializes
values with circular references: its declarations are `parse(text: string): any` and
`stringify(value: any): string`. Nothing ties the value you stringify to the value you parse:

```ts
import * as flatted from 'flatted'

const text = flatted.stringify(user) // string
const back = flatted.parse(text) // any
back.nmae // no error
flatted.stringify({ createdAt: new Date() }) // no error, comes back as a string
JSON.parse(text) // no error, but the shape is wrong
```

Two lines of wrapper give flatted a type. `Serialized<T, { circular: true }>` tags the string with `T`
and with its format, and `Deserialized` reads `T` back:

```ts
import * as flatted from 'flatted'
import type { Deserialized, JsonCompatible, Serialized } from 'type-plus'

const stringify = <T extends JsonCompatible<T>>(value: T) =>
  flatted.stringify(value) as Serialized<T, { circular: true }>
const parse = <S extends Serialized<any, { circular: true }>>(text: S) => flatted.parse(text) as Deserialized<S>

interface Person { name: string; friend?: Person }
const ada: Person = { name: 'Ada' }
ada.friend = ada

const text = stringify(ada) // Serialized<Person, { circular: true }>
const back = parse(text) // Person
back.friend === back // true: the cycle survives
```

Now the mistakes are compile errors:

```ts
stringify({ createdAt: new Date() })
// Type 'Date' is not assignable to type '"not JSON at $.createdAt"'

parse('{"name":"Ada"}')
// Argument of type 'string' is not assignable to parameter of type 'Serialized<any, { circular: true; }>'

JSON.parse(text) // still any: JSON.parse takes any string
```

The same two lines work for `JSON`, with the default format:

```ts
const stringify = <T extends JsonCompatible<T>>(value: T) => JSON.stringify(value) as Serialized<T>
const parse = <S extends Serialized<any>>(text: S) => JSON.parse(text) as Deserialized<S>

const user = parse(stringify({ id: 1, tags: ['a'] })) // { id: number; tags: string[] }
```

The two formats do not assign to each other either way, so with both pairs of wrappers in a codebase, a
flatted string cannot reach the JSON `parse`, nor a JSON string the flatted one:

```ts
parse(flattedText)
// Type '"Serialized<circular>"' is not assignable to type '"Serialized<json>"'.
flattedParse(jsonText)
// Type '"Serialized<json>"' is not assignable to type '"Serialized<circular>"'.
```

At runtime the first gives back flatted's internal array, and the second throws.

- `Serialized` is a branded `string` (see [Nominal Types](/type-plus/api/nominal/)). It is assignable to
  `string`, so it can be sent or stored as one, but a plain `string` is not assignable to it, nor is the
  serialized form of an unrelated type. `IsString` gives `true` and `IsStringLiteral` gives `false`.
- `T` is constrained with `JsonCompatible`, so an `interface`, a recursive type and a self-referencing
  interface are accepted, and the error names the path of the part that is not JSON.
- `circular` names the format, not a property of the value. A type cannot prove a value is acyclic: the
  default, `circular: false`, means the string is plain JSON. A cyclic value passed to `JSON.stringify`
  still throws at runtime. `circular: boolean` is either format.
- The type is only as true as the cast in the wrapper. type-plus ships no runtime code for this, and no
  dependency on flatted.

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
| `Serialized<T, $O>` | a `string` carrying `T`; `{ circular: true }` for a format such as flatted's |
| `Deserialized<S>` | the type parsing a `Serialized` string gives back |
| `JSONTypes`, `JSONPrimitive`, `JSONObject`, `JSONArray` | 💀 deprecated since 8.0.0, use the `Json*` names |

Source: [`src/json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/json.ts),
[`src/json-compatible.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/json-compatible.ts),
[`src/is-json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/is-json.ts),
[`src/is-not-json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/is-not-json.ts),
[`src/serialized.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/serialized.ts) and
[`src/deserialized.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/deserialized.ts).
