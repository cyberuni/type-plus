import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotFalse, testType } from '../index.js'

it('returns false if T is false', () => {
	testType.equal<IsNotFalse<false>, false>(true)
})

it('returns boolean if T is boolean because it is distributive by default', () => {
	testType.equal<IsNotFalse<boolean>, boolean>(true)
	testType.equal<IsNotFalse<boolean, { distributive: false }>, true>(true)
})

it('returns true if T is true', () => {
	testType.equal<IsNotFalse<true>, true>(true)
})

it('returns true for special types', () => {
	testType.equal<IsNotFalse<void>, true>(true)
	testType.equal<IsNotFalse<unknown>, true>(true)
	testType.equal<IsNotFalse<any>, true>(true)
	testType.equal<IsNotFalse<never>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotFalse<undefined>, true>(true)
	testType.equal<IsNotFalse<null>, true>(true)
	testType.equal<IsNotFalse<number>, true>(true)
	testType.equal<IsNotFalse<1>, true>(true)
	testType.equal<IsNotFalse<true>, true>(true)
	testType.equal<IsNotFalse<string>, true>(true)
	testType.equal<IsNotFalse<''>, true>(true)
	testType.equal<IsNotFalse<symbol>, true>(true)
	testType.equal<IsNotFalse<bigint>, true>(true)
	testType.equal<IsNotFalse<1n>, true>(true)
	testType.equal<IsNotFalse<{}>, true>(true)
	testType.equal<IsNotFalse<{ a: 1 }>, true>(true)
	testType.equal<IsNotFalse<string[]>, true>(true)
	testType.equal<IsNotFalse<[]>, true>(true)
	testType.equal<IsNotFalse<Function>, true>(true)
	testType.equal<IsNotFalse<() => void>, true>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotFalse<boolean>, boolean>(true)
	testType.equal<IsNotFalse<boolean | 1>, boolean>(true)
	testType.equal<IsNotFalse<false | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotFalse<boolean, { distributive: false }>, true>(true)
	testType.equal<IsNotFalse<boolean | 1, { distributive: false }>, true>(true)
})

it('returns distribute over intersection type', () => {
	testType.equal<IsNotFalse<false & { a: 1 }>, false>(true)
	testType.equal<IsNotFalse<true & { a: 1 }>, true>(true)
	testType.equal<IsNotFalse<boolean & { a: 1 }>, boolean>(true)

	testType.equal<IsNotFalse<false & { a: 1 }, { distributive: false }>, false>(true)
	testType.equal<IsNotFalse<(false | 1) & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotFalse<true & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotFalse<boolean & { a: 1 }, { distributive: false }>, true>(true)
})

it('resolves `IsNotFalse.$Default` the same as no options', () => {
	// `IsNotFalse.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotFalse<any, IsNotFalse.$Default>, IsNotFalse<any>>(true)
	testType.equal<IsNotFalse<unknown, IsNotFalse.$Default>, IsNotFalse<unknown>>(true)
	testType.equal<IsNotFalse<never, IsNotFalse.$Default>, IsNotFalse<never>>(true)
	testType.equal<IsNotFalse<void, IsNotFalse.$Default>, IsNotFalse<void>>(true)
	testType.equal<IsNotFalse<false, IsNotFalse.$Default>, IsNotFalse<false>>(true)
	testType.equal<IsNotFalse<true, IsNotFalse.$Default>, IsNotFalse<true>>(true)
	testType.equal<IsNotFalse<boolean, IsNotFalse.$Default>, IsNotFalse<boolean>>(true)
	testType.equal<IsNotFalse<1, IsNotFalse.$Default>, IsNotFalse<1>>(true)
	testType.equal<IsNotFalse<false | 1, IsNotFalse.$Default>, IsNotFalse<false | 1>>(true)
	testType.equal<IsNotFalse<boolean & { a: 1 }, IsNotFalse.$Default>, IsNotFalse<boolean & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotFalse<boolean, { selection: 'filter' }>, true>(true)
	testType.equal<IsNotFalse<true, { selection: 'filter' }>, true>(true)
	testType.equal<IsNotFalse<false, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotFalse<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotFalse<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotFalse<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotFalse<string | boolean, { selection: 'filter' }>, string | true>(true)
	testType.equal<IsNotFalse<string | boolean, { selection: 'filter'; distributive: false }>, string | boolean>(true)

	testType.equal<IsNotFalse<string | false, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotFalse<false, IsNotFalse.$Branch>, $Else>(true)
	testType.equal<IsNotFalse<true, IsNotFalse.$Branch>, $Then>(true)
	testType.equal<IsNotFalse<boolean, IsNotFalse.$Branch>, $Then | $Else>(true)

	testType.equal<IsNotFalse<any, IsNotFalse.$Branch>, $Then>(true)
	testType.equal<IsNotFalse<unknown, IsNotFalse.$Branch>, $Then>(true)
	testType.equal<IsNotFalse<never, IsNotFalse.$Branch>, $Then>(true)
	testType.equal<IsNotFalse<void, IsNotFalse.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotFalse<any>, true>(true)
	testType.equal<IsNotFalse<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotFalse<unknown>, true>(true)
	testType.equal<IsNotFalse<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotFalse<never>, true>(true)
	testType.equal<IsNotFalse<never, { $never: unknown }>, unknown>(true)
})

describe('IsNotFalse.$Fn', () => {
	it('is IsNotFalse as a type function', () => {
		testType.equal<$Fn.Apply<IsNotFalse.$Fn, true>, true>(true)
		testType.equal<$Fn.Apply<IsNotFalse.$Fn, false>, false>(true)
	})
})
