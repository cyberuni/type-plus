import { describe, it } from 'vitest'
import { type $Else, type $Fn, type $Then, type IsBoolean, testType } from '../index.js'

it('returns true if T is boolean', () => {
	testType.equal<IsBoolean<boolean>, true>(true)
})

it('returns true it T is true or false literal', () => {
	testType.equal<IsBoolean<true>, true>(true)
	testType.equal<IsBoolean<false>, true>(true)
})

it('returns false for special types', () => {
	testType.equal<IsBoolean<void>, false>(true)
	testType.equal<IsBoolean<unknown>, false>(true)
	testType.equal<IsBoolean<any>, false>(true)
	testType.equal<IsBoolean<never>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsBoolean<undefined>, false>(true)
	testType.equal<IsBoolean<null>, false>(true)
	testType.equal<IsBoolean<number>, false>(true)
	testType.equal<IsBoolean<1>, false>(true)
	testType.equal<IsBoolean<string>, false>(true)
	testType.equal<IsBoolean<''>, false>(true)
	testType.equal<IsBoolean<symbol>, false>(true)
	testType.equal<IsBoolean<bigint>, false>(true)
	testType.equal<IsBoolean<1n>, false>(true)
	testType.equal<IsBoolean<{}>, false>(true)
	testType.equal<IsBoolean<{ a: 1 }>, false>(true)
	testType.equal<IsBoolean<string[]>, false>(true)
	testType.equal<IsBoolean<[]>, false>(true)
	testType.equal<IsBoolean<Function>, false>(true)
	testType.equal<IsBoolean<() => void>, false>(true)
})

it('distributes over union type', () => {
	testType.equal<IsBoolean<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsBoolean<boolean | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsBoolean<boolean & { a: 1 }>, true>(true)
	testType.equal<IsBoolean<boolean & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsBoolean<true & { a: 1 }>, true>(true)
	testType.equal<IsBoolean<true & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsBoolean<false & { a: 1 }>, true>(true)
	testType.equal<IsBoolean<false & { a: 1 }, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsBoolean<boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsBoolean<true, { selection: 'filter' }>, true>(true)

	testType.equal<IsBoolean<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsBoolean<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsBoolean<string | boolean, { selection: 'filter' }>, boolean>(true)

	testType.equal<IsBoolean<string | true, { selection: 'filter' }>, true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsBoolean<boolean, IsBoolean.$Branch>, $Then>(true)
	testType.equal<IsBoolean<true, IsBoolean.$Branch>, $Then>(true)

	testType.equal<IsBoolean<any, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<unknown, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<never, IsBoolean.$Branch>, $Else>(true)
	testType.equal<IsBoolean<void, IsBoolean.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsBoolean<any>, false>(true)
	testType.equal<IsBoolean<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsBoolean<unknown>, false>(true)
	testType.equal<IsBoolean<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsBoolean<never>, false>(true)
	testType.equal<IsBoolean<never, { $never: unknown }>, unknown>(true)
})

