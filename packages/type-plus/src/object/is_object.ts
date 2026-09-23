import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsEqual } from '../equal/is_equal.js'
import type { IsNever } from '../never/is_never.js'
import type { Assignable } from '../predicates/assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is an `object` or object literals.
 *
 * Note that `Function`, `Array`, and *tuple* are also objects.
 *
 * @example
 * ```ts
 * type R = IsObject<object> // true
 * type R = IsObject<{}> // true
 * type R = IsObject<{ a: 1 }> // true
 * type R = IsObject<Function> // true
 *
 * type R = IsObject<never> // false
 * type R = IsObject<unknown> // false
 * type R = IsObject<number> // false
 *
 * type R = IsObject<{} | bigint> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is an `object` or object literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsObject<{}, { selection: 'filter' }> // {}
 * type R = IsObject<{ a: 1 }, { selection: 'filter' }> // { a: 1 }
 * type R = IsObject<Function, { selection: 'filter' }> // Function
 *
 * type R = IsObject<never, { selection: 'filter' }> // never
 * type R = IsObject<unknown, { selection: 'filter' }> // never
 *
 * type R = IsObject<{} | bigint, { selection: 'filter' }> // {}
 * ```
 *
 * 🔢 *customize*:
 *
 * Validate if `T` is exactly `object`.
 *
 * @example
 * ```ts
 * type R = IsObject<object, { exact: true }> // true
 * type R = IsObject<{}, { exact: true }> // false
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsObject<{} | 1> // boolean
 * type R = IsObject<{} | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsObject<{}, IsObject.$Branch> // $Then
 * type R = IsObject<string, IsObject.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Pass it to a collection type as a type function with `IsObject.$Fn`.
 *
 * @example
 * ```ts
 * type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn> // [{ a: 1 }, object]
 * type R = TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn<{ exact: true }>> // [object]
 * ```
 *
 * Without options, it answers through `$Special.Values`, skipping the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsObject<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}> = [keyof $O] extends [never]
	? $Special.Values<
			T,
			{ $any: false; $unknown: false; $never: false; $void: false; $else: T extends object ? true : false }
		>
	: $Special<
			T,
			$MergeOptions<
				$O,
				{
					$then: $ResolveBranch<$O, [$Else]>
					$else: IsObject.$<T, $O>
				}
			>
		>

export namespace IsObject {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsObject` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsObject.$Fn, {}> // true
	 * type R = $Fn.Apply<IsObject.$Fn<{ exact: true }>, {}> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsObject<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `object` or `object` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], $Exact.Default]> extends true
		? $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
		: Assignable.$<T, object, $O>
	export type $UtilOptions = Assignable.$UtilOptions & $Exact.Options

	export type _D<T, $O extends $UtilOptions> = T extends object
		? IsEqual.$Same<
				T,
				{},
				{
					$then: $ResolveBranch<$O, [$Else]>
					$else: IsNever<
						keyof T,
						{
							$then: $ResolveBranch<$O, [$Then], T>
							$else: $ResolveBranch<$O, [$Else]>
						}
					>
				}
			>
		: $ResolveBranch<$O, [$Else]>

	export type _N<T, $O extends $UtilOptions> = [T] extends [object & infer U]
		? U extends object
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
}
