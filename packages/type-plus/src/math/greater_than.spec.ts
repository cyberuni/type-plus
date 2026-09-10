import { it } from 'vitest'

import { type GreaterThan, testType } from '../index.js'

it('number gets never', () => {
	testType.never<GreaterThan<number, 1>>(true)
	testType.never<GreaterThan<1, number>>(true)
})

it('override Fail case', () => {
	testType.strictNumber<GreaterThan<number, 2, number>>(true)
})

it('n > n is false', () => {
	testType.false<GreaterThan<0, 0>>(true)
	testType.false<GreaterThan<1, 1>>(true)
	testType.false<GreaterThan<12, 12>>(true)
})

it('can compare floating point', () => {
	testType.false<GreaterThan<0.1, 1>>(true)
	testType.true<GreaterThan<1, 0.1>>(true)
	testType.true<GreaterThan<1.5, 1.4>>(true)
})

it('gets never when the difference of the inputs is a whole number', () => {
	testType.never<GreaterThan<1.5, 2.5>>(true)
})

it('bigint gets never as it is not supported by the body', () => {
	testType.never<GreaterThan<2n, 1n>>(true)
})

it('with same number of digits', () => {
	testType.true<GreaterThan<1, 0>>(true)
	testType.true<GreaterThan<22, 11>>(true)
	testType.true<GreaterThan<20, 19>>(true)
	testType.true<GreaterThan<19, 10>>(true)

	testType.false<GreaterThan<0, 1>>(true)
	testType.false<GreaterThan<11, 22>>(true)
	testType.false<GreaterThan<19, 20>>(true)
	testType.false<GreaterThan<10, 19>>(true)
})

it('with different number of digits', () => {
	testType.false<GreaterThan<0, 1>>(true)
	testType.false<GreaterThan<9, 100>>(true)
	testType.true<GreaterThan<10, 1>>(true)
	testType.true<GreaterThan<123, 32>>(true)
	testType.true<GreaterThan<123, 13>>(true)
})

it('-0 > 0 and 0 > -0 are false', () => {
	testType.false<GreaterThan<-0, 0>>(true)
	testType.false<GreaterThan<0, -0>>(true)
})

it('works with negative numbers', () => {
	testType.true<GreaterThan<0, -1>>(true)
	testType.true<GreaterThan<1, -1>>(true)
	testType.true<GreaterThan<2, -1>>(true)

	testType.false<GreaterThan<-1, 0>>(true)
	testType.false<GreaterThan<-1, 1>>(true)
	testType.false<GreaterThan<-1, 2>>(true)

	testType.false<GreaterThan<-0, -0>>(true)
	testType.false<GreaterThan<-1, -1>>(true)

	testType.true<GreaterThan<-0, -1>>(true)
	testType.false<GreaterThan<-1, -1>>(true)
	testType.false<GreaterThan<-2, -1>>(true)

	testType.false<GreaterThan<-1, -0>>(true)
	testType.false<GreaterThan<-1, -1>>(true)
	testType.true<GreaterThan<-1, -2>>(true)
})

it('work with large numbers', () => {
	testType.true<GreaterThan<1000000, 0>>(true)
	testType.false<GreaterThan<0, 1000000>>(true)

	testType.false<GreaterThan<-1000000, 0>>(true)
	testType.true<GreaterThan<0, -1000000>>(true)
})