describe('exact mode', () => {
	it('returns true if T is boolean', () => {
		testType.equal<IsBoolean<boolean, { exact: true }>, true>(true)
	})

	it('returns false it T is true or false literal', () => {
		testType.equal<IsBoolean<true, { exact: true }>, false>(true)
		testType.equal<IsBoolean<false, { exact: true }>, false>(true)
	})

	it('returns false for special types', () => {
		testType.equal<IsBoolean<void, { exact: true }>, false>(true)
		testType.equal<IsBoolean<unknown, { exact: true }>, false>(true)
		testType.equal<IsBoolean<any, { exact: true }>, false>(true)
		testType.equal<IsBoolean<never, { exact: true }>, false>(true)
	})

	it('returns false for other types', () => {
		testType.equal<IsBoolean<undefined, { exact: true }>, false>(true)
		testType.equal<IsBoolean<null, { exact: true }>, false>(true)
		testType.equal<IsBoolean<number, { exact: true }>, false>(true)
		testType.equal<IsBoolean<1, { exact: true }>, false>(true)
		testType.equal<IsBoolean<string, { exact: true }>, false>(true)
		testType.equal<IsBoolean<'', { exact: true }>, false>(true)
		testType.equal<IsBoolean<symbol, { exact: true }>, false>(true)
		testType.equal<IsBoolean<bigint, { exact: true }>, false>(true)
		testType.equal<IsBoolean<1n, { exact: true }>, false>(true)
		testType.equal<IsBoolean<{}, { exact: true }>, false>(true)
		testType.equal<IsBoolean<{ a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<string[], { exact: true }>, false>(true)
		testType.equal<IsBoolean<[], { exact: true }>, false>(true)
		testType.equal<IsBoolean<Function, { exact: true }>, false>(true)
		testType.equal<IsBoolean<() => void, { exact: true }>, false>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsBoolean<boolean | 1, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsBoolean<boolean | 1, { exact: true }>, boolean>(true)
		testType.equal<IsBoolean<boolean | 1, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsBoolean<true | string, { exact: true }>, false>(true)
		testType.equal<IsBoolean<true | string, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsBoolean<false | string, { exact: true }>, false>(true)
		testType.equal<IsBoolean<false | string, { distributive: false; exact: true }>, false>(true)
	})

	it('returns true for intersection type', () => {
		testType.equal<IsBoolean<number & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<number & { a: 1 }, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsBoolean<boolean & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsBoolean<boolean & { a: 1 }, { distributive: false; exact: true }>, true>(true)

		testType.equal<IsBoolean<true & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<true & { a: 1 }, { distributive: false; exact: true }>, false>(true)

		testType.equal<IsBoolean<false & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsBoolean<false & { a: 1 }, { distributive: false; exact: true }>, false>(true)
	})

	it('works as filter', () => {
		testType.equal<IsBoolean<boolean, { selection: 'filter'; exact: true }>, boolean>(true)
		testType.equal<IsBoolean<true, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsBoolean<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsBoolean<unknown, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsBoolean<string | boolean, { selection: 'filter'; exact: true }>, boolean>(true)
		testType.equal<IsBoolean<string | boolean, { selection: 'filter'; exact: true; distributive: false }>, never>(true)

		testType.equal<IsBoolean<string | true, { selection: 'filter'; exact: true }>, never>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsBoolean<boolean, IsBoolean.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsBoolean<true, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<false, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsBoolean<any, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<unknown, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<never, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsBoolean<void, IsBoolean.$Branch<{ exact: true }>>, $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsBoolean<any, { exact: true }>, false>(true)
		testType.equal<IsBoolean<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsBoolean<unknown, { exact: true }>, false>(true)
		testType.equal<IsBoolean<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsBoolean<never, { exact: true }>, false>(true)
		testType.equal<IsBoolean<never, { $never: unknown; exact: true }>, unknown>(true)
	})
})

describe('IsBoolean.$Fn', () => {
	it('is IsBoolean as a type function', () => {
		testType.equal<$Fn.Apply<IsBoolean.$Fn, boolean>, true>(true)
		testType.equal<$Fn.Apply<IsBoolean.$Fn, 1>, false>(true)
	})
})

it('resolves `IsBoolean.$Default` the same as no options', () => {
	// `IsBoolean.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsBoolean<any, IsBoolean.$Default>, IsBoolean<any>>(true)
	testType.equal<IsBoolean<unknown, IsBoolean.$Default>, IsBoolean<unknown>>(true)
	testType.equal<IsBoolean<never, IsBoolean.$Default>, IsBoolean<never>>(true)
	testType.equal<IsBoolean<void, IsBoolean.$Default>, IsBoolean<void>>(true)
	testType.equal<IsBoolean<undefined, IsBoolean.$Default>, IsBoolean<undefined>>(true)
	testType.equal<IsBoolean<null, IsBoolean.$Default>, IsBoolean<null>>(true)
	testType.equal<IsBoolean<boolean, IsBoolean.$Default>, IsBoolean<boolean>>(true)
	testType.equal<IsBoolean<true, IsBoolean.$Default>, IsBoolean<true>>(true)
	testType.equal<IsBoolean<1, IsBoolean.$Default>, IsBoolean<1>>(true)
	testType.equal<IsBoolean<number, IsBoolean.$Default>, IsBoolean<number>>(true)
	testType.equal<IsBoolean<'a', IsBoolean.$Default>, IsBoolean<'a'>>(true)
	testType.equal<IsBoolean<string, IsBoolean.$Default>, IsBoolean<string>>(true)
	testType.equal<IsBoolean<symbol, IsBoolean.$Default>, IsBoolean<symbol>>(true)
	testType.equal<IsBoolean<1n, IsBoolean.$Default>, IsBoolean<1n>>(true)
	testType.equal<IsBoolean<{}, IsBoolean.$Default>, IsBoolean<{}>>(true)
	testType.equal<IsBoolean<[], IsBoolean.$Default>, IsBoolean<[]>>(true)
	testType.equal<IsBoolean<() => void, IsBoolean.$Default>, IsBoolean<() => void>>(true)
	testType.equal<IsBoolean<1 | string, IsBoolean.$Default>, IsBoolean<1 | string>>(true)
})

it('uses the $then and $else overrides', () => {
	testType.equal<IsBoolean<boolean, { $then: 'yes' }>, 'yes'>(true)
	testType.equal<IsBoolean<1, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})
