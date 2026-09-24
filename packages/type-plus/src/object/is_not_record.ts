import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not a record, i.e. an array or not assignable to `Record<any, any>`.
 *
 * The inverse of `IsRecord`, with the same rules:
 * it distributes over a union, and it does not special-case `any`, `never` or `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotRecord<number[]> // true
 * type R = IsNotRecord<string> // true
 *
 * type R = IsNotRecord<{ a: 1 }> // false
 * type R = IsNotRecord<Record<string, number>> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the types that are not records, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotRecord<{ a: 1 } | number[], { selection: 'filter' }> // number[]
 * type R = IsNotRecord<{ a: 1 }, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotRecord<string, IsNotRecord.$Branch> // $Then
 * type R = IsNotRecord<{ a: 1 }, IsNotRecord.$Branch> // $Else
 * ```
 */
export type IsNotRecord<T, $O extends $StrictOptions<$O, IsNotRecord.$Options> = {}> = T extends any[]
	? $ResolveBranch<$O, [$Then], T>
	: T extends Record<any, any>
		? $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Then], T>

export namespace IsNotRecord {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotRecord` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotRecord.$Fn, number[]> // true
	 * type R = $Fn.Apply<IsNotRecord.$Fn, { a: 1 }> // false
	 *
	 * type R = TuplePlus.Filter<[1, { a: 1 }, number[]], IsNotRecord.$Fn> // [1, number[]]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotRecord<this['in'], $O>
	}
}
