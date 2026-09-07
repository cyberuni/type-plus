import type { KeyTypes } from './KeyTypes.js'

/**
 * `Array.prototype.find` over the *keys* of `subject`. Returns the first key
 * the predicate accepts in `Object.keys()` order, or `undefined` when none do.
 *
 * @example
 * ```ts
 * const r = findKey({ a: 1, b: 2 }, (k) => k === 'b')
 * // r === 'b'
 * // typeof r === 'a' | 'b' | undefined
 *
 * const r = findKey({ a: 1 }, () => false)
 * // r === undefined
 * ```
 */
export function findKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>, subject: S) => boolean,
	thisArg?: T,
): keyof S | undefined {
	return Object.keys(subject).find(function (this: T, k, i, a) {
		return predicate.apply(this, [k, i, a, subject])
	}, thisArg)
}
