import { describe, it } from 'vitest'

import {
	type $Else,
	type $Fn,
	type $Then,
	type HasNoUndefined,
	type HasUndefined,
	type TuplePlus,
	testType,
} from '../index.js'

it('returns true when there is no undefined', () => {
	testType.equal<HasNoUndefined<number>, true>(true)
	testType.equal<HasNoUndefined<1 | 2>, true>(true)
})

it('returns false when there is undefined', () => {
	testType.equal<HasNoUndefined<undefined>, false>(true)
	testType.equal<HasNoUndefined<undefined | 1>, false>(true)
})

it('is the inverse of HasUndefined', () => {
	testType.equal<HasNoUndefined<any>, HasUndefined<any, { $then: false; $else: true }>>(true)
	testType.equal<HasNoUndefined<unknown>, HasUndefined<unknown, { $then: false; $else: true }>>(true)
	testType.equal<HasNoUndefined<never>, HasUndefined<never, { $then: false; $else: true }>>(true)
	testType.equal<HasNoUndefined<undefined | 1>, HasUndefined<undefined | 1, { $then: false; $else: true }>>(true)
	testType.equal<HasNoUndefined<1>, HasUndefined<1, { $then: false; $else: true }>>(true)
})

it('works as filter', () => {
	testType.equal<HasNoUndefined<number, { selection: 'filter' }>, number>(true)
	testType.equal<HasNoUndefined<1 | 2, { selection: 'filter' }>, 1 | 2>(true)

	testType.equal<HasNoUndefined<undefined, { selection: 'filter' }>, never>(true)
	testType.equal<HasNoUndefined<undefined | 1, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<HasNoUndefined<string, HasNoUndefined.$Branch>, $Then>(true)
	testType.equal<HasNoUndefined<undefined, HasNoUndefined.$Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<HasNoUndefined<0, { $then: 1 }>, 1>(true)
	testType.equal<HasNoUndefined<undefined | 1, { $then: 1 }>, false>(true)

	testType.equal<HasNoUndefined<0, { $else: 2 }>, true>(true)
	testType.equal<HasNoUndefined<undefined | 1, { $else: 2 }>, 2>(true)
})

it('resolves `HasNoUndefined.$Default` the same as no options', () => {
	// `HasNoUndefined.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<HasNoUndefined<undefined, HasNoUndefined.$Default>, HasNoUndefined<undefined>>(true)
	testType.equal<HasNoUndefined<undefined | 1, HasNoUndefined.$Default>, HasNoUndefined<undefined | 1>>(true)
	testType.equal<HasNoUndefined<number, HasNoUndefined.$Default>, HasNoUndefined<number>>(true)
})

describe('HasNoUndefined.$Fn', () => {
	it('is HasNoUndefined as a type function', () => {
		testType.equal<$Fn.Apply<HasNoUndefined.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<HasNoUndefined.$Fn, 1 | undefined>, false>(true)
		testType.equal<TuplePlus.Filter<[1, undefined | 2], HasNoUndefined.$Fn>, [1]>(true)
	})
	it('applies its options', () => {
		testType.equal<$Fn.Apply<HasNoUndefined.$Fn<{ $then: 'yes'; $else: 'no' }>, 1 | undefined>, 'no'>(true)
	})
})
