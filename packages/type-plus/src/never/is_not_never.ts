import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Fn as $FnBase } from '../$type/fn/$fn.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` not `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `never`, otherwise returns `$Never`.
 *
 * Filter normally returns `never` in the `$else` clause.
 * But since we are checking for `never` here,
 * we have to return `$Never` instead.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1, { selection: 'filter' }> // 1
 *
 * type R = IsNotNever<never, { selection: 'filter' }> // $Never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNever<never, IsNotNever.$Branch> // $Else
 * type R = IsNotNever<1, IsNotNever.$Branch> // $Then
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsNotNever<T, $O extends $StrictOptions<$O, IsNotNever.$Options> = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? true
		: [T] extends [never]
			? false
			: true
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any, $Then], T>
				$never: $ResolveBranch<IsNotNever._O<$O>, [$Else]>
				$unknown: $ResolveBranch<$O, [$Unknown, $Then], T>
				$void: $ResolveBranch<$O, [$Void, $Then], T>
				$else: $ResolveBranch<$O, [$Then], T>
			}
		>

export namespace IsNotNever {
	export interface $Options extends $Selection.Options, $InputOptions<$Any | $Unknown | $Void> {}
	export type $Branch = $Selection.Branch

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotNever` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsNever.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotNever.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotNever.$Fn, never> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotNever<this['in'], $O>
	}

	export type _O<$O extends $Options> = '$else' extends keyof $O
		? $O
		: $O['selection'] extends 'filter'
			? $O & { $else: $Never }
			: $O
}
