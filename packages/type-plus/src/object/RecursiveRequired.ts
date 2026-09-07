import type { AnyRecord } from './any_record.js'

/**
 * ⚗️ *transform*
 *
 * Makes every property of `T` required, descending into nested records and
 * into array element types.
 *
 * ⚠️ The descent stops at optional properties. `T[P]` on an optional property
 * includes `undefined`, and `undefined` is not a record, so the recursive
 * branch is never taken: the property is made required and its own optional
 * properties are left alone. Only already-required nested records are
 * processed recursively. Since making optional properties required is the
 * point of the type, this limit bites at exactly the case you would reach for
 * it.
 *
 * @example
 * ```ts
 * // required nesting recurses
 * type R = RecursiveRequired<{ a: { b?: number } }> // { a: { b: number } }
 * type R = RecursiveRequired<{ a: Array<{ b?: number }> }> // { a: Array<{ b: number }> }
 *
 * // optional nesting does not
 * type R = RecursiveRequired<{ a?: { b?: number } }> // { a: { b?: number } }
 * ```
 */
export type RecursiveRequired<T> = {
	[P in keyof T]-?: T[P] extends (infer U)[]
		? RecursiveRequired<U>[]
		: T[P] extends AnyRecord
			? RecursiveRequired<T[P]>
			: T[P]
}
