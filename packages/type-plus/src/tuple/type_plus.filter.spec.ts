import { describe, it } from 'vitest'

import { type $Fn, type IsObject, type TuplePlus, testType } from '../index.js'

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

describe('with a type function', () => {
	it('keeps the entries the function returns true for', () => {
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn>, [{ a: 1 }, object]>(true)
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn<{ exact: true }>>, [object]>(true)
	})

	it('negates the function with $Fn.Not', () => {
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], $Fn.Not<IsObject.$Fn>>, [1, 'x']>(true)
	})

	it('drops a union entry the function answers boolean for', () => {
		testType.equal<TuplePlus.Filter<[{} | 1, {}], IsObject.$Fn>, [{}]>(true)
	})

	it('filters empty tuple -> empty tuple', () => {
		testType.equal<TuplePlus.Filter<[], IsObject.$Fn>, []>(true)
	})

	it('matches a type with `in` and `out` but no brand by extends', () => {
		type InOut = { in: 1; out: true }
		testType.equal<TuplePlus.Filter<[InOut, 1], InOut>, [InOut]>(true)
	})

	it('rejects a predicate passed without .$Fn', () => {
		// @ts-expect-error
		type _R = TuplePlus.Filter<[1], IsObject>
	})
})
