import { describe, it } from 'vitest'

import { type Decrement, type Subtract, testType } from '../index.js'

// 123 - 123 = 0
// => [[1, 2, 3], 0]
// -  [[1, 2, 3], 0]
// => [[0, 0, 0], 0]
// => [[0], 0]
// => 0

// 13579 - 97531 = -83952
// =>   [[  1,  3,  5,  7,  9], 0]
// -    [[  9,  7,  5,  3,  1], 0]
// =>   [[ -8, -4,  0,  4,  8], 0]
// => - [[  8,  4,  0, -4, -8], 0]
// => - [[  8,  3,  9,  5,  2], 0]

// 135 - 3579 = -3444
// =>   [    [  1,  3,  5], 0]
// -    [[  3,  5,  7,  9], 0]
// =>   [[ -3, -4, -4, -4], 0]
// => - [[  3,  4,  4,  4], 0]

// 1357.9 - 13.579 = 1344.321
// => [[1, 3, 5, 7, 9], 1]
// -  [[1, 3, 5, 7, 9], 3]
// => [[ 1, 3, 5, 7, 9,  0,  0], 3]
// -  [      [ 1, 3, 5,  7,  9], 3]
// => [[ 1, 3, 4, 4, 4, -7, -9], 3]
// => [[ 1, 3, 4, 4, 3,  2,  1], 3]

// 100 - 99 = 1
// => [[  1,  0,  0], 0]
// -  [[      9,  9], 0]
// => [[  1, -9, -9], 0]
// => [[  1,-10,  1], 0]
// => [[  0,  0,  1], 0]
// => [[1], 0]
// => 1

// 0 - 0.001 = -0.001
// =>   [[ 0], 0]
// -    [[ 1], 3]
// =>   [[ 0], 3]
// -    [[ 1], 3]
// =>   [[-1], 3]
// => - [[ 1], 3]
// => - [[ 0, 0, 0, 1], 3]
// => -0.001

// 0.1357 - 0.009753 = 0.125947
// =>   [            [  1,  3,  5,  7], 4]
// -    [            [  9,  7,  5,  3], 6]
// =>   [    [  1,  3,  5,  7,  0,  0], 6]
// -    [            [  9,  7,  5,  3], 6]
// =>   [    [  1,  3, -4,  0, -5, -3], 6]
// =>   [    [  1,  2,  5,  9,  4,  7], 6]
// =>   [[  0,  1,  2,  5,  9,  4,  7], 6]
// => 0.125947

// 0.009753 -  0.1357 = -0.125947
// =>   [        [  9,  7,  5,  3], 6]
// -    [        [  1,  3,  5,  7], 4]
// =>   [        [  9,  7,  5,  3], 6]
// -    [[  1,  3,  5,  7,  0,  0], 6]
// =>   [[ -1, -3,  4,  0,  5,  3], 6]
// => - [[  1,  3, -4,  0, -5, -3], 6]
// => - [[  1,  2,  5,  9,  4,  7], 6]

// 123 - 777 = -654
// =>   [[ 1,  2,  3], 0]
// -    [[ 7,  7,  7], 0]
// =>   [[-6, -5, -4], 0]
// => - [[ 6,  5,  4], 0]

it('bigint A >= B', () => {
	testType.equal<Subtract<1n, 1n>, 0n>(true)
	testType.equal<Subtract<123n, 123n>, 0n>(true)

	testType.equal<Subtract<10n, 1n>, 9n>(true)
	testType.equal<Subtract<19n, 1n>, 18n>(true)
	testType.equal<Subtract<100n, 1n>, 99n>(true)
	testType.equal<Subtract<97531n, 13579n>, 83952n>(true)
	testType.equal<Subtract<9007199254740993n, 3n>, 9007199254740990n>(true)
})

it('bigint A < B', () => {
	testType.equal<Subtract<1n, 10n>, -9n>(true)
	testType.equal<Subtract<1n, 19n>, -18n>(true)
	testType.equal<Subtract<13579n, 97531n>, -83952n>(true)
	testType.equal<Subtract<3n, 9007199254740993n>, -9007199254740990n>(true)
})

it('bigint -A <= -B', () => {
	testType.equal<Subtract<-1n, -1n>, 0n>(true)
	testType.equal<Subtract<-123n, -123n>, 0n>(true)

	testType.equal<Subtract<-10n, -1n>, -9n>(true)
	testType.equal<Subtract<-19n, -1n>, -18n>(true)
	testType.equal<Subtract<-97531n, -13579n>, -83952n>(true)
	testType.equal<Subtract<-9007199254740993n, -3n>, -9007199254740990n>(true)
})

it('bigint -A > -B', () => {
	testType.equal<Subtract<-1n, -10n>, 9n>(true)
	testType.equal<Subtract<-1n, -19n>, 18n>(true)
	testType.equal<Subtract<-13579n, -97531n>, 83952n>(true)
	testType.equal<Subtract<-3n, -9007199254740993n>, 9007199254740990n>(true)
})

it('subtracts bigint where A > 0, B < 0 => A + B', () => {
	testType.equal<Subtract<1n, -1n>, 2n>(true)
	testType.equal<Subtract<10n, -1n>, 11n>(true)
})

