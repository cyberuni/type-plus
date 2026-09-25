import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts boolean', () => {
	testType.boolean<boolean>(true)
	testType.boolean<true>(true)
	testType.boolean<false>(true)
})

it('accepts intersection of boolean', () => {
	testType.boolean<boolean & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.boolean<any>(false)
	testType.boolean<never>(false)
	testType.boolean<unknown>(false)
	testType.boolean<void>(false)

	testType.boolean<undefined>(false)
	testType.boolean<null>(false)
	testType.boolean<number>(false)
	testType.boolean<1>(false)
	testType.boolean<bigint>(false)
	testType.boolean<1n>(false)
	testType.boolean<string>(false)
	testType.boolean<''>(false)
	testType.boolean<symbol>(false)
	testType.boolean<bigint>(false)
	testType.boolean<{}>(false)
	testType.boolean<string[]>(false)
	testType.boolean<[]>(false)
	testType.boolean<Function>(false)
	testType.boolean<() => void>(false)
})
