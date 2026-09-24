import type { $Never } from '../$type/special/$never.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsAny } from '../any/is_any.js'
import type { IsEqual } from '../equal/is_equal.js'
import type { Abs } from '../math/abs.js'
import type { GreaterThan } from '../math/greater_than.js'
import type { Subtract } from '../math/subtract.js'
import type { IsNever } from '../never/is_never.js'
import type { IsNumber } from '../number/is_number.js'
import type { IsInteger } from '../numeric/is_integer.js'
import type { IsNegative } from '../numeric/is_negative.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Gets the normalized index to access the element of an array or tuple.
 *
 * @example
 * ```ts
 * type R = IndexAt<['a', 'b', 'c'], 2> // 2
 * type R = IndexAt<['a', 'b', 'c'], -2> // 1
 *
 * type R = IndexAt<['a', 'b', 'c'], 3> // 3 (upper bound)
 * type R = IndexAt<['a', 'b', 'c'], -4> // 0 (lower bound)
 *
 * type R = IndexAt<[], 0> // never
 * ```
 *
 * @typeParam $O['$never'] Return type when `A` is `never`.
 * Default to `never`.
 *
 * @typeParam $O['$array'] Return type when `A` is an array (i.e. not a tuple).
 * Default to `N`, as every index is valid for an array.
 *
 * @typeParam $O['$emptyTuple'] Return type when `A` is an empty tuple.
 * Default to `never`.
 *
 * @typeParam $O['$upperBound'] Return type when `N` is out of the upper bound of `A`.
 * Default to `A['length']`.
 *
 * @typeParam $O['$lowerBound'] Return type when `N` is out of the lower bound of `A`.
 * Default to `0`.
 *
 * @example
 * ```ts
 * type R = IndexAt<never, 0, { $never: 'n' }> // 'n'
 * type R = IndexAt<string[], 0, { $array: 'a' }> // 'a'
 * type R = IndexAt<[], 0, { $emptyTuple: 'e' }> // 'e'
 * type R = IndexAt<[1], 1, { $upperBound: 'u' }> // 'u'
 * type R = IndexAt<[1], -2, { $lowerBound: 'l' }> // 'l'
 * ```
 */
export type IndexAt<
	A extends readonly unknown[],
	N extends number,
	$O extends $StrictOptions<$O, IndexAt.$Options> = {},
> = IsNever<
	A,
	{
		$then: IndexAt.$Resolve<$O, '$never', IndexAt.$Default<A, N>['$never']>
		$else: _IndexAt<A, N, $O>
	}
>

export namespace IndexAt {
	export interface $Options extends $Never.$Options {
		$array?: unknown
		$emptyTuple?: unknown
		$upperBound?: unknown
		$lowerBound?: unknown
	}

	export interface $Default<A extends readonly unknown[], N> extends $Never.$Default {
		$array: N
		$emptyTuple: never
		$upperBound: A['length']
		$lowerBound: 0
	}

	/**
	 * Resolves a single case in `$O`, falling back to `D` when the case is not specified.
	 *
	 * Presence of the key is what decides, so a case can be explicitly set to `never`.
	 */
	export type $Resolve<$O extends IndexAt.$Options, K extends keyof IndexAt.$Options, D> = K extends keyof $O
		? $O[K]
		: D
}

/**
 * 🧰 *type util*
 *
 * Gets the normalized index, without checking against `never`.
 *
 * This is a type util for building custom types.
 */
export type _IndexAt<A extends readonly unknown[], N extends number, $O extends IndexAt.$Options = {}> = IsEqual<
	A['length'],
	0,
	{
		$then: IndexAt.$Resolve<$O, '$emptyTuple', IndexAt.$Default<A, N>['$emptyTuple']>
		$else: IsInteger<
			N,
			{
				$then: IsNumber<
					A['length'],
					{
						exact: true
						$then: IndexAt.$Resolve<$O, '$array', IndexAt.$Default<A, N>['$array']>
						$else: IsNegative<
							N,
							{
								$then: GreaterThan<Abs<N>, A['length']> extends true
									? IndexAt.$Resolve<$O, '$lowerBound', IndexAt.$Default<A, N>['$lowerBound']>
									: Subtract<A['length'], Abs<N>>
								$else: GreaterThan<A['length'], N> extends true
									? N
									: IndexAt.$Resolve<$O, '$upperBound', IndexAt.$Default<A, N>['$upperBound']>
							}
						>
					}
				>
				// N: number or float
				$else: IsAny<
					N,
					{
						$then: number
						$else: IsNumber<N, { exact: true; $then: N; $else: never }>
					}
				>
			}
		>
	}
>
