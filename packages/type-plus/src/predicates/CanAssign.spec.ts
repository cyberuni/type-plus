import { describe, expect, it, test } from 'vitest'

import { type CanAssign, canAssign, type IsAssign, testType } from '../index.js'

describe('CanAssign<A, B>', () => {
	test('literal type to widen', () => {
		testType.true<CanAssign<1, number>>(true)
		testType.true<CanAssign<1, 1>>(true)
		testType.true<CanAssign<number, number>>(true)
		testType.true<CanAssign<'a', string>>(true)
		testType.true<CanAssign<'a', 'a'>>(true)
		testType.true<CanAssign<string, string>>(true)
		testType.true<CanAssign<false, boolean>>(true)
		testType.true<CanAssign<true, boolean>>(true)
		testType.true<CanAssign<boolean, boolean>>(true)
	})
	test('base type to literal type fails', () => {
		testType.false<CanAssign<number, 1>>(true)
		testType.false<CanAssign<string, 'a'>>(true)
		testType.false<CanAssign<true, false>>(true)
		testType.false<CanAssign<false, true>>(true)
		testType.false<CanAssign<boolean, false>>(true)
		testType.false<CanAssign<boolean, true>>(true)
	})
	test('super set to sub set', () => {
		testType.true<CanAssign<{ a: string; b: number }, { a: string }>>(true)
	})
	test('sub set to super set fail', () => {
		testType.false<CanAssign<{ a: string }, { a: string; b: number }>>(true)
	})

	it('distributes union types to return boolean if only part of the union is assignable', () => {
		testType.strictBoolean<CanAssign<number | string, number>>(true)
	})
})

describe('IsAssign<A, B>', () => {
	it('is an alias of CanAssign, distributing over a union', () => {
		testType.equal<IsAssign<1, number>, true>(true)
		testType.equal<IsAssign<boolean, boolean>, true>(true)
		testType.equal<IsAssign<number | string, number>, boolean>(true)
	})
})

describe('canAssign()', () => {
	test('always returns true at runtime -- the compile error is the point', () => {
		expect(canAssign<{ a: string }>()({ a: 'a' })).toBe(true)
		expect(canAssign<{ a: string }>()({ a: 'a', b: 'b' })).toBe(true)
		expect(canAssign<{ a: string }>(false)({ a: 1 })).toBe(true)
	})
	describe('without subject', () => {
		test('returns a function that check type at compile time', () => {
			testType.true<true>(canAssign<{ a: string }>()({ a: 'a' }))
			testType.true<true>(canAssign<{ a: string }>()({ a: 'a', b: 'b' }))

			// fails at compile time
			// canAssign<{ a: string }>()({ a: 1 })
		})
		test('work with falsy value such as empty string', () => {
			const s = ''
			testType.true<true>(canAssign<''>()(s))
		})
		test('work with undefined', () => {
			testType.true<true>(canAssign<number | undefined>()(undefined))
		})
		test('canAssign false', () => {
			const t = canAssign<{ a: string }>(false)
			testType.true<true>(t(undefined))
			testType.true<true>(t({ a: 1 }))

			// @ts-expect-error
			t({ a: '' })
			// @ts-expect-error
			t({ a: '', b: '' })
		})
	})
})
