import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsTuple, testType } from '../index.js'

it('returns true if T is a tuple', () => {
	testType.true<IsTuple<[]>>(true)
	testType.true<IsTuple<[1]>>(true)
})

it('returns false if T is an array', () => {
	testType.false<IsTuple<string[]>>(true)
	testType.false<IsTuple<any[]>>(true)
	testType.false<IsTuple<unknown[]>>(true)
	testType.false<IsTuple<never[]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsTuple<void>>(true)
	testType.false<IsTuple<unknown>>(true)
	testType.false<IsTuple<any>>(true)
	testType.false<IsTuple<never>>(true)
})

it('returns false if T for other types', () => {
	testType.false<IsTuple<undefined>>(true)
	testType.false<IsTuple<null>>(true)
	testType.false<IsTuple<boolean>>(true)
	testType.false<IsTuple<true>>(true)
	testType.false<IsTuple<false>>(true)
	testType.false<IsTuple<number>>(true)
	testType.false<IsTuple<1>>(true)
	testType.false<IsTuple<string>>(true)
	testType.false<IsTuple<''>>(true)
	testType.false<IsTuple<symbol>>(true)
	testType.false<IsTuple<bigint>>(true)
	testType.false<IsTuple<1n>>(true)
	testType.false<IsTuple<{}>>(true)
	testType.false<IsTuple<string[]>>(true)
	testType.false<IsTuple<Function>>(true)
	testType.false<IsTuple<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsTuple<[1] | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsTuple<[] | number, { distributive: false }>, false>(true)
	testType.equal<IsTuple<[1] | number, { distributive: false }>, false>(true)
})

it('returns true if T is union of tuples', () => {
	testType.true<IsTuple<[] | [1]>>(true)
})

it('returns true if T is intersection of tuples', () => {
	testType.equal<IsTuple<[] & { a: 1 }>, true>(true)
	testType.equal<IsTuple<[] & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsTuple<null[] & { a: 1 }>, false>(true)
	testType.equal<IsTuple<null[] & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsTuple<[], { selection: 'filter' }>, []>(true)
	testType.equal<IsTuple<[1], { selection: 'filter' }>, [1]>(true)

	testType.equal<IsTuple<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsTuple<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsTuple<[] | number, { selection: 'filter' }>, []>(true)
	testType.equal<IsTuple<[] | boolean, { selection: 'filter' }>, []>(true)
})

it('works with unique branches', () => {
	testType.equal<IsTuple<[], IsTuple.$Branch>, $Then>(true)

	testType.equal<IsTuple<string, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<any, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<unknown, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<never, IsTuple.$Branch>, $Else>(true)
	testType.equal<IsTuple<void, IsTuple.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsTuple<any>, false>(true)
	testType.equal<IsTuple<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsTuple<unknown>, false>(true)
	testType.equal<IsTuple<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsTuple<never>, false>(true)
	testType.equal<IsTuple<never, { $never: unknown }>, unknown>(true)
})

it('can override $else branch with unknown', () => {
	testType.equal<IsTuple<any[], { $else: unknown }>, unknown>(true)
})

describe('IsTuple.$Fn', () => {
	it('is IsTuple as a type function', () => {
		testType.equal<$Fn.Apply<IsTuple.$Fn, [1]>, true>(true)
		testType.equal<$Fn.Apply<IsTuple.$Fn, string[]>, false>(true)
	})
})

it('resolves `IsTuple.$Default` the same as no options', () => {
	// `IsTuple.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsTuple<any, IsTuple.$Default>, IsTuple<any>>(true)
	testType.equal<IsTuple<unknown, IsTuple.$Default>, IsTuple<unknown>>(true)
	testType.equal<IsTuple<never, IsTuple.$Default>, IsTuple<never>>(true)
	testType.equal<IsTuple<void, IsTuple.$Default>, IsTuple<void>>(true)
	testType.equal<IsTuple<undefined, IsTuple.$Default>, IsTuple<undefined>>(true)
	testType.equal<IsTuple<null, IsTuple.$Default>, IsTuple<null>>(true)
	testType.equal<IsTuple<boolean, IsTuple.$Default>, IsTuple<boolean>>(true)
	testType.equal<IsTuple<true, IsTuple.$Default>, IsTuple<true>>(true)
	testType.equal<IsTuple<1, IsTuple.$Default>, IsTuple<1>>(true)
	testType.equal<IsTuple<number, IsTuple.$Default>, IsTuple<number>>(true)
	testType.equal<IsTuple<'a', IsTuple.$Default>, IsTuple<'a'>>(true)
	testType.equal<IsTuple<string, IsTuple.$Default>, IsTuple<string>>(true)
	testType.equal<IsTuple<symbol, IsTuple.$Default>, IsTuple<symbol>>(true)
	testType.equal<IsTuple<1n, IsTuple.$Default>, IsTuple<1n>>(true)
	testType.equal<IsTuple<{}, IsTuple.$Default>, IsTuple<{}>>(true)
	testType.equal<IsTuple<[], IsTuple.$Default>, IsTuple<[]>>(true)
	testType.equal<IsTuple<() => void, IsTuple.$Default>, IsTuple<() => void>>(true)
	testType.equal<IsTuple<1 | string, IsTuple.$Default>, IsTuple<1 | string>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsTuple<any>, IsTuple<any, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<unknown>, IsTuple<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<never>, IsTuple<never, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<void>, IsTuple<void, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<{}>, IsTuple<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<object>, IsTuple<object, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<undefined>, IsTuple<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<null>, IsTuple<null, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<{} | null | undefined>, IsTuple<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<string>, IsTuple<string, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<'a'>, IsTuple<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<`a${string}`>, IsTuple<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<Uppercase<string>>, IsTuple<Uppercase<string>, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<string & { a: 1 }>, IsTuple<string & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<number>, IsTuple<number, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<1>, IsTuple<1, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<-1>, IsTuple<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<1.5>, IsTuple<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<1 & { a: 1 }>, IsTuple<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<bigint>, IsTuple<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<1n>, IsTuple<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<-1n>, IsTuple<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<boolean>, IsTuple<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<true>, IsTuple<true, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<false>, IsTuple<false, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<boolean | 1>, IsTuple<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<symbol>, IsTuple<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<{ a: 1 }>, IsTuple<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<() => void>, IsTuple<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<Function>, IsTuple<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<string[]>, IsTuple<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<readonly string[]>, IsTuple<readonly string[], { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<[]>, IsTuple<[], { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<[1]>, IsTuple<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<readonly [1]>, IsTuple<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<{} | 1>, IsTuple<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<string | 1>, IsTuple<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<object | undefined>, IsTuple<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<void | undefined>, IsTuple<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<never | 1>, IsTuple<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsTuple<unknown | 1>, IsTuple<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
