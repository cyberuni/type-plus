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
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'
import type { _ExactNumeric } from './_numeric_exact.js'
import type { _IsNegativeSign } from './_numeric_sign.js'

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
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsPositive<1 & { a: 1 }> // true
 * type R = IsPositive<-1 & { a: 1 }> // false
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
 *
 * 🔢 *customize*
 *
 * Match only the wide `number` and `bigint` types, never a literal.
 *
 * The sign of the wide types is unknown, so they resolve to `boolean`.
 *
 * @example
 * ```ts
 * type R = IsPositive<number, { exact: true }> // boolean
 * type R = IsPositive<bigint, { exact: true }> // boolean
 * type R = IsPositive<1, { exact: true }> // false
 * type R = IsPositive<-1, { exact: true }> // false
 * type R = IsPositive<1n, { exact: true }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsPositive<any, { $any: 1 }> // 1
 * type R = IsPositive<unknown, { $unknown: 2 }> // 2
 * type R = IsPositive<never, { $never: 3 }> // 3
 * type R = IsPositive<void, { $void: 4 }> // 4
 * ```
 */
export type IsPositive<T, $O extends $StrictOptions<$O, IsPositive.$Options> = {}> = [
	Extract<keyof $O, '$any' | '$unknown' | '$never' | '$void'>,
] extends [never]
	? IsPositive._<T, $O>
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any], IsPositive._<T, $O>>
				$unknown: $ResolveBranch<$O, [$Unknown], IsPositive._<T, $O>>
				$never: $ResolveBranch<$O, [$Never], IsPositive._<T, $O>>
				$void: $ResolveBranch<$O, [$Void], IsPositive._<T, $O>>
				$else: IsPositive._<T, $O>
			}
		>

export namespace IsPositive {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * `IsPositive` without the special-type overrides.
	 */
	export type _<T, $O extends IsPositive.$Options> = $ResolveOptions<[$O['exact'], false]> extends true
		? _ExactNumeric<T, $O, 'both', 'both', 'else'>
		: IsBigint<
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

	export type _Positive<T, U extends number | bigint, $O extends IsPositive.$Options> = T extends U & infer R
		? _IsNegativeSign<T> extends true
			? $ResolveBranch<$O, [$Else]>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
				: [T, R] extends [R, T]
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
		: never
}
