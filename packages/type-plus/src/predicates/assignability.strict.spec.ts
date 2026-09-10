import { describe, it, test } from 'vitest'

import { type StrictCanAssign, testType } from '../index.js'

describe('StrictCanAssign<A, B>', () => {
	test('literal type to widen', () => {
		testType.true<StrictCanAssign<1, number>>(true)
		testType.true<StrictCanAssign<1, 1>>(true)
		testType.true<StrictCanAssign<number, number>>(true)
		testType.true<StrictCanAssign<'a', string>>(true)
		testType.true<StrictCanAssign<'a', 'a'>>(true)
		testType.true<StrictCanAssign<string, string>>(true)
		testType.true<StrictCanAssign<false, boolean>>(true)
		testType.true<StrictCanAssign<true, boolean>>(true)
		testType.true<StrictCanAssign<boolean, boolean>>(true)
	})
	test('base type to literal type fails', () => {
		testType.false<StrictCanAssign<number, 1>>(true)
		testType.false<StrictCanAssign<string, 'a'>>(true)
		testType.false<StrictCanAssign<true, false>>(true)
		testType.false<StrictCanAssign<false, true>>(true)
		testType.false<StrictCanAssign<boolean, false>>(true)
		testType.false<StrictCanAssign<boolean, true>>(true)
	})
	test('super set to sub set', () => {
		testType.true<StrictCanAssign<{ a: string; b: number }, { a: string }>>(true)
	})
	test('sub set to super set fail', () => {
		testType.false<StrictCanAssign<{ a: string }, { a: string; b: number }>>(true)
	})

	it('union types checks against all branches', () => {
		testType.true<StrictCanAssign<number | string, number | string>>(true)
		testType.true<StrictCanAssign<(number & { a: 1 }) | (string & { a: 1 }), number | string>>(true)

		testType.false<StrictCanAssign<number | string, number>>(true)
	})

	it('follows TypeScript for the special types', () => {
		// `any` assigns to everything but `never`, and everything assigns to `any`.
		testType.equal<StrictCanAssign<any, number>, true>(true)
		testType.equal<StrictCanAssign<number, any>, true>(true)
		testType.equal<StrictCanAssign<any, never>, false>(true)

		// `unknown` is the top type.
		testType.equal<StrictCanAssign<number, unknown>, true>(true)
		testType.equal<StrictCanAssign<unknown, number>, false>(true)
		testType.equal<StrictCanAssign<unknown, never>, false>(true)

		// `never` is the bottom type.
		testType.equal<StrictCanAssign<never, number>, true>(true)
		testType.equal<StrictCanAssign<number, never>, false>(true)
		testType.equal<StrictCanAssign<never, never>, true>(true)

		testType.equal<StrictCanAssign<any, any>, true>(true)
		testType.equal<StrictCanAssign<unknown, unknown>, true>(true)
		testType.equal<StrictCanAssign<never, any>, true>(true)
		testType.equal<StrictCanAssign<never, unknown>, true>(true)
	})

	it('treats `void` as an ordinary type', () => {
		testType.equal<StrictCanAssign<undefined, void>, true>(true)
		testType.equal<StrictCanAssign<number, void>, false>(true)
		testType.equal<StrictCanAssign<void, void>, true>(true)
		testType.equal<StrictCanAssign<void, undefined>, false>(true)
	})
})
