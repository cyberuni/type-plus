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
import type { _IsFraction } from './_numeric_fraction.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is an integer literal, `bigint` literals included.
 *
 * Only literals match. `bigint` itself is an integer but not a literal, so it resolves to
 * `false` here while {@link IsInteger} resolves it to `true`; the wide `number` resolves to
 * `false` here and to `boolean` there.
 *
 * Every `bigint` literal is whole. A `number` literal is inspected for a fractional part.
 * Special types are not numeric, so they resolve to `false`.
 *
 * @example
 * ```ts
 * type R = IsIntegerLiteral<0> // true
 * type R = IsIntegerLiteral<-1> // true
 * type R = IsIntegerLiteral<1n> // true
 *
 * type R = IsIntegerLiteral<1.1> // false
 * type R = IsIntegerLiteral<bigint> // false
 * type R = IsIntegerLiteral<number> // false
 * type R = IsIntegerLiteral<string> // false
 *
 * type R = IsIntegerLiteral<any> // false
 * type R = IsIntegerLiteral<unknown> // false
 * type R = IsIntegerLiteral<never> // false
 * type R = IsIntegerLiteral<void> // false
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsIntegerLiteral<1 & { a: 1 }> // true
 * type R = IsIntegerLiteral<1.1 & { a: 1 }> // false
 * type R = IsIntegerLiteral<number & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep only the matching part of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsIntegerLiteral<1, { selection: 'filter' }> // 1
 * type R = IsIntegerLiteral<1.1, { selection: 'filter' }> // never
 * type R = IsIntegerLiteral<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsIntegerLiteral<1 | string> // boolean
 * type R = IsIntegerLiteral<1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsIntegerLiteral<1, IsIntegerLiteral.$Branch> // $Then
 * type R = IsIntegerLiteral<1.1, IsIntegerLiteral.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsIntegerLiteral<any, { $any: 1 }> // 1
 * type R = IsIntegerLiteral<unknown, { $unknown: 2 }> // 2
 * type R = IsIntegerLiteral<never, { $never: 3 }> // 3
 * type R = IsIntegerLiteral<void, { $void: 4 }> // 4
 * ```
 */
export type IsIntegerLiteral<T, $O extends $StrictOptions<$O, IsIntegerLiteral.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsIntegerLiteral.$<T, $O>
		}
	>
>

export namespace IsIntegerLiteral {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsIntegerLiteral` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsIntegerLiteral.$Fn, 1> // true
	 * type R = $Fn.Apply<IsIntegerLiteral.$Fn, number> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsIntegerLiteral<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is an integer literal, `bigint` literals included.
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
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: T extends number & infer U
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Else]>

	export type _N<T, $O extends $Selection.Options> = [T] extends [bigint & infer U]
		? [U] extends [bigint]
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: [T] extends [number & infer U]
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Else]>

	/**
	 * The answer for a `number` literal, read off its fractional part.
	 */
	export type _L<T, $O extends $Selection.Options> = T extends unknown
		? _IsFraction<T> extends true
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: never
}
