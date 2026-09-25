import type { IsReadonly } from './array-plus.is-readonly.js'

/**
 * ⚗️ *transform*
 *
 * Reverses the order of the elements in the array or tuple `A`.
 *
 * A readonly `A` gives a readonly result.
 * An array, which has no order to reverse, is returned as-is.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.Reverse<[1, 2, 3]> // [3, 2, 1]
 * type R = ArrayPlus.Reverse<readonly [1, 2, 3]> // readonly [3, 2, 1]
 * type R = ArrayPlus.Reverse<Array<string | number>> // Array<string | number>
 * ```
 */
export type Reverse<A extends readonly unknown[]> =
	_Reverse<A> extends infer R ? (IsReadonly<A> extends true ? Readonly<R> : R) : never

export namespace Reverse {}

type _Reverse<A extends readonly unknown[]> = A extends readonly [infer First, ...infer Rest]
	? [..._Reverse<Rest>, First]
	: A
