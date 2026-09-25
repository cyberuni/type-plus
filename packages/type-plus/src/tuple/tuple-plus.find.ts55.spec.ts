import { test } from 'vitest'

import { testType } from '../index.js'

test('behavior of tuple.find()', () => {
	const tuple: [1, 2, '3'] = [1, 2, '3']
	const r = tuple.find((x) => typeof x === 'number')
	testType.equal<typeof r, 1 | 2 | undefined>(true)
})
