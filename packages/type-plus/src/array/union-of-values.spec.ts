import { it } from 'vitest'

import { testType, type UnionOfValues } from '../index.js'

it('returns type T of Array<T>', () => {
	testType.equal<UnionOfValues<string[]>, string>(true)
	testType.equal<UnionOfValues<Array<string | number>>, string | number>(true)
})

it('returns the union of values of an tuple', () => {
	testType.equal<UnionOfValues<[string, boolean]>, string | boolean>(true)
})

it('returns literal types from tuple', () => {
	testType.equal<UnionOfValues<['a', 1, true]>, 'a' | 1 | true>(true)
})

it('preserves union types', () => {
	const t: ['a' | 'b', number, boolean] = ['a', 1, true]
	type R = UnionOfValues<typeof t>
	testType.equal<R, 'a' | 'b' | number | boolean>(true)
})

it('supports readonly tuple', () => {
	testType.equal<UnionOfValues<readonly string[]>, string>(true)
	testType.equal<UnionOfValues<readonly [string, boolean]>, string | boolean>(true)
})
