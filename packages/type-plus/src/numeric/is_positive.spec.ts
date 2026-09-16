import { describe, it } from 'vitest'

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

it('returns false if T is intersection of non-positive number', () => {
	testType.false<IsPositive<-1 & { a: 1 }>>(true)
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

it('can override special type branches', () => {
	testType.equal<IsPositive<any, { $any: 1 }>, 1>(true)
	testType.equal<IsPositive<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsPositive<never, { $never: 3 }>, 3>(true)
	testType.equal<IsPositive<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsPositive<unknown, { $any: 1 }>, IsPositive<unknown>>(true)
	testType.equal<IsPositive<void, { $never: 3; selection: 'filter' }>, IsPositive<void, { selection: 'filter' }>>(true)
	testType.equal<IsPositive<1 | -1.5 | 2n, { $any: 1 }>, IsPositive<1 | -1.5 | 2n>>(true)
	testType.equal<
		IsPositive<1 | -1.5 | 2n, { $any: 1; selection: 'filter' }>,
		IsPositive<1 | -1.5 | 2n, { selection: 'filter' }>
	>(true)
	testType.equal<
		IsPositive<string | 1, { $void: 4; distributive: false }>,
		IsPositive<string | 1, { distributive: false }>
	>(true)
})

describe('exact', () => {
	it('matches the wide `number` and `bigint`, whose sign and value are unknown', () => {
		testType.equal<IsPositive<number, { exact: true }>, boolean>(true)
		testType.equal<IsPositive<number & { a: 1 }, { exact: true }>, boolean>(true)
		testType.equal<IsPositive<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsPositive<bigint & { a: 1 }, { exact: true }>, boolean>(true)
	})

	it('rejects every numeric literal', () => {
		testType.equal<IsPositive<1, { exact: true }>, false>(true)
		testType.equal<IsPositive<0, { exact: true }>, false>(true)
		testType.equal<IsPositive<-0, { exact: true }>, false>(true)
		testType.equal<IsPositive<-1, { exact: true }>, false>(true)
		testType.equal<IsPositive<1.1, { exact: true }>, false>(true)
		testType.equal<IsPositive<-1.1, { exact: true }>, false>(true)
		testType.equal<IsPositive<1n, { exact: true }>, false>(true)
		testType.equal<IsPositive<-1n, { exact: true }>, false>(true)
		testType.equal<IsPositive<0n, { exact: true }>, false>(true)
		testType.equal<IsPositive<1 & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsPositive<-1 & { a: 1 }, { exact: true }>, false>(true)
	})

	it('answers the non-numeric types the same as without `exact`', () => {
		testType.equal<IsPositive<string, { exact: true }>, false>(true)
		testType.equal<IsPositive<'', { exact: true }>, false>(true)
		testType.equal<IsPositive<boolean, { exact: true }>, false>(true)
		testType.equal<IsPositive<true, { exact: true }>, false>(true)
		testType.equal<IsPositive<undefined, { exact: true }>, false>(true)
		testType.equal<IsPositive<null, { exact: true }>, false>(true)
		testType.equal<IsPositive<symbol, { exact: true }>, false>(true)
		testType.equal<IsPositive<{}, { exact: true }>, false>(true)
		testType.equal<IsPositive<string[], { exact: true }>, false>(true)
		testType.equal<IsPositive<() => void, { exact: true }>, false>(true)
	})

	it('answers the special types the same as without `exact`', () => {
		testType.equal<IsPositive<any, { exact: true }>, false>(true)
		testType.equal<IsPositive<unknown, { exact: true }>, false>(true)
		testType.equal<IsPositive<never, { exact: true }>, false>(true)
		testType.equal<IsPositive<void, { exact: true }>, false>(true)
	})

	it('distributes over a union', () => {
		testType.equal<IsPositive<number | string, { exact: true }>, boolean>(true)
		testType.equal<IsPositive<1 | string, { exact: true }>, false>(true)
		testType.equal<IsPositive<number | bigint, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsPositive<number | string, { exact: true; distributive: false }>, false>(true)
		testType.equal<IsPositive<1 | string, { exact: true; distributive: false }>, false>(true)
		testType.equal<IsPositive<number, { exact: true; distributive: false }>, boolean>(true)
	})

	it('works as filter', () => {
		testType.equal<IsPositive<number, { exact: true; selection: 'filter' }>, number>(true)
		testType.equal<IsPositive<bigint, { exact: true; selection: 'filter' }>, bigint>(true)
		testType.equal<IsPositive<1, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsPositive<string, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsPositive<number | string, { exact: true; selection: 'filter' }>, number>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsPositive<number, IsPositive.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsPositive<bigint, IsPositive.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsPositive<1, IsPositive.$Branch & { exact: true }>, $Else>(true)
	})

	it('can override special type branches', () => {
		testType.equal<IsPositive<any, { exact: true; $any: 1 }>, 1>(true)
		testType.equal<IsPositive<unknown, { exact: true; $unknown: 2 }>, 2>(true)
		testType.equal<IsPositive<never, { exact: true; $never: 3 }>, 3>(true)
		testType.equal<IsPositive<void, { exact: true; $void: 4 }>, 4>(true)
	})

	it('pins the TSDoc example', () => {
		testType.equal<IsPositive<number, { exact: true }>, boolean>(true)
		testType.equal<IsPositive<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsPositive<1, { exact: true }>, false>(true)
		testType.equal<IsPositive<-1, { exact: true }>, false>(true)
		testType.equal<IsPositive<1n, { exact: true }>, false>(true)
	})
})

describe('exact: false', () => {
	it('answers exactly as passing no `exact` at all', () => {
		testType.equal<IsPositive<number, { exact: false }>, IsPositive<number>>(true)
		testType.equal<IsPositive<bigint, { exact: false }>, IsPositive<bigint>>(true)
		testType.equal<IsPositive<1, { exact: false }>, IsPositive<1>>(true)
		testType.equal<IsPositive<-1, { exact: false }>, IsPositive<-1>>(true)
		testType.equal<IsPositive<1n, { exact: false }>, IsPositive<1n>>(true)
		testType.equal<IsPositive<1.1, { exact: false }>, IsPositive<1.1>>(true)
		testType.equal<IsPositive<string, { exact: false }>, IsPositive<string>>(true)
		testType.equal<IsPositive<any, { exact: false }>, IsPositive<any>>(true)
		testType.equal<IsPositive<unknown, { exact: false }>, IsPositive<unknown>>(true)
		testType.equal<IsPositive<never, { exact: false }>, IsPositive<never>>(true)
		testType.equal<IsPositive<void, { exact: false }>, IsPositive<void>>(true)
		testType.equal<IsPositive<1 | string, { exact: false }>, IsPositive<1 | string>>(true)
	})

	it('leaves the other options alone', () => {
		testType.equal<
			IsPositive<1 | string, { exact: false; selection: 'filter' }>,
			IsPositive<1 | string, { selection: 'filter' }>
		>(true)
		testType.equal<
			IsPositive<1 | string, { exact: false; distributive: false }>,
			IsPositive<1 | string, { distributive: false }>
		>(true)
	})
})
