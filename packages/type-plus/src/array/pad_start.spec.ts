import { it } from 'vitest'

import { type PadStart, testType } from '../index.js'

it('returns itself if A is any or never', () => {
	testType.equal<PadStart<any, 2>, any>(true)
	testType.equal<PadStart<never, 2>, never>(true)
})

it('returns the original array when MaxLength = 0', () => {
	testType.equal<PadStart<[], 0>, []>(true)
	testType.equal<PadStart<number[], 0>, number[]>(true)
})

it('returns the original array when PadWith is the same type as the element of the array', () => {
	testType.equal<PadStart<string[], 3, string>, string[]>(true)
})

it('returns the original array when PadWith is a subset of the element of the array', () => {
	testType.equal<PadStart<Array<string | number>, 3, string>, Array<string | number>>(true)
	testType.equal<PadStart<string[], 3, 'a'>, string[]>(true)
})

it('pads elements to the start of the array when the PadWith type is not a subset of the element of the array', () => {
	testType.equal<PadStart<string[], 3, number>, [number, number, number, ...string[]]>(true)
})

it('defaults PadWith as unknown', () => {
	testType.equal<PadStart<string[], 3>, [unknown, unknown, unknown, ...string[]]>(true)
})

it('pads with unknown by default', () => {
	testType.equal<PadStart<[], 2>, [unknown, unknown]>(true)
	testType.equal<PadStart<[1, 2, 3], 5>, [unknown, unknown, 1, 2, 3]>(true)
})

it('pads the tuple with PadWith', () => {
	testType.equal<PadStart<[1, 2, 3], 5, 0>, [0, 0, 1, 2, 3]>(true)
})

it('returns the original tuple when MaxLength is less than the tuple length', () => {
	testType.equal<PadStart<[1, 2, 3], 2>, [1, 2, 3]>(true)
})

// TODO
it('pads the array while keeping intersaction type', () => {
	// @ts-expect-error
	testType.equal<PadStart<number[] & { a: string }, 2>, [unknown, unknown, ...number[]]>(false)

	// @ts-expect-error
	testType.equal<PadStart<number[] & { a: string }, 2>, [unknown, unknown, ...number[]] & { a: string }>(true)
})

it('support readonly array', () => {
	testType.equal<PadStart<readonly number[], 0>, readonly number[]>(true)
	testType.equal<PadStart<readonly [1, 2, 3], 5>, [unknown, unknown, 1, 2, 3]>(true)
})
