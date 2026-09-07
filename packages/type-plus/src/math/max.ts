import type { IsNever } from '../never/is_never.js'
import type { GreaterThan } from './greater_than.js'

/**
 * ⚗️ *transform*
 *
 * The larger of `A` and `B`, on `number` literals. Ties return `B`, which is
 * the same value.
 *
 * Built on `GreaterThan`, so it inherits every one of its limits: `bigint` is
 * not supported, a fractional pair whose difference is a whole number is not
 * supported, and a non-literal operand is not supported. Each of those
 * resolves to `Fail` (`never` by default).
 *
 * @example
 * ```ts
 * type R = Max<1, 2> // 2
 * type R = Max<1, 1> // 1
 * type R = Max<-1, -2> // -1
 *
 * type R = Max<number, 1> // never
 * type R = Max<2n, 1n> // never -- bigint is not supported
 * type R = Max<1.5, 2.5> // never -- the difference is a whole number
 * ```
 */
export type Max<A extends number | bigint, B extends number | bigint, Fail = never> = GreaterThan<
	A,
	B
> extends infer Result
	? IsNever<Result> extends true
		? Fail
		: Result extends true
			? A
			: B
	: never
