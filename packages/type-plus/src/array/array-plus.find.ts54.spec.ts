import { test } from 'vitest'
import { testType } from '../index.js'

test('behavior of array.find()', () => {
	const array = [1, 2, '3']
	const r = array.find((x) => typeof x === 'number')
	testType.equal<typeof r, number | string | undefined>(true)
})
