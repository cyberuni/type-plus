import { it } from 'vitest'

import { testType } from '../index.js'

it('can be used with expected value', () => {
	testType.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 2 }>(true)

	// @ts-expect-error
	testType.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 2 }>(false)
})

it('returns value as type A for inspection', () => {
	// the actual value is meaningless as it is not passed in.
	// it is used to hold type `A` for inspection.
	const t = testType.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 2 }>(true)
	type RT = typeof t
	testType.equal<{ b: 2 }, RT>(true)

	// @ts-expect-error
	const f = testType.equal<Omit<{ a: 1; b: 2 }, 'a'>, { b: 3 }>(true)
	type RF = typeof f
	testType.equal<{ b: 2 }, RF>(true)
})

it('compares intersection types', () => {
	testType.equal<Omit<{ a: 1; b: 2 }, 'a'> & { c: 3 }, { b: 2; c: 3 }>(true)
})

it('compares 3 types', () => {
	testType.equal<1, 1, 1>(true)
})
