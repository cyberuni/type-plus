import { describe, it } from 'vitest'

import { type Add, type Increment, testType } from '../index.js'

// 123 + 123 = 246
// => [[1, 2, 3], 0]
// +  [[1, 2, 3], 0]
// => [[1 + 1, 2 + 2, 3 + 3], 0 + 0]
// => [[2, 4, 6], 0]

// 13579 + 97531 = 111110
// => [[1, 3, 5, 7, 9], 0]
// +  [[9, 7, 5, 3, 1], 0]
// => [     [10, 10, 10, 10, 10], 0]
// => [[  1,  1,  1,  1,  1,  0], 0]

// 135 + 3579 = 3714
// => [   [1, 3, 5], 0]
// +  [[3, 5, 7, 9], 0]
// => [[3, 6,10,14], 0]
// => [[3, 7, 1, 4], 0]

// 1357.9 + 13.579 = 1371.479
// => [[1, 3, 5, 7, 9], 1]
// +  [[1, 3, 5, 7, 9], 3]
// => [[ 1, 3, 5, 7, 9, 0, 0], 3]
// +  [      [ 1, 3, 5, 7, 9], 3]
// => [[ 1, 3, 7, 1, 4, 7, 9], 3]
// => [[ 1, 3, 7, 1, 4, 7, 9], 3]
// => 1371.479

// 0 + 0.001 = 0.001
// => [[0], 0]
// +  [[1], 3]
// => [[0], 3]
// +  [[1], 3]
// => [[1], 3]
// => [[0, 0, 0, 1], 3]
// => 0.001

// 0.1357 + 0.009753 = 0.145453
// => [         [1, 3, 5, 7], 4]
// +  [         [9, 7, 5, 3], 6]
// => [   [1, 3, 5, 7, 0, 0], 6]
// +  [   [      9, 7, 5, 3], 6]
// => [   [1, 4, 5, 4, 5, 3], 6]
// => [[0, 1, 4, 5, 4, 5, 3], 6]
// => 0.145453

/**
 * Algorithm:
 *
 * Add<A, B> = NumericStruct.ToNumeric<
 *    NumericStruct.Add<
 *     NumericStruct.FromNumeric<A>,
 *     NumericStruct.FromNumeric<B>
 *   >
 * >
 *
 * NumericStruct.Add<A, B> = [A[TYPE], DigitsStruct.Add<A, B>]
 * DigitsStruct.Add<A, B> = DigitsStruct.AlignExponent<A, B> extends [infer X, infer Y, infer Exp]
 * ? DigitsStruct.Normalize<[A[SIGN], DigitsArray.Add<X[DIGITS], Y[DIGITS]>, Exp]>
 * : never
 *
 * DigitsStruct.Normalize<D> = DigitsStruct.ShiftDigits<DigitsStruct.FixSign<D>>
 */
it('adds two positive bigints', () => {
	testType.equal<Add<1n, 1n>, 2n>(true)

	testType.equal<Add<1n, 10n>, 11n>(true)
	testType.equal<Add<10n, 1n>, 11n>(true)

	testType.equal<Add<123n, 123n>, 246n>(true)

	testType.equal<Add<19n, 1n>, 20n>(true)
	testType.equal<Add<1n, 19n>, 20n>(true)

	testType.equal<Add<13579n, 97531n>, 111110n>(true)
})

it('adds two negative bigints', () => {
	testType.equal<Add<-1n, -1n>, -2n>(true)

	testType.equal<Add<-1n, -10n>, -11n>(true)
	testType.equal<Add<-10n, -1n>, -11n>(true)

	testType.equal<Add<-123n, -123n>, -246n>(true)

	testType.equal<Add<-19n, -1n>, -20n>(true)
	testType.equal<Add<-1n, -19n>, -20n>(true)

	testType.equal<Add<-13579n, -97531n>, -111110n>(true)
})

it('adds a negative bigint to a positive bigint', () => {
	testType.equal<Add<1n, -1n>, 0n>(true)
	testType.equal<Add<10n, -1n>, 9n>(true)
})

