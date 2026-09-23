import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotVoid, testType } from '../index.js'

it('returns false for void', () => {
	testType.equal<IsNotVoid<void>, false>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotVoid<any>, true>(true)
	testType.equal<IsNotVoid<unknown>, true>(true)
	testType.equal<IsNotVoid<never>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotVoid<undefined>, true>(true)
	testType.equal<IsNotVoid<null>, true>(true)
	testType.equal<IsNotVoid<number>, true>(true)
	testType.equal<IsNotVoid<boolean>, true>(true)
	testType.equal<IsNotVoid<true>, true>(true)
	testType.equal<IsNotVoid<false>, true>(true)
	testType.equal<IsNotVoid<string>, true>(true)
	testType.equal<IsNotVoid<''>, true>(true)
	testType.equal<IsNotVoid<symbol>, true>(true)
	testType.equal<IsNotVoid<bigint>, true>(true)
	testType.equal<IsNotVoid<{}>, true>(true)
	testType.equal<IsNotVoid<string[]>, true>(true)
	testType.equal<IsNotVoid<[]>, true>(true)
	testType.equal<IsNotVoid<Function>, true>(true)
	testType.equal<IsNotVoid<() => void>, true>(true)
})

it('distributes for union type', () => {
	testType.equal<IsNotVoid<void | string>, boolean>(true)
})

it('can disable distributive', () => {
	testType.equal<IsNotVoid<void | string, { distributive: false }>, true>(true)
})

it('returns false for intersection type', () => {
	testType.equal<IsNotVoid<void & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNotVoid<void, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotVoid<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotVoid<unknown, { selection: 'filter' }>, unknown>(true)

	testType.equal<string | never, string>(true)
	testType.equal<IsNotVoid<string | void, { selection: 'filter' }>, string>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotVoid<void | 1>, boolean>(true)
	testType.equal<void | 1, void>(false)
	testType.equal<IsNotVoid<void | 1, { distributive: false }>, true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotVoid<void, IsNotVoid.$Branch>, $Else>(true)

	testType.equal<IsNotVoid<any, IsNotVoid.$Branch>, $Then>(true)
	testType.equal<IsNotVoid<unknown, IsNotVoid.$Branch>, $Then>(true)
	testType.equal<IsNotVoid<never, IsNotVoid.$Branch>, $Then>(true)
	testType.equal<IsNotVoid<undefined, IsNotVoid.$Branch>, $Then>(true)

	testType.equal<IsNotVoid<void | 1, IsNotVoid.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotVoid<any>, true>(true)
	testType.equal<IsNotVoid<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotVoid<unknown>, true>(true)
	testType.equal<IsNotVoid<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotVoid<never>, true>(true)
	testType.equal<IsNotVoid<never, { $never: unknown }>, unknown>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNotVoid<any>, IsNotVoid<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<unknown>, IsNotVoid<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<never>, IsNotVoid<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<void>, IsNotVoid<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<{}>, IsNotVoid<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<object>, IsNotVoid<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<undefined>, IsNotVoid<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<null>, IsNotVoid<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<{} | null | undefined>, IsNotVoid<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<string>, IsNotVoid<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<'a'>, IsNotVoid<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<1>, IsNotVoid<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<{ a: 1 }>, IsNotVoid<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<() => void>, IsNotVoid<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<string[]>, IsNotVoid<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<{} | 1>, IsNotVoid<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<string | 1>, IsNotVoid<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<object | undefined>, IsNotVoid<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<void | 1>, IsNotVoid<void | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<void | undefined>, IsNotVoid<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<undefined | 1>, IsNotVoid<undefined | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<void & { a: 1 }>, IsNotVoid<void & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<never | 1>, IsNotVoid<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotVoid<unknown | 1>, IsNotVoid<unknown | 1, { selection: 'predicate' }>>(true)
	})
})

describe('IsNotVoid.$Fn', () => {
	it('is IsNotVoid as a type function', () => {
		testType.equal<$Fn.Apply<IsNotVoid.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotVoid.$Fn, void>, false>(true)
	})
})

it('resolves `IsNotVoid.$Default` the same as no options', () => {
	// `IsNotVoid.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotVoid<any, IsNotVoid.$Default>, IsNotVoid<any>>(true)
	testType.equal<IsNotVoid<unknown, IsNotVoid.$Default>, IsNotVoid<unknown>>(true)
	testType.equal<IsNotVoid<never, IsNotVoid.$Default>, IsNotVoid<never>>(true)
	testType.equal<IsNotVoid<void, IsNotVoid.$Default>, IsNotVoid<void>>(true)
	testType.equal<IsNotVoid<undefined, IsNotVoid.$Default>, IsNotVoid<undefined>>(true)
	testType.equal<IsNotVoid<null, IsNotVoid.$Default>, IsNotVoid<null>>(true)
	testType.equal<IsNotVoid<boolean, IsNotVoid.$Default>, IsNotVoid<boolean>>(true)
	testType.equal<IsNotVoid<true, IsNotVoid.$Default>, IsNotVoid<true>>(true)
	testType.equal<IsNotVoid<1, IsNotVoid.$Default>, IsNotVoid<1>>(true)
	testType.equal<IsNotVoid<number, IsNotVoid.$Default>, IsNotVoid<number>>(true)
	testType.equal<IsNotVoid<'a', IsNotVoid.$Default>, IsNotVoid<'a'>>(true)
	testType.equal<IsNotVoid<string, IsNotVoid.$Default>, IsNotVoid<string>>(true)
	testType.equal<IsNotVoid<symbol, IsNotVoid.$Default>, IsNotVoid<symbol>>(true)
	testType.equal<IsNotVoid<1n, IsNotVoid.$Default>, IsNotVoid<1n>>(true)
	testType.equal<IsNotVoid<{}, IsNotVoid.$Default>, IsNotVoid<{}>>(true)
	testType.equal<IsNotVoid<[], IsNotVoid.$Default>, IsNotVoid<[]>>(true)
	testType.equal<IsNotVoid<() => void, IsNotVoid.$Default>, IsNotVoid<() => void>>(true)
	testType.equal<IsNotVoid<1 | string, IsNotVoid.$Default>, IsNotVoid<1 | string>>(true)
})
