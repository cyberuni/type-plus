import { describe, expect, it } from 'vitest'

import { MaybePromise, testType } from '../index.js'

describe(`${MaybePromise.transform.name}()`, () => {
	it('returns the result from the handler directly if it is not a promise', () => {
		const r = MaybePromise.transform(1, (v) => String(v))

		testType.equal<string, typeof r>(true)
		expect(r).toEqual('1')
	})

	it('returns a promise that resolves to the result from the handler', async () => {
		const r = MaybePromise.transform(Promise.resolve(1), (v) => String(v))

		testType.equal<Promise<string>, typeof r>(true)
		expect(r).not.toEqual('1')
		expect(await r).toEqual('1')
	})

	it('preserves the type of it is MaybePromise', () => {
		const v: MaybePromise<number> = 1 as MaybePromise<number>
		const r = MaybePromise.transform(v, (v) => String(v))
		testType.equal<string | Promise<string>, typeof r>(true)
		expect(r).toEqual('1')
	})
})
