import { it } from 'vitest'

import { type $Else, type $Then, type IsNotInteger, testType } from '../index.js'

it('returns boolean if N is number as it can contain float', () => {
	testType.equal<IsNotInteger<number>, boolean>(true)
})

it('returns false if N is an integer literal', () => {
	testType.equal<IsNotInteger<-1>, false>(true)
	testType.equal<IsNotInteger<-2>, false>(true)
	testType.equal<IsNotInteger<-0>, false>(true)
	testType.equal<IsNotInteger<0>, false>(true)
	testType.equal<IsNotInteger<1>, false>(true)
	testType.equal<IsNotInteger<2>, false>(true)
})

it('returns true if N is bigint as bigint can only be integer', () => {
	testType.equal<IsNotInteger<bigint>, false>(true)
	testType.equal<IsNotInteger<-1n>, false>(true)
	testType.equal<IsNotInteger<-2n>, false>(true)
	testType.equal<IsNotInteger<-0n>, false>(true)
	testType.equal<IsNotInteger<1n>, false>(true)
	testType.equal<IsNotInteger<2n>, false>(true)
})

it('returns false if N is a fraction', () => {
	testType.equal<IsNotInteger<0.1>, true>(true)
	testType.equal<IsNotInteger<-0.1>, true>(true)
	testType.equal<IsNotInteger<1.1>, true>(true)
})

it('returns false if N is special types', () => {
	testType.equal<IsNotInteger<any>, true>(true)
	testType.equal<IsNotInteger<unknown>, true>(true)
	testType.equal<IsNotInteger<never>, true>(true)
	testType.equal<IsNotInteger<void>, true>(true)
})

it('returns false for other types', () => {
	testType.equal<IsNotInteger<undefined>, true>(true)
	testType.equal<IsNotInteger<null>, true>(true)
	testType.equal<IsNotInteger<boolean>, true>(true)
	testType.equal<IsNotInteger<true>, true>(true)
	testType.equal<IsNotInteger<false>, true>(true)
	testType.equal<IsNotInteger<string>, true>(true)
	testType.equal<IsNotInteger<''>, true>(true)
	testType.equal<IsNotInteger<symbol>, true>(true)
	testType.equal<IsNotInteger<{}>, true>(true)
	testType.equal<IsNotInteger<string[]>, true>(true)
	testType.equal<IsNotInteger<[]>, true>(true)
	testType.equal<IsNotInteger<Function>, true>(true)
	testType.equal<IsNotInteger<() => void>, true>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotInteger<1 | string>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotInteger<number | string, { distributive: false }>, true>(true)
	testType.equal<IsNotInteger<1 | string, { distributive: false }>, true>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsNotInteger<number & { a: 1 }>, false>(true)
})

it('works as filter', () => {
	// `IsNotInteger<number>` -> `number` (for float) | `never` (for integer) -> `number`
	testType.equal<IsNotInteger<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotInteger<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotInteger<1n, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotInteger<1.1, { selection: 'filter' }>, 1.1>(true)
	testType.equal<IsNotInteger<string, { selection: 'filter' }>, string>(true)

	testType.equal<IsNotInteger<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotInteger<unknown, { selection: 'filter' }>, unknown>(true)

	// `IsNotInteger<string | number>` -> `string | number | never` -> `string | number`
	testType.equal<IsNotInteger<string | number, { selection: 'filter' }>, string | number>(true)

	// `IsNotInteger<string | 1>` -> `string | never` -> `string`
	testType.equal<IsNotInteger<string | 1, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotInteger<number, IsNotInteger.$Branch>, $Then | $Else>(true)
	testType.equal<IsNotInteger<1, IsNotInteger.$Branch>, $Else>(true)
	testType.equal<IsNotInteger<1n, IsNotInteger.$Branch>, $Else>(true)
	testType.equal<IsNotInteger<1.1, IsNotInteger.$Branch>, $Then>(true)

	testType.equal<IsNotInteger<any, IsNotInteger.$Branch>, $Then>(true)
	testType.equal<IsNotInteger<unknown, IsNotInteger.$Branch>, $Then>(true)
	testType.equal<IsNotInteger<never, IsNotInteger.$Branch>, $Then>(true)
	testType.equal<IsNotInteger<void, IsNotInteger.$Branch>, $Then>(true)
})
