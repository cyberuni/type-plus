import { it } from 'vitest'

import { type LessThanOrEqual, testType } from '../index.js'

it('is true when the operands are equal', () => {
	testType.true<LessThanOrEqual<0, 0>>(true)
	testType.true<LessThanOrEqual<1, 1>>(true)
	testType.true<LessThanOrEqual<-0, 0>>(true)
	testType.true<LessThanOrEqual<-1, -1>>(true)
	testType.true<LessThanOrEqual<1000000, 1000000>>(true)
})

it('compares different numbers', () => {
	testType.true<LessThanOrEqual<1, 2>>(true)
	testType.false<LessThanOrEqual<2, 1>>(true)
	testType.true<LessThanOrEqual<-2, -1>>(true)
	testType.false<LessThanOrEqual<-1, -2>>(true)
})

it('can compare floating point', () => {
	testType.true<LessThanOrEqual<1.4, 1.5>>(true)
})

it('is true for identical fractional literals, which the comparison alone cannot compute', () => {
	testType.true<LessThanOrEqual<1.5, 1.5>>(true)
})

it('number gets never', () => {
	testType.never<LessThanOrEqual<number, 1>>(true)
	testType.never<LessThanOrEqual<1, number>>(true)
	testType.never<LessThanOrEqual<number, number>>(true)
})

it('bigint gets never as it is not supported', () => {
	testType.never<LessThanOrEqual<2n, 1n>>(true)
	testType.never<LessThanOrEqual<1n, 1n>>(true)
})

it('gets never when the difference of the inputs is a whole number', () => {
	testType.never<LessThanOrEqual<1.5, 2.5>>(true)
})

it('override Fail case with the value itself, not its negation', () => {
	testType.equal<LessThanOrEqual<number, 1, { $fail: 'nope' }>, 'nope'>(true)
	testType.equal<LessThanOrEqual<number, 1, { $fail: true }>, true>(true)
})
