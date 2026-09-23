// /**
//  * Filters an array or tuple based on criteria
//  */
// export type Filter<A extends readonly unknown[], Criteria = true> = Filter._<A, Criteria, []>

import type { $Fn } from '../$type/fn/$fn.js'
import type { $Never } from '../$type/special/$never.js'
import type { IsEqual } from '../equal/is_equal.js'
import type { IsNever } from '../never/is_never.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Filter the array `A`, keeping entries satisfying `Criteria`.
 *
 * `Criteria` is either a type, which an element type matches when it `extends` it,
 * or a type function (`$Fn`), which a member of the element type matches when the function returns `true`.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.Filter<Array<string | undefined>, string> // string[]
 * type R = ArrayPlus.Filter<Array<1 | { a: 1 }>, IsObject.$Fn> // Array<{ a: 1 }>
 * type R = ArrayPlus.Filter<Array<1 | 2>, IsObject.$Fn> // never[]
 * ```
 */
export type Filter<
	A extends readonly unknown[],
	Criteria = true,
	Options extends Filter.Options = Filter.DefaultOptions,
> = TypePlusOptions.Merge<Options, Filter.DefaultOptions> extends infer O extends Filter.Options
	? IsNever<
			A,
			{
				$then: O['$never']
				$else: [Criteria] extends [never]
					? Filter._Type<A, Criteria, O>
					: [Criteria] extends [infer F extends $Fn]
						? number extends A['length']
							? Filter._Fn<A, F>
							: O['$notArray']
						: Filter._Type<A, Criteria, O>
			}
		>
	: never

export namespace Filter {
	export interface Options extends TypePlusOptions.NotArray, $Never.$Options {}

	export interface DefaultOptions {
		$never: never
		$notArray: never[]
	}

	export type _Type<A extends readonly unknown[], Criteria, O extends Options> = A[0] extends Criteria
		? A
		: Criteria extends A[0]
			? Array<Criteria>
			: O['$notArray']

	export type _Fn<A extends readonly unknown[], F extends $Fn> = _Keep<A[number], F> extends infer R
		? [R] extends [never]
			? never[]
			: Array<R>
		: never

	/**
	 * The members of `T` that the type function `F` matches.
	 */
	export type _Keep<T, F extends $Fn> = T extends unknown ? ($Fn._Test<T, F> extends true ? T : never) : never

	export type _<A extends readonly unknown[], Criteria, Result extends unknown[]> = A['length'] extends 0
		? Result
		: A extends [infer H, ...infer Rest]
			? IsEqual<H, Criteria, { $then: _<Rest, Criteria, [...Result, H]>; $else: _<Rest, Criteria, Result> }>
			: never
}
