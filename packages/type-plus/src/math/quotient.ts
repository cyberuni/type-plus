import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { NumericStruct } from './numeric-struct.js'

/**
 * ⚗️ *transform*
 *
 * The integer quotient of `A / B` at the type level, on integer `number` and
 * `bigint` literals.
 *
 * It truncates toward zero, as `bigint` division and `Math.trunc(A / B)` do
 * at runtime: `Quotient<-7, 2>` is `-3`, not `-4`.
 * {@link Remainder} is the matching remainder.
 *
 * Mixing the two is allowed and the result is a `bigint`.
 *
 * It resolves to `$fail` (`never` by default) when:
 *
 * - either input is the widened `number` or `bigint` type, which carries no value;
 * - either input is fractional: `Quotient<7.5, 2>` has no integer quotient to give;
 * - `B` is zero. The runtime gives `Infinity` for `number` and throws a
 *   `RangeError` for `bigint`; neither is a literal to return.
 *
 * It uses long division, so the cost grows with the number of digits of `A`
 * times the number of digits of `B`: about 1.5 times a `Multiply` of the same
 * operands. Like the rest of the family, it exceeds the compiler's
 * instantiation depth once an operand reaches about 48 digits.
 *
 * @example
 * ```ts
 * type R = Quotient<7, 2> // 3
 * type R = Quotient<-7, 2> // -3
 * type R = Quotient<7, -2> // -3
 * type R = Quotient<-7, -2> // 3
 * type R = Quotient<1, 3> // 0
 * type R = Quotient<7n, 2n> // 3n
 * type R = Quotient<7n, 2> // 3n -- bigint wins
 *
 * type R = Quotient<1, 0> // never
 * type R = Quotient<7.5, 2> // never
 * type R = Quotient<number, 2> // never
 * type R = Quotient<1, 0, { $fail: 'nope' }> // 'nope'
 * ```
 */
export type Quotient<
	A extends number | bigint,
	B extends number | bigint,
	$O extends $StrictOptions<$O, Quotient.$Options> = {},
> = NumericStruct.DivMod<
	NumericStruct.FromNumeric<A, _ResolveFail<$O>>,
	NumericStruct.FromNumeric<B, _ResolveFail<$O>>,
	_ResolveFail<$O>
> extends infer R
	? R extends [infer Q extends NumericStruct, NumericStruct]
		? NumericStruct.ToNumeric<Q>
		: _ResolveFail<$O>
	: never

export namespace Quotient {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
