import { expect, it } from 'vitest'

import { findKey, testType } from '../index.js'

it('pass key as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = findKey(subject, (key) => subject[key] === 2)
	expect(actual).toEqual('b')

	const found = findKey({ a: 1, b: 2 }, (key) => key === 'b')
	expect(found).toBe('b')
	testType.equal<typeof found, 'a' | 'b' | undefined>(true)
})

it('returns undefined when no key matches', () => {
	expect(findKey({ a: 1 }, () => false)).toBe(undefined)
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = findKey(subject, (key, _i, _a, s) => s[key] === 2)
	expect(actual).toEqual('b')
})
