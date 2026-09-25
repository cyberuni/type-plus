import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { NumericStruct } from './numeric-struct.js'

/**
 * ⚗️ *transform*
 *
 * `A * B` at the type level, on `number` and `bigint` literals.
 *
 * ⚠️ Two limits this family shares, both easy to trip:
 *
 * - **Only literals.** The widened `number` and `bigint` types carry no value,
 *   so they resolve to `$fail` (`never` by default).
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
export type Multiply<
	A extends number | bigint,
	B extends number | bigint,
	$O extends $StrictOptions<$O, Multiply.$Options> = {},
> = NumericStruct.Multiply<
	NumericStruct.FromNumeric<A, _ResolveFail<$O>>,
	NumericStruct.FromNumeric<B, _ResolveFail<$O>>
> extends infer R
	? // `R` is already the `$fail` value when it is not a `NumericStruct`. Naming it here instead of returning `R`
		// keeps the constraint of a deferred `Multiply<...>` narrow enough for generic callers such as `IndexAt`.
		R extends NumericStruct
		? NumericStruct.ToNumeric<R>
		: _ResolveFail<$O>
	: never

export namespace Multiply {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
