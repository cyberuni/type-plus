import { test } from 'vitest'

import { testType } from '../index.js'
import type { OptionalKeys } from './optional-key.js'

test('extract optional keys from object', () => {
	type X = { a?: string; b: string }

	testType.equal<'a', OptionalKeys<X>>(true)
})
test('work with union type', () => {
	type X = { a?: string; b: string } | { c: string; d?: string }

	type A = OptionalKeys<X>
	testType.equal<'a' | 'd', A>(true)
})
test('no optional keys returns never', () => {
	type X = { b: string }

	testType.never<OptionalKeys<X>>(true)
})
test('keys with undefined value is not optional', () => {
	type X = { a: string | undefined }

	testType.never<OptionalKeys<X>>(true)
})
