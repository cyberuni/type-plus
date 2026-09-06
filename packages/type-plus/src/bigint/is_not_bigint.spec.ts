import { describe, it } from 'vitest'

import {
	type $Any,
	type $BranchOptions,
	type $Else,
	type $Never,
	type $Then,
	type $Unknown,
	type IsNotBigint,
	testType,
} from '../index.js'

it('returns false for bigint', () => {
	testType.false<IsNotBigint<bigint>>(true)
})

it('returns false if T is bigint literals', () => {
	testType.false<IsNotBigint<0n>>(true)
	testType.false<IsNotBigint<1n>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotBigint<any>>(true)
	testType.true<IsNotBigint<unknown>>(true)
	testType.true<IsNotBigint<void>>(true)
	testType.true<IsNotBigint<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotBigint<undefined>>(true)
	testType.true<IsNotBigint<null>>(true)
	testType.true<IsNotBigint<boolean>>(true)
	testType.true<IsNotBigint<true>>(true)
	testType.true<IsNotBigint<false>>(true)
	testType.true<IsNotBigint<number>>(true)
	testType.true<IsNotBigint<1>>(true)
	testType.true<IsNotBigint<string>>(true)
	testType.true<IsNotBigint<''>>(true)
	testType.true<IsNotBigint<symbol>>(true)
	testType.true<IsNotBigint<{}>>(true)
	testType.true<IsNotBigint<string[]>>(true)
	testType.true<IsNotBigint<[]>>(true)
	testType.true<IsNotBigint<Function>>(true)
	testType.true<IsNotBigint<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotBigint<bigint | 1>, boolean>(true)
	testType.equal<IsNotBigint<string | boolean>, true>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotBigint<bigint & { a: 1 }>>(true)
	testType.false<IsNotBigint<bigint & { a: 1 }, { distributive: false }>>(true)

	testType.false<IsNotBigint<1n & { a: 1 }>>(true)
	testType.false<IsNotBigint<1n & { a: 1 }, { distributive: false }>>(true)

	testType.true<IsNotBigint<number & { a: 1 }>>(true)
	testType.true<IsNotBigint<number & { a: 1 }, { distributive: false }>>(true)
	testType.true<IsNotBigint<1 & { a: 1 }>>(true)
	testType.true<IsNotBigint<1 & { a: 1 }, { distributive: false }>>(true)
	testType.true<IsNotBigint<1.1 & { a: 1 }>>(true)
	testType.true<IsNotBigint<1.1 & { a: 1 }, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotBigint<1n, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotBigint<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBigint<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotBigint<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotBigint<string | 1n, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotBigint<bigint, { selection: 'filter' }>, never>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotBigint<bigint | string>, boolean>(true)
	testType.equal<IsNotBigint<bigint | string, { distributive: false }>, true>(true)

	testType.equal<IsNotBigint<1n | string>, boolean>(true)
	testType.equal<IsNotBigint<1n | string, { distributive: false }>, true>(true)

	testType.equal<IsNotBigint<number | string>, true>(true)
	testType.equal<IsNotBigint<number | string, { distributive: false }>, true>(true)
	testType.equal<IsNotBigint<1 | string>, true>(true)
	testType.equal<IsNotBigint<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotBigint<1.1 | string>, true>(true)
	testType.equal<IsNotBigint<1.1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotBigint<bigint | 1, { distributive: false }>, true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotBigint<bigint, IsNotBigint.$Branch>, $Else>(true)
	testType.equal<IsNotBigint<1n, IsNotBigint.$Branch>, $Else>(true)

	testType.equal<IsNotBigint<any, IsNotBigint.$Branch>, $Then>(true)
	testType.equal<IsNotBigint<any, $BranchOptions<$Any>>, $Any>(true)
	testType.equal<IsNotBigint<any, $BranchOptions<$Any | $Then>>, $Any>(true)
	testType.equal<IsNotBigint<unknown, IsNotBigint.$Branch>, $Then>(true)
	testType.equal<IsNotBigint<unknown, $BranchOptions<$Unknown>>, $Unknown>(true)
	testType.equal<IsNotBigint<unknown, $BranchOptions<$Unknown | $Then>>, $Unknown>(true)
	testType.equal<IsNotBigint<never, IsNotBigint.$Branch>, $Then>(true)
	testType.equal<IsNotBigint<never, $BranchOptions<$Never>>, $Never>(true)
	testType.equal<IsNotBigint<never, $BranchOptions<$Never | $Then>>, $Never>(true)
	testType.equal<IsNotBigint<void, IsNotBigint.$Branch>, $Then>(true)

	testType.equal<IsNotBigint<1n | 1, IsNotBigint.$Branch>, $Then | $Else>(true)
	testType.equal<IsNotBigint<string, IsNotBigint.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotBigint<any>, true>(true)
	testType.equal<IsNotBigint<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotBigint<unknown>, true>(true)
	testType.equal<IsNotBigint<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotBigint<never>, true>(true)
	testType.equal<IsNotBigint<never, { $never: unknown }>, unknown>(true)
})

