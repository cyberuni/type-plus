import { test } from 'vitest'

import { type CreateTuple, testType } from '../index.js'

test('create empty tuple', () => {
	testType.equal<[], CreateTuple<0>>(true)
})

test('single element', () => {
	testType.equal<[unknown], CreateTuple<1>>(true)
})

test('multiple elements', () => {
	type A = CreateTuple<3>
	testType.equal<[unknown, unknown, unknown], A>(true)
})

test('override element type', () => {
	type A = CreateTuple<5, 1>
	testType.equal<[1, 1, 1, 1, 1], A>(true)
})

test('negative length gets never', () => {
	testType.equal<never, CreateTuple<-1>>(true)
})

test('Can create tuple up to 9999', () => {
	type A = CreateTuple<9999>['length']

	testType.equal<9999, A>(true)
})

test('L = number gets array', () => {
	type A = CreateTuple<number, 1>
	testType.equal<1[], A>(true)
})

test('Non whole number gets never', () => {
	type A = CreateTuple<1.2>

	testType.equal<never, A>(true)
})

test('can specify fail type', () => {
	type A = CreateTuple<1.2, 1, null>

	testType.equal<null, A>(true)
})
