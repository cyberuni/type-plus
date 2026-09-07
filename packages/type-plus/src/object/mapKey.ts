import type { KeyTypes } from './KeyTypes.js'

/**
 * `Array.prototype.map` over the *keys* of `subject`. Returns an array of the
 * callback results in `Object.keys()` order -- an array, not a record.
 *
 * @example
 * ```ts
 * const r = mapKey({ a: 1, b: 2 }, (k, i) => `${String(k)}${i}`)
 * // r === ['a0', 'b1']
 *
 * const r = mapKey({ a: 1, b: 2 }, (k, _i, _a, s) => s[k])
 * // r === [1, 2]
 * ```
 */
export function mapKey<R, S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>, subject: S) => R,
	thisArg?: T,
): R[] {
	return Object.keys(subject).map(function (this: T, k, i, a) {
		return predicate.apply(this, [k, i, a, subject])
	}, thisArg)
}
