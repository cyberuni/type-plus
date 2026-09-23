import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if specified type is a scalar literal.
 *
 * @example
 * ```ts
 * type R = IsLiteral<string> // false
 * type R = IsLiteral<number> // false
 * type R = IsLiteral<boolean> // false
 * type R = IsLiteral<bigint> // false
 * type R = IsLiteral<symbol> // false
 *
 * type R = IsLiteral<'a'> // true
 * type R = IsLiteral<1> // true
 * type R = IsLiteral<true> // true
 * type R = IsLiteral<1n> // true
 * type R = IsLiteral<typeof someSymbol> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a literal, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsLiteral<'a', { selection: 'filter' }> // 'a'
 * type R = IsLiteral<string, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Override the branches directly.
 *
 * @example
 * ```ts
 * type R = IsLiteral<'a', { $then: 'yes'; $else: 'no' }> // 'yes'
 * type R = IsLiteral<string, { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsLiteral<1, IsLiteral.$Branch> // $Then
 * type R = IsLiteral<number, IsLiteral.$Branch> // $Else
 * ```
 */
export type IsLiteral<
	T extends number | boolean | bigint | string | symbol,
	$O extends $StrictOptions<$O, IsLiteral.$Options> = {},
> = number extends T
	? $ResolveBranch<$O, [$Else]>
	: string extends T
		? $ResolveBranch<$O, [$Else]>
		: boolean extends T
			? $ResolveBranch<$O, [$Else]>
			: symbol extends T
				? $ResolveBranch<$O, [$Else]>
				: bigint extends T
					? $ResolveBranch<$O, [$Else]>
					: $ResolveBranch<$O, [$Then], T>

export namespace IsLiteral {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
