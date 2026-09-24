import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
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
 * Validate if `T` is `true`.
 *
 * @example
 * ```ts
 * type R = IsTrue<boolean> // boolean
 * type R = IsTrue<true> // true
 * type R = IsTrue<false> // false
 *
 * type R = IsTrue<number> // false
 * type R = IsTrue<unknown> // false
 * type R = IsTrue<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `true`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsTrue<boolean, { selection: 'filter' }> // true
 * type R = IsTrue<true, { selection: 'filter' }> // true
 * type R = IsTrue<false, { selection: 'filter' }> // never
 *
 * type R = IsTrue<number, { selection: 'filter' }> // never
 * type R = IsTrue<unknown, { selection: 'filter' }> // never
 * type R = IsTrue<never, { selection: 'filter' }> // never
 * type R = IsTrue<string | boolean, { selection: 'filter' }> // true
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsTrue<true | 1> // boolean
 * type R = IsTrue<boolean | 1> // boolean
 * type R = IsTrue<true | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsTrue<true, IsTrue.$Branch> // $Then
 * type R = IsTrue<boolean, IsTrue.$Branch> // $Then | $Else
 * type R = IsTrue<string, IsTrue.$Branch> // $Else
 * ```
 */
export type IsTrue<T, $O extends $StrictOptions<$O, IsTrue.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsTrue.$<T, $O>
		}
	>
>

export namespace IsTrue {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default & $Exact.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsTrue` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsTrue.$Fn, true> // true
	 * type R = $Fn.Apply<IsTrue.$Fn, false> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsTrue<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `true`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = Assignable.$<T, true, $O>

	export type $UtilOptions = Assignable.$UtilOptions
}
