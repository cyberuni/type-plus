import { it } from 'vitest'

import { type $Else, type $Then, type IsInteger, testType } from '../index.js'

it('returns boolean if N is number as it can contain float', () => {
	testType.equal<IsInteger<number>, boolean>(true)
})

it('returns true if N is an integer literal', () => {
	testType.equal<IsInteger<-1>, true>(true)
	testType.equal<IsInteger<-2>, true>(true)
	testType.equal<IsInteger<-0>, true>(true)
	testType.equal<IsInteger<0>, true>(true)
	testType.equal<IsInteger<1>, true>(true)
	testType.equal<IsInteger<2>, true>(true)
})

it('returns true if N is bigint as bigint can only be integer', () => {
	testType.equal<IsInteger<bigint>, true>(true)
	testType.equal<IsInteger<-1n>, true>(true)
	testType.equal<IsInteger<-2n>, true>(true)
	testType.equal<IsInteger<-0n>, true>(true)
	testType.equal<IsInteger<1n>, true>(true)
	testType.equal<IsInteger<2n>, true>(true)
})

it('returns false if N is a fraction', () => {
	testType.equal<IsInteger<0.1>, false>(true)
	testType.equal<IsInteger<-0.1>, false>(true)
	testType.equal<IsInteger<1.1>, false>(true)
})

it('returns false if N is special types', () => {
	testType.equal<IsInteger<any>, false>(true)
	testType.equal<IsInteger<unknown>, false>(true)
	testType.equal<IsInteger<never>, false>(true)
	testType.equal<IsInteger<void>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsInteger<undefined>, false>(true)
	testType.equal<IsInteger<null>, false>(true)
	testType.equal<IsInteger<boolean>, false>(true)
	testType.equal<IsInteger<true>, false>(true)
	testType.equal<IsInteger<false>, false>(true)
	testType.equal<IsInteger<string>, false>(true)
	testType.equal<IsInteger<''>, false>(true)
	testType.equal<IsInteger<symbol>, false>(true)
	testType.equal<IsInteger<{}>, false>(true)
	testType.equal<IsInteger<string[]>, false>(true)
	testType.equal<IsInteger<[]>, false>(true)
	testType.equal<IsInteger<Function>, false>(true)
	testType.equal<IsInteger<() => void>, false>(true)
})

it('distributes over union type', () => {
	testType.equal<IsInteger<1 | string>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsInteger<number | string, { distributive: false }>, false>(true)
	testType.equal<IsInteger<1 | string, { distributive: false }>, false>(true)
})

it('returns true for intersection type with integer literals', () => {
	testType.equal<IsInteger<1 & { a: 1 }>, true>(true)
	testType.equal<IsInteger<-1 & { a: 1 }>, true>(true)
	testType.equal<IsInteger<1n & { a: 1 }>, true>(true)
})

it('returns boolean when T is an intersection type with number', () => {
	testType.equal<IsInteger<number & { a: 1 }>, boolean>(true)
})

it('works as filter', () => {
	// `number` includes float, but it cannot decompose into float and non-float,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	// and here, `IsInteger<number>` -> `number | never` -> `number`
	testType.equal<IsInteger<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsInteger<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsInteger<1n, { selection: 'filter' }>, 1n>(true)
	testType.equal<IsInteger<1.1, { selection: 'filter' }>, never>(true)

	testType.equal<IsInteger<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsInteger<unknown, { selection: 'filter' }>, never>(true)

	// `IsInteger<string | number>` -> `never | number` -> `number`
	testType.equal<IsInteger<string | number, { selection: 'filter' }>, number>(true)

	testType.equal<IsInteger<string | 1, { selection: 'filter' }>, 1>(true)
})

it('works with unique branches', () => {
	testType.equal<IsInteger<number, IsInteger.$Branch>, $Then | $Else>(true)
	testType.equal<IsInteger<1, IsInteger.$Branch>, $Then>(true)
	testType.equal<IsInteger<1n, IsInteger.$Branch>, $Then>(true)

	testType.equal<IsInteger<any, IsInteger.$Branch>, $Else>(true)
	testType.equal<IsInteger<1.1, IsInteger.$Branch>, $Else>(true)
	testType.equal<IsInteger<unknown, IsInteger.$Branch>, $Else>(true)
	testType.equal<IsInteger<never, IsInteger.$Branch>, $Else>(true)
	testType.equal<IsInteger<void, IsInteger.$Branch>, $Else>(true)
})
