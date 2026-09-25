import type { $ResolveOptions } from '../$type/$resolve-options.js'
import type { $InputOptions } from '../$type/branch/$input-options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge-options.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { Assignable } from '../predicates/assignable.js'
import type { _BooleanDistributeMap } from './_boolean-distribute-map.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `boolean`, including `true` and `false`.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean> // true
 * type R = IsBoolean<true> // true
 * type R = IsBoolean<false> // true
 *
 * type R = IsBoolean<number> // false
 * type R = IsBoolean<unknown> // false
 * type R = IsBoolean<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `boolean`, including `true` and `false`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean, { selection: 'filter' }> // boolean
 * type R = IsBoolean<true, { selection: 'filter' }> // true
 * type R = IsBoolean<false, { selection: 'filter' }> // true
 *
 * type R = IsBoolean<number, { selection: 'filter' }> // never
 * type R = IsBoolean<unknown, { selection: 'filter' }> // never
 * type R = IsBoolean<never, { selection: 'filter' }> // never
 * type R = IsBoolean<string | boolean, { selection: 'filter' }> // boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsBoolean<boolean | 1> // boolean
 * type R = IsBoolean<boolean | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsBoolean<boolean, IsBoolean.$Branch> // $Then
 * type R = IsBoolean<string, IsBoolean.$Branch> // $Else
 * ```
 */
export type IsBoolean<T, $O extends $StrictOptions<$O, IsBoolean.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsBoolean.$<T, $O>
		}
	>
>
export namespace IsBoolean {
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
	 * `IsBoolean` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsBoolean.$Fn, boolean> // true
	 * type R = $Fn.Apply<IsBoolean.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsBoolean<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `boolean` or `boolean` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $Exact.Default]> extends true
		? $Distributive.Parse<$O, { $then: _SD<T, $O>; $else: _N<T, $O> }>
		: Assignable.$<T, boolean, $O>
}

type $UtilOptions = $Selection.Options & $Distributive.Options & $Exact.Options

type _SD<T, $O extends IsBoolean.$Options> = _BooleanDistributeMap<T> extends infer R
	? ['aBcD' | 'AbCd' | 'abcd'] extends [R]
		? $ResolveBranch<$O, [$Then], boolean> | $ResolveBranch<$O, [$Else], Exclude<T, boolean>>
		: ['aBcD' | 'AbCd'] extends [R]
			? $ResolveBranch<$O, [$Then], T>
			: ['aBcd' | 'Abcd'] extends [R]
				? $ResolveBranch<$O, [$Then], T>
				: $ResolveBranch<$O, [$Else]>
	: never

type _N<T, $O extends IsBoolean.$Options> = [T] extends [boolean]
	? [T] extends [true]
		? $ResolveBranch<$O, [$Else]>
		: [T] extends [false]
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
	: $ResolveBranch<$O, [$Else]>
