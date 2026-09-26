import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { NumericStruct } from './numeric-struct.js'

/**
 * ⚗️ *transform*
 *
 * The remainder of `A / B` at the type level, on integer `number` and `bigint`
 * literals: the type-level `A % B`.
 *
 * It takes the sign of `A`, as `%` does at runtime: `Remainder<-7, 2>` is
 * `-1`, and `Remainder<7, -2>` is `1`. It pairs with {@link Quotient}, so
 * `Quotient<A, B> * B + Remainder<A, B>` is `A`.
 *
 * Mixing `number` and `bigint` is allowed and the result is a `bigint`.
 *
 * It resolves to `$fail` (`never` by default) when:
 *
 * - either input is the widened `number` or `bigint` type, which carries no value;
 * - either input is fractional. The runtime `7.5 % 2` is `1.5`, but this type
 *   covers integers only;
 * - `B` is zero. The runtime gives `NaN` for `number` and throws a `RangeError`
 *   for `bigint`; neither is a literal to return.
 *
 * @example
 * ```ts
 * type R = Remainder<7, 2> // 1
 * type R = Remainder<-7, 2> // -1
 * type R = Remainder<7, -2> // 1
 * type R = Remainder<6, 3> // 0
 * type R = Remainder<1, 3> // 1
 * type R = Remainder<7n, 2n> // 1n
 *
 * type R = Remainder<1, 0> // never
 * type R = Remainder<7.5, 2> // never
 * type R = Remainder<number, 2> // never
 * type R = Remainder<1, 0, { $fail: 'nope' }> // 'nope'
 * ```
 */
export type Remainder<
	A extends number | bigint,
	B extends number | bigint,
	$O extends $StrictOptions<$O, Remainder.$Options> = {},
> = NumericStruct.DivMod<
	NumericStruct.FromNumeric<A, _ResolveFail<$O>>,
	NumericStruct.FromNumeric<B, _ResolveFail<$O>>,
	_ResolveFail<$O>
> extends infer R
	? R extends [NumericStruct, infer M extends NumericStruct]
		? NumericStruct.ToNumeric<M>
		: _ResolveFail<$O>
	: never

export namespace Remainder {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
