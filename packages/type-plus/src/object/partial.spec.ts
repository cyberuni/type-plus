import { it, test } from 'vitest'

import { type ObjectPlus, type PartialOmit, type PartialPick, testType } from '../index.js'

test('work on primitive type', () => {
	type Foo = PartialPick<number, 'toFixed'>
	const x: Foo = 1
	const toFixed = 1 as unknown as 1['toFixed'] | undefined
	toFixed satisfies (typeof x)['toFixed']
})

test('make picked properties optional', () => {
	type Foo = {
		a: number
		b: number
		c: number
	}

	const y: PartialPick<Foo, 'a'> = { b: 1, c: 2 }
	testType.equal<PartialPick<{ a: 1; b: 2; c: 3 }, 'a'>, { b: 2; c: 3 } & { a?: 1 | undefined }>(true)

	y.a = undefined
	testType.hasUndefined<typeof y.b>(false)
	testType.hasUndefined<typeof y.c>(false)
})

test('make not specified properties optional', () => {
	type Foo = {
		a: number
		b: number
		c: number
	}

	const y: PartialOmit<Foo, 'a'> = { a: 1 }
	testType.equal<PartialOmit<{ a: 1; b: 2; c: 3 }, 'a'>, { a: 1 } & { b?: 2 | undefined; c?: 3 | undefined }>(true)

	testType.hasUndefined<typeof y.a>(false)
	y.b = undefined
	y.c = undefined
})

it('adds undefined to each property, which only differs from the built-in under exactOptionalPropertyTypes', () => {
	testType.equal<ObjectPlus.Partial<{ a: number }>, { a?: number | undefined }>(true)
	testType.equal<Partial<{ a: number }>, { a?: number }>(true)
})
