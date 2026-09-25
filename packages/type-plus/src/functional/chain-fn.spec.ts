import { expect, test } from 'vitest'

import { type ChainFn, compose, testType } from '../index.js'

test('return type is the same as input type', () => {
	type A = ChainFn<number>

	testType.equal<Parameters<A>[0], ReturnType<A>>(true)
})

test('any number of them compose, in any order', () => {
	const double: ChainFn<number> = (n) => n * 2
	const inc: ChainFn<number> = (n) => n + 1

	expect(compose(double, inc)(3)).toBe(7)
})
