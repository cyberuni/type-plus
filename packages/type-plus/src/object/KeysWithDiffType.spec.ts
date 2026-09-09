import { test } from 'vitest'

import { assertType, type KeysWithDiffType } from '../index.js'

test('disjoint type gets never', () => {
	type A = { a: 1 }
	type B = { b: 2 }
	const actual = 'a' as KeysWithDiffType<A, B>
	assertType<never>(actual)
})

test('key with same type is not included', () => {
	type A = { a: 1 }
	const actual = 'a' as KeysWithDiffType<A, A>
	assertType<never>(actual)
})

test('key with different type is returned', () => {
	type A = { a: 1 }
	type B = { a: 2 }
	const actual = 'a' as KeysWithDiffType<A, B>
	assertType<'a'>(actual)

	// keys only in B are not included
	const withExtraKey = 'b' as KeysWithDiffType<{ a: number; b: string }, { a: number; b: number; c: boolean }>
	assertType<'b'>(withExtraKey)
})

test('the comparison runs one way only', () => {
	assertType<never>('a' as KeysWithDiffType<{ a: 1 }, { a: number }>)
	assertType<'a'>('a' as KeysWithDiffType<{ a: number }, { a: 1 }>)
})
