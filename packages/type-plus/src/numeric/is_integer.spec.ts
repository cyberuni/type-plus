import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsInteger, testType } from '../index.js'

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

it('can override special type branches', () => {
	testType.equal<IsInteger<any, { $any: 1 }>, 1>(true)
	testType.equal<IsInteger<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsInteger<never, { $never: 3 }>, 3>(true)
	testType.equal<IsInteger<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsInteger<unknown, { $any: 1 }>, IsInteger<unknown>>(true)
	testType.equal<IsInteger<void, { $never: 3; selection: 'filter' }>, IsInteger<void, { selection: 'filter' }>>(true)
	testType.equal<IsInteger<1 | -1.5 | 2n, { $any: 1 }>, IsInteger<1 | -1.5 | 2n>>(true)
	testType.equal<
		IsInteger<1 | -1.5 | 2n, { $any: 1; selection: 'filter' }>,
		IsInteger<1 | -1.5 | 2n, { selection: 'filter' }>
	>(true)
	testType.equal<
		IsInteger<string | 1, { $void: 4; distributive: false }>,
		IsInteger<string | 1, { distributive: false }>
	>(true)
})

describe('exact', () => {
	it('matches the wide `number` and `bigint`, whose sign and value are unknown', () => {
		testType.equal<IsInteger<number, { exact: true }>, boolean>(true)
		testType.equal<IsInteger<number & { a: 1 }, { exact: true }>, boolean>(true)
		testType.equal<IsInteger<bigint, { exact: true }>, true>(true)
		testType.equal<IsInteger<bigint & { a: 1 }, { exact: true }>, true>(true)
	})

	it('rejects every numeric literal', () => {
		testType.equal<IsInteger<1, { exact: true }>, false>(true)
		testType.equal<IsInteger<0, { exact: true }>, false>(true)
		testType.equal<IsInteger<-0, { exact: true }>, false>(true)
		testType.equal<IsInteger<-1, { exact: true }>, false>(true)
		testType.equal<IsInteger<1.1, { exact: true }>, false>(true)
		testType.equal<IsInteger<-1.1, { exact: true }>, false>(true)
		testType.equal<IsInteger<1n, { exact: true }>, false>(true)
		testType.equal<IsInteger<-1n, { exact: true }>, false>(true)
		testType.equal<IsInteger<0n, { exact: true }>, false>(true)
		testType.equal<IsInteger<1 & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsInteger<-1 & { a: 1 }, { exact: true }>, false>(true)
	})

	it('answers the non-numeric types the same as without `exact`', () => {
		testType.equal<IsInteger<string, { exact: true }>, false>(true)
		testType.equal<IsInteger<'', { exact: true }>, false>(true)
		testType.equal<IsInteger<boolean, { exact: true }>, false>(true)
		testType.equal<IsInteger<true, { exact: true }>, false>(true)
		testType.equal<IsInteger<undefined, { exact: true }>, false>(true)
		testType.equal<IsInteger<null, { exact: true }>, false>(true)
		testType.equal<IsInteger<symbol, { exact: true }>, false>(true)
		testType.equal<IsInteger<{}, { exact: true }>, false>(true)
		testType.equal<IsInteger<string[], { exact: true }>, false>(true)
		testType.equal<IsInteger<() => void, { exact: true }>, false>(true)
	})

	it('answers the special types the same as without `exact`', () => {
		testType.equal<IsInteger<any, { exact: true }>, false>(true)
		testType.equal<IsInteger<unknown, { exact: true }>, false>(true)
		testType.equal<IsInteger<never, { exact: true }>, false>(true)
		testType.equal<IsInteger<void, { exact: true }>, false>(true)
	})

	it('distributes over a union', () => {
		testType.equal<IsInteger<number | string, { exact: true }>, boolean>(true)
		testType.equal<IsInteger<1 | string, { exact: true }>, false>(true)
		testType.equal<IsInteger<number | bigint, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsInteger<number | string, { exact: true; distributive: false }>, false>(true)
		testType.equal<IsInteger<1 | string, { exact: true; distributive: false }>, false>(true)
		testType.equal<IsInteger<number, { exact: true; distributive: false }>, boolean>(true)
	})

	it('works as filter', () => {
		testType.equal<IsInteger<number, { exact: true; selection: 'filter' }>, number>(true)
		testType.equal<IsInteger<bigint, { exact: true; selection: 'filter' }>, bigint>(true)
		testType.equal<IsInteger<1, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsInteger<string, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsInteger<number | string, { exact: true; selection: 'filter' }>, number>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsInteger<number, IsInteger.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsInteger<bigint, IsInteger.$Branch & { exact: true }>, $Then>(true)
		testType.equal<IsInteger<1, IsInteger.$Branch & { exact: true }>, $Else>(true)
	})

	it('can override special type branches', () => {
		testType.equal<IsInteger<any, { exact: true; $any: 1 }>, 1>(true)
		testType.equal<IsInteger<unknown, { exact: true; $unknown: 2 }>, 2>(true)
		testType.equal<IsInteger<never, { exact: true; $never: 3 }>, 3>(true)
		testType.equal<IsInteger<void, { exact: true; $void: 4 }>, 4>(true)
	})

	it('pins the TSDoc example', () => {
		testType.equal<IsInteger<bigint, { exact: true }>, true>(true)
		testType.equal<IsInteger<number, { exact: true }>, boolean>(true)
		testType.equal<IsInteger<1, { exact: true }>, false>(true)
		testType.equal<IsInteger<1n, { exact: true }>, false>(true)
	})
})

describe('exact: false', () => {
	it('answers exactly as passing no `exact` at all', () => {
		testType.equal<IsInteger<number, { exact: false }>, IsInteger<number>>(true)
		testType.equal<IsInteger<bigint, { exact: false }>, IsInteger<bigint>>(true)
		testType.equal<IsInteger<1, { exact: false }>, IsInteger<1>>(true)
		testType.equal<IsInteger<-1, { exact: false }>, IsInteger<-1>>(true)
		testType.equal<IsInteger<1n, { exact: false }>, IsInteger<1n>>(true)
		testType.equal<IsInteger<1.1, { exact: false }>, IsInteger<1.1>>(true)
		testType.equal<IsInteger<string, { exact: false }>, IsInteger<string>>(true)
		testType.equal<IsInteger<any, { exact: false }>, IsInteger<any>>(true)
		testType.equal<IsInteger<unknown, { exact: false }>, IsInteger<unknown>>(true)
		testType.equal<IsInteger<never, { exact: false }>, IsInteger<never>>(true)
		testType.equal<IsInteger<void, { exact: false }>, IsInteger<void>>(true)
		testType.equal<IsInteger<1 | string, { exact: false }>, IsInteger<1 | string>>(true)
	})

	it('leaves the other options alone', () => {
		testType.equal<
			IsInteger<1 | string, { exact: false; selection: 'filter' }>,
			IsInteger<1 | string, { selection: 'filter' }>
		>(true)
		testType.equal<
			IsInteger<1 | string, { exact: false; distributive: false }>,
			IsInteger<1 | string, { distributive: false }>
		>(true)
	})
})

describe('IsInteger.$Fn', () => {
	it('is IsInteger as a type function', () => {
		testType.equal<$Fn.Apply<IsInteger.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsInteger.$Fn, 1.5>, false>(true)
	})
})
