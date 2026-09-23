import type { Tail } from '../tuple/tail.js'
import type { PadStart } from '../tuple/tuple_plus.pad_start.js'
import type { Add as NumericAdd } from './add.js'
import type { ToNegative } from './math_plus.to_negative.js'

/**
 * Internal numeric representation to perform math operations.
 *
 * NumericStruct: `[Type, DigitsStruct]`
 * DigitsStruct: `[Sign, Digits, Exponent]`
 *
 * It is similar to the floating point representation with some minor differences.
 *
 * @template Type Type of the value, either `number` or `bigint`.
 * It captures the original type of the value,
 * so that at the end of the operation,
 * the value can be adjusted accordingly.
 *
 * @template Sign Sign of the value, either `+` or `-`.
 *
 * @template Digits Digits of the value.
 * It is a tuple of digits,
 * where each digits can range from 0 to 9 during input,
 * and range from -10 to 89 during operation.
 * The max 89 comes from multiplication:
 *
 * ```
 * 99 * 9
 * => [[    9,  9], 0]
 * *  [        [9], 0]
 * => [[   81, 81], 0]
 * => [[   89,  1], 0]
 * => [[ 8, 9,  1], 0]
 * ```
 *
 * While -10 comes from subtraction:
 *
 * ```
 * 100 - 99 = 1
 * => [[  1,  0,  0], 0]
 * -  [[      9,  9], 0]
 * => [[  1, -9, -9], 0]
 * => [[  1,-10,  1], 0] // here, as in intermediate step
 * => [[  0,  0,  1], 0]
 * => [[1], 0]
 * => 1
 * ```
 *
 *
 * Unlike floating point numbers, the digits length is not limited.
 *
 * @template Exponent Exponent is the negative exponent of the number.
 *
 * ```
 * 1.23 = 123e^-2 = [[1, 2, 3], 2]
 * 0.0123 = 123e^-4 = [[1, 2, 3], 4]
 * ```
 *
 * There are 2 kinds of `NumericStruct`:
 * - Normalized: The `NumericStruct` is clean and can be converted to/from `number` or `bigint`
 * - Not normalized: The `DigitsStruct` within the `NumericStruct` is normalized,
 *   but may need to convert between `number` and `bigint`.\
 *   e.g. bigint + float => float (if possible), number + number => bigint (too big)
 *
 * During operations, the `DigitsStruct` can be not normalized,
 * but each operation should always normalize the `DigitsStruct` before returning.
 * Each operations assume the input `DigitsStruct` is normalized.
 *
 * All operations are performed in similar way:
 *
 * value -> NormalizedNumericStruct -> operation(NormalizedDigitsStruct) -> NormalizedNumericStruct -> Value
 *
 * This allows the operations to be composable.
 * */
export type NumericStruct = ['bigint' | 'number', DigitsStruct]
// These are used to reference the NumericStruct values
export type TYPE = 0
export type DIGITS_STRUCT = 1

export namespace NumericStruct {
	/**
	 * Creates a `NumericStruct` from number or bigint `N`.
	 */
	export type FromNumeric<N extends number | bigint, Fail = never> = N extends number
		? number extends N
			? Fail
			: ['number', DigitsStruct.FromNumber<N>]
		: N extends bigint
			? bigint extends N
				? Fail
				: ['bigint', DigitsStruct.FromBigint<N>]
			: never

	/**
	 * Converts a `NumericStruct` to a number or bigint.
	 *
	 * It includes the normalization of the `NumericStruct`.
	 */
	export type ToNumeric<M extends NumericStruct> =
		DigitsStruct.ToString<M[DIGITS_STRUCT]> extends infer S extends string
			? M[TYPE] extends 'bigint'
				? StringToBigint<S, StringToNumber<S, `The value '${S}' cannot be represented as bigint or number`>>
				: StringToNumber<S, StringToBigint<S, `The value '${S}' cannot be represented as bigint or number`>>
			: never

