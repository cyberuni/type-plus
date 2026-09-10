import { describe, expect, test } from 'vitest'

import { assertType, type HasKey, hasKey, testType } from '../index.js'

describe('HasKey<T, K>', () => {
	test('true if has key', () => {
		type Foo = { a: 1; b: 2 }
		assertType.isTrue(true as HasKey<Foo, 'a'>)
	})

	test('false if do not have key', () => {
		type Foo = { a: 1; b: 2 }
		assertType.isFalse(false as HasKey<Foo, 'c'>)
	})

	test('can specify the then and else types', () => {
		type Foo = { a: 1 }
		assertType<'no'>('no' as HasKey<Foo, 'b', 'yes', 'no'>)
	})
})

describe('hasKey()', () => {
	test('true if has key', () => {
		const subject = { a: 1, b: 2 }

		expect(hasKey(subject, 'a')).toBeTruthy()
		expect(hasKey(subject, 'b')).toBeTruthy()
		expect(hasKey(subject, 'a', 'b')).toBeTruthy()
	})
	test('false if do not have key', () => {
		const subject = { a: 1, b: 2 }

		expect(hasKey(subject, 'c')).toBeFalsy()
		expect(hasKey(subject, 'a', 'c')).toBeFalsy()
	})

	test('the check is truthiness, not `in`', () => {
		// the documented runtime/type disagreement: truthiness, not `in`
		const falsy = hasKey({ a: 0 }, 'a')
		expect(falsy).toBe(false)
		testType.equal<typeof falsy, true>(true)
	})
})
