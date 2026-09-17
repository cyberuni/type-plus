import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type AnyFunction, type IsNotStrictFunction, testType } from '../index.js'

it('returns false if T is Function', () => {
	testType.false<IsNotStrictFunction<Function>>(true)
})

it('returns true if T is function signature', () => {
	testType.true<IsNotStrictFunction<() => void>>(true)
	testType.true<IsNotStrictFunction<AnyFunction>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStrictFunction<void>>(true)
	testType.true<IsNotStrictFunction<unknown>>(true)
	testType.true<IsNotStrictFunction<any>>(true)
	testType.true<IsNotStrictFunction<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStrictFunction<undefined>>(true)
	testType.true<IsNotStrictFunction<null>>(true)
	testType.true<IsNotStrictFunction<boolean>>(true)
	testType.true<IsNotStrictFunction<true>>(true)
	testType.true<IsNotStrictFunction<false>>(true)
	testType.true<IsNotStrictFunction<number>>(true)
	testType.true<IsNotStrictFunction<1>>(true)
	testType.true<IsNotStrictFunction<string>>(true)
	testType.true<IsNotStrictFunction<''>>(true)
	testType.true<IsNotStrictFunction<symbol>>(true)
	testType.true<IsNotStrictFunction<bigint>>(true)
	testType.true<IsNotStrictFunction<1n>>(true)
	testType.true<IsNotStrictFunction<{}>>(true)
	testType.true<IsNotStrictFunction<{ a: 1 }>>(true)
	testType.true<IsNotStrictFunction<string[]>>(true)
	testType.true<IsNotStrictFunction<[]>>(true)
})

it('distributes over union type', () => {
	testType.equal<Function | { a: 1 }, Function | { a: 1 }>(true)
	// `false | true` -> `boolean`
	testType.equal<IsNotStrictFunction<Function | { a: 1 }>, boolean>(true)
	// `true | true` -> `true`
	testType.equal<IsNotStrictFunction<(() => void) | { a: 1 }>, true>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotStrictFunction<Function | string, { distributive: false }>, true>(true)
})

it('returns true if T is function overloads', () => {
	testType.true<IsNotStrictFunction<() => void>>(true)
	testType.true<IsNotStrictFunction<{ (): void; (x: number): number }>>(true)
})

it('returns true if T is function overloads', () => {
	testType.true<IsNotStrictFunction<{ (): void; (x: number): number }>>(true)
})

it('returns false if T is intersection of function', () => {
	testType.false<IsNotStrictFunction<Function & { a: 1 }>>(true)
})

it('returns true for intersection type', () => {
	// `Function & { a: 1 }` is considered as strict Function
	testType.equal<IsNotStrictFunction<Function & { a: 1 }>, false>(true)
})

it('resolves `IsNotStrictFunction.$Default` the same as no options', () => {
	// `IsNotStrictFunction.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotStrictFunction<any, IsNotStrictFunction.$Default>, IsNotStrictFunction<any>>(true)
	testType.equal<IsNotStrictFunction<unknown, IsNotStrictFunction.$Default>, IsNotStrictFunction<unknown>>(true)
	testType.equal<IsNotStrictFunction<never, IsNotStrictFunction.$Default>, IsNotStrictFunction<never>>(true)
	testType.equal<IsNotStrictFunction<void, IsNotStrictFunction.$Default>, IsNotStrictFunction<void>>(true)
	testType.equal<IsNotStrictFunction<Function, IsNotStrictFunction.$Default>, IsNotStrictFunction<Function>>(true)
	testType.equal<IsNotStrictFunction<() => void, IsNotStrictFunction.$Default>, IsNotStrictFunction<() => void>>(true)
	testType.equal<IsNotStrictFunction<string, IsNotStrictFunction.$Default>, IsNotStrictFunction<string>>(true)
	testType.equal<
		IsNotStrictFunction<Function | string, IsNotStrictFunction.$Default>,
		IsNotStrictFunction<Function | string>
	>(true)
	testType.equal<
		IsNotStrictFunction<Function & { a: 1 }, IsNotStrictFunction.$Default>,
		IsNotStrictFunction<Function & { a: 1 }>
	>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStrictFunction<Function, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictFunction<() => void, { selection: 'filter' }>, () => void>(true)

	testType.equal<IsNotStrictFunction<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStrictFunction<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStrictFunction<Function | number, { selection: 'filter' }>, number>(true)
	testType.equal<
		IsNotStrictFunction<Function | number, { selection: 'filter'; distributive: false }>,
		Function | number
	>(true)

	testType.equal<IsNotStrictFunction<Function | true, { selection: 'filter' }>, true>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStrictFunction<Function, IsNotStrictFunction.$Branch>, $Else>(true)
	testType.equal<IsNotStrictFunction<() => void, IsNotStrictFunction.$Branch>, $Then>(true)

	testType.equal<IsNotStrictFunction<any, IsNotStrictFunction.$Branch>, $Then>(true)
	testType.equal<IsNotStrictFunction<unknown, IsNotStrictFunction.$Branch>, $Then>(true)
	testType.equal<IsNotStrictFunction<never, IsNotStrictFunction.$Branch>, $Then>(true)
	testType.equal<IsNotStrictFunction<void, IsNotStrictFunction.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotStrictFunction<any>, true>(true)
	testType.equal<IsNotStrictFunction<any, { $any: unknown }>, unknown>(true)
})

it('can override $void branch', () => {
	testType.equal<IsNotStrictFunction<void>, true>(true)
	testType.equal<IsNotStrictFunction<void, { $void: unknown }>, unknown>(true)
	testType.equal<IsNotStrictFunction<void, { $void: 123 }>, 123>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotStrictFunction<unknown>, true>(true)
	testType.equal<IsNotStrictFunction<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotStrictFunction<never>, true>(true)
	testType.equal<IsNotStrictFunction<never, { $never: unknown }>, unknown>(true)
})

describe('IsNotStrictFunction.$Fn', () => {
	it('is IsNotStrictFunction as a type function', () => {
		testType.equal<$Fn.Apply<IsNotStrictFunction.$Fn, () => void>, true>(true)
		testType.equal<$Fn.Apply<IsNotStrictFunction.$Fn, Function>, false>(true)
	})
})
