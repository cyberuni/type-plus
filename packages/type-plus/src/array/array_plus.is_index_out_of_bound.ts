import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { IsNever } from '../never/is_never.js'
import type { IndexAt } from './array_plus.index_at.js'

/**
 * 🎭 *predicate*
 *
 * Is `N` an out of bound index of `A`.
 *
 * @example
 * ```ts
 * type R = IsIndexOutOfBound<[1], 0> // false
 * type R = IsIndexOutOfBound<[1], -1> // false
 *
 * type R = IsIndexOutOfBound<[1], 1> // true
 * type R = IsIndexOutOfBound<[1], -2> // true
 *
 * type R = IsIndexOutOfBound<[1], 1, { $then: 'yes'; $else: 'no' }> // 'yes'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep `N` when it is out of bound, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsIndexOutOfBound<[1], 1, { selection: 'filter' }> // 1
 * type R = IsIndexOutOfBound<[1], 0, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsIndexOutOfBound<[1], 1, IsIndexOutOfBound.$Branch> // $Then
 * type R = IsIndexOutOfBound<[1], 0, IsIndexOutOfBound.$Branch> // $Else
 * ```
 */
export type IsIndexOutOfBound<
	A extends readonly unknown[],
	N extends number,
	$O extends IsIndexOutOfBound.$Options = {},
> = IsNever<
	IndexAt<A, N, { $never: never; caseEmptyTuple: never; caseUpperBound: never; caseLowerBound: never }>,
	{
		$then: $ResolveBranch<$O, [$Then], N>
		$else: $ResolveBranch<$O, [$Else]>
	}
>

export namespace IsIndexOutOfBound {
	export type $Options = $Selection.Options
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
