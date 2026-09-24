import { it, test } from 'vitest'

import { type PropUnion, testType, type UnionOfProps } from '../index.js'

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

test('PropUnion, the deprecated name, is the same as UnionOfProps', () => {
	type S = [{ a: 1 }, { a: 2 }]
	testType.equal<PropUnion<S, 'a'>, UnionOfProps<S, 'a'>>(true)
})
