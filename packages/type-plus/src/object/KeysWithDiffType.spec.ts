import { test } from 'vitest'

import type { KeysWithDiffType } from '../index.js'

test('disjoint type gets never', () => {
	type A = { a: 1 }
	type B = { b: 2 }
	const actual = 'a' as KeysWithDiffType<A, B>
	actual satisfies never
})

test('key with same type is not included', () => {
	type A = { a: 1 }
	const actual = 'a' as KeysWithDiffType<A, A>
	actual satisfies never
})

test('key with different type is returned', () => {
	type A = { a: 1 }
	type B = { a: 2 }
	const actual = 'a' as KeysWithDiffType<A, B>
	actual satisfies 'a'

	// keys only in B are not included
	const withExtraKey = 'b' as KeysWithDiffType<{ a: number; b: string }, { a: number; b: number; c: boolean }>
	withExtraKey satisfies 'b'
})

test('the comparison runs one way only', () => {
	'a' as KeysWithDiffType<{ a: 1 }, { a: number }> satisfies never
	'a' as KeysWithDiffType<{ a: number }, { a: 1 }> satisfies 'a'
})
