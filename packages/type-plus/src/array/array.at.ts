import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsNumber } from '../number/is_number.js'
import type { IsTuple } from '../tuple/is_tuple.js'
import type { IndexAt } from './array_plus.index_at.js'

/**
 * 🦴 *utilities*
 *
 * Gets the type of the array or tuple at positive or negative index `N`.
 *
 * Like `Array.at()`, this type supports negative numbers.
 *
 * @alias ArrayPlus.At
 * @see https://github.com/microsoft/TypeScript/issues/53345#issuecomment-1477138167
 *
 * ```ts
 * type R = At<[1, 2, 3], 2> // 3
 * type R = At<[1, 2, 3], -1> // 3
 * ```
 */
export type At<A extends readonly unknown[], N extends number, $O extends $StrictOptions<$O, At.$Options> = {}> = IndexAt<
	A,
	N,
	{
		$never: $Fail._Resolve<$O>
		caseEmptyTuple: $Fail._Resolve<$O>
		caseUpperBound: $Fail._Resolve<$O>
		caseLowerBound: $Fail._Resolve<$O>
	}
> extends infer I
	? I extends number
		? IsTuple.$<
				A,
				{
					$then: IsNumber.$<
						I,
						{
							exact: true
							$then: A[I] | undefined
							$else: A[I]
						}
					>
					$else: A[I] | undefined
				}
			>
		: $Fail._Resolve<$O>
	: never


export namespace At {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}