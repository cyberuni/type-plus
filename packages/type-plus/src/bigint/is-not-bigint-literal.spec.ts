import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotBigintLiteral, testType } from '../index.js'

it('returns true for number', () => {
	testType.true<IsNotBigintLiteral<number>>(true)
	testType.true<IsNotBigintLiteral<-1>>(true)
	testType.true<IsNotBigintLiteral<0>>(true)
	testType.true<IsNotBigintLiteral<1>>(true)
	testType.true<IsNotBigintLiteral<1.1>>(true)
})

it('returns true for bigint', () => {
	testType.true<IsNotBigintLiteral<bigint>>(true)
})

it('returns false if T is bigint literial', () => {
	testType.false<IsNotBigintLiteral<-1n>>(true)
	testType.false<IsNotBigintLiteral<0n>>(true)
	testType.false<IsNotBigintLiteral<1n>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotBigintLiteral<void>>(true)
	testType.true<IsNotBigintLiteral<unknown>>(true)
	testType.true<IsNotBigintLiteral<any>>(true)
	testType.true<IsNotBigintLiteral<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotBigintLiteral<undefined>>(true)
	testType.true<IsNotBigintLiteral<null>>(true)
	testType.true<IsNotBigintLiteral<boolean>>(true)
	testType.true<IsNotBigintLiteral<true>>(true)
	testType.true<IsNotBigintLiteral<false>>(true)
	testType.true<IsNotBigintLiteral<string>>(true)
	testType.true<IsNotBigintLiteral<''>>(true)
	testType.true<IsNotBigintLiteral<symbol>>(true)
	testType.true<IsNotBigintLiteral<{}>>(true)
	testType.true<IsNotBigintLiteral<string[]>>(true)
	testType.true<IsNotBigintLiteral<[]>>(true)
	testType.true<IsNotBigintLiteral<Function>>(true)
	testType.true<IsNotBigintLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotBigintLiteral<bigint | string>, true>(true)
	testType.equal<IsNotBigintLiteral<1n | string>, boolean>(true)
	testType.equal<IsNotBigintLiteral<string | boolean>, true>(true)
	testType.equal<IsNotBigintLiteral<string | 1n>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotBigintLiteral<bigint | string, { distributive: false }>, true>(true)
	testType.equal<IsNotBigintLiteral<1n | string, { distributive: false }>, true>(true)
})

it('works with intersection type', () => {
	testType.equal<IsNotBigintLiteral<number & { a: 1 }>, true>(true)
	testType.equal<IsNotBigintLiteral<number & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotBigintLiteral<1 & { a: 1 }>, true>(true)
	testType.equal<IsNotBigintLiteral<1 & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsNotBigintLiteral<bigint & { a: 1 }>, true>(true)
	testType.equal<IsNotBigintLiteral<bigint & { a: 1 }, { distributive: false }>, true>(true)
	testType.equal<IsNotBigintLiteral<1n & { a: 1 }>, false>(true)
	testType.equal<IsNotBigintLiteral<1n & { a: 1 }, { distributive: false }>, false>(true)
})

it('resolves `IsNotBigintLiteral.$Default` the same as no options', () => {
	// `IsNotBigintLiteral.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotBigintLiteral<any, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<any>>(true)
	testType.equal<IsNotBigintLiteral<unknown, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<unknown>>(true)
	testType.equal<IsNotBigintLiteral<never, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<never>>(true)
	testType.equal<IsNotBigintLiteral<void, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<void>>(true)
	testType.equal<IsNotBigintLiteral<1n, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<1n>>(true)
	testType.equal<IsNotBigintLiteral<bigint, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<bigint>>(true)
	testType.equal<IsNotBigintLiteral<1, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<1>>(true)
	testType.equal<IsNotBigintLiteral<1n | bigint, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<1n | bigint>>(true)
	testType.equal<IsNotBigintLiteral<1n | 1, IsNotBigintLiteral.$Default>, IsNotBigintLiteral<1n | 1>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotBigintLiteral<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotBigintLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotBigintLiteral<bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNotBigintLiteral<1n, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotBigintLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotBigintLiteral<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotBigintLiteral<bigint | string, { selection: 'filter' }>, bigint | string>(true)

	testType.equal<IsNotBigintLiteral<1n | string, { selection: 'filter' }>, string>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotBigintLiteral<number, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<1, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<bigint, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<1n, IsNotBigintLiteral.$Branch>, $Else>(true)

	testType.equal<IsNotBigintLiteral<any, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<unknown, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<never, IsNotBigintLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotBigintLiteral<void, IsNotBigintLiteral.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotBigintLiteral<any>, true>(true)
	testType.equal<IsNotBigintLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotBigintLiteral<unknown>, true>(true)
	testType.equal<IsNotBigintLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotBigintLiteral<never>, true>(true)
	testType.equal<IsNotBigintLiteral<never, { $never: unknown }>, unknown>(true)
})