	/**
	 * `A + B` on two *maybe* `NumericStruct`s.
	 *
	 * When either input is not a `NumericStruct`, it is the failure of an
	 * earlier step (such as `FromNumeric<number, Fail>`) and is returned as-is.
	 * `A`'s failure wins when both inputs fail.
	 * A `never` input (the default `Fail`) gives `never`.
	 *
	 * @example
	 * ```ts
	 * type R = NumericStruct.Add<['number', ['+', [1], 0]], ['number', ['+', [1, 2], 1]]> // ['number', ['+', [2, 2], 1]]
	 * type R = NumericStruct.Add<'nope', ['number', ['+', [1], 0]]> // 'nope'
	 * ```
	 */
	export type Add<A, B> = A extends NumericStruct
		? B extends NumericStruct
			? [A[TYPE], DigitsStruct.Add<A[DIGITS_STRUCT], B[DIGITS_STRUCT]>]
			: B
		: A

	/**
	 * `A - B` on two *maybe* `NumericStruct`s.
	 *
	 * Failure propagates the same way as {@link NumericStruct.Add}.
	 *
	 * @example
	 * ```ts
	 * type R = NumericStruct.Subtract<['number', ['+', [3], 0]], ['number', ['+', [1], 0]]> // ['number', ['+', [2], 0]]
	 * type R = NumericStruct.Subtract<['number', ['+', [3], 0]], 'nope'> // 'nope'
	 * ```
	 */
	export type Subtract<A, B> = A extends NumericStruct
		? B extends NumericStruct
			? [A[TYPE], DigitsStruct.Subtract<A[DIGITS_STRUCT], B[DIGITS_STRUCT]>]
			: B
		: A

	/**
	 * `A * B` on two *maybe* `NumericStruct`s.
	 *
	 * Failure propagates the same way as {@link NumericStruct.Add}.
	 *
	 * @example
	 * ```ts
	 * type R = NumericStruct.Multiply<['number', ['+', [3], 0]], ['number', ['+', [4], 0]]> // ['number', ['+', [1, 2], 0]]
	 * type R = NumericStruct.Multiply<'a', 'b'> // 'a'
	 * ```
	 */
	export type Multiply<A, B> = A extends NumericStruct
		? B extends NumericStruct
			? [A[TYPE], DigitsStruct.Multiply<A[DIGITS_STRUCT], B[DIGITS_STRUCT]>]
			: B
		: A
}

// TODO: move into `NumericHelpers`
type StringToBigint<S extends string, Fail> = S extends `${infer N extends bigint}` ? N : Fail

// TODO: move into `NumericHelpers`
export type StringToNumber<S extends string, Fail> = S extends `${infer N extends number}`
	? number extends N
		? Fail
		: N
	: Fail

export type DigitsStruct = [Sign: '+' | '-', Digits: number[], Exponent: number]
// These are used to reference the DigitsStruct values
export type SIGN = 0
export type DIGITS = 1
export type EXPONENT = 2

export namespace DigitsStruct {
	/**
	 * Creates a `DigitsStruct` from number `N`.
	 *
	 * @template N Number to create `DigitsStruct` from.
	 */
	export type FromNumber<N extends number> = `${N}` extends `-${infer R}`
		? R extends `${infer W}.${infer F}`
			? [DigitArray.FromString<W>, DigitArray.FromString<F>] extends [
					infer WA extends number[],
					infer FA extends number[],
				]
				? ['-', DigitArray.TrimLeadingZeros<[...WA, ...FA]>, FA['length']]
				: never
			: ['-', DigitArray.FromString<R>, 0]
		: `${N}` extends `${infer W}.${infer F}`
			? [DigitArray.FromString<W>, DigitArray.FromString<F>] extends [
					infer WA extends number[],
					infer FA extends number[],
				]
				? ['+', DigitArray.TrimLeadingZeros<[...WA, ...FA]>, FA['length']]
				: never
			: ['+', DigitArray.FromString<`${N}`>, 0]