describe('exact mode', () => {
	it('returns false for bigint', () => {
		testType.false<IsNotBigint<bigint, { exact: true }>>(true)
	})

	it('returns true if T is bigint literals', () => {
		testType.true<IsNotBigint<0n, { exact: true }>>(true)
		testType.true<IsNotBigint<1n, { exact: true }>>(true)
	})

	it('returns true for special types', () => {
		testType.true<IsNotBigint<any, { exact: true }>>(true)
		testType.true<IsNotBigint<unknown, { exact: true }>>(true)
		testType.true<IsNotBigint<void, { exact: true }>>(true)
		testType.true<IsNotBigint<never, { exact: true }>>(true)
	})

	it('returns true for other types', () => {
		testType.true<IsNotBigint<undefined, { exact: true }>>(true)
		testType.true<IsNotBigint<null, { exact: true }>>(true)
		testType.true<IsNotBigint<boolean, { exact: true }>>(true)
		testType.true<IsNotBigint<true, { exact: true }>>(true)
		testType.true<IsNotBigint<false, { exact: true }>>(true)
		testType.true<IsNotBigint<number, { exact: true }>>(true)
		testType.true<IsNotBigint<1, { exact: true }>>(true)
		testType.true<IsNotBigint<string, { exact: true }>>(true)
		testType.true<IsNotBigint<'', { exact: true }>>(true)
		testType.true<IsNotBigint<symbol, { exact: true }>>(true)
		testType.true<IsNotBigint<{}, { exact: true }>>(true)
		testType.true<IsNotBigint<string[], { exact: true }>>(true)
		testType.true<IsNotBigint<[], { exact: true }>>(true)
		testType.true<IsNotBigint<Function, { exact: true }>>(true)
		testType.true<IsNotBigint<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsNotBigint<bigint | 1, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotBigint<bigint | 1, { distributive: false; exact: true }>, true>(true)
	})

	it('consider intersection type as strict', () => {
		testType.false<IsNotBigint<bigint & { a: 1 }, { exact: true }>>(true)
		testType.false<IsNotBigint<bigint & { a: 1 }, { distributive: false; exact: true }>>(true)
		testType.true<IsNotBigint<1n & { a: 1 }, { exact: true }>>(true)
		testType.true<IsNotBigint<1n & { a: 1 }, { distributive: false; exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotBigint<bigint, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsNotBigint<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotBigint<unknown, { selection: 'filter'; exact: true }>, unknown>(true)
		testType.equal<IsNotBigint<string | boolean, { selection: 'filter'; exact: true }>, string | boolean>(true)

		testType.equal<IsNotBigint<string | bigint, { selection: 'filter'; exact: true }>, string>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotBigint<bigint, IsNotBigint.$Branch & { exact: true }>, $Else>(true)
		testType.equal<IsNotBigint<1n, IsNotBigint.$Branch & { exact: true }>, $Then>(true)

		testType.equal<IsNotBigint<any, IsNotBigint.$Branch & { exact: true }>, $Then>(true)
		testType.equal<IsNotBigint<unknown, IsNotBigint.$Branch & { exact: true }>, $Then>(true)
		testType.equal<IsNotBigint<never, IsNotBigint.$Branch & { exact: true }>, $Then>(true)
		testType.equal<IsNotBigint<void, IsNotBigint.$Branch & { exact: true }>, $Then>(true)

		testType.equal<IsNotBigint<bigint | 1, IsNotBigint.$Branch & { exact: true }>, $Then | $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsNotBigint<any, { exact: true }>, true>(true)
		testType.equal<IsNotBigint<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsNotBigint<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotBigint<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsNotBigint<never, { exact: true }>, true>(true)
		testType.equal<IsNotBigint<never, { $never: unknown; exact: true }>, unknown>(true)
	})
})
