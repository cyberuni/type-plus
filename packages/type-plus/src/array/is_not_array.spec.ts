import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsNotArray, testType } from '../index.js'

it('returns false if T is array', () => {
	testType.false<IsNotArray<string[]>>(true)
})

it('returns false if T is tuple', () => {
	testType.false<IsNotArray<[]>>(true)
	testType.false<IsNotArray<[1]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotArray<void>>(true)
	testType.true<IsNotArray<unknown>>(true)
	testType.true<IsNotArray<any>>(true)
	testType.true<IsNotArray<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotArray<undefined>>(true)
	testType.true<IsNotArray<null>>(true)
	testType.true<IsNotArray<boolean>>(true)
	testType.true<IsNotArray<true>>(true)
	testType.true<IsNotArray<false>>(true)
	testType.true<IsNotArray<number>>(true)
	testType.true<IsNotArray<1>>(true)
	testType.true<IsNotArray<string>>(true)
	testType.true<IsNotArray<''>>(true)
	testType.true<IsNotArray<symbol>>(true)
	testType.true<IsNotArray<bigint>>(true)
	testType.true<IsNotArray<1n>>(true)
	testType.true<IsNotArray<{}>>(true)
	testType.true<IsNotArray<{ a: 1 }>>(true)
	testType.true<IsNotArray<Function>>(true)
	testType.true<IsNotArray<() => void>>(true)
})

it('distributes over union type', () => {
	testType.boolean<IsNotArray<number[] | 1>>(true)
})

it('returns false if T is union of arrays', () => {
	testType.false<IsNotArray<string[] | number[]>>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotArray<number[] | number, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotArray<number[] & 1>>(true)
	testType.false<IsNotArray<number[] & 1, { distributive: false }>>(true)

	testType.false<IsNotArray<[] & 1>>(true)
	testType.false<IsNotArray<[] & 1, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotArray<null[], { selection: 'filter' }>, never>(true)

	testType.equal<IsNotArray<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotArray<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotArray<null[] | number, { selection: 'filter' }>, number>(true)
})
it('works with unique branches', () => {
	testType.equal<IsNotArray<string[], IsNotArray.$Branch>, $Else>(true)

	testType.equal<IsNotArray<number, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<any, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<unknown, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<never, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<void, IsNotArray.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotArray<any>, true>(true)
	testType.equal<IsNotArray<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotArray<unknown>, true>(true)
	testType.equal<IsNotArray<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotArray<never>, true>(true)
	testType.equal<IsNotArray<never, { $never: unknown }>, unknown>(true)
})

it('supports readonly array', () => {
	testType.false<IsNotArray<readonly string[]>>(true)
	testType.false<IsNotArray<readonly []>>(true)
})

describe('exact', () => {
	it('returns true if T is a tuple', () => {
		testType.true<IsNotArray<[], { exact: true }>>(true)
		testType.true<IsNotArray<[1], { exact: true }>>(true)
	})

	it('returns true for tuple intersection type', () => {
		testType.true<IsNotArray<[] & 1, { exact: true }>>(true)
		testType.true<IsNotArray<[] & 1, { distributive: false; exact: true }>>(true)
	})

	it('supports readonly tuple', () => {
		testType.true<IsNotArray<readonly [], { exact: true }>>(true)
	})
})
