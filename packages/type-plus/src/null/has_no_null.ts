import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsNull } from './is_null.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `null` and not an union with `null`.
 *
 * The inverse of `HasNull`, with the same rules.
 *
 * @example
 * ```ts
 * type R = HasNoNull<number> // true
 * type R = HasNoNull<1 | 2> // true
 *
 * type R = HasNoNull<null> // false
 * type R = HasNoNull<null | 1> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `null` and not an union with `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasNoNull<number, { selection: 'filter' }> // number
 *
 * type R = HasNoNull<null, { selection: 'filter' }> // never
 * type R = HasNoNull<null | 1, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasNoNull<string, HasNoNull.$Branch> // $Then
 * type R = HasNoNull<null, HasNoNull.$Branch> // $Else
 * ```
 */
export type HasNoNull<T, $O extends $StrictOptions<$O, HasNoNull.$Options> = {}> = $ResolveBranch<
	$O,
	[
		// distribute over the union so each branch is checked on its own,
		// then fold the branches back into a single `$Then` / `$Else`.
		(T extends unknown ? IsNull<T> : never) extends false ? $Then : $Else,
	],
	T
>

export namespace HasNoNull {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `HasNoNull` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<HasNoNull.$Fn, 1> // true
	 * type R = $Fn.Apply<HasNoNull.$Fn, 1 | null> // false
	 *
	 * type R = TuplePlus.Filter<[1, null | 2], HasNoNull.$Fn> // [1]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: HasNoNull<this['in'], $O>
	}
}
