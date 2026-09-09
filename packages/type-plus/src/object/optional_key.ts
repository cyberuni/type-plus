import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { AnyRecord } from './any_record.js'
import type { KeyTypes } from './KeyTypes.js'

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
export type IsOptionalKey<T, K, $O extends IsOptionalKey.$Options = {}> = K extends OptionalKeys<T>
	? $ResolveBranch<$O, [$Then], K>
	: $ResolveBranch<$O, [$Else]>

export namespace IsOptionalKey {
	export type $Options = $Selection.Options
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
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
 * Parse `T` to keep only the optional properties.
 */
export type OptionalProps<T extends AnyRecord> = T extends unknown ? { [k in OptionalKeys<T>]?: T[k] } : never
