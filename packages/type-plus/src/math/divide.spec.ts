import { it } from 'vitest'

import { type Divide, testType } from '../index.js'

it('divides evenly', () => {
	testType.equal<Divide<6, 3>, 2>(true)
	testType.equal<Divide<0, 5>, 0>(true)
	testType.equal<Divide<-0, 5>, 0>(true)
	testType.equal<Divide<5, 5>, 1>(true)
	testType.equal<Divide<1000, 8>, 125>(true)
	testType.equal<Divide<-6, 3>, -2>(true)
	testType.equal<Divide<-6, -3>, 2>(true)
})

it('gives a terminating fractional result exactly', () => {
	testType.equal<Divide<1, 4>, 0.25>(true)
	testType.equal<Divide<-7, 2>, -3.5>(true)
	testType.equal<Divide<7, -2>, -3.5>(true)
	testType.equal<Divide<1, 8>, 0.125>(true)
	testType.equal<Divide<3, 1000>, 0.003>(true)
})

it('divides fractional inputs', () => {
	testType.equal<Divide<1.5, 0.5>, 3>(true)
	testType.equal<Divide<0.75, 0.25>, 3>(true)
	testType.equal<Divide<0.1, 4>, 0.025>(true)
	testType.equal<Divide<2.5, 0.2>, 12.5>(true)
	testType.equal<Divide<-0.3, 0.1>, -3>(true)
})

it('gives a whole number from fractional inputs as a plain literal', () => {
	testType.equal<Divide<1, 0.5>, 2>(true)
	testType.equal<Divide<1, 0.25>, 4>(true)
	testType.equal<Divide<0.1, 0.1>, 1>(true)
})

it('truncates a non-terminating result toward zero to 16 fractional digits by default', () => {
	testType.equal<Divide<1, 3>, 0.3333333333333333>(true)
	testType.equal<Divide<2, 3>, 0.6666666666666666>(true)
	testType.equal<Divide<-2, 3>, -0.6666666666666666>(true)
	testType.equal<Divide<1, 7>, 0.1428571428571428>(true)
	testType.equal<Divide<10, 3>, 3.333333333333333>(true)
})

it('drops fractional digits a number literal cannot hold', () => {
	testType.equal<Divide<9007199254740991, 3>, 3002399751580330>(true)
	testType.equal<Divide<1000000, 3>, 333333.3333333333>(true)
})

it('truncates to the given precision', () => {
	testType.equal<Divide<2, 3, { precision: 2 }>, 0.66>(true)
	testType.equal<Divide<-2, 3, { precision: 2 }>, -0.66>(true)
	testType.equal<Divide<1, 4, { precision: 1 }>, 0.2>(true)
	testType.equal<Divide<7, 2, { precision: 0 }>, 3>(true)
	testType.equal<Divide<-1, 3, { precision: 0 }>, 0>(true)
	testType.equal<Divide<1, 3, { precision: 20 }>, 0.3333333333333333>(true)
	testType.equal<Divide<1, 3, { precision: undefined }>, 0.3333333333333333>(true)
})

it('is Quotient when either input is a bigint', () => {
	testType.equal<Divide<7n, 2n>, 3n>(true)
	testType.equal<Divide<-7n, 2n>, -3n>(true)
	testType.equal<Divide<7n, 2>, 3n>(true)
	testType.equal<Divide<7, 2n>, 3n>(true)
	testType.never<Divide<7n, 0n>>(true)
	testType.never<Divide<7n, 0.5>>(true)
	testType.equal<Divide<7n, 0n, { $fail: 'nope' }>, 'nope'>(true)
})

it('fails on a zero divisor', () => {
	testType.never<Divide<1, 0>>(true)
	testType.never<Divide<0, 0>>(true)
	testType.never<Divide<1.5, 0>>(true)
	testType.equal<Divide<1, 0, { $fail: 'nope' }>, 'nope'>(true)
})

it('fails on the widened number and bigint', () => {
	testType.never<Divide<number, 2>>(true)
	testType.never<Divide<2, number>>(true)
	testType.never<Divide<bigint, 2n>>(true)
	testType.equal<Divide<number, 2, { $fail: 'nope' }>, 'nope'>(true)
})

it('fails on a precision that is not a non-negative integer literal', () => {
	testType.never<Divide<1, 3, { precision: -1 }>>(true)
	testType.never<Divide<1, 3, { precision: 1.5 }>>(true)
	testType.never<Divide<1, 3, { precision: number }>>(true)
})

it('cannot write a result smaller than 0.000001', () => {
	testType.equal<Divide<1, 3000000>, "The value '0.0000003333333333' cannot be represented as bigint or number">(true)
})
