import { it } from 'vitest'

import { testType } from './test-type.js'

it('accepts array', () => {
	testType.array<string[]>(true)
	testType.array<Array<{ a: number }>>(true)
})

it('rejects tuples', () => {
	testType.array<[]>(false)
	testType.array<[number]>(false)
})

it('treat special types as not true', () => {
	testType.array<any>(false)
	testType.array<unknown>(false)
	testType.array<never>(false)
	testType.array<void>(false)
})

it('treat all other types as not true', () => {
	testType.array<undefined>(false)
	testType.array<null>(false)
	testType.array<number>(false)
	testType.array<string>(false)
	testType.array<''>(false)
	testType.array<symbol>(false)
	testType.array<bigint>(false)
	testType.array<{}>(false)
	testType.array<[]>(false)
	testType.array<Function>(false)
	testType.array<() => void>(false)
})
