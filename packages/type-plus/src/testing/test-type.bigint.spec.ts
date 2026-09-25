import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts bigint', () => {
	testType.bigint<bigint>(true)
	testType.bigint<0n>(true)
	testType.bigint<1n>(true)
})

it('accepts intersection of bigint', () => {
	testType.bigint<bigint & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.bigint<any>(false)
	testType.bigint<never>(false)
	testType.bigint<unknown>(false)
	testType.bigint<void>(false)

	testType.bigint<undefined>(false)
	testType.bigint<null>(false)
	testType.bigint<boolean>(false)
	testType.bigint<true>(false)
	testType.bigint<false>(false)
	testType.bigint<number>(false)
	testType.bigint<1>(false)
	testType.bigint<string>(false)
	testType.bigint<''>(false)
	testType.bigint<symbol>(false)
	testType.bigint<{}>(false)
	testType.bigint<string[]>(false)
	testType.bigint<[]>(false)
	testType.bigint<Function>(false)
	testType.bigint<() => void>(false)
})
