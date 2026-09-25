import { describe, expect, test } from 'vitest'

import { reduceWhile } from '../index.js'

describe('reduceWhile()', () => {
	test('with true predicate act like normal reduce', () => {
		const array = ['a', 'b', 'c']
		const params: any[] = []

		array.reduce((p, v, i, a) => (params.push([p, v, i, a]), (p += v)), '')
		expect(
			reduceWhile(
				() => true,
				(p, v, i, a) => {
					expect([p, v, i, a]).toEqual(params.shift())
					return (p += v)
				},
				'',
				array,
			),
		).toEqual('abc')
	})
	test('terminate early with predicate', () => {
		expect(
			reduceWhile(
				(p, v) => p < v,
				(p, v) => (p += v),
				-2,
				[3, 2, 1],
			),
		).toEqual(3)
	})
})
