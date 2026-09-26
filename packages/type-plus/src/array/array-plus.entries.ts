import type { IsTuple } from '../tuple/is-tuple.js'
/**
 * Returns an array of key-value pairs for every entry in the array or tuple.
 *
 * Note that this is not the same as `Array.entries(A)`,
 * which returns an iterable interator.
 *
 * @example
 * ```ts
 * ArrayPlus.Entries<Array<string | number>> // Array<[number, string | number]>
 * ArrayPlus.Entries<[1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
 * ```
 */
export type Entries<A extends readonly unknown[]> = IsTuple<
	A,
	{
		$then: Entries.Device<A, []>
		$else: A extends Array<infer T> ? Array<[number, T]> : never
	}
>

export namespace Entries {
	export type Device<A extends readonly unknown[], R extends unknown[]> = A['length'] extends 0
		? R
		: A extends readonly [...infer F, infer N]
			? Device<F, [[F['length'], N], ...R]>
			: never
}
