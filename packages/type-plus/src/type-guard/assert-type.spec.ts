import { describe, expect, it } from 'vitest'

import { assertType, testType } from '../index.js'

describe('assertType()', () => {
	it('narrows the subject when the validator passes', () => {
		const s: unknown = 'a'
		assertType<string>(s, (s) => typeof s === 'string')
		testType.equal<typeof s, string>(true)
	})

	it('narrows a union to the asserted member', () => {
		const s = 1 as string | number
		assertType<number>(s, (s) => typeof s === 'number')
		testType.equal<typeof s, number>(true)
	})

	it('infers T from the validator parameter', () => {
		const s: unknown = true
		assertType(s, (s: boolean) => typeof s === 'boolean')
		testType.equal<typeof s, boolean>(true)
	})

	it('accepts a truthy validator result', () => {
		const s: unknown = { a: 1 }
		assertType<{ a: number }>(s, (s) => s.a)
		testType.equal<typeof s, { a: number }>(true)
	})

	it('throws a TypeError when the validator fails', () => {
		expect(() => assertType<string>(1, (s) => typeof s === 'string')).toThrow(
			new TypeError('subject fails the validator'),
		)
	})

	it('throws with the given message', () => {
		expect(() => assertType<string>(1, (s) => typeof s === 'string', 'need a string')).toThrow(
			new TypeError('need a string'),
		)
	})

	it('requires a validator', () => {
		// @ts-expect-error an assertion without a validator could never fail
		expect(() => assertType<string>('a')).toThrow(TypeError)
	})
})
