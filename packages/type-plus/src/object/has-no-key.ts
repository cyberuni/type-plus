import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `K` is not a key of `T`.
 *
 * The inverse of `HasKey`, with the same rules:
 * a plain `extends` check that does not special-case `any`, `never` or `unknown`.
 *
 * @example
 * ```ts
 * type R = HasNoKey<{ a: 1 }, 'b'> // true
 * type R = HasNoKey<{ a: 1 }, 'a'> // false
 *
 * type R = HasNoKey<{ a: 1 }, 'b', { $then: 'yes'; $else: 'no' }> // 'yes'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the keys that are not keys of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasNoKey<{ a: 1; b: 2 }, 'a' | 'c', { selection: 'filter' }> // 'c'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasNoKey<{ a: 1 }, 'b', HasNoKey.$Branch> // $Then
 * type R = HasNoKey<{ a: 1 }, 'a', HasNoKey.$Branch> // $Else
 * ```
 */
export type HasNoKey<T, K, $O extends $StrictOptions<$O, HasNoKey.$Options> = {}> = K extends keyof T
	? $ResolveBranch<$O, [$Else]>
	: $ResolveBranch<$O, [$Then], K>

export namespace HasNoKey {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `HasNoKey` as a type function, with `K` and its options `$O` applied.
	 *
	 * The function's input is the value being checked, so `K`, the key the input must not have, is fixed up front.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<HasNoKey.$Fn<'a'>, {}> // true
	 * type R = $Fn.Apply<HasNoKey.$Fn<'a'>, { a: 1 }> // false
	 *
	 * type R = TuplePlus.Filter<[{ a: 1 }, {}], HasNoKey.$Fn<'a'>> // [{}]
	 * ```
	 */
	export interface $Fn<K, $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: HasNoKey<this['in'], K, $O>
	}
}
