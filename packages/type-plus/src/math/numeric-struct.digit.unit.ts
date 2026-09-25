import { it } from 'vitest'

import { testType } from '../index.js'
import type { Digit } from './numeric-struct.js'

it('adds single digit', () => {
	testType.equal<Digit.Add<0, 0>, 0>(true)
	testType.equal<Digit.Add<0, 1>, 1>(true)
	testType.equal<Digit.Add<0, 9>, 9>(true)
	testType.equal<Digit.Add<1, 0>, 1>(true)
	testType.equal<Digit.Add<1, 9>, 10>(true)
	testType.equal<Digit.Add<9, 9>, 18>(true)
})

it('subtracts single digit', () => {
	testType.equal<Digit.Subtract<0, 0>, 0>(true)
	testType.equal<Digit.Subtract<0, 1>, -1>(true)
	testType.equal<Digit.Subtract<0, 9>, -9>(true)
	testType.equal<Digit.Subtract<1, 0>, 1>(true)
	testType.equal<Digit.Subtract<1, 9>, -8>(true)
	testType.equal<Digit.Subtract<9, 9>, 0>(true)
})

it('multiply single digit', () => {
	testType.equal<Digit.Multiply<0, 0>, 0>(true)
	testType.equal<Digit.Multiply<0, 1>, 0>(true)
	testType.equal<Digit.Multiply<0, 9>, 0>(true)

	testType.equal<Digit.Multiply<1, 0>, 0>(true)
	testType.equal<Digit.Multiply<1, 1>, 1>(true)
	testType.equal<Digit.Multiply<1, 9>, 9>(true)

	testType.equal<Digit.Multiply<9, 0>, 0>(true)
	testType.equal<Digit.Multiply<9, 1>, 9>(true)
	testType.equal<Digit.Multiply<9, 9>, 81>(true)
})
