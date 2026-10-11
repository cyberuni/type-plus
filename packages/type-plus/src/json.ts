/**
 * 🧰 *type util*
 *
 * Any value `JSON.parse` can produce: a primitive, an object, or an array.
 *
 * Use it as the type of data that has crossed a JSON boundary. It admits
 * exactly what survives the round trip, so a `Date`, a `Map`, a function or
 * an `undefined` value are rejected at the point they are put in rather than
 * silently lost on the way out. Readonly arrays and tuples, `as const` data
 * and optional properties are accepted.
 *
 * An `interface` is not assignable to it, because TypeScript gives interfaces
 * no implicit index signature. To accept an interface, constrain with
 * `JsonCompatible` or test with `IsJson`.
 *
 * @example
 * ```ts
 * type R = JsonTypes // JsonPrimitive | JsonObject | JsonArray
 *
 * type R = { a: 1 } extends JsonTypes ? true : false // true
 * type R = { readonly a: readonly [1, 2] } extends JsonTypes ? true : false // true
 * type R = Date extends JsonTypes ? true : false // false
 * type R = { a: undefined } extends JsonTypes ? true : false // false
 * ```
 */
export type JsonTypes = JsonPrimitive | JsonObject | JsonArray

/**
 * 🧰 *type util*
 *
 * The leaves of a JSON document: `boolean`, `number`, `string` or `null`.
 *
 * `undefined` is absent by design. JSON has no such value, and
 * `JSON.stringify` drops the properties holding it.
 *
 * @example
 * ```ts
 * type R = JsonPrimitive // boolean | number | string | null
 *
 * type R = null extends JsonPrimitive ? true : false // true
 * type R = undefined extends JsonPrimitive ? true : false // false
 * ```
 */
export type JsonPrimitive = boolean | number | string | null

/**
 * 🧰 *type util*
 *
 * A JSON object: string keys holding any `JsonTypes` value.
 *
 * A property may be absent but never `undefined`: `{ a?: number }` is
 * accepted, because `JSON.stringify` drops a missing key the same way it is
 * missing after `JSON.parse`, while `{ a: undefined }` is rejected.
 *
 * Reading a key from it is an index-signature read. Under
 * `noUncheckedIndexedAccess` that read is `JsonTypes | undefined`, which is the
 * honest type for parsed data, where no key is guaranteed to be present.
 * TypeScript has no index signature that rejects `undefined` on the way in and
 * adds it on the way out, so without that option the read is `JsonTypes`.
 *
 * @example
 * ```ts
 * type R = JsonObject[string] // JsonTypes
 *
 * declare const o: JsonObject
 * const r = o.a // JsonTypes | undefined, under noUncheckedIndexedAccess
 *
 * type R = { a: 1; b: 'x' } extends JsonObject ? true : false // true
 * type R = { a?: number } extends JsonObject ? true : false // true
 * type R = { a: undefined } extends JsonObject ? true : false // false
 * type R = { a: Date } extends JsonObject ? true : false // false
 * ```
 */
export type JsonObject = { [key: string]: JsonTypes }

/**
 * 🧰 *type util*
 *
 * A JSON array: any number of `JsonTypes` values, not necessarily of one type.
 *
 * It is readonly, so mutable arrays, readonly arrays, tuples and `as const`
 * tuples are all accepted.
 *
 * @example
 * ```ts
 * type R = JsonArray[number] // JsonTypes
 *
 * type R = [1, 'x', null] extends JsonArray ? true : false // true
 * type R = readonly [1, 'x'] extends JsonArray ? true : false // true
 * type R = [() => void] extends JsonArray ? true : false // false
 * ```
 */
export type JsonArray = readonly JsonTypes[]

/**
 * The pre-8.0 name of `JsonTypes`.
 *
 * @deprecated Use `JsonTypes`. Acronyms are title-cased in `type-plus`; this alias goes in 9.0.
 */
export type JSONTypes = JsonTypes

/**
 * The pre-8.0 name of `JsonPrimitive`.
 *
 * @deprecated Use `JsonPrimitive`. Acronyms are title-cased in `type-plus`; this alias goes in 9.0.
 */
export type JSONPrimitive = JsonPrimitive

/**
 * The pre-8.0 name of `JsonObject`.
 *
 * @deprecated Use `JsonObject`. Acronyms are title-cased in `type-plus`; this alias goes in 9.0.
 */
export type JSONObject = JsonObject

/**
 * The pre-8.0 name of `JsonArray`.
 *
 * @deprecated Use `JsonArray`. Acronyms are title-cased in `type-plus`; this alias goes in 9.0.
 */
export type JSONArray = JsonArray
