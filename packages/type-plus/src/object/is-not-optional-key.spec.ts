import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotOptionalKey, type TuplePlus, testType } from '../index.js'

it('returns true for a required key', () => {
	testType.true<IsNotOptionalKey<{ a: 1 }, 'a'>>(true)
	testType.true<IsNotOptionalKey<{ a: number; b?: number }, 'a'>>(true)
})

it('returns true for a key T does not have', () => {
	testType.true<IsNotOptionalKey<{ a: 1 }, 'b'>>(true)
})

it('returns false for an optional key', () => {
	testType.false<IsNotOptionalKey<{ a?: 1 }, 'a'>>(true)
	testType.false<IsNotOptionalKey<{ a?: number; b: number }, 'a'>>(true)
})

it('works with union type', () => {
	type X = { a?: string; b: string } | { c: string; d?: string }

	testType.false<IsNotOptionalKey<X, 'a'>>(true)
	testType.true<IsNotOptionalKey<X, 'b'>>(true)
	testType.true<IsNotOptionalKey<X, 'c'>>(true)
	testType.false<IsNotOptionalKey<X, 'd'>>(true)
})

it('can override the branches', () => {
	testType.equal<IsNotOptionalKey<{ a?: number; b: number }, 'b', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<IsNotOptionalKey<{ a?: number; b: number }, 'a', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('resolves `IsNotOptionalKey.$Default` the same as no options', () => {
	// `IsNotOptionalKey.$Default` documents the default; the type never reads it, so pin the two together.
	type X = { a: 1; b?: 2 }
	testType.equal<IsNotOptionalKey<X, 'a', IsNotOptionalKey.$Default>, IsNotOptionalKey<X, 'a'>>(true)
	testType.equal<IsNotOptionalKey<X, 'b', IsNotOptionalKey.$Default>, IsNotOptionalKey<X, 'b'>>(true)
	testType.equal<IsNotOptionalKey<X, 'c', IsNotOptionalKey.$Default>, IsNotOptionalKey<X, 'c'>>(true)
	testType.equal<IsNotOptionalKey<X, 'a' | 'b' | 'c', IsNotOptionalKey.$Default>, IsNotOptionalKey<X, 'a' | 'b' | 'c'>>(
		true,
	)
})

it('works as filter', () => {
	testType.equal<IsNotOptionalKey<{ a?: 1; b: 2 }, 'a' | 'b', { selection: 'filter' }>, 'b'>(true)
	testType.equal<IsNotOptionalKey<{ a?: number; b: number }, 'a', { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotOptionalKey<{ a: 1 }, 'a', IsNotOptionalKey.$Branch>, $Then>(true)
	testType.equal<IsNotOptionalKey<{ a?: 1 }, 'a', IsNotOptionalKey.$Branch>, $Else>(true)
})

describe('IsNotOptionalKey.$Fn', () => {
	it('is IsNotOptionalKey as a type function', () => {
		testType.equal<$Fn.Apply<IsNotOptionalKey.$Fn<'a'>, { a: 1 }>, true>(true)
		testType.equal<$Fn.Apply<IsNotOptionalKey.$Fn<'a'>, { a?: 1 }>, false>(true)
		testType.equal<TuplePlus.Filter<[{ a?: 1 }, { a: 1 }], IsNotOptionalKey.$Fn<'a'>>, [{ a: 1 }]>(true)
	})
	it('applies its options', () => {
		testType.equal<$Fn.Apply<IsNotOptionalKey.$Fn<'a', { $then: 'yes'; $else: 'no' }>, { a?: 1 }>, 'no'>(true)
	})
})
