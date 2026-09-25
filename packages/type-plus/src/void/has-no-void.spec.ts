import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type HasNoVoid, type HasVoid, type TuplePlus, testType } from '../index.js'

it('returns true when there is no void', () => {
	testType.equal<HasNoVoid<number>, true>(true)
	testType.equal<HasNoVoid<1 | 2>, true>(true)
})

it('returns false when there is void', () => {
	testType.equal<HasNoVoid<void>, false>(true)
	testType.equal<HasNoVoid<void | 1>, false>(true)
})

it('is the inverse of HasVoid', () => {
	testType.equal<HasNoVoid<any>, HasVoid<any, { $then: false; $else: true }>>(true)
	testType.equal<HasNoVoid<unknown>, HasVoid<unknown, { $then: false; $else: true }>>(true)
	testType.equal<HasNoVoid<never>, HasVoid<never, { $then: false; $else: true }>>(true)
	testType.equal<HasNoVoid<void | 1>, HasVoid<void | 1, { $then: false; $else: true }>>(true)
	testType.equal<HasNoVoid<1>, HasVoid<1, { $then: false; $else: true }>>(true)
})

it('works as filter', () => {
	testType.equal<HasNoVoid<number, { selection: 'filter' }>, number>(true)
	testType.equal<HasNoVoid<1 | 2, { selection: 'filter' }>, 1 | 2>(true)

	testType.equal<HasNoVoid<void, { selection: 'filter' }>, never>(true)
	testType.equal<HasNoVoid<void | 1, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<HasNoVoid<string, HasNoVoid.$Branch>, $Then>(true)
	testType.equal<HasNoVoid<void, HasNoVoid.$Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<HasNoVoid<0, { $then: 1 }>, 1>(true)
	testType.equal<HasNoVoid<void | 1, { $then: 1 }>, false>(true)

	testType.equal<HasNoVoid<0, { $else: 2 }>, true>(true)
	testType.equal<HasNoVoid<void | 1, { $else: 2 }>, 2>(true)
})

it('resolves `HasNoVoid.$Default` the same as no options', () => {
	// `HasNoVoid.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<HasNoVoid<void, HasNoVoid.$Default>, HasNoVoid<void>>(true)
	testType.equal<HasNoVoid<void | 1, HasNoVoid.$Default>, HasNoVoid<void | 1>>(true)
	testType.equal<HasNoVoid<number, HasNoVoid.$Default>, HasNoVoid<number>>(true)
})

describe('HasNoVoid.$Fn', () => {
	it('is HasNoVoid as a type function', () => {
		testType.equal<$Fn.Apply<HasNoVoid.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<HasNoVoid.$Fn, 1 | void>, false>(true)
		testType.equal<TuplePlus.Filter<[1, void | 2], HasNoVoid.$Fn>, [1]>(true)
	})
	it('applies its options', () => {
		testType.equal<$Fn.Apply<HasNoVoid.$Fn<{ $then: 'yes'; $else: 'no' }>, 1 | void>, 'no'>(true)
	})
})
