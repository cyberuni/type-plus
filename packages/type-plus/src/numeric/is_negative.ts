import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
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
 * Validate if `T` is a negative numeric type (`number` or `bigint`).
 *
 * The sign is read off the literal, so `0` and `-0` are not negative.
 *
 * `number` and `bigint` stand for both the positive and the negative literals,
 * so they resolve to `boolean`.
 * Special types are not numeric, so they resolve to `false`.
 *
 * @example
 * ```ts
 * type R = IsNegative<-1> // true
 * type R = IsNegative<-1.1> // true
 * type R = IsNegative<-1n> // true
 *
 * type R = IsNegative<0> // false
 * type R = IsNegative<-0> // false
 * type R = IsNegative<1> // false
 * type R = IsNegative<1n> // false
 * type R = IsNegative<string> // false
 *
 * type R = IsNegative<number> // boolean
 * type R = IsNegative<bigint> // boolean
 *
 * type R = IsNegative<any> // false
 * type R = IsNegative<unknown> // false
 * type R = IsNegative<never> // false
 * type R = IsNegative<void> // false
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsNegative<-1 & { a: 1 }> // true
 * type R = IsNegative<1 & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a negative numeric type, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNegative<-1, { selection: 'filter' }> // -1
 * type R = IsNegative<1, { selection: 'filter' }> // never
 * type R = IsNegative<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNegative<-1 | string> // boolean
 * type R = IsNegative<-1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNegative<-1, IsNegative.$Branch> // $Then
 * type R = IsNegative<1, IsNegative.$Branch> // $Else
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
 * type R = IsNegative<number, { exact: true }> // boolean
 * type R = IsNegative<bigint, { exact: true }> // boolean
 * type R = IsNegative<-1, { exact: true }> // false
 * type R = IsNegative<1, { exact: true }> // false
 * type R = IsNegative<-1n, { exact: true }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNegative<any, { $any: 1 }> // 1
 * type R = IsNegative<unknown, { $unknown: 2 }> // 2
 * type R = IsNegative<never, { $never: 3 }> // 3
 * type R = IsNegative<void, { $void: 4 }> // 4
 * ```
 */
export type IsNegative<T, $O extends $StrictOptions<$O, IsNegative.$Options> = {}> = [
	Extract<keyof $O, '$any' | '$unknown' | '$never' | '$void'>,
] extends [never]
	? IsNegative._<T, $O>
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any], IsNegative._<T, $O>>
				$unknown: $ResolveBranch<$O, [$Unknown], IsNegative._<T, $O>>
				$never: $ResolveBranch<$O, [$Never], IsNegative._<T, $O>>
				$void: $ResolveBranch<$O, [$Void], IsNegative._<T, $O>>
				$else: IsNegative._<T, $O>
			}
		>

export namespace IsNegative {
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
	 * `IsNegative` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNegative.$Fn, -1> // true
	 * type R = $Fn.Apply<IsNegative.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNegative<this['in'], $O>
	}

	/**
	 * `IsNegative` without the special-type overrides.
	 */
	export type _<T, $O extends IsNegative.$Options> = $ResolveOptions<[$O['exact'], false]> extends true
		? _ExactNumeric<T, $O, 'both', 'both', 'else'>
		: IsBigint<
				T,
				{
					distributive: $O['distributive']
					$then: IsNegative._Negative<T, bigint, $O>
					$else: IsNumber<
						Exclude<T, bigint>,
						{
							distributive: $O['distributive']
							$then: IsNegative._Negative<T, number, $O>
							$else: $ResolveBranch<$O, [$Else]>
						}
					>
				}
			>

	export type _Negative<T, U extends number | bigint, $O extends IsNegative.$Options> = T extends U & infer R
		? _IsNegativeSign<T> extends true
			? $ResolveBranch<$O, [$Then], T>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
				: [T, R] extends [R, T]
					? $ResolveBranch<$O, [$Else]>
					: $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
		: never
}
