import { describe, it, test } from 'vitest'

import { type LeftJoin, testType } from '../index.js'

describe('LeftJoin', () => {
	test('same type returns A', () => {
		const actual = {} as LeftJoin<{ a: 1 }, { a: 1 }>
		actual satisfies { a: 1 }
	})

	test('disjoint returns A & B', () => {
		const actual = {} as LeftJoin<{ a: 1 }, { b: 1 }>
		actual satisfies { a: 1; b: 1 }
	})

	test('replaces property in A with property in B', () => {
		type Orig = { type: 'a' | 'b'; value: string }
		const actual = {} as LeftJoin<Orig, { value: number }>
		actual satisfies { type: 'a' | 'b'; value: number }

		// properties only in B are added at the same time
		const withNewProp = {} as LeftJoin<{ a: number; b: string }, { b: number; c: boolean }>
		withNewProp satisfies { a: number; b: number; c: boolean }
	})

	it('keeps optional and readonly modifiers of A on keys B does not redeclare', () => {
		testType.equal<LeftJoin<{ a?: number; b?: string }, { b: boolean }>, { a?: number; b: boolean }>(true)
		testType.equal<LeftJoin<{ readonly a: number; b: string }, { b: boolean }>, { readonly a: number; b: boolean }>(
			true,
		)
		testType.equal<
			LeftJoin<{ a?: number; readonly b: string; c: 1 }, { c: 2 }>,
			{ a?: number; readonly b: string; c: 2 }
		>(true)
	})

	it('keeps optional and readonly modifiers of B', () => {
		testType.equal<LeftJoin<{ a: 1; b: 1 }, { b?: 2; readonly c: 3 }>, { a: 1; b?: 2; readonly c: 3 }>(true)
	})

	it('takes the modifiers of B on a collision', () => {
		testType.equal<LeftJoin<{ a?: number; readonly b: string }, { a: string; b?: number }>, { a: string; b?: number }>(
			true,
		)
	})

	it('keeps modifiers in the short-circuits', () => {
		testType.equal<LeftJoin<{ a?: 1; readonly b: 2 }, { a?: 1; readonly b: 2 }>, { a?: 1; readonly b: 2 }>(true)
		testType.equal<LeftJoin<{ a?: 1 }, { readonly b: 2 }>, { a?: 1 } & { readonly b: 2 }>(true)
	})

	it('removes extra empty {}', () => {
		testType.equal<LeftJoin<{ leaf: { boo(): number } }, { leaf: { foo(): number } }>, { leaf: { foo(): number } }>(
			true,
		)

		testType.equal<LeftJoin<{ leaf: { boo(): number } }, {}>, { leaf: { boo(): number } }>(true)
	})
})
