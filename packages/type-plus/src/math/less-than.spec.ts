import { it } from 'vitest'

import { type GreaterThan, type LessThan, testType } from '../index.js'

it('is GreaterThan with the operands swapped', () => {
	testType.equal<LessThan<1, 2>, GreaterThan<2, 1>>(true)
	testType.equal<LessThan<2, 1>, GreaterThan<1, 2>>(true)
})

it('n < n is false', () => {
	testType.false<LessThan<0, 0>>(true)
	testType.false<LessThan<1, 1>>(true)
	testType.false<LessThan<-0, 0>>(true)
})

it('compares positive and negative numbers', () => {
	testType.true<LessThan<1, 2>>(true)
	testType.false<LessThan<2, 1>>(true)
	testType.true<LessThan<-2, -1>>(true)
	testType.true<LessThan<-1, 1>>(true)
	testType.false<LessThan<1, -1>>(true)
	testType.true<LessThan<9, 100>>(true)
	testType.true<LessThan<-1000000, 0>>(true)
})

it('can compare floating point', () => {
	testType.true<LessThan<1.4, 1.5>>(true)
	testType.true<LessThan<0.1, 1>>(true)
	testType.false<LessThan<1, 0.1>>(true)
})

it('number gets never', () => {
	testType.never<LessThan<number, 1>>(true)
	testType.never<LessThan<1, number>>(true)
})

it('bigint gets never as it is not supported', () => {
	testType.never<LessThan<1n, 2n>>(true)
})

it('gets never when the difference of the inputs is a whole number', () => {
	testType.never<LessThan<1.5, 2.5>>(true)
})

it('override Fail case', () => {
	testType.equal<LessThan<number, 1, { $fail: 'nope' }>, 'nope'>(true)
})
