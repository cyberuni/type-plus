import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `number`, `bigint`, nor their literals.
 *
 * This is `IsNotNumber` widened to `number | bigint`.
 * Special types are not numeric, so they resolve to `true`.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<'1'> // true
 * type R = IsNotNumeric<string> // true
 *
 * type R = IsNotNumeric<1> // false
 * type R = IsNotNumeric<1.1> // false
 * type R = IsNotNumeric<1n> // false
 * type R = IsNotNumeric<number> // false
 * type R = IsNotNumeric<bigint> // false
 *
 * type R = IsNotNumeric<any> // true
 * type R = IsNotNumeric<unknown> // true
 * type R = IsNotNumeric<never> // true
 * type R = IsNotNumeric<void> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not numeric, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<string, { selection: 'filter' }> // string
 * type R = IsNotNumeric<1, { selection: 'filter' }> // never
 * type R = IsNotNumeric<string | number, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<1 | string> // boolean
 * type R = IsNotNumeric<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<string, IsNotNumeric.$Branch> // $Then
 * type R = IsNotNumeric<1, IsNotNumeric.$Branch> // $Else
 * ```
 */
export type IsNotNumeric<T, $O extends $StrictOptions<$O, IsNotNumeric.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotNumeric.$<T, $O>
		}
	>
>

export namespace IsNotNumeric {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotNumeric` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsNumeric.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotNumeric.$Fn, 'a'> // true
	 * type R = $Fn.Apply<IsNotNumeric.$Fn, 1n> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotNumeric<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `number`, `bigint`, nor their literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends NotAssignable.$UtilOptions> = NotAssignable.$<T, number | bigint, $O>
}
