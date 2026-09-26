import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNumberLiteral, testType } from '../index.js'

it('returns false for number', () => {
	testType.false<IsNumberLiteral<number>>(true)
})

it('returns true if T is number literial', () => {
	testType.true<IsNumberLiteral<-1>>(true)
	testType.true<IsNumberLiteral<0>>(true)
	testType.true<IsNumberLiteral<1>>(true)
	testType.true<IsNumberLiteral<1.1>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNumberLiteral<void>>(true)
	testType.false<IsNumberLiteral<unknown>>(true)
	testType.false<IsNumberLiteral<any>>(true)
	testType.false<IsNumberLiteral<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsNumberLiteral<undefined>>(true)
	testType.false<IsNumberLiteral<null>>(true)
	testType.false<IsNumberLiteral<boolean>>(true)
	testType.false<IsNumberLiteral<true>>(true)
	testType.false<IsNumberLiteral<false>>(true)
	testType.false<IsNumberLiteral<string>>(true)
	testType.false<IsNumberLiteral<''>>(true)
	testType.false<IsNumberLiteral<symbol>>(true)
	testType.false<IsNumberLiteral<bigint>>(true)
	testType.false<IsNumberLiteral<1n>>(true)
	testType.false<IsNumberLiteral<{}>>(true)
	testType.false<IsNumberLiteral<string[]>>(true)
	testType.false<IsNumberLiteral<[]>>(true)
	testType.false<IsNumberLiteral<Function>>(true)
	testType.false<IsNumberLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNumberLiteral<number | string>, false>(true)
	testType.equal<IsNumberLiteral<1 | string>, boolean>(true)
	testType.equal<IsNumberLiteral<1.1 | string>, boolean>(true)
	testType.equal<IsNumberLiteral<string | boolean>, false>(true)
	testType.equal<IsNumberLiteral<string | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNumberLiteral<number | string, { distributive: false }>, false>(true)
	testType.equal<IsNumberLiteral<1 | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNumberLiteral<number & { a: 1 }>, false>(true)
	testType.equal<IsNumberLiteral<number & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsNumberLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsNumberLiteral<1 & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsNumberLiteral<bigint & { a: 1 }>, false>(true)
	testType.equal<IsNumberLiteral<bigint & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsNumberLiteral<1n & { a: 1 }>, false>(true)
	testType.equal<IsNumberLiteral<1n & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNumberLiteral<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<1, { selection: 'filter' }>, 1>(true)

	testType.equal<IsNumberLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<string | number, { selection: 'filter' }>, never>(true)

	testType.equal<IsNumberLiteral<string | 1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumberLiteral<string | boolean, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNumberLiteral<number, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<1, IsNumberLiteral.$Branch>, $Then>(true)

	testType.equal<IsNumberLiteral<any, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<unknown, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<never, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<void, IsNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNumberLiteral<string, IsNumberLiteral.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNumberLiteral<any>, false>(true)
	testType.equal<IsNumberLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNumberLiteral<unknown>, false>(true)
	testType.equal<IsNumberLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNumberLiteral<never>, false>(true)
	testType.equal<IsNumberLiteral<never, { $never: unknown }>, unknown>(true)
})

describe('IsNumberLiteral.$Fn', () => {
	it('is IsNumberLiteral as a type function', () => {
		testType.equal<$Fn.Apply<IsNumberLiteral.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNumberLiteral.$Fn, number>, false>(true)
	})
})

