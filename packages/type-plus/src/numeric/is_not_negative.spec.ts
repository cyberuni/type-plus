import { it } from 'vitest'

import { type $Else, type $Then, type IsNotNegative, testType } from '../index.js'

it('returns boolean if T is number or bigint', () => {
	// `number` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	testType.equal<IsNotNegative<number>, boolean>(true)
	testType.equal<IsNotNegative<bigint>, boolean>(true)
})

it('returns true if T is 0 or positive literals', () => {
	testType.equal<IsNotNegative<-0>, true>(true)
	testType.equal<IsNotNegative<0>, true>(true)
	testType.equal<IsNotNegative<1>, true>(true)
	testType.equal<IsNotNegative<2>, true>(true)
	testType.equal<IsNotNegative<1.0>, true>(true)
	testType.equal<IsNotNegative<1.1>, true>(true)

	testType.equal<IsNotNegative<0n>, true>(true)
	testType.equal<IsNotNegative<1n>, true>(true)
})

it('returns false if T is negative', () => {
	testType.equal<IsNotNegative<-1>, false>(true)
	testType.equal<IsNotNegative<-2>, false>(true)
	testType.equal<IsNotNegative<-1n>, false>(true)
})

it('returns true if T is a special type', () => {
	testType.equal<IsNotNegative<any>, true>(true)
	testType.equal<IsNotNegative<unknown>, true>(true)
	testType.equal<IsNotNegative<never>, true>(true)
	testType.equal<IsNotNegative<void>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotNegative<undefined>, true>(true)
	testType.equal<IsNotNegative<null>, true>(true)
	testType.equal<IsNotNegative<boolean>, true>(true)
	testType.equal<IsNotNegative<true>, true>(true)
	testType.equal<IsNotNegative<true>, true>(true)
	testType.equal<IsNotNegative<string>, true>(true)
	testType.equal<IsNotNegative<''>, true>(true)
	testType.equal<IsNotNegative<symbol>, true>(true)
	testType.equal<IsNotNegative<{}>, true>(true)
	testType.equal<IsNotNegative<string[]>, true>(true)
	testType.equal<IsNotNegative<[]>, true>(true)
	testType.equal<IsNotNegative<Function>, true>(true)
	testType.equal<IsNotNegative<() => void>, true>(true)
})

it('returns true if T is union of positive numeric values', () => {
	testType.equal<IsNotNegative<1 | 1.1>, true>(true)
	testType.equal<IsNotNegative<1 | 1n>, true>(true)
	testType.equal<IsNotNegative<1.1 | 1n>, true>(true)
})

it('returns false if T is union with negative numeric values', () => {
	testType.equal<IsNotNegative<-1 | -2>, false>(true)
	testType.boolean<IsNotNegative<-1 | -2n>>(true)
	testType.equal<IsNotNegative<-1n | -2n>, false>(true)
})

it('returns boolean if T is union of mixing positive and negative value', () => {
	testType.strictBoolean<IsNotNegative<1 | -1>>(true)
})

it('returns true if T is intersection of positive number', () => {
	testType.equal<IsNotNegative<1 & { a: 1 }>, true>(true)
	testType.equal<IsNotNegative<1n & { a: 1 }>, true>(true)
})

// FIXME: https://github.com/microsoft/TypeScript/issues/57918
it.skip('returns false if T is intersection of negative number', () => {
	// testType.equal<IsNotNegative<-1 & { a: 1 }>, false>(true)
	// testType.equal<IsNotNegative<-1n & { a: 1 }>, false>(true)
})

it('returns true if T is intersection of non-negative number', () => {
	testType.true<IsNotNegative<0 & { a: 1 }>>(true)
	testType.true<IsNotNegative<1 & { a: 1 }>>(true)
	testType.true<IsNotNegative<1n & { a: 1 }>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotNegative<1 | string>, true>(true)
	testType.equal<IsNotNegative<-1 | string>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotNegative<number | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNegative<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNegative<-1 | string, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	// `number` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	// and here, `IsNotNegative<number>` -> `number | never` -> `number`
	testType.equal<IsNotNegative<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotNegative<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNotNegative<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNegative<-1n, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotNegative<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotNegative<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNegative<unknown, { selection: 'filter' }>, unknown>(true)

	// `IsNotNegative<string | number>` -> `string | number`
	testType.equal<IsNotNegative<string | number, { selection: 'filter' }>, string | number>(true)
	testType.equal<IsNotNegative<string, { selection: 'filter' }>, string>(true)

	testType.equal<IsNotNegative<string | 1, { selection: 'filter' }>, string | 1>(true)
	testType.equal<IsNotNegative<string | -1, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNegative<string | -1n, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotNegative<number, IsNotNegative.$Branch>, $Then | $Else>(true)
	testType.equal<IsNotNegative<-1, IsNotNegative.$Branch>, $Else>(true)
	testType.equal<IsNotNegative<-1n, IsNotNegative.$Branch>, $Else>(true)

	testType.equal<IsNotNegative<1, IsNotNegative.$Branch>, $Then>(true)
	testType.equal<IsNotNegative<any, IsNotNegative.$Branch>, $Then>(true)
	testType.equal<IsNotNegative<unknown, IsNotNegative.$Branch>, $Then>(true)
	testType.equal<IsNotNegative<never, IsNotNegative.$Branch>, $Then>(true)
	testType.equal<IsNotNegative<void, IsNotNegative.$Branch>, $Then>(true)
})
