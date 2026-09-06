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
 * Validate if `T` is not number literals.
 *
 * @example
 * ```ts
 * type R = IsNotNumberLiteral<number> // true
 * type R = IsNotNumberLiteral<1> // false
 *
 * type R = IsNotNumberLiteral<never> // true
 * type R = IsNotNumberLiteral<unknown> // true
 * type R = IsNotNumberLiteral<string | boolean> // true
 *
 * type R = IsNotNumberLiteral<string | 1> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not number literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNumberLiteral<number, { selection: 'filter' }> // number
 * type R = IsNotNumberLiteral<1, { selection: 'filter' }> // never
 *
 * type R = IsNotNumberLiteral<never, { selection: 'filter' }> // never
 * type R = IsNotNumberLiteral<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotNumberLiteral<1 | string, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotNumberLiteral<1 | string> // boolean
 * type R = IsNotNumberLiteral<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNumberLiteral<1, IsNotNumberLiteral.$Branch> // $Else
 * type R = IsNotNumberLiteral<string, IsNotNumberLiteral.$Branch> // $Then
 * ```
 */
export type IsNotNumberLiteral<T, $O extends IsNotNumberLiteral.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotNumberLiteral.$<T, $O>
		}
	>
>

export namespace IsNotNumberLiteral {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
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

	export type _D<T, $O extends $UtilOptions> = T extends number & infer U
		? U extends number
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Then], T>
	export type _N<T, $O extends $UtilOptions> = [T] extends [number & infer U]
		? U extends number
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Then], T>
}
