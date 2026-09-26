import { it } from 'vitest'

import { type Remainder, testType } from '../index.js'

it('takes the sign of the dividend', () => {
	testType.equal<Remainder<7, 2>, 1>(true)
	testType.equal<Remainder<-7, 2>, -1>(true)
	testType.equal<Remainder<7, -2>, 1>(true)
	testType.equal<Remainder<-7, -2>, -1>(true)
})

it('is 0 when dividing evenly', () => {
	testType.equal<Remainder<6, 3>, 0>(true)
	testType.equal<Remainder<-6, 3>, 0>(true)
	testType.equal<Remainder<0, 3>, 0>(true)
	testType.equal<Remainder<100, 10>, 0>(true)
})

it('is the dividend when it is smaller than the divisor', () => {
	testType.equal<Remainder<1, 3>, 1>(true)
	testType.equal<Remainder<-1, 3>, -1>(true)
	testType.equal<Remainder<1024, 1025>, 1024>(true)
})

it('works on multi-digit numbers', () => {
	testType.equal<Remainder<123, 7>, 4>(true)
	testType.equal<Remainder<13234822, 1357>, 1>(true)
	testType.equal<Remainder<99999, 99>, 9>(true)
	testType.equal<Remainder<9007199254740991, 1000>, 991>(true)
})

it('works on bigint', () => {
	testType.equal<Remainder<7n, 2n>, 1n>(true)
	testType.equal<Remainder<-7n, 2n>, -1n>(true)
	testType.equal<Remainder<123456789012345678901234567890n, 987654321n>, 574845669n>(true)
})

it('gives a bigint when mixing number and bigint', () => {
	testType.equal<Remainder<7n, 2>, 1n>(true)
	testType.equal<Remainder<7, 2n>, 1n>(true)
})

it('fails on division by zero', () => {
	testType.equal<Remainder<1, 0>, never>(true)
	testType.equal<Remainder<1n, 0n>, never>(true)
	testType.equal<Remainder<1, 0, { $fail: 'nope' }>, 'nope'>(true)
})

it('fails on fractional input', () => {
	testType.equal<Remainder<7.5, 2>, never>(true)
	testType.equal<Remainder<7, 0.5>, never>(true)
})

it('fails on non-literals', () => {
	testType.equal<Remainder<number, 2>, never>(true)
	testType.equal<Remainder<2, number>, never>(true)
	testType.equal<Remainder<number, 2, { $fail: 'nope' }>, 'nope'>(true)
})
