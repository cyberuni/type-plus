import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { AnyRecord } from './any_record.js'

/**
 * 🎭 *predicate*
 *
 * Validate if the two records are disjoint from each other.
 * Disjoint means no common property.
 *
 * A plain check on `keyof A & keyof B`: it does not special-case `any`,
 * `never` or `unknown`, and it does not distribute over a union.
 *
 * @example
 * ```ts
 * type R = IsDisjoint<{ a: 1 }, { b: 1 }> // true
 * type R = IsDisjoint<{ a: 1 }, {}> // true
 *
 * type R = IsDisjoint<{ a: 1 }, { a: 2; b: 1 }> // false
 * type R = IsDisjoint<{ a: 1; c: 1 }, { a: 1; b: 1 }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep `A` when it is disjoint from `B`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsDisjoint<{ a: 1 }, { b: 1 }, { selection: 'filter' }> // { a: 1 }
 * type R = IsDisjoint<{ a: 1 }, { a: 1 }, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsDisjoint<{ a: 1 }, { b: 1 }, IsDisjoint.$Branch> // $Then
 * type R = IsDisjoint<{ a: 1 }, { a: 1 }, IsDisjoint.$Branch> // $Else
 * ```
 */
export type IsDisjoint<
	A extends AnyRecord,
	B extends AnyRecord,
	$O extends $StrictOptions<$O, IsDisjoint.$Options> = {},
> = [keyof A & keyof B] extends [never] ? $ResolveBranch<$O, [$Then], A> : $ResolveBranch<$O, [$Else]>

export namespace IsDisjoint {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsDisjoint` as a type function, with `B` and its options `$O` applied.
	 *
	 * The function's input is the record being checked, so `B`, the record it must not share a key with, is fixed up front.
	 * An input that is not a record resolves to the `$else` branch.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsDisjoint.$Fn<{ a: 1 }>, { b: 1 }> // true
	 * type R = $Fn.Apply<IsDisjoint.$Fn<{ a: 1 }>, { a: 2 }> // false
	 *
	 * type R = TuplePlus.Filter<[{ a: 1 }, { b: 1 }], IsDisjoint.$Fn<{ a: 1 }>> // [{ b: 1 }]
	 * ```
	 */
	export interface $Fn<B extends AnyRecord, $O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: this['in'] extends AnyRecord ? IsDisjoint<this['in'], B, $O> : $ResolveBranch<$O, [$Else]>
	}
}
