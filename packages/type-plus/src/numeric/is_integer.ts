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
import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is an integer, `bigint` included.
 *
 * Every `bigint` is an integer, so `bigint` itself resolves to `true`.
 * The wide `number` type resolves to `boolean`, because it contains both
 * integers and non-integers.
 * Special types are not numeric, so they resolve to `false`.
 *
 * @example
 * ```ts
 * type R = IsInteger<0> // true
 * type R = IsInteger<-1> // true
 * type R = IsInteger<1n> // true
 * type R = IsInteger<bigint> // true
 *
 * type R = IsInteger<1.1> // false
 * type R = IsInteger<string> // false
 *
 * type R = IsInteger<number> // boolean
 *
 * type R = IsInteger<any> // false
 * type R = IsInteger<unknown> // false
 * type R = IsInteger<never> // false
 * type R = IsInteger<void> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is an integer, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsInteger<1, { selection: 'filter' }> // 1
 * type R = IsInteger<1.1, { selection: 'filter' }> // never
 * type R = IsInteger<number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsInteger<1 | string> // boolean
 * type R = IsInteger<1 | string, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsInteger<1, IsInteger.$Branch> // $Then
 * type R = IsInteger<1.1, IsInteger.$Branch> // $Else
 * ```
 *
 * 🔢 *customize*
 *
 * Override special types branch.
 *
 * @example
 * ```ts
 * type R = IsInteger<any, { $any: 1 }> // 1
 * type R = IsInteger<unknown, { $unknown: 2 }> // 2
 * type R = IsInteger<never, { $never: 3 }> // 3
 * type R = IsInteger<void, { $void: 4 }> // 4
 * ```
 */
export type IsInteger<T, $O extends $StrictOptions<$O, IsInteger.$Options> = {}> = [
	Extract<keyof $O, '$any' | '$unknown' | '$never' | '$void'>,
] extends [never]
	? IsInteger._<T, $O>
	: $Special<
			T,
			{
				$any: $ResolveBranch<$O, [$Any], IsInteger._<T, $O>>
				$unknown: $ResolveBranch<$O, [$Unknown], IsInteger._<T, $O>>
				$never: $ResolveBranch<$O, [$Never], IsInteger._<T, $O>>
				$void: $ResolveBranch<$O, [$Void], IsInteger._<T, $O>>
				$else: IsInteger._<T, $O>
			}
		>

export namespace IsInteger {
	export interface $Options
		extends $Selection.Options,
			$Distributive.Options,
			$Exact.Options,
			$InputOptions<$Any | $Unknown | $Never | $Void> {}
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>

	/**
	 * `IsInteger` without the special-type overrides.
	 */
	export type _<T, $O extends IsInteger.$Options> = IsNumber<
		T,
		{
			distributive: $O['distributive']
			$then: number extends T
				? $ResolveBranch<$O, [$Then], number> | $ResolveBranch<$O, [$Else]>
				: T extends number & infer U
					? `${T}` extends `${number}.${number}`
						? $ResolveBranch<$O, [$Else]>
						: [T, U] extends [U, T]
							? $ResolveBranch<$O, [$Then], T>
							: $ResolveBranch<$O, [$Then], number> | $ResolveBranch<$O, [$Else]>
					: never
			$else: IsBigint<
				T,
				{
					distributive: $O['distributive']
					$then: $ResolveBranch<$O, [$Then], T>
					$else: $ResolveBranch<$O, [$Else]>
				}
			>
		}
	>
}
