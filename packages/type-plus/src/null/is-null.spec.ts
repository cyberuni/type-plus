import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNull, testType } from '../index.js'

it('returns true for null', () => {
	testType.true<IsNull<null>>(true)
})

it('returns false for special types', () => {
	testType.false<IsNull<any>>(true)
	testType.false<IsNull<unknown>>(true)
	testType.false<IsNull<void>>(true)
	testType.false<IsNull<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsNull<undefined>>(true)
	testType.false<IsNull<boolean>>(true)
	testType.false<IsNull<true>>(true)
	testType.false<IsNull<false>>(true)
	testType.false<IsNull<number>>(true)
	testType.false<IsNull<1>>(true)
	testType.false<IsNull<string>>(true)
	testType.false<IsNull<''>>(true)
	testType.false<IsNull<symbol>>(true)
	testType.false<IsNull<bigint>>(true)
	testType.false<IsNull<{}>>(true)
	testType.false<IsNull<string[]>>(true)
	testType.false<IsNull<[]>>(true)
	testType.false<IsNull<Function>>(true)
	testType.false<IsNull<() => void>>(true)
})

it('works as filter', () => {
	testType.equal<IsNull<null, { selection: 'filter' }>, null>(true)

	testType.equal<IsNull<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNull<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNull<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsNull<string | null, { selection: 'filter' }>, null>(true)
})

it('distributes over union type', () => {
	testType.equal<null | 1, null | 1>(true)
	testType.equal<IsNull<null | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.false<IsNull<null | 1, { distributive: false }>>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNull<null, IsNull.$Branch>, $Then>(true)

	testType.equal<IsNull<any, IsNull.$Branch>, $Else>(true)
	testType.equal<IsNull<unknown, IsNull.$Branch>, $Else>(true)
	testType.equal<IsNull<never, IsNull.$Branch>, $Else>(true)
	testType.equal<IsNull<void, IsNull.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNull<any>, false>(true)
	testType.equal<IsNull<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNull<unknown>, false>(true)
	testType.equal<IsNull<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNull<never>, false>(true)
	testType.equal<IsNull<never, { $never: unknown }>, unknown>(true)
})

describe('IsNull.$Fn', () => {
	it('is IsNull as a type function', () => {
		testType.equal<$Fn.Apply<IsNull.$Fn, null>, true>(true)
		testType.equal<$Fn.Apply<IsNull.$Fn, undefined>, false>(true)
	})
})

it('resolves `IsNull.$Default` the same as no options', () => {
	// `IsNull.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNull<any, IsNull.$Default>, IsNull<any>>(true)
	testType.equal<IsNull<unknown, IsNull.$Default>, IsNull<unknown>>(true)
	testType.equal<IsNull<never, IsNull.$Default>, IsNull<never>>(true)
	testType.equal<IsNull<void, IsNull.$Default>, IsNull<void>>(true)
	testType.equal<IsNull<undefined, IsNull.$Default>, IsNull<undefined>>(true)
	testType.equal<IsNull<null, IsNull.$Default>, IsNull<null>>(true)
	testType.equal<IsNull<boolean, IsNull.$Default>, IsNull<boolean>>(true)
	testType.equal<IsNull<true, IsNull.$Default>, IsNull<true>>(true)
	testType.equal<IsNull<1, IsNull.$Default>, IsNull<1>>(true)
	testType.equal<IsNull<number, IsNull.$Default>, IsNull<number>>(true)
	testType.equal<IsNull<'a', IsNull.$Default>, IsNull<'a'>>(true)
	testType.equal<IsNull<string, IsNull.$Default>, IsNull<string>>(true)
	testType.equal<IsNull<symbol, IsNull.$Default>, IsNull<symbol>>(true)
	testType.equal<IsNull<1n, IsNull.$Default>, IsNull<1n>>(true)
	testType.equal<IsNull<{}, IsNull.$Default>, IsNull<{}>>(true)
	testType.equal<IsNull<[], IsNull.$Default>, IsNull<[]>>(true)
	testType.equal<IsNull<() => void, IsNull.$Default>, IsNull<() => void>>(true)
	testType.equal<IsNull<1 | string, IsNull.$Default>, IsNull<1 | string>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNull<any>, IsNull<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<unknown>, IsNull<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<never>, IsNull<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<void>, IsNull<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<{}>, IsNull<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<object>, IsNull<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<undefined>, IsNull<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<null>, IsNull<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<{} | null | undefined>, IsNull<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<string>, IsNull<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<'a'>, IsNull<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNull<`a${string}`>, IsNull<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<Uppercase<string>>, IsNull<Uppercase<string>, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<string & { a: 1 }>, IsNull<string & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<number>, IsNull<number, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<1>, IsNull<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<-1>, IsNull<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<1.5>, IsNull<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<1 & { a: 1 }>, IsNull<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<bigint>, IsNull<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<1n>, IsNull<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<-1n>, IsNull<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<boolean>, IsNull<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<true>, IsNull<true, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<false>, IsNull<false, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<boolean | 1>, IsNull<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<symbol>, IsNull<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<{ a: 1 }>, IsNull<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<() => void>, IsNull<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<Function>, IsNull<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<string[]>, IsNull<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNull<readonly string[]>, IsNull<readonly string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNull<[]>, IsNull<[], { selection: 'predicate' }>>(true)
		testType.equal<IsNull<[1]>, IsNull<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsNull<readonly [1]>, IsNull<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsNull<{} | 1>, IsNull<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<string | 1>, IsNull<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<object | undefined>, IsNull<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<void | undefined>, IsNull<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<never | 1>, IsNull<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNull<unknown | 1>, IsNull<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
