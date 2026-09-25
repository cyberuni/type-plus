import { test } from 'vitest'

import { type KnownKeys, testType } from '../index.js'

test('pick out only known keys', () => {
	type A = {
		a?: boolean
		b?: number
		[k: string]: any
	}

	const input: A = {}
	const actual = getKnownKeys(input)
	actual satisfies 'a' | 'b'
})

test('primitive type yields never', () => {
	getKnownKeys(undefined) satisfies never
	getKnownKeys(true) satisfies never
	getKnownKeys(false) satisfies never
	getKnownKeys(null) satisfies never
	getKnownKeys('str') satisfies never
	getKnownKeys(1) satisfies never
	getKnownKeys({}) satisfies never
	getKnownKeys([]) satisfies never
})

test('literal gets keys', () => {
	getKnownKeys({ a: 1 }) satisfies 'a'
})

test('empty record yields never', () => {
	const x: Record<any, any> = {}
	const actual = getKnownKeys(x)
	actual satisfies never
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
