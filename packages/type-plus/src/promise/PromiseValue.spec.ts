import { describe, it, test } from 'vitest'

import { type AwaitedProp, assertType, type PromiseValue, testType } from '../index.js'

test('extract value from Promise', () => {
	const y: PromiseValue<Promise<string>> = ''
	assertType.isString(y)
})

describe('AwaitedProp<T, V>', () => {
	it('awaits one of the props', () => {
		type E = { a: number; p: Promise<number> }
		type R = AwaitedProp<E, 'p'>
		testType.equal<{ a: number; p: number }, R>(true)
	})

	it('awaits multiple props', () => {
		type E = {
			a: number
			p1: Promise<number>
			p2: Promise<number>
			p3: Promise<number>
		}
		type R = AwaitedProp<E, 'p1' | 'p2'>
		testType.equal<
			{
				a: number
				p1: number
				p2: number
				p3: Promise<number>
			},
			R
		>(true)
	})
})
