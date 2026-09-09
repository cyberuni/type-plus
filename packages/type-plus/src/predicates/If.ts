import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'

/**
 * 🎭 *predicate*
 *
 * Selects the `$then` branch when `Condition` is `true` and the `$else` branch
 * when it is `false`. The type-level `if`.
 *
 * It distributes, so a `Condition` of `boolean` -- the result of an
 * undecided predicate -- yields both branches rather than either one.
 *
 * @example
 * ```ts
 * type R = If<true> // true
 * type R = If<false> // false
 *
 * type R = If<true, { $then: 'yes'; $else: 'no' }> // 'yes'
 * type R = If<boolean, { $then: 'yes'; $else: 'no' }> // 'yes' | 'no'
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep `Condition` when it is `true`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = If<true, { selection: 'filter' }> // true
 * type R = If<false, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = If<true, If.$Branch> // $Then
 * type R = If<false, If.$Branch> // $Else
 * ```
 */
export type If<Condition extends boolean, $O extends If.$Options = {}> = Condition extends true
	? $ResolveBranch<$O, [$Then], Condition>
	: $ResolveBranch<$O, [$Else]>

export namespace If {
	export type $Options = $Selection.Options
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
