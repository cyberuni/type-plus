import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotIntegerLiteral, testType } from '../index.js'

it('matches the numeric literals it accepts and rejects the rest', () => {
	testType.equal<IsNotIntegerLiteral<1>, false>(true)
	testType.equal<IsNotIntegerLiteral<0>, false>(true)
	testType.equal<IsNotIntegerLiteral<-0>, false>(true)
	testType.equal<IsNotIntegerLiteral<2>, false>(true)
	testType.equal<IsNotIntegerLiteral<-1>, false>(true)
	testType.equal<IsNotIntegerLiteral<-2>, false>(true)
	testType.equal<IsNotIntegerLiteral<1.1>, true>(true)
	testType.equal<IsNotIntegerLiteral<-1.1>, true>(true)
	testType.equal<IsNotIntegerLiteral<1n>, false>(true)
	testType.equal<IsNotIntegerLiteral<0n>, false>(true)
	testType.equal<IsNotIntegerLiteral<-1n>, false>(true)
	testType.equal<IsNotIntegerLiteral<1 & { a: 1 }>, false>(true)
	testType.equal<IsNotIntegerLiteral<-1 & { a: 1 }>, false>(true)
	testType.equal<IsNotIntegerLiteral<1.1 & { a: 1 }>, true>(true)
	testType.equal<IsNotIntegerLiteral<1n & { a: 1 }>, false>(true)
	testType.equal<IsNotIntegerLiteral<-1n & { a: 1 }>, false>(true)
})

it('rejects the wide `number` and `bigint`, which are not literals', () => {
	testType.equal<IsNotIntegerLiteral<number>, true>(true)
	testType.equal<IsNotIntegerLiteral<bigint>, true>(true)
	testType.equal<IsNotIntegerLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotIntegerLiteral<bigint & { a: 1 }>, true>(true)
})

it('answers the non-numeric types with the `$else` branch of the literal test', () => {
	testType.equal<IsNotIntegerLiteral<string>, true>(true)
	testType.equal<IsNotIntegerLiteral<''>, true>(true)
	testType.equal<IsNotIntegerLiteral<boolean>, true>(true)
	testType.equal<IsNotIntegerLiteral<true>, true>(true)
	testType.equal<IsNotIntegerLiteral<false>, true>(true)
	testType.equal<IsNotIntegerLiteral<undefined>, true>(true)
	testType.equal<IsNotIntegerLiteral<null>, true>(true)
	testType.equal<IsNotIntegerLiteral<symbol>, true>(true)
	testType.equal<IsNotIntegerLiteral<{}>, true>(true)
	testType.equal<IsNotIntegerLiteral<string[]>, true>(true)
	testType.equal<IsNotIntegerLiteral<[]>, true>(true)
	testType.equal<IsNotIntegerLiteral<() => void>, true>(true)
})

it('treats the special types as non-numeric', () => {
	testType.equal<IsNotIntegerLiteral<any>, true>(true)
	testType.equal<IsNotIntegerLiteral<unknown>, true>(true)
	testType.equal<IsNotIntegerLiteral<never>, true>(true)
	testType.equal<IsNotIntegerLiteral<void>, true>(true)
})

it('distributes over a union', () => {
	testType.equal<IsNotIntegerLiteral<1 | string>, boolean>(true)
	testType.equal<IsNotIntegerLiteral<number | string>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotIntegerLiteral<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotIntegerLiteral<number | string, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsNotIntegerLiteral<1.1, { selection: 'filter' }>, 1.1>(true)
	testType.equal<IsNotIntegerLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotIntegerLiteral<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotIntegerLiteral<never, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotIntegerLiteral<1.1, IsNotIntegerLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotIntegerLiteral<1, IsNotIntegerLiteral.$Branch>, $Else>(true)
	testType.equal<IsNotIntegerLiteral<any, IsNotIntegerLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotIntegerLiteral<unknown, IsNotIntegerLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotIntegerLiteral<never, IsNotIntegerLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotIntegerLiteral<void, IsNotIntegerLiteral.$Branch>, $Then>(true)
})

