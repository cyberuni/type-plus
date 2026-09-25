import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 *predicate*
 *
 * Validate the type `T` is not a union.
 *
 * The inverse of `IsUnion`, with the same rules.
 * `boolean` is a union of `true | false`, so it is a union.
 *
 * @example
 * ```ts
 * type R = IsNotUnion<number> // true
 * type R = IsNotUnion<never> // true
 *
 * type R = IsNotUnion<'a' | 'b'> // false
 * type R = IsNotUnion<boolean> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not a union, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotUnion<number, { selection: 'filter' }> // number
 * type R = IsNotUnion<'a' | 'b', { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUnion<number, IsNotUnion.$Branch> // $Then
 * type R = IsNotUnion<'a' | 'b', IsNotUnion.$Branch> // $Else
 * ```
 */
export type IsNotUnion<T, $O extends $StrictOptions<$O, IsNotUnion.$Options> = {}> = IsNotUnion.$<T, $O>

export namespace IsNotUnion {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotUnion` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotUnion.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotUnion.$Fn, 1 | 2> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotUnion<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not a union.
	 *
	 * This is a type util for building custom types.
	 * It is the same as `IsNotUnion` -- the check has no special-type handling to skip.
	 */
	export type $<T, $O extends $Options, U = T> = (T extends unknown ? (U extends T ? 1 : 2) : never) extends 1
		? $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
}
