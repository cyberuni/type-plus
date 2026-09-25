import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/* eslint-disable @typescript-eslint/ban-types */
/**
 * 🎭 *predicate*
 *
 * Validate if `T` is the empty object type `{}`, i.e. a type that both extends
 * `{}` and is extended by it.
 *
 * ⚠️ `{}` in TypeScript means "anything but `null` and `undefined`", not "an
 * object with no properties", so this is broader than the name suggests:
 * `object` and `Record<string, never>` both pass. Primitives do not, because
 * `{} extends number` is false.
 *
 * It is a plain `extends` check that distributes over a union, and it does not
 * special-case the special types: `never` gives `never`.
 *
 * @example
 * ```ts
 * type R = IsEmptyObject<{}> // true
 * type R = IsEmptyObject<object> // true
 * type R = IsEmptyObject<Record<string, never>> // true
 *
 * type R = IsEmptyObject<{ a: 1 }> // false
 * type R = IsEmptyObject<number> // false
 *
 * type R = IsEmptyObject<never> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the empty object types, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsEmptyObject<{} | { a: 1 }, { selection: 'filter' }> // {}
 * type R = IsEmptyObject<{ a: 1 }, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsEmptyObject<{}, IsEmptyObject.$Branch> // $Then
 * type R = IsEmptyObject<{ a: 1 }, IsEmptyObject.$Branch> // $Else
 * ```
 */
export type IsEmptyObject<T, $O extends $StrictOptions<$O, IsEmptyObject.$Options> = {}> = T extends {}
	? {} extends T
		? $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
	: $ResolveBranch<$O, [$Else]>

export namespace IsEmptyObject {
	export interface $Options extends $Selection.Options {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsEmptyObject` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsEmptyObject.$Fn, {}> // true
	 * type R = $Fn.Apply<IsEmptyObject.$Fn, { a: 1 }> // false
	 *
	 * type R = TuplePlus.Filter<[{}, { a: 1 }, 1], IsEmptyObject.$Fn> // [{}]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsEmptyObject<this['in'], $O>
	}
}
