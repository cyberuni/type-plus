import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate that `T` is not a tuple, excluding array.
 *
 * ```ts
 * type R = IsNotTuple<[]>       // false
 * type R = IsNotTuple<[1]>      // false
 *
 * type R = IsNotTuple<number[]> // true
 * type R = IsNotTuple<string>   // true
 * type R = IsNotTuple<never>    // true
 * type R = IsNotTuple<unknown>  // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a `tuple`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotTuple<[], { selection: 'filter' }> // never
 * type R = IsNotTuple<[1], { selection: 'filter' }> // never
 *
 * type R = IsNotTuple<never, { selection: 'filter' }> // never
 * type R = IsNotTuple<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotTuple<[] | boolean, { selection: 'filter' }> // boolean
 * type R = IsNotTuple<[1] | bigint, { selection: 'filter' }> // bigint
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotTuple<[] | 1> // boolean
 * type R = IsNotTuple<[] | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotTuple<bigint, IsNotTuple.$Branch> // $Then
 * type R = IsNotTuple<[], IsNotTuple.$Branch> // $Else
 * ```
 */
export type IsNotTuple<T, $O extends IsNotTuple.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotTuple.$<T, $O>
		}
	>
>

export namespace IsNotTuple {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	// export type $Default = $Select.$Default

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `bigint` or `bigint` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: T extends readonly any[]
				? number extends T['length']
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Then], T>
			$else: [T] extends [readonly any[]]
				? number extends T['length']
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Then], T>
		}
	>

	export type $UtilOptions = NotAssignable.$UtilOptions
}
