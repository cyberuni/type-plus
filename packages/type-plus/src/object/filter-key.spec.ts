import { expect, it } from 'vitest'

import { filterKey, testType } from '../index.js'

it(`returns with type as 'keyof subject'`, () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = filterKey(subject, (key) => subject[key] > 1)
	expect(actual).toEqual(['b', 'c'])

	const filtered = filterKey({ a: 1, b: 2 }, (key) => key === 'a')
	expect(filtered).toEqual(['a'])
	testType.equal<typeof filtered, Array<'a' | 'b'>>(true)
})

it('includes subject in callback', () => {
	const subject = { a: 1, b: 2, c: 3 }
	const actual = filterKey(subject, (key, _i, _a, s) => s[key] > 1)
	expect(actual).toEqual(['b', 'c'])
})
