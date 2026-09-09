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
 * Validate if `T` is `Function` or function signature.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function> // true
 * type R = IsFunction<() => void> // true
 *
 * type R = IsFunction<never> // false
 * type R = IsFunction<unknown> // false
 * type R = IsFunction<number> // false
 *
 * type R = IsFunction<Function | number> // boolean
 * type R = IsFunction<(() => string) | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `Function` or function signature, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function, { selection: 'filter' }> // Function
 * type R = IsFunction<() => void, { selection: 'filter' }> // () => void
 *
 * type R = IsFunction<never, { selection: 'filter' }> // never
 * type R = IsFunction<unknown, { selection: 'filter' }> // never
 * type R = IsFunction<Function | number, { selection: 'filter' }> // Function
 *
 * type R = IsFunction<(() => string) | number, { selection: 'filter' }> // () => string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsFunction<Function | 1> // boolean
 * type R = IsFunction<Function | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsFunction<Function, IsFunction.$Branch> // $Then
 * type R = IsFunction<string, IsFunction.$Branch> // $Else
 * ```
 */
export type IsFunction<T, $O extends IsFunction.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsFunction.$<T, $O>
		}
	>
>

export namespace IsFunction {
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
	export type $<T, $O extends Assignable.$UtilOptions> = Assignable.$<T, Function, $O>
}
