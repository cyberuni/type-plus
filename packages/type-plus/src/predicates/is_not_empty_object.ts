import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/* eslint-disable @typescript-eslint/ban-types */
/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not the empty object type `{}`.
 *
 * The inverse of `IsEmptyObject`, with the same rules.
 *
 * ⚠️ `{}` in TypeScript means "anything but `null` and `undefined`", so
 * `object` and `Record<string, never>` count as empty and give `false`.
 *
 * It distributes over a union, and `never` gives `never`.
 *
 * @example
 * ```ts
 * type R = IsNotEmptyObject<{ a: 1 }> // true
 * type R = IsNotEmptyObject<number> // true
 *
 * type R = IsNotEmptyObject<{}> // false
 * type R = IsNotEmptyObject<object> // false
 *
 * type R = IsNotEmptyObject<never> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the types that are not the empty object type, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotEmptyObject<{} | { a: 1 }, { selection: 'filter' }> // { a: 1 }
 * type R = IsNotEmptyObject<{}, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotEmptyObject<{ a: 1 }, IsNotEmptyObject.$Branch> // $Then
 * type R = IsNotEmptyObject<{}, IsNotEmptyObject.$Branch> // $Else
 * ```
 */
export type IsNotEmptyObject<T, $O extends $StrictOptions<$O, IsNotEmptyObject.$Options> = {}> = T extends {}
	? {} extends T
		? $ResolveBranch<$O, [$Else]>
		: $ResolveBranch<$O, [$Then], T>
	: $ResolveBranch<$O, [$Then], T>

export namespace IsNotEmptyObject {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotEmptyObject` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotEmptyObject.$Fn, { a: 1 }> // true
	 * type R = $Fn.Apply<IsNotEmptyObject.$Fn, {}> // false
	 *
	 * type R = TuplePlus.Filter<[{}, { a: 1 }, 1], IsNotEmptyObject.$Fn> // [{ a: 1 }, 1]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotEmptyObject<this['in'], $O>
	}
}
