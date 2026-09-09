import { it } from 'vitest'

import { type TuplePlus, testType } from '../index.js'

it('filters empty tuple -> empty tuple', () => {
	testType.equal<TuplePlus.Filter<[]>, []>(true)
})

it('filters for true elements by default', () => {
	testType.equal<TuplePlus.Filter<[true, false, true]>, [true, true]>(true)
})

it('keeps only the entries matching the criteria', () => {
	testType.equal<TuplePlus.Filter<[1, 2, '3'], number>, [1, 2]>(true)
})

it('returns empty tuple when no entry matches the criteria', () => {
	testType.equal<TuplePlus.Filter<[1, 2, '3'], true>, []>(true)
})
