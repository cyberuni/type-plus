import { it } from 'vitest'

import { type $Else, type $Then, type ArrayPlus, testType } from '../index.js'

it('returns true for never', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<['a'], never>>(true)
})

it('returns true for empty tuple', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<[], never>>(true)
	testType.true<ArrayPlus.IsIndexOutOfBound<[], 0>>(true)
})

it('return false for array', () => {
	testType.false<ArrayPlus.IsIndexOutOfBound<any[], 0>>(true)
	testType.false<ArrayPlus.IsIndexOutOfBound<any[], 1>>(true)
	testType.false<ArrayPlus.IsIndexOutOfBound<any[], -1>>(true)
})

it('returns true for out of bound index', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<['a'], 1>>(true)
	testType.true<ArrayPlus.IsIndexOutOfBound<['a'], -2>>(true)
})

it('returns false for in bound index', () => {
	testType.false<ArrayPlus.IsIndexOutOfBound<['a'], 0>>(true)
	testType.false<ArrayPlus.IsIndexOutOfBound<['a'], -1>>(true)
})

it('supports readonly array', () => {
	testType.true<ArrayPlus.IsIndexOutOfBound<readonly ['a'], 1>>(true)
})

it('can override the branches', () => {
	testType.equal<ArrayPlus.IsIndexOutOfBound<['a'], 1, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<ArrayPlus.IsIndexOutOfBound<['a'], 0, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('works as filter', () => {
	testType.equal<ArrayPlus.IsIndexOutOfBound<['a'], 1, { selection: 'filter' }>, 1>(true)
	testType.equal<ArrayPlus.IsIndexOutOfBound<['a'], 0, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<ArrayPlus.IsIndexOutOfBound<['a'], 1, ArrayPlus.IsIndexOutOfBound.$Branch>, $Then>(true)
	testType.equal<ArrayPlus.IsIndexOutOfBound<['a'], 0, ArrayPlus.IsIndexOutOfBound.$Branch>, $Else>(true)
})
