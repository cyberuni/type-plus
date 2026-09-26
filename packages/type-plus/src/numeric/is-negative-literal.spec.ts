import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNegativeLiteral, testType } from '../index.js'

it('matches the numeric literals it accepts and rejects the rest', () => {
	testType.equal<IsNegativeLiteral<1>, false>(true)
	testType.equal<IsNegativeLiteral<0>, false>(true)
	testType.equal<IsNegativeLiteral<-0>, false>(true)
	testType.equal<IsNegativeLiteral<2>, false>(true)
	testType.equal<IsNegativeLiteral<-1>, true>(true)
	testType.equal<IsNegativeLiteral<-2>, true>(true)
	testType.equal<IsNegativeLiteral<1.1>, false>(true)
	testType.equal<IsNegativeLiteral<-1.1>, true>(true)
	testType.equal<IsNegativeLiteral<1n>, false>(true)
	testType.equal<IsNegativeLiteral<0n>, false>(true)
	testType.equal<IsNegativeLiteral<-1n>, true>(true)
	testType.equal<IsNegativeLiteral<1 & { a: 1 }>, false>(true)
	testType.equal<IsNegativeLiteral<-1 & { a: 1 }>, true>(true)
	testType.equal<IsNegativeLiteral<1.1 & { a: 1 }>, false>(true)
	testType.equal<IsNegativeLiteral<1n & { a: 1 }>, false>(true)
	testType.equal<IsNegativeLiteral<-1n & { a: 1 }>, true>(true)
})

it('rejects the wide `number` and `bigint`, which are not literals', () => {
	testType.equal<IsNegativeLiteral<number>, false>(true)
	testType.equal<IsNegativeLiteral<bigint>, false>(true)
	testType.equal<IsNegativeLiteral<number & { a: 1 }>, false>(true)
	testType.equal<IsNegativeLiteral<bigint & { a: 1 }>, false>(true)
})

it('answers the non-numeric types with the `$else` branch of the literal test', () => {
	testType.equal<IsNegativeLiteral<string>, false>(true)
	testType.equal<IsNegativeLiteral<''>, false>(true)
	testType.equal<IsNegativeLiteral<boolean>, false>(true)
	testType.equal<IsNegativeLiteral<true>, false>(true)
	testType.equal<IsNegativeLiteral<false>, false>(true)
	testType.equal<IsNegativeLiteral<undefined>, false>(true)
	testType.equal<IsNegativeLiteral<null>, false>(true)
	testType.equal<IsNegativeLiteral<symbol>, false>(true)
	testType.equal<IsNegativeLiteral<{}>, false>(true)
	testType.equal<IsNegativeLiteral<string[]>, false>(true)
	testType.equal<IsNegativeLiteral<[]>, false>(true)
	testType.equal<IsNegativeLiteral<() => void>, false>(true)
})

it('treats the special types as non-numeric', () => {
	testType.equal<IsNegativeLiteral<any>, false>(true)
	testType.equal<IsNegativeLiteral<unknown>, false>(true)
	testType.equal<IsNegativeLiteral<never>, false>(true)
	testType.equal<IsNegativeLiteral<void>, false>(true)
})

it('distributes over a union', () => {
	testType.equal<IsNegativeLiteral<-1 | string>, boolean>(true)
	testType.equal<IsNegativeLiteral<number | string>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNegativeLiteral<-1 | string, { distributive: false }>, false>(true)
	testType.equal<IsNegativeLiteral<number | string, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsNegativeLiteral<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNegativeLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegativeLiteral<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegativeLiteral<never, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNegativeLiteral<-1, IsNegativeLiteral.$Branch>, $Then>(true)
	testType.equal<IsNegativeLiteral<number, IsNegativeLiteral.$Branch>, $Else>(true)
	testType.equal<IsNegativeLiteral<any, IsNegativeLiteral.$Branch>, $Else>(true)
	testType.equal<IsNegativeLiteral<unknown, IsNegativeLiteral.$Branch>, $Else>(true)
	testType.equal<IsNegativeLiteral<never, IsNegativeLiteral.$Branch>, $Else>(true)
	testType.equal<IsNegativeLiteral<void, IsNegativeLiteral.$Branch>, $Else>(true)
})

