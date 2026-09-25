import { it } from 'vitest'

import type { ArrayPlus } from '../index.js'
import { testType } from '../index.js'

it('should reverse array to itself', () => {
	testType.equal<ArrayPlus.Reverse<string[]>, string[]>(true)
	testType.equal<ArrayPlus.Reverse<Array<string | number>>, Array<string | number>>(true)
})

it('should reverse empty tuple [] to []', () => {
	testType.equal<ArrayPlus.Reverse<[]>, []>(true)
})

it('should reverse [1, 2, 3] to [3, 2, 1]', () => {
	testType.equal<ArrayPlus.Reverse<[1, 2, 3]>, [3, 2, 1]>(true)
})

it('supports readonly array', () => {
	testType.equal<ArrayPlus.Reverse<readonly string[]>, readonly string[]>(true)
	testType.equal<ArrayPlus.Reverse<readonly [1, 2, 3]>, readonly [3, 2, 1]>(true)
})
