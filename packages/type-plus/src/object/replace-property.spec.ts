import { expect, test } from 'vitest'

import { type ReplaceProperty, replaceProperty } from '../index.js'

test('replaceProperty()', () => {
	const subject = { a: 1, b: 2 } as const
	const actual = replaceProperty(subject, 'a', () => 1)
	actual satisfies { a: () => 1; b: 2 }
	expect(actual.a()).toBe(1)
})

test('ReplaceProperty<>', () => {
	const subject = { a: 1, b: 2 }

	const actual = subject as ReplaceProperty<typeof subject, 'a', 1>

	actual satisfies { a: 1; b: number }
})
