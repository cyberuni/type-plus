import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 *predicate*
 *
 * The type-level `String.prototype.endsWith`:
 * check if `Subject` ends with `Search`.
 *
 * An empty `Search` matches every string literal.
 * The wide `string` never ends with a literal, so it takes the `$else` branch.
 *
 * @example
 * ```ts
 * type R = StringPlus.EndsWith<'abc', 'bc'> // true
 * type R = StringPlus.EndsWith<'abc', 'ab'> // false
 * type R = StringPlus.EndsWith<'abc', ''> // true
 *
 * type R = StringPlus.EndsWith<'abc', 'ab', { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep `Subject` when it ends with `Search`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = StringPlus.EndsWith<'abc', 'bc', { selection: 'filter' }> // 'abc'
 * type R = StringPlus.EndsWith<'abc' | 'bcd', 'bc', { selection: 'filter' }> // 'abc'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = StringPlus.EndsWith<'abc', 'bc', StringPlus.EndsWith.$Branch> // $Then
 * type R = StringPlus.EndsWith<'abc', 'ab', StringPlus.EndsWith.$Branch> // $Else
 * ```
 */
export type EndsWith<
	Subject extends string,
	Search extends string,
	$O extends $StrictOptions<$O, EndsWith.$Options> = {},
> = Subject extends `${string}${Search}` ? $ResolveBranch<$O, [$Then], Subject> : $ResolveBranch<$O, [$Else]>

export namespace EndsWith {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
