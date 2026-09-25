import { describe, expect, it } from 'vitest'

import { type Merge, merge, testType } from '../index.js'

describe('Merge', () => {
	it('merges with any -> any', () => {
		testType.equal<Merge<any, any>, any>(true)
		testType.equal<Merge<{ a: 1 }, any>, any>(true)
		testType.equal<Merge<any, { a: 1 }>, any>(true)
	})

	it('merges with never -> never', () => {
		testType.equal<Merge<never, never>, never>(true)
		testType.equal<Merge<{ a: 1 }, never>, never>(true)
		testType.equal<Merge<never, { a: 1 }>, never>(true)
	})

	it('drops unknown', () => {
		testType.equal<Merge<unknown, unknown>, unknown>(true)

		// intersection type drops `unknown`. `Merge<A, B>` follows the same pattern.
		testType.equal<{ a: 1 } & unknown, { a: 1 }>(true)
		testType.equal<Merge<{ a: 1 }, unknown>, { a: 1 }>(true)
		testType.equal<Merge<unknown, { a: 1 }>, { a: 1 }>(true)
	})

	it('drops undefined', () => {
		testType.equal<Merge<undefined, undefined>, undefined>(true)

		// merging X with `undefined` in JavaScript will drop `undefined` as it has no properties.
		const x = { a: 1 }
		const y: any = undefined
		const z = { ...x, ...y }
		expect(z).toEqual({ a: 1 })

		testType.equal<Merge<{ a: 1 }, undefined>, { a: 1 }>(true)
		testType.equal<Merge<undefined, { a: 1 }>, { a: 1 }>(true)
	})

	it('drops null', () => {
		testType.equal<Merge<null, null>, null>(true)

		// merging X with `null` in JavaScript will drop `null` as it has no properties.
		const x = { a: 1 }
		const y: any = null
		const z = { ...x, ...y }
		expect(z).toEqual({ a: 1 })

		testType.equal<Merge<{ a: 1 }, null>, { a: 1 }>(true)
		testType.equal<Merge<null, { a: 1 }>, { a: 1 }>(true)
	})

	it('merges with void -> T & void', () => {
		testType.equal<Merge<void, void>, void>(true)

		// https://github.com/microsoft/TypeScript/issues/55700
		// intersection with `void` kept the intersection as `T & void`.
		testType.equal<{ a: 1 } & void, { a: 1 } & void>(true)

		// here we align the behavior with `undefined`
		testType.equal<Merge<{ a: 1 }, void>, { a: 1 } & void>(true)
		testType.equal<Merge<void, { a: 1 }>, { a: 1 } & void>(true)
	})

	it('merges primitive types for its properties', () => {
		testType.equal<
			Merge<number, boolean>,
			Merge<Number, Boolean>,
			{
				toFixed: (fractionDigits?: number | undefined) => string
				toExponential: (fractionDigits?: number | undefined) => string
				toPrecision: (precision?: number | undefined) => string
				valueOf: () => boolean
			}
		>(true)

		testType.equal<Merge<string, symbol>, Merge<String, Symbol>>(true)
		testType.equal<Merge<() => void, bigint>, Merge<Function, BigInt>>(true)
	})

	it('merges array', () => {
		testType.equal<Merge<['a', 'b'], { a: number }>, ['a', 'b'] & { a: number }>(true)

		testType.canAssign<Merge<['a', 'b'], { concat: boolean }>, { concat: boolean }>(true)
	})

	it('spreads a get accessor into a writable property', () => {
		// https://github.com/unional/type-plus/issues/598
		type ResolvedConfig = { root: string }

		const a = {
			get config(): ResolvedConfig {
				return { root: '/' }
			},
		}
		const b = { a: 'a' }
		const r = merge(a, b)
		expect(r).toEqual({ config: { root: '/' }, a: 'a' })

		// the spread produced a plain data property, so it is writable
		r.config = { root: '/tmp' }
		expect(r).toEqual({ config: { root: '/tmp' }, a: 'a' })

		testType.equal<Merge<{ get config(): ResolvedConfig }, { a: string }>, { config: ResolvedConfig; a: string }>(true)
	})
})

describe(`${merge.name}()`, () => {
	it('', () => {
		const r = merge({ a: 1 } as const, 2)
		// spreading copies values onto a fresh object, so `readonly` does not survive
		testType.equal<typeof r, { a: 1 } & Number>(true)
		expect(r).toEqual({ a: 1 })
	})

	it('returns A if A and B are the same type', () => {
		const a: Record<string, string> = {}
		const b: Record<string, string> = {}
		const r = merge(a, b)
		testType.equal<typeof r, Record<string, string>>(true)
		expect(r).toEqual({})
	})

	it('returns intersection of different record types', () => {
		const a: Record<string, string> = {}
		const b: Record<number, number> = {}
		const r = merge(a, b)
		testType.equal<typeof r, { [k: string]: string } & { [k: number]: number }>(true)
	})

	it('returns intersection of different record types - A ~= B', () => {
		const a: Record<string, string> = {}
		const b: Record<string, number> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: string]: string | number }>(true)
	})

	it('returns intersection of different record types - B > A', () => {
		const a: Record<string, string> = {}
		const b: Record<string | number, number> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: number]: number } & { [k: string]: string | number }>(true)
	})

	it('returns intersection of different record types - A > B', () => {
		const a: Record<string | number, number> = {}
		const b: Record<string, string> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: number]: number } & { [k: string]: string | number }>(true)
	})

	it('returns intersection of different record types - A != B', () => {
		const a: Record<number, number> = {}
		const b: Record<string, string> = {}

		const r = merge(a, b)
		testType.equal<typeof r, { [k: number]: number } & { [k: string]: string }>(true)
	})

	it('returns intersection of Record + specific type', () => {
		const a: Record<string, number> = {}
		const b: { a: string } = { a: 'a' }
		const r = merge(a, b)

		testType.equal<typeof r, Record<string, number> & { a: string }>(true)

		// testType.inspect<typeof r>(t => {
		// 	testType.equal<(typeof t)['a'], string>(true)
		// 	t.a = '123'
		// 	// @ts-expect-error
		// 	t['abc'] = true
		// 	t['def'] = 123
		// })
	})

	it('returns intersection of specific type + Record', () => {
		const a: { a: string } = { a: 'a' }
		const b: Record<string, number> = {}
		const r = merge(a, b)

		testType.equal<typeof r, Record<string, number> & { a: string | number }>(true)

		// testType.inspect<typeof r>(t => {
		// 	testType.equal<(typeof t)['a'], string | number>(true)
		// 	t.a = '123'
		// 	t.a = 123

		// 	// @ts-expect-error
		// 	t['abc'] = true
		// 	t['def'] = 123
		// })
	})
})

// TODO: array merge check
// testType.equal<Merge<{toString: 1}, string>, string>(true)
