import { expect, it, test } from 'vitest'

import { reduceByKey, reduceKey } from '../index.js'

test('predicate key can be used as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = reduceKey(subject, (p, k) => (p += subject[k]), 'a')
	expect(actual).toBe('a123')
})

// currently k: never but it somehow works.
// Can't find a way to get k to be a more reasonable type that works with `subject[k]`
// So leaving it as is for now.
test('key type is string if subject type is plain object', () => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	const subject: {} = { a: 1 }
	const actual = reduceKey(subject, (p, k) => (p += subject[k]), 'a')
	expect(actual).toEqual('a1')
})

it('reduces over the keys', () => {
	const actual = reduceByKey({ a: 1, b: 2 }, (p, k) => p + String(k), '')
	expect(actual).toBe('ab')
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = reduceByKey(subject, (p, k, _i, _a, s) => (p += s[k]), 'a')
	expect(actual).toEqual('a123')
})
