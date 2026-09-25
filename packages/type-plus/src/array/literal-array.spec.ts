import { test } from 'vitest'

import { literalArray, testType } from '../index.js'

test('entries in array are restricted to the input literals', () => {
	const actual = literalArray('a', 'b')

	testType.equal<typeof actual, Array<'a' | 'b'>>(true)
})
