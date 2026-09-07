import type { KeyTypes } from './KeyTypes.js'

/**
 * `Array.prototype.reduce` over the *keys* of `subject`, in
 * `Object.keys()` order.
 *
 * The callback receives the accumulator, the key, the index, the whole key
 * array and `subject` itself, so the value is reachable as `subject[key]`
 * without closing over it.
 *
 * Only own enumerable string keys are visited; symbol keys and inherited
 * properties are skipped.
 *
 * @example
 * ```ts
 * const r = reduceByKey({ a: 1, b: 2 }, (acc, k) => acc + String(k), '')
 * // r === 'ab'
 *
 * const sum = reduceByKey({ a: 1, b: 2 }, (acc, k, _i, _a, s) => acc + s[k], 0)
 * // sum === 3
 * ```
 */
export function reduceByKey<S extends Record<KeyTypes, any>, T>(
	subject: S,
	callbackfn: (previousValue: T, key: keyof S, currentIndex: number, array: string[], subject: S) => T,
	initialValue: T,
): T {
	return Object.keys(subject).reduce((p, k, i, a) => callbackfn(p, k, i, a, subject), initialValue)
}

/**
 * The former name of `reduceByKey`, re-exported unchanged.
 *
 * @deprecated renamed to `reduceByKey`. Kept for the v7 migration; it will be
 * dropped.
 *
 * @example
 * ```ts
 * const r = reduceKey({ a: 1, b: 2 }, (acc, k) => acc + String(k), '')
 * // r === 'ab'
 * ```
 */
export const reduceKey = reduceByKey
