import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts Function', () => {
	testType.function<Function>(true)
})

it('accepts function signatures', () => {
	testType.function<() => void>(true)
})

it('accepts union of functions', () => {
	testType.function<(() => void) | ((x: number) => number)>(true)
})

it('rejects union of function with non-function', () => {
	testType.function<(() => void) | { a: 1 }>(false)
})

it('accepts intersection of function', () => {
	testType.function<(() => void) & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.function<any>(false)
	testType.function<never>(false)
	testType.function<unknown>(false)
	testType.function<void>(false)

	testType.function<undefined>(false)
	testType.function<null>(false)
	testType.function<boolean>(false)
	testType.function<true>(false)
	testType.function<false>(false)
	testType.function<number>(false)
	testType.function<1>(false)
	testType.function<bigint>(false)
	testType.function<1n>(false)
	testType.function<string>(false)
	testType.function<''>(false)
	testType.function<symbol>(false)
	testType.function<bigint>(false)
	testType.function<{}>(false)
	testType.function<string[]>(false)
	testType.function<[]>(false)
})
