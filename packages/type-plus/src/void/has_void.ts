import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { IsVoid } from './is_void.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `void` or an union with `void`.
 *
 * @example
 * ```ts
 * type R = HasVoid<void> // true
 * type R = HasVoid<void | 1> // true
 *
 * type R = HasVoid<number> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `void` or an union with `void`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasVoid<void, { selection: 'filter' }> // void
 * type R = HasVoid<void | 1, { selection: 'filter' }> // void | 1
 *
 * type R = HasVoid<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasVoid<void, $SelectionBranch> // $Then
 * type R = HasVoid<string, $SelectionBranch> // $Else
 * ```
 */
export type HasVoid<T, $O extends $Selection.Options = {}> = $ResolveBranch<
	$O,
	[
		// distribute over the union so each branch is checked on its own,
		// then fold the branches back into a single `$Then` / `$Else`.
		(T extends unknown ? IsVoid<T> : never) extends false ? $Else : $Then
	],
	T
>
