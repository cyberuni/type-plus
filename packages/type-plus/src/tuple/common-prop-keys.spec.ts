import { it } from 'vitest'

import { type CommonPropKeys, testType } from '../index.js'

it('never returns never', () => {
	testType.equal<CommonPropKeys<never>, never>(true)
})

it('can override never case', () => {
	testType.equal<CommonPropKeys<never, { $never: 1 }>, 1>(true)
})

it('returns all common keys from record entry in array', () => {
	testType.equal<CommonPropKeys<Array<{ a: 1 }>>, 'a'>(true)
	testType.equal<CommonPropKeys<Array<{ a: 1; b: 1 } | { a: 1; c: 1 }>>, 'a'>(true)
})

it('returns never when there is no common keys', () => {
	type S = [{ a: number }, { b: number }]
	type A = CommonPropKeys<S>
	testType.never<A>(true)
})

it('gets all keys from single entry', () => {
	testType.equal<CommonPropKeys<[{ a: 1 }]>, 'a'>(true)
	testType.equal<CommonPropKeys<[{ a: 1; b: 2 }]>, 'a' | 'b'>(true)
})

it('gets single common key', () => {
	type S = [{ a: number; c: number }, { a: number; b: number }]
	type A = CommonPropKeys<S>
	testType.equal<A, 'a'>(true)
})

it('gets multiple common keys', () => {
	type S = [{ a: number; b: number }, { a: number; b: number }]
	type A = CommonPropKeys<S>
	testType.equal<A, 'a' | 'b'>(true)
})

it('gets common symbol keys', () => {
	testType.equal<
		CommonPropKeys<[{ [Symbol.iterator]: 1; a: number }, { [Symbol.iterator]: 2; b: number }]>,
		typeof Symbol.iterator
	>(true)
})

it('gets common number keys', () => {
	testType.equal<CommonPropKeys<[{ a: number; 123: 1 }, { b: number; 123: 2 }]>, 123>(true)
})

it('gets common keys from multiple entries', () => {
	testType.equal<CommonPropKeys<[{ a: number }, { b: number }, { c: number }]>, never>(true)

	testType.equal<CommonPropKeys<[{ a: number; d: 1 }, { b: number; d?: 2 }, { c: number; d?: 3 | undefined }]>, 'd'>(
		true,
	)
})

it('supports readonly tuple and array', () => {
	testType.equal<CommonPropKeys<readonly [{ a: number; c: 1 }, { b: number; c: 2 }]>, 'c'>(true)
	testType.equal<CommonPropKeys<ReadonlyArray<{ a: 1; b: 1 } | { a: 1; c: 1 }>>, 'a'>(true)
})
