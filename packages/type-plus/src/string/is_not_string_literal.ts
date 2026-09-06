import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'
import type { _StringType } from './_string_type.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not a string literal(s).
 *
 * @example
 * ```ts
 * type R = IsNotStringLiteral<string> // true
 * type R = IsNotStringLiteral<'a'> // false
 * type R = IsNotStringLiteral<`${number}`> // false
 *
 * type R = IsNotStringLiteral<never> // true
 * type R = IsNotStringLiteral<unknown> // true
 * type R = IsNotStringLiteral<'a' | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a string literal(s), otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotStringLiteral<string, { selection: 'filter' }> // string
 * type R = IsNotStringLiteral<'a', { selection: 'filter' }> // never
 *
 * type R = IsNotStringLiteral<never, { selection: 'filter' }> // never
 * type R = IsNotStringLiteral<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotStringLiteral<'a' | boolean, { selection: 'filter' }> // boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotStringLiteral<'abc' | 1> // boolean
 * type R = IsNotStringLiteral<'abc' | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*:
 *
 * Check if `T` is exactly not a string literal, excluding template literals.
 *
 * ```ts
 * type R = IsNotStringLiteral<`${number}`> // false
 * type R = IsNotStringLiteral<`${number}`, { exact: true }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotStringLiteral<'abc', IsNotStringLiteral.$Branch> // $Else
 * type R = IsNotStringLiteral<string, IsNotStringLiteral.$Branch> // $Then
 * ```
 */
export type IsNotStringLiteral<T, $O extends IsNotStringLiteral.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotStringLiteral.$<T, $O>
		}
	>
>

export namespace IsNotStringLiteral {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is string literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $Exact.Default]> extends true
		? $Distributive.Parse<$O, { $then: _ED<T, $O>; $else: _EN<T, $O> }>
		: $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>

	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options

	export type _ED<T, $O extends $Selection.Options> = T extends string ? _E<T, $O> : $ResolveBranch<$O, [$Then], T>

	export type _EN<T, $O extends $Selection.Options> = [T] extends [string] ? _E<T, $O> : $ResolveBranch<$O, [$Then], T>

	export type _E<T extends string, $O extends $Selection.Options> = T extends string
		? _StringType<T> extends infer R
			? R extends 'stringLiteral'
				? $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Then], T>
			: never
		: $ResolveBranch<$O, [$Then], T>

	export type _D<T, $O extends $Selection.Options> = T extends string & infer U
		? _U<T, U, $O>
		: $ResolveBranch<$O, [$Then], T>

	export type _N<T, $O extends $Selection.Options> = [T] extends [string & infer U]
		? _U<T, U, $O>
		: $ResolveBranch<$O, [$Then], T>

	export type _U<T, U, $O extends $Selection.Options> = U extends `${any}`
		? $ResolveBranch<$O, [$Else]>
		: U extends Uppercase<infer N>
			? _D<N, $O>
			: U extends Lowercase<infer N>
				? _D<N, $O>
				: $ResolveBranch<$O, [$Then], T>
}
