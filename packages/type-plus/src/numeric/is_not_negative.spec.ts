import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotNegative, testType } from '../index.js'

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

it('returns false if T is intersection of negative number', () => {
	testType.equal<IsNotNegative<-1 & { a: 1 }>, false>(true)
	testType.equal<IsNotNegative<-1n & { a: 1 }>, false>(true)
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

it('can override special type branches', () => {
	testType.equal<IsNotNegative<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotNegative<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotNegative<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotNegative<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNotNegative<unknown, { $any: 1 }>, IsNotNegative<unknown>>(true)
	testType.equal<IsNotNegative<void, { $never: 3; selection: 'filter' }>, IsNotNegative<void, { selection: 'filter' }>>(
		true,
	)
	testType.equal<IsNotNegative<1 | -1.5 | 2n, { $any: 1 }>, IsNotNegative<1 | -1.5 | 2n>>(true)
	testType.equal<
		IsNotNegative<1 | -1.5 | 2n, { $any: 1; selection: 'filter' }>,
		IsNotNegative<1 | -1.5 | 2n, { selection: 'filter' }>
	>(true)
	testType.equal<
		IsNotNegative<string | 1, { $void: 4; distributive: false }>,
		IsNotNegative<string | 1, { distributive: false }>
	>(true)
})

describe('exact', () => {
	it('matches the wide `number` and `bigint`, whose sign and value are unknown', () => {
		testType.equal<IsNotNegative<number, { exact: true }>, boolean>(true)
		testType.equal<IsNotNegative<number & { a: 1 }, { exact: true }>, boolean>(true)
		testType.equal<IsNotNegative<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsNotNegative<bigint & { a: 1 }, { exact: true }>, boolean>(true)
	})

	it('rejects every numeric literal', () => {
		testType.equal<IsNotNegative<1, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<0, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<-0, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<-1, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<1.1, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<-1.1, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<1n, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<-1n, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<0n, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<1 & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<-1 & { a: 1 }, { exact: true }>, true>(true)
	})

	it('answers the non-numeric types the same as without `exact`', () => {
		testType.equal<IsNotNegative<string, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<'', { exact: true }>, true>(true)
		testType.equal<IsNotNegative<boolean, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<true, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<undefined, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<null, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<symbol, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<{}, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<string[], { exact: true }>, true>(true)
		testType.equal<IsNotNegative<() => void, { exact: true }>, true>(true)
	})

	it('answers the special types the same as without `exact`', () => {
		testType.equal<IsNotNegative<any, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<never, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<void, { exact: true }>, true>(true)
	})

	it('distributes over a union', () => {
		testType.equal<IsNotNegative<number | string, { exact: true }>, boolean>(true)
		testType.equal<IsNotNegative<1 | string, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<number | bigint, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotNegative<number | string, { exact: true; distributive: false }>, true>(true)
		testType.equal<IsNotNegative<1 | string, { exact: true; distributive: false }>, true>(true)
		testType.equal<IsNotNegative<number, { exact: true; distributive: false }>, boolean>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotNegative<number, { exact: true; selection: 'filter' }>, number>(true)
		testType.equal<IsNotNegative<bigint, { exact: true; selection: 'filter' }>, bigint>(true)
		testType.equal<IsNotNegative<1, { exact: true; selection: 'filter' }>, 1>(true)
		testType.equal<IsNotNegative<string, { exact: true; selection: 'filter' }>, string>(true)
		testType.equal<IsNotNegative<number | string, { exact: true; selection: 'filter' }>, number | string>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotNegative<number, IsNotNegative.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsNotNegative<bigint, IsNotNegative.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsNotNegative<1, IsNotNegative.$Branch & { exact: true }>, $Then>(true)
	})

	it('can override special type branches', () => {
		testType.equal<IsNotNegative<any, { exact: true; $any: 1 }>, 1>(true)
		testType.equal<IsNotNegative<unknown, { exact: true; $unknown: 2 }>, 2>(true)
		testType.equal<IsNotNegative<never, { exact: true; $never: 3 }>, 3>(true)
		testType.equal<IsNotNegative<void, { exact: true; $void: 4 }>, 4>(true)
	})

	it('pins the TSDoc example', () => {
		testType.equal<IsNotNegative<number, { exact: true }>, boolean>(true)
		testType.equal<IsNotNegative<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsNotNegative<1, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<-1, { exact: true }>, true>(true)
		testType.equal<IsNotNegative<string, { exact: true }>, true>(true)
	})
})

describe('exact: false', () => {
	it('answers exactly as passing no `exact` at all', () => {
		testType.equal<IsNotNegative<number, { exact: false }>, IsNotNegative<number>>(true)
		testType.equal<IsNotNegative<bigint, { exact: false }>, IsNotNegative<bigint>>(true)
		testType.equal<IsNotNegative<1, { exact: false }>, IsNotNegative<1>>(true)
		testType.equal<IsNotNegative<-1, { exact: false }>, IsNotNegative<-1>>(true)
		testType.equal<IsNotNegative<1n, { exact: false }>, IsNotNegative<1n>>(true)
		testType.equal<IsNotNegative<1.1, { exact: false }>, IsNotNegative<1.1>>(true)
		testType.equal<IsNotNegative<string, { exact: false }>, IsNotNegative<string>>(true)
		testType.equal<IsNotNegative<any, { exact: false }>, IsNotNegative<any>>(true)
		testType.equal<IsNotNegative<unknown, { exact: false }>, IsNotNegative<unknown>>(true)
		testType.equal<IsNotNegative<never, { exact: false }>, IsNotNegative<never>>(true)
		testType.equal<IsNotNegative<void, { exact: false }>, IsNotNegative<void>>(true)
		testType.equal<IsNotNegative<1 | string, { exact: false }>, IsNotNegative<1 | string>>(true)
	})

	it('leaves the other options alone', () => {
		testType.equal<
			IsNotNegative<1 | string, { exact: false; selection: 'filter' }>,
			IsNotNegative<1 | string, { selection: 'filter' }>
		>(true)
		testType.equal<
			IsNotNegative<1 | string, { exact: false; distributive: false }>,
			IsNotNegative<1 | string, { distributive: false }>
		>(true)
	})
})

describe('IsNotNegative.$Fn', () => {
	it('is IsNotNegative as a type function', () => {
		testType.equal<$Fn.Apply<IsNotNegative.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotNegative.$Fn, -1>, false>(true)
	})
})
