import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotTuple, testType } from '../index.js'

it('returns false if T is a tuple', () => {
	testType.false<IsNotTuple<[]>>(true)
	testType.false<IsNotTuple<[1]>>(true)
})

it('returns true if T is an array', () => {
	testType.true<IsNotTuple<string[]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotTuple<void>>(true)
	testType.true<IsNotTuple<unknown>>(true)
	testType.true<IsNotTuple<any>>(true)
	testType.true<IsNotTuple<never>>(true)
})

it('returns true if T for other types', () => {
	testType.true<IsNotTuple<undefined>>(true)
	testType.true<IsNotTuple<null>>(true)
	testType.true<IsNotTuple<boolean>>(true)
	testType.true<IsNotTuple<true>>(true)
	testType.true<IsNotTuple<false>>(true)
	testType.true<IsNotTuple<number>>(true)
	testType.true<IsNotTuple<1>>(true)
	testType.true<IsNotTuple<string>>(true)
	testType.true<IsNotTuple<''>>(true)
	testType.true<IsNotTuple<symbol>>(true)
	testType.true<IsNotTuple<bigint>>(true)
	testType.true<IsNotTuple<1n>>(true)
	testType.true<IsNotTuple<{}>>(true)
	testType.true<IsNotTuple<string[]>>(true)
	testType.true<IsNotTuple<Function>>(true)
	testType.true<IsNotTuple<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotTuple<[1] | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotTuple<[] | number, { distributive: false }>, true>(true)
	testType.equal<IsNotTuple<[] | number, { distributive: false; selection: 'filter' }>, [] | number>(true)
})

it('returns false if T is union of tuples', () => {
	testType.equal<IsNotTuple<[] | [1]>, false>(true)
})

it('returns false if T is intersection of tuples', () => {
	testType.equal<IsNotTuple<[] & { a: 1 }>, false>(true)
})

// TODO: add $never support back to the system
// it('can override never case', () => {
// 	testType.equal<IsNotTuple<never, 1, 2, { $never: 3 }>, 3>(true)
// })

it('works as filter', () => {
	testType.equal<IsNotTuple<[], { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<[1], { selection: 'filter' }>, never>(true)

	testType.equal<IsNotTuple<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotTuple<[] | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotTuple<[] | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotTuple<[1] | bigint, { selection: 'filter' }>, bigint>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotTuple<[], IsNotTuple.$Branch>, $Else>(true)

	testType.equal<IsNotTuple<bigint, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<any, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<unknown, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<never, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<void, IsNotTuple.$Branch>, $Then>(true)
})

describe('IsNotTuple.$Fn', () => {
	it('is IsNotTuple as a type function', () => {
		testType.equal<$Fn.Apply<IsNotTuple.$Fn, string[]>, true>(true)
		testType.equal<$Fn.Apply<IsNotTuple.$Fn, [1]>, false>(true)
	})
})

it('resolves `IsNotTuple.$Default` the same as no options', () => {
	// `IsNotTuple.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotTuple<any, IsNotTuple.$Default>, IsNotTuple<any>>(true)
	testType.equal<IsNotTuple<unknown, IsNotTuple.$Default>, IsNotTuple<unknown>>(true)
	testType.equal<IsNotTuple<never, IsNotTuple.$Default>, IsNotTuple<never>>(true)
	testType.equal<IsNotTuple<void, IsNotTuple.$Default>, IsNotTuple<void>>(true)
	testType.equal<IsNotTuple<undefined, IsNotTuple.$Default>, IsNotTuple<undefined>>(true)
	testType.equal<IsNotTuple<null, IsNotTuple.$Default>, IsNotTuple<null>>(true)
	testType.equal<IsNotTuple<boolean, IsNotTuple.$Default>, IsNotTuple<boolean>>(true)
	testType.equal<IsNotTuple<true, IsNotTuple.$Default>, IsNotTuple<true>>(true)
	testType.equal<IsNotTuple<1, IsNotTuple.$Default>, IsNotTuple<1>>(true)
	testType.equal<IsNotTuple<number, IsNotTuple.$Default>, IsNotTuple<number>>(true)
	testType.equal<IsNotTuple<'a', IsNotTuple.$Default>, IsNotTuple<'a'>>(true)
	testType.equal<IsNotTuple<string, IsNotTuple.$Default>, IsNotTuple<string>>(true)
	testType.equal<IsNotTuple<symbol, IsNotTuple.$Default>, IsNotTuple<symbol>>(true)
	testType.equal<IsNotTuple<1n, IsNotTuple.$Default>, IsNotTuple<1n>>(true)
	testType.equal<IsNotTuple<{}, IsNotTuple.$Default>, IsNotTuple<{}>>(true)
	testType.equal<IsNotTuple<[], IsNotTuple.$Default>, IsNotTuple<[]>>(true)
	testType.equal<IsNotTuple<() => void, IsNotTuple.$Default>, IsNotTuple<() => void>>(true)
	testType.equal<IsNotTuple<1 | string, IsNotTuple.$Default>, IsNotTuple<1 | string>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNotTuple<any>, IsNotTuple<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<unknown>, IsNotTuple<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<never>, IsNotTuple<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<void>, IsNotTuple<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<{}>, IsNotTuple<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<object>, IsNotTuple<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<undefined>, IsNotTuple<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<null>, IsNotTuple<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<{} | null | undefined>, IsNotTuple<{} | null | undefined, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<IsNotTuple<string>, IsNotTuple<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<'a'>, IsNotTuple<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<`a${string}`>, IsNotTuple<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<Uppercase<string>>, IsNotTuple<Uppercase<string>, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<string & { a: 1 }>, IsNotTuple<string & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<number>, IsNotTuple<number, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<1>, IsNotTuple<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<-1>, IsNotTuple<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<1.5>, IsNotTuple<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<1 & { a: 1 }>, IsNotTuple<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<bigint>, IsNotTuple<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<1n>, IsNotTuple<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<-1n>, IsNotTuple<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<boolean>, IsNotTuple<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<true>, IsNotTuple<true, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<false>, IsNotTuple<false, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<boolean | 1>, IsNotTuple<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<symbol>, IsNotTuple<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<{ a: 1 }>, IsNotTuple<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<() => void>, IsNotTuple<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<Function>, IsNotTuple<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<string[]>, IsNotTuple<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<readonly string[]>, IsNotTuple<readonly string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<[]>, IsNotTuple<[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<[1]>, IsNotTuple<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<readonly [1]>, IsNotTuple<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<{} | 1>, IsNotTuple<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<string | 1>, IsNotTuple<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<object | undefined>, IsNotTuple<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<void | undefined>, IsNotTuple<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<never | 1>, IsNotTuple<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotTuple<unknown | 1>, IsNotTuple<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
