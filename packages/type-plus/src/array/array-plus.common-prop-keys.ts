import type { $Never } from '../$type/special/$never.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNever } from '../never/is-never.js'
import type { KeyTypes } from '../object/key-types.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * ⚗️ *transform*
 * 🔢 *customization*
 *
 * Gets the common keys of the record types in the array `A`.
 *
 * @example
 * ```ts
 * import { type ArrayPlus } from 'type-plus'
 *
 * type R = ArrayPlus.CommonPropKeys<Array<{ a: 1 }>> // 'a'
 * type R = ArrayPlus.CommonPropKeys<Array<{ a: 1, b: 1 } | { a: 1, c: 1 }>> // 'a'
 * ```
 *
 * @typeParam $O['$never'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	A extends readonly Record<KeyTypes, unknown>[],
	$O extends $StrictOptions<$O, CommonPropKeys.$Options> = {},
> = IsNever<
	A,
	{
		$then: TypePlusOptions.Merge<$O, CommonPropKeys.$Default>['$never']
		$else: A extends Readonly<Array<infer R extends Record<KeyTypes, unknown>>> ? keyof R : never
	}
>

export namespace CommonPropKeys {
	export interface $Options extends $Never.$Options {}

	export interface $Default extends $Never.$Default {}
}
