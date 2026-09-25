import { it } from 'vitest'

import { type DropFirst, testType } from '../index.js'

it('returns the input type if input is an array', () => {
	testType.equal<DropFirst<string[]>, string[]>(true)

	const s: string[] = ['a', 'b', 'c']
	type Actual = DropFirst<typeof s>
	testType.equal<Actual, string[]>(true)
})

it('drops the first type from a tuple', () => {
	testType.equal<DropFirst<[true, 1, 'x', 3]>, [1, 'x', 3]>(true)
})

it('returns empty tuple [] when dropping from single entry tuple', () => {
	testType.equal<DropFirst<['x']>, []>(true)
})

it('returns empty tuple [] if input is empty tuple', () => {
	testType.equal<DropFirst<[]>, []>(true)
})

it('keeps readonly on a readonly tuple', () => {
	testType.equal<DropFirst<readonly [1, 2, 3]>, readonly [2, 3]>(true)
	testType.equal<DropFirst<readonly ['x']>, readonly []>(true)
	testType.equal<DropFirst<readonly []>, readonly []>(true)
})

it('returns the input type if input is a readonly array', () => {
	testType.equal<DropFirst<readonly string[]>, readonly string[]>(true)
})
