import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotPositive, testType } from '../index.js'

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

it('returns true if T is intersection of non-positive number', () => {
	testType.true<IsNotPositive<-1 & { a: 1 }>>(true)
	testType.true<IsNotPositive<-1n & { a: 1 }>>(true)
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

it('can override special type branches', () => {
	testType.equal<IsNotPositive<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotPositive<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotPositive<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotPositive<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNotPositive<unknown, { $any: 1 }>, IsNotPositive<unknown>>(true)
	testType.equal<IsNotPositive<void, { $never: 3; selection: 'filter' }>, IsNotPositive<void, { selection: 'filter' }>>(
		true,
	)
	testType.equal<IsNotPositive<1 | -1.5 | 2n, { $any: 1 }>, IsNotPositive<1 | -1.5 | 2n>>(true)
	testType.equal<
		IsNotPositive<1 | -1.5 | 2n, { $any: 1; selection: 'filter' }>,
		IsNotPositive<1 | -1.5 | 2n, { selection: 'filter' }>
	>(true)
	testType.equal<
		IsNotPositive<string | 1, { $void: 4; distributive: false }>,
		IsNotPositive<string | 1, { distributive: false }>
	>(true)
})

describe('exact', () => {
	it('matches the wide `number` and `bigint`, whose sign and value are unknown', () => {
		testType.equal<IsNotPositive<number, { exact: true }>, boolean>(true)
		testType.equal<IsNotPositive<number & { a: 1 }, { exact: true }>, boolean>(true)
		testType.equal<IsNotPositive<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsNotPositive<bigint & { a: 1 }, { exact: true }>, boolean>(true)
	})

	it('rejects every numeric literal', () => {
		testType.equal<IsNotPositive<1, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<0, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<-0, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<-1, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<1.1, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<-1.1, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<1n, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<-1n, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<0n, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<1 & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<-1 & { a: 1 }, { exact: true }>, true>(true)
	})

	it('answers the non-numeric types the same as without `exact`', () => {
		testType.equal<IsNotPositive<string, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<'', { exact: true }>, true>(true)
		testType.equal<IsNotPositive<boolean, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<true, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<undefined, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<null, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<symbol, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<{}, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<string[], { exact: true }>, true>(true)
		testType.equal<IsNotPositive<() => void, { exact: true }>, true>(true)
	})

	it('answers the special types the same as without `exact`', () => {
		testType.equal<IsNotPositive<any, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<never, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<void, { exact: true }>, true>(true)
	})

	it('distributes over a union', () => {
		testType.equal<IsNotPositive<number | string, { exact: true }>, boolean>(true)
		testType.equal<IsNotPositive<1 | string, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<number | bigint, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotPositive<number | string, { exact: true; distributive: false }>, true>(true)
		testType.equal<IsNotPositive<1 | string, { exact: true; distributive: false }>, true>(true)
		testType.equal<IsNotPositive<number, { exact: true; distributive: false }>, boolean>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotPositive<number, { exact: true; selection: 'filter' }>, number>(true)
		testType.equal<IsNotPositive<bigint, { exact: true; selection: 'filter' }>, bigint>(true)
		testType.equal<IsNotPositive<1, { exact: true; selection: 'filter' }>, 1>(true)
		testType.equal<IsNotPositive<string, { exact: true; selection: 'filter' }>, string>(true)
		testType.equal<IsNotPositive<number | string, { exact: true; selection: 'filter' }>, number | string>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotPositive<number, IsNotPositive.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsNotPositive<bigint, IsNotPositive.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsNotPositive<1, IsNotPositive.$Branch & { exact: true }>, $Then>(true)
	})

	it('can override special type branches', () => {
		testType.equal<IsNotPositive<any, { exact: true; $any: 1 }>, 1>(true)
		testType.equal<IsNotPositive<unknown, { exact: true; $unknown: 2 }>, 2>(true)
		testType.equal<IsNotPositive<never, { exact: true; $never: 3 }>, 3>(true)
		testType.equal<IsNotPositive<void, { exact: true; $void: 4 }>, 4>(true)
	})

	it('pins the TSDoc example', () => {
		testType.equal<IsNotPositive<number, { exact: true }>, boolean>(true)
		testType.equal<IsNotPositive<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsNotPositive<1, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<-1, { exact: true }>, true>(true)
		testType.equal<IsNotPositive<string, { exact: true }>, true>(true)
	})
})

describe('exact: false', () => {
	it('answers exactly as passing no `exact` at all', () => {
		testType.equal<IsNotPositive<number, { exact: false }>, IsNotPositive<number>>(true)
		testType.equal<IsNotPositive<bigint, { exact: false }>, IsNotPositive<bigint>>(true)
		testType.equal<IsNotPositive<1, { exact: false }>, IsNotPositive<1>>(true)
		testType.equal<IsNotPositive<-1, { exact: false }>, IsNotPositive<-1>>(true)
		testType.equal<IsNotPositive<1n, { exact: false }>, IsNotPositive<1n>>(true)
		testType.equal<IsNotPositive<1.1, { exact: false }>, IsNotPositive<1.1>>(true)
		testType.equal<IsNotPositive<string, { exact: false }>, IsNotPositive<string>>(true)
		testType.equal<IsNotPositive<any, { exact: false }>, IsNotPositive<any>>(true)
		testType.equal<IsNotPositive<unknown, { exact: false }>, IsNotPositive<unknown>>(true)
		testType.equal<IsNotPositive<never, { exact: false }>, IsNotPositive<never>>(true)
		testType.equal<IsNotPositive<void, { exact: false }>, IsNotPositive<void>>(true)
		testType.equal<IsNotPositive<1 | string, { exact: false }>, IsNotPositive<1 | string>>(true)
	})

	it('leaves the other options alone', () => {
		testType.equal<
			IsNotPositive<1 | string, { exact: false; selection: 'filter' }>,
			IsNotPositive<1 | string, { selection: 'filter' }>
		>(true)
		testType.equal<
			IsNotPositive<1 | string, { exact: false; distributive: false }>,
			IsNotPositive<1 | string, { distributive: false }>
		>(true)
	})
})

describe('IsNotPositive.$Fn', () => {
	it('is IsNotPositive as a type function', () => {
		testType.equal<$Fn.Apply<IsNotPositive.$Fn, -1>, true>(true)
		testType.equal<$Fn.Apply<IsNotPositive.$Fn, 1>, false>(true)
	})
})
