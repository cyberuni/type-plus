import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { Equal } from '../equal/equal.js'

/**
 * Is `T` exactly `Function`.
 *
 * ```ts
 * type R = IsStrictFunction<Function> // true
 *
 * type R = IsStrictFunction<() => void> // false
 * type R = IsStrictFunction<(() => void) & { a: 1 }> // false
 * ```
 */
export type IsStrictFunction<T, $O extends $StrictOptions<$O, IsStrictFunction.$Options> = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<$O, [$Any, $Else]>
		$never: $ResolveBranch<$O, [$Never, $Else]>
		$unknown: $ResolveBranch<$O, [$Unknown, $Else]>
		$void: $ResolveBranch<$O, [$Void, $Else]>
		$else: $ResolveOptions<[$O['distributive'], $Distributive.Default['distributive']]> extends true
			? IsStrictFunction._D<T, $O>
			: Equal._ExactEqualNonDistributive<T, Function, $O>
	}
>

export namespace IsStrictFunction {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default & $Exact.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
	export type _D<T, $O extends Equal.$Options> = T extends Function
		? T extends (...args: any[]) => any
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
}
