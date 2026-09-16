import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
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
 * Validate if `T` is a positive numeric literal (`number` or `bigint`).
 *
 * Only literals match. The wide `number` and `bigint` types stand for the positive and the
 * negative literals at once, so they are not positive literals and resolve to `false`,
 * unlike {@link IsPositive}, which resolves them to `boolean`.
 *
 * The sign is read off the literal, so `0` and `-0` are positive.
 * Special types are not numeric, so they resolve to `false`.
 *
 * @example
 * ```ts
 * type R = IsPositiveLiteral<1> // true
 * type R = IsPositiveLiteral<0> // true
 * type R = IsPositiveLiteral<-0> // true
 * type R = IsPositiveLiteral<1n> // true
 *
 * type R = IsPositiveLiteral<-1> // false
 * type R = IsPositiveLiteral<-1n> // false
 * type R = IsPositiveLiteral<number> // false
 * type R = IsPositiveLiteral<bigint> // false
 * type R = IsPositiveLiteral<string> // false
 *
 * type R = IsPositiveLiteral<any> // false
 * type R = IsPositiveLiteral<unknown> // false
 * type R = IsPositiveLiteral<never> // false
 * type R = IsPositiveLiteral<void> // false
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsPositiveLiteral<1 & { a: 1 }> // true
 * type R = IsPositiveLiteral<-1 & { a: 1 }> // false
 * type R = IsPositiveLiteral<number & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep only the matching part of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsPositiveLiteral<1, { selection: 'filter' }> // 1
 * type R = IsPositiveLiteral<-1, { selection: 'filter' }> // never
 * type R = IsPositiveLiteral<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsPositiveLiteral<1 | string> // boolean
 * type R = IsPositiveLiteral<1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsPositiveLiteral<1, IsPositiveLiteral.$Branch> // $Then
 * type R = IsPositiveLiteral<number, IsPositiveLiteral.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsPositiveLiteral<any, { $any: 1 }> // 1
 * type R = IsPositiveLiteral<unknown, { $unknown: 2 }> // 2
 * type R = IsPositiveLiteral<never, { $never: 3 }> // 3
 * type R = IsPositiveLiteral<void, { $void: 4 }> // 4
 * ```
 */
export type IsPositiveLiteral<T, $O extends $StrictOptions<$O, IsPositiveLiteral.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsPositiveLiteral.$<T, $O>
		}
	>
>

export namespace IsPositiveLiteral {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is a positive numeric literal (`number` or `bigint`).
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
			: $ResolveBranch<$O, [$Else]>
		: T extends number & infer U
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Else]>

	export type _N<T, $O extends $Selection.Options> = [T] extends [bigint & infer U]
		? [U] extends [bigint]
			? _L<T, $O>
			: $ResolveBranch<$O, [$Else]>
		: [T] extends [number & infer U]
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Else]>

	/**
	 * The answer for a numeric literal, read off its sign.
	 */
	export type _L<T, $O extends $Selection.Options> = T extends unknown
		? _IsNegativeSign<T> extends true
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: never
}
