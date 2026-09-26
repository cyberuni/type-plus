import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNever } from '../never/is-never.js'
import type { IndexAt } from './array-plus.index-at.js'

/**
 * 🎭 *predicate*
 *
 * Is `N` an out of bound index of `A`.
 *
 * @example
 * ```ts
 * type R = IsIndexOutOfBound<[1], 0> // false
 * type R = IsIndexOutOfBound<[1], -1> // false
 *
 * type R = IsIndexOutOfBound<[1], 1> // true
 * type R = IsIndexOutOfBound<[1], -2> // true
 *
 * type R = IsIndexOutOfBound<[1], 1, { $then: 'yes'; $else: 'no' }> // 'yes'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep `N` when it is out of bound, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsIndexOutOfBound<[1], 1, { selection: 'filter' }> // 1
 * type R = IsIndexOutOfBound<[1], 0, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsIndexOutOfBound<[1], 1, IsIndexOutOfBound.$Branch> // $Then
 * type R = IsIndexOutOfBound<[1], 0, IsIndexOutOfBound.$Branch> // $Else
 * ```
 */
export type IsIndexOutOfBound<
	A extends readonly unknown[],
	N extends number,
	$O extends $StrictOptions<$O, IsIndexOutOfBound.$Options> = {},
> = IsNever<
	IndexAt<A, N, { $never: never; $emptyTuple: never; $upperBound: never; $lowerBound: never }>,
	{
		$then: $ResolveBranch<$O, [$Then], N>
		$else: $ResolveBranch<$O, [$Else]>
	}
>

export namespace IsIndexOutOfBound {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsIndexOutOfBound` as a type function, with `A` and its options `$O` applied.
	 *
	 * The function's input is the index being checked, so `A`, the array it indexes, is fixed up front.
	 * An input that is not a `number` resolves to the `$else` branch.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<ArrayPlus.IsIndexOutOfBound.$Fn<[1]>, 1> // true
	 * type R = $Fn.Apply<ArrayPlus.IsIndexOutOfBound.$Fn<[1]>, 0> // false
	 *
	 * type R = TuplePlus.Filter<[0, 1, -1, -2], ArrayPlus.IsIndexOutOfBound.$Fn<[1]>> // [1, -2]
	 * ```
	 */
	export interface $Fn<A extends readonly unknown[], $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: this['in'] extends number ? IsIndexOutOfBound<A, this['in'], $O> : $ResolveBranch<$O, [$Else]>
	}
}
