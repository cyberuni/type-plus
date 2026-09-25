import { test } from 'vitest'
import { testType } from '../index.js'

test('behavior of array.find()', () => {
	const array = [1, 2, '3']
	const r = array.find((x) => typeof x === 'number')
	testType.equal<typeof r, number | undefined>(true)
})

test('behavior of array.entries()', () => {
	const array = [1, 2, '3']
	const entries = array.entries()
	testType.equal<typeof entries, IterableIterator<[number, string | number]>>(true)
})

test('behavior of tuple.entries()', () => {
	const tuple = [1, 2, '3'] as const
	const entries = tuple.entries()
	testType.equal<typeof entries, IterableIterator<[number, 1 | 2 | '3']>>(true)
})
