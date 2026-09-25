import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts string', () => {
	testType.string<string>(true)
	testType.string<''>(true)
	testType.string<'a'>(true)
})

it('accepts intersection of string', () => {
	testType.string<string & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.string<any>(false)
	testType.string<never>(false)
	testType.string<unknown>(false)
	testType.string<void>(false)

	testType.string<undefined>(false)
	testType.string<null>(false)
	testType.string<boolean>(false)
	testType.string<true>(false)
	testType.string<false>(false)
	testType.string<bigint>(false)
	testType.string<1n>(false)
	testType.string<number>(false)
	testType.string<0>(false)
	testType.string<symbol>(false)
	testType.string<{}>(false)
	testType.string<string[]>(false)
	testType.string<[]>(false)
	testType.string<Function>(false)
	testType.string<() => void>(false)
})
