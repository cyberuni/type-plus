import { describe, it } from 'vitest'

import {
	type $Any,
	type $BranchOptions,
	type $Else,
	type $Fn,
	type $Never,
	type $Then,
	type $Unknown,
	type IsNotBoolean,
	testType,
} from '../index.js'

it('returns false if T is boolean', () => {
	testType.equal<IsNotBoolean<boolean>, false>(true)
})

it('returns false it T is true or false literal', () => {
	testType.equal<IsNotBoolean<true>, false>(true)
	testType.equal<IsNotBoolean<false>, false>(true)
})

it('returns true for special types', () => {
	testType.equal<IsNotBoolean<void>, true>(true)
	testType.equal<IsNotBoolean<unknown>, true>(true)
	testType.equal<IsNotBoolean<any>, true>(true)
	testType.equal<IsNotBoolean<never>, true>(true)
})

it('returns true for all other types', () => {
	testType.equal<IsNotBoolean<undefined>, true>(true)
	testType.equal<IsNotBoolean<null>, true>(true)
	testType.equal<IsNotBoolean<number>, true>(true)
	testType.equal<IsNotBoolean<1>, true>(true)
	testType.equal<IsNotBoolean<string>, true>(true)
	testType.equal<IsNotBoolean<''>, true>(true)
	testType.equal<IsNotBoolean<symbol>, true>(true)
	testType.equal<IsNotBoolean<bigint>, true>(true)
	testType.equal<IsNotBoolean<1n>, true>(true)
	testType.equal<IsNotBoolean<{}>, true>(true)
	testType.equal<IsNotBoolean<string[]>, true>(true)
	testType.equal<IsNotBoolean<[]>, true>(true)
	testType.equal<IsNotBoolean<Function>, true>(true)
	testType.equal<IsNotBoolean<() => void>, true>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotBoolean<boolean | 1, { distributive: false }>, true>(true)
})

it('intersection type', () => {
	testType.equal<IsNotBoolean<boolean & { a: 1 }>, false>(true)
	testType.equal<IsNotBoolean<boolean & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsNotBoolean<true & { a: 1 }>, false>(true)
	testType.equal<IsNotBoolean<true & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsNotBoolean<false & { a: 1 }>, false>(true)
	testType.equal<IsNotBoolean<false & { a: 1 }, { distributive: false }>, false>(true)
})

it('resolves `IsNotBoolean.$Default` the same as no options', () => {
	// `IsNotBoolean.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotBoolean<any, IsNotBoolean.$Default>, IsNotBoolean<any>>(true)
	testType.equal<IsNotBoolean<unknown, IsNotBoolean.$Default>, IsNotBoolean<unknown>>(true)
	testType.equal<IsNotBoolean<never, IsNotBoolean.$Default>, IsNotBoolean<never>>(true)
	testType.equal<IsNotBoolean<void, IsNotBoolean.$Default>, IsNotBoolean<void>>(true)
	testType.equal<IsNotBoolean<boolean, IsNotBoolean.$Default>, IsNotBoolean<boolean>>(true)
	testType.equal<IsNotBoolean<true, IsNotBoolean.$Default>, IsNotBoolean<true>>(true)
	testType.equal<IsNotBoolean<false, IsNotBoolean.$Default>, IsNotBoolean<false>>(true)
	testType.equal<IsNotBoolean<1, IsNotBoolean.$Default>, IsNotBoolean<1>>(true)
	testType.equal<IsNotBoolean<boolean | 1, IsNotBoolean.$Default>, IsNotBoolean<boolean | 1>>(true)
	testType.equal<IsNotBoolean<true & { a: 1 }, IsNotBoolean.$Default>, IsNotBoolean<true & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotBoolean<boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<true, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<false, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBoolean<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotBoolean<string | boolean, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotBoolean<string | boolean, { selection: 'filter'; distributive: false }>, string | boolean>(true)

	testType.equal<IsNotBoolean<string | true, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotBoolean<boolean, IsNotBoolean.$Branch>, $Else>(true)
	testType.equal<IsNotBoolean<string, IsNotBoolean.$Branch>, $Then>(true)

	testType.equal<IsNotBoolean<any, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<unknown, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<never, IsNotBoolean.$Branch>, $Then>(true)
	testType.equal<IsNotBoolean<void, IsNotBoolean.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotBoolean<any>, true>(true)
	testType.equal<IsNotBoolean<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotBoolean<unknown>, true>(true)
	testType.equal<IsNotBoolean<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotBoolean<never>, true>(true)
	testType.equal<IsNotBoolean<never, { $never: unknown }>, unknown>(true)
})

