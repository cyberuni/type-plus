import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts Object', () => {
	testType.object<Object>(true)
})

it('accepts object definitions', () => {
	testType.object<{ a: number }>(true)
})

it('accepts Function', () => {
	testType.object<Function>(true)
})

it('accepts function signatures', () => {
	testType.object<() => void>(true)
})

it('accepts array', () => {
	testType.object<string[]>(true)
})

it('accepts tuple', () => {
	testType.object<[]>(true)
})

it('accepts union of objects', () => {
	testType.object<{ a: number } | { b: string }>(true)
})

it('rejects union of function with non-function', () => {
	testType.object<(() => void) | true>(false)
})

it('accepts intersection of objects', () => {
	testType.object<{ a: 1 } & { b: string }>(true)
})

it('accepts intersection of object and function', () => {
	testType.object<(() => void) & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.object<any>(false)
	testType.object<never>(false)
	testType.object<unknown>(false)
	testType.object<void>(false)

	testType.object<undefined>(false)
	testType.object<null>(false)
	testType.object<boolean>(false)
	testType.object<true>(false)
	testType.object<false>(false)
	testType.object<number>(false)
	testType.object<1>(false)
	testType.object<bigint>(false)
	testType.object<1n>(false)
	testType.object<string>(false)
	testType.object<''>(false)
	testType.object<symbol>(false)
	testType.object<bigint>(false)
})
