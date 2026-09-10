import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsNotObject, testType } from '../index.js'

it('returns false if T is object', () => {
	testType.false<IsNotObject<object>>(true)
})

it('returns false if T is object literal', () => {
	testType.false<IsNotObject<{}>>(true)
	testType.false<IsNotObject<{ a: 1 }>>(true)
})

it('returns false if T is function as function is a subtype of object', () => {
	testType.false<IsNotObject<Function>>(true)
	testType.false<IsNotObject<() => void>>(true)
})

it('returns false if T is array or tuple', () => {
	testType.false<IsNotObject<string[]>>(true)
	testType.false<IsNotObject<[]>>(true)
	testType.false<IsNotObject<[1, 2]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotObject<void>>(true)
	testType.true<IsNotObject<unknown>>(true)
	testType.true<IsNotObject<any>>(true)
	testType.true<IsNotObject<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotObject<undefined>>(true)
	testType.true<IsNotObject<null>>(true)
	testType.true<IsNotObject<boolean>>(true)
	testType.true<IsNotObject<true>>(true)
	testType.true<IsNotObject<false>>(true)
	testType.true<IsNotObject<number>>(true)
	testType.true<IsNotObject<1>>(true)
	testType.true<IsNotObject<string>>(true)
	testType.true<IsNotObject<''>>(true)
	testType.true<IsNotObject<symbol>>(true)
	testType.true<IsNotObject<bigint>>(true)
	testType.true<IsNotObject<1n>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotObject<object | 1>, boolean>(true)
	testType.equal<IsNotObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsNotObject<{} | bigint>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsNotObject<{ a: 1 } | 1, { distributive: false }>, true>(true)

	testType.equal<IsNotObject<{} | 1>, boolean>(true)
	testType.equal<IsNotObject<{} | 1, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	testType.equal<object & [], object & []>(true)
	testType.false<IsNotObject<object & []>>(true)
	testType.false<IsNotObject<object & [], { distributive: false }>>(true)

	testType.false<IsNotObject<{ a: 1 } & []>>(true)
	testType.false<IsNotObject<{ a: 1 } & [], { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotObject<object, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<{}, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<{ a: 1 }, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<Function, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotObject<object | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotObject<{ a: 1 } | 1n, { selection: 'filter' }>, 1n>(true)
	testType.equal<IsNotObject<{} | bigint, { selection: 'filter' }>, bigint>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotObject<object, IsNotObject.$Branch>, $Else>(true)
	testType.equal<IsNotObject<{}, IsNotObject.$Branch>, $Else>(true)
	testType.equal<IsNotObject<{ a: 1 }, IsNotObject.$Branch>, $Else>(true)

	testType.equal<IsNotObject<any, IsNotObject.$Branch>, $Then>(true)
	testType.equal<IsNotObject<unknown, IsNotObject.$Branch>, $Then>(true)
	testType.equal<IsNotObject<never, IsNotObject.$Branch>, $Then>(true)
	testType.equal<IsNotObject<void, IsNotObject.$Branch>, $Then>(true)
	testType.equal<IsNotObject<string, IsNotObject.$Branch>, $Then>(true)

	testType.equal<IsNotObject<object | 1, IsNotObject.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotObject<any>, true>(true)
	testType.equal<IsNotObject<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotObject<unknown>, true>(true)
	testType.equal<IsNotObject<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotObject<never>, true>(true)
	testType.equal<IsNotObject<never, { $never: unknown }>, unknown>(true)
})

describe('exact mode', () => {
	it('returns false for object', () => {
		testType.equal<IsNotObject<object, { exact: true }>, false>(true)
	})

	it('returns true for object literal', () => {
		testType.equal<IsNotObject<{ a: number }, { exact: true }>, true>(true)
	})

	it('returns true for empty object literal', () => {
		testType.equal<IsNotObject<{}, { exact: true }>, true>(true)
	})

	it('returns true if T is array or tuple', () => {
		testType.true<IsNotObject<string[], { exact: true }>>(true)
		testType.true<IsNotObject<[], { exact: true }>>(true)
		testType.true<IsNotObject<[1, 2], { exact: true }>>(true)
	})

	it('returns true for function', () => {
		testType.true<IsNotObject<Function, { exact: true }>>(true)
	})

	it('returns true for special types', () => {
		testType.equal<IsNotObject<any, { exact: true }>, true>(true)
		testType.equal<IsNotObject<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotObject<never, { exact: true }>, true>(true)
		testType.equal<IsNotObject<void, { exact: true }>, true>(true)
	})

	it('returns true for all other types', () => {
		testType.true<IsNotObject<undefined, { exact: true }>>(true)
		testType.true<IsNotObject<null, { exact: true }>>(true)
		testType.true<IsNotObject<boolean, { exact: true }>>(true)
		testType.true<IsNotObject<true, { exact: true }>>(true)
		testType.true<IsNotObject<false, { exact: true }>>(true)
		testType.true<IsNotObject<number, { exact: true }>>(true)
		testType.true<IsNotObject<1, { exact: true }>>(true)
		testType.true<IsNotObject<string, { exact: true }>>(true)
		testType.true<IsNotObject<'', { exact: true }>>(true)
		testType.true<IsNotObject<symbol, { exact: true }>>(true)
		testType.true<IsNotObject<bigint, { exact: true }>>(true)
		testType.true<IsNotObject<1n, { exact: true }>>(true)
	})

	it('distributes for union type', () => {
		testType.equal<IsNotObject<object | 1, { exact: true }>, boolean>(true)
		testType.equal<IsNotObject<object | boolean, { exact: true }>, boolean>(true)
		testType.equal<IsNotObject<{ a: 1 } | 1, { exact: true }>, true>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotObject<{ a: 1 } | 1, { exact: true }>, true>(true)
		testType.equal<IsNotObject<{ a: 1 } | 1, { distributive: false; exact: true }>, true>(true)
	})

	it('returns true for intersection type', () => {
		// `object` intersect with any non-object type always returns `never`,
		// and `object & object -> object` directly.
		// so there is no intersection type that can produce a strict object.
		testType.equal<IsNotObject<object & Function, { exact: true }>, true>(true)
		testType.equal<IsNotObject<object & Function, { distributive: false; exact: true }>, true>(true)

		testType.true<IsNotObject<object & [], { exact: true }>>(true)
		testType.true<IsNotObject<object & [], { distributive: false; exact: true }>>(true)

		testType.true<IsNotObject<object & { a: 1 }, { exact: true }>>(true)
		testType.true<IsNotObject<object & { a: 1 }, { distributive: false; exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotObject<object, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotObject<{ a: 1 }, { selection: 'filter'; exact: true }>, { a: 1 }>(true)

		testType.equal<IsNotObject<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotObject<unknown, { selection: 'filter'; exact: true }>, unknown>(true)
		testType.equal<IsNotObject<object | boolean, { selection: 'filter'; exact: true }>, boolean>(true)
		testType.equal<IsNotObject<{ a: 1 } | boolean, { selection: 'filter'; exact: true }>, { a: 1 } | boolean>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotObject<object, IsNotObject.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNotObject<{ a: 1 }, IsNotObject.$Branch<{ exact: true }>>, $Then>(true)

		testType.equal<IsNotObject<any, IsNotObject.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotObject<unknown, IsNotObject.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotObject<never, IsNotObject.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotObject<void, IsNotObject.$Branch<{ exact: true }>>, $Then>(true)

		testType.equal<IsNotObject<object | 1, IsNotObject.$Branch<{ exact: true }>>, $Then | $Else>(true)
	})
})
