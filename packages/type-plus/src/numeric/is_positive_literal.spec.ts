import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsPositiveLiteral, testType } from '../index.js'

it('matches the numeric literals it accepts and rejects the rest', () => {
	testType.equal<IsPositiveLiteral<1>, true>(true)
	testType.equal<IsPositiveLiteral<0>, true>(true)
	testType.equal<IsPositiveLiteral<-0>, true>(true)
	testType.equal<IsPositiveLiteral<2>, true>(true)
	testType.equal<IsPositiveLiteral<-1>, false>(true)
	testType.equal<IsPositiveLiteral<-2>, false>(true)
	testType.equal<IsPositiveLiteral<1.1>, true>(true)
	testType.equal<IsPositiveLiteral<-1.1>, false>(true)
	testType.equal<IsPositiveLiteral<1n>, true>(true)
	testType.equal<IsPositiveLiteral<0n>, true>(true)
	testType.equal<IsPositiveLiteral<-1n>, false>(true)
	testType.equal<IsPositiveLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsPositiveLiteral<-1 & { a: 1 }>, false>(true)
	testType.equal<IsPositiveLiteral<1.1 & { a: 1 }>, true>(true)
	testType.equal<IsPositiveLiteral<1n & { a: 1 }>, true>(true)
	testType.equal<IsPositiveLiteral<-1n & { a: 1 }>, false>(true)
})

it('rejects the wide `number` and `bigint`, which are not literals', () => {
	testType.equal<IsPositiveLiteral<number>, false>(true)
	testType.equal<IsPositiveLiteral<bigint>, false>(true)
	testType.equal<IsPositiveLiteral<number & { a: 1 }>, false>(true)
	testType.equal<IsPositiveLiteral<bigint & { a: 1 }>, false>(true)
})

it('answers the non-numeric types with the `$else` branch of the literal test', () => {
	testType.equal<IsPositiveLiteral<string>, false>(true)
	testType.equal<IsPositiveLiteral<''>, false>(true)
	testType.equal<IsPositiveLiteral<boolean>, false>(true)
	testType.equal<IsPositiveLiteral<true>, false>(true)
	testType.equal<IsPositiveLiteral<false>, false>(true)
	testType.equal<IsPositiveLiteral<undefined>, false>(true)
	testType.equal<IsPositiveLiteral<null>, false>(true)
	testType.equal<IsPositiveLiteral<symbol>, false>(true)
	testType.equal<IsPositiveLiteral<{}>, false>(true)
	testType.equal<IsPositiveLiteral<string[]>, false>(true)
	testType.equal<IsPositiveLiteral<[]>, false>(true)
	testType.equal<IsPositiveLiteral<() => void>, false>(true)
})

it('treats the special types as non-numeric', () => {
	testType.equal<IsPositiveLiteral<any>, false>(true)
	testType.equal<IsPositiveLiteral<unknown>, false>(true)
	testType.equal<IsPositiveLiteral<never>, false>(true)
	testType.equal<IsPositiveLiteral<void>, false>(true)
})

it('distributes over a union', () => {
	testType.equal<IsPositiveLiteral<1 | string>, boolean>(true)
	testType.equal<IsPositiveLiteral<number | string>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsPositiveLiteral<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsPositiveLiteral<number | string, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsPositiveLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsPositiveLiteral<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsPositiveLiteral<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsPositiveLiteral<never, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsPositiveLiteral<1, IsPositiveLiteral.$Branch>, $Then>(true)
	testType.equal<IsPositiveLiteral<number, IsPositiveLiteral.$Branch>, $Else>(true)
	testType.equal<IsPositiveLiteral<any, IsPositiveLiteral.$Branch>, $Else>(true)
	testType.equal<IsPositiveLiteral<unknown, IsPositiveLiteral.$Branch>, $Else>(true)
	testType.equal<IsPositiveLiteral<never, IsPositiveLiteral.$Branch>, $Else>(true)
	testType.equal<IsPositiveLiteral<void, IsPositiveLiteral.$Branch>, $Else>(true)
})

it('can override special type branches', () => {
	testType.equal<IsPositiveLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsPositiveLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsPositiveLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsPositiveLiteral<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsPositiveLiteral<unknown, { $any: 1 }>, IsPositiveLiteral<unknown>>(true)
	testType.equal<IsPositiveLiteral<1 | string, { $any: 1 }>, IsPositiveLiteral<1 | string>>(true)
	testType.equal<
		IsPositiveLiteral<1 | string, { $void: 4; selection: 'filter' }>,
		IsPositiveLiteral<1 | string, { selection: 'filter' }>
	>(true)
})

it('does not accept `exact`, which would do nothing here', () => {
	// @ts-expect-error `exact` is not an option of this type.
	type R = IsPositiveLiteral<1, { exact: true }>
	testType.never<never & R>(true)
})

it('pins the TSDoc examples', () => {
	testType.equal<IsPositiveLiteral<1>, true>(true)
	testType.equal<IsPositiveLiteral<0>, true>(true)
	testType.equal<IsPositiveLiteral<-0>, true>(true)
	testType.equal<IsPositiveLiteral<1n>, true>(true)
	testType.equal<IsPositiveLiteral<-1>, false>(true)
	testType.equal<IsPositiveLiteral<-1n>, false>(true)
	testType.equal<IsPositiveLiteral<number>, false>(true)
	testType.equal<IsPositiveLiteral<bigint>, false>(true)
	testType.equal<IsPositiveLiteral<string>, false>(true)
	testType.equal<IsPositiveLiteral<any>, false>(true)
	testType.equal<IsPositiveLiteral<unknown>, false>(true)
	testType.equal<IsPositiveLiteral<never>, false>(true)
	testType.equal<IsPositiveLiteral<void>, false>(true)

	testType.equal<IsPositiveLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsPositiveLiteral<-1 & { a: 1 }>, false>(true)
	testType.equal<IsPositiveLiteral<number & { a: 1 }>, false>(true)

	testType.equal<IsPositiveLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsPositiveLiteral<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsPositiveLiteral<number, { selection: 'filter' }>, never>(true)

	testType.equal<IsPositiveLiteral<1 | string>, boolean>(true)
	testType.equal<IsPositiveLiteral<1 | string, { distributive: false }>, false>(true)

	testType.equal<IsPositiveLiteral<1, IsPositiveLiteral.$Branch>, $Then>(true)
	testType.equal<IsPositiveLiteral<number, IsPositiveLiteral.$Branch>, $Else>(true)

	testType.equal<IsPositiveLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsPositiveLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsPositiveLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsPositiveLiteral<void, { $void: 4 }>, 4>(true)
})

describe('IsPositiveLiteral.$Fn', () => {
	it('is IsPositiveLiteral as a type function', () => {
		testType.equal<$Fn.Apply<IsPositiveLiteral.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsPositiveLiteral.$Fn, number>, false>(true)
	})
})
