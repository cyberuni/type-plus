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
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is bigint literals.
 *
 * @example
 * ```ts
 * type R = IsBigintLiteral<bigint> // false
 * type R = IsBigintLiteral<1n> // true
 *
 * type R = IsBigintLiteral<never> // false
 * type R = IsBigintLiteral<unknown> // false
 * type R = IsBigintLiteral<string | boolean> // false
 *
 * type R = IsBigintLiteral<string | 1n> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is bigint literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsBigintLiteral<bigint, { selection: 'filter' }> // never
 * type R = IsBigintLiteral<1n, { selection: 'filter' }> // 1n
 *
 * type R = IsBigintLiteral<never, { selection: 'filter' }> // never
 * type R = IsBigintLiteral<unknown, { selection: 'filter' }> // never
 * type R = IsBigintLiteral<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsBigintLiteral<string | 1n, { selection: 'filter' }> // 1n
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsBigintLiteral<1n | string> // boolean
 * type R = IsBigintLiteral<1n | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsBigintLiteral<1n, IsBigintLiteral.$Branch> // $Then
 * type R = IsBigintLiteral<string, IsBigintLiteral.$Branch> // $Else
 * ```
 */
export type IsBigintLiteral<T, $O extends IsBigintLiteral.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsBigintLiteral.$<T, $O>
		}
	>
>

export namespace IsBigintLiteral {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is bigint literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>

	export type $UtilOptions = Assignable.$UtilOptions

	export type _D<T, $O extends $UtilOptions> = T extends bigint & infer U
		? U extends bigint
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Else]>
	export type _N<T, $O extends $UtilOptions> = [T] extends [bigint & infer U]
		? U extends bigint
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Else]>
}
