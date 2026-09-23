import { test } from 'vitest'

import { type IsDisjoint, testType } from '../index.js'

test('disjoint returns true', () => {
	type A = { a: 1 }
	type B = { b: 1 }
	testType.true<IsDisjoint<A, B>>(true)
})

test('same type returns false', () => {
	type A = { a: 1 }
	type B = { a: 1 }
	testType.false<IsDisjoint<A, B>>(true)
})

test('A subset of B returns false', () => {
	type A = { a: 1 }
	type B = { a: 1; b: 1 }
	testType.false<IsDisjoint<A, B>>(true)
})

test('B subset of A returns false', () => {
	type A = { a: 1; b: 1 }
	type B = { a: 1 }
	testType.false<IsDisjoint<A, B>>(true)
})

test('literal records', () => {
	testType.true<IsDisjoint<{ a: 1 }, { b: 1 }>>(true)
	testType.false<IsDisjoint<{ a: 1 }, { a: 2; b: 1 }>>(true)
})
