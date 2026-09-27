import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { DigitArray, DigitsStruct, NumericStruct } from './numeric-struct.js'
import type { Quotient } from './quotient.js'

/**
 * ⚗️ *transform*
 *
 * `A / B` at the type level, on `number` and `bigint` literals.
 *
 * A result that does not terminate is truncated toward zero to
 * `$O['precision']` fractional digits, 16 by default:
 * `Divide<1, 3>` is `0.3333333333333333`, the same literal as the runtime `1 / 3`,
 * and `Divide<-2, 3>` is `-0.6666666666666666`.
 * 16 is the number of fractional digits a `number` shows for a result between
 * `0.1` and `1`, so a common result keeps all the precision a `number` has.
 * A larger precision rarely adds digits and costs one more long-division step
 * per digit; a smaller one gives shorter literals.
 *
 * A `number` literal holds about 17 significant digits. When the truncated
 * result has more than 15 and TypeScript cannot read it back as a literal
 * (`Divide<9007199254740991, 3>`), more fractional digits are dropped,
 * still toward zero, until it can.
 *
 * A whole-number result is a plain literal: `Divide<1, 0.5>` is `2`.
 *
 * `bigint` has no fractional values, so when either input is a `bigint`,
 * `Divide` is {@link Quotient}: `Divide<7n, 2n>` is `3n`, as `7n / 2n` is at
 * runtime. It fails the same way `Quotient` does, so a fractional `number`
 * mixed with a `bigint` is `$fail`.
 *
 * It resolves to `$fail` (`never` by default) when:
 *
 * - either input is the widened `number` or `bigint` type, which carries no value;
 * - `B` is zero, as {@link Quotient} does. The runtime gives `Infinity` or
 *   `NaN`, neither of which is a literal to return;
 * - `precision` is not a non-negative integer literal.
 *
 * Like the rest of the family, it cannot write a result in exponent form: a
 * non-zero result smaller than `0.000001` (`Divide<1, 3000000>`) resolves to the
 * family's `"The value '...' cannot be represented as bigint or number"` string.
 *
 * It uses long division over the digits of `A` plus `precision`, so the
 * default costs about 16 more digits than {@link Quotient} on the same operands.
 * Like the rest of the family, it exceeds the compiler's instantiation depth
 * once that reaches about 48 digits.
 *
 * @example
 * ```ts
 * type R = Divide<6, 3> // 2
 * type R = Divide<1, 4> // 0.25
 * type R = Divide<1, 0.5> // 2
 * type R = Divide<-7, 2> // -3.5
 * type R = Divide<1, 3> // 0.3333333333333333
 * type R = Divide<2, 3, { precision: 2 }> // 0.66
 * type R = Divide<7, 2, { precision: 0 }> // 3
 * type R = Divide<7n, 2n> // 3n -- bigint is Quotient
 *
 * type R = Divide<1, 0> // never
 * type R = Divide<number, 2> // never
 * type R = Divide<1, 0, { $fail: 'nope' }> // 'nope'
 * ```
 */
export type Divide<
	A extends number | bigint,
	B extends number | bigint,
	$O extends $StrictOptions<$O, Divide.$Options> = {},
> = [A, B] extends [number, number]
	? _Precision<$O> extends infer P extends 0[]
		? NumericStruct.Divide<
				NumericStruct.FromNumeric<A, _ResolveFail<$O>>,
				NumericStruct.FromNumeric<B, _ResolveFail<$O>>,
				P,
				_ResolveFail<$O>
			> extends infer R
			? R extends NumericStruct
				? _ToNumber<R[1], P>
				: _ResolveFail<$O>
			: never
		: _ResolveFail<$O>
	: Quotient<A, B, { $fail: _ResolveFail<$O> }>

export namespace Divide {
	export interface $Options extends $Fail.$Options {
		/**
		 * The number of fractional digits to keep, truncating toward zero.
		 * A non-negative integer literal, 16 by default.
		 */
		precision?: number | undefined
	}
	export interface $Default extends $Fail.$Default {
		precision: 16
	}
}

/**
 * The precision in `$O` as a tuple of zeros, or `'invalid'` when it is not a
 * non-negative integer literal.
 */
type _Precision<$O> = (
	$O extends { precision: infer P extends number }
		? P
		: Divide.$Default['precision']
) extends infer P extends number
	? number extends P
		? 'invalid'
		: `${P}` extends `-${string}` | `${string}.${string}`
			? 'invalid'
			: DigitArray.Zeros<P>
	: 'invalid'

/**
 * Converts the quotient to a `number`, dropping fractional digits while it has
 * more than 15 significant digits and TypeScript cannot read it back.
 */
type _ToNumber<D extends DigitsStruct, P extends 0[]> = DigitsStruct.ToString<D> extends `${infer N extends number}`
	? number extends N
		? _Drop<D, P>
		: N
	: _Drop<D, P>

type _Drop<D extends DigitsStruct, P extends 0[]> = [D[1], P] extends [
	[...infer Q extends number[], number],
	[0, ...infer PT extends 0[]],
]
	? D[1] extends [
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			unknown,
			...unknown[],
		]
		? _ToNumber<[D[0], Q, PT['length']], PT>
		: NumericStruct.ToNumeric<['number', D]>
	: NumericStruct.ToNumeric<['number', D]>
