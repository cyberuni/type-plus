import { it } from 'vitest'
import { testType } from '../index.js'
import type { ElementMatch } from './array-plus.js'

it('can disable widen support', () => {
	testType.equal<ElementMatch<number, 1, { widen: false }>, never>(true)
})
