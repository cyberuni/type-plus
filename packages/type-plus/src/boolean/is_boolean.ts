import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
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
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

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
	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options

	export type _SD<T, $O extends $Options> = IsBoolean._DistributeMap<T> extends infer R
		? ['aBcD' | 'AbCd' | 'abcd'] extends [R]
			? $ResolveBranch<$O, [$Then], boolean> | $ResolveBranch<$O, [$Else], Exclude<T, boolean>>
			: ['aBcD' | 'AbCd'] extends [R]
				? $ResolveBranch<$O, [$Then], T>
				: ['aBcd' | 'Abcd'] extends [R]
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Else]>
		: never

	export type _N<T, $O extends $Options> = [T] extends [boolean]
		? [T] extends [true]
			? $ResolveBranch<$O, [$Else]>
			: [T] extends [false]
				? $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>

	export type _DistributeMap<T> = T extends true
		? T extends false
			? true extends T
				? false extends T
					? 'ABCD'
					: 'ABCd'
				: false extends T
					? 'ABcD'
					: 'ABcd'
			: true extends T
				? false extends T
					? 'AbCD'
					: 'AbCd'
				: false extends T
					? 'AbcD'
					: 'Abcd'
		: T extends false
			? true extends T
				? false extends T
					? 'aBCD'
					: 'aBCd'
				: false extends T
					? 'aBcD'
					: 'aBcd'
			: true extends T
				? false extends T
					? 'abCD'
					: 'abCd'
				: false extends T
					? 'abcD'
					: 'abcd'
}
