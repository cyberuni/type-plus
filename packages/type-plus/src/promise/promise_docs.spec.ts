/**
 * Pins the `@example` blocks in the `src/promise/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/promise/*.ts`, so a
 * doc example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { expect, it } from 'vitest'

import { isPromise, mapSeries, testType } from '../index.js'

it('isPromise examples in TSDoc are accurate', () => {
	expect(isPromise(Promise.resolve(1))).toBe(true)
	// biome-ignore lint/suspicious/noThenProperty: on purpose
	expect(isPromise({ then() {} })).toBe(true)
	expect(isPromise(1)).toBe(false)
	expect(isPromise(undefined)).toBe(false)

	const value: unknown = Promise.resolve('x')
	if (isPromise<string>(value)) {
		testType.equal<typeof value, Promise<string>>(true)
	} else {
		expect.unreachable()
	}
})

it('mapSeries examples in TSDoc are accurate', async () => {
	const r = await mapSeries([1, 2, 3], async (v) => v * 2)
	expect(r).toEqual([2, 4, 6])
	testType.equal<typeof r, number[]>(true)

	expect(await mapSeries([], async (v: number) => v)).toEqual([])
})
