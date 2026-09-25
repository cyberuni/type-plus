import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type AnyFunction, type IsFunction, testType } from '../index.js'

it('returns true if T is Function', () => {
	testType.true<IsFunction<Function>>(true)
})

it('returns true if T is function signature', () => {
	testType.true<IsFunction<() => void>>(true)
	testType.true<IsFunction<AnyFunction>>(true)
})

it('returns false for special types', () => {
	testType.false<IsFunction<any>>(true)
	testType.false<IsFunction<unknown>>(true)
	testType.false<IsFunction<void>>(true)
	testType.false<IsFunction<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsFunction<undefined>>(true)
	testType.false<IsFunction<null>>(true)
	testType.false<IsFunction<boolean>>(true)
	testType.false<IsFunction<true>>(true)
	testType.false<IsFunction<false>>(true)
	testType.false<IsFunction<number>>(true)
	testType.false<IsFunction<1>>(true)
	testType.false<IsFunction<string>>(true)
	testType.false<IsFunction<''>>(true)
	testType.false<IsFunction<symbol>>(true)
	testType.false<IsFunction<bigint>>(true)
	testType.false<IsFunction<1n>>(true)
	testType.false<IsFunction<{}>>(true)
	testType.false<IsFunction<{ a: 1 }>>(true)
	testType.false<IsFunction<string[]>>(true)
	testType.false<IsFunction<[]>>(true)
})

it('distributes over union type', () => {
	testType.equal<Function | 1, Function | 1>(true)
	testType.equal<IsFunction<Function | 1>, boolean>(true)
	testType.equal<IsFunction<(() => string) | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.false<IsFunction<Function | 1, { distributive: false }>>(true)
})

it('returns true if T is function overloads', () => {
	testType.true<IsFunction<{ (): void; (x: number): number }>>(true)
})

it('returns true if T is intersection of function', () => {
	testType.true<IsFunction<Function & { a: 1 }>>(true)
})

it('resolves `IsFunction.$Default` the same as no options', () => {
	// `IsFunction.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsFunction<any, IsFunction.$Default>, IsFunction<any>>(true)
	testType.equal<IsFunction<unknown, IsFunction.$Default>, IsFunction<unknown>>(true)
	testType.equal<IsFunction<never, IsFunction.$Default>, IsFunction<never>>(true)
	testType.equal<IsFunction<void, IsFunction.$Default>, IsFunction<void>>(true)
	testType.equal<IsFunction<Function, IsFunction.$Default>, IsFunction<Function>>(true)
	testType.equal<IsFunction<() => void, IsFunction.$Default>, IsFunction<() => void>>(true)
	testType.equal<IsFunction<string, IsFunction.$Default>, IsFunction<string>>(true)
	testType.equal<IsFunction<Function | string, IsFunction.$Default>, IsFunction<Function | string>>(true)
	testType.equal<IsFunction<Function & { a: 1 }, IsFunction.$Default>, IsFunction<Function & { a: 1 }>>(true)
})

