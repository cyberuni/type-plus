import { describe, expect, it } from 'vitest'

import { type KeyTypes, type RecordValue, record, testType } from '../index.js'

describe(`${record.name}()`, () => {
	it('creates an empty record with value default to unknown', () => {
		const a = record()
		a[1] = 2
		a['a'] = 'b'
		a[Symbol()] = true
		testType.equal<typeof a, Record<KeyTypes, unknown>>(true)
	})

	it('can specify key and value types', () => {
		const a = record<string, number>()
		// even though the key type is string,
		// by default JavaScript will cast number index to string
		// so TypeScript also allows it.
		a[1] = 2
		a['a'] = 3
		testType.equal<Record<string, number>, typeof a>(true)
	})

	it('has no prototype', () => {
		const a = record()
		expect(Object.getPrototypeOf(a)).toBeNull()
	})

	it('has no prototype with initial value', () => {
		const a = record({ a: 1 })
		expect(Object.getPrototypeOf(a)).toBeNull()
	})

	it('infers type from initial value, the key type is widen', () => {
		const stringRecord = record({ a: 1 })
		testType.equal<Record<string, number>, typeof stringRecord>(true)

		const numberRecord = record({ 1: 3 })
		testType.equal<Record<number, number>, typeof numberRecord>(true)

		const stringConstRecord = record({ a: 1 } as const)
		testType.equal<Record<string, 1>, typeof stringConstRecord>(true)

		const stringConstRecord2 = record({ a: 1 as const })
		testType.equal<Record<string, 1>, typeof stringConstRecord2>(true)

		const stringConstRecord3 = record({ a: 1 as const, b: 'b' })
		testType.equal<Record<string, 1 | string>, typeof stringConstRecord3>(true)

		const stringConstRecord4 = record({ a: 1 as const, b: 'b' as const })
		testType.equal<Record<string, 1 | 'b'>, typeof stringConstRecord4>(true)
	})

	it('has the keys of the initial value', () => {
		const a = record({ a: 1, b: 2 })
		expect(Object.keys(a)).toEqual(['a', 'b'])
	})

	it('can specify a custom record', () => {
		const a = record<{ a: number }>()
		testType.equal<{ a: number }, typeof a>(true)

		const b = record<{ b: string }>({ b: 'b' })
		testType.equal<{ b: string }, typeof b>(true)
	})
})

describe('RecordValue<R>', () => {
	it('gets the value type from Record<any, T>', () => {
		type R = RecordValue<Record<any, string>>

		testType.equal<string, R>(true)
	})

	it('gets the value type form Record<number, T>', () => {
		type R = RecordValue<Record<number, string>>

		testType.equal<string, R>(true)
	})

	it('gets the value type form Record<number, T>', () => {
		type R = RecordValue<Record<symbol, string>>

		testType.equal<string, R>(true)
	})

	it('works with union type', () => {
		type R = RecordValue<{ a: number } & { b: string }>

		testType.equal<number | string, R>(true)
	})

	it('works with intersect type', () => {
		type R = RecordValue<{ a: number } | { b: string }>

		testType.equal<number | string, R>(true)
	})
})
