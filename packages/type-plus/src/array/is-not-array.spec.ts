import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotArray, testType } from '../index.js'

it('returns false if T is array', () => {
	testType.false<IsNotArray<string[]>>(true)
})

it('returns false if T is tuple', () => {
	testType.false<IsNotArray<[]>>(true)
	testType.false<IsNotArray<[1]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotArray<void>>(true)
	testType.true<IsNotArray<unknown>>(true)
	testType.true<IsNotArray<any>>(true)
	testType.true<IsNotArray<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotArray<undefined>>(true)
	testType.true<IsNotArray<null>>(true)
	testType.true<IsNotArray<boolean>>(true)
	testType.true<IsNotArray<true>>(true)
	testType.true<IsNotArray<false>>(true)
	testType.true<IsNotArray<number>>(true)
	testType.true<IsNotArray<1>>(true)
	testType.true<IsNotArray<string>>(true)
	testType.true<IsNotArray<''>>(true)
	testType.true<IsNotArray<symbol>>(true)
	testType.true<IsNotArray<bigint>>(true)
	testType.true<IsNotArray<1n>>(true)
	testType.true<IsNotArray<{}>>(true)
	testType.true<IsNotArray<{ a: 1 }>>(true)
	testType.true<IsNotArray<Function>>(true)
	testType.true<IsNotArray<() => void>>(true)
})

it('distributes over union type', () => {
	testType.boolean<IsNotArray<number[] | 1>>(true)
})

it('returns false if T is union of arrays', () => {
	testType.false<IsNotArray<string[] | number[]>>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotArray<number[] | number, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotArray<number[] & 1>>(true)
	testType.false<IsNotArray<number[] & 1, { distributive: false }>>(true)

	testType.false<IsNotArray<[] & 1>>(true)
	testType.false<IsNotArray<[] & 1, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotArray<null[], { selection: 'filter' }>, never>(true)

	testType.equal<IsNotArray<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotArray<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotArray<null[] | number, { selection: 'filter' }>, number>(true)
})
it('works with unique branches', () => {
	testType.equal<IsNotArray<string[], IsNotArray.$Branch>, $Else>(true)

	testType.equal<IsNotArray<number, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<any, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<unknown, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<never, IsNotArray.$Branch>, $Then>(true)
	testType.equal<IsNotArray<void, IsNotArray.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotArray<any>, true>(true)
	testType.equal<IsNotArray<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotArray<unknown>, true>(true)
	testType.equal<IsNotArray<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotArray<never>, true>(true)
	testType.equal<IsNotArray<never, { $never: unknown }>, unknown>(true)
})

it('supports readonly array', () => {
	testType.false<IsNotArray<readonly string[]>>(true)
	testType.false<IsNotArray<readonly []>>(true)
})

describe('exact', () => {
	it('returns true if T is a tuple', () => {
		testType.true<IsNotArray<[], { exact: true }>>(true)
		testType.true<IsNotArray<[1], { exact: true }>>(true)
	})

	it('returns true for tuple intersection type', () => {
		testType.true<IsNotArray<[] & 1, { exact: true }>>(true)
		testType.true<IsNotArray<[] & 1, { distributive: false; exact: true }>>(true)
	})

	it('supports readonly tuple', () => {
		testType.true<IsNotArray<readonly [], { exact: true }>>(true)
	})
})

describe('IsNotArray.$Fn', () => {
	it('is IsNotArray as a type function', () => {
		testType.equal<$Fn.Apply<IsNotArray.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotArray.$Fn, string[]>, false>(true)
	})
})

it('resolves `IsNotArray.$Default` the same as no options', () => {
	// `IsNotArray.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotArray<any, IsNotArray.$Default>, IsNotArray<any>>(true)
	testType.equal<IsNotArray<unknown, IsNotArray.$Default>, IsNotArray<unknown>>(true)
	testType.equal<IsNotArray<never, IsNotArray.$Default>, IsNotArray<never>>(true)
	testType.equal<IsNotArray<void, IsNotArray.$Default>, IsNotArray<void>>(true)
	testType.equal<IsNotArray<undefined, IsNotArray.$Default>, IsNotArray<undefined>>(true)
	testType.equal<IsNotArray<null, IsNotArray.$Default>, IsNotArray<null>>(true)
	testType.equal<IsNotArray<boolean, IsNotArray.$Default>, IsNotArray<boolean>>(true)
	testType.equal<IsNotArray<true, IsNotArray.$Default>, IsNotArray<true>>(true)
	testType.equal<IsNotArray<1, IsNotArray.$Default>, IsNotArray<1>>(true)
	testType.equal<IsNotArray<number, IsNotArray.$Default>, IsNotArray<number>>(true)
	testType.equal<IsNotArray<'a', IsNotArray.$Default>, IsNotArray<'a'>>(true)
	testType.equal<IsNotArray<string, IsNotArray.$Default>, IsNotArray<string>>(true)
	testType.equal<IsNotArray<symbol, IsNotArray.$Default>, IsNotArray<symbol>>(true)
	testType.equal<IsNotArray<1n, IsNotArray.$Default>, IsNotArray<1n>>(true)
	testType.equal<IsNotArray<{}, IsNotArray.$Default>, IsNotArray<{}>>(true)
	testType.equal<IsNotArray<[], IsNotArray.$Default>, IsNotArray<[]>>(true)
	testType.equal<IsNotArray<() => void, IsNotArray.$Default>, IsNotArray<() => void>>(true)
	testType.equal<IsNotArray<1 | string, IsNotArray.$Default>, IsNotArray<1 | string>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNotArray<any>, IsNotArray<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<unknown>, IsNotArray<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<never>, IsNotArray<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<void>, IsNotArray<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<{}>, IsNotArray<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<object>, IsNotArray<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<undefined>, IsNotArray<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<null>, IsNotArray<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<{} | null | undefined>, IsNotArray<{} | null | undefined, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<IsNotArray<string>, IsNotArray<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<'a'>, IsNotArray<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<`a${string}`>, IsNotArray<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<Uppercase<string>>, IsNotArray<Uppercase<string>, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<string & { a: 1 }>, IsNotArray<string & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<number>, IsNotArray<number, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<1>, IsNotArray<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<-1>, IsNotArray<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<1.5>, IsNotArray<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<1 & { a: 1 }>, IsNotArray<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<bigint>, IsNotArray<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<1n>, IsNotArray<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<-1n>, IsNotArray<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<boolean>, IsNotArray<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<true>, IsNotArray<true, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<false>, IsNotArray<false, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<boolean | 1>, IsNotArray<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<symbol>, IsNotArray<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<{ a: 1 }>, IsNotArray<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<() => void>, IsNotArray<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<Function>, IsNotArray<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<string[]>, IsNotArray<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<readonly string[]>, IsNotArray<readonly string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<[]>, IsNotArray<[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<[1]>, IsNotArray<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<readonly [1]>, IsNotArray<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<{} | 1>, IsNotArray<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<string | 1>, IsNotArray<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<object | undefined>, IsNotArray<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<void | undefined>, IsNotArray<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<never | 1>, IsNotArray<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotArray<unknown | 1>, IsNotArray<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