describe('exact mode', () => {
	it('returns true if T is Function', () => {
		testType.true<IsFunction<Function, { exact: true }>>(true)
	})

	it('returns false if T is function signature', () => {
		testType.false<IsFunction<() => void, { exact: true }>>(true)
		testType.false<IsFunction<AnyFunction, { exact: true }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsFunction<void, { exact: true }>>(true)
		testType.false<IsFunction<unknown, { exact: true }>>(true)
		testType.false<IsFunction<any, { exact: true }>>(true)
		testType.false<IsFunction<never, { exact: true }>>(true)
	})

	it('returns false for all other types', () => {
		testType.false<IsFunction<undefined, { exact: true }>>(true)
		testType.false<IsFunction<null, { exact: true }>>(true)
		testType.false<IsFunction<boolean, { exact: true }>>(true)
		testType.false<IsFunction<true, { exact: true }>>(true)
		testType.false<IsFunction<false, { exact: true }>>(true)
		testType.false<IsFunction<number, { exact: true }>>(true)
		testType.false<IsFunction<1, { exact: true }>>(true)
		testType.false<IsFunction<string, { exact: true }>>(true)
		testType.false<IsFunction<'', { exact: true }>>(true)
		testType.false<IsFunction<symbol, { exact: true }>>(true)
		testType.false<IsFunction<bigint, { exact: true }>>(true)
		testType.false<IsFunction<1n, { exact: true }>>(true)
		testType.false<IsFunction<{}, { exact: true }>>(true)
		testType.false<IsFunction<{ a: 1 }, { exact: true }>>(true)
		testType.false<IsFunction<string[], { exact: true }>>(true)
		testType.false<IsFunction<[], { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsFunction<Function | { a: 1 }, { exact: true }>, boolean>(true)
		testType.equal<IsFunction<(() => void) | { a: 1 }, { exact: true }>, false>(true)
	})

	it('returns false if T is function overloads', () => {
		testType.false<IsFunction<{ (): void; (x: number): number }, { exact: true }>>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsFunction<Function | string, { exact: true; distributive: false }>, false>(true)
	})

	it('returns true for intersection of Function', () => {
		testType.equal<IsFunction<Function & { a: 1 }, { exact: true }>, true>(true)
	})

	it('returns false for intersection of a function signature', () => {
		testType.equal<IsFunction<(() => void) & { a: 1 }, { exact: true }>, false>(true)
	})

	it('works as filter', () => {
		testType.equal<IsFunction<Function, { exact: true; selection: 'filter' }>, Function>(true)
		testType.equal<IsFunction<() => void, { exact: true; selection: 'filter' }>, never>(true)

		testType.equal<IsFunction<never, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsFunction<unknown, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsFunction<Function | number, { exact: true; selection: 'filter' }>, Function>(true)
		testType.equal<IsFunction<Function | number, { exact: true; selection: 'filter'; distributive: false }>, never>(
			true,
		)

		testType.equal<IsFunction<Function | true, { exact: true; selection: 'filter' }>, Function>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsFunction<Function, IsFunction.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsFunction<() => void, IsFunction.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsFunction<any, IsFunction.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsFunction<unknown, IsFunction.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsFunction<never, IsFunction.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsFunction<void, IsFunction.$Branch<{ exact: true }>>, $Else>(true)
	})

	it('works with partial customization', () => {
		testType.equal<IsFunction<Function, { exact: true; $then: 1 }>, 1>(true)
		testType.equal<IsFunction<0, { exact: true; $then: 1 }>, false>(true)

		testType.equal<IsFunction<Function, { exact: true; $else: 2 }>, true>(true)
		testType.equal<IsFunction<0, { exact: true; $else: 2 }>, 2>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsFunction<any, { exact: true }>, false>(true)
		testType.equal<IsFunction<any, { exact: true; $any: any }>, any>(true)
		testType.equal<IsFunction<any, { exact: true; $any: 123 }>, 123>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsFunction<unknown, { exact: true }>, false>(true)
		testType.equal<IsFunction<unknown, { exact: true; $unknown: unknown }>, unknown>(true)
		testType.equal<IsFunction<unknown, { exact: true; $unknown: 123 }>, 123>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsFunction<never, { exact: true }>, false>(true)
		testType.equal<IsFunction<never, { exact: true; $never: unknown }>, unknown>(true)
		testType.equal<IsFunction<never, { exact: true; $never: 123 }>, 123>(true)
	})

	it('works as a type function', () => {
		testType.equal<$Fn.Apply<IsFunction.$Fn<{ exact: true }>, Function>, true>(true)
		testType.equal<$Fn.Apply<IsFunction.$Fn<{ exact: true }>, () => void>, false>(true)
	})
})

it('works as filter', () => {
	testType.equal<IsFunction<Function, { selection: 'filter' }>, Function>(true)
	testType.equal<IsFunction<() => void, { selection: 'filter' }>, () => void>(true)

	testType.equal<IsFunction<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsFunction<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsFunction<{ a: 1 }, { selection: 'filter' }>, never>(true)
	testType.equal<IsFunction<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsFunction<string | Function, { selection: 'filter' }>, Function>(true)
	testType.equal<IsFunction<string | (() => string), { selection: 'filter' }>, () => string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsFunction<Function, IsFunction.$Branch>, $Then>(true)
	testType.equal<IsFunction<() => boolean, IsFunction.$Branch>, $Then>(true)

	testType.equal<IsFunction<any, IsFunction.$Branch>, $Else>(true)
	testType.equal<IsFunction<unknown, IsFunction.$Branch>, $Else>(true)
	testType.equal<IsFunction<never, IsFunction.$Branch>, $Else>(true)
	testType.equal<IsFunction<string, IsFunction.$Branch>, $Else>(true)
	testType.equal<IsFunction<void, IsFunction.$Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<IsFunction<Function, { $then: 1 }>, 1>(true)
	testType.equal<IsFunction<0, { $then: 1 }>, false>(true)

	testType.equal<IsFunction<Function, { $else: 2 }>, true>(true)
	testType.equal<IsFunction<0, { $else: 2 }>, 2>(true)
})

it('can override $any branch', () => {
	testType.equal<IsFunction<any>, false>(true)
	testType.equal<IsFunction<any, { $any: any }>, any>(true)
	testType.equal<IsFunction<any, { $any: 123 }>, 123>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsFunction<unknown>, false>(true)
	testType.equal<IsFunction<unknown, { $unknown: unknown }>, unknown>(true)
	testType.equal<IsFunction<unknown, { $unknown: 123 }>, 123>(true)
})

it('can override $never branch', () => {
	testType.equal<IsFunction<never>, false>(true)
	testType.equal<IsFunction<never, { $never: unknown }>, unknown>(true)
	testType.equal<IsFunction<never, { $never: 123 }>, 123>(true)
})

describe('IsFunction.$Fn', () => {
	it('is IsFunction as a type function', () => {
		testType.equal<$Fn.Apply<IsFunction.$Fn, () => void>, true>(true)
		testType.equal<$Fn.Apply<IsFunction.$Fn, 1>, false>(true)
	})
})
