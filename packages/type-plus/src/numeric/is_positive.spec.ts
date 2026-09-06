import { it } from 'vitest'

import { type $Else, type $Then, type IsPositive, testType } from '../index.js'

it('returns boolean if T is number or bigint', () => {
	// `number` and `bigint` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	testType.equal<IsPositive<number>, boolean>(true)
	testType.equal<IsPositive<bigint>, boolean>(true)
})

it('returns true if T is 0 or positive literals', () => {
	testType.true<IsPositive<-0>>(true)
	testType.true<IsPositive<0>>(true)
	testType.true<IsPositive<1>>(true)
	testType.true<IsPositive<2>>(true)
	testType.true<IsPositive<1.0>>(true)
	testType.true<IsPositive<1.1>>(true)

	testType.true<IsPositive<0n>>(true)
	testType.true<IsPositive<1n>>(true)
})

it('returns false if T is negative', () => {
	testType.false<IsPositive<-1>>(true)
	testType.false<IsPositive<-2>>(true)
	testType.false<IsPositive<-1n>>(true)
})

it('returns false if T is a special type', () => {
	testType.equal<IsPositive<any>, false>(true)
	testType.false<IsPositive<unknown>>(true)
	testType.false<IsPositive<never>>(true)
	testType.false<IsPositive<void>>(true)
})

it('returns false for other types', () => {
	testType.false<IsPositive<undefined>>(true)
	testType.false<IsPositive<null>>(true)
	testType.false<IsPositive<boolean>>(true)
	testType.false<IsPositive<true>>(true)
	testType.false<IsPositive<false>>(true)
	testType.false<IsPositive<string>>(true)
	testType.false<IsPositive<''>>(true)
	testType.false<IsPositive<symbol>>(true)
	testType.false<IsPositive<{}>>(true)
	testType.false<IsPositive<string[]>>(true)
	testType.false<IsPositive<[]>>(true)
	testType.false<IsPositive<Function>>(true)
	testType.false<IsPositive<() => void>>(true)
})

it('returns true if T is union of positive numeric values', () => {
	testType.true<IsPositive<1 | 1.1>>(true)
	testType.equal<IsPositive<1 | 1n>, true>(true)
	testType.true<IsPositive<1.1 | 1n>>(true)
})

it('returns boolean if T is union of mixing positive and negative value', () => {
	testType.strictBoolean<IsPositive<1 | -1>>(true)
})

it('returns false if T is union with negative numeric values', () => {
	testType.false<IsPositive<-1 | -2>>(true)
	testType.boolean<IsPositive<-1 | -2n>>(true)
	testType.false<IsPositive<-1n | -2n>>(true)
})

it('returns true if T is intersection of positive number', () => {
	testType.true<IsPositive<1 & { a: 1 }>>(true)
	testType.true<IsPositive<0 & { a: 1 }>>(true)
	testType.true<IsPositive<1n & { a: 1 }>>(true)
})

// https://github.com/microsoft/TypeScript/issues/54648#issuecomment-1990057710
// https://github.com/microsoft/TypeScript/issues/57776
it.skip('returns false if T is intersection of non-positive number', () => {
	// @ts-expect-error
	testType.false<IsPositive<-1 & { a: 1 }>>(true)
	// @ts-expect-error
	testType.false<IsPositive<-1n & { a: 1 }>>(true)
})

it('returns boolean when T is an intersection type with number or bigint', () => {
	testType.equal<IsPositive<number & { a: 1 }>, boolean>(true)
	testType.equal<IsPositive<number & { a: 1 }, { selection: 'filter' }>, number & { a: 1 }>(true)
	testType.equal<IsPositive<bigint & { a: 1 }>, boolean>(true)
	testType.equal<IsPositive<bigint & { a: 1 }, { selection: 'filter' }>, bigint & { a: 1 }>(true)
})

it('distributes over union type', () => {
	testType.equal<IsPositive<1 | string>, boolean>(true)
	testType.equal<IsPositive<-1 | string>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsPositive<number | string, { distributive: false }>, false>(true)
	testType.equal<IsPositive<1 | string, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	// `number` includes positive and negative numbers,
	// unlike `boolean -> true | false`.
	// So in predicate form, it returns `boolean`,
	// and here, `IsPositive<number>` -> `number | never` -> `number`
	testType.equal<IsPositive<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsPositive<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsPositive<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsPositive<1n, { selection: 'filter' }>, 1n>(true)

	testType.equal<IsPositive<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsPositive<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsPositive<unknown, { selection: 'filter' }>, never>(true)

	// `IsPositive<string | number>` -> `never | number` -> `number`
	testType.equal<IsPositive<string | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsPositive<string | 1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsPositive<string | 1n, { selection: 'filter' }>, 1n>(true)

	testType.equal<IsPositive<string | -1, { selection: 'filter' }>, never>(true)
	testType.equal<IsPositive<string | -1n, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsPositive<number, IsPositive.$Branch>, $Then | $Else>(true)
	testType.equal<IsPositive<1, IsPositive.$Branch>, $Then>(true)
	testType.equal<IsPositive<-1, IsPositive.$Branch>, $Else>(true)
	testType.equal<IsPositive<1n, IsPositive.$Branch>, $Then>(true)

	testType.equal<IsPositive<any, IsPositive.$Branch>, $Else>(true)
	testType.equal<IsPositive<unknown, IsPositive.$Branch>, $Else>(true)
	testType.equal<IsPositive<never, IsPositive.$Branch>, $Else>(true)
	testType.equal<IsPositive<void, IsPositive.$Branch>, $Else>(true)
})
