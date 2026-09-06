import { it } from 'vitest'

import { type $Else, type $Then, type IsNotNumberLiteral, testType } from '../index.js'

it('returns true for number', () => {
	testType.true<IsNotNumberLiteral<number>>(true)
})

it('returns false if T is number literial', () => {
	testType.false<IsNotNumberLiteral<-1>>(true)
	testType.false<IsNotNumberLiteral<0>>(true)
	testType.false<IsNotNumberLiteral<1>>(true)
	testType.false<IsNotNumberLiteral<1.1>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotNumberLiteral<void>>(true)
	testType.true<IsNotNumberLiteral<unknown>>(true)
	testType.true<IsNotNumberLiteral<any>>(true)
	testType.true<IsNotNumberLiteral<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotNumberLiteral<undefined>>(true)
	testType.true<IsNotNumberLiteral<null>>(true)
	testType.true<IsNotNumberLiteral<boolean>>(true)
	testType.true<IsNotNumberLiteral<true>>(true)
	testType.true<IsNotNumberLiteral<false>>(true)
	testType.true<IsNotNumberLiteral<string>>(true)
	testType.true<IsNotNumberLiteral<''>>(true)
	testType.true<IsNotNumberLiteral<symbol>>(true)
	testType.true<IsNotNumberLiteral<bigint>>(true)
	testType.true<IsNotNumberLiteral<1n>>(true)
	testType.true<IsNotNumberLiteral<{}>>(true)
	testType.true<IsNotNumberLiteral<string[]>>(true)
	testType.true<IsNotNumberLiteral<[]>>(true)
	testType.true<IsNotNumberLiteral<Function>>(true)
	testType.true<IsNotNumberLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotNumberLiteral<number | string>, true>(true)
	testType.equal<IsNotNumberLiteral<1 | string>, boolean>(true)
	testType.equal<IsNotNumberLiteral<1.1 | string>, boolean>(true)
	testType.equal<IsNotNumberLiteral<string | boolean>, true>(true)
	testType.equal<IsNotNumberLiteral<string | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotNumberLiteral<number | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNumberLiteral<1 | string, { distributive: false }>, true>(true)
})

it('works with intersection type', () => {
	testType.equal<IsNotNumberLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotNumberLiteral<number & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotNumberLiteral<1 & { a: 1 }>, false>(true)
	testType.equal<IsNotNumberLiteral<1 & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsNotNumberLiteral<bigint & { a: 1 }>, true>(true)
	testType.equal<IsNotNumberLiteral<bigint & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotNumberLiteral<1n & { a: 1 }>, true>(true)
	testType.equal<IsNotNumberLiteral<1n & { a: 1 }, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotNumberLiteral<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotNumberLiteral<1, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotNumberLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumberLiteral<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotNumberLiteral<string | number, { selection: 'filter' }>, string | number>(true)

	testType.equal<IsNotNumberLiteral<string | 1, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNumberLiteral<1 | string, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotNumberLiteral<number, IsNotNumberLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNumberLiteral<1, IsNotNumberLiteral.$Branch>, $Else>(true)

	testType.equal<IsNotNumberLiteral<any, IsNotNumberLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNumberLiteral<unknown, IsNotNumberLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNumberLiteral<never, IsNotNumberLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNumberLiteral<void, IsNotNumberLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNumberLiteral<string, IsNotNumberLiteral.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotNumberLiteral<any>, true>(true)
	testType.equal<IsNotNumberLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotNumberLiteral<unknown>, true>(true)
	testType.equal<IsNotNumberLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotNumberLiteral<never>, true>(true)
	testType.equal<IsNotNumberLiteral<never, { $never: unknown }>, unknown>(true)
})
