import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts boolean', () => {
	testType.strictBoolean<boolean>(true)
})

it('rejects boolean literal', () => {
	testType.strictBoolean<true>(false)
	testType.strictBoolean<false>(false)
})
