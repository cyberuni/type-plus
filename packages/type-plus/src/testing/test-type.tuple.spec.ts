import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts tuple', () => {
	testType.tuple<[]>(true)
	testType.tuple<[1]>(true)
	testType.tuple<[1, 2]>(true)
})

it('accepts union of tuples', () => {
	testType.tuple<[1] | [2]>(true)
})

it('rejects union of tuple with non-tuple', () => {
	testType.tuple<[] | true>(false)
})

it('accepts intersection of tuple', () => {
	testType.tuple<[1] & { b: string }>(true)
})

it('rejects others', () => {
	testType.tuple<any>(false)
	testType.tuple<never>(false)
	testType.tuple<unknown>(false)
	testType.tuple<void>(false)

	testType.tuple<undefined>(false)
	testType.tuple<null>(false)
	testType.tuple<boolean>(false)
	testType.tuple<true>(false)
	testType.tuple<false>(false)
	testType.tuple<number>(false)
	testType.tuple<1>(false)
	testType.tuple<bigint>(false)
	testType.tuple<1n>(false)
	testType.tuple<string>(false)
	testType.tuple<''>(false)
	testType.tuple<bigint>(false)
	testType.tuple<symbol>(false)
	testType.tuple<Function>(false)
	testType.tuple<() => void>(false)
	testType.tuple<string[]>(false)
})
