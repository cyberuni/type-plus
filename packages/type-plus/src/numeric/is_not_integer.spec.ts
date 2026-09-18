import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotInteger, testType } from '../index.js'

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

it('can override special type branches', () => {
	testType.equal<IsNotInteger<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNotInteger<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNotInteger<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNotInteger<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNotInteger<unknown, { $any: 1 }>, IsNotInteger<unknown>>(true)
	testType.equal<IsNotInteger<void, { $never: 3; selection: 'filter' }>, IsNotInteger<void, { selection: 'filter' }>>(
		true,
	)
	testType.equal<IsNotInteger<1 | -1.5 | 2n, { $any: 1 }>, IsNotInteger<1 | -1.5 | 2n>>(true)
	testType.equal<
		IsNotInteger<1 | -1.5 | 2n, { $any: 1; selection: 'filter' }>,
		IsNotInteger<1 | -1.5 | 2n, { selection: 'filter' }>
	>(true)
	testType.equal<
		IsNotInteger<string | 1, { $void: 4; distributive: false }>,
		IsNotInteger<string | 1, { distributive: false }>
	>(true)
})

describe('exact', () => {
	it('matches the wide `number` and `bigint`, whose sign and value are unknown', () => {
		testType.equal<IsNotInteger<number, { exact: true }>, boolean>(true)
		testType.equal<IsNotInteger<number & { a: 1 }, { exact: true }>, boolean>(true)
		testType.equal<IsNotInteger<bigint, { exact: true }>, false>(true)
		testType.equal<IsNotInteger<bigint & { a: 1 }, { exact: true }>, false>(true)
	})

	it('rejects every numeric literal', () => {
		testType.equal<IsNotInteger<1, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<0, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<-0, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<-1, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<1.1, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<-1.1, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<1n, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<-1n, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<0n, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<1 & { a: 1 }, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<-1 & { a: 1 }, { exact: true }>, true>(true)
	})

	it('answers the non-numeric types the same as without `exact`', () => {
		testType.equal<IsNotInteger<string, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<'', { exact: true }>, true>(true)
		testType.equal<IsNotInteger<boolean, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<true, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<undefined, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<null, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<symbol, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<{}, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<string[], { exact: true }>, true>(true)
		testType.equal<IsNotInteger<() => void, { exact: true }>, true>(true)
	})

	it('answers the special types the same as without `exact`', () => {
		testType.equal<IsNotInteger<any, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<never, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<void, { exact: true }>, true>(true)
	})

	it('distributes over a union', () => {
		testType.equal<IsNotInteger<number | string, { exact: true }>, boolean>(true)
		testType.equal<IsNotInteger<1 | string, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<number | bigint, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNotInteger<number | string, { exact: true; distributive: false }>, true>(true)
		testType.equal<IsNotInteger<1 | string, { exact: true; distributive: false }>, true>(true)
		testType.equal<IsNotInteger<number, { exact: true; distributive: false }>, boolean>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotInteger<number, { exact: true; selection: 'filter' }>, number>(true)
		testType.equal<IsNotInteger<bigint, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsNotInteger<1, { exact: true; selection: 'filter' }>, 1>(true)
		testType.equal<IsNotInteger<string, { exact: true; selection: 'filter' }>, string>(true)
		testType.equal<IsNotInteger<number | string, { exact: true; selection: 'filter' }>, number | string>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotInteger<number, IsNotInteger.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsNotInteger<bigint, IsNotInteger.$Branch & { exact: true }>, $Else>(true)
		testType.equal<IsNotInteger<1, IsNotInteger.$Branch & { exact: true }>, $Then>(true)
	})

	it('can override special type branches', () => {
		testType.equal<IsNotInteger<any, { exact: true; $any: 1 }>, 1>(true)
		testType.equal<IsNotInteger<unknown, { exact: true; $unknown: 2 }>, 2>(true)
		testType.equal<IsNotInteger<never, { exact: true; $never: 3 }>, 3>(true)
		testType.equal<IsNotInteger<void, { exact: true; $void: 4 }>, 4>(true)
	})

	it('pins the TSDoc example', () => {
		testType.equal<IsNotInteger<number, { exact: true }>, boolean>(true)
		testType.equal<IsNotInteger<bigint, { exact: true }>, false>(true)
		testType.equal<IsNotInteger<1, { exact: true }>, true>(true)
		testType.equal<IsNotInteger<1.1, { exact: true }>, true>(true)
	})
})

describe('exact: false', () => {
	it('answers exactly as passing no `exact` at all', () => {
		testType.equal<IsNotInteger<number, { exact: false }>, IsNotInteger<number>>(true)
		testType.equal<IsNotInteger<bigint, { exact: false }>, IsNotInteger<bigint>>(true)
		testType.equal<IsNotInteger<1, { exact: false }>, IsNotInteger<1>>(true)
		testType.equal<IsNotInteger<-1, { exact: false }>, IsNotInteger<-1>>(true)
		testType.equal<IsNotInteger<1n, { exact: false }>, IsNotInteger<1n>>(true)
		testType.equal<IsNotInteger<1.1, { exact: false }>, IsNotInteger<1.1>>(true)
		testType.equal<IsNotInteger<string, { exact: false }>, IsNotInteger<string>>(true)
		testType.equal<IsNotInteger<any, { exact: false }>, IsNotInteger<any>>(true)
		testType.equal<IsNotInteger<unknown, { exact: false }>, IsNotInteger<unknown>>(true)
		testType.equal<IsNotInteger<never, { exact: false }>, IsNotInteger<never>>(true)
		testType.equal<IsNotInteger<void, { exact: false }>, IsNotInteger<void>>(true)
		testType.equal<IsNotInteger<1 | string, { exact: false }>, IsNotInteger<1 | string>>(true)
	})

	it('leaves the other options alone', () => {
		testType.equal<
			IsNotInteger<1 | string, { exact: false; selection: 'filter' }>,
			IsNotInteger<1 | string, { selection: 'filter' }>
		>(true)
		testType.equal<
			IsNotInteger<1 | string, { exact: false; distributive: false }>,
			IsNotInteger<1 | string, { distributive: false }>
		>(true)
	})
})

describe('IsNotInteger.$Fn', () => {
	it('is IsNotInteger as a type function', () => {
		testType.equal<$Fn.Apply<IsNotInteger.$Fn, 1.5>, true>(true)
		testType.equal<$Fn.Apply<IsNotInteger.$Fn, 1>, false>(true)
	})
})
