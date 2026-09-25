import type { $InputOptions } from '../$type/branch/$input-options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Void } from '../$type/special/$void.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown> // false
 *
 * type R = IsNotUnknown<number> // true
 * type R = IsNotUnknown<never> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not exactly `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, { selection: 'filter' }> // never
 *
 * type R = IsNotUnknown<number, { selection: 'filter' }> // number
 * type R = IsNotUnknown<never, { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUnknown<unknown, IsNotUnknown.$Branch> // $Else
 * type R = IsNotUnknown<string, IsNotUnknown.$Branch> // $Then
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsNotUnknown<T, $O extends $StrictOptions<$O, IsNotUnknown.$Options> = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? true
		: unknown extends T
			? false
			: true
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any, $Then], T>
				$unknown: $ResolveBranch<$O, [$Else]>
				$never: $ResolveBranch<$O, [$Never, $Then], T>
				$void: $ResolveBranch<$O, [$Void, $Then], T>
				$else: $ResolveBranch<$O, [$Then], T>
			}
		>

export namespace IsNotUnknown {
	export interface $Options extends $Selection.Options, $InputOptions<$Any | $Never | $Void> {}
	export type $Default = $Selection.Predicate
	export type $Branch = $Selection.Branch

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotUnknown` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsUnknown.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotUnknown.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotUnknown.$Fn, unknown> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotUnknown<this['in'], $O>
	}
}
