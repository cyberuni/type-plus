---
title: JSON
description: The types of the values that survive a JSON round trip - JsonTypes and its primitive, object and array parts.
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

## Deprecated `JSON*` names

💀 **deprecated since 8.0.0**: the names before 8.0, kept as aliases until 9.0 — use `JsonTypes`,
`JsonPrimitive`, `JsonObject` and `JsonArray`. The new names title-case the acronym, as every type-plus
name does. See [Migrating to v8](/type-plus/guides/migrating-to-v8/#deprecated-in-80).

## Reference

| Type | Description |
| --- | --- |
| `JsonTypes` | any value JSON can hold |
| `JsonPrimitive` | `boolean \| number \| string \| null` |
| `JsonObject` | string keys holding `JsonTypes`, all optional |
| `JsonArray` | `Array<JsonTypes>` |
| `JSONTypes`, `JSONPrimitive`, `JSONObject`, `JSONArray` | 💀 deprecated since 8.0.0, use the `Json*` names |

Source: [`src/json.ts`](https://github.com/cyberuni/type-plus/blob/main/packages/type-plus/src/json.ts).
