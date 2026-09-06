import { it } from 'vitest'

import { type $Else, type $Then, type IsNumeric, testType } from '../index.js'

it('returns true if T is number', () => {
	testType.true<IsNumeric<number>>(true)

	testType.true<IsNumeric<-1>>(true)
	testType.true<IsNumeric<-2>>(true)
	testType.true<IsNumeric<-0>>(true)
	testType.true<IsNumeric<1>>(true)
	testType.true<IsNumeric<2>>(true)

	testType.true<IsNumeric<1.1>>(true)
})

it('returns true if T is bigint', () => {
	testType.true<IsNumeric<bigint>>(true)

	testType.true<IsNumeric<-1n>>(true)
	testType.true<IsNumeric<-2n>>(true)
	testType.true<IsNumeric<-0n>>(true)
	testType.true<IsNumeric<1n>>(true)
	testType.true<IsNumeric<2n>>(true)
})

it('returns false if T is special types', () => {
	testType.false<IsNumeric<any>>(true)
	testType.false<IsNumeric<unknown>>(true)
	testType.false<IsNumeric<never>>(true)
	testType.false<IsNumeric<void>>(true)
})

it('returns false for other types', () => {
	testType.false<IsNumeric<undefined>>(true)
	testType.false<IsNumeric<null>>(true)
	testType.false<IsNumeric<boolean>>(true)
	testType.false<IsNumeric<true>>(true)
	testType.false<IsNumeric<false>>(true)
	testType.false<IsNumeric<string>>(true)
	testType.false<IsNumeric<''>>(true)
	testType.false<IsNumeric<'1'>>(true)
	testType.false<IsNumeric<symbol>>(true)
	testType.false<IsNumeric<{}>>(true)
	testType.false<IsNumeric<string[]>>(true)
	testType.false<IsNumeric<[]>>(true)
	testType.false<IsNumeric<Function>>(true)
	testType.false<IsNumeric<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNumeric<number | string>, boolean>(true)
	testType.equal<IsNumeric<1 | string>, boolean>(true)
	testType.equal<IsNumeric<bigint | string>, boolean>(true)
	testType.equal<IsNumeric<1n | string>, boolean>(true)
})

it('returns true if T is union of mixing number and bigint', () => {
	testType.true<IsNumeric<number | bigint>>(true)
	testType.true<IsNumeric<bigint | 1>>(true)
	testType.true<IsNumeric<number | 1n>>(true)
	testType.true<IsNumeric<1 | 1n>>(true)
})

it('returns true if N is union of number and number literal', () => {
	testType.equal<IsNumeric<number | 1>, true>(true)
})

it('returns true if N is union of bigint and bigint literal', () => {
	testType.equal<IsNumeric<bigint | 1n>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNumeric<number | string, { distributive: false }>, false>(true)
	testType.equal<IsNumeric<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsNumeric<bigint | string, { distributive: false }>, false>(true)
	testType.equal<IsNumeric<1n | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNumeric<number & { a: 1 }>, true>(true)
	testType.equal<IsNumeric<bigint & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNumeric<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNumeric<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumeric<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNumeric<1n, { selection: 'filter' }>, 1n>(true)

	testType.equal<IsNumeric<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumeric<unknown, { selection: 'filter' }>, never>(true)

	testType.equal<IsNumeric<string | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNumeric<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumeric<string | 1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumeric<string | bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNumeric<string | 1n, { selection: 'filter' }>, 1n>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNumeric<number, IsNumeric.$Branch>, $Then>(true)
	testType.equal<IsNumeric<1, IsNumeric.$Branch>, $Then>(true)
	testType.equal<IsNumeric<bigint, IsNumeric.$Branch>, $Then>(true)
	testType.equal<IsNumeric<1n, IsNumeric.$Branch>, $Then>(true)

	testType.equal<IsNumeric<any, IsNumeric.$Branch>, $Else>(true)
	testType.equal<IsNumeric<unknown, IsNumeric.$Branch>, $Else>(true)
	testType.equal<IsNumeric<never, IsNumeric.$Branch>, $Else>(true)
	testType.equal<IsNumeric<void, IsNumeric.$Branch>, $Else>(true)
	testType.equal<IsNumeric<string, IsNumeric.$Branch>, $Else>(true)
})
