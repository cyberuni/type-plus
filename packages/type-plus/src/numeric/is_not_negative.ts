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
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsNotNegative<1 & { a: 1 }> // true
 * type R = IsNotNegative<-1 & { a: 1 }> // false
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
 *
 * 🔢 *customize*
 *
 * Match only the wide `number` and `bigint` types, never a literal.
 *
 * The negation of `IsNegative<T, { exact: true }>`, so every literal passes.
 *
 * @example
 * ```ts
 * type R = IsNotNegative<number, { exact: true }> // boolean
 * type R = IsNotNegative<bigint, { exact: true }> // boolean
 * type R = IsNotNegative<1, { exact: true }> // true
 * type R = IsNotNegative<-1, { exact: true }> // true
 * type R = IsNotNegative<string, { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNotNegative<any, { $any: 1 }> // 1
 * type R = IsNotNegative<unknown, { $unknown: 2 }> // 2
 * type R = IsNotNegative<never, { $never: 3 }> // 3
 * type R = IsNotNegative<void, { $void: 4 }> // 4
 * ```
 */
export type IsNotNegative<T, $O extends $StrictOptions<$O, IsNotNegative.$Options> = {}> = [
	Extract<keyof $O, '$any' | '$unknown' | '$never' | '$void'>,
] extends [never]
	? _IsNotNegative<T, $O>
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any], _IsNotNegative<T, $O>>
				$unknown: $ResolveBranch<$O, [$Unknown], _IsNotNegative<T, $O>>
				$never: $ResolveBranch<$O, [$Never], _IsNotNegative<T, $O>>
				$void: $ResolveBranch<$O, [$Void], _IsNotNegative<T, $O>>
				$else: _IsNotNegative<T, $O>
			}
		>

export namespace IsNotNegative {
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
	 * `IsNotNegative` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsNegative.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotNegative.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotNegative.$Fn, -1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotNegative<this['in'], $O>
	}
}

/**
 * `IsNotNegative` without the special-type overrides.
 */
type _IsNotNegative<T, $O extends IsNotNegative.$Options> = $ResolveOptions<[$O['exact'], false]> extends true
	? _ExactNumeric<T, $O, 'both', 'both', 'then'>
	: IsBigint<
				T,
				{
					distributive: $O['distributive']
					$then: $Then
					$else: $Else
				}
			> extends infer R
		? R extends $Then
			? _Negative<T, bigint, $O>
			: IsNumber<
					Exclude<T, bigint>,
					{
						distributive: $O['distributive']
						$then: _Negative<T, number, $O>
						$else: $ResolveBranch<$O, [$Then], Exclude<T, number | bigint>>
					}
				>
		: never

type _Negative<T, U extends number | bigint, $O extends IsNotNegative.$Options> = T extends U
	? _IsNegativeSign<T> extends true
		? $ResolveBranch<$O, [$Else]>
		: U extends T
			? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
	: never
