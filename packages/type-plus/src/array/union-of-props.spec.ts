import { it, test } from 'vitest'

import { testType, type UnionOfProps } from '../index.js'

test('get property from single value tuple', () => {
	type S = [{ a: number }]
	type A = UnionOfProps<S, 'a'>
	testType.equal<A, number>(true)
})

test('get property from multiple values', () => {
	type S = [{ a: 'a' }, { a: 'b' }]
	type A = UnionOfProps<S, 'a'>
	testType.equal<A, 'a' | 'b'>(true)
})

it('supports readonly array', () => {
	testType.equal<UnionOfProps<readonly [{ a: number }], 'a'>, number>(true)
})
