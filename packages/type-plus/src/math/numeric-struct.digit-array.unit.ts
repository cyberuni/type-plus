import { describe, it } from 'vitest'

import { testType } from '../index.js'
import type { DigitArray } from './numeric-struct.js'

describe('Subtract', () => {
	it('A < B', () => {
		testType.equal<DigitArray.Subtract<[1], [1, 0]>, [-1, 1]>(true)

		testType.equal<DigitArray.Subtract<[1, 3, 5, 7, 9], [9, 7, 5, 3, 1]>, [-8, -4, 0, 4, 8]>(true)

		testType.equal<DigitArray.Subtract<[1, 0], [1, 2]>, [-2]>(true)
	})
})