	/**
	 * Creates a `DigitsStruct` from bigint `N`.
	 *
	 * @template N Number to create `DigitsStruct` from.
	 */
	export type FromBigint<N extends bigint> = `${N}` extends `-${infer R}`
		? ['-', DigitArray.FromString<R>, 0]
		: ['+', DigitArray.FromString<`${N}`>, 0]

	/**
	 * Converts a `DigitsStruct` to string.
	 *
	 * @template D A normalized `DigitsStruct`.
	 */
	export type ToString<D extends DigitsStruct> = (
		PadStart<D[DIGITS], D[EXPONENT], 0> extends infer Padded extends number[]
			? Padded['length'] extends D[EXPONENT]
				? DigitArray.ToString<[0, '.', ...DigitArray.TrimTrailingZeros<Padded>]>
				: SplitFloat<Padded, D[EXPONENT]> extends [infer W extends number[], infer F extends number[]]
					? F extends []
						? DigitArray.ToString<W>
						: DigitArray.ToString<[...W, '.', ...DigitArray.TrimTrailingZeros<F>]>
					: never
			: never
	) extends infer R
		? R extends '0'
			? R
			: R extends string
				? D[SIGN] extends '-'
					? `-${R}`
					: R
				: never
		: never

	/**
	 * Splits DigitArray into the whole number and the fractional part.
	 *
	 * @note cannot use `ArrayPlus.SplitAt` as it causes infinite loop.
	 */
	type SplitFloat<A extends number[], I extends number, F extends number[] = []> = I extends 0
		? [A, []]
		: F['length'] extends I
			? [A, F]
			: A extends [...infer H extends number[], infer T extends number]
				? SplitFloat<H, I, [T, ...F]>
				: never

	/**
	 * Normalizes a `DigitsStruct`.
	 *
	 * The normalization two two things:
	 *
	 * - if the first digit is negative, it will flip the sign.
	 * - carry digits if the digit is negative or greater than 9.
	 */
	export type Normalize<
		N extends DigitsStruct,
		R extends DigitsStruct = ['+', [], 0],
	> = `${N[DIGITS][0]}` extends `-${number}`
		? Normalize<FlipSign<N>, R>
		: [N[SIGN], DigitArray.CarryDigits<N[DIGITS]>, N[EXPONENT]]

	type FlipSign<D extends DigitsStruct, I extends number[] = D[DIGITS], R extends number[] = []> = I extends []
		? D[SIGN] extends '-'
			? ['+', R, D[EXPONENT]]
			: ['-', R, D[EXPONENT]]
		: I extends [infer H extends number, ...infer T extends number[]]
			? FlipSign<D, T, [...R, Digit.FlipSign<H>]>
			: never

	/**
	 * Add `A` and `B`.
	 *
	 * @template A A normalized `DigitsStruct`.
	 * @template B B normalized `DigitsStruct`.
	 */
	export type Add<A extends DigitsStruct, B extends DigitsStruct> = Balance<A, B> extends [
		infer BA extends DigitsStruct,
		infer BB extends DigitsStruct,
	]
		? [BA[SIGN], BB[SIGN]] extends ['+', '+']
			? Normalize<['+', DigitArray.Add<BA[DIGITS], BB[DIGITS]>, BA[EXPONENT]]>
			: [BA[SIGN], BB[SIGN]] extends ['+', '-']
				? Normalize<['+', DigitArray.Subtract<BA[DIGITS], BB[DIGITS]>, BA[EXPONENT]]>
				: [BA[SIGN], BB[SIGN]] extends ['-', '+']
					? Normalize<['+', DigitArray.Subtract<BB[DIGITS], BA[DIGITS]>, BB[EXPONENT]]>
					: [BA[SIGN], BB[SIGN]] extends ['-', '-']
						? Normalize<['-', DigitArray.Add<BA[DIGITS], BB[DIGITS]>, BA[EXPONENT]]>
						: never
		: never

