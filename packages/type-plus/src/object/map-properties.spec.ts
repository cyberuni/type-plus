import { expect, test } from 'vitest'

import { mapProperties } from '../index.js'

test('basic usage', () => {
	const actual = mapProperties({ a: 1, b: 2 }, (v, k) => k + String(v * 2))
	expect(actual).toEqual({ a: 'a2', b: 'b4' })
})

test('mixed type', () => {
	const actual = mapProperties({ a: 1, b: 'b' }, (v, k) => k + String(v))
	expect(actual).toEqual({ a: 'a1', b: 'bb' })
})

test('extract value from prop', () => {
	const actual = mapProperties({ a: { foo: 'x' }, b: { foo: 'y' } }, (v) => v.foo)
	expect(actual).toEqual({ a: 'x', b: 'y' })
})

test('parent props are not mapped', () => {
	class Boo {
		shared(v: number) {
			return v * 2
		}
		own = (v: number) => v * 3
	}
	const boo = new Boo()

	const actual = mapProperties(boo, (v) => v(2))
	expect(actual).toEqual({ own: 6 })
})
