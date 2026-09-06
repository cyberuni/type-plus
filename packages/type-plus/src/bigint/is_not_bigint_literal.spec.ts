import { it } from 'vitest'

import { type $Else, type $Then, type IsNotBigintLiteral, testType } from '../index.js'

it('returns true for number', () => {
	testType.true<IsNotBigintLiteral<number>>(true)
	testType.true<IsNotBigintLiteral<-1>>(true)
	testType.true<IsNotBigintLiteral<0>>(true)
	testType.true<IsNotBigintLiteral<1>>(true)
	testType.true<IsNotBigintLiteral<1.1>>(true)
})

it('returns true for bigint', () => {
	testType.true<IsNotBigintLiteral<bigint>>(true)
})

it('returns false if T is bigint literial', () => {
	testType.false<IsNotBigintLiteral<-1n>>(true)
	testType.false<IsNotBigintLiteral<0n>>(true)
	testType.false<IsNotBigintLiteral<1n>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotBigintLiteral<void>>(true)
	testType.true<IsNotBigintLiteral<unknown>>(true)
	testType.true<IsNotBigintLiteral<any>>(true)
	testType.true<IsNotBigintLiteral<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotBigintLiteral<undefined>>(true)
	testType.true<IsNotBigintLiteral<null>>(true)
	testType.true<IsNotBigintLiteral<boolean>>(true)
	testType.true<IsNotBigintLiteral<true>>(true)
	testType.true<IsNotBigintLiteral<false>>(true)
	testType.true<IsNotBigintLiteral<string>>(true)
	testType.true<IsNotBigintLiteral<''>>(true)
	testType.true<IsNotBigintLiteral<symbol>>(true)
	testType.true<IsNotBigintLiteral<{}>>(true)
	testType.true<IsNotBigintLiteral<string[]>>(true)
	testType.true<IsNotBigintLiteral<[]>>(true)
	testType.true<IsNotBigintLiteral<Function>>(true)
	testType.true<IsNotBigintLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotBigintLiteral<bigint | string>, true>(true)
	testType.equal<IsNotBigintLiteral<1n | string>, boolean>(true)
	testType.equal<IsNotBigintLiteral<string | boolean>, true>(true)
	testType.equal<IsNotBigintLiteral<string | 1n>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotBigintLiteral<bigint | string, { distributive: false }>, true>(true)
	testType.equal<IsNotBigintLiteral<1n | string, { distributive: false }>, true>(true)
})

it('works with intersection type', () => {
	testType.equal<IsNotBigintLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotBigintLiteral<number & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotBigintLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsNotBigintLiteral<1 & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsNotBigintLiteral<bigint & { a: 1 }>, true>(true)
	testType.equal<IsNotBigintLiteral<bigint & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotBigintLiteral<1n & { a: 1 }>, false>(true)
	testType.equal<IsNotBigintLiteral<1n & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotBigintLiteral<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotBigintLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotBigintLiteral<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNotBigintLiteral<1n, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotBigintLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBigintLiteral<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotBigintLiteral<bigint | string, { selection: 'filter' }>, bigint | string>(true)

	testType.equal<IsNotBigintLiteral<1n | string, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotBigintLiteral<number, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<1, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<bigint, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<1n, IsNotBigintLiteral.$Branch>, $Else>(true)

	testType.equal<IsNotBigintLiteral<any, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<unknown, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<never, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<void, IsNotBigintLiteral.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotBigintLiteral<any>, true>(true)
	testType.equal<IsNotBigintLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotBigintLiteral<unknown>, true>(true)
	testType.equal<IsNotBigintLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotBigintLiteral<never>, true>(true)
	testType.equal<IsNotBigintLiteral<never, { $never: unknown }>, unknown>(true)
})
