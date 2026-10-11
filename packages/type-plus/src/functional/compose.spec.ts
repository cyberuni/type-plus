import { expect, test } from 'vitest'

import { compose } from '../index.js'
import { testType } from '../testing/index.js'

test('works with endofunctors: +2 *3', () => {
	const plus2 = (x: number) => x + 2
	const multiply3 = (x: number) => x * 3

	const a = compose(plus2, multiply3)

	testType.equal<typeof a, (a: number) => number>(true)
	expect(a(2)).toBe(12)
})

test('cross types', () => {
	const n2s = (n: number) => String(n)
	const len1 = (s: string) => s.length === 1

	const isSingleDigit = compose(n2s, len1)

	testType.equal<typeof isSingleDigit, (n: number) => boolean>(true)
	expect(isSingleDigit(1)).toBe(true)
	expect(isSingleDigit(10)).toBe(false)
})

test('multiple params first function', () => {
	const add = (a: number, b: number) => a + b
	const multiply3 = (x: number) => x * 3

	const a = compose(add, multiply3)

	testType.equal<typeof a, (a: number, b: number) => number>(true)
	expect(a(2, 2)).toBe(12)
})
