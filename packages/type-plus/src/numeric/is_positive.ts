import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is a positive numeric type (`number` or `bigint`).
 *
 * The sign is read off the literal, so `0` and `-0` are positive.
 *
 * `number` and `bigint` stand for both the positive and the negative literals,
 * so they resolve to `boolean`.
 * Special types are not numeric, so they resolve to `false`.
 *
 * @example
 * ```ts
 * type R = IsPositive<1> // true
 * type R = IsPositive<0> // true
 * type R = IsPositive<-0> // true
 * type R = IsPositive<1n> // true
 *
 * type R = IsPositive<-1> // false
 * type R = IsPositive<-1n> // false
 * type R = IsPositive<string> // false
 *
 * type R = IsPositive<number> // boolean
 * type R = IsPositive<bigint> // boolean
 *
 * type R = IsPositive<any> // false
 * type R = IsPositive<unknown> // false
 * type R = IsPositive<never> // false
 * type R = IsPositive<void> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a positive numeric type, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsPositive<1, { selection: 'filter' }> // 1
 * type R = IsPositive<-1, { selection: 'filter' }> // never
 * type R = IsPositive<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsPositive<1 | string> // boolean
 * type R = IsPositive<1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsPositive<1, IsPositive.$Branch> // $Then
 * type R = IsPositive<-1, IsPositive.$Branch> // $Else
 * ```
 */
export type IsPositive<T, $O extends IsPositive.$Options = {}> = IsBigint<
	T,
	{
		distributive: $O['distributive']
		$then: IsPositive._Positive<T, bigint, $O>
		$else: IsNumber<
			Exclude<T, bigint>,
			{
				distributive: $O['distributive']
				$then: IsPositive._Positive<T, number, $O>
				$else: $ResolveBranch<$O, [$Else]>
			}
		>
	}
>
export namespace IsPositive {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	export type _Positive<T, U extends number | bigint, $O extends IsPositive.$Options> = T extends U & infer R
		? `${T}` extends `-${string}`
			? $ResolveBranch<$O, [$Else]>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
				: [T, R] extends [R, T]
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
		: never
}
