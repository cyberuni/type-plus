import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts number', () => {
	testType.number<number>(true)
	testType.number<-1>(true)
	testType.number<0>(true)
	testType.number<1>(true)
})

it('accepts intersection of number', () => {
	testType.number<number & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.number<any>(false)
	testType.number<never>(false)
	testType.number<unknown>(false)
	testType.number<void>(false)

	testType.number<undefined>(false)
	testType.number<null>(false)
	testType.number<boolean>(false)
	testType.number<true>(false)
	testType.number<false>(false)
	testType.number<bigint>(false)
	testType.number<1n>(false)
	testType.number<string>(false)
	testType.number<''>(false)
	testType.number<symbol>(false)
	testType.number<{}>(false)
	testType.number<string[]>(false)
	testType.number<[]>(false)
	testType.number<Function>(false)
	testType.number<() => void>(false)
})
