import { expect, it, test } from 'vitest'

import { someKey, testType } from '../index.js'

test('predicate key can be used as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	expect(someKey(subject, (key) => subject[key] === 2)).toBe(true)
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = someKey(subject, (k, _i, _a, s) => s[k] === 2)
	testType.equal<boolean, typeof actual>(true)
	expect(actual).toBe(true)
})
