import { it } from 'vitest'

import { testType } from '../index.js'
import type { IndexAt } from './array_plus.js'

it('gets never if N is never', () => {
	testType.never<IndexAt<string[], never>>(true)
	testType.never<IndexAt<[], never>>(true)
	testType.never<IndexAt<['a'], never>>(true)
})

it('returns never if N is not an integer', () => {
	testType.never<IndexAt<string[], 1.1>>(true)
	testType.never<IndexAt<[1, 2, 3], 1.1>>(true)
})

it('returns never for empty tuple', () => {
	testType.never<IndexAt<[], 0>>(true)
	testType.never<IndexAt<[], 1>>(true)
	testType.never<IndexAt<[], -1>>(true)
	testType.never<IndexAt<[], 1.1>>(true)
	testType.never<IndexAt<[], number>>(true)
})

it('returns number if A is an array and N is number or any', () => {
	testType.equal<IndexAt<string[], number>, number>(true)

	testType.equal<IndexAt<string[], any>, number>(true)
})

it.skip('returns union of indexes of the tuple when N is number', () => {
	// type.equal<IndexAt<[1, 2, 3], number>, 0 | 1 | 2>(true)
})

it('returns N if A is an array and N is positive', () => {
	testType.equal<IndexAt<string[], 0>, 0>(true)
	testType.equal<IndexAt<string[], 1>, 1>(true)
	testType.equal<IndexAt<string[], 100>, 100>(true)
})

it('returns N if A is an array and N is negative', () => {
	testType.equal<IndexAt<string[], -0>, 0>(true)
	testType.equal<IndexAt<string[], -1>, -1>(true)
	testType.equal<IndexAt<string[], -100>, -100>(true)
})

it('returns type of the element for positive indexes', () => {
	testType.equal<IndexAt<[1, 2, 3], 0>, 0>(true)
	testType.equal<IndexAt<[1, 2, 3], 1>, 1>(true)
	testType.equal<IndexAt<[1, 2, 3], 2>, 2>(true)
})

it('returns type of the element for negative indexes', () => {
	testType.equal<IndexAt<[1, 2, 3], -0>, 0>(true)
	testType.equal<IndexAt<[1, 2, 3], -1>, 2>(true)
	testType.equal<IndexAt<[1, 2, 3], -2>, 1>(true)
	testType.equal<IndexAt<[1, 2, 3], -3>, 0>(true)
})

it('returns never when A is never', () => {
	testType.never<IndexAt<never, 0>>(true)
	testType.never<IndexAt<never, -1>>(true)
	testType.never<IndexAt<never, number>>(true)
})

it('can override the $never case', () => {
	testType.equal<IndexAt<never, 0, { $never: 'n' }>, 'n'>(true)
	testType.equal<IndexAt<never, -1, { $never: 'n' }>, 'n'>(true)
})

it('returns N when A is an array', () => {
	testType.equal<IndexAt<string[], 0>, 0>(true)
	testType.equal<IndexAt<string[], -1>, -1>(true)
	testType.equal<IndexAt<readonly string[], 100>, 100>(true)
})

it('can override the $array case', () => {
	testType.equal<IndexAt<string[], 0, { $array: 'a' }>, 'a'>(true)
	testType.equal<IndexAt<string[], -1, { $array: 'a' }>, 'a'>(true)
	testType.equal<IndexAt<readonly string[], 100, { $array: 'a' }>, 'a'>(true)
})

it('returns never for the empty tuple case', () => {
	testType.never<IndexAt<[], 0>>(true)
	testType.never<IndexAt<[], -1>>(true)
})

it('can override the $emptyTuple case', () => {
	testType.equal<IndexAt<[], 0, { $emptyTuple: 'e' }>, 'e'>(true)
	testType.equal<IndexAt<[], -1, { $emptyTuple: 'e' }>, 'e'>(true)
})

it('returns the upper bound when N is out of the upper bound', () => {
	testType.equal<IndexAt<[1], 1>, 1>(true)
	testType.equal<IndexAt<[1, 2, 3], 3>, 3>(true)
})

it('can override the $upperBound case', () => {
	testType.equal<IndexAt<[1], 1, { $upperBound: 'u' }>, 'u'>(true)
	testType.equal<IndexAt<[1, 2, 3], 3, { $upperBound: 'u' }>, 'u'>(true)
})

it('returns the lower bound (0) when N is out of the lower bound', () => {
	testType.equal<IndexAt<[1], -2>, 0>(true)
	testType.equal<IndexAt<[1, 2, 3], -4>, 0>(true)
})

it('can override the $lowerBound case', () => {
	testType.equal<IndexAt<[1], -2, { $lowerBound: 'l' }>, 'l'>(true)
	testType.equal<IndexAt<[1, 2, 3], -4, { $lowerBound: 'l' }>, 'l'>(true)
})

it('leaves the other cases at their defaults when only one is overridden', () => {
	testType.equal<IndexAt<[1, 2, 3], 3, { $lowerBound: 'l' }>, 3>(true)
	testType.equal<IndexAt<[1, 2, 3], -4, { $upperBound: 'u' }>, 0>(true)
	testType.never<IndexAt<[], 0, { $upperBound: 'u' }>>(true)
	testType.equal<IndexAt<string[], 2, { $emptyTuple: 'e' }>, 2>(true)
})

it('supports readonly array', () => {
	testType.equal<IndexAt<readonly [1, 2, 3], 1>, 1>(true)
})
