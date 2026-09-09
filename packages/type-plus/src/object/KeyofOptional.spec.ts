import { it } from 'vitest'

import { type KeysOfOptional, testType } from '../index.js'

it('get keys from optional type', () => {
	type X = { o?: { a: string; b: string } }
	type A = KeysOfOptional<X['o']>

	testType.equal<A, 'a' | 'b'>(true)
})

it('get keys from a non-optional type', () => {
	testType.equal<KeysOfOptional<{ a: 1; b: 2 }>, 'a' | 'b'>(true)
	testType.equal<KeysOfOptional<Record<'x' | 'y', number>>, 'x' | 'y'>(true)
})

it('gets never when the type has an optional property', () => {
	// the name says otherwise: one optional property collapses the inference
	testType.equal<KeysOfOptional<{ a?: 1; b: 2 }>, never>(true)
})
