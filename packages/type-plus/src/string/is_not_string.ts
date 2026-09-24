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
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `string` nor `string` literals.
 *
 * @example
 * ```ts
 * type R = IsNotString<string> // false
 * type R = IsNotString<'a'> // false
 *
 * type R = IsNotString<never> // true
 * type R = IsNotString<unknown> // true
 * type R = IsNotString<string | boolean> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `string` nor `string` literals, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotString<string, { selection: 'filter' }> // never
 * type R = IsNotString<'a', { selection: 'filter' }> // never
 *
 * type R = IsNotString<never, { selection: 'filter' }> // never
 * type R = IsNotString<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotString<string | boolean, { selection: 'filter' }> // boolean
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotString<string | 1> // boolean
 * type R = IsNotString<string | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotString<string, IsNotString.$Branch> // $Else
 * type R = IsNotString<bigint, IsNotString.$Branch> // $Then
 * ```
 *
 * Without options, it answers through `$Special.Values`, skipping the options machinery,
 * which costs a fraction of the instantiations. The spec pins that shortcut to the full path.
 */
export type IsNotString<T, $O extends $StrictOptions<$O, IsNotString.$Options> = {}> = [keyof $O] extends [never]
	? $Special.Values<
			T,
			{ $any: true; $unknown: true; $never: true; $void: true; $else: T extends string ? false : true }
		>
	: $Special<
			T,
			$MergeOptions<
				$O,
				{
					$then: $ResolveBranch<$O, [$Then], T>
					$else: IsNotString.$<T, $O>
				}
			>
		>

export namespace IsNotString {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Default = $Selection.Predicate & $Distributive.Default & $Exact.Default
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * 🧰 *type function*
	 *
	 * `IsNotString` as a type function, with its options `$O` applied.
	 *
	 * Prefer it over `$Fn.Not<IsString.$Fn>`: it costs less.
	 *
	 * @example
	 * ```ts
	 * type R = $Fn.Apply<IsNotString.$Fn, 1> // true
	 * type R = $Fn.Apply<IsNotString.$Fn, 'a'> // false
	 * ```
	 */
	export interface $Fn<$O extends $StrictOptions<$O, $Options> = {}> extends $FnBase {
		readonly out: IsNotString<this['in'], $O>
	}

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `string` nor `string` literals.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $UtilOptions> = $ResolveOptions<[$O['exact'], false]> extends true
		? $Distributive.Parse<$O, { $then: _D<T, $O>; $else: _N<T, $O> }>
		: NotAssignable.$<T, string, $O>
}

type $UtilOptions = $Selection.Options & $Distributive.Options & $Exact.Options

type _D<T, $O extends $Selection.Options> = T extends string & infer U
	? U extends string
		? $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
	: $ResolveBranch<$O, [$Then], T>

type _N<T, $O extends $Selection.Options> = [T] extends [string & infer U]
	? U extends string
		? $ResolveBranch<$O, [$Then], T>
		: $ResolveBranch<$O, [$Else]>
	: $ResolveBranch<$O, [$Then], T>
