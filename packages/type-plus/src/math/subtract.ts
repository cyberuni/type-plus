import type { NumericStruct } from './numeric_struct.js'

/**
 * ⚗️ *transform*
 *
 * `A - B` at the type level, on `number` and `bigint` literals.
 *
 * ⚠️ Two limits this family shares, both easy to trip:
 *
 * - **Only literals.** The widened `number` and `bigint` types carry no value,
 *   so they resolve to `Fail` (`never` by default).
 * - **A whole-number result from fractional inputs does not resolve to a
 *   number.** It resolves to the error *string*
 *   `"The value '4.0' cannot be represented as bigint or number"`, because the
 *   intermediate is formatted as `4.0` and TypeScript will not parse that back
 *   to a numeric literal. Fractional results are fine.
 *
 * There is no overflow guard: a result past `Number.MAX_SAFE_INTEGER` is
 * produced anyway, and is no longer exact.
 *
 * @example
 * ```ts
 * type R = Subtract<3, 1> // 2
 * type R = Subtract<1, 3> // -2
 * type R = Subtract<3n, 1n> // 2n
 * type R = Subtract<5, 1.5> // 3.5
 * type R = Subtract<1.5, 1.4> // 0.1
 *
 * type R = Subtract<number, 1> // never
 *
 * // a whole-number result from fractional inputs
 * type R = Subtract<1.5, 0.5> // "The value '1.0' cannot be represented as bigint or number"
 * ```
 */
export type Subtract<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericStruct.FromNumeric<A, Fail>,
	NumericStruct.FromNumeric<B, Fail>,
] extends [infer MA, infer MB]
	? MA extends NumericStruct
		? MB extends NumericStruct
			? NumericStruct.ToNumeric<NumericStruct.Subtract<MA, MB>>
			: Fail
		: Fail
	: never

/**
 * ⚗️ *transform*
 *
 * `N - 1`. `Subtract<N, 1>` with no `Fail` parameter, so a non-literal `N`
 * gives `never`.
 *
 * @example
 * ```ts
 * type R = Decrement<1> // 0
 * type R = Decrement<0> // -1
 * type R = Decrement<1.5> // 0.5
 * type R = Decrement<1n> // 0n
 *
 * type R = Decrement<number> // never
 * ```
 */
export type Decrement<N extends number | bigint> = Subtract<N, 1>
