import type { $InputOptions } from '../$type/branch/$input-options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve-branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'

/**
 * 🎭 **predicate**
 *
 * Validate if `T` is `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any> // true
 *
 * type R = IsAny<never> // false
 * type R = IsAny<unknown> // false
 * type R = IsAny<string | boolean> // false
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is `any`.
 *
 * @example
 * ```ts
 * type R = IsAny<any, { selection: 'filter' }> // any
 * type R = IsAny<never, { selection: 'filter' }> // never
 * type R = IsAny<unknown, { selection: 'filter' }> // never
 * type R = IsAny<string | boolean, { selection: 'filter' }> // never
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsAny<any, $Selection.Branch> // $Then
 * type R = IsAny<string, $Selection.Branch> // $Else
 * type R = IsAny<unknown, IsAny.$Branch> // $Unknown
 * type R = IsAny<never, IsAny.$Branch> // $Never
 * type R = IsAny<void, IsAny.$Branch> // $Void
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsAny<T, $O extends $StrictOptions<$O, IsAny.$Options> = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? true
		: false
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Then], T>
				$unknown: $ResolveBranch<$O, [$Unknown, $Else]>
				$never: $ResolveBranch<$O, [$Never, $Else]>
				$void: $ResolveBranch<$O, [$Void, $Else]>
				$else: $ResolveBranch<$O, [$Else]>
			}
		>

export namespace IsAny {
	export interface $Options extends $Selection.Options, $InputOptions<$Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate
	export type $Branch = $Selection.Branch & $Unknown.$Branch & $Never.$Branch & $Void.$Branch

	/**
	 * 🧰 *type function*
	 *
	 * `IsAny` as a type function, with its options `$O` applied.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsAny.$Fn, any> // true
	 * type R = $Fn.Apply<IsAny.$Fn, 1> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsAny<this['in'], $O>
	}
}