it('bigint + int = bigint', () => {
	testType.equal<Add<1n, 1>, 2n>(true)
})

it('bigint + floating point = floating point', () => {
	testType.equal<Add<1n, 1.2>, 2.2>(true)
})

it('bigint + floating point = floating point', () => {
	testType.equal<
		Add<9007199254740992n, 1.2>,
		"The value '9007199254740993.2' cannot be represented as bigint or number"
	>(true)
})

describe('single digit', () => {
	it('0 + n = n', () => {
		testType.equal<Add<0, 0>, 0>(true)
		testType.equal<Add<0, 1>, 1>(true)
		testType.equal<Add<0, 2>, 2>(true)
		testType.equal<Add<0, 3>, 3>(true)
		testType.equal<Add<0, 4>, 4>(true)
		testType.equal<Add<0, 5>, 5>(true)
		testType.equal<Add<0, 6>, 6>(true)
		testType.equal<Add<0, 7>, 7>(true)
		testType.equal<Add<0, 8>, 8>(true)
		testType.equal<Add<0, 9>, 9>(true)
	})
	it('9 + n', () => {
		testType.equal<Add<9, 0>, 9>(true)
		testType.equal<Add<9, 1>, 10>(true)
		testType.equal<Add<9, 2>, 11>(true)
		testType.equal<Add<9, 3>, 12>(true)
		testType.equal<Add<9, 4>, 13>(true)
		testType.equal<Add<9, 5>, 14>(true)
		testType.equal<Add<9, 6>, 15>(true)
		testType.equal<Add<9, 7>, 16>(true)
		testType.equal<Add<9, 8>, 17>(true)
		testType.equal<Add<9, 9>, 18>(true)
	})
})

it('1 + 2 digits', () => {
	testType.equal<Add<3, 13>, 16>(true)
	testType.equal<Add<9, 99>, 108>(true)
})

it('2 + 1 digits', () => {
	testType.equal<Add<13, 3>, 16>(true)
	testType.equal<Add<99, 9>, 108>(true)
})

it('2 + 2 digits', () => {
	testType.equal<Add<10, 10>, 20>(true)
	testType.equal<Add<19, 19>, 38>(true)
})

it('n + n digits', () => {
	testType.equal<Add<1234, 6543>, 7777>(true)
})

it('-A + B', () => {
	testType.equal<Add<-1, 1>, 0>(true)
})

it('B is floating point', () => {
	testType.equal<Add<1, 1.2>, 2.2>(true)
})

it('A + -B', () => {
	testType.equal<Add<1, -1>, 0>(true)
})

it('adds two negative numbers', () => {
	testType.equal<Add<-1, -2>, -3>(true)
})

it('adds decimals exactly, unlike `0.1 + 0.2 === 0.30000000000000004` at runtime', () => {
	testType.equal<Add<0.1, 0.2>, 0.3>(true)
})

it('has no overflow guard', () => {
	testType.equal<Add<9007199254740991, 1>, 9007199254740992>(true)
})

it('a whole number result from fractional inputs cannot be represented', () => {
	testType.equal<Add<1.5, 2.5>, "The value '4.0' cannot be represented as bigint or number">(true)
})

it('widen type gets Fail', () => {
	testType.never<Add<number, 1>>(true)
	testType.never<Add<1, number>>(true)

	testType.equal<Add<number, 1, number>, number>(true)
	testType.equal<Add<1, number, number>, number>(true)

	testType.never<Add<bigint, 1>>(true)
	testType.never<Add<1, bigint>>(true)

	testType.equal<Add<bigint, 1, bigint>, bigint>(true)
	testType.equal<Add<1, bigint, bigint>, bigint>(true)
})

it('Increment adds one to a number', () => {
	testType.equal<Increment<1>, 2>(true)
	testType.equal<Increment<-1>, 0>(true)
	testType.equal<Increment<1.5>, 2.5>(true)
})

it('Increment adds one to a bigint', () => {
	testType.equal<Increment<1n>, 2n>(true)
})

it('Increment of a widen type gets Fail', () => {
	testType.never<Increment<number>>(true)
})
