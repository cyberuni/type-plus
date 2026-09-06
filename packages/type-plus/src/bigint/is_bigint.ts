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
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `bigint` or `bigint` literals.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint> // true
 * type R = IsBigint<1n> // true
 *
 * type R = IsBigint<never> // false
 * type R = IsBigint<unknown> // false
 * type R = IsBigint<string | boolean> // false
 *
 * type R = IsBigint<string | bigint> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `bigint` or `bigint` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint, { selection: 'filter' }> // bigint
 * type R = IsBigint<1n, { selection: 'filter' }> // 1n
 *
 * type R = IsBigint<never, { selection: 'filter' }> // never
 * type R = IsBigint<unknown, { selection: 'filter' }> // never
 * type R = IsBigint<string | boolean, { selection: 'filter' }> // never
 *
 * type R = IsBigint<string | bigint, { selection: 'filter' }> // bigint
 * ```
 *
 * 🔢 *customize*:
 *
 * Validate if `T` is exactly `bigint`.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint, { exact: true }> // true
 * type R = IsBigint<1n, { exact: true }> // false
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsBigint<bigint | 1> // boolean
 * type R = IsBigint<bigint | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsBigint<bigint, IsBigint.$Branch> // $Then
 * type R = IsBigint<string, IsBigint.$Branch> // $Else
 * ```
 */
export type IsBigint<T, $O extends IsBigint.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsBigint.$<T, $O>
		}
	>
>

export namespace IsBigint {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `bigint` or `bigint` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $Exact.Default]> extends true
		? $Distributive.Parse<$O, { $then: _SD<T, $O>; $else: _SN<T, $O> }>
		: Assignable.$<T, bigint, $O>
	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options

	export type _SD<T, $O extends $Options> = T extends bigint & infer U
		? U extends bigint
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
	export type _SN<T, $O extends $Options> = [T] extends [bigint & infer U]
		? U extends bigint
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
}
