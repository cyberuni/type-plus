import { it, test } from 'vitest'

import type { UnionOfProps } from '../index.js'
import { testType } from '../testing/index.js'

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
