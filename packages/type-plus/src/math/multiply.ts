import type { NumericStruct } from './numeric_struct.js'

/**
 * ⚗️ *transform*
 *
 * `A * B` at the type level, on `number` and `bigint` literals.
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
 * type R = Multiply<3, 4> // 12
 * type R = Multiply<-3, 4> // -12
 * type R = Multiply<3, 0> // 0
 * type R = Multiply<3n, 4n> // 12n
 *
 * type R = Multiply<number, 2> // never
 *
 * // no overflow guard
 * type R = Multiply<9007199254740991, 2> // 18014398509481982
 *
 * // a whole-number result from fractional inputs
 * type R = Multiply<0.5, 4> // "The value '2.0' cannot be represented as bigint or number"
 * ```
 */
export type Multiply<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericStruct.FromNumeric<A, Fail>,
	NumericStruct.FromNumeric<B, Fail>,
] extends [infer MA, infer MB]
	? MA extends NumericStruct
		? MB extends NumericStruct
			? NumericStruct.ToNumeric<NumericStruct.Multiply<MA, MB>>
			: Fail
		: Fail
	: never
