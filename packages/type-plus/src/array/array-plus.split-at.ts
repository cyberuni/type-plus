import type { IsNever } from '../never/is-never.js'
import type { IsTuple } from '../tuple/is-tuple.js'
import type { _IndexAt } from './array-plus.index-at.js'
import type { IsArray } from './is-array.js'

/**
 * ⚗️ *transform*
 *
 * Splits array or tuple `A` into two at the specified `Index`.
 *
 * If the `Index` is out of bounds,
 * it will set to the boundary value.
 *
 * It is the type level `splice()`.
 *
 * @example
 * ```ts
 * SplitAt<[1, 2, 3, 4, 5], 2> // [[1, 2], [3, 4, 5]]
 * SplitAt<[1, 2, 3, 4, 5], -3> // [[1, 2], [3, 4, 5]]
 *
 * SplitAt<[1, 2, 3, 4, 5], 2, 2> // [[1, 2, 5], [3, 4]]
 *
 * SplitAt<[1, 2, 3, 4, 5], 2, 2, ['a', 'b']> // [[1, 2, 'a', 'b', 5], [3, 4]]
 *
 * // out of bound resets to boundary
 * SplitAt<[1, 2, 3, 4, 5], 6> // [[1, 2, 3, 4, 5], []]
 * SplitAt<[1, 2, 3, 4, 5], -6> // [[], [1, 2, 3, 4, 5]]
 * ```
 */
export type SplitAt<
	A extends readonly unknown[],
	Index extends number,
	DeleteCount extends number | never = never,
	Insert extends readonly unknown[] | never = never,
> = IsArray<
	A,
	{
		exact: true
		$then: [A, A]
		$else: _SplitAt<A, [], [], _IndexAt<A, Index>, DeleteCount, Insert>
	}
>

export namespace SplitAt {}

type _SplitAt<
	A extends readonly unknown[],
	B extends readonly unknown[],
	C extends readonly unknown[],
	Index extends number,
	DeleteCount,
	Insert extends readonly unknown[],
> = 0 extends A['length']
	? IsTuple<Insert, { $then: [[...Insert, ...B], C]; $else: [B, C] }>
	: Index extends B['length']
		? IsNever<
				DeleteCount,
				{
					$then: [B, A]
					$else: _D<A, B, C, DeleteCount, Insert>
				}
			>
		: A extends readonly [infer Head, ...infer Tail]
			? _SplitAt<Tail, [...B, Head], [], Index, DeleteCount, Insert>
			: 'unexpected: A does not extends [Head, ...Tail]'

type _D<
	A extends readonly unknown[],
	B extends readonly unknown[],
	C extends readonly unknown[],
	DeleteCount,
	Insert extends readonly unknown[],
> = DeleteCount extends C['length']
	? IsTuple<Insert, { $then: [[...B, ...Insert, ...A], C]; $else: [[...B, ...A], C] }>
	: A extends readonly [infer Head, ...infer Tail]
		? _D<Tail, B, [...C, Head], DeleteCount, Insert>
		: IsTuple<Insert, { $then: [[...Insert, ...B], C]; $else: [B, C] }>
