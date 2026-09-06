import type { KeyTypes } from './KeyTypes.js'

/**
 * `Array.prototype.forEach` over the *keys* of `subject`, in `Object.keys()`
 * order. Returns nothing.
 *
 * Unlike the other key iterators here the callback does *not* receive
 * `subject`, so close over it to reach the values.
 *
 * @example
 * ```ts
 * const seen: string[] = []
 * forEachKey({ a: 1, b: 2 }, (k) => { seen.push(String(k)) })
 * // seen === ['a', 'b']
 * ```
 */
export function forEachKey<S extends Record<KeyTypes, any>, T = any>(
	subject: S,
	predicate: (this: T, key: keyof S, index: number, obj: Array<keyof S>) => void,
	thisArg?: T,
): void {
	Object.keys(subject).forEach(predicate, thisArg)
}
