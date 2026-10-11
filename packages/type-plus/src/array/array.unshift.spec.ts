import { expect, it, test } from 'vitest'
import { testType } from '../testing/index.js'

test('behavior of array.push()', () => {
	const a1 = [1, 2, 3]
	const a2 = [4, '5']
	const a3 = [6, 7, 8]
	// @ts-expect-error
	a1.unshift(...a2)
	a2.unshift(...a3)
	expect(a1).toEqual([4, '5', 1, 2, 3])
	expect(a2).toEqual([6, 7, 8, 4, '5'])
})

test('behavior of tuple.push()', () => {
	const a1: [number, number, number] = [1, 2, 3]
	const a2: [number, string] = [4, '5']
	const a3: [number, number, number] = [6, 7, 8]
	// @ts-expect-error The non-readonly tuple has `push()` method but does not allow mixed type.
	a1.unshift(...a2)
	// This technically should be disallowed as the `a1` type does not change.
	a1.unshift(...a3)

	expect(a1).toEqual([6, 7, 8, 4, '5', 1, 2, 3])
})

it('adds elements to the start of an array', () => {
	type R = [number, ...string[]]
	testType.equal<R, [number, ...string[]]>(true)
})

it('adds elements to the start of a tuple', () => {
	type R = [number, ...[number, boolean]]
	testType.equal<R, [number, number, boolean]>(true)
})
