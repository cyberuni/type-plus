import { expect, it } from 'vitest'
import { stub, testType } from './index.js'

it('can specify init as value', () => {
	type S = { a: number; b: string }
	const s = stub.build<S>({ b: 'b' })
	const a = s({ a: 1 })
	expect(a).toEqual({ a: 1, b: 'b' })
	testType.equal<typeof a, S>(true)
})

it('accepts a init function', () => {
	let count = 0
	const s = stub.build<{ a: number; b: string }>(() => ({ a: count++ }))
	expect(s()).toEqual({ a: 0 })
	expect(s()).toEqual({ a: 1 })
})

it('pass stub input to the init function', () => {
	const s = stub.build<{ a: number; b: string }>((stub) => ({ a: (stub?.a ?? 0) + 1 }))
	expect(s({ a: 1 })).toEqual({ a: 2 })
})

it('lets the init function decide which values win', () => {
	type User = { id: string; name: string; profile: { email: string } }
	const createUser = stub.build<User>((s) => ({
		id: '1',
		name: 'Alice',
		...s,
		profile: { email: `${s?.name ?? 'alice'}@example.com`, ...s?.profile },
	}))
	const r = createUser({ name: 'bob' })
	expect(r).toEqual({ id: '1', name: 'bob', profile: { email: 'bob@example.com' } })
	testType.equal<typeof r, User>(true)
})
