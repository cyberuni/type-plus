import { describe, it, test } from 'vitest'

import { type Assignable, testType } from '../index.js'

describe('Assignable<A, B, { distributive: false }>', () => {
	test('literal type to widen', () => {
		testType.true<Assignable<1, number, { distributive: false }>>(true)
		testType.true<Assignable<1, 1, { distributive: false }>>(true)
		testType.true<Assignable<number, number, { distributive: false }>>(true)
		testType.true<Assignable<'a', string, { distributive: false }>>(true)
		testType.true<Assignable<'a', 'a', { distributive: false }>>(true)
		testType.true<Assignable<string, string, { distributive: false }>>(true)
		testType.true<Assignable<false, boolean, { distributive: false }>>(true)
		testType.true<Assignable<true, boolean, { distributive: false }>>(true)
		testType.true<Assignable<boolean, boolean, { distributive: false }>>(true)
	})
	test('base type to literal type fails', () => {
		testType.false<Assignable<number, 1, { distributive: false }>>(true)
		testType.false<Assignable<string, 'a', { distributive: false }>>(true)
		testType.false<Assignable<true, false, { distributive: false }>>(true)
		testType.false<Assignable<false, true, { distributive: false }>>(true)
		testType.false<Assignable<boolean, false, { distributive: false }>>(true)
		testType.false<Assignable<boolean, true, { distributive: false }>>(true)
	})
	test('super set to sub set', () => {
		testType.true<Assignable<{ a: string; b: number }, { a: string }, { distributive: false }>>(true)
	})
	test('sub set to super set fail', () => {
		testType.false<Assignable<{ a: string }, { a: string; b: number }, { distributive: false }>>(true)
	})

	it('union types checks against all branches', () => {
		testType.true<Assignable<number | string, number | string, { distributive: false }>>(true)
		testType.true<Assignable<(number & { a: 1 }) | (string & { a: 1 }), number | string, { distributive: false }>>(true)

		testType.false<Assignable<number | string, number, { distributive: false }>>(true)
	})

	it('follows TypeScript for the special types', () => {
		// `any` assigns to everything but `never`, and everything assigns to `any`.
		testType.equal<Assignable<any, number, { distributive: false }>, true>(true)
		testType.equal<Assignable<number, any, { distributive: false }>, true>(true)
		testType.equal<Assignable<any, never, { distributive: false }>, false>(true)

		// `unknown` is the top type.
		testType.equal<Assignable<number, unknown, { distributive: false }>, true>(true)
		testType.equal<Assignable<unknown, number, { distributive: false }>, false>(true)
		testType.equal<Assignable<unknown, never, { distributive: false }>, false>(true)

		// `never` is the bottom type.
		testType.equal<Assignable<never, number, { distributive: false }>, true>(true)
		testType.equal<Assignable<number, never, { distributive: false }>, false>(true)
		testType.equal<Assignable<never, never, { distributive: false }>, true>(true)

		testType.equal<Assignable<any, any, { distributive: false }>, true>(true)
		testType.equal<Assignable<unknown, unknown, { distributive: false }>, true>(true)
		testType.equal<Assignable<never, any, { distributive: false }>, true>(true)
		testType.equal<Assignable<never, unknown, { distributive: false }>, true>(true)
	})

	it('answers unknown-like unions such as `{} | null | undefined` structurally', () => {
		testType.equal<Assignable<unknown, {} | null | undefined, { distributive: false }>, true>(true)
		testType.equal<Assignable<unknown, object | null | undefined, { distributive: false }>, false>(true)
		testType.equal<Assignable<{} | null | undefined, object | null | undefined, { distributive: false }>, true>(true)
	})

	it('treats `void` as an ordinary type', () => {
		testType.equal<Assignable<undefined, void, { distributive: false }>, true>(true)
		testType.equal<Assignable<number, void, { distributive: false }>, false>(true)
		testType.equal<Assignable<void, void, { distributive: false }>, true>(true)
		testType.equal<Assignable<void, undefined, { distributive: false }>, false>(true)
	})
})
