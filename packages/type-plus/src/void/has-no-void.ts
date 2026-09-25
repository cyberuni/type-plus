import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsVoid } from './is-void.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `void` and not an union with `void`.
 *
 * The inverse of `HasVoid`, with the same rules.
 *
 * @example
 * ```ts
 * type R = HasNoVoid<number> // true
 * type R = HasNoVoid<1 | 2> // true
 *
 * type R = HasNoVoid<void> // false
 * type R = HasNoVoid<void | 1> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `void` and not an union with `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasNoVoid<number, { selection: 'filter' }> // number
 *
 * type R = HasNoVoid<void, { selection: 'filter' }> // never
 * type R = HasNoVoid<void | 1, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasNoVoid<string, HasNoVoid.$Branch> // $Then
 * type R = HasNoVoid<void, HasNoVoid.$Branch> // $Else
 * ```
 */
export type HasNoVoid<T, $O extends $StrictOptions<$O, HasNoVoid.$Options> = {}> = $ResolveBranch<
	$O,
	[
		// distribute over the union so each branch is checked on its own,
		// then fold the branches back into a single `$Then` / `$Else`.
		(T extends unknown ? IsVoid<T> : never) extends false ? $Then : $Else,
	],
	T
>

export namespace HasNoVoid {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `HasNoVoid` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<HasNoVoid.$Fn, 1> // true
	 * type R = $Fn.Apply<HasNoVoid.$Fn, 1 | void> // false
	 *
	 * type R = TuplePlus.Filter<[1, void | 2], HasNoVoid.$Fn> // [1]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: HasNoVoid<this['in'], $O>
	}
}
