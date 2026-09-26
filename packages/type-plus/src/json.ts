/**
 * 🧰 *type util*
 *
 * Any value `JSON.parse` can produce: a primitive, an object, or an array.
 *
 * Use it as the constraint on data that has crossed a JSON boundary. It admits
 * exactly what survives the round trip, so a `Date`, a `Map`, a function or
 * `undefined` are rejected at the point they are put in rather than silently
 * lost on the way out.
 *
 * @example
 * ```ts
 * type R = JsonTypes // JsonPrimitive | JsonObject | JsonArray
 *
 * type R = { a: 1 } extends JsonTypes ? true : false // true
 * type R = Date extends JsonTypes ? true : false // false
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
 * Every property is optional, so reading one yields `JsonTypes | undefined`.
 * That is the honest type for parsed data, where no key is guaranteed to be
 * present, and it is why `JsonTypes.get` returns `T | undefined`.
 *
 * @example
 * ```ts
 * type R = JsonObject['a'] // JsonTypes | undefined
 *
 * type R = { a: 1; b: 'x' } extends JsonObject ? true : false // true
 * type R = { a: Date } extends JsonObject ? true : false // false
 * ```
 */
export type JsonObject = { [key in string]?: JsonTypes }

/**
 * 🧰 *type util*
 *
 * A JSON array: any number of `JsonTypes` values, not necessarily of one type.
 *
 * @example
 * ```ts
 * type R = JsonArray[number] // JsonTypes
 *
 * type R = [1, 'x', null] extends JsonArray ? true : false // true
 * type R = [() => void] extends JsonArray ? true : false // false
 * ```
 */
export type JsonArray = Array<JsonTypes>

/**
 * The value half of `JsonTypes`, holding `get`.
 *
 * Note: `src/index.ts` re-exports `JsonTypes` with `export type`, so only the
 * type reaches the package entry. This value is reachable inside the package
 * and from the declaration file, not from `import { JsonTypes } from
 * 'type-plus'`.
 */
export const JsonTypes = { get }

/**
 * Reads the value at a property path out of a JSON value, or `undefined` when
 * any step of the path is missing.
 *
 * The path is walked one property at a time and a non-object hit anywhere along
 * it stops the walk, so a wrong path returns `undefined` instead of throwing.
 * `T` is the caller's claim about what is there, not a checked fact: nothing
 * validates the value against it. With no props, `obj` is returned as `T`.
 *
 * @example
 * ```ts
 * const doc = { a: { b: [1, 2] } }
 *
 * const r = JsonTypes.get<number>(doc, 'a', 'b', 1) // 2
 * const r = JsonTypes.get(doc, 'a', 'nope') // undefined
 * const r = JsonTypes.get(doc, 'a', 'b', 'c', 'd') // undefined
 * ```
 */
function get<T extends JsonTypes>(obj: JsonTypes, ...props: Array<string | number>): T | undefined {
	if (props.length === 0) return obj as T
	if (typeof obj !== 'object' || obj === null) return undefined
	const p = props.shift()!
	// @ts-expect-error
	return get(obj[p], ...props) as T
}

/**
 * The pre-8.0 name of `JsonTypes`.
 *
 * @deprecated Use `JsonTypes`. Acronyms are title-cased in `type-plus`; this alias goes in 9.0.
 */
export type JSONTypes = JsonTypes

/**
 * The pre-8.0 name of `JsonTypes`.
 *
 * @deprecated Use `JsonTypes`. Acronyms are title-cased in `type-plus`; this alias goes in 9.0.
 */
export const JSONTypes = JsonTypes

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
