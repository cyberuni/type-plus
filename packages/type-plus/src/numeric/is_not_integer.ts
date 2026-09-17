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

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not an integer, `bigint` included.
 *
 * Every `bigint` is an integer, so `bigint` itself resolves to `false`.
 * The wide `number` type resolves to `boolean`, because it contains both
 * integers and non-integers.
 * Everything that is not an integer resolves to `true`,
 * including the special types.
 *
 * @example
 * ```ts
 * type R = IsNotInteger<1.1> // true
 * type R = IsNotInteger<string> // true
 *
 * type R = IsNotInteger<0> // false
 * type R = IsNotInteger<1n> // false
 * type R = IsNotInteger<bigint> // false
 *
 * type R = IsNotInteger<number> // boolean
 *
 * type R = IsNotInteger<any> // true
 * type R = IsNotInteger<unknown> // true
 * type R = IsNotInteger<never> // true
 * type R = IsNotInteger<void> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not an integer, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotInteger<1.1, { selection: 'filter' }> // 1.1
 * type R = IsNotInteger<string, { selection: 'filter' }> // string
 * type R = IsNotInteger<1, { selection: 'filter' }> // never
 * type R = IsNotInteger<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotInteger<1 | string> // boolean
 * type R = IsNotInteger<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotInteger<1.1, IsNotInteger.$Branch> // $Then
 * type R = IsNotInteger<1, IsNotInteger.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Match only the wide `number` and `bigint` types, never a literal.
 *
 * The negation of `IsInteger<T, { exact: true }>`, so every literal passes and
 * `bigint` still resolves to `false`.
 *
 * @example
 * ```ts
 * type R = IsNotInteger<number, { exact: true }> // boolean
 * type R = IsNotInteger<bigint, { exact: true }> // false
 * type R = IsNotInteger<1, { exact: true }> // true
 * type R = IsNotInteger<1.1, { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNotInteger<any, { $any: 1 }> // 1
 * type R = IsNotInteger<unknown, { $unknown: 2 }> // 2
 * type R = IsNotInteger<never, { $never: 3 }> // 3
 * type R = IsNotInteger<void, { $void: 4 }> // 4
 * ```
 */
export type IsNotInteger<T, $O extends $StrictOptions<$O, IsNotInteger.$Options> = {}> = [
	Extract<keyof $O, '$any' | '$unknown' | '$never' | '$void'>,
] extends [never]
	? IsNotInteger._<T, $O>
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any], IsNotInteger._<T, $O>>
				$unknown: $ResolveBranch<$O, [$Unknown], IsNotInteger._<T, $O>>
				$never: $ResolveBranch<$O, [$Never], IsNotInteger._<T, $O>>
				$void: $ResolveBranch<$O, [$Void], IsNotInteger._<T, $O>>
				$else: IsNotInteger._<T, $O>
			}
		>

export namespace IsNotInteger {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotInteger` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsInteger.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotInteger.$Fn, 1.5> // true
	 * type R = $Fn.Apply<IsNotInteger.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotInteger<this['in'], $O>
	}

	/**
	 * `IsNotInteger` without the special-type overrides.
	 */
	export type _<T, $O extends IsNotInteger.$Options> = $ResolveOptions<[$O['exact'], false]> extends true
		? _ExactNumeric<T, $O, 'both', 'else', 'then'>
		: IsNumber<
					T,
					{
						distributive: $O['distributive']
						$then: $Then
						$else: $Else
					}
				> extends infer R
			? R extends $Then
				? number extends T
					? $ResolveBranch<$O, [$Then], T> | $ResolveBranch<$O, [$Else]>
					: T extends number
						? `${T}` extends `${number}.${number}`
							? $ResolveBranch<$O, [$Then], T>
							: $ResolveBranch<$O, [$Else]>
						: never
				: R extends $Else
					? IsBigint<
							T,
							{
								distributive: $O['distributive']
								$then: $Then
								$else: $Else
							}
						> extends infer R
						? R extends $Then
							? $ResolveBranch<$O, [$Else]>
							: $ResolveBranch<$O, [$Then], Exclude<T, number>>
						: never
					: never
			: never
}