	export type Subtract<A extends DigitsStruct, B extends DigitsStruct> = Balance<A, B> extends [
		infer BA extends DigitsStruct,
		infer BB extends DigitsStruct,
	]
		? [BA[SIGN], BB[SIGN]] extends ['+', '+']
			? Normalize<['+', DigitArray.Subtract<BA[DIGITS], BB[DIGITS]>, BA[EXPONENT]]>
			: [BA[SIGN], BB[SIGN]] extends ['+', '-']
				? Normalize<['+', DigitArray.Add<BA[DIGITS], BB[DIGITS]>, BA[EXPONENT]]>
				: [BA[SIGN], BB[SIGN]] extends ['-', '+']
					? Normalize<['-', DigitArray.Add<BB[DIGITS], BA[DIGITS]>, BA[EXPONENT]]>
					: [BA[SIGN], BB[SIGN]] extends ['-', '-']
						? Normalize<['-', DigitArray.Subtract<BA[DIGITS], BB[DIGITS]>, BA[EXPONENT]]>
						: never
		: never

	export type Multiply<A extends DigitsStruct, B extends DigitsStruct> = NumericAdd<
		A[EXPONENT],
		B[EXPONENT]
	> extends infer Exp extends number
		? [A[SIGN], B[SIGN]] extends ['+', '+']
			? Normalize<['+', DigitArray.Multiply<A[DIGITS], B[DIGITS]>, Exp]>
			: [A[SIGN], B[SIGN]] extends ['+', '-']
				? Normalize<['-', DigitArray.Multiply<A[DIGITS], B[DIGITS]>, Exp]>
				: [A[SIGN], B[SIGN]] extends ['-', '+']
					? Normalize<['-', DigitArray.Multiply<B[DIGITS], A[DIGITS]>, Exp]>
					: [A[SIGN], B[SIGN]] extends ['-', '-']
						? Normalize<['+', DigitArray.Multiply<A[DIGITS], B[DIGITS]>, Exp]>
						: never
		: never

	/**
	 * Balance the two structs for add/subtract.
	 */
	export type Balance<A extends DigitsStruct, B extends DigitsStruct> = GetBalancePadding<
		A[EXPONENT],
		B[EXPONENT]
	> extends [infer Pads extends number[], infer Longer]
		? Longer extends 'A'
			? [A, [B[SIGN], DigitArray.TrimLeadingZeros<[...B[DIGITS], ...Pads]>, A[EXPONENT]]]
			: [[A[SIGN], DigitArray.TrimLeadingZeros<[...A[DIGITS], ...Pads]>, B[EXPONENT]], B]
		: never

	type GetBalancePadding<
		A extends number,
		B extends number,
		C extends number[] = [],
		R extends number[] = [],
	> = A extends B
		? [[], 'A']
		: R extends []
			? // have not reach min yet
				C['length'] extends A
				? GetBalancePadding<A, B, [0, ...C], [0]>
				: C['length'] extends B
					? GetBalancePadding<A, B, [0, ...C], [0, ...R]>
					: GetBalancePadding<A, B, [0, ...C], []>
			: C['length'] extends A
				? [R, 'A']
				: C['length'] extends B
					? [R, 'B']
					: GetBalancePadding<A, B, [0, ...C], [0, ...R]>

	/**
	 * This is used to align the `NumberStruct` during `Add/Subtract`.
	 */
	export type GetMinPadEnd<A extends number, B extends number, R extends number[] = []> = R['length'] extends A
		? [R, 'B']
		: R['length'] extends B
			? [R, 'A']
			: GetMinPadEnd<A, B, [0, ...R]>
}

