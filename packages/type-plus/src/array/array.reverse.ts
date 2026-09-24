import type { IsReadonly } from './array_plus.is_readonly.js'

/*
 * Reverses the order of elements in the array or tuple.
 *
 * @example
 * ```ts
 * Reverse<Array<string | number>> // Array<string | number>
 *
 * Reverse<[1, 2, 3]> // [3, 2, 1]
 * ```
 *
 * @param T The array type to reverse.
 * @returns The reversed array type.
 */
export type Reverse<A extends readonly unknown[]> =
	_Reverse<A> extends infer R ? (IsReadonly<A> extends true ? Readonly<R> : R) : never

export namespace Reverse {}

type _Reverse<A extends readonly unknown[]> = A extends readonly [infer First, ...infer Rest]
	? [..._Reverse<Rest>, First]
	: A
