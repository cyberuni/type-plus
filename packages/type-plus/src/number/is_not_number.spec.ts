import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsNotNumber, testType } from '../index.js'

it('returns false for number', () => {
	testType.false<IsNotNumber<number>>(true)
})

it('returns false if T is number literial', () => {
	testType.false<IsNotNumber<-1>>(true)
	testType.false<IsNotNumber<0>>(true)
	testType.false<IsNotNumber<1>>(true)
	testType.false<IsNotNumber<1.1>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotNumber<void>>(true)
	testType.true<IsNotNumber<unknown>>(true)
	testType.true<IsNotNumber<any>>(true)
	testType.true<IsNotNumber<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotNumber<undefined>>(true)
	testType.true<IsNotNumber<null>>(true)
	testType.true<IsNotNumber<boolean>>(true)
	testType.true<IsNotNumber<true>>(true)
	testType.true<IsNotNumber<true>>(true)
	testType.true<IsNotNumber<string>>(true)
	testType.true<IsNotNumber<''>>(true)
	testType.true<IsNotNumber<symbol>>(true)
	testType.true<IsNotNumber<bigint>>(true)
	testType.true<IsNotNumber<1n>>(true)
	testType.true<IsNotNumber<{}>>(true)
	testType.true<IsNotNumber<string[]>>(true)
	testType.true<IsNotNumber<[]>>(true)
	testType.true<IsNotNumber<Function>>(true)
	testType.true<IsNotNumber<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotNumber<number | string>, boolean>(true)
	testType.equal<IsNotNumber<string | number>, boolean>(true)
	testType.equal<IsNotNumber<1 | string>, boolean>(true)
})

it('returns false if N is union of number and number literal', () => {
	testType.equal<IsNotNumber<number | 1>, false>(true)
})

it('returns false if T is intersection of number, as that is still considered a number', () => {
	testType.equal<IsNotNumber<number & { a: 1 }>, false>(true)
	testType.equal<IsNotNumber<number & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsNotNumber<1 & { a: 1 }>, false>(true)
	testType.equal<IsNotNumber<1 & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsNotNumber<1.1 & { a: 1 }>, false>(true)
	testType.equal<IsNotNumber<1.1 & { a: 1 }, { distributive: false }>, false>(true)
})

it('returns true if T is an intersection of bigint and bigint literal', () => {
	testType.equal<IsNotNumber<bigint & { a: 1 }>, true>(true)
	testType.equal<IsNotNumber<bigint & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsNotNumber<1n & { a: 1 }>, true>(true)
	testType.equal<IsNotNumber<1n & { a: 1 }, { distributive: false }>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotNumber<1n | 1>, boolean>(true)
	testType.equal<IsNotNumber<1n | 1, { distributive: false }>, true>(true)
	testType.true<IsNotNumber<number | string, { distributive: false }>>(true)
	testType.equal<IsNotNumber<1 | string, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotNumber<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumber<1, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumber<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotNumber<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotNumber<string | 1, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotNumber<number, IsNotNumber.$Branch>, $Else>(true)
	testType.equal<IsNotNumber<1, IsNotNumber.$Branch>, $Else>(true)

	testType.equal<IsNotNumber<any, IsNotNumber.$Branch>, $Then>(true)
	testType.equal<IsNotNumber<unknown, IsNotNumber.$Branch>, $Then>(true)
	testType.equal<IsNotNumber<never, IsNotNumber.$Branch>, $Then>(true)
	testType.equal<IsNotNumber<void, IsNotNumber.$Branch>, $Then>(true)

	testType.equal<IsNotNumber<1n | 1, IsNotNumber.$Branch>, $Then | $Else>(true)
	testType.equal<IsNotNumber<string, IsNotNumber.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotNumber<any>, true>(true)
	testType.equal<IsNotNumber<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotNumber<unknown>, true>(true)
	testType.equal<IsNotNumber<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotNumber<never>, true>(true)
	testType.equal<IsNotNumber<never, { $never: unknown }>, unknown>(true)
})

