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
 * Validate if `T` is not a positive numeric type (`number` or `bigint`).
 *
 * The sign is read off the literal, so `0` and `-0` are positive,
 * meaning they are not matched by this type.
 *
 * `number` and `bigint` stand for both the positive and the negative literals,
 * so they resolve to `boolean`.
 * Everything that is not a positive numeric type resolves to `true`,
 * including the special types.
 *
 * @example
 * ```ts
 * type R = IsNotPositive<-1> // true
 * type R = IsNotPositive<-1n> // true
 * type R = IsNotPositive<string> // true
 *
 * type R = IsNotPositive<0> // false
 * type R = IsNotPositive<-0> // false
 * type R = IsNotPositive<1> // false
 * type R = IsNotPositive<1n> // false
 *
 * type R = IsNotPositive<number> // boolean
 * type R = IsNotPositive<bigint> // boolean
 *
 * type R = IsNotPositive<any> // true
 * type R = IsNotPositive<unknown> // true
 * type R = IsNotPositive<never> // true
 * type R = IsNotPositive<void> // true
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsNotPositive<-1 & { a: 1 }> // true
 * type R = IsNotPositive<1 & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a positive numeric type, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotPositive<-1, { selection: 'filter' }> // -1
 * type R = IsNotPositive<string, { selection: 'filter' }> // string
 * type R = IsNotPositive<1, { selection: 'filter' }> // never
 * type R = IsNotPositive<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotPositive<1 | string> // boolean
 * type R = IsNotPositive<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotPositive<-1, IsNotPositive.$Branch> // $Then
 * type R = IsNotPositive<1, IsNotPositive.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Match only the wide `number` and `bigint` types, never a literal.
 *
 * The negation of `IsPositive<T, { exact: true }>`, so every literal passes.
 *
 * @example
 * ```ts
 * type R = IsNotPositive<number, { exact: true }> // boolean
 * type R = IsNotPositive<bigint, { exact: true }> // boolean
 * type R = IsNotPositive<1, { exact: true }> // true
 * type R = IsNotPositive<-1, { exact: true }> // true
 * type R = IsNotPositive<string, { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNotPositive<any, { $any: 1 }> // 1
 * type R = IsNotPositive<unknown, { $unknown: 2 }> // 2
 * type R = IsNotPositive<never, { $never: 3 }> // 3
 * type R = IsNotPositive<void, { $void: 4 }> // 4
 * ```
 */
export type IsNotPositive<T, $O extends $StrictOptions<$O, IsNotPositive.$Options> = {}> = [
	Extract<keyof $O, '$any' | '$unknown' | '$never' | '$void'>,
] extends [never]
	? IsNotPositive._<T, $O>
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any], IsNotPositive._<T, $O>>
				$unknown: $ResolveBranch<$O, [$Unknown], IsNotPositive._<T, $O>>
				$never: $ResolveBranch<$O, [$Never], IsNotPositive._<T, $O>>
				$void: $ResolveBranch<$O, [$Void], IsNotPositive._<T, $O>>
				$else: IsNotPositive._<T, $O>
			}
		>

export namespace IsNotPositive {
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
	 * `IsNotPositive` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsPositive.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotPositive.$Fn, -1> // true
	 * type R = $Fn.Apply<IsNotPositive.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotPositive<this['in'], $O>
	}

	/**
	 * `IsNotPositive` without the special-type overrides.
	 */
	export type _<T, $O extends IsNotPositive.$Options> = $ResolveOptions<[$O['exact'], false]> extends true
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
				? IsNotPositive._Negative<T, bigint, $O>
				: IsNumber<Exclude<T, bigint>, { distributive: $O['distributive']; $then: $Then; $else: $Else }> extends infer R
					? R extends $Then
						? IsNotPositive._Negative<T, number, $O>
						: $ResolveBranch<$O, [$Then], Exclude<T, number | bigint>>
					: never
			: never

	export type _Negative<T, U extends number | bigint, $O extends IsNotPositive.$Options> = T extends U
		? _IsNegativeSign<T> extends true
			? $ResolveBranch<$O, [$Then], T>
			: U extends T
				? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Else]>
		: never
}
