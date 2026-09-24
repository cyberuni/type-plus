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
 * Validate if `T` is not a negative numeric literal (`number` or `bigint`).
 *
 * The negation of {@link IsNegativeLiteral}: everything that is not a negative numeric
 * literal passes, including the wide `number` and `bigint` types, non-numeric types and the
 * special types.
 *
 * The sign is read off the literal, so `0` and `-0` are not negative and pass.
 *
 * @example
 * ```ts
 * type R = IsNotNegativeLiteral<0> // true
 * type R = IsNotNegativeLiteral<1> // true
 * type R = IsNotNegativeLiteral<1n> // true
 * type R = IsNotNegativeLiteral<number> // true
 * type R = IsNotNegativeLiteral<bigint> // true
 * type R = IsNotNegativeLiteral<string> // true
 *
 * type R = IsNotNegativeLiteral<-1> // false
 * type R = IsNotNegativeLiteral<-1.1> // false
 * type R = IsNotNegativeLiteral<-1n> // false
 *
 * type R = IsNotNegativeLiteral<any> // true
 * type R = IsNotNegativeLiteral<unknown> // true
 * type R = IsNotNegativeLiteral<never> // true
 * type R = IsNotNegativeLiteral<void> // true
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsNotNegativeLiteral<1 & { a: 1 }> // true
 * type R = IsNotNegativeLiteral<number & { a: 1 }> // true
 * type R = IsNotNegativeLiteral<-1 & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep only the matching part of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNegativeLiteral<1, { selection: 'filter' }> // 1
 * type R = IsNotNegativeLiteral<-1, { selection: 'filter' }> // never
 * type R = IsNotNegativeLiteral<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNegativeLiteral<-1 | string> // boolean
 * type R = IsNotNegativeLiteral<-1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNegativeLiteral<1, IsNotNegativeLiteral.$Branch> // $Then
 * type R = IsNotNegativeLiteral<-1, IsNotNegativeLiteral.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNotNegativeLiteral<any, { $any: 1 }> // 1
 * type R = IsNotNegativeLiteral<unknown, { $unknown: 2 }> // 2
 * type R = IsNotNegativeLiteral<never, { $never: 3 }> // 3
 * type R = IsNotNegativeLiteral<void, { $void: 4 }> // 4
 * ```
 */
export type IsNotNegativeLiteral<T, $O extends $StrictOptions<$O, IsNotNegativeLiteral.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotNegativeLiteral.$<T, $O>
		}
	>
>

export namespace IsNotNegativeLiteral {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotNegativeLiteral` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsNegativeLiteral.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotNegativeLiteral.$Fn, number> // true
	 * type R = $Fn.Apply<IsNotNegativeLiteral.$Fn, -1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotNegativeLiteral<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not a negative numeric literal (`number` or `bigint`).
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
}

type $UtilOptions = $Selection.Options & $Distributive.Options

/**
 * `T extends bigint & infer U` binds `U` to what the intersection did not account for: the wide
 * `bigint` leaves `unknown`, a literal leaves the literal, and `bigint & { a: 1 }` leaves the
 * record. So `[U] extends [bigint]` is the literal test, and an intersection is classified by
 * its numeric constituent — `1n & { a: 1 }` is a literal, `bigint & { a: 1 }` is not.
 */
type _D<T, $O extends $Selection.Options> = T extends bigint & infer U
	? [U] extends [bigint]
		? _L<T, $O>
		: $ResolveBranch<$O, [$Then], T>
	: T extends number & infer U
		? [U] extends [number]
			? _L<T, $O>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Then], T>

type _N<T, $O extends $Selection.Options> = [T] extends [bigint & infer U]
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
type _L<T, $O extends $Selection.Options> = T extends unknown
	? _IsNegativeSign<T> extends true
		? $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Then], T>
	: never
