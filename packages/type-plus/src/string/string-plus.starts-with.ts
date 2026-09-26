import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 *predicate*
 *
 * The type-level `String.prototype.startsWith`:
 * check if `Subject` starts with `Search`.
 *
 * An empty `Search` matches every string literal.
 * The wide `string` never starts with a literal, so it takes the `$else` branch.
 *
 * @example
 * ```ts
 * type R = StringPlus.StartsWith<'abc', 'ab'> // true
 * type R = StringPlus.StartsWith<'abc', 'bc'> // false
 * type R = StringPlus.StartsWith<'abc', ''> // true
 *
 * type R = StringPlus.StartsWith<'abc', 'bc', { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep `Subject` when it starts with `Search`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = StringPlus.StartsWith<'abc', 'ab', { selection: 'filter' }> // 'abc'
 * type R = StringPlus.StartsWith<'abc' | 'bcd', 'ab', { selection: 'filter' }> // 'abc'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = StringPlus.StartsWith<'abc', 'ab', StringPlus.StartsWith.$Branch> // $Then
 * type R = StringPlus.StartsWith<'abc', 'bc', StringPlus.StartsWith.$Branch> // $Else
 * ```
 */
export type StartsWith<
	Subject extends string,
	Search extends string,
	$O extends $StrictOptions<$O, StartsWith.$Options> = {},
> = Subject extends `${Search}${string}` ? $ResolveBranch<$O, [$Then], Subject> : $ResolveBranch<$O, [$Else]>

export namespace StartsWith {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
