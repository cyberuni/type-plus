import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type HasNoNull, type HasNull, type TuplePlus, testType } from '../index.js'

it('returns true when there is no null', () => {
	testType.equal<HasNoNull<number>, true>(true)
	testType.equal<HasNoNull<1 | 2>, true>(true)
})

it('returns false when there is null', () => {
	testType.equal<HasNoNull<null>, false>(true)
	testType.equal<HasNoNull<null | 1>, false>(true)
})

it('is the inverse of HasNull', () => {
	testType.equal<HasNoNull<any>, HasNull<any, { $then: false; $else: true }>>(true)
	testType.equal<HasNoNull<unknown>, HasNull<unknown, { $then: false; $else: true }>>(true)
	testType.equal<HasNoNull<never>, HasNull<never, { $then: false; $else: true }>>(true)
	testType.equal<HasNoNull<null | 1>, HasNull<null | 1, { $then: false; $else: true }>>(true)
	testType.equal<HasNoNull<1>, HasNull<1, { $then: false; $else: true }>>(true)
})

it('works as filter', () => {
	testType.equal<HasNoNull<number, { selection: 'filter' }>, number>(true)
	testType.equal<HasNoNull<1 | 2, { selection: 'filter' }>, 1 | 2>(true)

	testType.equal<HasNoNull<null, { selection: 'filter' }>, never>(true)
	testType.equal<HasNoNull<null | 1, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<HasNoNull<string, HasNoNull.$Branch>, $Then>(true)
	testType.equal<HasNoNull<null, HasNoNull.$Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<HasNoNull<0, { $then: 1 }>, 1>(true)
	testType.equal<HasNoNull<null | 1, { $then: 1 }>, false>(true)

	testType.equal<HasNoNull<0, { $else: 2 }>, true>(true)
	testType.equal<HasNoNull<null | 1, { $else: 2 }>, 2>(true)
})

it('resolves `HasNoNull.$Default` the same as no options', () => {
	// `HasNoNull.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<HasNoNull<null, HasNoNull.$Default>, HasNoNull<null>>(true)
	testType.equal<HasNoNull<null | 1, HasNoNull.$Default>, HasNoNull<null | 1>>(true)
	testType.equal<HasNoNull<number, HasNoNull.$Default>, HasNoNull<number>>(true)
})

describe('HasNoNull.$Fn', () => {
	it('is HasNoNull as a type function', () => {
		testType.equal<$Fn.Apply<HasNoNull.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<HasNoNull.$Fn, 1 | null>, false>(true)
		testType.equal<TuplePlus.Filter<[1, null | 2], HasNoNull.$Fn>, [1]>(true)
	})
	it('applies its options', () => {
		testType.equal<$Fn.Apply<HasNoNull.$Fn<{ $then: 'yes'; $else: 'no' }>, 1 | null>, 'no'>(true)
	})
})