it('can override special type branches', () => {
	testType.equal<IsNegativeLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNegativeLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNegativeLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNegativeLiteral<void, { $void: 4 }>, 4>(true)
})

it('keeps the other branches when overriding a special type branch', () => {
	testType.equal<IsNegativeLiteral<unknown, { $any: 1 }>, IsNegativeLiteral<unknown>>(true)
	testType.equal<IsNegativeLiteral<1 | string, { $any: 1 }>, IsNegativeLiteral<1 | string>>(true)
	testType.equal<
		IsNegativeLiteral<1 | string, { $void: 4; selection: 'filter' }>,
		IsNegativeLiteral<1 | string, { selection: 'filter' }>
	>(true)
})

it('does not accept `exact`, which would do nothing here', () => {
	// @ts-expect-error `exact` is not an option of this type.
	type R = IsNegativeLiteral<1, { exact: true }>
	testType.never<never & R>(true)
})

it('pins the TSDoc examples', () => {
	testType.equal<IsNegativeLiteral<-1>, true>(true)
	testType.equal<IsNegativeLiteral<-1.1>, true>(true)
	testType.equal<IsNegativeLiteral<-1n>, true>(true)
	testType.equal<IsNegativeLiteral<0>, false>(true)
	testType.equal<IsNegativeLiteral<-0>, false>(true)
	testType.equal<IsNegativeLiteral<1>, false>(true)
	testType.equal<IsNegativeLiteral<number>, false>(true)
	testType.equal<IsNegativeLiteral<bigint>, false>(true)
	testType.equal<IsNegativeLiteral<string>, false>(true)
	testType.equal<IsNegativeLiteral<any>, false>(true)
	testType.equal<IsNegativeLiteral<unknown>, false>(true)
	testType.equal<IsNegativeLiteral<never>, false>(true)
	testType.equal<IsNegativeLiteral<void>, false>(true)

	testType.equal<IsNegativeLiteral<-1 & { a: 1 }>, true>(true)
	testType.equal<IsNegativeLiteral<1 & { a: 1 }>, false>(true)
	testType.equal<IsNegativeLiteral<number & { a: 1 }>, false>(true)

	testType.equal<IsNegativeLiteral<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNegativeLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegativeLiteral<number, { selection: 'filter' }>, never>(true)

	testType.equal<IsNegativeLiteral<-1 | string>, boolean>(true)
	testType.equal<IsNegativeLiteral<-1 | string, { distributive: false }>, false>(true)

	testType.equal<IsNegativeLiteral<-1, IsNegativeLiteral.$Branch>, $Then>(true)
	testType.equal<IsNegativeLiteral<number, IsNegativeLiteral.$Branch>, $Else>(true)

	testType.equal<IsNegativeLiteral<any, { $any: 1 }>, 1>(true)
	testType.equal<IsNegativeLiteral<unknown, { $unknown: 2 }>, 2>(true)
	testType.equal<IsNegativeLiteral<never, { $never: 3 }>, 3>(true)
	testType.equal<IsNegativeLiteral<void, { $void: 4 }>, 4>(true)
})

describe('IsNegativeLiteral.$Fn', () => {
	it('is IsNegativeLiteral as a type function', () => {
		testType.equal<$Fn.Apply<IsNegativeLiteral.$Fn, -1>, true>(true)
		testType.equal<$Fn.Apply<IsNegativeLiteral.$Fn, number>, false>(true)
	})
})

