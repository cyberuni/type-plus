import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if specified type is not a scalar literal.
 *
 * The inverse of `IsLiteral`, with the same rules.
 *
 * @example
 * ```ts
 * type R = IsNotLiteral<string> // true
 * type R = IsNotLiteral<number> // true
 * type R = IsNotLiteral<boolean> // true
 * type R = IsNotLiteral<bigint> // true
 * type R = IsNotLiteral<symbol> // true
 *
 * type R = IsNotLiteral<'a'> // false
 * type R = IsNotLiteral<1> // false
 * type R = IsNotLiteral<true> // false
 * type R = IsNotLiteral<1n> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a literal, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotLiteral<string, { selection: 'filter' }> // string
 * type R = IsNotLiteral<'a', { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Override the branches directly.
 *
 * @example
 * ```ts
 * type R = IsNotLiteral<string, { $then: 'yes'; $else: 'no' }> // 'yes'
 * type R = IsNotLiteral<'a', { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotLiteral<number, IsNotLiteral.$Branch> // $Then
 * type R = IsNotLiteral<1, IsNotLiteral.$Branch> // $Else
 * ```
 */
export type IsNotLiteral<
	T extends number | boolean | bigint | string | symbol,
	$O extends $StrictOptions<$O, IsNotLiteral.$Options> = {},
> = number extends T
	? $ResolveBranch<$O, [$Then], T>
	: string extends T
		? $ResolveBranch<$O, [$Then], T>
		: boolean extends T
			? $ResolveBranch<$O, [$Then], T>
			: symbol extends T
				? $ResolveBranch<$O, [$Then], T>
				: bigint extends T
					? $ResolveBranch<$O, [$Then], T>
					: $ResolveBranch<$O, [$Else]>

export namespace IsNotLiteral {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
