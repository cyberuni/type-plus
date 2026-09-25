import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 *predicate*
 *
 * Validate the type `T` is a union.
 *
 * `boolean` is a union of `true | false`, so it is a union.
 *
 * @author Nurbol Alpysbayev
 * @see https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union
 *
 * @example
 * ```ts
 * type R = IsUnion<'a' | 'b'> // true
 * type R = IsUnion<boolean> // true
 * type R = IsUnion<number> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a union, otherwise returns `never`.
 * This replaces the removed `UnionType`.
 *
 * @example
 * ```ts
 * type R = IsUnion<'a' | 'b', { selection: 'filter' }> // 'a' | 'b'
 * type R = IsUnion<boolean, { selection: 'filter' }> // boolean
 * type R = IsUnion<number, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Override the branches directly.
 *
 * @example
 * ```ts
 * type R = IsUnion<boolean, { $then: 1; $else: 2 }> // 1
 * type R = IsUnion<{ a: 1 }, { $then: 1; $else: 2 }> // 2
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUnion<'a' | 'b', IsUnion.$Branch> // $Then
 * type R = IsUnion<number, IsUnion.$Branch> // $Else
 * ```
 */
export type IsUnion<T, $O extends $StrictOptions<$O, IsUnion.$Options> = {}> = IsUnion.$<T, $O>

export namespace IsUnion {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsUnion` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsUnion.$Fn, 1 | 2> // true
	 * type R = $Fn.Apply<IsUnion.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsUnion<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is a union.
	 *
	 * This is a type util for building custom types.
	 * It is the same as `IsUnion` -- the check has no special-type handling to skip.
	 */
	export type $<T, $O extends $Options, U = T> = (T extends unknown ? (U extends T ? 1 : 2) : never) extends 1
		? $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Then], T>
}
