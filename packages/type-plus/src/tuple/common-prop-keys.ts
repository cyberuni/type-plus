import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { CommonPropKeys as ArrayCommonPropKeys } from '../array/array-plus.common-prop-keys.js'
import type { KeyTypes } from '../object/key-types.js'
import type { CommonPropKeys as TupleCommonPropKeys } from './tuple-plus.common-prop-keys.js'

/**
 * ⚗️ *transform*
 * 🔢 *customization*
 *
 * Gets the common property keys of the elements in tuple or array `A`.
 *
 * @example
 * ```ts
 * import { CommonPropKeys } from 'type-plus'
 *
 * type R = CommonPropKeys<[{ a: number }, { b: number }]> // never
 * type R = CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
 * ```
 *
 * @typeParam $O['$never'] Return type when `A` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	A extends readonly Record<KeyTypes, unknown>[],
	$O extends $StrictOptions<$O, CommonPropKeys.$Options> = {},
> = number extends A['length'] ? ArrayCommonPropKeys<A, $O> : TupleCommonPropKeys<A, $O>

export namespace CommonPropKeys {
	export interface $Options extends TupleCommonPropKeys.$Options {}

	export interface $Default extends TupleCommonPropKeys.$Default {}
}
