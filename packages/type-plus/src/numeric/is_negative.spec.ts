import { it } from 'vitest'

import { type $Else, type $Then, type IsNegative, testType } from '../index.js'

it('returns boolean if T is number or bigint', () => {
	// `number` and `bigint` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	testType.equal<IsNegative<number>, boolean>(true)
	testType.equal<IsNegative<bigint>, boolean>(true)
})

it('returns false if T is 0 or positive literals', () => {
	testType.equal<IsNegative<-0>, false>(true)
	testType.equal<IsNegative<0>, false>(true)
	testType.equal<IsNegative<1>, false>(true)
	testType.equal<IsNegative<2>, false>(true)
	testType.equal<IsNegative<1.0>, false>(true)
	testType.equal<IsNegative<1.1>, false>(true)

	testType.equal<IsNegative<0n>, false>(true)
	testType.equal<IsNegative<1n>, false>(true)
})

it('returns true if T is negative', () => {
	testType.equal<IsNegative<-1>, true>(true)
	testType.equal<IsNegative<-2>, true>(true)
	testType.equal<IsNegative<-1.1>, true>(true)
	testType.equal<IsNegative<-1n>, true>(true)
})

it('returns false if T is a special type', () => {
	testType.equal<IsNegative<any>, false>(true)
	testType.equal<IsNegative<unknown>, false>(true)
	testType.equal<IsNegative<never>, false>(true)
	testType.equal<IsNegative<void>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsNegative<undefined>, false>(true)
	testType.equal<IsNegative<null>, false>(true)
	testType.equal<IsNegative<boolean>, false>(true)
	testType.equal<IsNegative<true>, false>(true)
	testType.equal<IsNegative<false>, false>(true)
	testType.equal<IsNegative<string>, false>(true)
	testType.equal<IsNegative<''>, false>(true)
	testType.equal<IsNegative<symbol>, false>(true)
	testType.equal<IsNegative<{}>, false>(true)
	testType.equal<IsNegative<string[]>, false>(true)
	testType.equal<IsNegative<[]>, false>(true)
	testType.equal<IsNegative<Function>, false>(true)
	testType.equal<IsNegative<() => void>, false>(true)
})

it('returns false if T is union of positive numeric values', () => {
	testType.equal<IsNegative<1 | 1.1>, false>(true)
	testType.equal<IsNegative<1 | 1n>, false>(true)
	testType.equal<IsNegative<1.1 | 1n>, false>(true)
})

it('returns true if T is union with negative numeric values', () => {
	testType.equal<IsNegative<-1 | -2>, true>(true)
	testType.boolean<IsNegative<-1 | -2n>>(true)
	testType.equal<IsNegative<-1n | -2n>, true>(true)
})

it('returns boolean if T is union of mixing positive and negative value', () => {
	testType.strictBoolean<IsNegative<1 | -1>>(true)
})

// FIXME: https://github.com/microsoft/TypeScript/issues/57918
it.skip('returns true if T is an intersection of negative numbers', () => {
	// testType.true<IsNegative<-1 & { a: 1 }>>(true)
	// testType.true<IsNegative<-1n & { a: 1 }>>(true)
})

it('returns false if T is intersection of non-negative numbers', () => {
	testType.false<IsNegative<0 & { a: 1 }>>(true)
	testType.false<IsNegative<1 & { a: 1 }>>(true)
	testType.false<IsNegative<1n & { a: 1 }>>(true)
})

it('returns boolean when T is an intersection type with number or bigint', () => {
	testType.equal<IsNegative<number & { a: 1 }>, boolean>(true)
	testType.equal<IsNegative<bigint & { a: 1 }>, boolean>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNegative<1 | string>, false>(true)
	testType.equal<IsNegative<-1 | string>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNegative<number | string, { distributive: false }>, false>(true)
	testType.equal<IsNegative<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsNegative<-1 | string, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	// `number` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	// and here, `IsNegative<number>` -> `number | never` -> `number`
	testType.equal<IsNegative<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNegative<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNegative<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNegative<-1n, { selection: 'filter' }>, -1n>(true)

	testType.equal<IsNegative<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegative<1n, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegative<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegative<unknown, { selection: 'filter' }>, never>(true)

	// `IsNegative<string | number>` -> `never | number` -> `number`
	testType.equal<IsNegative<string | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNegative<string | 1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegative<string | 1n, { selection: 'filter' }>, never>(true)

	testType.equal<IsNegative<string | -1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNegative<string | -1n, { selection: 'filter' }>, -1n>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNegative<number, IsNegative.$Branch>, $Then | $Else>(true)
	testType.equal<IsNegative<-1, IsNegative.$Branch>, $Then>(true)
	testType.equal<IsNegative<-1n, IsNegative.$Branch>, $Then>(true)

	testType.equal<IsNegative<1, IsNegative.$Branch>, $Else>(true)
	testType.equal<IsNegative<any, IsNegative.$Branch>, $Else>(true)
	testType.equal<IsNegative<unknown, IsNegative.$Branch>, $Else>(true)
	testType.equal<IsNegative<never, IsNegative.$Branch>, $Else>(true)
	testType.equal<IsNegative<void, IsNegative.$Branch>, $Else>(true)
})