it('resolves `IsNumberLiteral.$Default` the same as no options', () => {
	// `IsNumberLiteral.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNumberLiteral<any, IsNumberLiteral.$Default>, IsNumberLiteral<any>>(true)
	testType.equal<IsNumberLiteral<unknown, IsNumberLiteral.$Default>, IsNumberLiteral<unknown>>(true)
	testType.equal<IsNumberLiteral<never, IsNumberLiteral.$Default>, IsNumberLiteral<never>>(true)
	testType.equal<IsNumberLiteral<void, IsNumberLiteral.$Default>, IsNumberLiteral<void>>(true)
	testType.equal<IsNumberLiteral<undefined, IsNumberLiteral.$Default>, IsNumberLiteral<undefined>>(true)
	testType.equal<IsNumberLiteral<null, IsNumberLiteral.$Default>, IsNumberLiteral<null>>(true)
	testType.equal<IsNumberLiteral<boolean, IsNumberLiteral.$Default>, IsNumberLiteral<boolean>>(true)
	testType.equal<IsNumberLiteral<true, IsNumberLiteral.$Default>, IsNumberLiteral<true>>(true)
	testType.equal<IsNumberLiteral<1, IsNumberLiteral.$Default>, IsNumberLiteral<1>>(true)
	testType.equal<IsNumberLiteral<number, IsNumberLiteral.$Default>, IsNumberLiteral<number>>(true)
	testType.equal<IsNumberLiteral<'a', IsNumberLiteral.$Default>, IsNumberLiteral<'a'>>(true)
	testType.equal<IsNumberLiteral<string, IsNumberLiteral.$Default>, IsNumberLiteral<string>>(true)
	testType.equal<IsNumberLiteral<symbol, IsNumberLiteral.$Default>, IsNumberLiteral<symbol>>(true)
	testType.equal<IsNumberLiteral<1n, IsNumberLiteral.$Default>, IsNumberLiteral<1n>>(true)
	testType.equal<IsNumberLiteral<{}, IsNumberLiteral.$Default>, IsNumberLiteral<{}>>(true)
	testType.equal<IsNumberLiteral<[], IsNumberLiteral.$Default>, IsNumberLiteral<[]>>(true)
	testType.equal<IsNumberLiteral<() => void, IsNumberLiteral.$Default>, IsNumberLiteral<() => void>>(true)
	testType.equal<IsNumberLiteral<1 | string, IsNumberLiteral.$Default>, IsNumberLiteral<1 | string>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNumberLiteral<any>, IsNumberLiteral<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<unknown>, IsNumberLiteral<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<never>, IsNumberLiteral<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<void>, IsNumberLiteral<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<{}>, IsNumberLiteral<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<object>, IsNumberLiteral<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<undefined>, IsNumberLiteral<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<null>, IsNumberLiteral<null, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNumberLiteral<{} | null | undefined>,
			IsNumberLiteral<{} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNumberLiteral<string>, IsNumberLiteral<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<'a'>, IsNumberLiteral<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<`a${string}`>, IsNumberLiteral<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<Uppercase<string>>, IsNumberLiteral<Uppercase<string>, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<IsNumberLiteral<string & { a: 1 }>, IsNumberLiteral<string & { a: 1 }, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<IsNumberLiteral<number>, IsNumberLiteral<number, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<1>, IsNumberLiteral<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<-1>, IsNumberLiteral<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<1.5>, IsNumberLiteral<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<1 & { a: 1 }>, IsNumberLiteral<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<bigint>, IsNumberLiteral<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<1n>, IsNumberLiteral<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<-1n>, IsNumberLiteral<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<boolean>, IsNumberLiteral<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<true>, IsNumberLiteral<true, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<false>, IsNumberLiteral<false, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<boolean | 1>, IsNumberLiteral<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<symbol>, IsNumberLiteral<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<{ a: 1 }>, IsNumberLiteral<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<() => void>, IsNumberLiteral<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<Function>, IsNumberLiteral<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<string[]>, IsNumberLiteral<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<readonly string[]>, IsNumberLiteral<readonly string[], { selection: 'predicate' }>>(
			true,
		)
		testType.equal<IsNumberLiteral<[]>, IsNumberLiteral<[], { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<[1]>, IsNumberLiteral<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<readonly [1]>, IsNumberLiteral<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<{} | 1>, IsNumberLiteral<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<string | 1>, IsNumberLiteral<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNumberLiteral<object | undefined>,
			IsNumberLiteral<object | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNumberLiteral<void | undefined>, IsNumberLiteral<void | undefined, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<IsNumberLiteral<never | 1>, IsNumberLiteral<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNumberLiteral<unknown | 1>, IsNumberLiteral<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
