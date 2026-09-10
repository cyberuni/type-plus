import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsNotString, testType } from '../index.js'

it('returns false for string', () => {
	testType.false<IsNotString<string>>(true)
})

it('returns false if T is a string literal', () => {
	testType.false<IsNotString<''>>(true)
	testType.false<IsNotString<'a'>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotString<any>>(true)
	testType.true<IsNotString<unknown>>(true)
	testType.true<IsNotString<void>>(true)
	testType.true<IsNotString<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotString<undefined>>(true)
	testType.true<IsNotString<null>>(true)
	testType.true<IsNotString<boolean>>(true)
	testType.true<IsNotString<true>>(true)
	testType.true<IsNotString<false>>(true)
	testType.true<IsNotString<number>>(true)
	testType.true<IsNotString<1>>(true)
	testType.true<IsNotString<symbol>>(true)
	testType.true<IsNotString<bigint>>(true)
	testType.true<IsNotString<1n>>(true)
	testType.true<IsNotString<{}>>(true)
	testType.true<IsNotString<string[]>>(true)
	testType.true<IsNotString<[]>>(true)
	testType.true<IsNotString<Function>>(true)
	testType.true<IsNotString<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotString<string | number>, boolean>(true)
	testType.equal<IsNotString<'' | number>, boolean>(true)
	testType.equal<IsNotString<string | boolean>, boolean>(true)
})

it('returns false if N is union of string and string literal', () => {
	testType.equal<IsNotString<string | 'a'>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotString<string | 1>, boolean>(true)
	testType.equal<IsNotString<'' | 1, { distributive: false }>, true>(true)
	testType.equal<IsNotString<string | 1, { distributive: false }>, true>(true)
	testType.true<IsNotString<number | string, { distributive: false }>>(true)
})

it('returns false if T is intersection of string, as that is still considered a string', () => {
	testType.equal<IsNotString<string & { a: 1 }>, false>(true)
	testType.equal<IsNotString<string & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsNotString<'' & { a: 1 }>, false>(true)
	testType.equal<IsNotString<'' & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotString<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<'', { selection: 'filter' }>, never>(true)

	testType.equal<IsNotString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotString<string | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotString<'' | 1, { selection: 'filter' }>, 1>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotString<string, IsNotString.$Branch>, $Else>(true)
	testType.equal<IsNotString<'', IsNotString.$Branch>, $Else>(true)

	testType.equal<IsNotString<bigint, IsNotString.$Branch>, $Then>(true)
	testType.equal<IsNotString<any, IsNotString.$Branch>, $Then>(true)
	testType.equal<IsNotString<unknown, IsNotString.$Branch>, $Then>(true)
	testType.equal<IsNotString<never, IsNotString.$Branch>, $Then>(true)
	testType.equal<IsNotString<void, IsNotString.$Branch>, $Then>(true)

	testType.equal<IsNotString<string | number, IsNotString.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotString<any>, true>(true)
	testType.equal<IsNotString<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotString<unknown>, true>(true)
	testType.equal<IsNotString<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotString<never>, true>(true)
	testType.equal<IsNotString<never, { $never: unknown }>, unknown>(true)
})

describe('exact', () => {
	it('returns false for string', () => {
		testType.false<IsNotString<string, { exact: true }>>(true)
	})

	it('returns true if T is a string literal', () => {
		testType.true<IsNotString<'', { exact: true }>>(true)
		testType.true<IsNotString<'a', { exact: true }>>(true)
	})

	it('returns true for special types', () => {
		testType.true<IsNotString<any, { exact: true }>>(true)
		testType.true<IsNotString<unknown, { exact: true }>>(true)
		testType.true<IsNotString<void, { exact: true }>>(true)
		testType.true<IsNotString<never, { exact: true }>>(true)
	})

	it('returns true for other types', () => {
		testType.true<IsNotString<undefined, { exact: true }>>(true)
		testType.true<IsNotString<null, { exact: true }>>(true)
		testType.true<IsNotString<boolean, { exact: true }>>(true)
		testType.true<IsNotString<true, { exact: true }>>(true)
		testType.true<IsNotString<false, { exact: true }>>(true)
		testType.true<IsNotString<number, { exact: true }>>(true)
		testType.true<IsNotString<1, { exact: true }>>(true)
		testType.true<IsNotString<symbol, { exact: true }>>(true)
		testType.true<IsNotString<bigint, { exact: true }>>(true)
		testType.true<IsNotString<1n, { exact: true }>>(true)
		testType.true<IsNotString<{}, { exact: true }>>(true)
		testType.true<IsNotString<string[], { exact: true }>>(true)
		testType.true<IsNotString<[], { exact: true }>>(true)
		testType.true<IsNotString<Function, { exact: true }>>(true)
		testType.true<IsNotString<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		// `string | 'abc'` is pre-resolved by TypeScript to `string`
		testType.equal<string | 'abc', string>(true)
		testType.equal<IsNotString<string | 'abc', { exact: true }>, false>(true)
		testType.equal<IsNotString<string | number, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotString<string | number, { distributive: false; exact: true }>, true>(true)
	})

	it('returns false for intersection type', () => {
		testType.equal<IsNotString<number, { exact: true }>, true>(true)
		testType.equal<IsNotString<number, { distributive: false; exact: true }>, true>(true)

		testType.equal<IsNotString<string & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsNotString<string & { a: 1 }, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsNotString<'' & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNotString<'' & { a: 1 }, { distributive: false; exact: true }>, true>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotString<string, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotString<'', { selection: 'filter'; exact: true }>, ''>(true)

		testType.equal<IsNotString<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotString<unknown, { selection: 'filter'; exact: true }>, unknown>(true)
		testType.equal<IsNotString<string | number, { selection: 'filter'; exact: true }>, number>(true)
		testType.equal<
			IsNotString<string | number, { selection: 'filter'; exact: true; distributive: false }>,
			string | number
		>(true)
		testType.equal<IsNotString<'' | true, { selection: 'filter'; exact: true }>, '' | true>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotString<string, IsNotString.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNotString<'', IsNotString.$Branch<{ exact: true }>>, $Then>(true)

		testType.equal<IsNotString<any, IsNotString.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotString<unknown, IsNotString.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotString<never, IsNotString.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotString<void, IsNotString.$Branch<{ exact: true }>>, $Then>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsNotString<any, { exact: true }>, true>(true)
		testType.equal<IsNotString<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsNotString<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotString<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsNotString<never, { exact: true }>, true>(true)
		testType.equal<IsNotString<never, { $never: unknown; exact: true }>, unknown>(true)
	})
})
