import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts Function', () => {
	testType.strictFunction<Function>(true)
})

it('rejects function signatures', () => {
	testType.strictFunction<() => void>(false)
})

it('rejects union of function with non-function', () => {
	testType.strictFunction<Function | { a: 1 }>(false)
})

it('rejects intersection of function', () => {
	testType.strictFunction<Function & { a: 1 }>(false)
})

it('rejects others', () => {
	testType.strictFunction<any>(false)
	testType.strictFunction<never>(false)
	testType.strictFunction<unknown>(false)
	testType.strictFunction<void>(false)

	testType.strictFunction<undefined>(false)
	testType.strictFunction<null>(false)
	testType.strictFunction<boolean>(false)
	testType.strictFunction<true>(false)
	testType.strictFunction<false>(false)
	testType.strictFunction<number>(false)
	testType.strictFunction<1>(false)
	testType.strictFunction<bigint>(false)
	testType.strictFunction<1n>(false)
	testType.strictFunction<string>(false)
	testType.strictFunction<''>(false)
	testType.strictFunction<symbol>(false)
	testType.strictFunction<bigint>(false)
	testType.strictFunction<{}>(false)
	testType.strictFunction<string[]>(false)
	testType.strictFunction<[]>(false)
})

it('stays exact when `exact: false` is passed', () => {
	testType.strictFunction<() => void, { exact: false }>(false)
	testType.strictFunction<Function, { exact: false }>(true)
})
