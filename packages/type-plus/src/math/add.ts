import type { NumericStruct } from './numeric_struct.js'

/**
 * ⚗️ *transform*
 *
 * `A + B` at the type level, on `number` and `bigint` literals.
 *
 * Mixing the two is allowed and the result is a `bigint`.
 *
 * Fractional arithmetic is exact decimal, not binary floating point, so it
 * disagrees with the runtime: `Add<0.1, 0.2>` is `0.3` where `0.1 + 0.2`
 * evaluates to `0.30000000000000004`.
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
 * type R = Add<1, 2> // 3
 * type R = Add<-1, 2> // 1
 * type R = Add<-1, -2> // -3
 * type R = Add<0, 0> // 0
 * type R = Add<1n, 2n> // 3n
 * type R = Add<1n, 2> // 3n -- bigint wins
 *
 * type R = Add<0.1, 0.2> // 0.3 -- exact, unlike the runtime
 * type R = Add<1, 0.5> // 1.5
 *
 * // past Number.MAX_SAFE_INTEGER, produced but no longer exact
 * type R = Add<9007199254740991, 1> // 9007199254740992
 *
 * type R = Add<number, 1> // never
 * type R = Add<number, 1, 'nope'> // 'nope'
 *
 * // a whole-number result from fractional inputs
 * type R = Add<1.5, 2.5> // "The value '4.0' cannot be represented as bigint or number"
 * ```
 */
export type Add<A extends number | bigint, B extends number | bigint, Fail = never> = [
	NumericStruct.FromNumeric<A, Fail>,
	NumericStruct.FromNumeric<B, Fail>,
] extends [infer MA, infer MB]
	? MA extends NumericStruct
		? MB extends NumericStruct
			? NumericStruct.ToNumeric<NumericStruct.Add<MA, MB>>
			: Fail
		: Fail
	: never

/**
 * ⚗️ *transform*
 *
 * `N + 1`. `Add<N, 1>` with no `Fail` parameter, so a non-literal `N` gives
 * `never`.
 *
 * @example
 * ```ts
 * type R = Increment<1> // 2
 * type R = Increment<-1> // 0
 * type R = Increment<1.5> // 2.5
 * type R = Increment<1n> // 2n
 *
 * type R = Increment<number> // never
 * ```
 */
export type Increment<N extends number | bigint> = Add<N, 1>
