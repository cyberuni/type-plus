import { it } from 'vitest'

import { type $Else, type $Then, type IsNotPositive, testType } from '../index.js'

it('returns boolean if T is number or bigint', () => {
	// `number` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	testType.equal<IsNotPositive<number>, boolean>(true)
	testType.equal<IsNotPositive<bigint>, boolean>(true)
})

it('returns false if T is 0 or positive literals', () => {
	testType.equal<IsNotPositive<-0>, false>(true)
	testType.equal<IsNotPositive<0>, false>(true)
	testType.equal<IsNotPositive<1>, false>(true)
	testType.equal<IsNotPositive<2>, false>(true)
	testType.equal<IsNotPositive<1.0>, false>(true)
	testType.equal<IsNotPositive<1.1>, false>(true)

	testType.equal<IsNotPositive<0n>, false>(true)
	testType.equal<IsNotPositive<1n>, false>(true)
})

it('returns true if T is negative', () => {
	testType.equal<IsNotPositive<-1>, true>(true)
	testType.equal<IsNotPositive<-2>, true>(true)
	testType.equal<IsNotPositive<-1n>, true>(true)
})

it('returns true if T is a special type', () => {
	testType.equal<IsNotPositive<any>, true>(true)
	testType.equal<IsNotPositive<unknown>, true>(true)
	testType.equal<IsNotPositive<never>, true>(true)
	testType.equal<IsNotPositive<void>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotPositive<undefined>, true>(true)
	testType.equal<IsNotPositive<null>, true>(true)
	testType.equal<IsNotPositive<boolean>, true>(true)
	testType.equal<IsNotPositive<true>, true>(true)
	testType.equal<IsNotPositive<false>, true>(true)
	testType.equal<IsNotPositive<string>, true>(true)
	testType.equal<IsNotPositive<''>, true>(true)
	testType.equal<IsNotPositive<symbol>, true>(true)
	testType.equal<IsNotPositive<{}>, true>(true)
	testType.equal<IsNotPositive<string[]>, true>(true)
	testType.equal<IsNotPositive<[]>, true>(true)
	testType.equal<IsNotPositive<Function>, true>(true)
	testType.equal<IsNotPositive<() => void>, true>(true)
})

it('returns false if T is union of positive numeric values', () => {
	testType.equal<IsNotPositive<1 | 1.1>, false>(true)
	testType.equal<IsNotPositive<1 | 1n>, false>(true)
	testType.equal<IsNotPositive<1.1 | 1n>, false>(true)
})

it('returns true if T is union with negative numeric values', () => {
	testType.equal<IsNotPositive<-1 | -2>, true>(true)
	testType.boolean<IsNotPositive<-1 | -2n>>(true)
	testType.equal<IsNotPositive<-1n | -2n>, true>(true)
})

it('returns boolean if T is union of mixing positive and negative value', () => {
	testType.strictBoolean<IsNotPositive<1 | -1>>(true)
})

it('returns false if T is intersection of 0 or positive number', () => {
	testType.false<IsNotPositive<1 & { a: 1 }>>(true)
	testType.false<IsNotPositive<1n & { a: 1 }>>(true)
	testType.false<IsNotPositive<0 & { a: 1 }>>(true)
	testType.false<IsNotPositive<0n & { a: 1 }>>(true)
})

// FIXME: https://github.com/microsoft/TypeScript/issues/57918
it.skip('returns true if T is intersection of non-positive number', () => {
	// testType.true<IsNotPositive<-1 & { a: 1 }>>(true)
	// testType.true<IsNotPositive<-1n & { a: 1 }>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotPositive<1 | string>, boolean>(true)
	testType.equal<IsNotPositive<-1 | string>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotPositive<number | string, { distributive: false }>, true>(true)
	testType.equal<IsNotPositive<-1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotPositive<1 | string, { distributive: false }>, true>(true)
})

it('works as filter', () => {
	// `number` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	// and here, `IsNotPositive<number>` -> `number | never` -> `number`
	testType.equal<IsNotPositive<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotPositive<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNotPositive<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNotPositive<-1n, { selection: 'filter' }>, -1n>(true)

	testType.equal<IsNotPositive<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotPositive<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotPositive<unknown, { selection: 'filter' }>, unknown>(true)

	// `IsNotPositive<string | number>` -> `string | number`
	testType.equal<IsNotPositive<string | number, { selection: 'filter' }>, string | number>(true)
	testType.equal<IsNotPositive<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotPositive<string | 1, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotPositive<string | 1n, { selection: 'filter' }>, string>(true)

	testType.equal<IsNotPositive<string | -1, { selection: 'filter' }>, string | -1>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotPositive<number, IsNotPositive.$Branch>, $Then | $Else>(true)
	testType.equal<IsNotPositive<-1, IsNotPositive.$Branch>, $Then>(true)
	testType.equal<IsNotPositive<-1n, IsNotPositive.$Branch>, $Then>(true)

	testType.equal<IsNotPositive<1, IsNotPositive.$Branch>, $Else>(true)
	testType.equal<IsNotPositive<any, IsNotPositive.$Branch>, $Then>(true)
	testType.equal<IsNotPositive<unknown, IsNotPositive.$Branch>, $Then>(true)
	testType.equal<IsNotPositive<never, IsNotPositive.$Branch>, $Then>(true)
	testType.equal<IsNotPositive<void, IsNotPositive.$Branch>, $Then>(true)
})