it('resolves `IsNegativeLiteral.$Default` the same as no options', () => {
	// `IsNegativeLiteral.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNegativeLiteral<any, IsNegativeLiteral.$Default>, IsNegativeLiteral<any>>(true)
	testType.equal<IsNegativeLiteral<unknown, IsNegativeLiteral.$Default>, IsNegativeLiteral<unknown>>(true)
	testType.equal<IsNegativeLiteral<never, IsNegativeLiteral.$Default>, IsNegativeLiteral<never>>(true)
	testType.equal<IsNegativeLiteral<void, IsNegativeLiteral.$Default>, IsNegativeLiteral<void>>(true)
	testType.equal<IsNegativeLiteral<undefined, IsNegativeLiteral.$Default>, IsNegativeLiteral<undefined>>(true)
	testType.equal<IsNegativeLiteral<null, IsNegativeLiteral.$Default>, IsNegativeLiteral<null>>(true)
	testType.equal<IsNegativeLiteral<boolean, IsNegativeLiteral.$Default>, IsNegativeLiteral<boolean>>(true)
	testType.equal<IsNegativeLiteral<true, IsNegativeLiteral.$Default>, IsNegativeLiteral<true>>(true)
	testType.equal<IsNegativeLiteral<1, IsNegativeLiteral.$Default>, IsNegativeLiteral<1>>(true)
	testType.equal<IsNegativeLiteral<number, IsNegativeLiteral.$Default>, IsNegativeLiteral<number>>(true)
	testType.equal<IsNegativeLiteral<'a', IsNegativeLiteral.$Default>, IsNegativeLiteral<'a'>>(true)
	testType.equal<IsNegativeLiteral<string, IsNegativeLiteral.$Default>, IsNegativeLiteral<string>>(true)
	testType.equal<IsNegativeLiteral<symbol, IsNegativeLiteral.$Default>, IsNegativeLiteral<symbol>>(true)
	testType.equal<IsNegativeLiteral<1n, IsNegativeLiteral.$Default>, IsNegativeLiteral<1n>>(true)
	testType.equal<IsNegativeLiteral<{}, IsNegativeLiteral.$Default>, IsNegativeLiteral<{}>>(true)
	testType.equal<IsNegativeLiteral<[], IsNegativeLiteral.$Default>, IsNegativeLiteral<[]>>(true)
	testType.equal<IsNegativeLiteral<() => void, IsNegativeLiteral.$Default>, IsNegativeLiteral<() => void>>(true)
	testType.equal<IsNegativeLiteral<1 | string, IsNegativeLiteral.$Default>, IsNegativeLiteral<1 | string>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNegativeLiteral<any>, IsNegativeLiteral<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<unknown>, IsNegativeLiteral<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<never>, IsNegativeLiteral<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<void>, IsNegativeLiteral<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<{}>, IsNegativeLiteral<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<object>, IsNegativeLiteral<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<undefined>, IsNegativeLiteral<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<null>, IsNegativeLiteral<null, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNegativeLiteral<{} | null | undefined>,
			IsNegativeLiteral<{} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNegativeLiteral<string>, IsNegativeLiteral<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<'a'>, IsNegativeLiteral<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<`a${string}`>, IsNegativeLiteral<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNegativeLiteral<Uppercase<string>>,
			IsNegativeLiteral<Uppercase<string>, { selection: 'predicate' }>
		>(true)
		testType.equal<
			IsNegativeLiteral<string & { a: 1 }>,
			IsNegativeLiteral<string & { a: 1 }, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNegativeLiteral<number>, IsNegativeLiteral<number, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<1>, IsNegativeLiteral<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<-1>, IsNegativeLiteral<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<1.5>, IsNegativeLiteral<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<1 & { a: 1 }>, IsNegativeLiteral<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<bigint>, IsNegativeLiteral<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<1n>, IsNegativeLiteral<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<-1n>, IsNegativeLiteral<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<boolean>, IsNegativeLiteral<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<true>, IsNegativeLiteral<true, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<false>, IsNegativeLiteral<false, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<boolean | 1>, IsNegativeLiteral<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<symbol>, IsNegativeLiteral<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<{ a: 1 }>, IsNegativeLiteral<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<() => void>, IsNegativeLiteral<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<Function>, IsNegativeLiteral<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<string[]>, IsNegativeLiteral<string[], { selection: 'predicate' }>>(true)
		testType.equal<
			IsNegativeLiteral<readonly string[]>,
			IsNegativeLiteral<readonly string[], { selection: 'predicate' }>
		>(true)
		testType.equal<IsNegativeLiteral<[]>, IsNegativeLiteral<[], { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<[1]>, IsNegativeLiteral<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<readonly [1]>, IsNegativeLiteral<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<{} | 1>, IsNegativeLiteral<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<string | 1>, IsNegativeLiteral<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNegativeLiteral<object | undefined>,
			IsNegativeLiteral<object | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<
			IsNegativeLiteral<void | undefined>,
			IsNegativeLiteral<void | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNegativeLiteral<never | 1>, IsNegativeLiteral<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNegativeLiteral<unknown | 1>, IsNegativeLiteral<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
