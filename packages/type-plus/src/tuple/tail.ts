import type { UnionOfValues } from '../array/union_of_values.js'

/**
 * ⚗️ *transform*
 *
 * Gets the types of a tuple except the first entry.
 *
 * An empty tuple has no tail, so it gets `never`.
 * An array is returned as-is.
 *
 * @example
 * ```ts
 * type R = Tail<[1, 'a', 'b']> // ['a', 'b']
 * type R = Tail<[]> // never
 * type R = Tail<string[]> // string[]
 * ```
 */
export type Tail<T extends readonly unknown[]> = T['length'] extends 0
	? never
	: T extends readonly [any, ...infer Tail]
		? Tail extends UnionOfValues<T>[]
			? Tail
			: never
		: T