export namespace DigitArray {
	export type FromString<S extends string> = S extends `1${infer L}`
		? [1, ...FromString<L>]
		: S extends `2${infer L}`
			? [2, ...FromString<L>]
			: S extends `3${infer L}`
				? [3, ...FromString<L>]
				: S extends `4${infer L}`
					? [4, ...FromString<L>]
					: S extends `5${infer L}`
						? [5, ...FromString<L>]
						: S extends `6${infer L}`
							? [6, ...FromString<L>]
							: S extends `7${infer L}`
								? [7, ...FromString<L>]
								: S extends `8${infer L}`
									? [8, ...FromString<L>]
									: S extends `9${infer L}`
										? [9, ...FromString<L>]
										: S extends `0${infer L}`
											? [0, ...FromString<L>]
											: S extends `-1${infer L}`
												? [-1, ...FromString<L>]
												: S extends `-2${infer L}`
													? [-2, ...FromString<L>]
													: S extends `-3${infer L}`
														? [-3, ...FromString<L>]
														: S extends `-4${infer L}`
															? [-4, ...FromString<L>]
															: S extends `-5${infer L}`
																? [-5, ...FromString<L>]
																: S extends `-6${infer L}`
																	? [-6, ...FromString<L>]
																	: S extends `-7${infer L}`
																		? [-7, ...FromString<L>]
																		: S extends `-8${infer L}`
																			? [-8, ...FromString<L>]
																			: S extends `-9${infer L}`
																				? [-9, ...FromString<L>]
																				: S extends `-0${infer L}`
																					? [-0, ...FromString<L>]
																					: []

	export type ToString<A extends Array<number | string>> = number extends A['length']
		? ''
		: A['length'] extends 0
			? ''
			: `${A[0]}${ToString<Tail<A>>}`

	/**
	 * [0, 0, -1] => [-1]
	 *
	 * This is used in various places so that there will be less computation,
	 * and the sign bit can be handled properly.
	 */
	export type TrimLeadingZeros<T extends number[]> = T extends [0]
		? T
		: T extends [0, ...infer Tail extends number[]]
			? TrimLeadingZeros<Tail>
			: T
	export type TrimTrailingZeros<T extends number[]> = T extends [0]
		? T
		: T extends [...infer Tail extends number[], 0]
			? TrimTrailingZeros<Tail>
			: T

	export type Add<A extends number[], B extends number[], R extends number[] = []> = A extends []
		? B extends []
			? R
			: B extends [...infer BH extends number[], infer BL extends number]
				? Add<[], BH, [BL, ...R]>
				: never
		: B extends []
			? A extends [...infer AH extends number[], infer AL extends number]
				? Add<AH, [], [AL, ...R]>
				: never
			: [A, B] extends [
						[...infer AH extends number[], infer AL extends number],
						[...infer BH extends number[], infer BL extends number],
					]
				? Add<AH, BH, [Digit.Add<AL, BL>, ...R]>
				: never

	export type Subtract<A extends number[], B extends number[], R extends number[] = []> = A extends []
		? B extends []
			? TrimLeadingZeros<R>
			: B extends [...infer BH extends number[], infer BL extends number]
				? Subtract<[], BH, [ToNegative<BL>, ...R]>
				: never
		: B extends []
			? A extends [...infer AH extends number[], infer AL extends number]
				? Subtract<AH, [], [AL, ...R]>
				: never
			: [A, B] extends [
						[...infer AH extends number[], infer AL extends number],
						[...infer BH extends number[], infer BL extends number],
					]
				? Subtract<AH, BH, [Digit.Subtract<AL, BL>, ...R]>
				: never

	export type Multiply<A extends number[], B extends number[], R extends number[][] = []> = B extends []
		? RecursiveAdd<R>
		: B extends [infer Head extends number, ...infer Tail extends number[]]
			? Multiply<A, Tail, [...R, CarryDigits<MultiplyArray<A, Head, Zeros<Tail['length']>>>]>
			: never

	type Zeros<N extends number, R extends number[] = []> = N extends unknown
		? R['length'] extends N
			? R
			: Zeros<N, [0, ...R]>
		: never

	type MultiplyArray<A extends number[], B extends number, Pad extends number[], R extends number[] = []> = B extends 0
		? [0]
		: B extends 1
			? [...A, ...Pad]
			: A extends []
				? [...R, ...Pad]
				: A extends [infer H extends number, ...infer T extends number[]]
					? MultiplyArray<T, B, Pad, [...R, Digit.Multiply<H, B>]>
					: never

