import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsArray, testType } from '../index.js'

it('returns true if T is array', () => {
	testType.true<IsArray<any[]>>(true)
	testType.true<IsArray<unknown[]>>(true)
	testType.true<IsArray<never[]>>(true)
	testType.true<IsArray<void[]>>(true)

	testType.true<IsArray<string[]>>(true)
})

it('returns true if T is tuple', () => {
	testType.true<IsArray<[]>>(true)
	testType.true<IsArray<[1]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsArray<void>>(true)
	testType.false<IsArray<unknown>>(true)
	testType.false<IsArray<any>>(true)
	testType.false<IsArray<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsArray<undefined>>(true)
	testType.false<IsArray<null>>(true)
	testType.false<IsArray<boolean>>(true)
	testType.false<IsArray<true>>(true)
	testType.false<IsArray<false>>(true)
	testType.false<IsArray<number>>(true)
	testType.false<IsArray<1>>(true)
	testType.false<IsArray<string>>(true)
	testType.false<IsArray<''>>(true)
	testType.false<IsArray<symbol>>(true)
	testType.false<IsArray<bigint>>(true)
	testType.false<IsArray<1n>>(true)
	testType.false<IsArray<{}>>(true)
	testType.false<IsArray<{ a: 1 }>>(true)
	testType.false<IsArray<Function>>(true)
	testType.false<IsArray<() => void>>(true)
})

it('distributes over union type', () => {
	testType.boolean<IsArray<number[] | 1>>(true)
})

it('returns true if T is union of arrays', () => {
	testType.true<IsArray<string[] | number[]>>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsArray<number[] | number, { distributive: false }>, false>(true)
})

it('works with intersection type', () => {
	testType.true<IsArray<number[] & 1>>(true)
	testType.true<IsArray<number[] & 1, { distributive: false }>>(true)

	testType.true<IsArray<[] & 1>>(true)
	testType.true<IsArray<[] & 1, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsArray<null[], { selection: 'filter' }>, null[]>(true)

	testType.equal<IsArray<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsArray<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsArray<null[] | number, { selection: 'filter' }>, null[]>(true)
})
it('works with unique branches', () => {
	testType.equal<IsArray<string[], IsArray.$Branch>, $Then>(true)

	testType.equal<IsArray<number, IsArray.$Branch>, $Else>(true)
	testType.equal<IsArray<any, IsArray.$Branch>, $Else>(true)
	testType.equal<IsArray<unknown, IsArray.$Branch>, $Else>(true)
	testType.equal<IsArray<never, IsArray.$Branch>, $Else>(true)
	testType.equal<IsArray<void, IsArray.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsArray<any>, false>(true)
	testType.equal<IsArray<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsArray<unknown>, false>(true)
	testType.equal<IsArray<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsArray<never>, false>(true)
	testType.equal<IsArray<never, { $never: unknown }>, unknown>(true)
})

it('supports readonly array', () => {
	testType.true<IsArray<readonly string[]>>(true)
	testType.true<IsArray<readonly []>>(true)
})

describe('exact', () => {
	it('returns false if T is a tuple', () => {
		testType.false<IsArray<[], { exact: true }>>(true)
		testType.false<IsArray<[1], { exact: true }>>(true)
	})

	it('returns false for tuple intersection type', () => {
		testType.false<IsArray<[] & 1, { exact: true }>>(true)
		testType.false<IsArray<[] & 1, { distributive: false; exact: true }>>(true)
	})

	it('supports readonly tuple', () => {
		testType.false<IsArray<readonly [], { exact: true }>>(true)
	})
})

describe('IsArray.$Fn', () => {
	it('is IsArray as a type function', () => {
		testType.equal<$Fn.Apply<IsArray.$Fn, string[]>, true>(true)
		testType.equal<$Fn.Apply<IsArray.$Fn, 1>, false>(true)
	})
})

it('resolves `IsArray.$Default` the same as no options', () => {
	// `IsArray.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsArray<any, IsArray.$Default>, IsArray<any>>(true)
	testType.equal<IsArray<unknown, IsArray.$Default>, IsArray<unknown>>(true)
	testType.equal<IsArray<never, IsArray.$Default>, IsArray<never>>(true)
	testType.equal<IsArray<void, IsArray.$Default>, IsArray<void>>(true)
	testType.equal<IsArray<undefined, IsArray.$Default>, IsArray<undefined>>(true)
	testType.equal<IsArray<null, IsArray.$Default>, IsArray<null>>(true)
	testType.equal<IsArray<boolean, IsArray.$Default>, IsArray<boolean>>(true)
	testType.equal<IsArray<true, IsArray.$Default>, IsArray<true>>(true)
	testType.equal<IsArray<1, IsArray.$Default>, IsArray<1>>(true)
	testType.equal<IsArray<number, IsArray.$Default>, IsArray<number>>(true)
	testType.equal<IsArray<'a', IsArray.$Default>, IsArray<'a'>>(true)
	testType.equal<IsArray<string, IsArray.$Default>, IsArray<string>>(true)
	testType.equal<IsArray<symbol, IsArray.$Default>, IsArray<symbol>>(true)
	testType.equal<IsArray<1n, IsArray.$Default>, IsArray<1n>>(true)
	testType.equal<IsArray<{}, IsArray.$Default>, IsArray<{}>>(true)
	testType.equal<IsArray<[], IsArray.$Default>, IsArray<[]>>(true)
	testType.equal<IsArray<() => void, IsArray.$Default>, IsArray<() => void>>(true)
	testType.equal<IsArray<1 | string, IsArray.$Default>, IsArray<1 | string>>(true)
})
