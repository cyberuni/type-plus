import { describe, test } from '@jest/globals'
import { assertType } from '../assertion/assert-type.js'
import type { Tuple } from './tuple.js'

describe('Find<T,S>', () => {
	test('[] returns never', () => {
		assertType<Tuple.FindByProp<[], 'key', string>>(0 as never)
	})
	test('[num], num returns num', () => {
		assertType<Tuple.FindByProp<[{ key: number }], 'key', number>>({ key: 1 })
	})
	test('[num,str] str returns str', () => {
		type Values = [{ type: 'a' }, { type: 'b' }, { type: 'c' }]
		assertType<Tuple.FindByProp<Values, 'type', 'c'>>({ type: 'c' })
	})
})
