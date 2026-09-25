import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts unknown', () => {
	testType.unknown<unknown>(true)
})

it('rejects others', () => {
	testType.unknown<any>(false)
	testType.unknown<never>(false)
	testType.unknown<void>(false)

	testType.unknown<undefined>(false)
	testType.unknown<null>(false)
	testType.unknown<boolean>(false)
	testType.unknown<true>(false)
	testType.unknown<false>(false)
	testType.unknown<number>(false)
	testType.unknown<1>(false)
	testType.unknown<bigint>(false)
	testType.unknown<1n>(false)
	testType.unknown<string>(false)
	testType.unknown<''>(false)
	testType.unknown<symbol>(false)
	testType.unknown<bigint>(false)
	testType.unknown<{}>(false)
	testType.unknown<string[]>(false)
	testType.unknown<[]>(false)
	testType.unknown<Function>(false)
	testType.unknown<() => void>(false)
})
