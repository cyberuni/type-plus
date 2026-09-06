import { it } from 'vitest'

import { type $Else, type $Then, type IsBigintLiteral, testType } from '../index.js'

it('returns false for number', () => {
	testType.false<IsBigintLiteral<number>>(true)
	testType.false<IsBigintLiteral<-1>>(true)
	testType.false<IsBigintLiteral<0>>(true)
	testType.false<IsBigintLiteral<1>>(true)
	testType.false<IsBigintLiteral<1.1>>(true)
})

it('returns false for bigint', () => {
	testType.false<IsBigintLiteral<bigint>>(true)
})

it('returns true if T is bigint literial', () => {
	testType.true<IsBigintLiteral<-1n>>(true)
	testType.true<IsBigintLiteral<0n>>(true)
	testType.true<IsBigintLiteral<1n>>(true)
})

it('returns false for special types', () => {
	testType.false<IsBigintLiteral<void>>(true)
	testType.false<IsBigintLiteral<unknown>>(true)
	testType.false<IsBigintLiteral<any>>(true)
	testType.false<IsBigintLiteral<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsBigintLiteral<undefined>>(true)
	testType.false<IsBigintLiteral<null>>(true)
	testType.false<IsBigintLiteral<boolean>>(true)
	testType.false<IsBigintLiteral<true>>(true)
	testType.false<IsBigintLiteral<false>>(true)
	testType.false<IsBigintLiteral<string>>(true)
	testType.false<IsBigintLiteral<''>>(true)
	testType.false<IsBigintLiteral<symbol>>(true)
	testType.false<IsBigintLiteral<{}>>(true)
	testType.false<IsBigintLiteral<string[]>>(true)
	testType.false<IsBigintLiteral<[]>>(true)
	testType.false<IsBigintLiteral<Function>>(true)
	testType.false<IsBigintLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsBigintLiteral<bigint | string>, false>(true)
	testType.equal<IsBigintLiteral<1n | string>, boolean>(true)
	testType.equal<IsBigintLiteral<string | boolean>, false>(true)
	testType.equal<IsBigintLiteral<string | 1n>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsBigintLiteral<bigint | string, { distributive: false }>, false>(true)
	testType.equal<IsBigintLiteral<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsBigintLiteral<1n | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsBigintLiteral<number & { a: 1 }>, false>(true)
	testType.equal<IsBigintLiteral<number & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsBigintLiteral<1 & { a: 1 }>, false>(true)
	testType.equal<IsBigintLiteral<1 & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsBigintLiteral<bigint & { a: 1 }>, false>(true)
	testType.equal<IsBigintLiteral<bigint & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsBigintLiteral<1n & { a: 1 }>, true>(true)
	testType.equal<IsBigintLiteral<1n & { a: 1 }, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsBigintLiteral<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigintLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigintLiteral<bigint, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigintLiteral<1n, { selection: 'filter' }>, 1n>(true)

	testType.equal<IsBigintLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigintLiteral<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigintLiteral<string | number, { selection: 'filter' }>, never>(true)

	testType.equal<IsBigintLiteral<string | 1n, { selection: 'filter' }>, 1n>(true)
	testType.equal<IsBigintLiteral<string | boolean, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsBigintLiteral<number, IsBigintLiteral.$Branch>, $Else>(true)
	testType.equal<IsBigintLiteral<1, IsBigintLiteral.$Branch>, $Else>(true)
	testType.equal<IsBigintLiteral<bigint, IsBigintLiteral.$Branch>, $Else>(true)
	testType.equal<IsBigintLiteral<1n, IsBigintLiteral.$Branch>, $Then>(true)

	testType.equal<IsBigintLiteral<any, IsBigintLiteral.$Branch>, $Else>(true)
	testType.equal<IsBigintLiteral<unknown, IsBigintLiteral.$Branch>, $Else>(true)
	testType.equal<IsBigintLiteral<never, IsBigintLiteral.$Branch>, $Else>(true)
	testType.equal<IsBigintLiteral<void, IsBigintLiteral.$Branch>, $Else>(true)
	testType.equal<IsBigintLiteral<string, IsBigintLiteral.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsBigintLiteral<any>, false>(true)
	testType.equal<IsBigintLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsBigintLiteral<unknown>, false>(true)
	testType.equal<IsBigintLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsBigintLiteral<never>, false>(true)
	testType.equal<IsBigintLiteral<never, { $never: unknown }>, unknown>(true)
})
