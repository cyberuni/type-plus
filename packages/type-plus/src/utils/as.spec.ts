import { describe, test } from 'vitest'

import { amend, as, asAny } from '../index.js'
import { testType } from '../testing/index.js'

describe('as<T>()', () => {
	test('defaults subject type to unknown', () => {
		const s: any = {}
		const a = as(s)
		testType.equal<typeof a, unknown>(true)
	})

	test('cast type to T', () => {
		const s: any = {}
		const n = as<number>(s)
		testType.equal<typeof n, number>(true)

		const str = as<string>(s)
		testType.equal<typeof str, string>(true)

		const o = as<{ a: number }>(s)
		testType.equal<typeof o, { a: number }>(true)

		const any = as<any>(s)
		testType.equal<typeof any, any>(true)
	})
})

describe('asAny()', () => {
	test('cast type to any', () => {
		const s: unknown = {}
		const a = asAny(s)
		testType.equal<typeof a, any>(true)
	})
})

describe('amend<T>()', () => {
	test('assert subject as (subject & T)', () => {
		const s = { a: 1 }
		const a = amend(s).union<{ b: string }>()
		testType.equal<typeof a, { a: number } & { b: string }>(true)
	})
	test('assert subject as (subject | T)', () => {
		const s = { a: 1 }
		const a = amend(s).intersect<{ b: string }>()
		testType.equal<typeof a, { a: number } | { b: string }>(true)
	})
})
