import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotUndefined, testType } from '../index.js'

it('returns false for undefined', () => {
	testType.equal<IsNotUndefined<undefined>, false>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotUndefined<any>, true>(true)
	testType.equal<IsNotUndefined<unknown>, true>(true)
	testType.equal<IsNotUndefined<void>, true>(true)
	testType.equal<IsNotUndefined<never>, true>(true)
})

it('returns true for singular types', () => {
	testType.equal<IsNotUndefined<null>, true>(true)
	testType.equal<IsNotUndefined<number>, true>(true)
	testType.equal<IsNotUndefined<boolean>, true>(true)
	testType.equal<IsNotUndefined<true>, true>(true)
	testType.equal<IsNotUndefined<false>, true>(true)
	testType.equal<IsNotUndefined<string>, true>(true)
	testType.equal<IsNotUndefined<''>, true>(true)
	testType.equal<IsNotUndefined<symbol>, true>(true)
	testType.equal<IsNotUndefined<bigint>, true>(true)
	testType.equal<IsNotUndefined<{}>, true>(true)
	testType.equal<IsNotUndefined<string[]>, true>(true)
	testType.equal<IsNotUndefined<[]>, true>(true)
	testType.equal<IsNotUndefined<Function>, true>(true)
	testType.equal<IsNotUndefined<() => void>, true>(true)
})

it('is distributive by default', () => {
	testType.equal<IsNotUndefined<undefined | 1>, true | false>(true)
})

it('can disable distributive', () => {
	testType.equal<IsNotUndefined<1>, true>(true)
	testType.equal<IsNotUndefined<undefined | 1, { distributive: false }>, true>(true)
})

it('returns true as undefined & any => any', () => {
	testType.equal<IsNotUndefined<undefined & any>, true>(true)
})

it('returns false as undefined & unknown => undefined', () => {
	testType.equal<IsNotUndefined<undefined & unknown>, false>(true)
})

it('returns false as undefined & void => undefined', () => {
	testType.equal<IsNotUndefined<undefined & void>, false>(true)
})

it('returns true as undefined & never => never', () => {
	testType.equal<IsNotUndefined<undefined & never>, true>(true)
})

it('returns true as undefined & <others> => never', () => {
	testType.equal<IsNotUndefined<undefined & null>, true>(true)
	testType.equal<IsNotUndefined<undefined & number>, true>(true)
	testType.equal<IsNotUndefined<undefined & 1>, true>(true)
	testType.equal<IsNotUndefined<undefined & boolean>, true>(true)
	testType.equal<IsNotUndefined<undefined & true>, true>(true)
	testType.equal<IsNotUndefined<undefined & false>, true>(true)
	testType.equal<IsNotUndefined<undefined & string>, true>(true)
	testType.equal<IsNotUndefined<undefined & ''>, true>(true)
	testType.equal<IsNotUndefined<undefined & symbol>, true>(true)
	testType.equal<IsNotUndefined<undefined & bigint>, true>(true)
	testType.equal<IsNotUndefined<undefined & 1n>, true>(true)
	testType.equal<IsNotUndefined<undefined & {}>, true>(true)
	testType.equal<IsNotUndefined<undefined & { a: 1 }>, true>(true)
	testType.equal<IsNotUndefined<undefined & string[]>, true>(true)
	testType.equal<IsNotUndefined<undefined & []>, true>(true)
	testType.equal<IsNotUndefined<undefined & Function>, true>(true)
	testType.equal<IsNotUndefined<undefined & (() => void)>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotUndefined<undefined, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotUndefined<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotUndefined<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotUndefined<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<string | never, string>(true)
	testType.equal<IsNotUndefined<string | undefined, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotUndefined<undefined, IsNotUndefined.$Branch>, $Else>(true)

	testType.equal<IsNotUndefined<any, IsNotUndefined.$Branch>, $Then>(true)
	testType.equal<IsNotUndefined<unknown, IsNotUndefined.$Branch>, $Then>(true)
	testType.equal<IsNotUndefined<never, IsNotUndefined.$Branch>, $Then>(true)
	testType.equal<IsNotUndefined<void, IsNotUndefined.$Branch>, $Then>(true)

	testType.equal<IsNotUndefined<undefined | 1, IsNotUndefined.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotUndefined<any>, true>(true)
	testType.equal<IsNotUndefined<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotUndefined<unknown>, true>(true)
	testType.equal<IsNotUndefined<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotUndefined<never>, true>(true)
	testType.equal<IsNotUndefined<never, { $never: unknown }>, unknown>(true)
})

describe('IsNotUndefined.$Fn', () => {
	it('is IsNotUndefined as a type function', () => {
		testType.equal<$Fn.Apply<IsNotUndefined.$Fn, null>, true>(true)
		testType.equal<$Fn.Apply<IsNotUndefined.$Fn, undefined>, false>(true)
	})
})

it('resolves `IsNotUndefined.$Default` the same as no options', () => {
	// `IsNotUndefined.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotUndefined<any, IsNotUndefined.$Default>, IsNotUndefined<any>>(true)
	testType.equal<IsNotUndefined<unknown, IsNotUndefined.$Default>, IsNotUndefined<unknown>>(true)
	testType.equal<IsNotUndefined<never, IsNotUndefined.$Default>, IsNotUndefined<never>>(true)
	testType.equal<IsNotUndefined<void, IsNotUndefined.$Default>, IsNotUndefined<void>>(true)
	testType.equal<IsNotUndefined<undefined, IsNotUndefined.$Default>, IsNotUndefined<undefined>>(true)
	testType.equal<IsNotUndefined<null, IsNotUndefined.$Default>, IsNotUndefined<null>>(true)
	testType.equal<IsNotUndefined<boolean, IsNotUndefined.$Default>, IsNotUndefined<boolean>>(true)
	testType.equal<IsNotUndefined<true, IsNotUndefined.$Default>, IsNotUndefined<true>>(true)
	testType.equal<IsNotUndefined<1, IsNotUndefined.$Default>, IsNotUndefined<1>>(true)
	testType.equal<IsNotUndefined<number, IsNotUndefined.$Default>, IsNotUndefined<number>>(true)
	testType.equal<IsNotUndefined<'a', IsNotUndefined.$Default>, IsNotUndefined<'a'>>(true)
	testType.equal<IsNotUndefined<string, IsNotUndefined.$Default>, IsNotUndefined<string>>(true)
	testType.equal<IsNotUndefined<symbol, IsNotUndefined.$Default>, IsNotUndefined<symbol>>(true)
	testType.equal<IsNotUndefined<1n, IsNotUndefined.$Default>, IsNotUndefined<1n>>(true)
	testType.equal<IsNotUndefined<{}, IsNotUndefined.$Default>, IsNotUndefined<{}>>(true)
	testType.equal<IsNotUndefined<[], IsNotUndefined.$Default>, IsNotUndefined<[]>>(true)
	testType.equal<IsNotUndefined<() => void, IsNotUndefined.$Default>, IsNotUndefined<() => void>>(true)
	testType.equal<IsNotUndefined<1 | string, IsNotUndefined.$Default>, IsNotUndefined<1 | string>>(true)
})
