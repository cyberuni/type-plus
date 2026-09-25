import { test } from 'vitest'
import { testType } from '../index.js'

test('behavior of array.entries()', () => {
	const array = [1, 2, '3']
	const entries = array.entries()
	testType.equal<typeof entries, ArrayIterator<[number, string | number]>>(true)
})

test('behavior of tuple.entries()', () => {
	const tuple = [1, 2, '3'] as const
	const entries = tuple.entries()
	testType.equal<typeof entries, ArrayIterator<[number, 1 | 2 | '3']>>(true)
})
