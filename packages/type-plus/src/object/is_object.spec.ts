import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsObject, testType } from '../index.js'

it('returns true if T is object', () => {
	testType.true<IsObject<object>>(true)
})

it('returns true if T is object literal', () => {
	testType.true<IsObject<{}>>(true)
	testType.true<IsObject<{ a: 1 }>>(true)
})

it('returns true if T is function as function is a subtype of object', () => {
	testType.true<IsObject<Function>>(true)
	testType.true<IsObject<() => void>>(true)
})

it('returns true if T is array or tuple', () => {
	testType.true<IsObject<string[]>>(true)
	testType.true<IsObject<[]>>(true)
	testType.true<IsObject<[1, 2]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsObject<void>>(true)
	testType.false<IsObject<unknown>>(true)
	testType.false<IsObject<any>>(true)
	testType.false<IsObject<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsObject<undefined>>(true)
	testType.false<IsObject<null>>(true)
	testType.false<IsObject<boolean>>(true)
	testType.false<IsObject<true>>(true)
	testType.false<IsObject<false>>(true)
	testType.false<IsObject<number>>(true)
	testType.false<IsObject<1>>(true)
	testType.false<IsObject<string>>(true)
	testType.false<IsObject<''>>(true)
	testType.false<IsObject<symbol>>(true)
	testType.false<IsObject<bigint>>(true)
	testType.false<IsObject<1n>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsObject<object | 1>, boolean>(true)
	testType.equal<IsObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsObject<{} | bigint>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsObject<{ a: 1 } | 1, { distributive: false }>, false>(true)

	testType.equal<IsObject<{} | 1>, boolean>(true)
	testType.equal<IsObject<{} | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<object & [], object & []>(true)
	testType.true<IsObject<object & []>>(true)
	testType.true<IsObject<object & [], { distributive: false }>>(true)

	testType.true<IsObject<{ a: 1 } & []>>(true)
	testType.true<IsObject<{ a: 1 } & [], { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsObject<object, { selection: 'filter' }>, object>(true)
	testType.equal<IsObject<{}, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsObject<Function, { selection: 'filter' }>, Function>(true)

	testType.equal<IsObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<object | boolean, { selection: 'filter' }>, object>(true)
	testType.equal<IsObject<{ a: 1 } | boolean, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsObject<{} | bigint, { selection: 'filter' }>, {}>(true)
})

it('works with unique branches', () => {
	testType.equal<IsObject<object, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<{ a: 1 }, IsObject.$Branch>, $Then>(true)

	testType.equal<IsObject<any, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<unknown, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<never, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<void, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<string, IsObject.$Branch>, $Else>(true)

	testType.equal<IsObject<object | 1, IsObject.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsObject<any>, false>(true)
	testType.equal<IsObject<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsObject<unknown>, false>(true)
	testType.equal<IsObject<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsObject<never>, false>(true)
	testType.equal<IsObject<never, { $never: unknown }>, unknown>(true)
})

describe('exact', () => {
	it('returns true for object', () => {
		testType.equal<IsObject<object, { exact: true }>, true>(true)
	})

	it('returns false for object literal', () => {
		testType.equal<IsObject<{ a: number }, { exact: true }>, false>(true)
	})

	it('returns false for empty object literal', () => {
		testType.equal<IsObject<{}, { exact: true }>, false>(true)
	})

	it('returns false if T is array or tuple', () => {
		testType.false<IsObject<string[], { exact: true }>>(true)
		testType.false<IsObject<[], { exact: true }>>(true)
		testType.false<IsObject<[1, 2], { exact: true }>>(true)
	})

	it('returns false for function', () => {
		testType.false<IsObject<Function, { exact: true }>>(true)
	})

	it('returns false for special types', () => {
		testType.equal<IsObject<any, { exact: true }>, false>(true)
		testType.equal<IsObject<unknown, { exact: true }>, false>(true)
		testType.equal<IsObject<never, { exact: true }>, false>(true)
		testType.equal<IsObject<void, { exact: true }>, false>(true)
	})

	it('returns false for all other types', () => {
		testType.false<IsObject<undefined, { exact: true }>>(true)
		testType.false<IsObject<null, { exact: true }>>(true)
		testType.false<IsObject<boolean, { exact: true }>>(true)
		testType.false<IsObject<true, { exact: true }>>(true)
		testType.false<IsObject<false, { exact: true }>>(true)
		testType.false<IsObject<number, { exact: true }>>(true)
		testType.false<IsObject<1, { exact: true }>>(true)
		testType.false<IsObject<string, { exact: true }>>(true)
		testType.false<IsObject<'', { exact: true }>>(true)
		testType.false<IsObject<symbol, { exact: true }>>(true)
		testType.false<IsObject<bigint, { exact: true }>>(true)
		testType.false<IsObject<1n, { exact: true }>>(true)
	})

	it('distributes for union type', () => {
		testType.equal<IsObject<object | 1, { exact: true }>, boolean>(true)
		testType.equal<IsObject<object | boolean, { exact: true }>, boolean>(true)
		testType.equal<IsObject<{ a: 1 } | 1, { exact: true }>, false>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsObject<{ a: 1 } | 1, { exact: true }>, false>(true)
		testType.equal<IsObject<{ a: 1 } | 1, { distributive: false; exact: true }>, false>(true)
	})

	it('returns false for intersection type', () => {
		// `object` intersect with any non-object type always returns `never`,
		// and `object & object -> object` directly.
		// so there is no intersection type that can produce a strict object.
		testType.equal<IsObject<object & Function, { exact: true }>, false>(true)
		testType.equal<IsObject<object & Function, { distributive: false; exact: true }>, false>(true)

		testType.false<IsObject<object & [], { exact: true }>>(true)
		testType.false<IsObject<object & [], { distributive: false; exact: true }>>(true)

		testType.false<IsObject<object & { a: 1 }, { exact: true }>>(true)
		testType.false<IsObject<object & { a: 1 }, { distributive: false; exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsObject<object, { selection: 'filter'; exact: true }>, object>(true)
		testType.equal<IsObject<{ a: 1 }, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsObject<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsObject<unknown, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsObject<object | boolean, { selection: 'filter'; exact: true }>, object>(true)
		testType.equal<IsObject<{ a: 1 } | boolean, { selection: 'filter'; exact: true }>, never>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsObject<object, IsObject.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsObject<{ a: 1 }, IsObject.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsObject<any, IsObject.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsObject<unknown, IsObject.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsObject<never, IsObject.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsObject<void, IsObject.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsObject<object | 1, IsObject.$Branch<{ exact: true }>>, $Then | $Else>(true)
	})
})
