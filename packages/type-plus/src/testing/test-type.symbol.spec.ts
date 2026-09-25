import { it } from 'vitest'

import { testType } from '../index.js'

const s1 = Symbol()
type S1 = typeof s1
const s2 = Symbol()
type S2 = typeof s2

it('accepts symbol', () => {
	testType.symbol<symbol>(true)
})

it('accepts unique symbol', () => {
	testType.symbol<S1>(true)
})

it('accepts union of symbols', () => {
	testType.symbol<S1 | S2>(true)
})

it('rejects union of symbol with non-symbol', () => {
	testType.symbol<S1 | true>(false)
})

it('accepts intersection of symbol', () => {
	testType.symbol<S1 & { b: string }>(true)
})

it('rejects others', () => {
	testType.symbol<any>(false)
	testType.symbol<never>(false)
	testType.symbol<unknown>(false)
	testType.symbol<void>(false)

	testType.symbol<undefined>(false)
	testType.symbol<null>(false)
	testType.symbol<boolean>(false)
	testType.symbol<true>(false)
	testType.symbol<false>(false)
	testType.symbol<number>(false)
	testType.symbol<1>(false)
	testType.symbol<bigint>(false)
	testType.symbol<1n>(false)
	testType.symbol<string>(false)
	testType.symbol<''>(false)
	testType.symbol<bigint>(false)
	testType.symbol<Function>(false)
	testType.symbol<() => void>(false)
	testType.symbol<string[]>(false)
	testType.symbol<[]>(false)
})
