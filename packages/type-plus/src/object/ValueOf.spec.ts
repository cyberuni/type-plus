import { test } from 'vitest'

import { testType, type ValueOf } from '../index.js'

test('work with primitive type', () => {
	type A = ValueOf<string>
	testType.equal<never, A>(false)
})

test('If all values has the same type, the result is of that type', () => {
	const HTTP_METHOD = {
		GET: 'GET',
		POST: 'POST',
		DELETE: 'DELETE',
		PUT: 'PUT',
	}
	type A = ValueOf<typeof HTTP_METHOD>
	testType.equal<string, A>(true)
})

test('If value has multiple types, the result is the union of those types', () => {
	const logLevel = {
		none: '0',
		error: '1',
		warn: 2,
		info: 3,
		debug: 4,
	}
	type A = ValueOf<typeof logLevel>
	testType.equal<string | number, A>(true)
})

test('literal types are preserved', () => {
	type L = { a: 1; b: 2; c: 'a'; d: 'b' }
	type A = ValueOf<L>
	testType.equal<1 | 2 | 'a' | 'b', A>(true)
})
