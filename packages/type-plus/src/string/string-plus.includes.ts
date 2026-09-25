import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { StringIncludes } from './string.js'

/**
 * 🎭 *predicate*
 *
 * Check if `Subject` includes `Search`.
 * If either of them is not a string, takes the `$else` branch.
 *
 * ```ts
 * type R = StringPlus.Includes<'abc', 'a'> // true
 *
 * type R = StringPlus.Includes<'abc', 'd'> // false
 *
 * type R = StringPlus.Includes<'abc', 'd', { $then: 'yes'; $else: 'no' }> // 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep `Subject` when it includes `Search`, otherwise returns `never`.
 *
 * ```ts
 * type R = StringPlus.Includes<'abc', 'a', { selection: 'filter' }> // 'abc'
 * type R = StringPlus.Includes<'abc', 'd', { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * ```ts
 * type R = StringPlus.Includes<'abc', 'a', StringPlus.Includes.$Branch> // $Then
 * type R = StringPlus.Includes<'abc', 'd', StringPlus.Includes.$Branch> // $Else
 * ```
 */
export type Includes<
	Subject extends string,
	Search extends string,
	$O extends $StrictOptions<$O, Includes.$Options> = {},
> = StringIncludes<Subject, Search, $ResolveBranch<$O, [$Then], Subject>, $ResolveBranch<$O, [$Else]>>

export namespace Includes {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
