import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $ForwardOptions, $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNotAny } from '../any/is-not-any.js'
import type { IsNever } from '../never/is-never.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is neither exactly `any` nor exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsNotAnyOrNever<any> // false
 * type R = IsNotAnyOrNever<never> // false
 *
 * type R = IsNotAnyOrNever<1> // true
 * type R = IsNotAnyOrNever<unknown> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is neither `any` nor `never`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotAnyOrNever<1, { selection: 'filter' }> // 1
 *
 * type R = IsNotAnyOrNever<any, { selection: 'filter' }> // never
 * type R = IsNotAnyOrNever<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotAnyOrNever<never, IsNotAnyOrNever.$Branch> // $Else
 * type R = IsNotAnyOrNever<'a', IsNotAnyOrNever.$Branch> // $Then
 * ```
 */
export type IsNotAnyOrNever<T, $O extends $StrictOptions<$O, IsNotAnyOrNever.$Options> = {}> = IsNever<
	T,
	{
		$then: $ResolveBranch<$O, [$Else]>
		$else: IsNotAny<T, $ForwardOptions<$O, IsNotAny.$Options>>
	}
>

export namespace IsNotAnyOrNever {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotAnyOrNever` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotAnyOrNever.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotAnyOrNever.$Fn, never> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotAnyOrNever<this['in'], $O>
	}
}
