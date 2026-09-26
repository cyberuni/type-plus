import type { IsAny } from '../any/is-any.js'
import type { GreaterThan } from '../math/greater-than.js'
import type { IsNumber } from '../number/is-number.js'
import type { IsInteger } from '../numeric/is-integer.js'
import type { _IndexAt } from './array-plus.index-at.js'

/**
 * ⚗️ *transform*
 *
 * Gets the section of array or tuple `A` from index `Start` up to, but not
 * including, index `End`.
 *
 * It is the type level `Array.prototype.slice()`, and follows its rules:
 *
 * - A negative index counts back from the end of the tuple.
 * - An index out of bounds is clamped to the boundary.
 * - `End` at or before `Start` gets an empty tuple.
 * - `Start` defaults to `0` and `End` to the length of `A`.
 * - The result is mutable, even when `A` is `readonly`.
 *
 * On an array, or when `Start` or `End` is the wide `number` or `any`,
 * the section cannot be known, so the result is an array of the element type.
 *
 * When `A`, `Start` or `End` is `never`, or an index is not an integer,
 * the result is `never`.
 *
 * @alias ArrayPlus.Slice
 *
 * @example
 * ```ts
 * type R = Slice<[1, 2, 3], 1> // [2, 3]
 * type R = Slice<[1, 2, 3], 0, 2> // [1, 2]
 * type R = Slice<[1, 2, 3], -2> // [2, 3]
 * type R = Slice<[1, 2, 3], -3, -1> // [1, 2]
 *
 * // out of bound is clamped
 * type R = Slice<[1, 2, 3], -5, 5> // [1, 2, 3]
 * type R = Slice<[1, 2, 3], 2, 1> // []
 *
 * type R = Slice<string[], 1> // string[]
 * type R = Slice<[1, 2, 3], number> // Array<1 | 2 | 3>
 * ```
 */
export type Slice<A extends readonly unknown[], Start extends number = 0, End extends number = A['length']> = [
	A,
	Start,
	End,
] extends [never, any, any] | [any, never, any] | [any, any, never]
	? never
	: [_IndexKind<Start>, _IndexKind<End>] extends [infer S, infer E]
		? 'invalid' extends S | E
			? never
			: 'wide' extends S | E
				? A[number][]
				: IsNumber<
						A['length'],
						{
							exact: true
							$then: A[number][]
							$else: _Slice<A, _IndexAt<A, Start, { $emptyTuple: 0 }>, _IndexAt<A, End, { $emptyTuple: 0 }>>
						}
					>
		: never

/**
 * Sorts an index into `'wide'` (`number` or `any`), `'integer'`, or `'invalid'`.
 */
type _IndexKind<N extends number> = IsAny<
	N,
	{
		$then: 'wide'
		$else: IsNumber<N, { exact: true; $then: 'wide'; $else: IsInteger<N, { $then: 'integer'; $else: 'invalid' }> }>
	}
>

type _Slice<A extends readonly unknown[], Start extends number, End extends number> = GreaterThan<
	End,
	Start
> extends true
	? _Take<A, Start, End>
	: []

type _Take<
	A extends readonly unknown[],
	Start extends number,
	End extends number,
	I extends unknown[] = [],
	In extends boolean = false,
	R extends unknown[] = [],
> = I['length'] extends End
	? R
	: A extends readonly [infer Head, ...infer Tail]
		? [In, I['length']] extends [true, any] | [any, Start]
			? _Take<Tail, Start, End, [...I, unknown], true, [...R, Head]>
			: _Take<Tail, Start, End, [...I, unknown], false, R>
		: R