it('subtracts bigint where A < 0, B > 0 => - (A + B)', () => {
	testType.equal<Subtract<-1n, 1n>, -2n>(true)
	testType.equal<Subtract<-10n, 1n>, -11n>(true)
})

it('bigint + int = bigint', () => {
	testType.equal<Subtract<1n, 1>, 0n>(true)
})

it('bigint + floating point = floating point', () => {
	testType.equal<Subtract<1n, 0.2>, 0.8>(true)
	testType.equal<Subtract<1n, 1.2>, -0.2>(true)

	testType.equal<
		Subtract<9007199254740994n, 0.2>,
		"The value '9007199254740993.8' cannot be represented as bigint or number"
	>(true)
})

describe('single digit', () => {
	it('0 - n = -n', () => {
		testType.equal<Subtract<0, 0>, 0>(true)
		testType.equal<Subtract<0, 1>, -1>(true)
		testType.equal<Subtract<0, 2>, -2>(true)
		testType.equal<Subtract<0, 3>, -3>(true)
		testType.equal<Subtract<0, 4>, -4>(true)
		testType.equal<Subtract<0, 5>, -5>(true)
		testType.equal<Subtract<0, 6>, -6>(true)
		testType.equal<Subtract<0, 7>, -7>(true)
		testType.equal<Subtract<0, 8>, -8>(true)
		testType.equal<Subtract<0, 9>, -9>(true)
	})
	it('9 - n', () => {
		testType.equal<Subtract<9, 0>, 9>(true)
		testType.equal<Subtract<9, 1>, 8>(true)
		testType.equal<Subtract<9, 2>, 7>(true)
		testType.equal<Subtract<9, 3>, 6>(true)
		testType.equal<Subtract<9, 4>, 5>(true)
		testType.equal<Subtract<9, 5>, 4>(true)
		testType.equal<Subtract<9, 6>, 3>(true)
		testType.equal<Subtract<9, 7>, 2>(true)
		testType.equal<Subtract<9, 8>, 1>(true)
		testType.equal<Subtract<9, 9>, 0>(true)
	})
	it('9 - -n', () => {
		testType.equal<Subtract<9, 0>, 9>(true)
		testType.equal<Subtract<9, -1>, 10>(true)
		testType.equal<Subtract<9, -2>, 11>(true)
		testType.equal<Subtract<9, -3>, 12>(true)
		testType.equal<Subtract<9, -4>, 13>(true)
		testType.equal<Subtract<9, -5>, 14>(true)
		testType.equal<Subtract<9, -6>, 15>(true)
		testType.equal<Subtract<9, -7>, 16>(true)
		testType.equal<Subtract<9, -8>, 17>(true)
		testType.equal<Subtract<9, -9>, 18>(true)
	})
})

it('1 - 2 digits', () => {
	testType.equal<Subtract<3, 13>, -10>(true)
	testType.equal<Subtract<9, 99>, -90>(true)
})

it('2 + 1 digits', () => {
	testType.equal<Subtract<13, 3>, 10>(true)
	testType.equal<Subtract<99, 9>, 90>(true)
})

it('2 + 2 digits', () => {
	testType.equal<Subtract<10, 10>, 0>(true)
	testType.equal<Subtract<19, 19>, 0>(true)
	testType.equal<Subtract<99, 11>, 88>(true)
	testType.equal<Subtract<11, 99>, -88>(true)
})

it('n + n digits', () => {
	testType.equal<Subtract<1234, 6543>, -5309>(true)
	testType.equal<Subtract<6543, 1234>, 5309>(true)
})

it('-A + B', () => {
	testType.equal<Subtract<-1, 1>, -2>(true)
})

it('B is floating point', () => {
	testType.equal<Subtract<2, 1.2>, 0.8>(true)
})

it('A + -B', () => {
	testType.equal<Subtract<1, -1>, 2>(true)
})

it('subtracts two floating points', () => {
	testType.equal<Subtract<1.5, 1.4>, 0.1>(true)
})

it('a whole number result from fractional inputs cannot be represented', () => {
	testType.equal<Subtract<1.5, 0.5>, "The value '1.0' cannot be represented as bigint or number">(true)
})

it('widen type gets Fail', () => {
	testType.never<Subtract<number, 1>>(true)
	testType.never<Subtract<1, number>>(true)

	testType.equal<Subtract<number, 1, number>, number>(true)
	testType.equal<Subtract<1, number, number>, number>(true)

	testType.never<Subtract<bigint, 1>>(true)
	testType.never<Subtract<1, bigint>>(true)

	testType.equal<Subtract<bigint, 1, bigint>, bigint>(true)
	testType.equal<Subtract<1, bigint, bigint>, bigint>(true)
})

it('Decrement subtracts one from a number', () => {
	testType.equal<Decrement<1>, 0>(true)
	testType.equal<Decrement<0>, -1>(true)
	testType.equal<Decrement<1.5>, 0.5>(true)
})

it('Decrement subtracts one from a bigint', () => {
	testType.equal<Decrement<1n>, 0n>(true)
})

it('Decrement of a widen type gets Fail', () => {
	testType.never<Decrement<number>>(true)
})
