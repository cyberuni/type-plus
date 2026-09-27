import { it } from 'vitest'

import { type GreaterThanOrEqual, testType } from '../index.js'

it('is true when the operands are equal', () => {
	testType.true<GreaterThanOrEqual<0, 0>>(true)
	testType.true<GreaterThanOrEqual<1, 1>>(true)
	testType.true<GreaterThanOrEqual<-0, 0>>(true)
	testType.true<GreaterThanOrEqual<-1, -1>>(true)
	testType.true<GreaterThanOrEqual<1000000, 1000000>>(true)
})

it('compares different numbers', () => {
	testType.true<GreaterThanOrEqual<2, 1>>(true)
	testType.false<GreaterThanOrEqual<1, 2>>(true)
	testType.true<GreaterThanOrEqual<-1, -2>>(true)
	testType.false<GreaterThanOrEqual<-2, -1>>(true)
})

it('can compare floating point', () => {
	testType.true<GreaterThanOrEqual<1.5, 1.4>>(true)
})

it('is true for identical fractional literals, which the comparison alone cannot compute', () => {
	testType.true<GreaterThanOrEqual<1.5, 1.5>>(true)
})

it('number gets never', () => {
	testType.never<GreaterThanOrEqual<number, 1>>(true)
	testType.never<GreaterThanOrEqual<1, number>>(true)
	testType.never<GreaterThanOrEqual<number, number>>(true)
})

it('bigint gets never as it is not supported', () => {
	testType.never<GreaterThanOrEqual<2n, 1n>>(true)
	testType.never<GreaterThanOrEqual<1n, 1n>>(true)
})

it('compares a fractional pair whose difference is a whole number', () => {
	testType.false<GreaterThanOrEqual<1.5, 2.5>>(true)
	testType.true<GreaterThanOrEqual<2.5, 1.5>>(true)
})

it('override Fail case with the value itself, not its negation', () => {
	testType.equal<GreaterThanOrEqual<number, 1, { $fail: 'nope' }>, 'nope'>(true)
	testType.equal<GreaterThanOrEqual<number, 1, { $fail: true }>, true>(true)
})
