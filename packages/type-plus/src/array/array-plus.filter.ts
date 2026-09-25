import type { _FnTest } from '../$type/fn/_fn-test.js'
import type { $Fn } from '../$type/fn/$fn.js'
import type { $Never } from '../$type/special/$never.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNever } from '../never/is-never.js'
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
	$O extends $StrictOptions<$O, Filter.$Options> = {},
> = TypePlusOptions.Merge<$O, Filter.$Default> extends infer O extends Filter.$Options
	? IsNever<
			A,
			{
				$then: O['$never']
				$else: [Criteria] extends [never]
					? _Type<A, Criteria, O>
					: [Criteria] extends [infer F extends $Fn]
						? number extends A['length']
							? _Fn<A, F>
							: O['$notArray']
						: _Type<A, Criteria, O>
			}
		>
	: never

export namespace Filter {
	export interface $Options extends $Never.$Options {
		$notArray?: unknown
	}

	export interface $Default extends $Never.$Default {
		$notArray: never[]
	}
}

type _Type<A extends readonly unknown[], Criteria, O extends Filter.$Options> = A[0] extends Criteria
	? A
	: Criteria extends A[0]
		? Array<Criteria>
		: O['$notArray']

type _Fn<A extends readonly unknown[], F extends $Fn> = _Keep<A[number], F> extends infer R
	? [R] extends [never]
		? never[]
		: Array<R>
	: never

/**
 * The members of `T` that the type function `F` matches.
 */
type _Keep<T, F extends $Fn> = T extends unknown ? (_FnTest<T, F> extends true ? T : never) : never
