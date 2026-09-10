import { a } from 'assertron'
import { it, test } from 'vitest'

import { mapKey } from '../index.js'

test('predicate key can be used as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = mapKey(subject, (key) => subject[key] + 1)
	a.satisfies(actual, [2, 3, 4])
})

it('passes the index to the callback', () => {
	const actual = mapKey({ a: 1, b: 2 }, (key, i) => `${String(key)}${i}`)
	a.satisfies(actual, ['a0', 'b1'])
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = mapKey(subject, (key, _i, _a, s) => s[key] + 1)
	a.satisfies(actual, [2, 3, 4])
})
