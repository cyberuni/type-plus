import { expect, it } from 'vitest'
import { stub, testType } from './index.js'

it('creates a stub builder with init object', () => {
	const s = stub.builder({ a: 0 }).create()
	const r = s()
	expect(r).toEqual({ a: 0 })
	testType.equal<typeof r, { a: number }>(true)
})

it('creates a stub builder with init function', () => {
	const s = stub.builder<{ a: number }>((input) => ({ a: (input?.a ?? 0) + 1 })).create()
	const r = s()
	expect(r).toEqual({ a: 1 })
})

it('can add init object to builder', () => {
	const s = stub.builder<{ a: number; b?: string }>({ a: 1 }).with({ b: '1' }).create()
	const r = s()
	expect(r).toEqual({ a: 1, b: '1' })
})

it('lets the stub passed to the created function win over the init objects', () => {
	const s = stub.builder<{ a: number; b: string }>({ a: 1 }).with({ b: 'b' }).create()
	expect(s()).toEqual({ a: 1, b: 'b' })
	expect(s({ a: 2 })).toEqual({ a: 2, b: 'b' })
})

it('can add init function to builder', () => {
	const s = stub
		.builder<{ a: number; b?: string }>((input) => ({
			...input,
			a: (input?.a ?? 0) + 1,
		}))
		.with((input) => ({
			...input,
			b: `${input?.b ?? '0'}1`,
		}))
		.create()
	expect(s()).toEqual({ a: 1, b: '01' })
	expect(s({ a: 1 })).toEqual({ a: 2, b: '01' })
	expect(s({ a: 1 })).toEqual({ a: 2, b: '01' })
})

it('can be use to create multiple builders', () => {
	const s = stub.builder<{ a: number; b: number; c: number }>({ a: 1 })
	const s1 = s.with({ b: 2 })
	const s2 = s.with({ b: 3 })
	const b1 = s1.create()
	const b2 = s2.create()

	expect(b1({ c: 0 })).toEqual({ a: 1, b: 2, c: 0 })
	expect(b1({ c: 1 })).toEqual({ a: 1, b: 2, c: 1 })

	expect(b2({ c: 0 })).toEqual({ a: 1, b: 3, c: 0 })
	expect(b2({ c: 1 })).toEqual({ a: 1, b: 3, c: 1 })
})

it('lets a later init object win over an earlier one', () => {
	const s = stub.builder<{ a: number; b: string }>({ a: 1, b: 'b' }).with({ a: 2 }).create()
	expect(s()).toEqual({ a: 2, b: 'b' })
	expect(s({ a: 3 })).toEqual({ a: 3, b: 'b' })
})

it('deep-merges a later init object, keeping the nested keys it does not set', () => {
	type S = { a: { x: number; y: number }; b: number }
	const s = stub
		.builder<S>({ a: { x: 1, y: 1 }, b: 1 })
		.with({ a: { x: 2 } })
		.with({ a: { y: 3 } })
		.create()
	expect(s()).toEqual({ a: { x: 2, y: 3 }, b: 1 })
	expect(s({ a: { x: 9 } })).toEqual({ a: { x: 9, y: 3 }, b: 1 })
})

it('lets the stub passed to the created function win over every init object', () => {
	const s = stub.builder<{ a: number; b: string }>({ a: 1 }).with({ a: 2 }).with({ a: 3, b: 'c' }).create()
	expect(s({ a: 0 })).toEqual({ a: 0, b: 'c' })
})

it('passes the stub so far to an init function', () => {
	const s = stub
		.builder<{ a: number; b: number }>({ a: 1 })
		.with((acc) => ({ ...acc, b: acc!.a! * 10 }))
		.create()
	expect(s()).toEqual({ a: 1, b: 10 })
	expect(s({ a: 3 })).toEqual({ a: 3, b: 30 })
})

it('passes the later init object value to a following init function', () => {
	const s = stub
		.builder<{ a: number; b: number }>({ a: 1 })
		.with({ a: 2 })
		.with((acc) => ({ ...acc, b: acc!.a! * 10 }))
		.create()
	expect(s()).toEqual({ a: 2, b: 20 })
	expect(s({ a: 3 })).toEqual({ a: 3, b: 30 })
})

it('keeps a value an init function returns when a later init object does not set it', () => {
	const s = stub
		.builder<{ a: number; b: number }>((acc) => ({ ...acc, a: (acc?.a ?? 0) + 1 }))
		.with({ b: 2 })
		.create()
	expect(s({ a: 1 })).toEqual({ a: 2, b: 2 })
})

it('leaves the original builder unchanged when calling with()', () => {
	const base = stub.builder<{ a: number; b: number }>({ a: 1, b: 1 })
	const derived = base.with({ a: 2 })
	expect(base.create()()).toEqual({ a: 1, b: 1 })
	expect(derived.create()()).toEqual({ a: 2, b: 1 })
	expect(derived).not.toBe(base)
})

it('does not mutate the init objects', () => {
	const init = { a: { x: 1 } }
	const s = stub
		.builder<{ a: { x: number } }>(init)
		.with({ a: { x: 2 } })
		.create()
	s({ a: { x: 3 } })
	expect(init).toEqual({ a: { x: 1 } })
})
