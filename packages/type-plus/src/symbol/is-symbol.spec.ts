import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsSymbol, testType } from '../index.js'

it('returns true for symbol', () => {
	testType.true<IsSymbol<symbol>>(true)

	const s = Symbol()
	testType.true<IsSymbol<typeof s>>(true)
})

it('returns false for special types', () => {
	testType.false<IsSymbol<any>>(true)
	testType.false<IsSymbol<unknown>>(true)
	testType.false<IsSymbol<void>>(true)
	testType.false<IsSymbol<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsSymbol<undefined>>(true)
	testType.false<IsSymbol<null>>(true)
	testType.false<IsSymbol<number>>(true)
	testType.false<IsSymbol<1>>(true)
	testType.false<IsSymbol<boolean>>(true)
	testType.false<IsSymbol<true>>(true)
	testType.false<IsSymbol<false>>(true)
	testType.false<IsSymbol<string>>(true)
	testType.false<IsSymbol<''>>(true)
	testType.false<IsSymbol<bigint>>(true)
	testType.false<IsSymbol<1n>>(true)
	testType.false<IsSymbol<{}>>(true)
	testType.false<IsSymbol<string[]>>(true)
	testType.false<IsSymbol<[]>>(true)
	testType.false<IsSymbol<Function>>(true)
	testType.false<IsSymbol<() => void>>(true)
})
it('is distributive by default', () => {
	testType.equal<IsSymbol<symbol | 1>, boolean>(true)
})

it('can disable distributive', () => {
	testType.equal<IsSymbol<symbol | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.true<IsSymbol<symbol & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsSymbol<symbol, { selection: 'filter' }>, symbol>(true)

	testType.equal<IsSymbol<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsSymbol<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsSymbol<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsSymbol<string | symbol, { selection: 'filter' }>, symbol>(true)
})

it('distributes for union type', () => {
	testType.equal<IsSymbol<symbol | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsSymbol<symbol | 1, { distributive: false }>, false>(true)
})

it('works with unique branches', () => {
	testType.equal<IsSymbol<symbol, IsSymbol.$Branch>, $Then>(true)

	testType.equal<IsSymbol<any, IsSymbol.$Branch>, $Else>(true)
	testType.equal<IsSymbol<unknown, IsSymbol.$Branch>, $Else>(true)
	testType.equal<IsSymbol<never, IsSymbol.$Branch>, $Else>(true)
	testType.equal<IsSymbol<void, IsSymbol.$Branch>, $Else>(true)

	testType.equal<IsSymbol<symbol | 1, IsSymbol.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsSymbol<any>, false>(true)
	testType.equal<IsSymbol<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsSymbol<unknown>, false>(true)
	testType.equal<IsSymbol<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsSymbol<never>, false>(true)
	testType.equal<IsSymbol<never, { $never: unknown }>, unknown>(true)
})

describe('IsSymbol.$Fn', () => {
	it('is IsSymbol as a type function', () => {
		testType.equal<$Fn.Apply<IsSymbol.$Fn, symbol>, true>(true)
		testType.equal<$Fn.Apply<IsSymbol.$Fn, 1>, false>(true)
	})
})

it('resolves `IsSymbol.$Default` the same as no options', () => {
	// `IsSymbol.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsSymbol<any, IsSymbol.$Default>, IsSymbol<any>>(true)
	testType.equal<IsSymbol<unknown, IsSymbol.$Default>, IsSymbol<unknown>>(true)
	testType.equal<IsSymbol<never, IsSymbol.$Default>, IsSymbol<never>>(true)
	testType.equal<IsSymbol<void, IsSymbol.$Default>, IsSymbol<void>>(true)
	testType.equal<IsSymbol<undefined, IsSymbol.$Default>, IsSymbol<undefined>>(true)
	testType.equal<IsSymbol<null, IsSymbol.$Default>, IsSymbol<null>>(true)
	testType.equal<IsSymbol<boolean, IsSymbol.$Default>, IsSymbol<boolean>>(true)
	testType.equal<IsSymbol<true, IsSymbol.$Default>, IsSymbol<true>>(true)
	testType.equal<IsSymbol<1, IsSymbol.$Default>, IsSymbol<1>>(true)
	testType.equal<IsSymbol<number, IsSymbol.$Default>, IsSymbol<number>>(true)
	testType.equal<IsSymbol<'a', IsSymbol.$Default>, IsSymbol<'a'>>(true)
	testType.equal<IsSymbol<string, IsSymbol.$Default>, IsSymbol<string>>(true)
	testType.equal<IsSymbol<symbol, IsSymbol.$Default>, IsSymbol<symbol>>(true)
	testType.equal<IsSymbol<1n, IsSymbol.$Default>, IsSymbol<1n>>(true)
	testType.equal<IsSymbol<{}, IsSymbol.$Default>, IsSymbol<{}>>(true)
	testType.equal<IsSymbol<[], IsSymbol.$Default>, IsSymbol<[]>>(true)
	testType.equal<IsSymbol<() => void, IsSymbol.$Default>, IsSymbol<() => void>>(true)
	testType.equal<IsSymbol<1 | string, IsSymbol.$Default>, IsSymbol<1 | string>>(true)
})
