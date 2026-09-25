import type { $InputOptions } from '../$type/branch/$input-options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge-options.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { _IsNegativeSign } from './_numeric-sign.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is a negative numeric literal (`number` or `bigint`).
 *
 * Only literals match. The wide `number` and `bigint` types stand for the positive and the
 * negative literals at once, so they are not negative literals and resolve to `false`,
 * unlike {@link IsNegative}, which resolves them to `boolean`.
 *
 * The sign is read off the literal, so `0` and `-0` are not negative.
 * Special types are not numeric, so they resolve to `false`.
 *
 * @example
 * ```ts
 * type R = IsNegativeLiteral<-1> // true
 * type R = IsNegativeLiteral<-1.1> // true
 * type R = IsNegativeLiteral<-1n> // true
 *
 * type R = IsNegativeLiteral<0> // false
 * type R = IsNegativeLiteral<-0> // false
 * type R = IsNegativeLiteral<1> // false
 * type R = IsNegativeLiteral<number> // false
 * type R = IsNegativeLiteral<bigint> // false
 * type R = IsNegativeLiteral<string> // false
 *
 * type R = IsNegativeLiteral<any> // false
 * type R = IsNegativeLiteral<unknown> // false
 * type R = IsNegativeLiteral<never> // false
 * type R = IsNegativeLiteral<void> // false
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsNegativeLiteral<-1 & { a: 1 }> // true
 * type R = IsNegativeLiteral<1 & { a: 1 }> // false
 * type R = IsNegativeLiteral<number & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep only the matching part of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNegativeLiteral<-1, { selection: 'filter' }> // -1
 * type R = IsNegativeLiteral<1, { selection: 'filter' }> // never
 * type R = IsNegativeLiteral<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNegativeLiteral<-1 | string> // boolean
 * type R = IsNegativeLiteral<-1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNegativeLiteral<-1, IsNegativeLiteral.$Branch> // $Then
 * type R = IsNegativeLiteral<number, IsNegativeLiteral.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNegativeLiteral<any, { $any: 1 }> // 1
 * type R = IsNegativeLiteral<unknown, { $unknown: 2 }> // 2
 * type R = IsNegativeLiteral<never, { $never: 3 }> // 3
 * type R = IsNegativeLiteral<void, { $void: 4 }> // 4
 * ```
 */
export type IsNegativeLiteral<T, $O extends $StrictOptions<$O, IsNegativeLiteral.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsNegativeLiteral.$<T, $O>
		}
	>
>

export namespace IsNegativeLiteral {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNegativeLiteral` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNegativeLiteral.$Fn, -1> // true
	 * type R = $Fn.Apply<IsNegativeLiteral.$Fn, number> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNegativeLiteral<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is a negative numeric literal (`number` or `bigint`).
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
		: $ResolveBranch<$O, [$Else]>
	: T extends number & infer U
		? [U] extends [number]
			? _L<T, $O>
			: $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Else]>

type _N<T, $O extends $Selection.Options> = [T] extends [bigint & infer U]
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
type _L<T, $O extends $Selection.Options> = T extends unknown
	? _IsNegativeSign<T> extends true
		? $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
	: never
