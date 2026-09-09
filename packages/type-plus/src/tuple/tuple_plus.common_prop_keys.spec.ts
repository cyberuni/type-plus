import { it } from 'vitest'

import { type TuplePlus, testType } from '../index.js'

it('never returns never', () => {
	testType.equal<TuplePlus.CommonPropKeys<never>, never>(true)
})

it('can override never case', () => {
	testType.equal<TuplePlus.CommonPropKeys<never, { $never: 1 }>, 1>(true)
})

it('returns never for empty tuple', () => {
	testType.equal<TuplePlus.CommonPropKeys<[]>, never>(true)
})

it('returns never when there is no common keys', () => {
	testType.equal<TuplePlus.CommonPropKeys<[{ a: number }, { b: number }]>, never>(true)
})

it('gets all keys from single entry', () => {
	testType.equal<TuplePlus.CommonPropKeys<[{ a: 1 }]>, 'a'>(true)
	testType.equal<TuplePlus.CommonPropKeys<[{ a: 1; b: 2 }]>, 'a' | 'b'>(true)
})

it('gets single common key', () => {
	type S = [{ a: number; c: number }, { a: number; b: number }]
	type A = TuplePlus.CommonPropKeys<S>
	testType.equal<A, 'a'>(true)
})

it('gets multiple common keys', () => {
	type S = [{ a: number; b: number }, { a: number; b: number }]
	type A = TuplePlus.CommonPropKeys<S>
	testType.equal<A, 'a' | 'b'>(true)
})

it('gets common symbol keys', () => {
	testType.equal<
		TuplePlus.CommonPropKeys<[{ [Symbol.iterator]: 1; a: number }, { [Symbol.iterator]: 2; b: number }]>,
		typeof Symbol.iterator
	>(true)
})

it('gets common number keys', () => {
	testType.equal<TuplePlus.CommonPropKeys<[{ a: number; 123: 1 }, { b: number; 123: 2 }]>, 123>(true)
})

it('gets common keys from multiple entries', () => {
	testType.equal<TuplePlus.CommonPropKeys<[{ a: number }, { b: number }, { c: number }]>, never>(true)

	testType.equal<
		TuplePlus.CommonPropKeys<[{ a: number; d: 1 }, { b: number; d?: 2 }, { c: number; d?: 3 | undefined }]>,
		'd'
	>(true)
})