	/**
	 * Recursively add digit arrays.
	 *
	 * This is used in multiplication.
	 */
	type RecursiveAdd<E extends number[][], R extends number[] = []> = E extends []
		? R
		: E extends [infer H extends number[], ...infer T extends number[][]]
			? RecursiveAdd<T, CarryDigits<Add<R, H>>>
			: never

	export type CarryDigits<N extends number[], R extends number[] = []> = N extends []
		? TrimLeadingZeros<R>
		: N extends [infer Tail extends number]
			? `${Tail}` extends `${infer T1 extends number}${infer T2 extends number}`
				? CarryDigits<[], [T1, T2, ...R]>
				: `${Tail}` extends `-${infer T1 extends number}${infer T2 extends number}`
					? `-${T1}` extends `${infer NT extends number}`
						? CarryDigits<[], [NT, T2, ...R]>
						: never
					: CarryDigits<[], [Tail, ...R]>
			: N extends [infer Head extends number, infer Tail extends number]
				? `${Tail}` extends `${infer T1 extends number}${infer T2 extends number}`
					? CarryDigits<[Digit.Add<Head, T1>], [T2, ...R]>
					: `${Tail}` extends `-${infer T1 extends number}${infer T2 extends number}`
						? `-${T1}` extends `${infer NT extends number}`
							? CarryDigits<[Digit.Add<Head, NT>], [T2, ...R]>
							: never
						: `${Tail}` extends `-${number}`
							? CarryDigits<[Digit.Add<Head, -1>], [Digit.Plus10[Tail], ...R]>
							: CarryDigits<[Head], [Tail, ...R]>
				: N extends [...infer Heads extends number[], infer Head extends number, infer Tail extends number]
					? `${Tail}` extends `${infer T1 extends number}${infer T2 extends number}`
						? CarryDigits<[...Heads, Digit.Add<Head, T1>], [T2, ...R]>
						: `${Tail}` extends `-${infer T1 extends number}${infer T2 extends number}`
							? `-${T1}` extends `${infer NT extends number}`
								? CarryDigits<[...Heads, Digit.Add<Head, NT>], [T2, ...R]>
								: never
							: `${Tail}` extends `-${number}`
								? CarryDigits<[...Heads, Digit.Add<Head, -1>], [Digit.Plus10[Tail], ...R]>
								: CarryDigits<[...Heads, Head], [Tail, ...R]>
					: never
}

export namespace Digit {
	/**
	 * Adds two `Digit`.
	 *
	 * add: A: 0 - 9, B: 0 - 9
	 * normalize: [81, 81] -> [81 + 8, 1]
	 */
	export type Add<A extends number, B extends number> = `${A}` extends `-${infer AD extends number}`
		? `${B}` extends `-${infer BD extends number}`
			? ToNegative<PositiveEntryAdd<AD, BD>>
			: Subtract<B, AD>
		: `${B}` extends `-${infer BD extends number}`
			? Subtract<A, BD>
			: PositiveEntryAdd<A, B>

	export type FlipSign<T extends number> = T extends 0
		? 0
		: `${T}` extends `-${infer R extends number}`
			? R
			: `-${T}` extends `${infer R extends number}`
				? R
				: never

