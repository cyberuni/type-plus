/**
 * Pins the `@example` blocks in the `src/functional/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/functional/*.ts`, so a
 * doc example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { expect, it } from 'vitest'

import { type ChainFn, type ContextBaseShape, type ContextBuilder, compose, context, testType } from '../index.js'

it('ChainFn example in TSDoc is accurate', () => {
	const double: ChainFn<number> = (n) => n * 2
	const inc: ChainFn<number> = (n) => n + 1

	expect(compose(double, inc)(3)).toBe(7)
})

it('ContextBaseShape examples in TSDoc are accurate', () => {
	testType.equal<{ db: 1 } extends ContextBaseShape ? true : false, true>(true)
	testType.equal<string extends ContextBaseShape ? true : false, false>(true)
})

it('ContextBuilder example in TSDoc is accurate', () => {
	const builder = context({ a: 1 })
	testType.equal<typeof builder, ContextBuilder<{ a: number }, { a: number }>>(true)

	const ctx = builder.extend(() => ({ b: 'x' })).build()
	expect(ctx).toEqual({ a: 1, b: 'x' })
	testType.equal<typeof ctx, { a: number; b: string }>(true)
})
