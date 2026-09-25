import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotSymbol, testType } from '../index.js'

it('returns false for symbol', () => {
	testType.false<IsNotSymbol<symbol>>(true)

	const s = Symbol()
	testType.false<IsNotSymbol<typeof s>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotSymbol<any>>(true)
	testType.true<IsNotSymbol<unknown>>(true)
	testType.true<IsNotSymbol<void>>(true)
	testType.true<IsNotSymbol<never>>(true)
})

it('returns true for singular types', () => {
	testType.true<IsNotSymbol<undefined>>(true)
	testType.true<IsNotSymbol<null>>(true)
	testType.true<IsNotSymbol<number>>(true)
	testType.true<IsNotSymbol<boolean>>(true)
	testType.true<IsNotSymbol<true>>(true)
	testType.true<IsNotSymbol<false>>(true)
	testType.true<IsNotSymbol<string>>(true)
	testType.true<IsNotSymbol<''>>(true)
	testType.true<IsNotSymbol<bigint>>(true)
	testType.true<IsNotSymbol<{}>>(true)
	testType.true<IsNotSymbol<string[]>>(true)
	testType.true<IsNotSymbol<[]>>(true)
	testType.true<IsNotSymbol<Function>>(true)
	testType.true<IsNotSymbol<() => void>>(true)
})

it('is distributive by default', () => {
	testType.equal<IsNotSymbol<symbol | 1>, true | false>(true)
})

it('can disable distributive', () => {
	testType.equal<IsNotSymbol<1>, true>(true)
	testType.equal<IsNotSymbol<symbol | 1, { distributive: false }>, true>(true)
})

it('returns true for intersection type', () => {
	testType.false<IsNotSymbol<symbol & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotSymbol<symbol, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotSymbol<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotSymbol<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotSymbol<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<string | never, string>(true)
	testType.equal<IsNotSymbol<string | symbol, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotSymbol<symbol, IsNotSymbol.$Branch>, $Else>(true)

	testType.equal<IsNotSymbol<any, IsNotSymbol.$Branch>, $Then>(true)
	testType.equal<IsNotSymbol<unknown, IsNotSymbol.$Branch>, $Then>(true)
	testType.equal<IsNotSymbol<never, IsNotSymbol.$Branch>, $Then>(true)
	testType.equal<IsNotSymbol<void, IsNotSymbol.$Branch>, $Then>(true)

	testType.equal<IsNotSymbol<symbol | 1, IsNotSymbol.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotSymbol<any>, true>(true)
	testType.equal<IsNotSymbol<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotSymbol<unknown>, true>(true)
	testType.equal<IsNotSymbol<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotSymbol<never>, true>(true)
	testType.equal<IsNotSymbol<never, { $never: unknown }>, unknown>(true)
})

describe('IsNotSymbol.$Fn', () => {
	it('is IsNotSymbol as a type function', () => {
		testType.equal<$Fn.Apply<IsNotSymbol.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotSymbol.$Fn, symbol>, false>(true)
	})
})

it('resolves `IsNotSymbol.$Default` the same as no options', () => {
	// `IsNotSymbol.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotSymbol<any, IsNotSymbol.$Default>, IsNotSymbol<any>>(true)
	testType.equal<IsNotSymbol<unknown, IsNotSymbol.$Default>, IsNotSymbol<unknown>>(true)
	testType.equal<IsNotSymbol<never, IsNotSymbol.$Default>, IsNotSymbol<never>>(true)
	testType.equal<IsNotSymbol<void, IsNotSymbol.$Default>, IsNotSymbol<void>>(true)
	testType.equal<IsNotSymbol<undefined, IsNotSymbol.$Default>, IsNotSymbol<undefined>>(true)
	testType.equal<IsNotSymbol<null, IsNotSymbol.$Default>, IsNotSymbol<null>>(true)
	testType.equal<IsNotSymbol<boolean, IsNotSymbol.$Default>, IsNotSymbol<boolean>>(true)
	testType.equal<IsNotSymbol<true, IsNotSymbol.$Default>, IsNotSymbol<true>>(true)
	testType.equal<IsNotSymbol<1, IsNotSymbol.$Default>, IsNotSymbol<1>>(true)
	testType.equal<IsNotSymbol<number, IsNotSymbol.$Default>, IsNotSymbol<number>>(true)
	testType.equal<IsNotSymbol<'a', IsNotSymbol.$Default>, IsNotSymbol<'a'>>(true)
	testType.equal<IsNotSymbol<string, IsNotSymbol.$Default>, IsNotSymbol<string>>(true)
	testType.equal<IsNotSymbol<symbol, IsNotSymbol.$Default>, IsNotSymbol<symbol>>(true)
	testType.equal<IsNotSymbol<1n, IsNotSymbol.$Default>, IsNotSymbol<1n>>(true)
	testType.equal<IsNotSymbol<{}, IsNotSymbol.$Default>, IsNotSymbol<{}>>(true)
	testType.equal<IsNotSymbol<[], IsNotSymbol.$Default>, IsNotSymbol<[]>>(true)
	testType.equal<IsNotSymbol<() => void, IsNotSymbol.$Default>, IsNotSymbol<() => void>>(true)
	testType.equal<IsNotSymbol<1 | string, IsNotSymbol.$Default>, IsNotSymbol<1 | string>>(true)
})
