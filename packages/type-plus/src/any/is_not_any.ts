import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any, { selection: 'filter' }> // never
 *
 * type R = IsNotAny<never, { selection: 'filter' }> // never
 * type R = IsNotAny<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotAny<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any, IsNotAny.$Branch> // $Else
 * type R = IsNotAny<string, IsNotAny.$Branch> // $Then
 * ```
 *
 * Without options, it checks `T` directly, skipping `$Special` and the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsNotAny<T, $O extends $StrictOptions<$O, IsNotAny.$Options> = {}> = [keyof $O] extends [never]
	? 0 extends 1 & T
		? false
		: true
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Else]>
				$never: $ResolveBranch<$O, [$Never, $Then], T>
				$unknown: $ResolveBranch<$O, [$Unknown, $Then], T>
				$void: $ResolveBranch<$O, [$Void, $Then], T>
				$else: $ResolveBranch<$O, [$Then], T>
			}
		>

export namespace IsNotAny {
	export interface $Options extends $Selection.Options, $InputOptions<$Unknown | $Never | $Void> {}
	export type $Branch = $Selection.Branch & $Unknown.$Branch & $Never.$Branch & $Void.$Branch
}
