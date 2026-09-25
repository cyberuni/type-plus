import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsUndefined } from './is-undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `undefined` and not an union with `undefined`.
 *
 * The inverse of `HasUndefined`, with the same rules.
 *
 * @example
 * ```ts
 * type R = HasNoUndefined<number> // true
 * type R = HasNoUndefined<1 | 2> // true
 *
 * type R = HasNoUndefined<undefined> // false
 * type R = HasNoUndefined<undefined | 1> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `undefined` and not an union with `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasNoUndefined<number, { selection: 'filter' }> // number
 *
 * type R = HasNoUndefined<undefined, { selection: 'filter' }> // never
 * type R = HasNoUndefined<undefined | 1, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasNoUndefined<string, HasNoUndefined.$Branch> // $Then
 * type R = HasNoUndefined<undefined, HasNoUndefined.$Branch> // $Else
 * ```
 */
export type HasNoUndefined<T, $O extends $StrictOptions<$O, HasNoUndefined.$Options> = {}> = $ResolveBranch<
	$O,
	[
		// distribute over the union so each branch is checked on its own,
		// then fold the branches back into a single `$Then` / `$Else`.
		(T extends unknown ? IsUndefined<T> : never) extends false ? $Then : $Else,
	],
	T
>

export namespace HasNoUndefined {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `HasNoUndefined` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<HasNoUndefined.$Fn, 1> // true
	 * type R = $Fn.Apply<HasNoUndefined.$Fn, 1 | undefined> // false
	 *
	 * type R = TuplePlus.Filter<[1, undefined | 2], HasNoUndefined.$Fn> // [1]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: HasNoUndefined<this['in'], $O>
	}
}
