import { describe, expect, it, test } from 'vitest'

import { assertType, type Except, type Omit, omit, record, testType } from '../index.js'

describe('Omit<T, K>', () => {
	test('work with primitive types', () => {
		type N = Omit<number, 'toFixed'>
		assertType.isFunction((() => ({})) as N['toExponential'])
	})

	test('Remove properties', () => {
		type Foo = {
			a: number
			b: string
			c: boolean
		}

		type Actual = Omit<Foo, 'c'>
		const a: Actual = { a: 0, b: '' }
		assertType.isNumber(a.a)
		assertType.isString(a.b)

		type Revert = Omit<Foo, keyof Actual>
		const r: Revert = { c: false }
		assertType.isBoolean(r.c)
	})

	test('distributive omit', () => {
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

		const x: Omit<Action, 'id'> = { type: 'return', payload: '' }

		const actions: Action[] = []

		actions.push({ ...x, id: '1' })
	})

	test('distributive Omit with disjoined keys', () => {
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
		// eslint-disable-next-line @typescript-eslint/ban-types
		type Id<T> = {} & { [P in keyof T]: T[P] }
		let x: Id<Omit<Union, 'bar'>> = { type: 'A', foo: 'foo' }
		x = { type: 'B', foo: 'bar' }
		expect(x.foo).toBe('bar')
	})
})

describe(`${omit.name}()`, () => {
	it('omits properties from object', () => {
		const actual = omit({ a: 1, b: 2 }, 'a')

		expect(actual).toEqual({ b: 2 })
		testType.equal<'b', keyof typeof actual>(true)
	})

	it('returns a empty object type when all props are omitted', () => {
		const actual = omit({ a: 1, b: 1 }, 'a', 'b')

		expect(actual).toEqual({})
		testType.equal<never, keyof typeof actual>(true)
	})

	it('can object from generic record', () => {
		const i: Record<string, any> = { a: 1, b: 2 }
		const r = omit(i, 'a')
		expect(r).toEqual({ b: 2 })
		testType.equal<Record<string, any>, typeof r>(true)
	})

	it('supports more than 12 arguments', () => {
		const actual = omit({ a: 1, b: 1, c: 1 }, 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'b')

		expect(actual).toEqual({ c: 1 })
		testType.equal<keyof typeof actual, 'c'>(true)
	})

	it('maintains the prototype null-ness', () => {
		expect(Object.getPrototypeOf(omit({ a: 1 }, 'a'))).not.toEqual(null)
		expect(Object.getPrototypeOf(omit(record({ a: 1 }), 'a'))).toEqual(null)
	})
})

describe('Except()', () => {
	test('Remove properties', () => {
		type Foo = {
			a: number
			b: string
			c: boolean
		}

		type Actual = Except<Foo, 'c'>
		const a: Actual = { a: 0, b: '' }
		assertType.isNumber(a.a)
		assertType.isString(a.b)

		// tslint:disable-next-line: deprecation
		type Revert = Except<Foo, keyof Actual>
		const r: Revert = { c: false }
		assertType.isBoolean(r.c)
	})
})