describe('IsNotBigintLiteral.$Fn', () => {
	it('is IsNotBigintLiteral as a type function', () => {
		testType.equal<$Fn.Apply<IsNotBigintLiteral.$Fn, bigint>, true>(true)
		testType.equal<$Fn.Apply<IsNotBigintLiteral.$Fn, 1n>, false>(true)
	})
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNotBigintLiteral<any>, IsNotBigintLiteral<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<unknown>, IsNotBigintLiteral<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<never>, IsNotBigintLiteral<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<void>, IsNotBigintLiteral<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<{}>, IsNotBigintLiteral<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<object>, IsNotBigintLiteral<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<undefined>, IsNotBigintLiteral<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<null>, IsNotBigintLiteral<null, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNotBigintLiteral<{} | null | undefined>,
			IsNotBigintLiteral<{} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNotBigintLiteral<string>, IsNotBigintLiteral<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<'a'>, IsNotBigintLiteral<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<`a${string}`>, IsNotBigintLiteral<`a${string}`, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNotBigintLiteral<Uppercase<string>>,
			IsNotBigintLiteral<Uppercase<string>, { selection: 'predicate' }>
		>(true)
		testType.equal<
			IsNotBigintLiteral<string & { a: 1 }>,
			IsNotBigintLiteral<string & { a: 1 }, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNotBigintLiteral<number>, IsNotBigintLiteral<number, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<1>, IsNotBigintLiteral<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<-1>, IsNotBigintLiteral<-1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<1.5>, IsNotBigintLiteral<1.5, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<1 & { a: 1 }>, IsNotBigintLiteral<1 & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<bigint>, IsNotBigintLiteral<bigint, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<1n>, IsNotBigintLiteral<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<-1n>, IsNotBigintLiteral<-1n, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<boolean>, IsNotBigintLiteral<boolean, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<true>, IsNotBigintLiteral<true, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<false>, IsNotBigintLiteral<false, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<boolean | 1>, IsNotBigintLiteral<boolean | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<symbol>, IsNotBigintLiteral<symbol, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<{ a: 1 }>, IsNotBigintLiteral<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<() => void>, IsNotBigintLiteral<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<Function>, IsNotBigintLiteral<Function, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<string[]>, IsNotBigintLiteral<string[], { selection: 'predicate' }>>(true)
		testType.equal<
			IsNotBigintLiteral<readonly string[]>,
			IsNotBigintLiteral<readonly string[], { selection: 'predicate' }>
		>(true)
		testType.equal<IsNotBigintLiteral<[]>, IsNotBigintLiteral<[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<[1]>, IsNotBigintLiteral<[1], { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<readonly [1]>, IsNotBigintLiteral<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<{} | 1>, IsNotBigintLiteral<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<string | 1>, IsNotBigintLiteral<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<
			IsNotBigintLiteral<object | undefined>,
			IsNotBigintLiteral<object | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<
			IsNotBigintLiteral<void | undefined>,
			IsNotBigintLiteral<void | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<IsNotBigintLiteral<never | 1>, IsNotBigintLiteral<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotBigintLiteral<unknown | 1>, IsNotBigintLiteral<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
