import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Selection, $Then } from '../$type/branch/$selection.js'
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
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `symbol`.
 *
 * ```ts
 * type R = IsNotSymbol<symbol> // false
 *
 * type R = IsNotSymbol<never> // true
 * type R = IsNotSymbol<unknown> // true
 * type R = IsNotSymbol<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `symbol`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotSymbol<symbol, { selection: 'filter' }> // never
 *
 * type R = IsNotSymbol<never, { selection: 'filter' }> // never
 * type R = IsNotSymbol<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotSymbol<symbol | string, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotSymbol<symbol | 1> // boolean
 * type R = IsNotSymbol<symbol | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotSymbol<string, IsNotSymbol.$Branch> // $Then
 * type R = IsNotSymbol<symbol, IsNotSymbol.$Branch> // $Else
 * ```
 */
export type IsNotSymbol<T, $O extends $StrictOptions<$O, IsNotSymbol.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotSymbol.$<T, $O>
		}
	>
>

export namespace IsNotSymbol {
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
	 * `IsNotSymbol` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsSymbol.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotSymbol.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotSymbol.$Fn, symbol> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotSymbol<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `null`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = NotAssignable.$<T, symbol, $O>
}

type $UtilOptions = $Selection.Options & $Distributive.Options
