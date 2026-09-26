import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

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
export type If<Condition extends boolean, $O extends $StrictOptions<$O, If.$Options> = {}> = Condition extends true
	? $ResolveBranch<$O, [$Then], Condition>
	: $ResolveBranch<$O, [$Else]>

export namespace If {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `If` as a type function, with its options `$O` applied.
	 *
	 * An input that is not a `boolean` resolves to the `$else` branch.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<If.$Fn, true> // true
	 * type R = $Fn.Apply<If.$Fn, false> // false
	 * type R = $Fn.Apply<If.$Fn<{ $then: 'yes'; $else: 'no' }>, 1> // 'no'
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: this['in'] extends boolean ? If<this['in'], $O> : $ResolveBranch<$O, [$Else]>
	}

	/*
	 * `If` has no `$` type util: a `$` is a predicate's check without its special-type handling,
	 * and `If` has no special-type handling to strip. `If` is already that check.
	 */
}
