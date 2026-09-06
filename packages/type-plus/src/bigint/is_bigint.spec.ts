import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsBigint, testType } from '../index.js'

it('returns true for bigint', () => {
	testType.equal<IsBigint<bigint>, true>(true)
})

it('returns true if T is bigint literals', () => {
	testType.true<IsBigint<0n>>(true)
	testType.true<IsBigint<1n>>(true)
})

it('returns false for special types', () => {
	testType.false<IsBigint<any>>(true)
	testType.false<IsBigint<unknown>>(true)
	testType.false<IsBigint<void>>(true)
	testType.false<IsBigint<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsBigint<undefined>>(true)
	testType.false<IsBigint<null>>(true)
	testType.false<IsBigint<boolean>>(true)
	testType.false<IsBigint<true>>(true)
	testType.false<IsBigint<false>>(true)
	testType.false<IsBigint<number>>(true)
	testType.false<IsBigint<1>>(true)
	testType.false<IsBigint<string>>(true)
	testType.false<IsBigint<''>>(true)
	testType.false<IsBigint<symbol>>(true)
	testType.false<IsBigint<{}>>(true)
	testType.false<IsBigint<string[]>>(true)
	testType.false<IsBigint<[]>>(true)
	testType.false<IsBigint<Function>>(true)
	testType.false<IsBigint<() => void>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsBigint<bigint | 1>, boolean>(true)
	testType.equal<IsBigint<1n | 1>, boolean>(true)
	testType.equal<IsBigint<string | boolean>, false>(true)
	testType.equal<IsBigint<string | bigint>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsBigint<bigint | string>, boolean>(true)
	testType.equal<IsBigint<bigint | string, { distributive: false }>, false>(true)

	testType.equal<IsBigint<1n | string>, boolean>(true)
	testType.equal<IsBigint<1n | string, { distributive: false }>, false>(true)

	testType.equal<IsBigint<number | string>, false>(true)
	testType.equal<IsBigint<number | string, { distributive: false }>, false>(true)

	testType.equal<IsBigint<1 | string>, false>(true)
	testType.equal<IsBigint<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsBigint<bigint | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsBigint<bigint & { a: 1 }>>(true)
	testType.true<IsBigint<bigint & { a: 1 }, { distributive: false }>>(true)
	testType.true<IsBigint<1n & { a: 1 }>>(true)
	testType.true<IsBigint<1n & { a: 1 }, { distributive: false }>>(true)

	testType.false<IsBigint<number & { a: 1 }>>(true)
	testType.false<IsBigint<number & { a: 1 }, { distributive: false }>>(true)
	testType.false<IsBigint<1 & { a: 1 }>>(true)
	testType.false<IsBigint<1 & { a: 1 }, { distributive: false }>>(true)
	testType.false<IsBigint<1.1 & { a: 1 }>>(true)
	testType.false<IsBigint<1.1 & { a: 1 }, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsBigint<1n, { selection: 'filter' }>, 1n>(true)

	testType.equal<IsBigint<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigint<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsBigint<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsBigint<string | 1n, { selection: 'filter' }>, 1n>(true)
	testType.equal<IsBigint<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsBigint<string | bigint, { selection: 'filter' }>, bigint>(true)
})

it('works with unique branches', () => {
	testType.equal<IsBigint<bigint, IsBigint.$Branch>, $Then>(true)
	testType.equal<IsBigint<1n, IsBigint.$Branch>, $Then>(true)

	testType.equal<IsBigint<any, IsBigint.$Branch>, $Else>(true)
	testType.equal<IsBigint<unknown, IsBigint.$Branch>, $Else>(true)
	testType.equal<IsBigint<never, IsBigint.$Branch>, $Else>(true)
	testType.equal<IsBigint<void, IsBigint.$Branch>, $Else>(true)

	testType.equal<IsBigint<1n | 1, IsBigint.$Branch>, $Then | $Else>(true)
	testType.equal<IsBigint<string, IsBigint.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsBigint<any>, false>(true)
	testType.equal<IsBigint<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsBigint<unknown>, false>(true)
	testType.equal<IsBigint<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsBigint<never>, false>(true)
	testType.equal<IsBigint<never, { $never: unknown }>, unknown>(true)
})

