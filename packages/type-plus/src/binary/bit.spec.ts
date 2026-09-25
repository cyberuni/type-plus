import { test } from 'vitest'
import type { Bit } from '../index.js'
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
