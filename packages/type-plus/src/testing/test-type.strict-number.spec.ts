import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts number', () => {
	testType.strictNumber<number>(true)
})

it('rejects number literal', () => {
	testType.strictNumber<-1>(false)
	testType.strictNumber<0>(false)
	testType.strictNumber<1>(false)
})

it('accepts intersection with number', () => {
	testType.strictNumber<number & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.strictNumber<any>(false)
	testType.strictNumber<never>(false)
	testType.strictNumber<unknown>(false)
	testType.strictNumber<void>(false)

	testType.strictNumber<undefined>(false)
	testType.strictNumber<null>(false)
	testType.strictNumber<boolean>(false)
	testType.strictNumber<true>(false)
	testType.strictNumber<false>(false)
	testType.strictNumber<bigint>(false)
	testType.strictNumber<1n>(false)
	testType.strictNumber<string>(false)
	testType.strictNumber<''>(false)
	testType.strictNumber<symbol>(false)
	testType.strictNumber<{}>(false)
	testType.strictNumber<string[]>(false)
	testType.strictNumber<[]>(false)
	testType.strictNumber<Function>(false)
	testType.strictNumber<() => void>(false)
})
