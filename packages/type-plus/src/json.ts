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
 * type R = JSONTypes // JSONPrimitive | JSONObject | JSONArray
 *
 * type R = { a: 1 } extends JSONTypes ? true : false // true
 * type R = Date extends JSONTypes ? true : false // false
 * ```
 */
export type JSONTypes = JSONPrimitive | JSONObject | JSONArray

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
 * type R = JSONPrimitive // boolean | number | string | null
 *
 * type R = null extends JSONPrimitive ? true : false // true
 * type R = undefined extends JSONPrimitive ? true : false // false
 * ```
 */
export type JSONPrimitive = boolean | number | string | null

/**
 * 🧰 *type util*
 *
 * A JSON object: string keys holding any `JSONTypes` value.
 *
 * Every property is optional, so reading one yields `JSONTypes | undefined`.
 * That is the honest type for parsed data, where no key is guaranteed to be
 * present, and it is why `JSONTypes.get` returns `T | undefined`.
 *
 * @example
 * ```ts
 * type R = JSONObject['a'] // JSONTypes | undefined
 *
 * type R = { a: 1; b: 'x' } extends JSONObject ? true : false // true
 * type R = { a: Date } extends JSONObject ? true : false // false
 * ```
 */
export type JSONObject = { [key in string]?: JSONTypes }

/**
 * 🧰 *type util*
 *
 * A JSON array: any number of `JSONTypes` values, not necessarily of one type.
 *
 * @example
 * ```ts
 * type R = JSONArray[number] // JSONTypes
 *
 * type R = [1, 'x', null] extends JSONArray ? true : false // true
 * type R = [() => void] extends JSONArray ? true : false // false
 * ```
 */
export type JSONArray = Array<JSONTypes>

/**
 * The value half of `JSONTypes`, holding `get`.
 *
 * Note: `src/index.ts` re-exports `JSONTypes` with `export type`, so only the
 * type reaches the package entry. This value is reachable inside the package
 * and from the declaration file, not from `import { JSONTypes } from
 * 'type-plus'`.
 */
export const JSONTypes = { get }

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
 * const r = JSONTypes.get<number>(doc, 'a', 'b', 1) // 2
 * const r = JSONTypes.get(doc, 'a', 'nope') // undefined
 * const r = JSONTypes.get(doc, 'a', 'b', 'c', 'd') // undefined
 * ```
 */
function get<T extends JSONTypes>(obj: JSONTypes, ...props: Array<string | number>): T | undefined {
	if (props.length === 0) return obj as T
	if (typeof obj !== 'object' || obj === null) return undefined
	const p = props.shift()!
	// @ts-expect-error
	return get(obj[p], ...props) as T
}
