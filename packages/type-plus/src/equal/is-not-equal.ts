import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsEqual } from './is-equal.js'

/**
 * 🎭 *predicate*
 *
 * Validate `A` and `B` are not equal.
 *
 * The inverse of `IsEqual`, with the same rules.
 *
 * @example
 * ```ts
 * type R = IsNotEqual<1, 1> // false
 * type R = IsNotEqual<any, any> // false
 * type R = IsNotEqual<[1], [1]> // false
 *
 * type R = IsNotEqual<boolean, true> // true
 * type R = IsNotEqual<any, 1> // true
 * type R = IsNotEqual<{ a: 1 }, { a: 1; b: 2 }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `A` does not equal `B`, otherwise returns `never`.
 * The filter keeps `A`, the input being checked.
 *
 * @example
 * ```ts
 * type R = IsNotEqual<1, number, { selection: 'filter' }> // 1
 * type R = IsNotEqual<1, 1, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotEqual<1, 2, IsNotEqual.$Branch> // $Then
 * type R = IsNotEqual<1, 1, IsNotEqual.$Branch> // $Else
 * ```
 */
export type IsNotEqual<A, B, $O extends $StrictOptions<$O, IsNotEqual.$Options> = {}> = IsEqual<
	A,
	B,
	{
		$then: $ResolveBranch<$O, [$Else]>
		$else: $ResolveBranch<$O, [$Then], A>
	}
>

export namespace IsNotEqual {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotEqual` as a type function, with `B` and its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotEqual.$Fn<1>, number> // true
	 * type R = $Fn.Apply<IsNotEqual.$Fn<1>, 1> // false
	 *
	 * type R = TuplePlus.Filter<[1, number, 1], IsNotEqual.$Fn<1>> // [number]
	 * ```
	 */
	export interface $Fn<B, $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotEqual<this['in'], B, $O>
	}
}
