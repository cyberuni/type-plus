import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsUndefined } from './is_undefined.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `undefined` or an union with `undefined`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined> // true
 * type R = HasUndefined<undefined | 1> // true
 *
 * type R = HasUndefined<number> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `undefined` or an union with `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined, { selection: 'filter' }> // undefined
 * type R = HasUndefined<undefined | 1, { selection: 'filter' }> // undefined | 1
 *
 * type R = HasUndefined<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined, HasUndefined.$Branch> // $Then
 * type R = HasUndefined<string, HasUndefined.$Branch> // $Else
 * ```
 */
export type HasUndefined<T, $O extends $StrictOptions<$O, HasUndefined.$Options> = {}> = $ResolveBranch<
	$O,
	[
		// distribute over the union so each branch is checked on its own,
		// then fold the branches back into a single `$Then` / `$Else`.
		(T extends unknown ? IsUndefined<T> : never) extends false ? $Else : $Then,
	],
	T
>

export namespace HasUndefined {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `HasUndefined` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<HasUndefined.$Fn, 1 | undefined> // true
	 * type R = $Fn.Apply<HasUndefined.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: HasUndefined<this['in'], $O>
	}
}
