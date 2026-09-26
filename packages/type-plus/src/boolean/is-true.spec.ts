import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsTrue, testType } from '../index.js'

it('returns true if T is true', () => {
	testType.equal<IsTrue<true>, true>(true)
})

it('returns boolean if T is boolean because it is distributive by default', () => {
	testType.equal<IsTrue<boolean>, boolean>(true)
	testType.equal<IsTrue<boolean, { distributive: false }>, false>(true)
})

it('returns false if T is false', () => {
	testType.equal<IsTrue<false>, false>(true)
})

it('returns false for special types', () => {
	testType.equal<IsTrue<void>, false>(true)
	testType.equal<IsTrue<unknown>, false>(true)
	testType.equal<IsTrue<any>, false>(true)
	testType.equal<IsTrue<never>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsTrue<undefined>, false>(true)
	testType.equal<IsTrue<null>, false>(true)
	testType.equal<IsTrue<number>, false>(true)
	testType.equal<IsTrue<1>, false>(true)
	testType.equal<IsTrue<false>, false>(true)
	testType.equal<IsTrue<string>, false>(true)
	testType.equal<IsTrue<''>, false>(true)
	testType.equal<IsTrue<symbol>, false>(true)
	testType.equal<IsTrue<bigint>, false>(true)
	testType.equal<IsTrue<1n>, false>(true)
	testType.equal<IsTrue<{}>, false>(true)
	testType.equal<IsTrue<{ a: 1 }>, false>(true)
	testType.equal<IsTrue<string[]>, false>(true)
	testType.equal<IsTrue<[]>, false>(true)
	testType.equal<IsTrue<Function>, false>(true)
	testType.equal<IsTrue<() => void>, false>(true)
})

it('distributes over union type', () => {
	testType.equal<IsTrue<true | 1>, boolean>(true)
	testType.equal<IsTrue<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsTrue<true | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsTrue<true & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsTrue<true, { selection: 'filter' }>, true>(true)
	testType.equal<IsTrue<false, { selection: 'filter' }>, never>(true)
	testType.equal<IsTrue<boolean, { selection: 'filter' }>, true>(true)
	testType.equal<IsTrue<boolean, { selection: 'filter'; distributive: false }>, never>(true)

	testType.equal<IsTrue<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsTrue<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsTrue<string | true, { selection: 'filter' }>, true>(true)

	testType.equal<IsTrue<string | false, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsTrue<true, IsTrue.$Branch>, $Then>(true)

	testType.equal<IsTrue<any, IsTrue.$Branch>, $Else>(true)
	testType.equal<IsTrue<unknown, IsTrue.$Branch>, $Else>(true)
	testType.equal<IsTrue<never, IsTrue.$Branch>, $Else>(true)
	testType.equal<IsTrue<void, IsTrue.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsTrue<any>, false>(true)
	testType.equal<IsTrue<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsTrue<unknown>, false>(true)
	testType.equal<IsTrue<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsTrue<never>, false>(true)
	testType.equal<IsTrue<never, { $never: unknown }>, unknown>(true)
})

describe('IsTrue.$Fn', () => {
	it('is IsTrue as a type function', () => {
		testType.equal<$Fn.Apply<IsTrue.$Fn, true>, true>(true)
		testType.equal<$Fn.Apply<IsTrue.$Fn, false>, false>(true)
	})
})

it('resolves `IsTrue.$Default` the same as no options', () => {
	// `IsTrue.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsTrue<any, IsTrue.$Default>, IsTrue<any>>(true)
	testType.equal<IsTrue<unknown, IsTrue.$Default>, IsTrue<unknown>>(true)
	testType.equal<IsTrue<never, IsTrue.$Default>, IsTrue<never>>(true)
	testType.equal<IsTrue<void, IsTrue.$Default>, IsTrue<void>>(true)
	testType.equal<IsTrue<undefined, IsTrue.$Default>, IsTrue<undefined>>(true)
	testType.equal<IsTrue<null, IsTrue.$Default>, IsTrue<null>>(true)
	testType.equal<IsTrue<boolean, IsTrue.$Default>, IsTrue<boolean>>(true)
	testType.equal<IsTrue<true, IsTrue.$Default>, IsTrue<true>>(true)
	testType.equal<IsTrue<1, IsTrue.$Default>, IsTrue<1>>(true)
	testType.equal<IsTrue<number, IsTrue.$Default>, IsTrue<number>>(true)
	testType.equal<IsTrue<'a', IsTrue.$Default>, IsTrue<'a'>>(true)
	testType.equal<IsTrue<string, IsTrue.$Default>, IsTrue<string>>(true)
	testType.equal<IsTrue<symbol, IsTrue.$Default>, IsTrue<symbol>>(true)
	testType.equal<IsTrue<1n, IsTrue.$Default>, IsTrue<1n>>(true)
	testType.equal<IsTrue<{}, IsTrue.$Default>, IsTrue<{}>>(true)
	testType.equal<IsTrue<[], IsTrue.$Default>, IsTrue<[]>>(true)
	testType.equal<IsTrue<() => void, IsTrue.$Default>, IsTrue<() => void>>(true)
	testType.equal<IsTrue<1 | string, IsTrue.$Default>, IsTrue<1 | string>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsTrue<any>, IsTrue<any, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<unknown>, IsTrue<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<never>, IsTrue<never, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<void>, IsTrue<void, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<{}>, IsTrue<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<object>, IsTrue<object, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<undefined>, IsTrue<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<null>, IsTrue<null, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<{} | null | undefined>, IsTrue<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<string>, IsTrue<string, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<'a'>, IsTrue<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<`a${string}`>, IsTrue<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<Uppercase<string>>, IsTrue<Uppercase<string>, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<string & { a: 1 }>, IsTrue<string & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<number>, IsTrue<number, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<1>, IsTrue<1, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<-1>, IsTrue<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<1.5>, IsTrue<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<1 & { a: 1 }>, IsTrue<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<bigint>, IsTrue<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<1n>, IsTrue<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<-1n>, IsTrue<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<boolean>, IsTrue<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<true>, IsTrue<true, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<false>, IsTrue<false, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<boolean | 1>, IsTrue<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<symbol>, IsTrue<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<{ a: 1 }>, IsTrue<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<() => void>, IsTrue<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<Function>, IsTrue<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<string[]>, IsTrue<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<readonly string[]>, IsTrue<readonly string[], { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<[]>, IsTrue<[], { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<[1]>, IsTrue<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<readonly [1]>, IsTrue<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<{} | 1>, IsTrue<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<string | 1>, IsTrue<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<object | undefined>, IsTrue<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<void | undefined>, IsTrue<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<never | 1>, IsTrue<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTrue<unknown | 1>, IsTrue<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
