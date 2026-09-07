import type { CommonPropKeys as ArrayCommonPropKeys } from '../array/array_plus.common_prop_keys.js'
import type { KeyTypes } from '../object/KeyTypes.js'
import type { CommonPropKeys as TupleCommonPropKeys } from './tuple_plus.common_prop_keys.js'

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
 * @typeParam Options['$never'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	T extends Record<KeyTypes, unknown>[],
	Options extends CommonPropKeys.Options = CommonPropKeys.DefaultOptions,
> = number extends T['length'] ? ArrayCommonPropKeys<T> : TupleCommonPropKeys<T, Options>

export namespace CommonPropKeys {
	export interface Options extends TupleCommonPropKeys.Options {}

	export interface DefaultOptions extends TupleCommonPropKeys.DefaultOptions {}
}
