import { expect, it, test } from 'vitest'
import { type ArrayPlus, type At, testType } from '../index.js'

test('behavior of array.at()', () => {
	const array = [1, 2, '3']
	const first = array.at(0)
	expect(first).toBe(1)
	testType.equal<typeof first, number | string | undefined>(true)
})

test('behavior of tuple.at()', () => {
	const tuple = [1, 2, '3'] as const
	const first = tuple.at(0)
	expect(first).toBe(1)
	// @ts-expect-error This is an limitation of the existing type
	testType.equal<typeof first, number>(true)
})

it('gets never if N is never', () => {
	testType.never<ArrayPlus.At<string[], never>>(true)
	testType.never<ArrayPlus.At<[], never>>(true)
	testType.never<ArrayPlus.At<['a'], never>>(true)
})

it('returns never if N is not an integer', () => {
	testType.never<ArrayPlus.At<string[], 1.1>>(true)
	testType.never<ArrayPlus.At<[1, 2, 3], 1.1>>(true)
})

it('gets never from empty tuple', () => {
	testType.never<ArrayPlus.At<[], 0>>(true)
	testType.never<ArrayPlus.At<[], 1.1>>(true)
	testType.never<ArrayPlus.At<[], number>>(true)
})

it('gets type of the element | undefined in an array', () => {
	testType.equal<ArrayPlus.At<string[], 0>, string | undefined>(true)
	testType.equal<At<string[], 0>, string | undefined>(true)
	testType.equal<ArrayPlus.At<unknown[], 1>, unknown>(true)
	testType.equal<ArrayPlus.At<any[], -1>, any>(true)
	testType.equal<ArrayPlus.At<Array<string | boolean>, -2>, string | boolean | undefined>(true)
	testType.equal<ArrayPlus.At<string[], number>, string | undefined>(true)
	testType.equal<ArrayPlus.At<string[], any>, string | undefined>(true)
})

it('gets type of element in tuple', () => {
	testType.equal<ArrayPlus.At<['a', 1, string], 0>, 'a'>(true)
	testType.equal<ArrayPlus.At<['a', 1, string], 1>, 1>(true)
	testType.equal<ArrayPlus.At<['a', 1, string], 2>, string>(true)
	testType.equal<ArrayPlus.At<['a', 1, string], -1>, string>(true)
	testType.equal<ArrayPlus.At<['a', 1, string], -2>, 1>(true)
	testType.equal<ArrayPlus.At<['a', 1, string], -3>, 'a'>(true)
	testType.equal<At<[1, 2, 3], 2>, 3>(true)
	testType.equal<At<[1, 2, 3], -1>, 3>(true)
	testType.equal<ArrayPlus.At<['a', 1, string], number>, 'a' | 1 | string | undefined>(true)
	testType.equal<ArrayPlus.At<['a', 1, string], any>, 'a' | 1 | string | undefined>(true)
})

it('gets never if N is out of range', () => {
	testType.never<ArrayPlus.At<['a'], 1>>(true)
	testType.never<ArrayPlus.At<['a'], -2>>(true)
})

it('can override fail case', () => {
	testType.equal<ArrayPlus.At<[], 0, { $fail: 'ha' }>, 'ha'>(true)

	testType.equal<ArrayPlus.At<[], any, { $fail: 'ha' }>, 'ha'>(true)
	testType.equal<ArrayPlus.At<[], never, { $fail: 'ha' }>, 'ha'>(true)
})

it('supports readonly array', () => {
	testType.equal<ArrayPlus.At<readonly ['a', 1, string], 1>, 1>(true)
})
