import { expect, test } from 'vitest'

test('behavior of array.slice()', () => {
	const a = [1, 2, 3]

	expect(a.slice(0)).toEqual([1, 2, 3])
	expect(a.slice(1)).toEqual([2, 3])
	expect(a.slice(0, 2)).toEqual([1, 2])
	expect(a.slice(-1)).toEqual([3])
	expect(a.slice(0, 0)).toEqual([])
	expect(a.slice(-3, -2)).toEqual([1])
	expect(a.slice(-5)).toEqual([1, 2, 3])
	expect(a.slice(-5, -3)).toEqual([])
	expect(a.slice(-5, -2)).toEqual([1])
})
