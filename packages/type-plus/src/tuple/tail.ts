import type { UnionOfValues } from '../array/union-of-values.js'

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
export type Tail<A extends readonly unknown[]> = A['length'] extends 0
	? never
	: A extends readonly [any, ...infer Tail]
		? Tail extends UnionOfValues<A>[]
			? Tail
			: never
		: A
