import type { $ResolveOptions } from '../$type/$resolve_options.js'
import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { $SelectInvertStrict } from '../equal/equal.js'

/**
 * Is `T` not exactly `Function`.
 *
 * ```ts
 * type R = IsNotStrictFunction<Function> // false
 *
 * type R = IsNotStrictFunction<() => void> // true
 * type R = IsNotStrictFunction<(() => void) & { a: 1 }> // true
 * ```
 */

export type IsNotStrictFunction<T, $O extends $StrictOptions<$O, IsNotStrictFunction.$Options> = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<$O, [$Any, $Then], T>
		$unknown: $ResolveBranch<$O, [$Unknown, $Then], T>
		$never: $ResolveBranch<$O, [$Never, $Then], T>
		$void: $ResolveBranch<$O, [$Void, $Then], T>
		$else: $ResolveOptions<[$O['distributive'], $SelectInvertStrict.$Default['distributive']]> extends true
			? IsNotStrictFunction._D<T, $O>
			: $SelectInvertStrict._N<T, Function, $O>
	}
>

export namespace IsNotStrictFunction {
	export interface $Options extends $SelectInvertStrict.$Options, $InputOptions<$Void> {}
	export type $Default = $SelectInvertStrict.$Default
	export type $Branch = $SelectInvertStrict.$Branch
	export type _D<T, $O extends IsNotStrictFunction.$Options> = T extends Function
		? $ResolveBranch<$O, [T extends (...args: any[]) => any ? $Then : $Else], T>
		: $ResolveBranch<$O, [$Then], T>
}
