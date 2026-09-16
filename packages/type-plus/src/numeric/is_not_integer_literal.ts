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
import type { _IsFraction } from './_numeric_fraction.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not an integer literal, `bigint` literals included.
 *
 * The negation of {@link IsIntegerLiteral}: everything that is not an integer literal
 * passes, including the wide `number` and `bigint` types, non-numeric types and the special
 * types.
 *
 * Every `bigint` literal is whole, so no `bigint` literal passes.
 *
 * @example
 * ```ts
 * type R = IsNotIntegerLiteral<1.1> // true
 * type R = IsNotIntegerLiteral<number> // true
 * type R = IsNotIntegerLiteral<bigint> // true
 * type R = IsNotIntegerLiteral<string> // true
 *
 * type R = IsNotIntegerLiteral<0> // false
 * type R = IsNotIntegerLiteral<-1> // false
 * type R = IsNotIntegerLiteral<1n> // false
 *
 * type R = IsNotIntegerLiteral<any> // true
 * type R = IsNotIntegerLiteral<unknown> // true
 * type R = IsNotIntegerLiteral<never> // true
 * type R = IsNotIntegerLiteral<void> // true
 * ```
 *
 * An intersection with a record is classified by its numeric constituent.
 *
 * @example
 * ```ts
 * type R = IsNotIntegerLiteral<1.1 & { a: 1 }> // true
 * type R = IsNotIntegerLiteral<number & { a: 1 }> // true
 * type R = IsNotIntegerLiteral<1 & { a: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep only the matching part of `T`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotIntegerLiteral<1.1, { selection: 'filter' }> // 1.1
 * type R = IsNotIntegerLiteral<1, { selection: 'filter' }> // never
 * type R = IsNotIntegerLiteral<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotIntegerLiteral<1 | string> // boolean
 * type R = IsNotIntegerLiteral<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotIntegerLiteral<1.1, IsNotIntegerLiteral.$Branch> // $Then
 * type R = IsNotIntegerLiteral<1, IsNotIntegerLiteral.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsNotIntegerLiteral<any, { $any: 1 }> // 1
 * type R = IsNotIntegerLiteral<unknown, { $unknown: 2 }> // 2
 * type R = IsNotIntegerLiteral<never, { $never: 3 }> // 3
 * type R = IsNotIntegerLiteral<void, { $void: 4 }> // 4
 * ```
 */
export type IsNotIntegerLiteral<T, $O extends $StrictOptions<$O, IsNotIntegerLiteral.$Options> = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotIntegerLiteral.$<T, $O>
		}
	>
>

export namespace IsNotIntegerLiteral {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not an integer literal, `bigint` literals included.
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
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: T extends number & infer U
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Then], T>

	export type _N<T, $O extends $Selection.Options> = [T] extends [bigint & infer U]
		? [U] extends [bigint]
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: [T] extends [number & infer U]
			? [U] extends [number]
				? _L<T, $O>
				: $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Then], T>

	/**
	 * The answer for a `number` literal, read off its fractional part.
	 */
	export type _L<T, $O extends $Selection.Options> = T extends unknown
		? _IsFraction<T> extends true
			? $ResolveBranch<$O, [$Then], T>
			: $ResolveBranch<$O, [$Else]>
		: never
}