it('can override special type branches', () => {
	testType.equal<IsNotIntegerLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotIntegerLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotIntegerLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotIntegerLiteral<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNotIntegerLiteral<unknown, { $any: 1 }>, IsNotIntegerLiteral<unknown>>(true)
	testType.equal<IsNotIntegerLiteral<1 | string, { $any: 1 }>, IsNotIntegerLiteral<1 | string>>(true)
	testType.equal<
		IsNotIntegerLiteral<1 | string, { $void: 4; selection: 'filter' }>,
		IsNotIntegerLiteral<1 | string, { selection: 'filter' }>
	>(true)
})

it('does not accept `exact`, which would do nothing here', () => {
	// @ts-expect-error `exact` is not an option of this type.
	type R = IsNotIntegerLiteral<1, { exact: true }>
	testType.never<never & R>(true)
})

it('pins the TSDoc examples', () => {
	testType.equal<IsNotIntegerLiteral<1.1>, true>(true)
	testType.equal<IsNotIntegerLiteral<number>, true>(true)
	testType.equal<IsNotIntegerLiteral<bigint>, true>(true)
	testType.equal<IsNotIntegerLiteral<string>, true>(true)
	testType.equal<IsNotIntegerLiteral<0>, false>(true)
	testType.equal<IsNotIntegerLiteral<-1>, false>(true)
	testType.equal<IsNotIntegerLiteral<1n>, false>(true)
	testType.equal<IsNotIntegerLiteral<any>, true>(true)
	testType.equal<IsNotIntegerLiteral<unknown>, true>(true)
	testType.equal<IsNotIntegerLiteral<never>, true>(true)
	testType.equal<IsNotIntegerLiteral<void>, true>(true)

	testType.equal<IsNotIntegerLiteral<1.1 & { a: 1 }>, true>(true)
	testType.equal<IsNotIntegerLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotIntegerLiteral<1 & { a: 1 }>, false>(true)

	testType.equal<IsNotIntegerLiteral<1.1, { selection: 'filter' }>, 1.1>(true)
	testType.equal<IsNotIntegerLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotIntegerLiteral<number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNotIntegerLiteral<1 | string>, boolean>(true)
	testType.equal<IsNotIntegerLiteral<1 | string, { distributive: false }>, true>(true)

	testType.equal<IsNotIntegerLiteral<1.1, IsNotIntegerLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotIntegerLiteral<1, IsNotIntegerLiteral.$Branch>, $Else>(true)

	testType.equal<IsNotIntegerLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotIntegerLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotIntegerLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotIntegerLiteral<void, { $void: 4 }>, 4>(true)
})

describe('IsNotIntegerLiteral.$Fn', () => {
	it('is IsNotIntegerLiteral as a type function', () => {
		testType.equal<$Fn.Apply<IsNotIntegerLiteral.$Fn, number>, true>(true)
		testType.equal<$Fn.Apply<IsNotIntegerLiteral.$Fn, 1>, false>(true)
	})
})

it('resolves `IsNotIntegerLiteral.$Default` the same as no options', () => {
	// `IsNotIntegerLiteral.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotIntegerLiteral<any, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<any>>(true)
	testType.equal<IsNotIntegerLiteral<unknown, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<unknown>>(true)
	testType.equal<IsNotIntegerLiteral<never, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<never>>(true)
	testType.equal<IsNotIntegerLiteral<void, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<void>>(true)
	testType.equal<IsNotIntegerLiteral<undefined, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<undefined>>(true)
	testType.equal<IsNotIntegerLiteral<null, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<null>>(true)
	testType.equal<IsNotIntegerLiteral<boolean, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<boolean>>(true)
	testType.equal<IsNotIntegerLiteral<true, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<true>>(true)
	testType.equal<IsNotIntegerLiteral<1, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<1>>(true)
	testType.equal<IsNotIntegerLiteral<number, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<number>>(true)
	testType.equal<IsNotIntegerLiteral<'a', IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<'a'>>(true)
	testType.equal<IsNotIntegerLiteral<string, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<string>>(true)
	testType.equal<IsNotIntegerLiteral<symbol, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<symbol>>(true)
	testType.equal<IsNotIntegerLiteral<1n, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<1n>>(true)
	testType.equal<IsNotIntegerLiteral<{}, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<{}>>(true)
	testType.equal<IsNotIntegerLiteral<[], IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<[]>>(true)
	testType.equal<IsNotIntegerLiteral<() => void, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<() => void>>(true)
	testType.equal<IsNotIntegerLiteral<1 | string, IsNotIntegerLiteral.$Default>, IsNotIntegerLiteral<1 | string>>(true)
})
