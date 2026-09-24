import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsNumber } from '../number/is_number.js'

/**
 * ⚗️ *transform*
 *
 * The absolute value of the numeric literal `N`.
 *
 * Works on `number` and `bigint` literals, integer or fractional. Only
 * *literals*: the widened `number` and `bigint` types carry no value to take
 * the absolute of, so they resolve to `$fail` (`never` by default).
 *
 * @example
 * ```ts
 * type R = Abs<-5> // 5
 * type R = Abs<5> // 5
 * type R = Abs<0> // 0
 * type R = Abs<-1.5> // 1.5
 * type R = Abs<-1n> // 1n
 *
 * type R = Abs<number> // never
 * type R = Abs<number, { $fail: 'nope' }> // 'nope'
 * ```
 */
export type Abs<N extends number | bigint, $O extends $StrictOptions<$O, Abs.$Options> = {}> = IsNumber<N, IsNumber.$Branch> extends infer R
	? R extends $Then
		? [number] extends [N]
			? $Fail._Resolve<$O>
			: `${N}` extends `-${infer P extends number}`
				? P
				: N
		: R extends $Else
			? IsBigint<N> extends infer R
				? R extends true
					? [bigint] extends [N]
						? $Fail._Resolve<$O>
						: `${N}` extends `-${infer P extends bigint}`
							? P
							: N
					: $Fail._Resolve<$O>
				: never
			: never
	: never


export namespace Abs {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}