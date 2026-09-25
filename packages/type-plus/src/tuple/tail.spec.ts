import { test } from 'vitest'

import { type Tail, testType } from '../index.js'

test('get tail types', () => {
	type S = [1, 'a', 'b']
	type A = Tail<S>

	testType.equal<A, ['a', 'b']>(true)
	testType.equal<Tail<[1, 'a', 'b']>, ['a', 'b']>(true)
})

test('empty tuple gets never', () => {
	type S = []
	type A = Tail<S>

	testType.never<A>(true)
	testType.never<Tail<[]>>(true)
})

test('array gets same type', () => {
	type A = Tail<string[]>

	testType.equal<A, string[]>(true)
})

test('union array', () => {
	type A = Tail<Array<string | boolean>>

	testType.equal<A, Array<string | boolean>>(true)
})

test('tuple with rest', () => {
	type A = Tail<[number, ...string[]]>
	testType.equal<A, string[]>(true)
})
