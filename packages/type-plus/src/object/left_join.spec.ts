import { describe, it, test } from 'vitest'

import { assertType, type LeftJoin, testType } from '../index.js'

describe('LeftJoin', () => {
	test('same type returns A', () => {
		const actual = {} as LeftJoin<{ a: 1 }, { a: 1 }>
		assertType<{ a: 1 }>(actual)
	})

	test('disjoint returns A & B', () => {
		const actual = {} as LeftJoin<{ a: 1 }, { b: 1 }>
		assertType<{ a: 1; b: 1 }>(actual)
	})

	test('replaces property in A with property in B', () => {
		type Orig = { type: 'a' | 'b'; value: string }
		const actual = {} as LeftJoin<Orig, { value: number }>
		assertType<{ type: 'a' | 'b'; value: number }>(actual)

		// properties only in B are added at the same time
		const withNewProp = {} as LeftJoin<{ a: number; b: string }, { b: number; c: boolean }>
		assertType<{ a: number; b: number; c: boolean }>(withNewProp)
	})

	it('removes extra empty {}', () => {
		testType.equal<LeftJoin<{ leaf: { boo(): number } }, { leaf: { foo(): number } }>, { leaf: { foo(): number } }>(
			true,
		)

		testType.equal<LeftJoin<{ leaf: { boo(): number } }, {}>, { leaf: { boo(): number } }>(true)
	})
})
