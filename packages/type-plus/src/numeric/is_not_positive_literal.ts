import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { _IsNegativeSign } from './_numeric_sign.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not a positive numeric literal (`number` or `bigint`).
 *
 * The negation of {@link IsPositiveLiteral}: everything that is not a positive numeric
 * literal passes, including the wide `number` and `bigint` types, non-numeric types and the
 * special types.
 *
 * The sign is read off the literal, so `0` and `-0` are positive and do not pass.
 *
 * @example
 * ```ts
 * type R = IsNotPositiveLiteral<-1> // true
 * type R = IsNotPositiveLiteral<-1n> // true
 * type R = IsNotPositiveLiteral<number> // true
 * type R = IsNotPositiveLiteral<bigint> // true
 * type R = IsNotPositiveLiteral<string> // true
 *
 * type R = IsNotPositiveLiteral<1> // false
 * type R = IsNotPositiveLiteral<0> // false
 * type R = IsNotPositiveLiteral<1n> // false
 *
 * type R = IsNotPositiveLiteral<any> // true
 * type R = IsNotPositiveLiteral<unknown> // true
 * type R = IsNotPositiveLiteral<never> // true
 * type R = IsNotPositiveLiteral<void> // true
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsNotPositiveLiteral<-1 & { a: 1 }> // true
 * type R = IsNotPositiveLiteral<number & { a: 1 }> // true
 * type R = IsNotPositiveLiteral<1 & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep only the matching part of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotPositiveLiteral<-1, { selection: 'filter' }> // -1
 * type R = IsNotPositiveLiteral<1, { selection: 'filter' }> // never
 * type R = IsNotPositiveLiteral<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotPositiveLiteral<1 | string> // boolean
 * type R = IsNotPositiveLiteral<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotPositiveLiteral<-1, IsNotPositiveLiteral.$Branch> // $Then
 * type R = IsNotPositiveLiteral<1, IsNotPositiveLiteral.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNotPositiveLiteral<any, { $any: 1 }> // 1
 * type R = IsNotPositiveLiteral<unknown, { $unknown: 2 }> // 2
 * type R = IsNotPositiveLiteral<never, { $never: 3 }> // 3
 * type R = IsNotPositiveLiteral<void, { $void: 4 }> // 4
 * ```
 */
export type IsNotPositiveLiteral<T, $O extends $StrictOptions<$O, IsNotPositiveLiteral.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotPositiveLiteral.$<T, $O>
		}
	>
>

export namespace IsNotPositiveLiteral {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotPositiveLiteral` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsPositiveLiteral.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotPositiveLiteral.$Fn, number> // true
	 * type R = $Fn.Apply<IsNotPositiveLiteral.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotPositiveLiteral<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not a positive numeric literal (`number` or `bigint`).
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>

	export type $UtilOptions = $Selection.Options & $Distributive.Options

	/**
	 * `T extends bigint & infer U` binds `U` to what the intersection did not account for: the wide
	 * `bigint` leaves `unknown`, a literal leaves the literal, and `bigint & { a: 1 }` leaves the
	 * record. So `[U] extends [bigint]` is the literal test, and an intersection is classified by
	 * its numeric constituent — `1n & { a: 1 }` is a literal, `bigint & { a: 1 }` is not.
	 */
	export type _D<T, $O extends $Selection.Options> = T extends bigint & infer U
		? [U] extends [bigint]
			? _L<T, $O>
			: $ResolveBranch<$O, [$Then], T>
		: T extends number & infer U
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Then], T>

	export type _N<T, $O extends $Selection.Options> = [T] extends [bigint & infer U]
		? [U] extends [bigint]
			? _L<T, $O>
			: $ResolveBranch<$O, [$Then], T>
		: [T] extends [number & infer U]
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Then], T>

	/**
	 * The answer for a numeric literal, read off its sign.
	 */
	export type _L<T, $O extends $Selection.Options> = T extends unknown
		? _IsNegativeSign<T> extends true
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: never
}
