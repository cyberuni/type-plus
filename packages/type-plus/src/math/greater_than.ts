import type { IsPositive } from '../numeric/is_positive.js'
import type { Subtract } from './subtract.js'

/**
 * 🎭 *predicate*
 *
 * `A > B` at the type level, on `number` literals.
 *
 * It is implemented as `Subtract<A, B>` followed by a sign check, which is
 * where its two limits come from.
 *
 * ⚠️ **`bigint` does not work**, despite the constraint accepting it. The
 * intermediate difference is a `bigint` literal, which does not satisfy the
 * `extends number` guard, so every `bigint` comparison resolves to `Fail` --
 * `never` by default. `GreaterThan<2n, 1n>` is `never`, not `true`.
 *
 * ⚠️ Fractional comparisons work only when the difference is itself
 * fractional. When the difference is a whole number, `Subtract` yields an
 * error string rather than a numeric literal and the result is `Fail`:
 * `GreaterThan<1.5, 2.5>` is `never`.
 *
 * A non-literal `number` is `Fail` for the usual reason -- no value to compare.
 *
 * @example
 * ```ts
 * type R = GreaterThan<2, 1> // true
 * type R = GreaterThan<1, 1> // false
 * type R = GreaterThan<1, 2> // false
 * type R = GreaterThan<-1, -2> // true
 * type R = GreaterThan<1.5, 1.4> // true
 *
 * type R = GreaterThan<number, 1> // never
 * type R = GreaterThan<2n, 1n> // never -- bigint is not supported
 * type R = GreaterThan<1.5, 2.5> // never -- the difference is a whole number
 * ```
 */
export type GreaterThan<A extends number | bigint, B extends number | bigint, Fail = never> = Subtract<
	A,
	B,
	'fail'
> extends infer R extends number
	? R extends 0
		? false
		: IsPositive<R>
	: Fail
