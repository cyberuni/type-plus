import { expect, it } from 'vitest'

import { forEachKey } from '../index.js'

it('predicate key can be used as indexer of the subject', () => {
	const subject = { a: 1, b: 2, c: 3 }
	let actual = 0
	forEachKey(subject, (key) => (actual += subject[key]))
	expect(actual).toEqual(6)
})

it('visits every key in order', () => {
	const seen: string[] = []
	forEachKey({ a: 1, b: 2 }, (key) => {
		seen.push(String(key))
	})
	expect(seen).toEqual(['a', 'b'])
})
