import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts void', () => {
	testType.void<void>(true)
})

it('rejects others', () => {
	testType.void<any>(false)
	testType.void<never>(false)
	testType.void<unknown>(false)

	testType.void<undefined>(false)
	testType.void<null>(false)
	testType.void<boolean>(false)
	testType.void<true>(false)
	testType.void<false>(false)
	testType.void<number>(false)
	testType.void<1>(false)
	testType.void<bigint>(false)
	testType.void<1n>(false)
	testType.void<string>(false)
	testType.void<''>(false)
	testType.void<symbol>(false)
	testType.void<bigint>(false)
	testType.void<{}>(false)
	testType.void<string[]>(false)
	testType.void<[]>(false)
	testType.void<Function>(false)
	testType.void<() => void>(false)
})

it('hasVoid accepts void and unions containing void', () => {
	testType.hasVoid<void>(true)
	testType.hasVoid<number | void>(true)
	testType.hasVoid<string | void>(true)
})

it('hasVoid rejects types without void', () => {
	testType.hasVoid<number>(false)
	testType.hasVoid<undefined>(false)
	testType.hasVoid<null>(false)
	testType.hasVoid<number | undefined>(false)
})

it('hasVoid treats special types as not containing void', () => {
	testType.hasVoid<any>(false)
	testType.hasVoid<unknown>(false)
	testType.hasVoid<never>(false)
})
