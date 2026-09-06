import { it } from 'vitest'

import { type $Else, type $Then, type IsNotNumeric, testType } from '../index.js'

it('returns false for number', () => {
	testType.false<IsNotNumeric<number>>(true)
})

it('returns false if T is number literial', () => {
	testType.false<IsNotNumeric<-1>>(true)
	testType.false<IsNotNumeric<0>>(true)
	testType.false<IsNotNumeric<1>>(true)
	testType.false<IsNotNumeric<1.1>>(true)
})

it('returns true if T is bigint', () => {
	testType.false<IsNotNumeric<bigint>>(true)

	testType.false<IsNotNumeric<-1n>>(true)
	testType.false<IsNotNumeric<-2n>>(true)
	testType.false<IsNotNumeric<-0n>>(true)
	testType.false<IsNotNumeric<1n>>(true)
	testType.false<IsNotNumeric<2n>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotNumeric<void>>(true)
	testType.true<IsNotNumeric<unknown>>(true)
	testType.true<IsNotNumeric<any>>(true)
	testType.true<IsNotNumeric<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotNumeric<undefined>>(true)
	testType.true<IsNotNumeric<null>>(true)
	testType.true<IsNotNumeric<boolean>>(true)
	testType.true<IsNotNumeric<true>>(true)
	testType.true<IsNotNumeric<true>>(true)
	testType.true<IsNotNumeric<string>>(true)
	testType.true<IsNotNumeric<''>>(true)
	testType.true<IsNotNumeric<'1'>>(true)
	testType.true<IsNotNumeric<symbol>>(true)
	testType.true<IsNotNumeric<{}>>(true)
	testType.true<IsNotNumeric<string[]>>(true)
	testType.true<IsNotNumeric<[]>>(true)
	testType.true<IsNotNumeric<Function>>(true)
	testType.true<IsNotNumeric<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotNumeric<number | string>, boolean>(true)
	testType.equal<IsNotNumeric<1 | string>, boolean>(true)
	testType.equal<IsNotNumeric<bigint | string>, boolean>(true)
	testType.equal<IsNotNumeric<1n | string>, boolean>(true)
})

it('returns false if T is union of mixing number and bigint', () => {
	testType.false<IsNotNumeric<number | bigint>>(true)
	testType.false<IsNotNumeric<bigint | 1>>(true)
	testType.false<IsNotNumeric<number | 1n>>(true)
	testType.false<IsNotNumeric<1 | 1n>>(true)
})

it('returns false if N is union of number and number literal', () => {
	testType.equal<IsNotNumeric<number | 1>, false>(true)
})

it('returns false if N is union of bigint and bigint literal', () => {
	testType.equal<IsNotNumeric<bigint | 1n>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotNumeric<number | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNumeric<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNumeric<bigint | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNumeric<1n | string, { distributive: false }>, true>(true)
})

it('returns false if T is intersection of number, as that is still considered a number', () => {
	testType.equal<IsNotNumeric<number & { a: 1 }>, false>(true)
	testType.equal<IsNotNumeric<bigint & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotNumeric<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumeric<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumeric<string, { selection: 'filter' }>, string>(true)

	testType.equal<IsNotNumeric<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumeric<unknown, { selection: 'filter' }>, unknown>(true)

	testType.equal<IsNotNumeric<string | number, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNumeric<string | 1, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNumeric<string | bigint, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNumeric<string | 1n, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotNumeric<number, IsNotNumeric.$Branch>, $Else>(true)
	testType.equal<IsNotNumeric<1, IsNotNumeric.$Branch>, $Else>(true)

	testType.equal<IsNotNumeric<any, IsNotNumeric.$Branch>, $Then>(true)
	testType.equal<IsNotNumeric<unknown, IsNotNumeric.$Branch>, $Then>(true)
	testType.equal<IsNotNumeric<never, IsNotNumeric.$Branch>, $Then>(true)
	testType.equal<IsNotNumeric<void, IsNotNumeric.$Branch>, $Then>(true)
	testType.equal<IsNotNumeric<string, IsNotNumeric.$Branch>, $Then>(true)

	testType.equal<IsNotNumeric<string | number, IsNotNumeric.$Branch>, $Then | $Else>(true)
})
