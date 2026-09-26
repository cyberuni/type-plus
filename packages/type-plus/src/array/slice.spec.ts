import { it } from 'vitest'
import { type ArrayPlus, type Slice, testType } from '../index.js'

it('gets never if A, Start or End is never', () => {
	testType.never<Slice<never, 0>>(true)
	testType.never<Slice<string[], never>>(true)
	testType.never<Slice<[], never>>(true)
	testType.never<Slice<['a'], never>>(true)
	testType.never<Slice<string[], 0, never>>(true)
	testType.never<Slice<['a'], 0, never>>(true)
})

it('gets never if Start or End is not an integer', () => {
	testType.never<Slice<string[], 1.1>>(true)
	testType.never<Slice<['a'], 1.1>>(true)
	testType.never<Slice<['a'], 0.1, 1>>(true)
	testType.never<Slice<string[], 0, 1.1>>(true)
	testType.never<Slice<['a'], 0, 1.1>>(true)
})

it('gets an array of the element type for an array', () => {
	testType.equal<Slice<string[], 0>, string[]>(true)
	testType.equal<Slice<string[], 1>, string[]>(true)
	testType.equal<Slice<string[], 0, 1>, string[]>(true)
	testType.equal<Slice<string[], -2, -1>, string[]>(true)
	testType.equal<Slice<readonly string[], 0>, string[]>(true)
	testType.equal<Slice<Array<string | number>, 1>, Array<string | number>>(true)
	testType.equal<Slice<[1, ...string[]], 1>, Array<1 | string>>(true)
})

it('gets the whole tuple by default', () => {
	testType.equal<Slice<[1, 2, 3]>, [1, 2, 3]>(true)
	testType.equal<Slice<[1, 2, 3], 0>, [1, 2, 3]>(true)
})

it('gets a section of the tuple, End exclusive', () => {
	testType.equal<Slice<[1, 2, 3], 1>, [2, 3]>(true)
	testType.equal<Slice<[1, 2, 3], 2>, [3]>(true)
	testType.equal<Slice<[1, 2, 3], 0, 2>, [1, 2]>(true)
	testType.equal<Slice<[1, 2, 3], 1, 2>, [2]>(true)
	testType.equal<Slice<[1, 2, 3], 0, 3>, [1, 2, 3]>(true)
})

it('supports negative indices', () => {
	testType.equal<Slice<[1, 2, 3], -1>, [3]>(true)
	testType.equal<Slice<[1, 2, 3], -2>, [2, 3]>(true)
	testType.equal<Slice<[1, 2, 3], -3>, [1, 2, 3]>(true)
	testType.equal<Slice<[1, 2, 3], -3, -2>, [1]>(true)
	testType.equal<Slice<[1, 2, 3], -3, -1>, [1, 2]>(true)
	testType.equal<Slice<[1, 2, 3], -2, 3>, [2, 3]>(true)
	testType.equal<Slice<[1, 2, 3], 0, -1>, [1, 2]>(true)
})

it('clamps an out of bound index to the boundary', () => {
	testType.equal<Slice<[1, 2, 3], -5>, [1, 2, 3]>(true)
	testType.equal<Slice<[1, 2, 3], -5, 5>, [1, 2, 3]>(true)
	testType.equal<Slice<[1, 2, 3], -5, -2>, [1]>(true)
	testType.equal<Slice<[1, 2, 3], -5, -3>, []>(true)
	testType.equal<Slice<[1, 2, 3], 3>, []>(true)
	testType.equal<Slice<[1, 2, 3], 5>, []>(true)
	testType.equal<Slice<[1, 2, 3], 1, 5>, [2, 3]>(true)
})

it('gets an empty tuple when End is at or before Start', () => {
	testType.equal<Slice<[1, 2, 3], 0, 0>, []>(true)
	testType.equal<Slice<[1, 2, 3], 2, 1>, []>(true)
	testType.equal<Slice<[1, 2, 3], -1, -2>, []>(true)
})

it('gets an empty tuple for an empty tuple', () => {
	testType.equal<Slice<[], 0>, []>(true)
	testType.equal<Slice<[], 0, 1>, []>(true)
	testType.equal<Slice<[], -1>, []>(true)
})

it('gets an array of the element type when Start or End is number or any', () => {
	testType.equal<Slice<[1, 2, 3], number>, Array<1 | 2 | 3>>(true)
	testType.equal<Slice<[1, 2, 3], 1, number>, Array<1 | 2 | 3>>(true)
	testType.equal<Slice<[1, 2, 3], any>, Array<1 | 2 | 3>>(true)
	testType.equal<Slice<[1, 2, 3], 1, any>, Array<1 | 2 | 3>>(true)
	testType.equal<Slice<string[], number>, string[]>(true)
})

it('gets a mutable result from a readonly tuple', () => {
	testType.equal<Slice<readonly [1, 2, 3], 1>, [2, 3]>(true)
})

it('is also ArrayPlus.Slice', () => {
	testType.equal<ArrayPlus.Slice<[1, 2, 3], 1, 2>, [2]>(true)
})
