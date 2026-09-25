import { it } from 'vitest'

import { type DropLast, testType } from '../index.js'

it('returns the input type if input is an array', () => {
	testType.equal<DropLast<string[]>, string[]>(true)
	const s: string[] = ['a', 'b', 'c']
	type Actual = DropLast<typeof s>
	testType.equal<Actual, string[]>(true)
})

it('drop first value type from tuple', () => {
	testType.equal<DropLast<[true, 1, 'x', 3]>, [true, 1, 'x']>(true)
})

it('returns empty tuple [] when dropping from single entry tuple', () => {
	testType.equal<DropLast<['x']>, []>(true)
})

it('returns empty tuple [] if input is empty tuple', () => {
	testType.equal<DropLast<[]>, []>(true)
})

it('keeps readonly on a readonly tuple', () => {
	testType.equal<DropLast<readonly [1, 2, 3]>, readonly [1, 2]>(true)
	testType.equal<DropLast<readonly ['x']>, readonly []>(true)
	testType.equal<DropLast<readonly []>, readonly []>(true)
})

it('returns the input type if input is a readonly array', () => {
	testType.equal<DropLast<readonly string[]>, readonly string[]>(true)
})
