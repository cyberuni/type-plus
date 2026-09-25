import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNumber } from '../number/is-number.js'
import type { IsTuple } from '../tuple/is-tuple.js'
import type { IndexAt } from './array-plus.index-at.js'

/**
 * 🦴 *utilities*
 *
 * Gets the type of the array or tuple at positive or negative index `N`.
 *
 * Like `Array.at()`, this type supports negative numbers.
 *
 * On a tuple, an index within bounds gets that element and an index out of
 * bounds fails, with `never` unless the `$fail` option says otherwise. On an array, the result includes `undefined`, as the
 * index may be out of bounds.
 *
 * @alias ArrayPlus.At
 * @see https://github.com/microsoft/TypeScript/issues/53345#issuecomment-1477138167
 *
 * @example
 * ```ts
 * type R = At<[1, 2, 3], 2> // 3
 * type R = At<[1, 2, 3], -1> // 3
 * type R = At<string[], 0> // string | undefined
 * ```
 */
export type At<
	A extends readonly unknown[],
	N extends number,
	$O extends $StrictOptions<$O, At.$Options> = {},
> = IndexAt<
	A,
	N,
	{
		$never: _ResolveFail<$O>
		$emptyTuple: _ResolveFail<$O>
		$upperBound: _ResolveFail<$O>
		$lowerBound: _ResolveFail<$O>
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
		: _ResolveFail<$O>
	: never

export namespace At {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
