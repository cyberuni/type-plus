import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { IsNull } from './is_null.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `null` or an union with `null`.
 *
 * @example
 * ```ts
 * type R = HasNull<null> // true
 * type R = HasNull<null | 1> // true
 *
 * type R = HasNull<number> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `null` or an union with `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasNull<null, { selection: 'filter' }> // null
 * type R = HasNull<null | 1, { selection: 'filter' }> // null | 1
 *
 * type R = HasNull<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasNull<null, $SelectionBranch> // $Then
 * type R = HasNull<string, $SelectionBranch> // $Else
 * ```
 */
export type HasNull<T, $O extends $Selection.Options = {}> = $ResolveBranch<
	$O,
	[
		// distribute over the union so each branch is checked on its own,
		// then fold the branches back into a single `$Then` / `$Else`.
		(T extends unknown ? IsNull<T> : never) extends false ? $Else : $Then
	],
	T
>
