import { expect, it, test } from 'vitest'

test('behavior of array.slice()', () => {
	const a = [1, 2, 3]

	expect(a.slice(0)).toEqual([1, 2, 3])
	expect(a.slice(1)).toEqual([2, 3])
	expect(a.slice(0, 2)).toEqual([1, 2])
	expect(a.slice(-1)).toEqual([3])
	expect(a.slice(0, 0)).toEqual([])
	expect(a.slice(-3, -2)).toEqual([1])
	expect(a.slice(-5)).toEqual([1, 2, 3])
	expect(a.slice(-5, -3)).toEqual([])
	expect(a.slice(-5, -2)).toEqual([1])
})

it.todo(' tests for Slice<A>')

/**
 * Returns a copy of a section of an array or tuple.
 *
 * ```
 * import type { Slice } from 'type-plus'
 *
 * type R = Slice<string[], 0> // string[]
 * type R = Slice<[1, 2, 3], 0> // [1, 2, 3]
 * type R = Slice<[1, 2, 3], 1, 2> // [2, 3]
 * type R = Slice<[1, 2, 3], -1> // [3]
 * type R = Slice<[1, 2, 3], -2> // [2, 3]
 * type R = Slice<[1, 2, 3], -2, -1> // [2]
 * type R = Slice<[1, 2, 3], -2, 3> // [2, 3]
 * ```
 */
// export type Slice<A extends unknown[], Start extends number, End extends number = number, Fail = never> = A

// import { testType, type Slice } from '../index.js'

// it('gets never if Start is never', () => {
// 	testType.never<Slice<string[], never>>(true)
// 	testType.never<Slice<[], never>>(true)
// 	testType.never<Slice<['a'], never>>(true)
// })

// it('gets never if End is never', () => {
// 	testType.never<Slice<string[], 0, never>>(true)
// 	testType.never<Slice<[], 0, never>>(true)
// 	testType.never<Slice<['a'], 0, never>>(true)
// })

// it('gets never if Start is not an integer', () => {
// 	testType.never<Slice<string[], 1.1>>(true)
// 	testType.never<Slice<[], 1.1>>(true)
// 	testType.never<Slice<['a'], 1.1>>(true)

// 	testType.never<Slice<string[], 0.1, 1>>(true)
// 	testType.never<Slice<[], 0.1, 1>>(true)
// 	testType.never<Slice<['a'], 0.1, 1>>(true)
// 	testType.never<Slice<['a'], 0.1, never>>(true)
// 	testType.never<Slice<['a'], 0.1, any>>(true)
// })

// it('gets never if End is not an integer', () => {
// 	testType.never<Slice<string[], 0, 1.1>>(true)
// 	testType.never<Slice<[], 0, 1.1>>(true)
// 	testType.never<Slice<['a'], 0, 1.1>>(true)
// 	testType.never<Slice<[], never, 1.1>>(true)
// 	testType.never<Slice<[], any, 1.1>>(true)
// })

// it('returns never for empty tuple', () => {
// 	testType.never<Slice<[], 0>>(true)
// 	testType.never<Slice<[], 0, 1>>(true)
// 	testType.never<Slice<[], -1>>(true)
// 	testType.never<Slice<[], -1, 2>>(true)
// 	testType.never<Slice<[], 1.1>>(true)
// 	testType.never<Slice<[], number>>(true)
// 	testType.never<Slice<[], any>>(true)
// })

// it('returns never when out of bound', () => {
// 	testType.never<Slice<[1], 1>>(true)
// 	testType.never<Slice<[1], -2>>(true)
// 	testType.never<Slice<[1], 0, 0>>(true)
// 	testType.never<Slice<[1, 2], 0, 3>>(true)
// 	testType.never<Slice<[1, 2], -1, 3>>(true)
// 	testType.never<Slice<[1, 2], -3, 2>>(true)
// })

// it('returns the array if input is an array', () => {
// 	testType.equal<Slice<string[], 0>, string[]>(true)
// 	testType.equal<Slice<string[], 0, 1>, string[]>(true)
// 	testType.equal<Slice<string[], -1>, string[]>(true)
// 	testType.equal<Slice<string[], -2, -1>, string[]>(true)
// 	testType.equal<Slice<string[], number, 1>, string[]>(true)
// 	testType.equal<Slice<string[], 0, number>, string[]>(true)
// 	testType.equal<Slice<string[], any, 1>, string[]>(true)
// 	testType.equal<Slice<string[], 0, any>, string[]>(true)
// })

// it('returns a slice of the tuple', () => {
// 	testType.equal<Slice<[1, 2, 3], 0>, [1, 2, 3]>(true)
// 	testType.equal<Slice<[1, 2, 3], 1>, [2, 3]>(true)
// 	testType.equal<Slice<[1, 2, 3], 2>, [3]>(true)
// 	testType.equal<Slice<[1, 2, 3], 0, 1>, [1, 2]>(true)
// 	testType.equal<Slice<[1, 2, 3], 1, 2>, [2, 3]>(true)

// 	testType.equal<Slice<[1, 2, 3], -3>, [1, 2, 3]>(true)
// 	testType.equal<Slice<[1, 2, 3], -2>, [2, 3]>(true)
// 	testType.equal<Slice<[1, 2, 3], -1>, [3]>(true)
// 	testType.equal<Slice<[1, 2, 3], -3, -2>, [1, 2]>(true)
// 	testType.equal<Slice<[1, 2, 3], -2, -1>, [2, 3]>(true)

// 	testType.equal<Slice<[1, 2, 3], -3, 3>, [1, 2, 3]>(true)

// 	testType.equal<Slice<[1, 2, 3], number>, [1, 2, 3]>(true)
// 	testType.equal<Slice<[1, 2, 3], 1, number>, [2, 3]>(true)

// 	testType.equal<Slice<[1, 2, 3], any>, [1, 2, 3]>(true)
// 	testType.equal<Slice<[1, 2, 3], 1, any>, [2, 3]>(true)
// })

// it('returns never if start > end', () => {
// 	testType.never<Slice<['a', 'b', 'c'], 1, 0>>(true)
// 	testType.never<Slice<['a', 'b', 'c'], -1, -2>>(true)
// })

// it('can override out of bound result', () => {
// 	testType.equal<Slice<[], 0, number, 'out-of-bound'>, 'out-of-bound'>(true)
// 	testType.equal<Slice<[1], 1, number, 'out-of-bound'>, 'out-of-bound'>(true)
// 	testType.equal<Slice<[1], -2, number, 'out-of-bound'>, 'out-of-bound'>(true)
// 	testType.equal<Slice<[1, 2], 0, 3, 'out-of-bound'>, 'out-of-bound'>(true)
// 	testType.equal<Slice<[1, 2], -1, 3, 'out-of-bound'>, 'out-of-bound'>(true)
// })
