import type { KeyTypes } from './KeyTypes.js'

/**
 * `Array.prototype.some` over the *keys* of `subject`, in `Object.keys()`
 * order. `true` when the predicate holds for at least one key, and `false` for
 * an empty record.
 *
 * The predicate also receives `subject` as its fourth argument, so the value
 * is reachable as `subject[key]`.
 *
 * @example
 * ```ts
 * const r = someKey({ a: 1, b: 2 }, (k) => k === 'b')
 * // r === true
 *
 * const r = someKey({ a: 1, b: 2 }, (k, _i, _a, s) => s[k] > 5)
 * // r === false
 * ```
 */
export function someKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, array: string[], subject: S) => unknown,
	thisArg?: T,
): boolean {
	return Object.keys(subject).some(function (this: T, k, i, a) {
		return predicate.apply(this, [k, i, a, subject])
	}, thisArg)
}
