import { expect, it } from 'vitest'

import { stub, testType } from '../index.js'

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