describe('exact', () => {
	it('returns false for number', () => {
		testType.false<IsNotNumber<number, { exact: true }>>(true)
	})

	it('returns true if T is number literial', () => {
		testType.true<IsNotNumber<-1, { exact: true }>>(true)
		testType.true<IsNotNumber<0, { exact: true }>>(true)
		testType.true<IsNotNumber<1, { exact: true }>>(true)
		testType.true<IsNotNumber<1.1, { exact: true }>>(true)
	})

	it('returns true for special types', () => {
		testType.true<IsNotNumber<void, { exact: true }>>(true)
		testType.true<IsNotNumber<unknown, { exact: true }>>(true)
		testType.true<IsNotNumber<any, { exact: true }>>(true)
		testType.true<IsNotNumber<never, { exact: true }>>(true)
	})

	it('returns true for all other types', () => {
		testType.true<IsNotNumber<undefined, { exact: true }>>(true)
		testType.true<IsNotNumber<null, { exact: true }>>(true)
		testType.true<IsNotNumber<boolean, { exact: true }>>(true)
		testType.true<IsNotNumber<true, { exact: true }>>(true)
		testType.true<IsNotNumber<true, { exact: true }>>(true)
		testType.true<IsNotNumber<string, { exact: true }>>(true)
		testType.true<IsNotNumber<'', { exact: true }>>(true)
		testType.true<IsNotNumber<symbol, { exact: true }>>(true)
		testType.true<IsNotNumber<bigint, { exact: true }>>(true)
		testType.true<IsNotNumber<1n, { exact: true }>>(true)
		testType.true<IsNotNumber<{}, { exact: true }>>(true)
		testType.true<IsNotNumber<string[], { exact: true }>>(true)
		testType.true<IsNotNumber<[], { exact: true }>>(true)
		testType.true<IsNotNumber<Function, { exact: true }>>(true)
		testType.true<IsNotNumber<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		// `number | 1` is pre-resolved by TypeScript to `number`
		testType.equal<number | 1, number>(true)
		testType.equal<IsNotNumber<number | 1, { exact: true }>, false>(true)
		testType.equal<IsNotNumber<number | string, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotNumber<number | string, { distributive: false; exact: true }>, true>(true)
	})

	it('returns false for intersection type', () => {
		testType.false<IsNotNumber<number & { a: 1 }, { exact: true }>>(true)
		testType.false<IsNotNumber<number & { a: 1 }, { distributive: false; exact: true }>>(true)

		testType.true<IsNotNumber<1 & { a: 1 }, { exact: true }>>(true)
		testType.true<IsNotNumber<1 & { a: 1 }, { distributive: false; exact: true }>>(true)

		testType.true<IsNotNumber<1.1 & { a: 1 }, { exact: true }>>(true)
		testType.true<IsNotNumber<1.1 & { a: 1 }, { distributive: false; exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotNumber<number, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsNotNumber<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotNumber<unknown, { selection: 'filter'; exact: true }>, unknown>(true)
		testType.equal<IsNotNumber<string | boolean, { selection: 'filter'; exact: true }>, string | boolean>(true)

		testType.equal<IsNotNumber<string | number, { selection: 'filter'; exact: true }>, string>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotNumber<number, IsNotNumber.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNotNumber<1, IsNotNumber.$Branch<{ exact: true }>>, $Then>(true)

		testType.equal<IsNotNumber<any, IsNotNumber.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotNumber<unknown, IsNotNumber.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotNumber<never, IsNotNumber.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotNumber<void, IsNotNumber.$Branch<{ exact: true }>>, $Then>(true)

		testType.equal<IsNotNumber<number | string, IsNotNumber.$Branch<{ exact: true }>>, $Then | $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsNotNumber<any, { exact: true }>, true>(true)
		testType.equal<IsNotNumber<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsNotNumber<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotNumber<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsNotNumber<never, { exact: true }>, true>(true)
		testType.equal<IsNotNumber<never, { $never: unknown; exact: true }>, unknown>(true)
	})
})
