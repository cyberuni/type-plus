import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotUnion, type IsUnion, testType } from '../index.js'

it('returns true for non-union', () => {
	testType.equal<IsNotUnion<any>, true>(true)
	testType.equal<IsNotUnion<unknown>, true>(true)
	testType.equal<IsNotUnion<void>, true>(true)
	testType.equal<IsNotUnion<never>, true>(true)

	testType.equal<IsNotUnion<undefined>, true>(true)
	testType.equal<IsNotUnion<null>, true>(true)
	testType.equal<IsNotUnion<true>, true>(true)
	testType.equal<IsNotUnion<number>, true>(true)
	testType.equal<IsNotUnion<'a'>, true>(true)
	testType.equal<IsNotUnion<{ a: 1 }>, true>(true)
	testType.equal<IsNotUnion<string[]>, true>(true)
	testType.equal<IsNotUnion<() => void>, true>(true)
})

it('returns false for boolean as it is a union of true | false', () => {
	testType.equal<IsNotUnion<boolean>, false>(true)
})

it('returns false for union type', () => {
	testType.equal<IsNotUnion<number | string>, false>(true)
	testType.equal<IsNotUnion<'a' | 'b'>, false>(true)
})

it('is the inverse of IsUnion', () => {
	testType.equal<IsNotUnion<1 | 2>, IsUnion<1 | 2, { $then: false; $else: true }>>(true)
	testType.equal<IsNotUnion<1>, IsUnion<1, { $then: false; $else: true }>>(true)
})

it('can override the branches', () => {
	testType.equal<IsNotUnion<number, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsNotUnion<boolean, { $then: 1; $else: 2 }>, 2>(true)
})

it('resolves `IsNotUnion.$Default` the same as no options', () => {
	// `IsNotUnion.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotUnion<any, IsNotUnion.$Default>, IsNotUnion<any>>(true)
	testType.equal<IsNotUnion<never, IsNotUnion.$Default>, IsNotUnion<never>>(true)
	testType.equal<IsNotUnion<1, IsNotUnion.$Default>, IsNotUnion<1>>(true)
	testType.equal<IsNotUnion<boolean, IsNotUnion.$Default>, IsNotUnion<boolean>>(true)
	testType.equal<IsNotUnion<1 | 2, IsNotUnion.$Default>, IsNotUnion<1 | 2>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotUnion<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotUnion<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsNotUnion<never, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotUnion<'a' | 'b', { selection: 'filter' }>, never>(true)
	testType.equal<IsNotUnion<boolean, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotUnion<number, IsNotUnion.$Branch>, $Then>(true)
	testType.equal<IsNotUnion<never, IsNotUnion.$Branch>, $Then>(true)
	testType.equal<IsNotUnion<'a' | 'b', IsNotUnion.$Branch>, $Else>(true)
})

it('exposes the util as IsNotUnion.$', () => {
	testType.equal<IsNotUnion.$<number, {}>, true>(true)
	testType.equal<IsNotUnion.$<'a' | 'b', {}>, false>(true)
	testType.equal<IsNotUnion.$<number, { selection: 'filter' }>, number>(true)
})

describe('IsNotUnion.$Fn', () => {
	it('is IsNotUnion as a type function', () => {
		testType.equal<$Fn.Apply<IsNotUnion.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotUnion.$Fn, 1 | 2>, false>(true)
	})
	it('applies its options', () => {
		testType.equal<$Fn.Apply<IsNotUnion.$Fn<{ $then: 'yes'; $else: 'no' }>, 1 | 2>, 'no'>(true)
	})
})
