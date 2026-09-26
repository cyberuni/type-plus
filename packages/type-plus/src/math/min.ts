import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNever } from '../never/is-never.js'
import type { GreaterThan } from './greater-than.js'

/**
 * ⚗️ *transform*
 *
 * The smaller of `A` and `B`, on `number` literals. Ties return `A`, which is
 * the same value.
 *
 * Built on `GreaterThan`, so it inherits every one of its limits: `bigint` is
 * not supported, a fractional pair whose difference is a whole number is not
 * supported, and a non-literal operand is not supported. Each of those
 * resolves to `$fail` (`never` by default).
 *
 * @example
 * ```ts
 * type R = Min<1, 2> // 1
 * type R = Min<1, 1> // 1
 * type R = Min<-1, -2> // -2
 *
 * type R = Min<number, 1> // never
 * type R = Min<2n, 1n> // never -- bigint is not supported
 * type R = Min<1.5, 2.5> // never -- the difference is a whole number
 * ```
 */
export type Min<
	A extends number | bigint,
	B extends number | bigint,
	$O extends $StrictOptions<$O, Min.$Options> = {},
> = GreaterThan<A, B> extends infer Result
	? IsNever<Result> extends true
		? _ResolveFail<$O>
		: Result extends true
			? B
			: A
	: never

export namespace Min {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
