import type { KeyTypes } from './KeyTypes.js'

/**
 * `Array.prototype.every` over the *keys* of `subject`, in `Object.keys()`
 * order. `true` when the predicate holds for every key, and `true` for an
 * empty record.
 *
 * Only own enumerable string keys are visited; symbol keys and inherited
 * properties are skipped.
 *
 * @example
 * ```ts
 * const r = everyKey({ a: 1, b: 2 }, (k) => typeof k === 'string')
 * // r === true
 *
 * const r = everyKey({ a: 1, b: 2 }, (k) => k === 'a')
 * // r === false
 * ```
 */
export function everyKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, array: string[]) => unknown,
	thisArg?: T,
): boolean {
	return Object.keys(subject).every(predicate, thisArg)
}
