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
 * Validate if `T` is not bigint literals.
 *
 * @example
 * ```ts
 * type R = IsNotBigintLiteral<bigint> // true
 * type R = IsNotBigintLiteral<1n> // false
 *
 * type R = IsNotBigintLiteral<never> // true
 * type R = IsNotBigintLiteral<unknown> // true
 * type R = IsNotBigintLiteral<string | boolean> // true
 *
 * type R = IsNotBigintLiteral<string | 1n> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not bigint literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotBigintLiteral<bigint, { selection: 'filter' }> // bigint
 * type R = IsNotBigintLiteral<1n, { selection: 'filter' }> // never
 *
 * type R = IsNotBigintLiteral<never, { selection: 'filter' }> // never
 * type R = IsNotBigintLiteral<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotBigintLiteral<1n | string, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotBigintLiteral<1n | string> // boolean
 * type R = IsNotBigintLiteral<1n | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotBigintLiteral<1n, IsNotBigintLiteral.$Branch> // $Else
 * type R = IsNotBigintLiteral<bigint, IsNotBigintLiteral.$Branch> // $Then
 * ```
 */
export type IsNotBigintLiteral<T, $O extends IsNotBigintLiteral.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotBigintLiteral.$<T, $O>
		}
	>
>

export namespace IsNotBigintLiteral {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Default = $Selection.Predicate & $Distributive.Default & $Exact.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not number literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<
		$O,
		{
			$then: _D<T, $O>
			$else: _N<T, $O>
		}
	>

	export type $UtilOptions = Assignable.$UtilOptions

	export type _D<T, $O extends $UtilOptions> = T extends bigint & infer U
		? U extends bigint
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Then], T>
	export type _N<T, $O extends $UtilOptions> = [T] extends [bigint & infer U]
		? U extends bigint
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Then], T>
}
