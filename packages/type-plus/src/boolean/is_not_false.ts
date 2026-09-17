import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
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
 * Validate if `T` is not `false`.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<boolean> // boolean
 * type R = IsNotFalse<true> // true
 * type R = IsNotFalse<false> // false
 *
 * type R = IsNotFalse<number> // true
 * type R = IsNotFalse<unknown> // true
 * type R = IsNotFalse<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<boolean, { selection: 'filter' }> // true
 * type R = IsNotFalse<true, { selection: 'filter' }> // true
 * type R = IsNotFalse<false, { selection: 'filter' }> // never
 *
 * type R = IsNotFalse<number, { selection: 'filter' }> // number
 * type R = IsNotFalse<never, { selection: 'filter' }> // never
 * type R = IsNotFalse<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotFalse<string | boolean, { selection: 'filter' }> // string | true
 * type R = IsNotFalse<string | false, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotFalse<false | 1> // boolean
 * type R = IsNotFalse<boolean | 1> // boolean
 * type R = IsNotFalse<boolean | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotFalse<false, IsNotFalse.$Branch> // $Else
 * type R = IsNotFalse<boolean, IsNotFalse.$Branch> // $Then | $Else
 * type R = IsNotFalse<string, IsNotFalse.$Branch> // $Then
 * ```
 */
export type IsNotFalse<T, $O extends $StrictOptions<$O, IsNotFalse.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotFalse.$<T, $O>
		}
	>
>

export namespace IsNotFalse {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default & $Exact.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `false`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = NotAssignable.$<T, false, $O>

	export type $UtilOptions = NotAssignable.$UtilOptions
}
