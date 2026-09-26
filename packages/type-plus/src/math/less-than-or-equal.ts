import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsNever } from '../never/is-never.js'
import type { GreaterThan } from './greater-than.js'

/**
 * 🎭 *predicate*
 *
 * `A <= B` at the type level, on `number` literals.
 *
 * It is the negation of `GreaterThan`, so it inherits its limits: `bigint` is not
 * supported, a fractional pair whose difference is a whole number is not
 * supported, and a non-literal operand is not supported. Each of those
 * resolves to `$fail` (`never` by default), never to a negated `$fail`.
 *
 * One case is recovered: two identical `number` literals are `true`, even
 * the fractional ones whose zero difference the comparison cannot compute.
 *
 * @example
 * ```ts
 * type R = LessThanOrEqual<1, 2> // true
 * type R = LessThanOrEqual<1, 1> // true
 * type R = LessThanOrEqual<2, 1> // false
 * type R = LessThanOrEqual<-2, -1> // true
 * type R = LessThanOrEqual<1.5, 1.5> // true
 *
 * type R = LessThanOrEqual<number, 1> // never
 * type R = LessThanOrEqual<number, number> // never
 * type R = LessThanOrEqual<2n, 1n> // never -- bigint is not supported
 * type R = LessThanOrEqual<1.5, 2.5> // never -- the difference is a whole number
 * ```
 */
export type LessThanOrEqual<
	A extends number | bigint,
	B extends number | bigint,
	$O extends $StrictOptions<$O, LessThanOrEqual.$Options> = {},
> = GreaterThan<A, B> extends infer R
	? IsNever<R> extends true
		? A extends number
			? number extends A
				? _ResolveFail<$O>
				: [A, B] extends [B, A]
					? true
					: _ResolveFail<$O>
			: _ResolveFail<$O>
		: R extends true
			? false
			: true
	: never

export namespace LessThanOrEqual {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
