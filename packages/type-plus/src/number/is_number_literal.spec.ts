import { it } from 'vitest'

import { type $Else, type $Then, type IsNumberLiteral, testType } from '../index.js'

it('returns false for number', () => {
	testType.false<IsNumberLiteral<number>>(true)
})

it('returns true if T is number literial', () => {
	testType.true<IsNumberLiteral<-1>>(true)
	testType.true<IsNumberLiteral<0>>(true)
	testType.true<IsNumberLiteral<1>>(true)
	testType.true<IsNumberLiteral<1.1>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNumberLiteral<void>>(true)
	testType.false<IsNumberLiteral<unknown>>(true)
	testType.false<IsNumberLiteral<any>>(true)
	testType.false<IsNumberLiteral<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsNumberLiteral<undefined>>(true)
	testType.false<IsNumberLiteral<null>>(true)
	testType.false<IsNumberLiteral<boolean>>(true)
	testType.false<IsNumberLiteral<true>>(true)
	testType.false<IsNumberLiteral<false>>(true)
	testType.false<IsNumberLiteral<string>>(true)
	testType.false<IsNumberLiteral<''>>(true)
	testType.false<IsNumberLiteral<symbol>>(true)
	testType.false<IsNumberLiteral<bigint>>(true)
	testType.false<IsNumberLiteral<1n>>(true)
	testType.false<IsNumberLiteral<{}>>(true)
	testType.false<IsNumberLiteral<string[]>>(true)
	testType.false<IsNumberLiteral<[]>>(true)
	testType.false<IsNumberLiteral<Function>>(true)
	testType.false<IsNumberLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNumberLiteral<number | string>, false>(true)
	testType.equal<IsNumberLiteral<1 | string>, boolean>(true)
	testType.equal<IsNumberLiteral<1.1 | string>, boolean>(true)
	testType.equal<IsNumberLiteral<string | boolean>, false>(true)
	testType.equal<IsNumberLiteral<string | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNumberLiteral<number | string, { distributive: false }>, false>(true)
	testType.equal<IsNumberLiteral<1 | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNumberLiteral<number & { a: 1 }>, false>(true)
	testType.equal<IsNumberLiteral<number & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsNumberLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsNumberLiteral<1 & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsNumberLiteral<bigint & { a: 1 }>, false>(true)
	testType.equal<IsNumberLiteral<bigint & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsNumberLiteral<1n & { a: 1 }>, false>(true)
	testType.equal<IsNumberLiteral<1n & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNumberLiteral<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<1, { selection: 'filter' }>, 1>(true)

	testType.equal<IsNumberLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<string | number, { selection: 'filter' }>, never>(true)

	testType.equal<IsNumberLiteral<string | 1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumberLiteral<string | boolean, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNumberLiteral<number, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<1, IsNumberLiteral.$Branch>, $Then>(true)

	testType.equal<IsNumberLiteral<any, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<unknown, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<never, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<void, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<string, IsNumberLiteral.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNumberLiteral<any>, false>(true)
	testType.equal<IsNumberLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNumberLiteral<unknown>, false>(true)
	testType.equal<IsNumberLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNumberLiteral<never>, false>(true)
	testType.equal<IsNumberLiteral<never, { $never: unknown }>, unknown>(true)
})
