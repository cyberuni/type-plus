import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { AnyRecord } from './any-record.js'
import type { KeyTypes } from './key-types.js'

/**
 * 🎭 *predicate*
 *
 * Validate if the key `K` in `T` is optional.
 *
 * @example
 * ```ts
 * type R = IsOptionalKey<{ a: 1 }, 'a'> // false
 * type R = IsOptionalKey<{ a?: 1 }, 'a'> // true
 *
 * type R = IsOptionalKey<{ a?: 1 }, 'a', { $then: 'yes'; $else: 'no' }> // 'yes'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the optional keys, otherwise returns `never`.
 * `IsOptionalKey<T, keyof T, { selection: 'filter' }>` is `OptionalKeys<T>`.
 *
 * @example
 * ```ts
 * type R = IsOptionalKey<{ a?: 1; b: 2 }, 'a' | 'b', { selection: 'filter' }> // 'a'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsOptionalKey<{ a?: 1 }, 'a', IsOptionalKey.$Branch> // $Then
 * type R = IsOptionalKey<{ a: 1 }, 'a', IsOptionalKey.$Branch> // $Else
 * ```
 */
export type IsOptionalKey<T, K, $O extends $StrictOptions<$O, IsOptionalKey.$Options> = {}> = K extends OptionalKeys<T>
	? $ResolveBranch<$O, [$Then], K>
	: $ResolveBranch<$O, [$Else]>

export namespace IsOptionalKey {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsOptionalKey` as a type function, with `K` and its options `$O` applied.
	 *
	 * The function's input is the value being checked, so `K`, the key the input must have as optional, is fixed up front.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsOptionalKey.$Fn<'a'>, { a?: 1 }> // true
	 * type R = $Fn.Apply<IsOptionalKey.$Fn<'a'>, { a: 1 }> // false
	 *
	 * type R = TuplePlus.Filter<[{ a?: 1 }, { a: 1 }], IsOptionalKey.$Fn<'a'>> // [{ a?: 1 }]
	 * ```
	 */
	export interface $Fn<K, $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsOptionalKey<this['in'], K, $O>
	}
}

/**
 * Gets the optional keys of `T`.
 *
 * 🦴 *utilities*
 *
 * @example
 * ```ts
 * OptionalKeys<{ a: 1 }> // never
 * OptionalKeys<{ a?: 1, b: number }> // 'a'
 * ```
 */
export type OptionalKeys<T> = T extends unknown
	? { [k in keyof T]-?: Record<KeyTypes, any> extends Pick<T, k> ? k : never }[keyof T]
	: never

/**
 * ⚗️ *transform*
 *
 * Keeps only the optional properties of `T`.
 *
 * It distributes over a union `T`.
 *
 * @example
 * ```ts
 * type R = OptionalProps<{ a?: number; b: number | undefined }> // { a?: number }
 * type R = OptionalProps<{ a: number }> // {}
 * ```
 */
export type OptionalProps<T extends AnyRecord> = T extends unknown ? { [k in OptionalKeys<T>]?: T[k] } : never
