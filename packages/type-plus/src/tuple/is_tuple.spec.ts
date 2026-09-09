import { it } from 'vitest'

import { type $Else, type $Then, type IsTuple, testType } from '../index.js'

it('returns true if T is a tuple', () => {
	testType.true<IsTuple<[]>>(true)
	testType.true<IsTuple<[1]>>(true)
})

it('returns false if T is an array', () => {
	testType.false<IsTuple<string[]>>(true)
	testType.false<IsTuple<any[]>>(true)
	testType.false<IsTuple<unknown[]>>(true)
	testType.false<IsTuple<never[]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsTuple<void>>(true)
	testType.false<IsTuple<unknown>>(true)
	testType.false<IsTuple<any>>(true)
	testType.false<IsTuple<never>>(true)
})

it('returns false if T for other types', () => {
	testType.false<IsTuple<undefined>>(true)
	testType.false<IsTuple<null>>(true)
	testType.false<IsTuple<boolean>>(true)
	testType.false<IsTuple<true>>(true)
	testType.false<IsTuple<false>>(true)
	testType.false<IsTuple<number>>(true)
	testType.false<IsTuple<1>>(true)
	testType.false<IsTuple<string>>(true)
	testType.false<IsTuple<''>>(true)
	testType.false<IsTuple<symbol>>(true)
	testType.false<IsTuple<bigint>>(true)
	testType.false<IsTuple<1n>>(true)
	testType.false<IsTuple<{}>>(true)
	testType.false<IsTuple<string[]>>(true)
	testType.false<IsTuple<Function>>(true)
	testType.false<IsTuple<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsTuple<[1] | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsTuple<[] | number, { distributive: false }>, false>(true)
	testType.equal<IsTuple<[1] | number, { distributive: false }>, false>(true)
})

it('returns true if T is union of tuples', () => {
	testType.true<IsTuple<[] | [1]>>(true)
})

it('returns true if T is intersection of tuples', () => {
	testType.equal<IsTuple<[] & { a: 1 }>, true>(true)
	testType.equal<IsTuple<[] & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsTuple<null[] & { a: 1 }>, false>(true)
	testType.equal<IsTuple<null[] & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsTuple<[], { selection: 'filter' }>, []>(true)
	testType.equal<IsTuple<[1], { selection: 'filter' }>, [1]>(true)

	testType.equal<IsTuple<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsTuple<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsTuple<[] | number, { selection: 'filter' }>, []>(true)
	testType.equal<IsTuple<[] | boolean, { selection: 'filter' }>, []>(true)
})

it('works with unique branches', () => {
	testType.equal<IsTuple<[], IsTuple.$Branch>, $Then>(true)

	testType.equal<IsTuple<string, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<any, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<unknown, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<never, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<void, IsTuple.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsTuple<any>, false>(true)
	testType.equal<IsTuple<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsTuple<unknown>, false>(true)
	testType.equal<IsTuple<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsTuple<never>, false>(true)
	testType.equal<IsTuple<never, { $never: unknown }>, unknown>(true)
})

it('can override $else branch with unknown', () => {
	testType.equal<IsTuple<any[], { $else: unknown }>, unknown>(true)
})
