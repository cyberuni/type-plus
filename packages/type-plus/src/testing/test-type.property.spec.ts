import { expect, it } from 'vitest'

import { testType } from '../index.js'

it('checks that T has the key K', () => {
	testType.property<{ a: 1 }, 'a'>(true)
	testType.property<{ a: 1 }, 'b'>(false)

	// @ts-expect-error
	testType.property<{ a: 1 }, 'b'>(true)
	// @ts-expect-error
	testType.property<{ a: 1 }, 'a'>(false)
})

it('counts an optional key as present', () => {
	testType.property<{ a?: 1 }, 'a'>(true)
	testType.property<{ a: 1 | undefined }, 'a'>(true)
})

it('accepts number and symbol keys', () => {
	const s = Symbol()
	testType.property<{ 1: 'a' }, 1>(true)
	testType.property<{ [s]: 1 }, typeof s>(true)
	testType.property<string[], 'length'>(true)
	testType.property<[1, 2], 0>(true)
	testType.property<[1, 2], 2>(true) // from the index signature of Array
})

it('passes any key of an index signature', () => {
	testType.property<Record<string, 1>, 'anything'>(true)
	testType.property<Record<string, 1>, 1>(false)
	testType.property<Record<string, 1>, symbol>(false)
})

it('requires every key of a union K', () => {
	testType.property<{ a: 1; b: 2 }, 'a' | 'b'>(true)
	testType.property<{ a: 1 }, 'a' | 'b'>(false)

	// @ts-expect-error
	testType.property<{ a: 1 }, 'a' | 'b'>(true)
})

it('checks only the keys shared by every member of a union T', () => {
	testType.property<{ a: 1 } | { a: 2; b: 2 }, 'a'>(true)
	testType.property<{ a: 1 } | { a: 2; b: 2 }, 'b'>(false)
})

it('fails for a never K', () => {
	testType.property<{ a: 1 }, never>(false)
})

it('passes any key on any and never, whose keyof is every key', () => {
	testType.property<any, 'a'>(true)
	testType.property<never, 'a'>(true)
	testType.property<unknown, 'a'>(false)
})

it('has a deferred form', () => {
	testType.assert(testType.defer.property<{ a: 1 }, 'a'>())
	testType.assert(testType.defer.not.property<{ a: 1 }, 'b'>())

	testType.equal<
		ReturnType<typeof testType.defer.property<{ a: 1 }, 'b'>>,
		testType.Failed<'property', { a: 1 }, Record<'b', unknown>>
	>(true)
})

it('is on the subject of testType.of()', () => {
	testType.of({ a: 1 }).property<'a'>(true)
	testType.of({ a: 1 }).property<'b'>(false)

	// @ts-expect-error
	testType.of({ a: 1 }).property<'b'>(true)
})

it('returns expected as T for type inspection', () => {
	const r = testType.property<{ a: 1 }, 'a'>(true)
	testType.equal<typeof r, { a: 1 }>(true)
	expect(r).toBe(true)
})
