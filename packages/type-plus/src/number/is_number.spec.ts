import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsNumber, testType } from '../index.js'

it('returns true for number', () => {
	testType.true<IsNumber<number>>(true)
})

it('returns true if T is number literial', () => {
	testType.true<IsNumber<-1>>(true)
	testType.true<IsNumber<0>>(true)
	testType.true<IsNumber<1>>(true)
	testType.true<IsNumber<1.1>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNumber<void>>(true)
	testType.false<IsNumber<unknown>>(true)
	testType.false<IsNumber<any>>(true)
	testType.false<IsNumber<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsNumber<undefined>>(true)
	testType.false<IsNumber<null>>(true)
	testType.false<IsNumber<boolean>>(true)
	testType.false<IsNumber<true>>(true)
	testType.false<IsNumber<false>>(true)
	testType.false<IsNumber<string>>(true)
	testType.false<IsNumber<''>>(true)
	testType.false<IsNumber<symbol>>(true)
	testType.false<IsNumber<bigint>>(true)
	testType.false<IsNumber<1n>>(true)
	testType.false<IsNumber<{}>>(true)
	testType.false<IsNumber<string[]>>(true)
	testType.false<IsNumber<[]>>(true)
	testType.false<IsNumber<Function>>(true)
	testType.false<IsNumber<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNumber<number | string>, boolean>(true)
	testType.equal<IsNumber<1 | string>, boolean>(true)
	testType.equal<IsNumber<string | boolean>, false>(true)
	testType.equal<IsNumber<string | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNumber<number | string, { distributive: false }>, false>(true)
	testType.equal<IsNumber<1 | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNumber<number & { a: 1 }>, true>(true)
	testType.equal<IsNumber<number & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNumber<1 & { a: 1 }>, true>(true)
	testType.equal<IsNumber<1 & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsNumber<bigint & { a: 1 }>, false>(true)
	testType.equal<IsNumber<bigint & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsNumber<1n & { a: 1 }>, false>(true)
	testType.equal<IsNumber<1n & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNumber<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNumber<1, { selection: 'filter' }>, 1>(true)

	testType.equal<IsNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumber<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumber<string | number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNumber<string | 1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumber<string | boolean, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNumber<number, IsNumber.$Branch>, $Then>(true)
	testType.equal<IsNumber<1, IsNumber.$Branch>, $Then>(true)

	testType.equal<IsNumber<any, IsNumber.$Branch>, $Else>(true)
	testType.equal<IsNumber<unknown, IsNumber.$Branch>, $Else>(true)
	testType.equal<IsNumber<never, IsNumber.$Branch>, $Else>(true)
	testType.equal<IsNumber<void, IsNumber.$Branch>, $Else>(true)
	testType.equal<IsNumber<string, IsNumber.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNumber<any>, false>(true)
	testType.equal<IsNumber<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNumber<unknown>, false>(true)
	testType.equal<IsNumber<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNumber<never>, false>(true)
	testType.equal<IsNumber<never, { $never: unknown }>, unknown>(true)
})

describe('exact', () => {
	it('returns true for number', () => {
		testType.true<IsNumber<number, { exact: true }>>(true)
	})

	it('returns false if T is number literial', () => {
		testType.false<IsNumber<-1, { exact: true }>>(true)
		testType.false<IsNumber<0, { exact: true }>>(true)
		testType.false<IsNumber<1, { exact: true }>>(true)
		testType.false<IsNumber<1.1, { exact: true }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsNumber<void, { exact: true }>>(true)
		testType.false<IsNumber<unknown, { exact: true }>>(true)
		testType.false<IsNumber<any, { exact: true }>>(true)
		testType.false<IsNumber<never, { exact: true }>>(true)
	})

	it('returns false for all other types', () => {
		testType.false<IsNumber<undefined, { exact: true }>>(true)
		testType.false<IsNumber<null, { exact: true }>>(true)
		testType.false<IsNumber<boolean, { exact: true }>>(true)
		testType.false<IsNumber<true, { exact: true }>>(true)
		testType.false<IsNumber<false, { exact: true }>>(true)
		testType.false<IsNumber<string, { exact: true }>>(true)
		testType.false<IsNumber<'', { exact: true }>>(true)
		testType.false<IsNumber<symbol, { exact: true }>>(true)
		testType.false<IsNumber<bigint, { exact: true }>>(true)
		testType.false<IsNumber<1n, { exact: true }>>(true)
		testType.false<IsNumber<{}, { exact: true }>>(true)
		testType.false<IsNumber<string[], { exact: true }>>(true)
		testType.false<IsNumber<[], { exact: true }>>(true)
		testType.false<IsNumber<Function, { exact: true }>>(true)
		testType.false<IsNumber<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		// `number | 1` is pre-resolved by TypeScript to `number`
		testType.equal<number | 1, number>(true)
		testType.equal<IsNumber<number | 1, { exact: true }>, true>(true)
		testType.equal<IsNumber<number | string, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNumber<number | string, { distributive: false }>, false>(true)
		testType.equal<IsNumber<1 | 2, { distributive: false }>, true>(true)
	})

	it('returns true for intersection type', () => {
		testType.equal<IsNumber<number & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNumber<number & { a: 1 }, { distributive: false; exact: true }>, true>(true)

		testType.equal<IsNumber<1 & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsNumber<1 & { a: 1 }, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsNumber<1.1 & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsNumber<1.1 & { a: 1 }, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsNumber<1n & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsNumber<1n & { a: 1 }, { distributive: false; exact: true }>, false>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNumber<number, { selection: 'filter'; exact: true }>, number>(true)
		testType.equal<IsNumber<1, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsNumber<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNumber<unknown, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNumber<string | number, { selection: 'filter'; exact: true }>, number>(true)
		testType.equal<IsNumber<string | number, { selection: 'filter'; exact: true; distributive: false }>, never>(true)

		testType.equal<IsNumber<string | true, { selection: 'filter'; exact: true }>, never>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNumber<number, IsNumber.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNumber<1, IsNumber.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsNumber<any, IsNumber.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNumber<unknown, IsNumber.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNumber<never, IsNumber.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNumber<void, IsNumber.$Branch<{ exact: true }>>, $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsNumber<any, { exact: true }>, false>(true)
		testType.equal<IsNumber<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsNumber<unknown, { exact: true }>, false>(true)
		testType.equal<IsNumber<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsNumber<never, { exact: true }>, false>(true)
		testType.equal<IsNumber<never, { $never: unknown; exact: true }>, unknown>(true)
	})
})
