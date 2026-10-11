import { it } from 'vitest'
import { testType } from '../testing/index.js'
import type { ElementMatch } from './array-plus.element-match.js'

it('can disable widen support', () => {
	testType.equal<ElementMatch<number, 1, { widen: false }>, never>(true)
})
