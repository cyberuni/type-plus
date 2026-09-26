import { it } from 'vitest'

import { type Quotient, testType } from '../index.js'

it('truncates toward zero', () => {
	testType.equal<Quotient<7, 2>, 3>(true)
	testType.equal<Quotient<-7, 2>, -3>(true)
	testType.equal<Quotient<7, -2>, -3>(true)
	testType.equal<Quotient<-7, -2>, 3>(true)
	testType.equal<Quotient<1, 3>, 0>(true)
	testType.equal<Quotient<-1, 3>, 0>(true)
})

it('divides evenly', () => {
	testType.equal<Quotient<6, 3>, 2>(true)
	testType.equal<Quotient<0, 5>, 0>(true)
	testType.equal<Quotient<-0, 5>, 0>(true)
	testType.equal<Quotient<5, 5>, 1>(true)
	testType.equal<Quotient<5, 1>, 5>(true)
	testType.equal<Quotient<100, 10>, 10>(true)
	testType.equal<Quotient<1000, 8>, 125>(true)
})

it('divides multi-digit numbers', () => {
	testType.equal<Quotient<123, 7>, 17>(true)
	testType.equal<Quotient<13234821, 1357>, 9753>(true)
	testType.equal<Quotient<13234822, 1357>, 9753>(true)
	testType.equal<Quotient<99999, 99>, 1010>(true)
	testType.equal<Quotient<1024, 1025>, 0>(true)
	testType.equal<Quotient<9007199254740991, 3>, 3002399751580330>(true)
})

it('works on bigint', () => {
	testType.equal<Quotient<7n, 2n>, 3n>(true)
	testType.equal<Quotient<-7n, 2n>, -3n>(true)
	testType.equal<Quotient<0n, 2n>, 0n>(true)
	testType.equal<Quotient<123456789012345678901234567890n, 987654321n>, 124999998873437499901n>(true)
})

it('gives a bigint when mixing number and bigint', () => {
	testType.equal<Quotient<7n, 2>, 3n>(true)
	testType.equal<Quotient<7, 2n>, 3n>(true)
})

it('fails on division by zero', () => {
	testType.equal<Quotient<1, 0>, never>(true)
	testType.equal<Quotient<0, 0>, never>(true)
	testType.equal<Quotient<1, -0>, never>(true)
	testType.equal<Quotient<1n, 0n>, never>(true)
	testType.equal<Quotient<1, 0, { $fail: 'nope' }>, 'nope'>(true)
})

it('fails on fractional input', () => {
	testType.equal<Quotient<7.5, 2>, never>(true)
	testType.equal<Quotient<7, 0.5>, never>(true)
	testType.equal<Quotient<7.5, 2, { $fail: 'nope' }>, 'nope'>(true)
})

it('fails on non-literals', () => {
	testType.equal<Quotient<number, 2>, never>(true)
	testType.equal<Quotient<2, number>, never>(true)
	testType.equal<Quotient<bigint, 2n>, never>(true)
	testType.equal<Quotient<number, 2, { $fail: 'nope' }>, 'nope'>(true)
})
