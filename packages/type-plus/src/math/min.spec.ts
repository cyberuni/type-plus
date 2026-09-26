import { it } from 'vitest'

import { type Min, testType } from '../index.js'

it('returns the smaller one', () => {
	testType.equal<Min<1, 2>, 1>(true)
	testType.equal<Min<2, 1>, 1>(true)
	testType.equal<Min<123, 22>, 22>(true)
	testType.equal<Min<1234567891011, 123>, 123>(true)
})

it('same number', () => {
	testType.equal<Min<1, 1>, 1>(true)
	testType.equal<Min<123, 123>, 123>(true)
})

it('works with negative numbers', () => {
	testType.equal<Min<-1, -2>, -2>(true)
	testType.equal<Min<-1, 1>, -1>(true)
	testType.equal<Min<0, -1>, -1>(true)
	testType.equal<Min<0, -0>, 0>(true)
	testType.equal<Min<-1000000, 0>, -1000000>(true)
})

it('works with floating point', () => {
	testType.equal<Min<0.1, 1>, 0.1>(true)
	testType.equal<Min<1, 0.1>, 0.1>(true)
})

it('number gets never', () => {
	testType.never<Min<number, 1>>(true)
	testType.never<Min<1, number>>(true)
})

it('bigint gets never', () => {
	testType.never<Min<2n, 1n>>(true)
})

it('gets never when the difference of the inputs is a whole number', () => {
	testType.never<Min<1.5, 2.5>>(true)
})

it('override Fail case', () => {
	testType.strictNumber<Min<number, 1, { $fail: number }>>(true)
	testType.equal<Min<number, 1, { $fail: 'nope' }>, 'nope'>(true)
})