describe('exact mode', () => {
	it('returns false if T is boolean', () => {
		testType.equal<IsNotBoolean<boolean, { exact: true }>, false>(true)
	})

	it('returns true it T is true or false literal', () => {
		testType.equal<IsNotBoolean<true, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<false, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<true, { distributive: false; exact: true }>, true>(true)
		testType.equal<IsNotBoolean<false, { distributive: false; exact: true }>, true>(true)
	})

	it('returns true for special types', () => {
		testType.equal<IsNotBoolean<void, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<any, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<never, { exact: true }>, true>(true)
	})

	it('returns true for all other types', () => {
		testType.equal<IsNotBoolean<undefined, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<null, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<number, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<1, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<string, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<'', { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<symbol, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<bigint, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<1n, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<{}, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<{ a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<string[], { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<[], { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<Function, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<() => void, { exact: true }>, true>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsNotBoolean<boolean | 1, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotBoolean<boolean | 1, { distributive: false; exact: true }>, true>(true)
	})

	it('returns false for intersection type', () => {
		// `boolean & { a: 1 }` is considered as strict boolean
		testType.equal<IsNotBoolean<boolean & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsNotBoolean<boolean & { a: 1 }, { distributive: false }>, false>(true)

		testType.equal<IsNotBoolean<true & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<true & { a: 1 }, { distributive: false; exact: true }>, true>(true)

		testType.equal<IsNotBoolean<false & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<false & { a: 1 }, { distributive: false; exact: true }>, true>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotBoolean<boolean, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotBoolean<true, { selection: 'filter'; exact: true }>, true>(true)
		testType.equal<IsNotBoolean<false, { selection: 'filter'; exact: true }>, false>(true)

		testType.equal<IsNotBoolean<number, { selection: 'filter'; exact: true }>, number>(true)
		testType.equal<IsNotBoolean<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotBoolean<unknown, { selection: 'filter'; exact: true }>, unknown>(true)
		testType.equal<IsNotBoolean<string | boolean, { selection: 'filter'; exact: true }>, string>(true)
		testType.equal<
			IsNotBoolean<string | boolean, { selection: 'filter'; exact: true; distributive: false }>,
			string | boolean
		>(true)

		testType.equal<IsNotBoolean<string | true, { selection: 'filter'; exact: true }>, string | true>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotBoolean<boolean, IsNotBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNotBoolean<true, IsNotBoolean.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotBoolean<false, IsNotBoolean.$Branch<{ exact: true }>>, $Then>(true)

		testType.equal<IsNotBoolean<any, IsNotBoolean.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotBoolean<any, $BranchOptions<$Any> & { exact: true }>, $Any>(true)
		testType.equal<IsNotBoolean<any, $BranchOptions<$Any | ($Then & { exact: true })>>, $Any>(true)
		testType.equal<IsNotBoolean<unknown, IsNotBoolean.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotBoolean<unknown, $BranchOptions<$Unknown> & { exact: true }>, $Unknown>(true)
		testType.equal<IsNotBoolean<unknown, $BranchOptions<$Unknown | $Then> & { exact: true }>, $Unknown>(true)
		testType.equal<IsNotBoolean<never, IsNotBoolean.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotBoolean<never, $BranchOptions<$Never> & { exact: true }>, $Never>(true)
		testType.equal<IsNotBoolean<never, $BranchOptions<$Never | $Then> & { exact: true }>, $Never>(true)
		testType.equal<IsNotBoolean<void, IsNotBoolean.$Branch<{ exact: true }>>, $Then>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsNotBoolean<any, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsNotBoolean<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsNotBoolean<never, { exact: true }>, true>(true)
		testType.equal<IsNotBoolean<never, { $never: unknown; exact: true }>, unknown>(true)
	})
})

describe('IsNotBoolean.$Fn', () => {
	it('is IsNotBoolean as a type function', () => {
		testType.equal<$Fn.Apply<IsNotBoolean.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotBoolean.$Fn, boolean>, false>(true)
	})
})