describe('exact mode', () => {
	it('returns true for bigint', () => {
		testType.true<IsBigint<bigint, { exact: true }>>(true)
	})

	it('returns false if T is bigint literals', () => {
		testType.false<IsBigint<0n, { exact: true }>>(true)
		testType.false<IsBigint<1n, { exact: true }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsBigint<any, { exact: true }>>(true)
		testType.false<IsBigint<unknown, { exact: true }>>(true)
		testType.false<IsBigint<void, { exact: true }>>(true)
		testType.false<IsBigint<never, { exact: true }>>(true)
	})

	it('returns false for other types', () => {
		testType.false<IsBigint<undefined, { exact: true }>>(true)
		testType.false<IsBigint<null, { exact: true }>>(true)
		testType.false<IsBigint<boolean, { exact: true }>>(true)
		testType.false<IsBigint<true, { exact: true }>>(true)
		testType.false<IsBigint<false, { exact: true }>>(true)
		testType.false<IsBigint<number, { exact: true }>>(true)
		testType.false<IsBigint<1, { exact: true }>>(true)
		testType.false<IsBigint<string, { exact: true }>>(true)
		testType.false<IsBigint<'', { exact: true }>>(true)
		testType.false<IsBigint<symbol, { exact: true }>>(true)
		testType.false<IsBigint<{}, { exact: true }>>(true)
		testType.false<IsBigint<string[], { exact: true }>>(true)
		testType.false<IsBigint<[], { exact: true }>>(true)
		testType.false<IsBigint<Function, { exact: true }>>(true)
		testType.false<IsBigint<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsBigint<bigint | 1, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsBigint<bigint | string, { exact: true }>, boolean>(true)
		testType.equal<IsBigint<bigint | string, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsBigint<1n | string, { exact: true }>, false>(true)
		testType.equal<IsBigint<1n | string, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsBigint<number | string, { exact: true }>, false>(true)
		testType.equal<IsBigint<number | string, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsBigint<1 | string, { exact: true }>, false>(true)
		testType.equal<IsBigint<1 | string, { distributive: false; exact: true }>, false>(true)
	})

	it('consider intersection type as strict', () => {
		testType.true<IsBigint<bigint & { a: 1 }, { exact: true }>>(true)
		testType.true<IsBigint<bigint & { a: 1 }, { distributive: false; exact: true }>>(true)

		testType.false<IsBigint<1n & { a: 1 }, { exact: true }>>(true)
		testType.false<IsBigint<1n & { a: 1 }, { distributive: false; exact: true }>>(true)

		testType.false<IsBigint<number & { a: 1 }, { exact: true }>>(true)
		testType.false<IsBigint<number & { a: 1 }, { distributive: false; exact: true }>>(true)

		testType.false<IsBigint<1 & { a: 1 }, { exact: true }>>(true)
		testType.false<IsBigint<1 & { a: 1 }, { distributive: false; exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsBigint<bigint, { selection: 'filter'; exact: true }>, bigint>(true)
		testType.equal<IsBigint<1n, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsBigint<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsBigint<unknown, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsBigint<string | boolean, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<never | bigint, bigint>(true)
		testType.equal<IsBigint<string | bigint, { selection: 'filter'; exact: true }>, bigint>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsBigint<bigint, IsBigint.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsBigint<1n, IsBigint.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsBigint<any, IsBigint.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBigint<unknown, IsBigint.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBigint<never, IsBigint.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBigint<void, IsBigint.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsBigint<bigint | 1, IsBigint.$Branch<{ exact: true }>>, $Then | $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsBigint<any, { exact: true }>, false>(true)
		testType.equal<IsBigint<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsBigint<unknown, { exact: true }>, false>(true)
		testType.equal<IsBigint<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsBigint<never, { exact: true }>, false>(true)
		testType.equal<IsBigint<never, { $never: unknown; exact: true }>, unknown>(true)
	})
})
