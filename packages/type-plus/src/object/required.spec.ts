import { test } from 'vitest'

import { type ObjectPlus, type RequiredExcept, type RequiredOmit, type RequiredPick, testType } from '../index.js'

test('makes every property required and removes undefined', () => {
	testType.equal<ObjectPlus.Required<{ a?: number; b: string | undefined }>, { a: number; b: string }>(true)
	testType.equal<Required<{ a?: number; b: string | undefined }>, { a: number; b: string | undefined }>(true)
})

test('make picked properties required', () => {
	type Foo = {
		a?: number | undefined
		b?: number | undefined
		c: number
	}

	const y: RequiredPick<Foo, 'a'> = { a: 1, c: 2 }
	testType.equal<RequiredPick<{ a?: 1; b?: 2 }, 'a'>, { b?: 2 } & { a: 1 }>(true)

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

	const y: RequiredOmit<Foo, 'a'> = { b: 1, c: 2 }
	testType.equal<RequiredOmit<{ a?: 1; b?: 2 }, 'a'>, { a?: 1 } & { b: 2 }>(true)

	y.a = undefined
	testType.hasUndefined<typeof y.b>(false)
	testType.hasUndefined<typeof y.c>(false)
})

test('RequiredExcept is a deprecated alias of RequiredOmit', () => {
	testType.equal<RequiredExcept<{ a?: 1; b?: 2 }, 'a'>, RequiredOmit<{ a?: 1; b?: 2 }, 'a'>>(true)
})

// The 7.x definitions, kept to pin what changed when the pair was aligned with `PartialPick` and `PartialOmit`.
type RequiredPick7<T, U extends keyof T> = Required<Pick<T, U>> & Pick<T, Exclude<keyof T, U>>
type RequiredExcept7<T, U extends keyof T> = Required<Pick<T, Exclude<keyof T, U>>> & Pick<T, U>

test('distributes over a union T, where 7.x collapsed it to the shared keys', () => {
	type U = { k: 'x'; a?: 1 } | { k: 'y'; a?: 2; b?: 3 }

	testType.equal<RequiredPick<U, 'a'>, ({ k: 'x' } & { a: 1 }) | ({ k: 'y'; b?: 3 } & { a: 2 })>(true)
	testType.equal<RequiredPick7<U, 'a'>, { a: 1 | 2 } & { k: 'x' | 'y' }>(true)

	testType.equal<RequiredOmit<U, 'k'>, ({ k: 'x' } & { a: 1 }) | ({ k: 'y' } & { a: 2; b: 3 })>(true)
	testType.equal<RequiredExcept7<U, 'k'>, { a: 1 | 2 } & { k: 'x' | 'y' }>(true)
})

test('accepts a key of any union member, where 7.x accepted only the shared keys', () => {
	type U = { k: 'x' } | { k: 'y'; b?: 3 }

	testType.equal<RequiredPick<U, 'b'>, ({ k: 'x' } & {}) | ({ k: 'y' } & { b: 3 })>(true)
	// @ts-expect-error 'b' is not a key of every member
	type _ = RequiredPick7<U, 'b'>
})

test('rejects a key no member has', () => {
	// @ts-expect-error 'z' is not a key of any member
	type _ = RequiredPick<{ a?: 1 }, 'z'>
	// @ts-expect-error 'z' is not a key of any member
	type _2 = RequiredOmit<{ a?: 1 }, 'z'>
})
