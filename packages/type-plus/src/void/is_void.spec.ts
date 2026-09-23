import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsVoid, testType } from '../index.js'

it('returns true for void', () => {
	testType.equal<IsVoid<void>, true>(true)
})

it('returns false for other special types', () => {
	testType.equal<IsVoid<any>, false>(true)
	testType.equal<IsVoid<unknown>, false>(true)
	testType.equal<IsVoid<never>, false>(true)
})

it('returns false for singular types', () => {
	testType.equal<IsVoid<undefined>, false>(true)
	testType.equal<IsVoid<null>, false>(true)
	testType.equal<IsVoid<number>, false>(true)
	testType.equal<IsVoid<1>, false>(true)
	testType.equal<IsVoid<boolean>, false>(true)
	testType.equal<IsVoid<true>, false>(true)
	testType.equal<IsVoid<false>, false>(true)
	testType.equal<IsVoid<string>, false>(true)
	testType.equal<IsVoid<''>, false>(true)
	testType.equal<IsVoid<symbol>, false>(true)
	testType.equal<IsVoid<bigint>, false>(true)
	testType.equal<IsVoid<1n>, false>(true)
	testType.equal<IsVoid<{}>, false>(true)
	testType.equal<IsVoid<string[]>, false>(true)
	testType.equal<IsVoid<[]>, false>(true)
	testType.equal<IsVoid<Function>, false>(true)
	testType.equal<IsVoid<() => void>, false>(true)
})

it('distributes for union type', () => {
	testType.equal<IsVoid<void | 1>, true | false>(true)
})

it('can disable distributive', () => {
	testType.equal<IsVoid<void | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsVoid<void & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsVoid<void, { selection: 'filter' }>, void>(true)

	testType.equal<IsVoid<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsVoid<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsVoid<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<never | void, void>(true)
	testType.equal<IsVoid<string | void, { selection: 'filter' }>, void>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsVoid<void | 1>, boolean>(true)
	testType.equal<IsVoid<void | 1, { distributive: false }>, false>(true)
	testType.equal<IsVoid<undefined | 1, { distributive: false }>, false>(true)
})

it('works with unique branches', () => {
	testType.equal<IsVoid<void, IsVoid.$Branch>, $Then>(true)
	testType.equal<IsVoid<undefined, IsVoid.$Branch>, $Else>(true)

	testType.equal<IsVoid<any, IsVoid.$Branch>, $Else>(true)
	testType.equal<IsVoid<unknown, IsVoid.$Branch>, $Else>(true)
	testType.equal<IsVoid<never, IsVoid.$Branch>, $Else>(true)
	testType.equal<IsVoid<undefined, IsVoid.$Branch>, $Else>(true)

	testType.equal<IsVoid<undefined | 1, IsVoid.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsVoid<any>, false>(true)
	testType.equal<IsVoid<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsVoid<unknown>, false>(true)
	testType.equal<IsVoid<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsVoid<never>, false>(true)
	testType.equal<IsVoid<never, { $never: unknown }>, unknown>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsVoid<any>, IsVoid<any, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<unknown>, IsVoid<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<never>, IsVoid<never, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<void>, IsVoid<void, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<{}>, IsVoid<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<object>, IsVoid<object, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<undefined>, IsVoid<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<null>, IsVoid<null, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<{} | null | undefined>, IsVoid<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<string>, IsVoid<string, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<1>, IsVoid<1, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<() => void>, IsVoid<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<{} | 1>, IsVoid<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<void | 1>, IsVoid<void | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<void | undefined>, IsVoid<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<undefined | 1>, IsVoid<undefined | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<void & { a: 1 }>, IsVoid<void & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<undefined | null>, IsVoid<undefined | null, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<never | 1>, IsVoid<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsVoid<unknown | 1>, IsVoid<unknown | 1, { selection: 'predicate' }>>(true)
	})
})

describe('IsVoid.$Fn', () => {
	it('is IsVoid as a type function', () => {
		testType.equal<$Fn.Apply<IsVoid.$Fn, void>, true>(true)
		testType.equal<$Fn.Apply<IsVoid.$Fn, 1>, false>(true)
	})
})

it('resolves `IsVoid.$Default` the same as no options', () => {
	// `IsVoid.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsVoid<any, IsVoid.$Default>, IsVoid<any>>(true)
	testType.equal<IsVoid<unknown, IsVoid.$Default>, IsVoid<unknown>>(true)
	testType.equal<IsVoid<never, IsVoid.$Default>, IsVoid<never>>(true)
	testType.equal<IsVoid<void, IsVoid.$Default>, IsVoid<void>>(true)
	testType.equal<IsVoid<undefined, IsVoid.$Default>, IsVoid<undefined>>(true)
	testType.equal<IsVoid<null, IsVoid.$Default>, IsVoid<null>>(true)
	testType.equal<IsVoid<boolean, IsVoid.$Default>, IsVoid<boolean>>(true)
	testType.equal<IsVoid<true, IsVoid.$Default>, IsVoid<true>>(true)
	testType.equal<IsVoid<1, IsVoid.$Default>, IsVoid<1>>(true)
	testType.equal<IsVoid<number, IsVoid.$Default>, IsVoid<number>>(true)
	testType.equal<IsVoid<'a', IsVoid.$Default>, IsVoid<'a'>>(true)
	testType.equal<IsVoid<string, IsVoid.$Default>, IsVoid<string>>(true)
	testType.equal<IsVoid<symbol, IsVoid.$Default>, IsVoid<symbol>>(true)
	testType.equal<IsVoid<1n, IsVoid.$Default>, IsVoid<1n>>(true)
	testType.equal<IsVoid<{}, IsVoid.$Default>, IsVoid<{}>>(true)
	testType.equal<IsVoid<[], IsVoid.$Default>, IsVoid<[]>>(true)
	testType.equal<IsVoid<() => void, IsVoid.$Default>, IsVoid<() => void>>(true)
	testType.equal<IsVoid<1 | string, IsVoid.$Default>, IsVoid<1 | string>>(true)
})
