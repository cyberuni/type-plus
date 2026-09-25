import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { CommonPropKeys as ArrayCommonPropKeys } from '../array/array-plus.common-prop-keys.js'
import type { KeyTypes } from '../object/key-types.js'
import type { CommonPropKeys as TupleCommonPropKeys } from './tuple-plus.common-prop-keys.js'

/**
 * ⚗️ *transform*
 * 🔢 *customization*
 *
 * Gets the common property keys of the elements in tuple or array `T`.
 *
 * @example
 * ```ts
 * import { CommonPropKeys } from 'type-plus'
 *
 * type R = CommonPropKeys<[{ a: number }, { b: number }]> // never
 * type R = CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
 * ```
 *
 * @typeParam $O['$never'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	T extends readonly Record<KeyTypes, unknown>[],
	$O extends $StrictOptions<$O, CommonPropKeys.$Options> = {},
> = number extends T['length'] ? ArrayCommonPropKeys<T, $O> : TupleCommonPropKeys<T, $O>

export namespace CommonPropKeys {
	export interface $Options extends TupleCommonPropKeys.$Options {}

	export interface $Default extends TupleCommonPropKeys.$Default {}
}
