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
