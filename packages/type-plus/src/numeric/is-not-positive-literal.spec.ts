import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotPositiveLiteral, testType } from '../index.js'

it('matches the numeric literals it accepts and rejects the rest', () => {
	testType.equal<IsNotPositiveLiteral<1>, false>(true)
	testType.equal<IsNotPositiveLiteral<0>, false>(true)
	testType.equal<IsNotPositiveLiteral<-0>, false>(true)
	testType.equal<IsNotPositiveLiteral<2>, false>(true)
	testType.equal<IsNotPositiveLiteral<-1>, true>(true)
	testType.equal<IsNotPositiveLiteral<-2>, true>(true)
	testType.equal<IsNotPositiveLiteral<1.1>, false>(true)
	testType.equal<IsNotPositiveLiteral<-1.1>, true>(true)
	testType.equal<IsNotPositiveLiteral<1n>, false>(true)
	testType.equal<IsNotPositiveLiteral<0n>, false>(true)
	testType.equal<IsNotPositiveLiteral<-1n>, true>(true)
	testType.equal<IsNotPositiveLiteral<1 & { a: 1 }>, false>(true)
	testType.equal<IsNotPositiveLiteral<-1 & { a: 1 }>, true>(true)
	testType.equal<IsNotPositiveLiteral<1.1 & { a: 1 }>, false>(true)
	testType.equal<IsNotPositiveLiteral<1n & { a: 1 }>, false>(true)
	testType.equal<IsNotPositiveLiteral<-1n & { a: 1 }>, true>(true)
})

it('rejects the wide `number` and `bigint`, which are not literals', () => {
	testType.equal<IsNotPositiveLiteral<number>, true>(true)
	testType.equal<IsNotPositiveLiteral<bigint>, true>(true)
	testType.equal<IsNotPositiveLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotPositiveLiteral<bigint & { a: 1 }>, true>(true)
})

it('answers the non-numeric types with the `$else` branch of the literal test', () => {
	testType.equal<IsNotPositiveLiteral<string>, true>(true)
	testType.equal<IsNotPositiveLiteral<''>, true>(true)
	testType.equal<IsNotPositiveLiteral<boolean>, true>(true)
	testType.equal<IsNotPositiveLiteral<true>, true>(true)
	testType.equal<IsNotPositiveLiteral<false>, true>(true)
	testType.equal<IsNotPositiveLiteral<undefined>, true>(true)
	testType.equal<IsNotPositiveLiteral<null>, true>(true)
	testType.equal<IsNotPositiveLiteral<symbol>, true>(true)
	testType.equal<IsNotPositiveLiteral<{}>, true>(true)
	testType.equal<IsNotPositiveLiteral<string[]>, true>(true)
	testType.equal<IsNotPositiveLiteral<[]>, true>(true)
	testType.equal<IsNotPositiveLiteral<() => void>, true>(true)
})

it('treats the special types as non-numeric', () => {
	testType.equal<IsNotPositiveLiteral<any>, true>(true)
	testType.equal<IsNotPositiveLiteral<unknown>, true>(true)
	testType.equal<IsNotPositiveLiteral<never>, true>(true)
	testType.equal<IsNotPositiveLiteral<void>, true>(true)
})

it('distributes over a union', () => {
	testType.equal<IsNotPositiveLiteral<1 | string>, boolean>(true)
	testType.equal<IsNotPositiveLiteral<number | string>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotPositiveLiteral<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotPositiveLiteral<number | string, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotPositiveLiteral<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNotPositiveLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotPositiveLiteral<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotPositiveLiteral<never, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotPositiveLiteral<-1, IsNotPositiveLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotPositiveLiteral<1, IsNotPositiveLiteral.$Branch>, $Else>(true)
	testType.equal<IsNotPositiveLiteral<any, IsNotPositiveLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotPositiveLiteral<unknown, IsNotPositiveLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotPositiveLiteral<never, IsNotPositiveLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotPositiveLiteral<void, IsNotPositiveLiteral.$Branch>, $Then>(true)
})

it('can override special type branches', () => {
	testType.equal<IsNotPositiveLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotPositiveLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotPositiveLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotPositiveLiteral<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNotPositiveLiteral<unknown, { $any: 1 }>, IsNotPositiveLiteral<unknown>>(true)
	testType.equal<IsNotPositiveLiteral<1 | string, { $any: 1 }>, IsNotPositiveLiteral<1 | string>>(true)
	testType.equal<
		IsNotPositiveLiteral<1 | string, { $void: 4; selection: 'filter' }>,
		IsNotPositiveLiteral<1 | string, { selection: 'filter' }>
	>(true)
})

