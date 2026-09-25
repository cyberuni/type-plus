import { describe, expect, test } from 'vitest'

import { canAssign, testType } from '../index.js'

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
