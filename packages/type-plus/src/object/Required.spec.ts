import { test } from 'vitest'

import { type Required, type RequiredExcept, type RequiredPick, testType } from '../index.js'

test('makes every property required and removes undefined', () => {
	testType.equal<Required<{ a?: number; b: string | undefined }>, { a: number; b: string }>(true)
})

test('make picked properties required', () => {
	type Foo = {
		a?: number | undefined
		b?: number | undefined
		c: number
	}

	const y: RequiredPick<Foo, 'a'> = { a: 1, c: 2 }

	testType.equal<typeof y.a, number>(true)
	y.b = undefined
	testType.equal<typeof y.c, number>(true)
})

test('make not picked properties required', () => {
	type Foo = {
		a?: number | undefined
		b?: number | undefined
		c: number
	}

	const y: RequiredExcept<Foo, 'a'> = { b: 1, c: 2 }

	y.a = undefined
	testType.hasUndefined<typeof y.b>(false)
	testType.hasUndefined<typeof y.c>(false)
})