it('does not accept `exact`, which would do nothing here', () => {
	// @ts-expect-error `exact` is not an option of this type.
	type R = IsNotPositiveLiteral<1, { exact: true }>
	testType.never<never & R>(true)
})

it('pins the TSDoc examples', () => {
	testType.equal<IsNotPositiveLiteral<-1>, true>(true)
	testType.equal<IsNotPositiveLiteral<-1n>, true>(true)
	testType.equal<IsNotPositiveLiteral<number>, true>(true)
	testType.equal<IsNotPositiveLiteral<bigint>, true>(true)
	testType.equal<IsNotPositiveLiteral<string>, true>(true)
	testType.equal<IsNotPositiveLiteral<1>, false>(true)
	testType.equal<IsNotPositiveLiteral<0>, false>(true)
	testType.equal<IsNotPositiveLiteral<1n>, false>(true)
	testType.equal<IsNotPositiveLiteral<any>, true>(true)
	testType.equal<IsNotPositiveLiteral<unknown>, true>(true)
	testType.equal<IsNotPositiveLiteral<never>, true>(true)
	testType.equal<IsNotPositiveLiteral<void>, true>(true)

	testType.equal<IsNotPositiveLiteral<-1 & { a: 1 }>, true>(true)
	testType.equal<IsNotPositiveLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotPositiveLiteral<1 & { a: 1 }>, false>(true)

	testType.equal<IsNotPositiveLiteral<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNotPositiveLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotPositiveLiteral<number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNotPositiveLiteral<1 | string>, boolean>(true)
	testType.equal<IsNotPositiveLiteral<1 | string, { distributive: false }>, true>(true)

	testType.equal<IsNotPositiveLiteral<-1, IsNotPositiveLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotPositiveLiteral<1, IsNotPositiveLiteral.$Branch>, $Else>(true)

	testType.equal<IsNotPositiveLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotPositiveLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotPositiveLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotPositiveLiteral<void, { $void: 4 }>, 4>(true)
})

describe('IsNotPositiveLiteral.$Fn', () => {
	it('is IsNotPositiveLiteral as a type function', () => {
		testType.equal<$Fn.Apply<IsNotPositiveLiteral.$Fn, number>, true>(true)
		testType.equal<$Fn.Apply<IsNotPositiveLiteral.$Fn, 1>, false>(true)
	})
})

it('resolves `IsNotPositiveLiteral.$Default` the same as no options', () => {
	// `IsNotPositiveLiteral.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotPositiveLiteral<any, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<any>>(true)
	testType.equal<IsNotPositiveLiteral<unknown, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<unknown>>(true)
	testType.equal<IsNotPositiveLiteral<never, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<never>>(true)
	testType.equal<IsNotPositiveLiteral<void, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<void>>(true)
	testType.equal<IsNotPositiveLiteral<undefined, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<undefined>>(true)
	testType.equal<IsNotPositiveLiteral<null, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<null>>(true)
	testType.equal<IsNotPositiveLiteral<boolean, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<boolean>>(true)
	testType.equal<IsNotPositiveLiteral<true, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<true>>(true)
	testType.equal<IsNotPositiveLiteral<1, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<1>>(true)
	testType.equal<IsNotPositiveLiteral<number, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<number>>(true)
	testType.equal<IsNotPositiveLiteral<'a', IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<'a'>>(true)
	testType.equal<IsNotPositiveLiteral<string, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<string>>(true)
	testType.equal<IsNotPositiveLiteral<symbol, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<symbol>>(true)
	testType.equal<IsNotPositiveLiteral<1n, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<1n>>(true)
	testType.equal<IsNotPositiveLiteral<{}, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<{}>>(true)
	testType.equal<IsNotPositiveLiteral<[], IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<[]>>(true)
	testType.equal<IsNotPositiveLiteral<() => void, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<() => void>>(
		true,
	)
	testType.equal<IsNotPositiveLiteral<1 | string, IsNotPositiveLiteral.$Default>, IsNotPositiveLiteral<1 | string>>(
		true,
	)
})
