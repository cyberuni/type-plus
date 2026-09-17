import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsTrue, testType } from '../index.js'

it('returns true if T is true', () => {
	testType.equal<IsTrue<true>, true>(true)
})

it('returns boolean if T is boolean because it is distributive by default', () => {
	testType.equal<IsTrue<boolean>, boolean>(true)
	testType.equal<IsTrue<boolean, { distributive: false }>, false>(true)
})

it('returns false if T is false', () => {
	testType.equal<IsTrue<false>, false>(true)
})

it('returns false for special types', () => {
	testType.equal<IsTrue<void>, false>(true)
	testType.equal<IsTrue<unknown>, false>(true)
	testType.equal<IsTrue<any>, false>(true)
	testType.equal<IsTrue<never>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsTrue<undefined>, false>(true)
	testType.equal<IsTrue<null>, false>(true)
	testType.equal<IsTrue<number>, false>(true)
	testType.equal<IsTrue<1>, false>(true)
	testType.equal<IsTrue<false>, false>(true)
	testType.equal<IsTrue<string>, false>(true)
	testType.equal<IsTrue<''>, false>(true)
	testType.equal<IsTrue<symbol>, false>(true)
	testType.equal<IsTrue<bigint>, false>(true)
	testType.equal<IsTrue<1n>, false>(true)
	testType.equal<IsTrue<{}>, false>(true)
	testType.equal<IsTrue<{ a: 1 }>, false>(true)
	testType.equal<IsTrue<string[]>, false>(true)
	testType.equal<IsTrue<[]>, false>(true)
	testType.equal<IsTrue<Function>, false>(true)
	testType.equal<IsTrue<() => void>, false>(true)
})

it('distributes over union type', () => {
	testType.equal<IsTrue<true | 1>, boolean>(true)
	testType.equal<IsTrue<boolean | 1>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsTrue<true | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsTrue<true & { a: 1 }>, true>(true)
})

it('works as filter', () => {
	testType.equal<IsTrue<true, { selection: 'filter' }>, true>(true)
	testType.equal<IsTrue<false, { selection: 'filter' }>, never>(true)
	testType.equal<IsTrue<boolean, { selection: 'filter' }>, true>(true)
	testType.equal<IsTrue<boolean, { selection: 'filter'; distributive: false }>, never>(true)

	testType.equal<IsTrue<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsTrue<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsTrue<string | true, { selection: 'filter' }>, true>(true)

	testType.equal<IsTrue<string | false, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsTrue<true, IsTrue.$Branch>, $Then>(true)

	testType.equal<IsTrue<any, IsTrue.$Branch>, $Else>(true)
	testType.equal<IsTrue<unknown, IsTrue.$Branch>, $Else>(true)
	testType.equal<IsTrue<never, IsTrue.$Branch>, $Else>(true)
	testType.equal<IsTrue<void, IsTrue.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsTrue<any>, false>(true)
	testType.equal<IsTrue<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsTrue<unknown>, false>(true)
	testType.equal<IsTrue<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsTrue<never>, false>(true)
	testType.equal<IsTrue<never, { $never: unknown }>, unknown>(true)
})

describe('IsTrue.$Fn', () => {
	it('is IsTrue as a type function', () => {
		testType.equal<$Fn.Apply<IsTrue.$Fn, true>, true>(true)
		testType.equal<$Fn.Apply<IsTrue.$Fn, false>, false>(true)
	})
})
