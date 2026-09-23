import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNegative, testType } from '../index.js'

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

it('returns true if T is an intersection of negative numbers', () => {
	testType.true<IsNegative<-1 & { a: 1 }>>(true)
	testType.true<IsNegative<-1n & { a: 1 }>>(true)
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

it('can override special type branches', () => {
	testType.equal<IsNegative<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNegative<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNegative<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNegative<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNegative<unknown, { $any: 1 }>, IsNegative<unknown>>(true)
	testType.equal<IsNegative<void, { $never: 3; selection: 'filter' }>, IsNegative<void, { selection: 'filter' }>>(true)
	testType.equal<IsNegative<1 | -1.5 | 2n, { $any: 1 }>, IsNegative<1 | -1.5 | 2n>>(true)
	testType.equal<
		IsNegative<1 | -1.5 | 2n, { $any: 1; selection: 'filter' }>,
		IsNegative<1 | -1.5 | 2n, { selection: 'filter' }>
	>(true)
	testType.equal<
		IsNegative<string | 1, { $void: 4; distributive: false }>,
		IsNegative<string | 1, { distributive: false }>
	>(true)
})

describe('exact', () => {
	it('matches the wide `number` and `bigint`, whose sign and value are unknown', () => {
		testType.equal<IsNegative<number, { exact: true }>, boolean>(true)
		testType.equal<IsNegative<number & { a: 1 }, { exact: true }>, boolean>(true)
		testType.equal<IsNegative<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsNegative<bigint & { a: 1 }, { exact: true }>, boolean>(true)
	})

	it('rejects every numeric literal', () => {
		testType.equal<IsNegative<1, { exact: true }>, false>(true)
		testType.equal<IsNegative<0, { exact: true }>, false>(true)
		testType.equal<IsNegative<-0, { exact: true }>, false>(true)
		testType.equal<IsNegative<-1, { exact: true }>, false>(true)
		testType.equal<IsNegative<1.1, { exact: true }>, false>(true)
		testType.equal<IsNegative<-1.1, { exact: true }>, false>(true)
		testType.equal<IsNegative<1n, { exact: true }>, false>(true)
		testType.equal<IsNegative<-1n, { exact: true }>, false>(true)
		testType.equal<IsNegative<0n, { exact: true }>, false>(true)
		testType.equal<IsNegative<1 & { a: 1 }, { exact: true }>, false>(true)
		testType.equal<IsNegative<-1 & { a: 1 }, { exact: true }>, false>(true)
	})

	it('answers the non-numeric types the same as without `exact`', () => {
		testType.equal<IsNegative<string, { exact: true }>, false>(true)
		testType.equal<IsNegative<'', { exact: true }>, false>(true)
		testType.equal<IsNegative<boolean, { exact: true }>, false>(true)
		testType.equal<IsNegative<true, { exact: true }>, false>(true)
		testType.equal<IsNegative<undefined, { exact: true }>, false>(true)
		testType.equal<IsNegative<null, { exact: true }>, false>(true)
		testType.equal<IsNegative<symbol, { exact: true }>, false>(true)
		testType.equal<IsNegative<{}, { exact: true }>, false>(true)
		testType.equal<IsNegative<string[], { exact: true }>, false>(true)
		testType.equal<IsNegative<() => void, { exact: true }>, false>(true)
	})

	it('answers the special types the same as without `exact`', () => {
		testType.equal<IsNegative<any, { exact: true }>, false>(true)
		testType.equal<IsNegative<unknown, { exact: true }>, false>(true)
		testType.equal<IsNegative<never, { exact: true }>, false>(true)
		testType.equal<IsNegative<void, { exact: true }>, false>(true)
	})

	it('distributes over a union', () => {
		testType.equal<IsNegative<number | string, { exact: true }>, boolean>(true)
		testType.equal<IsNegative<1 | string, { exact: true }>, false>(true)
		testType.equal<IsNegative<number | bigint, { exact: true }>, boolean>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsNegative<number | string, { exact: true; distributive: false }>, false>(true)
		testType.equal<IsNegative<1 | string, { exact: true; distributive: false }>, false>(true)
		testType.equal<IsNegative<number, { exact: true; distributive: false }>, boolean>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNegative<number, { exact: true; selection: 'filter' }>, number>(true)
		testType.equal<IsNegative<bigint, { exact: true; selection: 'filter' }>, bigint>(true)
		testType.equal<IsNegative<1, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsNegative<string, { exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsNegative<number | string, { exact: true; selection: 'filter' }>, number>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNegative<number, IsNegative.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsNegative<bigint, IsNegative.$Branch & { exact: true }>, $Then | $Else>(true)
		testType.equal<IsNegative<1, IsNegative.$Branch & { exact: true }>, $Else>(true)
	})

	it('can override special type branches', () => {
		testType.equal<IsNegative<any, { exact: true; $any: 1 }>, 1>(true)
		testType.equal<IsNegative<unknown, { exact: true; $unknown: 2 }>, 2>(true)
		testType.equal<IsNegative<never, { exact: true; $never: 3 }>, 3>(true)
		testType.equal<IsNegative<void, { exact: true; $void: 4 }>, 4>(true)
	})

	it('pins the TSDoc example', () => {
		testType.equal<IsNegative<number, { exact: true }>, boolean>(true)
		testType.equal<IsNegative<bigint, { exact: true }>, boolean>(true)
		testType.equal<IsNegative<-1, { exact: true }>, false>(true)
		testType.equal<IsNegative<1, { exact: true }>, false>(true)
		testType.equal<IsNegative<-1n, { exact: true }>, false>(true)
	})
})

describe('exact: false', () => {
	it('answers exactly as passing no `exact` at all', () => {
		testType.equal<IsNegative<number, { exact: false }>, IsNegative<number>>(true)
		testType.equal<IsNegative<bigint, { exact: false }>, IsNegative<bigint>>(true)
		testType.equal<IsNegative<1, { exact: false }>, IsNegative<1>>(true)
		testType.equal<IsNegative<-1, { exact: false }>, IsNegative<-1>>(true)
		testType.equal<IsNegative<1n, { exact: false }>, IsNegative<1n>>(true)
		testType.equal<IsNegative<1.1, { exact: false }>, IsNegative<1.1>>(true)
		testType.equal<IsNegative<string, { exact: false }>, IsNegative<string>>(true)
		testType.equal<IsNegative<any, { exact: false }>, IsNegative<any>>(true)
		testType.equal<IsNegative<unknown, { exact: false }>, IsNegative<unknown>>(true)
		testType.equal<IsNegative<never, { exact: false }>, IsNegative<never>>(true)
		testType.equal<IsNegative<void, { exact: false }>, IsNegative<void>>(true)
		testType.equal<IsNegative<1 | string, { exact: false }>, IsNegative<1 | string>>(true)
	})

	it('leaves the other options alone', () => {
		testType.equal<
			IsNegative<1 | string, { exact: false; selection: 'filter' }>,
			IsNegative<1 | string, { selection: 'filter' }>
		>(true)
		testType.equal<
			IsNegative<1 | string, { exact: false; distributive: false }>,
			IsNegative<1 | string, { distributive: false }>
		>(true)
	})
})

describe('IsNegative.$Fn', () => {
	it('is IsNegative as a type function', () => {
		testType.equal<$Fn.Apply<IsNegative.$Fn, -1>, true>(true)
		testType.equal<$Fn.Apply<IsNegative.$Fn, 1>, false>(true)
	})
})

it('resolves `IsNegative.$Default` the same as no options', () => {
	// `IsNegative.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNegative<any, IsNegative.$Default>, IsNegative<any>>(true)
	testType.equal<IsNegative<unknown, IsNegative.$Default>, IsNegative<unknown>>(true)
	testType.equal<IsNegative<never, IsNegative.$Default>, IsNegative<never>>(true)
	testType.equal<IsNegative<void, IsNegative.$Default>, IsNegative<void>>(true)
	testType.equal<IsNegative<undefined, IsNegative.$Default>, IsNegative<undefined>>(true)
	testType.equal<IsNegative<null, IsNegative.$Default>, IsNegative<null>>(true)
	testType.equal<IsNegative<boolean, IsNegative.$Default>, IsNegative<boolean>>(true)
	testType.equal<IsNegative<true, IsNegative.$Default>, IsNegative<true>>(true)
	testType.equal<IsNegative<1, IsNegative.$Default>, IsNegative<1>>(true)
	testType.equal<IsNegative<number, IsNegative.$Default>, IsNegative<number>>(true)
	testType.equal<IsNegative<'a', IsNegative.$Default>, IsNegative<'a'>>(true)
	testType.equal<IsNegative<string, IsNegative.$Default>, IsNegative<string>>(true)
	testType.equal<IsNegative<symbol, IsNegative.$Default>, IsNegative<symbol>>(true)
	testType.equal<IsNegative<1n, IsNegative.$Default>, IsNegative<1n>>(true)
	testType.equal<IsNegative<{}, IsNegative.$Default>, IsNegative<{}>>(true)
	testType.equal<IsNegative<[], IsNegative.$Default>, IsNegative<[]>>(true)
	testType.equal<IsNegative<() => void, IsNegative.$Default>, IsNegative<() => void>>(true)
	testType.equal<IsNegative<1 | string, IsNegative.$Default>, IsNegative<1 | string>>(true)
})