	type PositiveEntryAdd<A extends number, B extends number> = [
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		[2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
		[3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
		[5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		[6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
		[7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		[8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
		[9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
		[10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
		[11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
		[12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
		[13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
		[14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
		[15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		[16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
		[17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
		[18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
		[19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
		[20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
		[21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
		[22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
		[23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
		[24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
		[25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
		[26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
		[27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
		[28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
		[29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
		[30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
		[31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
		[32, 33, 34, 35, 36, 37, 38, 39, 40, 41],
		[33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
		[34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
		[35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
		[36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
		[37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
		[38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
		[39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
		[40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
		[41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
		[42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
		[43, 44, 45, 46, 47, 48, 49, 50, 51, 52],
		[44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
		[45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
		[46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
		[47, 48, 49, 50, 51, 52, 53, 54, 55, 56],
		[48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
		[49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
		[50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
		[51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
		[52, 53, 54, 55, 56, 57, 58, 59, 60, 61],
		[53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
		[54, 55, 56, 57, 58, 59, 60, 61, 62, 63],
		[55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
		[56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
		[57, 58, 59, 60, 61, 62, 63, 64, 65, 66],
		[58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
		[59, 60, 61, 62, 63, 64, 65, 66, 67, 68],
		[60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
		[61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
		[62, 63, 64, 65, 66, 67, 68, 69, 70, 71],
		[63, 64, 65, 66, 67, 68, 69, 70, 71, 72],
		[64, 65, 66, 67, 68, 69, 70, 71, 72, 73],
		[65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
		[66, 67, 68, 69, 70, 71, 72, 73, 74, 75],
		[67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
		[68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
		[69, 70, 71, 72, 73, 74, 75, 76, 77, 78],
		[70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
		[71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
		[72, 73, 74, 75, 76, 77, 78, 79, 80, 81],
		[73, 74, 75, 76, 77, 78, 79, 80, 81, 82],
		[74, 75, 76, 77, 78, 79, 80, 81, 82, 83],
		[75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
		[76, 77, 78, 79, 80, 81, 82, 83, 84, 85],
		[77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
		[78, 79, 80, 81, 82, 83, 84, 85, 86, 87],
		[79, 80, 81, 82, 83, 84, 85, 86, 87, 88],
		[80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
		[81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
	][A][B]

	/**
	 * Subtract two positive numbers.
	 * The number range from 0 to 81.
	 */
	export type Subtract<A extends number, B extends number> = [`${A}`, `${B}`] extends [
		`${number}${infer A2 extends number}`,
		`${number}${infer B2 extends number}`,
	]
		? Subtract<A2, B2>
		: `${A}` extends `${number}${infer A2 extends number}`
			? Subtract<A2, B>
			: `${B}` extends `${number}${infer B2 extends number}`
				? Subtract<A, B2>
				: SingleDigitSubtract<A, B>

	export type SingleDigitSubtract<A extends number, B extends number> = [
		[0, -1, -2, -3, -4, -5, -6, -7, -8, -9],
		[1, 0, -1, -2, -3, -4, -5, -6, -7, -8],
		[2, 1, 0, -1, -2, -3, -4, -5, -6, -7],
		[3, 2, 1, 0, -1, -2, -3, -4, -5, -6],
		[4, 3, 2, 1, 0, -1, -2, -3, -4, -5],
		[5, 4, 3, 2, 1, 0, -1, -2, -3, -4],
		[6, 5, 4, 3, 2, 1, 0, -1, -2, -3],
		[7, 6, 5, 4, 3, 2, 1, 0, -1, -2],
		[8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
		[9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
	][A][B]

	export type Plus10 = { [k in number]: number } & {
		'-1': 9
		'-2': 8
		'-3': 7
		'-4': 6
		'-5': 5
		'-6': 4
		'-7': 3
		'-8': 2
		'-9': 1
	}
	export type Multiply<A extends number, B extends number> = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
		[0, 2, 4, 6, 8, 10, 12, 14, 16, 18],
		[0, 3, 6, 9, 12, 15, 18, 21, 24, 27],
		[0, 4, 8, 12, 16, 20, 24, 28, 32, 36],
		[0, 5, 10, 15, 20, 25, 30, 35, 40, 45],
		[0, 6, 12, 18, 24, 30, 36, 42, 48, 54],
		[0, 7, 14, 21, 28, 35, 42, 49, 56, 63],
		[0, 8, 16, 24, 32, 40, 48, 56, 64, 72],
		[0, 9, 18, 27, 36, 45, 54, 63, 72, 81],
	][A][B]
}
