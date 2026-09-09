import { it } from 'vitest'

import { type MathPlus, testType } from '../index.js'

it('Add behaves like the top level Add', () => {
	testType.equal<MathPlus.Add<1, 2>, 3>(true)
})
