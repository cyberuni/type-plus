import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { OptionalKeys } from './optional_key.js'

/**
 * 🎭 *predicate*
 *
 * Validate if the key `K` in `T` is not optional.
 *
 * The inverse of `IsOptionalKey`, with the same rules.
 * A key `T` does not have is not optional either, so it passes.
 *
 * @example
 * ```ts
 * type R = IsNotOptionalKey<{ a: 1 }, 'a'> // true
 * type R = IsNotOptionalKey<{ a: 1 }, 'b'> // true
 * type R = IsNotOptionalKey<{ a?: 1 }, 'a'> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the keys that are not optional, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotOptionalKey<{ a?: 1; b: 2 }, 'a' | 'b', { selection: 'filter' }> // 'b'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotOptionalKey<{ a: 1 }, 'a', IsNotOptionalKey.$Branch> // $Then
 * type R = IsNotOptionalKey<{ a?: 1 }, 'a', IsNotOptionalKey.$Branch> // $Else
 * ```
 */
export type IsNotOptionalKey<
	T,
	K,
	$O extends $StrictOptions<$O, IsNotOptionalKey.$Options> = {},
> = K extends OptionalKeys<T> ? $ResolveBranch<$O, [$Else]> : $ResolveBranch<$O, [$Then], K>

export namespace IsNotOptionalKey {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotOptionalKey` as a type function, with `K` and its options `$O` applied.
	 *
	 * The function's input is the value being checked, so `K`, the key the input must not have as optional, is fixed up front.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotOptionalKey.$Fn<'a'>, { a: 1 }> // true
	 * type R = $Fn.Apply<IsNotOptionalKey.$Fn<'a'>, { a?: 1 }> // false
	 *
	 * type R = TuplePlus.Filter<[{ a?: 1 }, { a: 1 }], IsNotOptionalKey.$Fn<'a'>> // [{ a: 1 }]
	 * ```
	 */
	export interface $Fn<K, $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotOptionalKey<this['in'], K, $O>
	}
}
