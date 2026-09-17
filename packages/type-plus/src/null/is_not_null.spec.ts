import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotNull, testType } from '../index.js'

it('returns false for null', () => {
	testType.false<IsNotNull<null>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotNull<any>>(true)
	testType.true<IsNotNull<unknown>>(true)
	testType.true<IsNotNull<void>>(true)
	testType.true<IsNotNull<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotNull<undefined>>(true)
	testType.true<IsNotNull<boolean>>(true)
	testType.true<IsNotNull<true>>(true)
	testType.true<IsNotNull<false>>(true)
	testType.true<IsNotNull<number>>(true)
	testType.true<IsNotNull<1>>(true)
	testType.true<IsNotNull<string>>(true)
	testType.true<IsNotNull<''>>(true)
	testType.true<IsNotNull<symbol>>(true)
	testType.true<IsNotNull<bigint>>(true)
	testType.true<IsNotNull<{}>>(true)
	testType.true<IsNotNull<string[]>>(true)
	testType.true<IsNotNull<[]>>(true)
	testType.true<IsNotNull<Function>>(true)
	testType.true<IsNotNull<() => void>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotNull<null, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotNull<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNull<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotNull<string | boolean, { selection: 'filter' }>, string | boolean>(true)

	testType.equal<IsNotNull<string | null, { selection: 'filter' }>, string>(true)
})

it('can disable union distribution', () => {
	testType.true<IsNotNull<null | 1, { distributive: false }>>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotNull<null, IsNotNull.$Branch>, $Else>(true)

	testType.equal<IsNotNull<any, IsNotNull.$Branch>, $Then>(true)
	testType.equal<IsNotNull<unknown, IsNotNull.$Branch>, $Then>(true)
	testType.equal<IsNotNull<never, IsNotNull.$Branch>, $Then>(true)
	testType.equal<IsNotNull<void, IsNotNull.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotNull<any>, true>(true)
	testType.equal<IsNotNull<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotNull<unknown>, true>(true)
	testType.equal<IsNotNull<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotNull<never>, true>(true)
	testType.equal<IsNotNull<never, { $never: unknown }>, unknown>(true)
})

describe('IsNotNull.$Fn', () => {
	it('is IsNotNull as a type function', () => {
		testType.equal<$Fn.Apply<IsNotNull.$Fn, undefined>, true>(true)
		testType.equal<$Fn.Apply<IsNotNull.$Fn, null>, false>(true)
	})
})
