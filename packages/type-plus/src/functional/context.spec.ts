import { AssertOrder } from 'assertron'
import { describe, expect, it } from 'vitest'

import { type ContextBaseShape, type ContextBuilder, context, testType } from '../index.js'

describe('ContextBaseShape', () => {
	it('accepts any object, and no primitive', () => {
		testType.equal<{ db: 1 } extends ContextBaseShape ? true : false, true>(true)
		testType.equal<string extends ContextBaseShape ? true : false, false>(true)
	})
})

describe('ContextBuilder', () => {
	it('starts with Init and Ctx both at the initial type', () => {
		const builder = context({ a: 1 })
		testType.equal<typeof builder, ContextBuilder<{ a: number }, { a: number }>>(true)
	})
})

describe(`${context.name}()`, () => {
	it('allows no param', () => {
		const r = context().build()
		expect(r).toEqual({})
	})

	it('accepts an initial context value', () => {
		const r = context({ a: 1 }).build()
		testType.equal<typeof r, { a: number }>(true)
		expect(r).toEqual({ a: 1 })
	})

	it('accepts an initializer', () => {
		const r = context(() => ({ a: 1 })).build()
		testType.equal<typeof r, { a: number }>(true)
		expect(r).toEqual({ a: 1 })
	})

	it('accepts transformer expecting Init', () => {
		const r = context({ a: 1 })
			.extend((ctx) => {
				testType.equal<typeof ctx, { a: number }>(true)
				expect(ctx).toEqual({ a: 1 })
				return { b: ctx.a + 1 }
			})
			.build()

		testType.equal<typeof r, { a: number; b: number }>(true)
		expect(r).toEqual({ a: 1, b: 2 })
	})

	it('provides the combined context to the next transformer', () => {
		const r = context({ a: 1 })
			.extend((ctx) => ({ b: ctx.a + 1 }))
			.extend((ctx) => ({ c: ctx.a + ctx.b }))
			.build()

		testType.equal<typeof r, { a: number; b: number; c: number }>(true)
		expect(r).toEqual({ a: 1, b: 2, c: 3 })
	})

	it('accepts extenders needing partial of current context', () => {
		function foo(ctx: { a: number }) {
			return { c: ctx.a + 2 }
		}
		const r = context({ a: 1, b: 2 }).extend(foo).build()

		testType.equal<typeof r, { a: number; b: number; c: number }>(true)
		expect(r).toEqual({ a: 1, b: 2, c: 3 })
	})

	it('can specify additional type during extend', () => {
		const r = context({ a: 1 })
			.extend<{ b: number | undefined }>((ctx) => ({ b: ctx.a + 1 }))
			.build()

		testType.equal<typeof r, { a: number; b: number | undefined }>(true)
		expect(r).toEqual({ a: 1, b: 2 })
	})

	it('invoke each extender only once', () => {
		const o = new AssertOrder(4)
		const c1 = context({ a: 1 })
			.extend(() => {
				o.once(1)
				return { b: 2 }
			})
			.extend(() => {
				o.once(2)
				return { c: 3 }
			})

		const c2 = c1.extend(() => {
			o.once(3)
			return { d: 4 }
		})
		const c3 = c1.extend(() => {
			o.once(4)
			return { e: 5 }
		})

		const r2 = c2.build()
		const r3 = c3.build()
		const r1 = c1.build()

		expect(r2).toEqual({ a: 1, b: 2, c: 3, d: 4 })
		expect(r3).toEqual({ a: 1, b: 2, c: 3, e: 5 })
		expect(r1).toEqual({ a: 1, b: 2, c: 3 })

		o.end()
	})
})
