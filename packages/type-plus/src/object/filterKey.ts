import type { KeyTypes } from './KeyTypes.js'

/**
 * `Array.prototype.filter` over the *keys* of `subject`. Returns the keys the
 * predicate accepts, as an array, in `Object.keys()` order.
 *
 * Note the return type is `Array<keyof S>` -- the keys, not a filtered record.
 *
 * @example
 * ```ts
 * const r = filterKey({ a: 1, b: 2 }, (k) => k === 'a')
 * // r === ['a']
 * // typeof r === Array<'a' | 'b'>
 * ```
 */
export function filterKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>, subject: S) => boolean,
	thisArg?: T,
): Array<keyof S> {
	return Object.keys(subject).filter(function (this: T, k, i, a) {
		return predicate.apply(this, [k, i, a, subject])
	}, thisArg)
}
