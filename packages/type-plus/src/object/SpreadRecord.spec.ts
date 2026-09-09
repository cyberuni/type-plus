import { test } from 'vitest'

import { type SpreadRecord, testType } from '../index.js'

test('records are combined as intersection', () => {
	type S = SpreadRecord<{ a: number }, { b: string }>
	testType.equal<S, { a: number } & { b: string }>(true)
})

test('Property in B overrides A', () => {
	type A = { a: number }
	type B = { a: string; b: string }
	type S = SpreadRecord<A, B>

	testType.equal<S, { a: string; b: string }>(true)

	// properties only in A survive
	testType.equal<
		SpreadRecord<{ a: number; b: string }, { b: boolean; c: number }>,
		{ a: number; b: boolean; c: number }
	>(true)
})
