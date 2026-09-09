import { describe, expect, test } from 'vitest'

import { type $Else, type $Then, assertType, type HasKey, hasKey, testType } from '../index.js'

describe('HasKey<T, K>', () => {
	type Foo = { a: 1; b: 2 }

	test('true if has key', () => {
		assertType.isTrue(true as HasKey<Foo, 'a'>)
	})

	test('false if do not have key', () => {
		assertType.isFalse(false as HasKey<Foo, 'c'>)
	})

	test('can override the branches', () => {
		testType.equal<HasKey<Foo, 'a', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
		testType.equal<HasKey<Foo, 'c', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
		testType.equal<HasKey<{ a: 1 }, 'b', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	})

	test('works as filter', () => {
		testType.equal<HasKey<Foo, 'a' | 'c', { selection: 'filter' }>, 'a'>(true)
		testType.equal<HasKey<Foo, 'c', { selection: 'filter' }>, never>(true)
	})

	test('works with unique branches', () => {
		testType.equal<HasKey<Foo, 'a', HasKey.$Branch>, $Then>(true)
		testType.equal<HasKey<Foo, 'c', HasKey.$Branch>, $Else>(true)
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
