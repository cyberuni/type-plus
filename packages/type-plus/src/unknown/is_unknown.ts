import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Void } from '../$type/special/$void.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown> // true
 *
 * type R = IsUnknown<number> // false
 * type R = IsUnknown<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, { selection: 'filter' }> // unknown
 *
 * type R = IsUnknown<number, { selection: 'filter' }> // never
 * type R = IsUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsUnknown<unknown, IsUnknown.$Branch> // $Then
 * type R = IsUnknown<string, IsUnknown.$Branch> // $Else
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsUnknown<T, $O extends $StrictOptions<$O, IsUnknown.$Options> = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? false
		: unknown extends T
			? true
			: false
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any, $Else]>
				$never: $ResolveBranch<$O, [$Never, $Else]>
				$unknown: $ResolveBranch<$O, [$Then], T>
				$void: $ResolveBranch<$O, [$Void, $Else]>
				$else: $ResolveBranch<$O, [$Else]>
			}
		>

export namespace IsUnknown {
	export interface $Options extends $Selection.Options, $InputOptions<$Any | $Never | $Void> {}
	export type $Branch = $Selection.Branch

	/**
	 * 🧰 *type function*
	 *
	 * `IsUnknown` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsUnknown.$Fn, unknown> // true
	 * type R = $Fn.Apply<IsUnknown.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsUnknown<this['in'], $O>
	}
}
