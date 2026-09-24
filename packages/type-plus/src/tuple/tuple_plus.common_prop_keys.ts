import type { $Never } from '../$type/special/$never.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsNever } from '../never/is_never.js'
import type { KeyTypes } from '../object/KeyTypes.js'
import type { TypePlusOptions } from '../utils/options.js'
import type { Tail } from './tail.js'

/**
 * ⚗️ *transform*
 * 🔢 *customization*
 *
 * Gets the common property keys of the elements in tuple `T`.
 *
 * @example
 * ```ts
 * import { type TuplePlus } from 'type-plus'
 *
 * type R = TuplePlus.CommonPropKeys<[{ a: number }, { b: number }]> // never
 * type R = TuplePlus.CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
 * ```
 *
 * @typeParam $O['$never'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	T extends readonly Record<KeyTypes, unknown>[],
	$O extends $StrictOptions<$O, CommonPropKeys.$Options> = {},
> = IsNever<
	T,
	{
		$then: TypePlusOptions.Merge<$O, CommonPropKeys.$Default>['$never']
		$else: T['length'] extends 0
			? never
			: T['length'] extends 1
				? keyof T[0]
				: T['length'] extends 2
					? keyof T[0] & keyof T[1]
					: keyof T[0] & keyof T[1] & CommonPropKeys<Tail<Tail<T>>>
	}
>

export namespace CommonPropKeys {
	export interface $Options extends $Never.$Options {}

	export interface $Default extends $Never.$Default {}
}
