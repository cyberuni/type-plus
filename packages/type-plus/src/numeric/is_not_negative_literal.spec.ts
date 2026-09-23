import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotNegativeLiteral, testType } from '../index.js'

it('matches the numeric literals it accepts and rejects the rest', () => {
	testType.equal<IsNotNegativeLiteral<1>, true>(true)
	testType.equal<IsNotNegativeLiteral<0>, true>(true)
	testType.equal<IsNotNegativeLiteral<-0>, true>(true)
	testType.equal<IsNotNegativeLiteral<2>, true>(true)
	testType.equal<IsNotNegativeLiteral<-1>, false>(true)
	testType.equal<IsNotNegativeLiteral<-2>, false>(true)
	testType.equal<IsNotNegativeLiteral<1.1>, true>(true)
	testType.equal<IsNotNegativeLiteral<-1.1>, false>(true)
	testType.equal<IsNotNegativeLiteral<1n>, true>(true)
	testType.equal<IsNotNegativeLiteral<0n>, true>(true)
	testType.equal<IsNotNegativeLiteral<-1n>, false>(true)
	testType.equal<IsNotNegativeLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsNotNegativeLiteral<-1 & { a: 1 }>, false>(true)
	testType.equal<IsNotNegativeLiteral<1.1 & { a: 1 }>, true>(true)
	testType.equal<IsNotNegativeLiteral<1n & { a: 1 }>, true>(true)
	testType.equal<IsNotNegativeLiteral<-1n & { a: 1 }>, false>(true)
})

it('rejects the wide `number` and `bigint`, which are not literals', () => {
	testType.equal<IsNotNegativeLiteral<number>, true>(true)
	testType.equal<IsNotNegativeLiteral<bigint>, true>(true)
	testType.equal<IsNotNegativeLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotNegativeLiteral<bigint & { a: 1 }>, true>(true)
})

it('answers the non-numeric types with the `$else` branch of the literal test', () => {
	testType.equal<IsNotNegativeLiteral<string>, true>(true)
	testType.equal<IsNotNegativeLiteral<''>, true>(true)
	testType.equal<IsNotNegativeLiteral<boolean>, true>(true)
	testType.equal<IsNotNegativeLiteral<true>, true>(true)
	testType.equal<IsNotNegativeLiteral<false>, true>(true)
	testType.equal<IsNotNegativeLiteral<undefined>, true>(true)
	testType.equal<IsNotNegativeLiteral<null>, true>(true)
	testType.equal<IsNotNegativeLiteral<symbol>, true>(true)
	testType.equal<IsNotNegativeLiteral<{}>, true>(true)
	testType.equal<IsNotNegativeLiteral<string[]>, true>(true)
	testType.equal<IsNotNegativeLiteral<[]>, true>(true)
	testType.equal<IsNotNegativeLiteral<() => void>, true>(true)
})

it('treats the special types as non-numeric', () => {
	testType.equal<IsNotNegativeLiteral<any>, true>(true)
	testType.equal<IsNotNegativeLiteral<unknown>, true>(true)
	testType.equal<IsNotNegativeLiteral<never>, true>(true)
	testType.equal<IsNotNegativeLiteral<void>, true>(true)
})

it('distributes over a union', () => {
	testType.equal<IsNotNegativeLiteral<-1 | string>, boolean>(true)
	testType.equal<IsNotNegativeLiteral<number | string>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotNegativeLiteral<-1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNegativeLiteral<number | string, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotNegativeLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotNegativeLiteral<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNegativeLiteral<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotNegativeLiteral<never, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotNegativeLiteral<1, IsNotNegativeLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNegativeLiteral<-1, IsNotNegativeLiteral.$Branch>, $Else>(true)
	testType.equal<IsNotNegativeLiteral<any, IsNotNegativeLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNegativeLiteral<unknown, IsNotNegativeLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNegativeLiteral<never, IsNotNegativeLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNegativeLiteral<void, IsNotNegativeLiteral.$Branch>, $Then>(true)
})

it('can override special type branches', () => {
	testType.equal<IsNotNegativeLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotNegativeLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotNegativeLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotNegativeLiteral<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNotNegativeLiteral<unknown, { $any: 1 }>, IsNotNegativeLiteral<unknown>>(true)
	testType.equal<IsNotNegativeLiteral<1 | string, { $any: 1 }>, IsNotNegativeLiteral<1 | string>>(true)
	testType.equal<
		IsNotNegativeLiteral<1 | string, { $void: 4; selection: 'filter' }>,
		IsNotNegativeLiteral<1 | string, { selection: 'filter' }>
	>(true)
})

