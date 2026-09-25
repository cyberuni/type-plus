import { describe, expect, it, test } from 'vitest'

import { type ObjectPlus, pick, record, testType } from '../index.js'

describe('Pick<T, K>', () => {
	test('distributive pick', () => {
		type Action = InvokeAction | ReturnAction

		type InvokeAction = {
			type: 'invoke'
			id: string
			payload: string[]
		}

		type ReturnAction = {
			type: 'return'
			id: string
			payload: string
		}

		const x: ObjectPlus.Pick<Action, 'type' | 'payload'> = { type: 'invoke', payload: [] }

		const actions: Action[] = []

		actions.push({ ...x, id: '1' })
	})

	test('distributive pick with disjoined keys', () => {
		type Union =
			| {
					type: 'A'
					foo: string
			  }
			| {
					type: 'B'
					foo: string
					bar: string
			  }
		type Id<T> = { [P in keyof T]: T[P] }
		let x: Id<ObjectPlus.Pick<Union, 'type' | 'bar'>> = { type: 'A' }
		testType.equal<ObjectPlus.Pick<{ type: 'A' } | { type: 'B'; bar: 1 }, 'bar'>, {} | { bar: 1 }>(true)
		x = { type: 'B', bar: 'bar' }

		expect(x.bar).toBe('bar')
	})

	test('picks from each union member where the built-in picks from their common keys', () => {
		type U = { k: 'x'; x: 1 } | { k: 'y'; y: 2 }
		testType.equal<ObjectPlus.Pick<U, 'k'>, { k: 'x' } | { k: 'y' }>(true)
		testType.equal<Pick<U, 'k'>, { k: 'x' | 'y' }>(true)
	})

	test('intersection types with generic', () => {
		type Foo = { a: string; b: string }
		function foo<T>(input: ObjectPlus.Pick<Foo & T, 'a'>): void {
			expect(input.a satisfies string).toBeTypeOf('string')
		}
		foo({ a: '1' })
	})

	test('does not accept a generic T, which the built-in accepts', () => {
		function f<T, K extends keyof T>(x: T) {
			// @ts-expect-error the distribution over T is deferred
			const r: ObjectPlus.Pick<T, K> = x
			const b: Pick<T, K> = x
			return [r, b]
		}
		expect(f({ a: 1 })).toEqual([{ a: 1 }, { a: 1 }])
	})

	test('optional property remains optional', () => {
		type Foo = { a?: string; b: string }
		type A = ObjectPlus.Pick<Foo, 'a'>
		testType.canAssign<A, {}>(true)
		testType.equal<ObjectPlus.Pick<{ a: 1; b?: 2; c: 3 }, 'a' | 'b'>, { a: 1; b?: 2 }>(true)
	})

	test('pick never gets empty object', () => {
		type A = { a: number }
		type S = ObjectPlus.Pick<A, never>
		type K = keyof S
		testType.never<K>(true)
	})
})

describe(`${pick.name}()`, () => {
	it('picks properties from object', () => {
		const actual = pick({ a: 1, b: 2 }, 'a')

		expect(actual).toEqual({ a: 1 })

		const multiple = pick({ a: 1, b: 'x', c: true }, 'a', 'c')
		expect(multiple).toEqual({ a: 1, c: true })
		testType.equal<typeof multiple, { a: number; c: boolean }>(true)
	})

	it('supports more than 12 arguments', () => {
		const actual = pick({ a: 1, b: 1, c: 1 }, 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b')

		expect(actual).toEqual({ a: 1, b: 1 })
		testType.equal<'a' | 'b', keyof typeof actual>(true)
	})

	it('maintains the prototype null-ness', () => {
		expect(Object.getPrototypeOf(pick({ a: 1 }, 'a'))).not.toEqual(null)
		expect(Object.getPrototypeOf(pick(record({ a: 1 }), 'a'))).toEqual(null)
	})
})
