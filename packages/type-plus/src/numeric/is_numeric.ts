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
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `number`, `bigint`, or their literals.
 *
 * This is `IsNumber` widened to `number | bigint`.
 * Special types are not numeric, so they resolve to `false`.
 *
 * @example
 * ```ts
 * type R = IsNumeric<1> // true
 * type R = IsNumeric<1.1> // true
 * type R = IsNumeric<1n> // true
 * type R = IsNumeric<number> // true
 * type R = IsNumeric<bigint> // true
 *
 * type R = IsNumeric<'1'> // false
 * type R = IsNumeric<string> // false
 *
 * type R = IsNumeric<any> // false
 * type R = IsNumeric<unknown> // false
 * type R = IsNumeric<never> // false
 * type R = IsNumeric<void> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is numeric, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNumeric<1, { selection: 'filter' }> // 1
 * type R = IsNumeric<string, { selection: 'filter' }> // never
 * type R = IsNumeric<string | number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNumeric<1 | string> // boolean
 * type R = IsNumeric<1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNumeric<1, IsNumeric.$Branch> // $Then
 * type R = IsNumeric<string, IsNumeric.$Branch> // $Else
 * ```
 */
export type IsNumeric<T, $O extends IsNumeric.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsNumeric.$<T, $O>
		}
	>
>

export namespace IsNumeric {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Default = $Selection.Predicate & $Distributive.Default & $Exact.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `Function`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends Assignable.$UtilOptions> = Assignable.$<T, number | bigint, $O>
}
