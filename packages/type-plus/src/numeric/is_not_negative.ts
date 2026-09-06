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
 * Validate if `T` is not a negative numeric type (`number` or `bigint`).
 *
 * The sign is read off the literal, so `0` and `-0` are not negative.
 *
 * `number` and `bigint` stand for both the positive and the negative literals,
 * so they resolve to `boolean`.
 * Everything that is not a negative numeric type resolves to `true`,
 * including the special types.
 *
 * @example
 * ```ts
 * type R = IsNotNegative<1> // true
 * type R = IsNotNegative<0> // true
 * type R = IsNotNegative<-0> // true
 * type R = IsNotNegative<1n> // true
 * type R = IsNotNegative<string> // true
 *
 * type R = IsNotNegative<-1> // false
 * type R = IsNotNegative<-1n> // false
 *
 * type R = IsNotNegative<number> // boolean
 * type R = IsNotNegative<bigint> // boolean
 *
 * type R = IsNotNegative<any> // true
 * type R = IsNotNegative<unknown> // true
 * type R = IsNotNegative<never> // true
 * type R = IsNotNegative<void> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a negative numeric type, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNegative<1, { selection: 'filter' }> // 1
 * type R = IsNotNegative<string, { selection: 'filter' }> // string
 * type R = IsNotNegative<-1, { selection: 'filter' }> // never
 * type R = IsNotNegative<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNegative<-1 | string> // boolean
 * type R = IsNotNegative<-1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNegative<1, IsNotNegative.$Branch> // $Then
 * type R = IsNotNegative<-1, IsNotNegative.$Branch> // $Else
 * ```
 */
export type IsNotNegative<T, $O extends IsNotNegative.$Options = {}> = IsBigint<
	T,
	{
		distributive: $O['distributive']
		$then: $Then
		$else: $Else
	}
> extends infer R
	? R extends $Then
		? IsNotNegative._Negative<T, bigint, $O>
		: IsNumber<
				Exclude<T, bigint>,
				{
					distributive: $O['distributive']
					$then: IsNotNegative._Negative<T, number, $O>
					$else: $ResolveBranch<$O, [$Then], Exclude<T, number | bigint>>
				}
			>
	: never

export namespace IsNotNegative {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
	export type _Negative<T, U extends number | bigint, $O extends IsNotNegative.$Options> = T extends U
		? `${T}` extends `-${string}`
			? $ResolveBranch<$O, [$Else]>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Then], T>
		: never
}
