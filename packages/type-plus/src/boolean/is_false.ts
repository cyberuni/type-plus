import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `false`.
 *
 * @example
 * ```ts
 * type R = IsFalse<boolean> // boolean
 * type R = IsFalse<true> // false
 * type R = IsFalse<false> // true
 *
 * type R = IsFalse<number> // false
 * type R = IsFalse<unknown> // false
 * type R = IsFalse<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsFalse<boolean, { selection: 'filter' }> // false
 * type R = IsFalse<true, { selection: 'filter' }> // never
 * type R = IsFalse<false, { selection: 'filter' }> // false
 *
 * type R = IsFalse<number, { selection: 'filter' }> // never
 * type R = IsFalse<unknown, { selection: 'filter' }> // never
 * type R = IsFalse<never, { selection: 'filter' }> // never
 * type R = IsFalse<string | boolean, { selection: 'filter' }> // false
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsFalse<false | 1> // boolean
 * type R = IsFalse<boolean | 1> // boolean
 * type R = IsFalse<boolean | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsFalse<false, $SelectionBranch> // $Then
 * type R = IsFalse<boolean, $SelectionBranch> // $Then | $Else
 * type R = IsFalse<string, $SelectionBranch> // $Else
 * ```
 */
export type IsFalse<T, $O extends $StrictOptions<$O, IsFalse.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsFalse.$<T, $O>
		}
	>
>

export namespace IsFalse {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `false`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = Assignable.$<T, false, $O>

	export type $UtilOptions = Assignable.$UtilOptions
}
