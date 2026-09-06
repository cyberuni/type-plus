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
 * Validate if `T` is number literals.
 *
 * @example
 * ```ts
 * type R = IsNumberLiteral<number> // false
 * type R = IsNumberLiteral<1> // true
 *
 * type R = IsNumberLiteral<never> // false
 * type R = IsNumberLiteral<unknown> // false
 * type R = IsNumberLiteral<string | boolean> // false
 *
 * type R = IsNumberLiteral<string | 1> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is number literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNumberLiteral<number, { selection: 'filter' }> // never
 * type R = IsNumberLiteral<1, { selection: 'filter' }> // 1
 *
 * type R = IsNumberLiteral<never, { selection: 'filter' }> // never
 * type R = IsNumberLiteral<unknown, { selection: 'filter' }> // never
 * type R = IsNumberLiteral<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsNumberLiteral<string | 1, { selection: 'filter' }> // 1
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNumberLiteral<1 | string> // boolean
 * type R = IsNumberLiteral<1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNumberLiteral<1, IsNumberLiteral.$Branch> // $Then
 * type R = IsNumberLiteral<string, IsNumberLiteral.$Branch> // $Else
 * ```
 */
export type IsNumberLiteral<T, $O extends IsNumberLiteral.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsNumberLiteral.$<T, $O>
		}
	>
>

export namespace IsNumberLiteral {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is number literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>

	export type $UtilOptions = Assignable.$UtilOptions

	export type _D<T, $O extends $UtilOptions> = T extends number & infer U
		? U extends number
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Else]>
	export type _N<T, $O extends $UtilOptions> = [T] extends [number & infer U]
		? U extends number
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Else]>
}
