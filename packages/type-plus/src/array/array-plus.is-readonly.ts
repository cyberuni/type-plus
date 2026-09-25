import type { $InputOptions } from '../$type/branch/$input-options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge-options.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `A` is a readonly array or tuple.
 *
 * It distributes over a union, so a union of a readonly and a mutable array gives `boolean`.
 * A value that is not an array, and the special types `any`, `unknown`, `never` and `void`, give `false`.
 *
 * @example
 * ```ts
 * type R = IsReadonly<readonly string[]> // true
 * type R = IsReadonly<readonly [1, 2, 3, 4, 5]> // true
 *
 * type R = IsReadonly<[1, 2, 3, 4, 5]> // false
 * type R = IsReadonly<string> // false
 * type R = IsReadonly<never> // false
 *
 * type R = IsReadonly<readonly string[] | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to keep the readonly arrays and tuples, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsReadonly<readonly string[] | number[], { selection: 'filter' }> // readonly string[]
 * type R = IsReadonly<number[], { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Pick the result of each case with `$then`, `$else`, and the special-type branches.
 *
 * @example
 * ```ts
 * type R = IsReadonly<readonly string[], { $then: 'yes'; $else: 'no' }> // 'yes'
 * type R = IsReadonly<never, { $never: 'n' }> // 'n'
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsReadonly<readonly string[], IsReadonly.$Branch> // $Then
 * type R = IsReadonly<string[], IsReadonly.$Branch> // $Else
 * ```
 */
export type IsReadonly<A, $O extends $StrictOptions<$O, IsReadonly.$Options> = {}> = $Special<
	A,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: A extends readonly any[]
				? Readonly<A> extends A
					? $ResolveBranch<$O, [$Then], A>
					: $ResolveBranch<$O, [$Else]>
				: $ResolveBranch<$O, [$Else]>
		}
	>
>

export namespace IsReadonly {
	export interface $Options extends $Selection.Options, $InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsReadonly` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsReadonly.$Fn, readonly string[]> // true
	 * type R = $Fn.Apply<IsReadonly.$Fn, string[]> // false
	 *
	 * type R = TuplePlus.Filter<[readonly [1], [2], readonly string[]], IsReadonly.$Fn> // [readonly [1], readonly string[]]
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsReadonly<this['in'], $O>
	}
}
