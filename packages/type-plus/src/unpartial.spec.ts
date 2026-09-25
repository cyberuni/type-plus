import { describe, expect, it } from 'vitest'

import { required, requiredDeep, testType } from './index.js'

type Options = { a: number; b: { x: number; y?: number } }
const defaults: Options = { a: 1, b: { x: 1, y: 1 } }

describe('required()', () => {
	it('merges the sources shallowly, left to right', () => {
		const r = required<Options>(defaults, { b: { x: 2 } })
		expect(r).toEqual({ a: 1, b: { x: 2 } })
		testType.equal<typeof r, Options>(true)
	})

	it('replaces a nested object instead of merging it', () => {
		expect(required<Options>(defaults, { b: { x: 1, y: 2 } }, { b: { x: 3 } })).toEqual({ a: 1, b: { x: 3 } })
	})

	it('overwrites with undefined', () => {
		expect(required<{ a?: number | undefined }>({ a: 1 }, { a: undefined })).toEqual({ a: undefined })
	})

	it('skips null and undefined sources', () => {
		expect(required<Options>(defaults, null, undefined)).toEqual(defaults)
	})

	it('does not mutate the sources', () => {
		const source = { a: 1 }
		required(source, { a: 2 })
		expect(source).toEqual({ a: 1 })
	})
})

describe('requiredDeep()', () => {
	it('merges nested objects', () => {
		const r = requiredDeep<Options>(defaults, { b: { x: 2 } })
		expect(r).toEqual({ a: 1, b: { x: 2, y: 1 } })
		testType.equal<typeof r, Options>(true)
	})

	it('keeps the earlier value when the later one is undefined', () => {
		expect(requiredDeep<{ a?: number | undefined }>({ a: 1 }, { a: undefined })).toEqual({ a: 1 })
	})

	it('replaces an array', () => {
		expect(requiredDeep<{ a: number[] }>({ a: [1, 2] }, { a: [3] })).toEqual({ a: [3] })
	})
})
