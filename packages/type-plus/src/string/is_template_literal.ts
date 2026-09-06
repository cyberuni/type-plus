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
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { Assignable } from '../predicates/assignable.js'
import type { _StringType } from './_string_type.js'

/**
 * 🎭 *validate*
 *
 * Validate if `T` is a template literal(s).
 *
 * @example
 * ```ts
 * type R = IsTemplateLiteral<string> // false
 * type R = IsTemplateLiteral<'foo'> // false
 * type R = IsTemplateLiteral<`a${number}`> // true
 *
 * type R = IsTemplateLiteral<`a${number}` | `${bigint}c`> // true
 *
 * type R = IsTemplateLiteral<never> // false
 * type R = IsTemplateLiteral<unknown> // false
 * type R = IsTemplateLiteral<`${number}` | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is a template literal(s), otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsTemplateLiteral<`${number}`, { selection: 'filter' }> // `${number}`
 * type R = IsTemplateLiteral<'a', { selection: 'filter' }> // never
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsTemplateLiteral<`${number}` | 1> // boolean
 * type R = IsTemplateLiteral<`${number}` | 1, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsTemplateLiteral<`${number}`, IsTemplateLiteral.$Branch> // $Then
 * type R = IsTemplateLiteral<bigint, IsTemplateLiteral.$Branch> // $Else
 * ```
 */
export type IsTemplateLiteral<T, $O extends IsTemplateLiteral.$Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$then: $ResolveBranch<$O, [$Else]>
			$else: IsTemplateLiteral.$<T, $O>
		}
	>
>

export namespace IsTemplateLiteral {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	export type $UtilOptions = Assignable.$UtilOptions

	export type $<T, $O extends $UtilOptions> = $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>

	type _D<T, $O extends $UtilOptions> = T extends string
		? _StringType<T> extends infer R
			? R extends 'templateLiteral'
				? $ResolveBranch<$O, [$Then], T>
				: $ResolveBranch<$O, [$Else]>
			: never
		: $ResolveBranch<$O, [$Else]>

	type _N<T, $O extends $UtilOptions> = _D<T, { $then: $Then; $else: $Else }> extends infer R
		? $Then | $Else extends R
			? $ResolveBranch<$O, [$Else]>
			: $ResolveBranch<$O, [R], T>
		: never
}
