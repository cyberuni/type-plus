import { expect, it, test } from 'vitest'
import { testType } from '../testing/index.js'

test('behavior of array.push()', () => {
	const a1 = [1, 2, 3]
	const a2 = [4, '5']
	const a3 = [6, 7, 8]
	// @ts-expect-error
	a1.push(...a2)
	a2.push(...a3)
	expect(a1).toEqual([1, 2, 3, 4, '5'])
	expect(a2).toEqual([4, '5', 6, 7, 8])
})

test('behavior of tuple.push()', () => {
	const a1: [number, number, number] = [1, 2, 3]
	const a2: [number, string] = [4, '5']
	const a3: [number, number, number] = [6, 7, 8]
	// @ts-expect-error The non-readonly tuple has `push()` method but does not allow mixed type.
	a1.push(...a2)
	// This technically should be disallowed as the `a1` type does not change.
	a1.push(...a3)

	expect(a1).toEqual([1, 2, 3, 4, '5', 6, 7, 8])
})

it('adds elements to the end of an array', () => {
	type R = [...string[], number]
	testType.equal<R, [...string[], number]>(true)
})

it('adds elements to the end of a tuple', () => {
	type R = [...[number, boolean], number]
	testType.equal<R, [number, boolean, number]>(true)
})
