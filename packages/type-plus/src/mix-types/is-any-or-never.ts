import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $ForwardOptions, $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsAny } from '../any/is-any.js'
import type { IsNever } from '../never/is-never.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 * 🩳 *shortcut*
 *
 * Validate if `T` is either exactly `any` or exactly `never`.
 *
 * @example
 * ```ts
 * type R = IsAnyOrNever<any> // true
 * type R = IsAnyOrNever<never> // true
 *
 * type R = IsAnyOrNever<1> // false
 * type R = IsAnyOrNever<unknown> // false
 *
 * type R = IsAnyOrNever<never, IsAnyOrNever.$Branch> // $Then
 * type R = IsAnyOrNever<'a', IsAnyOrNever.$Branch> // $Else
 * ```
 *
 * Filter to ensure `T` is `any` or `never`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsAnyOrNever<any, { selection: 'filter' }> // any
 * type R = IsAnyOrNever<1, { selection: 'filter' }> // never
 * ```
 */
export type IsAnyOrNever<T, $O extends $StrictOptions<$O, IsAnyOrNever.$Options> = {}> = IsNever<
	T,
	{
		$then: $ResolveBranch<$O, [$Then], T>
		$else: IsAny<T, $ForwardOptions<$O, IsAny.$Options>>
	}
>

export namespace IsAnyOrNever {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsAnyOrNever` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsAnyOrNever.$Fn, never> // true
	 * type R = $Fn.Apply<IsAnyOrNever.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsAnyOrNever<this['in'], $O>
	}
}
