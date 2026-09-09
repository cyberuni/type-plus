import { test } from 'vitest'
import type { B, Bit } from '../index.js'
import { testType } from '../index.js'

test('Bit is 0 | 1', () => {
	testType.equal<Bit.Bit, 0 | 1>(true)
})

test('Bit.BitNot<T>', () => {
	testType.equal<Bit.Not<1>, 0>(true)
	testType.equal<Bit.Not<0>, 1>(true)
})

test('Bit.BitAnd<A, Bit>', () => {
	testType.equal<Bit.And<1, 1>, 1>(true)
	testType.equal<Bit.And<1, 0>, 0>(true)
	testType.equal<Bit.And<0, 1>, 0>(true)
	testType.equal<Bit.And<0, 0>, 0>(true)
})

test('Bit.BitOr<A, Bit>', () => {
	testType.equal<Bit.Or<1, 1>, 1>(true)
	testType.equal<Bit.Or<1, 0>, 1>(true)
	testType.equal<Bit.Or<0, 1>, 1>(true)
	testType.equal<Bit.Or<0, 0>, 0>(true)
})

test('Bit.BitXor<A, Bit>', () => {
	testType.equal<Bit.Xor<1, 1>, 0>(true)
	testType.equal<Bit.Xor<1, 0>, 1>(true)
	testType.equal<Bit.Xor<0, 1>, 1>(true)
	testType.equal<Bit.Xor<0, 0>, 0>(true)
})

test('B is the same namespace as Bit, under a shorter name', () => {
	testType.equal<B.Bit, Bit.Bit>(true)
	testType.equal<B.Not<0>, Bit.Not<0>>(true)
	testType.equal<B.And<1, 1>, Bit.And<1, 1>>(true)
	testType.equal<B.Or<0, 1>, Bit.Or<0, 1>>(true)
	testType.equal<B.Xor<1, 1>, Bit.Xor<1, 1>>(true)
})
