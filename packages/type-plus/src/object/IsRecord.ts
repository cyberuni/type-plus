import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is a record, i.e. assignable to `Record<any, any>` and not an
 * array.
 *
 * A plain `extends` check: it distributes over a union, and it does not
 * special-case `any`, `never` or `unknown`.
 *
 * @example
 * ```ts
 * type R = IsRecord<{ a: 1 }> // true
 * type R = IsRecord<Record<string, number>> // true
 *
 * type R = IsRecord<number[]> // false
 * type R = IsRecord<string> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the records, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsRecord<{ a: 1 } | number[], { selection: 'filter' }> // { a: 1 }
 * type R = IsRecord<string, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsRecord<{ a: 1 }, IsRecord.$Branch> // $Then
 * type R = IsRecord<string, IsRecord.$Branch> // $Else
 * ```
 */
export type IsRecord<T, $O extends $StrictOptions<$O, IsRecord.$Options> = {}> = T extends any[]
	? $ResolveBranch<$O, [$Else]>
	: T extends Record<any, any>
		? $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>

export namespace IsRecord {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsRecord` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsRecord.$Fn, { a: 1 }> // true
	 * type R = $Fn.Apply<IsRecord.$Fn, number[]> // false
	 *
	 * type R = TuplePlus.Filter<[1, { a: 1 }, number[]], IsRecord.$Fn> // [{ a: 1 }]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsRecord<this['in'], $O>
	}
}
