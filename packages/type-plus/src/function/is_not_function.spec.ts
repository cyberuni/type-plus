import { it } from 'vitest'

import { type $Else, type $Then, type AnyFunction, type IsNotFunction, testType } from '../index.js'

it('returns false if T is Function', () => {
	testType.false<IsNotFunction<Function>>(true)
})

it('returns false if T is function signature', () => {
	testType.false<IsNotFunction<() => void>>(true)
	testType.false<IsNotFunction<AnyFunction>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotFunction<void>>(true)
	testType.true<IsNotFunction<unknown>>(true)
	testType.true<IsNotFunction<any>>(true)
	testType.true<IsNotFunction<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotFunction<undefined>>(true)
	testType.true<IsNotFunction<null>>(true)
	testType.true<IsNotFunction<boolean>>(true)
	testType.true<IsNotFunction<true>>(true)
	testType.true<IsNotFunction<false>>(true)
	testType.true<IsNotFunction<number>>(true)
	testType.true<IsNotFunction<1>>(true)
	testType.true<IsNotFunction<string>>(true)
	testType.true<IsNotFunction<''>>(true)
	testType.true<IsNotFunction<symbol>>(true)
	testType.true<IsNotFunction<bigint>>(true)
	testType.true<IsNotFunction<1n>>(true)
	testType.true<IsNotFunction<{}>>(true)
	testType.true<IsNotFunction<{ a: 1 }>>(true)
	testType.true<IsNotFunction<string[]>>(true)
	testType.true<IsNotFunction<[]>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotFunction<Function | string>, boolean>(true)
	testType.equal<IsNotFunction<(() => void) | string>, boolean>(true)
	testType.equal<IsNotFunction<(() => string) | number>, boolean>(true)
})

it('returns false if T is function overloads', () => {
	testType.false<IsNotFunction<{ (): void; (x: number): number }>>(true)
})

it('returns false if T is intersection of function', () => {
	testType.false<IsNotFunction<Function & { a: 1 }>>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotFunction<Function | 1>, boolean>(true)
	testType.equal<IsNotFunction<Function | 1, { distributive: false }>, true>(true)
	testType.true<IsNotFunction<Function | string, { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotFunction<Function, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotFunction<() => boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotFunction<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotFunction<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotFunction<Function | boolean, { selection: 'filter' }>, boolean>(true)

	testType.equal<IsNotFunction<Function | 1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotFunction<(() => string) | number, { selection: 'filter' }>, number>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotFunction<Function, IsNotFunction.$Branch>, $Else>(true)
	testType.equal<IsNotFunction<() => void, IsNotFunction.$Branch>, $Else>(true)

	testType.equal<IsNotFunction<any, IsNotFunction.$Branch>, $Then>(true)
	testType.equal<IsNotFunction<unknown, IsNotFunction.$Branch>, $Then>(true)
	testType.equal<IsNotFunction<never, IsNotFunction.$Branch>, $Then>(true)
	testType.equal<IsNotFunction<string, IsNotFunction.$Branch>, $Then>(true)
	testType.equal<IsNotFunction<void, IsNotFunction.$Branch>, $Then>(true)

	testType.equal<IsNotFunction<Function | 1, IsNotFunction.$Branch>, $Then | $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<IsNotFunction<Function, { $then: 1 }>, false>(true)
	testType.equal<IsNotFunction<0, { $then: 1 }>, 1>(true)

	testType.equal<IsNotFunction<Function, { $else: 2 }>, 2>(true)
	testType.equal<IsNotFunction<0, { $else: 2 }>, true>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotFunction<any>, true>(true)
	testType.equal<IsNotFunction<any, { $any: any }>, any>(true)
	testType.equal<IsNotFunction<any, { $any: 123 }>, 123>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotFunction<unknown>, true>(true)
	testType.equal<IsNotFunction<unknown, { $unknown: unknown }>, unknown>(true)
	testType.equal<IsNotFunction<unknown, { $unknown: 123 }>, 123>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotFunction<never>, true>(true)
	testType.equal<IsNotFunction<never, { $never: unknown }>, unknown>(true)
	testType.equal<IsNotFunction<never, { $never: 123 }>, 123>(true)
})
