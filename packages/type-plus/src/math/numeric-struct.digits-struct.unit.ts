import { describe, it } from 'vitest'

import { testType } from '../index.js'
import type { DigitsStruct } from './numeric-struct.js'

describe('Normalize', () => {
	it('remain unchanged if every digits are single digits for bigint', () => {
		testType.equal<DigitsStruct.Normalize<['+', [0], 0]>, ['+', [0], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [9], 0]>, ['+', [9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [1, 2, 3], 0]>, ['+', [1, 2, 3], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [1, 2, 3], 1]>, ['+', [1, 2, 3], 1]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [0, 0, 1, 2, 3], 4]>, ['+', [1, 2, 3], 4]>(true)

		testType.equal<DigitsStruct.Normalize<['-', [0], 0]>, ['-', [0], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [9], 0]>, ['-', [9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [1, 2, 3], 0]>, ['-', [1, 2, 3], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [1, 2, 3], 1]>, ['-', [1, 2, 3], 1]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [0, 0, 1, 2, 3], 4]>, ['-', [1, 2, 3], 4]>(true)
	})

	it('carry over when digit > 10', () => {
		testType.equal<DigitsStruct.Normalize<['+', [10], 0]>, ['+', [1, 0], 0]>(true)

		testType.equal<DigitsStruct.Normalize<['+', [81], 0]>, ['+', [8, 1], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [89], 0]>, ['+', [8, 9], 0]>(true)

		testType.equal<DigitsStruct.Normalize<['+', [1, 10], 0]>, ['+', [2, 0], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [1, 81], 0]>, ['+', [9, 1], 0]>(true)

		testType.equal<DigitsStruct.Normalize<['+', [81, 81], 0]>, ['+', [8, 9, 1], 0]>(true)

		testType.equal<DigitsStruct.Normalize<['+', [9, 9, 9, 9, 10], 0]>, ['+', [1, 0, 0, 0, 0, 0], 0]>(true)
	})

	it('carry over when digit < 0 (the most negative it can get is -10', () => {
		testType.equal<DigitsStruct.Normalize<['+', [2, -1], 0]>, ['+', [1, 9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [2, -10, 3], 0]>, ['+', [1, 0, 3], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [1, -1], 0]>, ['+', [9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [1, 0, -1], 0]>, ['+', [9, 9], 0]>(true)

		testType.equal<DigitsStruct.Normalize<['-', [2, -1], 0]>, ['-', [1, 9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [2, -10, 3], 0]>, ['-', [1, 0, 3], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [1, -1], 0]>, ['-', [9], 0]>(true)
	})

	it('flips sign when first digit is negative, and then normalize', () => {
		testType.equal<DigitsStruct.Normalize<['+', [-1, 2, -3], 0]>, ['-', [8, 3], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['-', [-1, 2, -3], 0]>, ['+', [8, 3], 0]>(true)

		testType.equal<DigitsStruct.Normalize<['+', [-9], 0]>, ['-', [9], 0]>(true)
		testType.equal<DigitsStruct.Normalize<['+', [-8, -4, 0, 4, 8], 0]>, ['-', [8, 3, 9, 5, 2], 0]>(true)
	})
})

describe('Balance', () => {
	it('returns origin if they has the same exponent', () => {
		testType.equal<
			DigitsStruct.Balance<['+', [1, 2, 3], 0], ['+', [4, 5, 6], 0]>,
			[['+', [1, 2, 3], 0], ['+', [4, 5, 6], 0]]
		>(true)
	})
	it('balances the struct when they have different exponent', () => {
		testType.equal<DigitsStruct.Balance<['+', [1], 0], ['+', [1, 2], 1]>, [['+', [1, 0], 1], ['+', [1, 2], 1]]>(true)

		testType.equal<DigitsStruct.Balance<['+', [0], 0], ['+', [1], 3]>, [['+', [0], 3], ['+', [1], 3]]>(true)

		// 0.001 + 1.2 = 1.201
		// => ['+',          [1], 3]
		// +  ['+',       [1, 2], 1]
		// => ['+',          [1], 3]
		// +  ['+', [1, 2, 0, 0], 3]
		// => ['+', [1, 2, 0, 1], 3]
		// => 1.201
		testType.equal<DigitsStruct.Balance<['+', [1], 3], ['+', [1, 2], 1]>, [['+', [1], 3], ['+', [1, 2, 0, 0], 3]]>(true)

		testType.equal<
			DigitsStruct.Balance<['+', [1, 3, 5, 7], 4], ['+', [9, 7, 5, 3], 6]>,
			[['+', [1, 3, 5, 7, 0, 0], 6], ['+', [9, 7, 5, 3], 6]]
		>(true)

		testType.equal<DigitsStruct.Balance<['+', [1], 0], ['+', [1, 2], 1]>, [['+', [1, 0], 1], ['+', [1, 2], 1]]>(true)
	})
})

describe('GetMinPadEnd', () => {
	it('returns [0, M] if one of the value is 0', () => {
		testType.equal<DigitsStruct.GetMinPadEnd<0, 1>, [[], 'B']>(true)
		testType.equal<DigitsStruct.GetMinPadEnd<2, 0>, [[], 'A']>(true)
	})

	it('returns [[0...n], M]', () => {
		testType.equal<DigitsStruct.GetMinPadEnd<4, 1>, [[0], 'A']>(true)
		testType.equal<DigitsStruct.GetMinPadEnd<3, 7>, [[0, 0, 0], 'B']>(true)
	})
})

describe('Subtract', () => {
	it('A < B', () => {
		testType.equal<DigitsStruct.Subtract<['+', [1], 0], ['+', [1, 0], 0]>, ['-', [9], 0]>(true)
	})

	it('works with integer - floating point', () => {
		testType.equal<DigitsStruct.Subtract<['+', [1], 0], ['+', [2], 1]>, ['+', [8], 1]>(true)

		// 1 - 1.2 = -0.2
		// =>   [   [  1], 0]
		// -    [[ 1,  2], 1]
		// =>   [[ 1,  0], 1]
		// -    [[ 1,  2], 1]
		// =>   [[ 0, -2], 1]
		// =>   [   [ -2], 1]
		// => - [   [  2], 1]
		// => - [[ 0,  2], 1]
		// => -0.2
		testType.equal<DigitsStruct.Subtract<['+', [1], 0], ['+', [1, 2], 1]>, ['-', [2], 1]>(true)
	})
})
