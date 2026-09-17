import { it } from 'vitest'

import { type $Else, type $Then, type HasVoid, testType } from '../index.js'

it('returns false when there is no void', () => {
	testType.equal<HasVoid<1 | 2>, false>(true)
})

it('returns true when there is void', () => {
	testType.equal<HasVoid<void>, true>(true)
	testType.equal<HasVoid<void | 1>, true>(true)
})

it('works as filter', () => {
	testType.equal<HasVoid<void, { selection: 'filter' }>, void>(true)
	testType.equal<HasVoid<void | 1, { selection: 'filter' }>, void | 1>(true)

	testType.equal<HasVoid<number, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<HasVoid<void, HasVoid.$Branch>, $Then>(true)
	testType.equal<HasVoid<number, HasVoid.$Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<HasVoid<void | 1, { $then: 1 }>, 1>(true)
	testType.equal<HasVoid<0, { $then: 1 }>, false>(true)

	testType.equal<HasVoid<void | 1, { $else: 2 }>, true>(true)
	testType.equal<HasVoid<0, { $else: 2 }>, 2>(true)
})

it('resolves `HasVoid.$Default` the same as no options', () => {
	// `HasVoid.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<HasVoid<void, HasVoid.$Default>, HasVoid<void>>(true)
	testType.equal<HasVoid<void | 1, HasVoid.$Default>, HasVoid<void | 1>>(true)
	testType.equal<HasVoid<number, HasVoid.$Default>, HasVoid<number>>(true)
})
