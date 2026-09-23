import type { $ResolveOptions } from '../$type/$resolve_options.js'
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
import type { IsNotStrictFunction } from './is_not_strict_function.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `Function` nor function signature.
 *
 * @example
 * ```ts
 * type R = IsNotFunction<Function> // false
 * type R = IsNotFunction<() => void> // false
 *
 * type R = IsNotFunction<never> // true
 * type R = IsNotFunction<unknown> // true
 * type R = IsNotFunction<number> // true
 *
 * type R = IsNotFunction<Function | number> // boolean
 * type R = IsNotFunction<(() => string) | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `Function` nor function signature, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotFunction<Function, { selection: 'filter' }> // never
 * type R = IsNotFunction<() => void, { selection: 'filter' }> // never
 *
 * type R = IsNotFunction<never, { selection: 'filter' }> // never
 * type R = IsNotFunction<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotFunction<Function | number, { selection: 'filter' }> // number
 *
 * type R = IsNotFunction<(() => string) | number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotFunction<Function | 1> // boolean
 * type R = IsNotFunction<Function | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Check if `T` is not exactly `Function`, the same as `IsNotStrictFunction`.
 *
 * @example
 * ```ts
 * type R = IsNotFunction<Function, { exact: true }> // false
 * type R = IsNotFunction<() => void, { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotFunction<Function, IsNotFunction.$Branch> // $Else
 * type R = IsNotFunction<string, IsNotFunction.$Branch> // $Then
 * ```
 */
export type IsNotFunction<T, $O extends $StrictOptions<$O, IsNotFunction.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotFunction.$<T, $O>
		}
	>
>

export namespace IsNotFunction {
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
	 * `IsNotFunction` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsFunction.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotFunction.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotFunction.$Fn, () => void> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotFunction<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `Function` nor function signature,
	 * or not exactly `Function` when `exact` is `true`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $Exact.Default['exact']]> extends true
		? $Distributive.Parse<$O, { $then: IsNotStrictFunction._D<T, $O>; $else: IsNotStrictFunction._N<T, $O> }>
		: NotAssignable.$<T, Function, $O>
	export type $UtilOptions = NotAssignable.$UtilOptions & $Exact.Options
}
