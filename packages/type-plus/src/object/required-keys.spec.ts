import { test } from 'vitest'

import { type RequiredKeys, testType } from '../index.js'

test('extract required keys from object', () => {
	type X = { a?: string; b: string }

	type A = RequiredKeys<X>
	testType.equal<A, 'b'>(true)
})

test('work with union type', () => {
	type X = { a?: string; b: string } | { c: string; d?: string }

	type A = RequiredKeys<X>
	testType.equal<A, 'b' | 'c'>(true)
})
test('no required keys returns never', () => {
	type X = { b?: string }

	testType.never<RequiredKeys<X>>(true)
})
test('keys with undefined value is required', () => {
	type X = { a: string | undefined }

	testType.equal<RequiredKeys<X>, 'a'>(true)
})
