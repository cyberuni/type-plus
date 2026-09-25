import { expect, test } from 'vitest'

import { mapSeries, testType } from '../index.js'

test('map over values', () => {
	const values = [3, 2, 1]
	let actual = ''

	return mapSeries(values, (v) => new Promise<string>((a) => setTimeout(() => a((actual += v)), v * 10))).then(
		(result) => {
			expect(actual).toBe('321')
			expect(result).toEqual(['3', '32', '321'])
		},
	)
})

test('results come back in the order of the input, typed R[]', async () => {
	const r = await mapSeries([1, 2, 3], async (v) => v * 2)
	expect(r).toEqual([2, 4, 6])
	testType.equal<typeof r, number[]>(true)
})

test('an empty input resolves to an empty array', async () => {
	expect(await mapSeries([], async (v: number) => v)).toEqual([])
})
