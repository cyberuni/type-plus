import { expect, test } from 'vitest'

import { isPromise, testType } from '../index.js'

test('false if subject is falsy value or non-object', () => {
	expect(isPromise(undefined)).toBe(false)
	expect(isPromise(null)).toBe(false)
	expect(isPromise(0)).toBe(false)
	expect(isPromise(true)).toBe(false)
	expect(isPromise('a')).toBe(false)
	expect(isPromise([])).toBe(false)
})

test('false if subject does not have a then function', () => {
	expect(isPromise({})).toBe(false)
})

test('true for a real promise', () => {
	expect(isPromise(Promise.resolve(1))).toBe(true)
})

test('true for any thenable, so another implementation is accepted', () => {
	// biome-ignore lint/suspicious/noThenProperty: on purpose
	expect(isPromise({ then() {} })).toBe(true)
})

test('false if subject.then is not a function', () => {
	// biome-ignore lint/suspicious/noThenProperty: on purpose
	expect(isPromise({ then: true })).toBe(false)
})

test('R cannot be inferred, so it is supplied when the resolved type is known', () => {
	const value: unknown = Promise.resolve('x')
	if (isPromise<string>(value)) {
		testType.equal<typeof value, Promise<string>>(true)
	} else {
		expect.unreachable()
	}
})

test('type guard as promise', () => {
	const subject = {
		// biome-ignore lint/suspicious/noThenProperty: on purpose
		then() {
			return true
		},
	}
	if (isPromise(subject)) {
		expect(subject.then()).toBe(true)
	}
})
