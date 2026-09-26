import type { $Never } from '../$type/special/$never.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNever } from '../never/is-never.js'
import type { KeyTypes } from '../object/key-types.js'
import type { TypePlusOptions } from '../utils/options.js'
import type { Tail } from './tail.js'

/**
 * ⚗️ *transform*
 * 🔢 *customization*
 *
 * Gets the common property keys of the elements in tuple `A`.
 *
 * @example
 * ```ts
 * import { type TuplePlus } from 'type-plus'
 *
 * type R = TuplePlus.CommonPropKeys<[{ a: number }, { b: number }]> // never
 * type R = TuplePlus.CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
 * ```
 *
 * @typeParam $O['$never'] Return type when `A` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	A extends readonly Record<KeyTypes, unknown>[],
	$O extends $StrictOptions<$O, CommonPropKeys.$Options> = {},
> = IsNever<
	A,
	{
		$then: TypePlusOptions.Merge<$O, CommonPropKeys.$Default>['$never']
		$else: A['length'] extends 0
			? never
			: A['length'] extends 1
				? keyof A[0]
				: A['length'] extends 2
					? keyof A[0] & keyof A[1]
					: keyof A[0] & keyof A[1] & CommonPropKeys<Tail<Tail<A>>>
	}
>

export namespace CommonPropKeys {
	export interface $Options extends $Never.$Options {}

	export interface $Default extends $Never.$Default {}
}
