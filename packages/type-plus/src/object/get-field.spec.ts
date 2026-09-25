import { expect, test } from 'vitest'

import { getField, testType } from '../index.js'

test('support undefined', () => {
	const sub: { a: number } | undefined = { a: 1 }
	const actual = getField(sub, 'a')
	expect(actual).toBe(1)
	testType.equal<typeof actual, number>(true)

	expect(getField(undefined as { a: number } | undefined, 'a')).toBe(undefined)
})

test('support null', () => {
	const sub: { a: number } | null = { a: 1 }
	expect(getField(sub, 'a')).toBe(1)
})

test('can specify default value', () => {
	const sub: { a?: number | undefined } = { a: undefined }
	expect(getField(sub, 'a', 2)).toBe(2)
})

test('the default is returned when the value is falsy', () => {
	const sub: { a: number } | undefined = { a: 1 }

	// the default's own literal type wins, and the check is truthiness
	const actual = getField(sub, 'a', 5)
	expect(actual).toBe(1)
	testType.equal<typeof actual, 5>(true)

	expect(getField({ a: 0 } as { a: number }, 'a', 5)).toBe(5)
})

test('get from union keys', () => {
	const sub: { a: number; b: string } | { a: number; c: string } = { a: 1, b: 'b' }
	expect(getField(sub, 'b')).toBe('b')
})
