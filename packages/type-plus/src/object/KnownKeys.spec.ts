import { test } from 'vitest'

import { assertType, type KnownKeys, testType } from '../index.js'

test('pick out only known keys', () => {
	type A = {
		a?: boolean
		b?: number
		[k: string]: any
	}

	const input: A = {}
	const actual = getKnownKeys(input)
	assertType<'a' | 'b'>(actual)
})

test('primitive type yields never', () => {
	assertType<never>(getKnownKeys(undefined))
	assertType<never>(getKnownKeys(true))
	assertType<never>(getKnownKeys(false))
	assertType<never>(getKnownKeys(null))
	assertType<never>(getKnownKeys('str'))
	assertType<never>(getKnownKeys(1))
	assertType<never>(getKnownKeys({}))
	assertType<never>(getKnownKeys([]))
})

test('literal gets keys', () => {
	assertType<'a'>(getKnownKeys({ a: 1 }))
})

test('empty record yields never', () => {
	const x: Record<any, any> = {}
	const actual = getKnownKeys(x)
	assertType<never>(actual)
})

test('resolves to never for every input', () => {
	// `never` for every input -- the type no longer does what its name says.
	// Pinned to the actual behavior; see the TSDoc note on `KnownKeys`.
	testType.equal<KnownKeys<{ a: 1; b: 2 }>, never>(true)
	testType.equal<KnownKeys<{ a?: boolean; [k: string]: any }>, never>(true)
	testType.equal<KnownKeys<string>, never>(true)
})

function getKnownKeys<T>(_value: T): KnownKeys<T> {
	return {} as unknown as KnownKeys<T>
}
