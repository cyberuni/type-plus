import { describe, expect, test } from 'vitest'

import type { ANotB, BNotA, IsDisjoint } from '../index.js'

describe('ANotB<A, B>', () => {
	test('same type returns never', () => {
		const actual = { a: 1 } as ANotB<{ a: 1 }, { a: 1 }>
		actual satisfies never
	})

	test('disjoint returns A', () => {
		type A = { a: 1 }
		const actual = { a: 1 } as ANotB<A, { b: 2 }>
		actual satisfies A
	})

	test('remove properties in B from A', () => {
		type A = { a: 1; b: 2; c: 3 }
		type B = { c: 3; d: 4 }
		const actual = { a: 1 } as ANotB<A, B>

		actual satisfies Pick<A, 'a' | 'b'>
		expect(true as IsDisjoint<B, typeof actual> satisfies true).toBe(true)

		const withDiffType = { b: '' } as ANotB<{ a: number; b: string }, { a: number; b: number; c: boolean }>
		withDiffType satisfies { b: string }
	})

	test('same property different type returns the type in A', () => {
		type A = { a: 1 }
		type B = { a: string }
		const actual = { a: 1 } as ANotB<A, B>
		actual satisfies A
	})
})

describe('BNotA<A, B>', () => {
	test('same type returns never', () => {
		const actual = { a: 1 } as BNotA<{ a: 1 }, { a: 1 }>
		actual satisfies never
	})

	test('disjoint returns B', () => {
		type A = { a: 1 }
		type B = { b: 2 }
		const actual = { b: 2 } as BNotA<A, B>
		actual satisfies B
	})

	test('remove properties in A from B', () => {
		type A = { c: 3; d: 4 }
		type B = { a: 1; b: 2; c: 3 }
		const actual = { a: 1 } as BNotA<A, B>

		actual satisfies Pick<B, 'a' | 'b'>
		expect(true as IsDisjoint<A, typeof actual> satisfies true).toBe(true)

		const withDiffType = { b: 0, c: true } as BNotA<{ a: number; b: string }, { a: number; b: number; c: boolean }>
		withDiffType satisfies { b: number; c: boolean }
	})

	test('same property different type returns the type in B', () => {
		type A = { a: 1 }
		type B = { a: string }
		const actual = { a: 'a' } as BNotA<A, B>
		actual satisfies B
	})
})
