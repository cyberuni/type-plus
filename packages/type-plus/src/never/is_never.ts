import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $NotNever } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `never`.
 *
 * @example
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `never`, otherwise returns `$NotNever`.
 *
 * Filter normally returns `never` in the `$else` clause.
 * But since we are checking for `never` here,
 * we have to return `$NotNever` instead.
 *
 * @example
 * ```ts
 * type R = IsNever<never, { selection: 'filter' }> // never
 *
 * type R = IsNever<1, { selection: 'filter' }> // $NotNever
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNever<never, $SelectionBranch> // $Then
 * type R = IsNever<1, $SelectionBranch> // $Else
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsNever<T, $O extends IsNever.$Options = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? false
		: [T] extends [never]
			? true
			: false
	: $Special<
			T,
			{
				$any: $ResolveBranch<IsNever._O<$O>, [$Any, $Else]>
				$unknown: $ResolveBranch<IsNever._O<$O>, [$Unknown, $Else]>
				$never: $ResolveBranch<$O, [$Then], T>
				$void: $ResolveBranch<IsNever._O<$O>, [$Void, $Else]>
				$else: $ResolveBranch<IsNever._O<$O>, [$Else]>
			}
		>

export namespace IsNever {
	export interface $Options extends $Selection.Options, $InputOptions<$Any | $Unknown> {}
	export type $Branch = $Selection.Branch
	export type _O<$O extends $Options> = '$else' extends keyof $O
		? $O
		: $O['selection'] extends 'filter'
			? $O & { $else: $NotNever }
			: $O
}
