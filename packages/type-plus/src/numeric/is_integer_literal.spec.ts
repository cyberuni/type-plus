import { it } from 'vitest'

import { type $Else, type $Then, type IsIntegerLiteral, testType } from '../index.js'

it('matches the numeric literals it accepts and rejects the rest', () => {
	testType.equal<IsIntegerLiteral<1>, true>(true)
	testType.equal<IsIntegerLiteral<0>, true>(true)
	testType.equal<IsIntegerLiteral<-0>, true>(true)
	testType.equal<IsIntegerLiteral<2>, true>(true)
	testType.equal<IsIntegerLiteral<-1>, true>(true)
	testType.equal<IsIntegerLiteral<-2>, true>(true)
	testType.equal<IsIntegerLiteral<1.1>, false>(true)
	testType.equal<IsIntegerLiteral<-1.1>, false>(true)
	testType.equal<IsIntegerLiteral<1n>, true>(true)
	testType.equal<IsIntegerLiteral<0n>, true>(true)
	testType.equal<IsIntegerLiteral<-1n>, true>(true)
	testType.equal<IsIntegerLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsIntegerLiteral<-1 & { a: 1 }>, true>(true)
	testType.equal<IsIntegerLiteral<1.1 & { a: 1 }>, false>(true)
	testType.equal<IsIntegerLiteral<1n & { a: 1 }>, true>(true)
	testType.equal<IsIntegerLiteral<-1n & { a: 1 }>, true>(true)
})

it('rejects the wide `number` and `bigint`, which are not literals', () => {
	testType.equal<IsIntegerLiteral<number>, false>(true)
	testType.equal<IsIntegerLiteral<bigint>, false>(true)
	testType.equal<IsIntegerLiteral<number & { a: 1 }>, false>(true)
	testType.equal<IsIntegerLiteral<bigint & { a: 1 }>, false>(true)
})

it('answers the non-numeric types with the `$else` branch of the literal test', () => {
	testType.equal<IsIntegerLiteral<string>, false>(true)
	testType.equal<IsIntegerLiteral<''>, false>(true)
	testType.equal<IsIntegerLiteral<boolean>, false>(true)
	testType.equal<IsIntegerLiteral<true>, false>(true)
	testType.equal<IsIntegerLiteral<false>, false>(true)
	testType.equal<IsIntegerLiteral<undefined>, false>(true)
	testType.equal<IsIntegerLiteral<null>, false>(true)
	testType.equal<IsIntegerLiteral<symbol>, false>(true)
	testType.equal<IsIntegerLiteral<{}>, false>(true)
	testType.equal<IsIntegerLiteral<string[]>, false>(true)
	testType.equal<IsIntegerLiteral<[]>, false>(true)
	testType.equal<IsIntegerLiteral<() => void>, false>(true)
})

it('treats the special types as non-numeric', () => {
	testType.equal<IsIntegerLiteral<any>, false>(true)
	testType.equal<IsIntegerLiteral<unknown>, false>(true)
	testType.equal<IsIntegerLiteral<never>, false>(true)
	testType.equal<IsIntegerLiteral<void>, false>(true)
})

it('distributes over a union', () => {
	testType.equal<IsIntegerLiteral<1 | string>, boolean>(true)
	testType.equal<IsIntegerLiteral<number | string>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsIntegerLiteral<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsIntegerLiteral<number | string, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsIntegerLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsIntegerLiteral<1.1, { selection: 'filter' }>, never>(true)
	testType.equal<IsIntegerLiteral<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsIntegerLiteral<never, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsIntegerLiteral<1, IsIntegerLiteral.$Branch>, $Then>(true)
	testType.equal<IsIntegerLiteral<1.1, IsIntegerLiteral.$Branch>, $Else>(true)
	testType.equal<IsIntegerLiteral<any, IsIntegerLiteral.$Branch>, $Else>(true)
	testType.equal<IsIntegerLiteral<unknown, IsIntegerLiteral.$Branch>, $Else>(true)
	testType.equal<IsIntegerLiteral<never, IsIntegerLiteral.$Branch>, $Else>(true)
	testType.equal<IsIntegerLiteral<void, IsIntegerLiteral.$Branch>, $Else>(true)
})

it('can override special type branches', () => {
	testType.equal<IsIntegerLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsIntegerLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsIntegerLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsIntegerLiteral<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsIntegerLiteral<unknown, { $any: 1 }>, IsIntegerLiteral<unknown>>(true)
	testType.equal<IsIntegerLiteral<1 | string, { $any: 1 }>, IsIntegerLiteral<1 | string>>(true)
	testType.equal<
		IsIntegerLiteral<1 | string, { $void: 4; selection: 'filter' }>,
		IsIntegerLiteral<1 | string, { selection: 'filter' }>
	>(true)
})

it('does not accept `exact`, which would do nothing here', () => {
	// @ts-expect-error `exact` is not an option of this type.
	type R = IsIntegerLiteral<1, { exact: true }>
	testType.never<never & R>(true)
})

it('pins the TSDoc examples', () => {
	testType.equal<IsIntegerLiteral<0>, true>(true)
	testType.equal<IsIntegerLiteral<-1>, true>(true)
	testType.equal<IsIntegerLiteral<1n>, true>(true)
	testType.equal<IsIntegerLiteral<1.1>, false>(true)
	testType.equal<IsIntegerLiteral<bigint>, false>(true)
	testType.equal<IsIntegerLiteral<number>, false>(true)
	testType.equal<IsIntegerLiteral<string>, false>(true)
	testType.equal<IsIntegerLiteral<any>, false>(true)
	testType.equal<IsIntegerLiteral<unknown>, false>(true)
	testType.equal<IsIntegerLiteral<never>, false>(true)
	testType.equal<IsIntegerLiteral<void>, false>(true)

	testType.equal<IsIntegerLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsIntegerLiteral<1.1 & { a: 1 }>, false>(true)
	testType.equal<IsIntegerLiteral<number & { a: 1 }>, false>(true)

	testType.equal<IsIntegerLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsIntegerLiteral<1.1, { selection: 'filter' }>, never>(true)
	testType.equal<IsIntegerLiteral<number, { selection: 'filter' }>, never>(true)

	testType.equal<IsIntegerLiteral<1 | string>, boolean>(true)
	testType.equal<IsIntegerLiteral<1 | string, { distributive: false }>, false>(true)

	testType.equal<IsIntegerLiteral<1, IsIntegerLiteral.$Branch>, $Then>(true)
	testType.equal<IsIntegerLiteral<1.1, IsIntegerLiteral.$Branch>, $Else>(true)

	testType.equal<IsIntegerLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsIntegerLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsIntegerLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsIntegerLiteral<void, { $void: 4 }>, 4>(true)
})
