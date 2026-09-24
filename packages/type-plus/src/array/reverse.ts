/**
 * ⚗️ *transform*
 *
 * reverses the order of `A`.
 *
 * A readonly tuple stays readonly.
 * An array, or a tuple with a rest element, is returned as-is.
 *
 * @example
 * ```ts
 * type R = Reverse<[1, 2, 3]> // [3, 2, 1]
 * type R = Reverse<readonly [1, 2, 3]> // readonly [3, 2, 1]
 * type R = Reverse<string[]> // string[]
 * ```
 */
export type Reverse<A extends readonly unknown[]> = number extends A['length']
	? A
	: A['length'] extends 0
		? A
		: A['length'] extends 1
			? A
			: ReverseTuple<A> extends infer R extends unknown[]
				? A extends unknown[]
					? R
					: Readonly<R>
				: never

type ReverseTuple<A extends readonly unknown[]> = A extends readonly [infer H, ...infer T]
	? [...ReverseTuple<T>, H]
	: []