it('does not accept `exact`, which would do nothing here', () => {
	// @ts-expect-error `exact` is not an option of this type.
	type R = IsNotNegativeLiteral<1, { exact: true }>
	testType.never<never & R>(true)
})

it('pins the TSDoc examples', () => {
	testType.equal<IsNotNegativeLiteral<0>, true>(true)
	testType.equal<IsNotNegativeLiteral<1>, true>(true)
	testType.equal<IsNotNegativeLiteral<1n>, true>(true)
	testType.equal<IsNotNegativeLiteral<number>, true>(true)
	testType.equal<IsNotNegativeLiteral<bigint>, true>(true)
	testType.equal<IsNotNegativeLiteral<string>, true>(true)
	testType.equal<IsNotNegativeLiteral<-1>, false>(true)
	testType.equal<IsNotNegativeLiteral<-1.1>, false>(true)
	testType.equal<IsNotNegativeLiteral<-1n>, false>(true)
	testType.equal<IsNotNegativeLiteral<any>, true>(true)
	testType.equal<IsNotNegativeLiteral<unknown>, true>(true)
	testType.equal<IsNotNegativeLiteral<never>, true>(true)
	testType.equal<IsNotNegativeLiteral<void>, true>(true)

	testType.equal<IsNotNegativeLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsNotNegativeLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotNegativeLiteral<-1 & { a: 1 }>, false>(true)

	testType.equal<IsNotNegativeLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotNegativeLiteral<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNegativeLiteral<number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNotNegativeLiteral<-1 | string>, boolean>(true)
	testType.equal<IsNotNegativeLiteral<-1 | string, { distributive: false }>, true>(true)

	testType.equal<IsNotNegativeLiteral<1, IsNotNegativeLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotNegativeLiteral<-1, IsNotNegativeLiteral.$Branch>, $Else>(true)

	testType.equal<IsNotNegativeLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotNegativeLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotNegativeLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotNegativeLiteral<void, { $void: 4 }>, 4>(true)
})

describe('IsNotNegativeLiteral.$Fn', () => {
	it('is IsNotNegativeLiteral as a type function', () => {
		testType.equal<$Fn.Apply<IsNotNegativeLiteral.$Fn, number>, true>(true)
		testType.equal<$Fn.Apply<IsNotNegativeLiteral.$Fn, -1>, false>(true)
	})
})

it('resolves `IsNotNegativeLiteral.$Default` the same as no options', () => {
	// `IsNotNegativeLiteral.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotNegativeLiteral<any, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<any>>(true)
	testType.equal<IsNotNegativeLiteral<unknown, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<unknown>>(true)
	testType.equal<IsNotNegativeLiteral<never, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<never>>(true)
	testType.equal<IsNotNegativeLiteral<void, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<void>>(true)
	testType.equal<IsNotNegativeLiteral<undefined, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<undefined>>(true)
	testType.equal<IsNotNegativeLiteral<null, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<null>>(true)
	testType.equal<IsNotNegativeLiteral<boolean, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<boolean>>(true)
	testType.equal<IsNotNegativeLiteral<true, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<true>>(true)
	testType.equal<IsNotNegativeLiteral<1, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<1>>(true)
	testType.equal<IsNotNegativeLiteral<number, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<number>>(true)
	testType.equal<IsNotNegativeLiteral<'a', IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<'a'>>(true)
	testType.equal<IsNotNegativeLiteral<string, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<string>>(true)
	testType.equal<IsNotNegativeLiteral<symbol, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<symbol>>(true)
	testType.equal<IsNotNegativeLiteral<1n, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<1n>>(true)
	testType.equal<IsNotNegativeLiteral<{}, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<{}>>(true)
	testType.equal<IsNotNegativeLiteral<[], IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<[]>>(true)
	testType.equal<IsNotNegativeLiteral<() => void, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<() => void>>(
		true,
	)
	testType.equal<IsNotNegativeLiteral<1 | string, IsNotNegativeLiteral.$Default>, IsNotNegativeLiteral<1 | string>>(
		true,
	)
})
