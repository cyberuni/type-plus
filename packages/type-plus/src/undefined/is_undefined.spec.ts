import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsUndefined, testType } from '../index.js'

it('returns true for undefined', () => {
	testType.equal<IsUndefined<undefined>, true>(true)
})

it('returns false for special types', () => {
	testType.equal<IsUndefined<any>, false>(true)
	testType.equal<IsUndefined<unknown>, false>(true)
	testType.equal<IsUndefined<void>, false>(true)
	testType.equal<IsUndefined<never>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsUndefined<null>, false>(true)
	testType.equal<IsUndefined<number>, false>(true)
	testType.equal<IsUndefined<boolean>, false>(true)
	testType.equal<IsUndefined<true>, false>(true)
	testType.equal<IsUndefined<false>, false>(true)
	testType.equal<IsUndefined<string>, false>(true)
	testType.equal<IsUndefined<''>, false>(true)
	testType.equal<IsUndefined<symbol>, false>(true)
	testType.equal<IsUndefined<bigint>, false>(true)
	testType.equal<IsUndefined<{}>, false>(true)
	testType.equal<IsUndefined<string[]>, false>(true)
	testType.equal<IsUndefined<[]>, false>(true)
	testType.equal<IsUndefined<Function>, false>(true)
	testType.equal<IsUndefined<() => void>, false>(true)
})

it('returns false as undefined & any => any', () => {
	testType.equal<IsUndefined<undefined & any>, false>(true)
})

it('returns true as undefined & unknown => undefined', () => {
	testType.equal<IsUndefined<undefined & unknown>, true>(true)
})

it('returns true as undefined & void => undefined', () => {
	testType.equal<IsUndefined<undefined & void>, true>(true)
})

it('returns false as undefined & never => never', () => {
	testType.equal<IsUndefined<undefined & never>, false>(true)
})

it('returns false as undefined & <others> => never', () => {
	testType.equal<IsUndefined<undefined & null>, false>(true)
	testType.equal<IsUndefined<undefined & number>, false>(true)
	testType.equal<IsUndefined<undefined & 1>, false>(true)
	testType.equal<IsUndefined<undefined & boolean>, false>(true)
	testType.equal<IsUndefined<undefined & true>, false>(true)
	testType.equal<IsUndefined<undefined & false>, false>(true)
	testType.equal<IsUndefined<undefined & string>, false>(true)
	testType.equal<IsUndefined<undefined & ''>, false>(true)
	testType.equal<IsUndefined<undefined & symbol>, false>(true)
	testType.equal<IsUndefined<undefined & bigint>, false>(true)
	testType.equal<IsUndefined<undefined & 1n>, false>(true)
	testType.equal<IsUndefined<undefined & {}>, false>(true)
	testType.equal<IsUndefined<undefined & { a: 1 }>, false>(true)
	testType.equal<IsUndefined<undefined & string[]>, false>(true)
	testType.equal<IsUndefined<undefined & []>, false>(true)
	testType.equal<IsUndefined<undefined & Function>, false>(true)
	testType.equal<IsUndefined<undefined & (() => void)>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsUndefined<undefined, { selection: 'filter' }>, undefined>(true)

	testType.equal<IsUndefined<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsUndefined<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsUndefined<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsUndefined<string | undefined, { selection: 'filter' }>, undefined>(true)
})

it('distributes for union type', () => {
	testType.equal<IsUndefined<undefined | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsUndefined<undefined | 1, { distributive: false }>, false>(true)
})

it('works with unique branches', () => {
	testType.equal<IsUndefined<undefined, IsUndefined.$Branch>, $Then>(true)

	testType.equal<IsUndefined<any, IsUndefined.$Branch>, $Else>(true)
	testType.equal<IsUndefined<unknown, IsUndefined.$Branch>, $Else>(true)
	testType.equal<IsUndefined<never, IsUndefined.$Branch>, $Else>(true)
	testType.equal<IsUndefined<void, IsUndefined.$Branch>, $Else>(true)

	testType.equal<IsUndefined<undefined | 1, IsUndefined.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsUndefined<any>, false>(true)
	testType.equal<IsUndefined<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsUndefined<unknown>, false>(true)
	testType.equal<IsUndefined<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsUndefined<never>, false>(true)
	testType.equal<IsUndefined<never, { $never: unknown }>, unknown>(true)
})

it('can override $void branch', () => {
	testType.equal<IsUndefined<void>, false>(true)
	testType.equal<IsUndefined<void, { $void: unknown }>, unknown>(true)
})

describe('IsUndefined.$Fn', () => {
	it('is IsUndefined as a type function', () => {
		testType.equal<$Fn.Apply<IsUndefined.$Fn, undefined>, true>(true)
		testType.equal<$Fn.Apply<IsUndefined.$Fn, null>, false>(true)
	})
})

it('resolves `IsUndefined.$Default` the same as no options', () => {
	// `IsUndefined.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsUndefined<any, IsUndefined.$Default>, IsUndefined<any>>(true)
	testType.equal<IsUndefined<unknown, IsUndefined.$Default>, IsUndefined<unknown>>(true)
	testType.equal<IsUndefined<never, IsUndefined.$Default>, IsUndefined<never>>(true)
	testType.equal<IsUndefined<void, IsUndefined.$Default>, IsUndefined<void>>(true)
	testType.equal<IsUndefined<undefined, IsUndefined.$Default>, IsUndefined<undefined>>(true)
	testType.equal<IsUndefined<null, IsUndefined.$Default>, IsUndefined<null>>(true)
	testType.equal<IsUndefined<boolean, IsUndefined.$Default>, IsUndefined<boolean>>(true)
	testType.equal<IsUndefined<true, IsUndefined.$Default>, IsUndefined<true>>(true)
	testType.equal<IsUndefined<1, IsUndefined.$Default>, IsUndefined<1>>(true)
	testType.equal<IsUndefined<number, IsUndefined.$Default>, IsUndefined<number>>(true)
	testType.equal<IsUndefined<'a', IsUndefined.$Default>, IsUndefined<'a'>>(true)
	testType.equal<IsUndefined<string, IsUndefined.$Default>, IsUndefined<string>>(true)
	testType.equal<IsUndefined<symbol, IsUndefined.$Default>, IsUndefined<symbol>>(true)
	testType.equal<IsUndefined<1n, IsUndefined.$Default>, IsUndefined<1n>>(true)
	testType.equal<IsUndefined<{}, IsUndefined.$Default>, IsUndefined<{}>>(true)
	testType.equal<IsUndefined<[], IsUndefined.$Default>, IsUndefined<[]>>(true)
	testType.equal<IsUndefined<() => void, IsUndefined.$Default>, IsUndefined<() => void>>(true)
	testType.equal<IsUndefined<1 | string, IsUndefined.$Default>, IsUndefined<1 | string>>(true)
})
