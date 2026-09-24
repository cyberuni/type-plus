import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type HasNoKey, type TuplePlus, testType } from '../index.js'

/* eslint-disable @typescript-eslint/ban-types */

it('returns true when K is not a key of T', () => {
	testType.true<HasNoKey<{ a: 1 }, 'b'>>(true)
	testType.true<HasNoKey<{}, 'a'>>(true)
})

it('returns false when K is a key of T', () => {
	testType.false<HasNoKey<{ a: 1 }, 'a'>>(true)
	testType.false<HasNoKey<{ a?: 1 }, 'a'>>(true)
})

it('distributes over K', () => {
	testType.equal<HasNoKey<{ a: 1 }, 'a' | 'b'>, boolean>(true)
})

it('can override the branches', () => {
	testType.equal<HasNoKey<{ a: 1 }, 'b', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<HasNoKey<{ a: 1 }, 'a', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('resolves `HasNoKey.$Default` the same as no options', () => {
	// `HasNoKey.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<HasNoKey<{ a: 1 }, 'a', HasNoKey.$Default>, HasNoKey<{ a: 1 }, 'a'>>(true)
	testType.equal<HasNoKey<{ a: 1 }, 'b', HasNoKey.$Default>, HasNoKey<{ a: 1 }, 'b'>>(true)
	testType.equal<HasNoKey<{ a: 1 }, 'a' | 'b', HasNoKey.$Default>, HasNoKey<{ a: 1 }, 'a' | 'b'>>(true)
})

it('works as filter', () => {
	testType.equal<HasNoKey<{ a: 1; b: 2 }, 'a' | 'c', { selection: 'filter' }>, 'c'>(true)
	testType.equal<HasNoKey<{ a: 1 }, 'a', { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<HasNoKey<{ a: 1 }, 'b', HasNoKey.$Branch>, $Then>(true)
	testType.equal<HasNoKey<{ a: 1 }, 'a', HasNoKey.$Branch>, $Else>(true)
})

describe('HasNoKey.$Fn', () => {
	it('is HasNoKey as a type function', () => {
		testType.equal<$Fn.Apply<HasNoKey.$Fn<'a'>, {}>, true>(true)
		testType.equal<$Fn.Apply<HasNoKey.$Fn<'a'>, { a: 1 }>, false>(true)
		testType.equal<TuplePlus.Filter<[{ a: 1 }, {}], HasNoKey.$Fn<'a'>>, [{}]>(true)
	})
	it('applies its options', () => {
		testType.equal<$Fn.Apply<HasNoKey.$Fn<'a', { $then: 'yes'; $else: 'no' }>, { a: 1 }>, 'no'>(true)
	})
})
