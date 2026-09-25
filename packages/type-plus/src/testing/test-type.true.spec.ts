import { it } from 'vitest'

import { testType } from './test-type.js'

it('accepts true and false', () => {
	testType.true<true>(true)
	testType.true<false>(false)
})

it('treat boolean as not true', () => {
	testType.true<boolean>(false)
})

it('treat special types as not true', () => {
	testType.true<any>(false)
	testType.true<unknown>(false)
	testType.true<never>(false)
	testType.true<void>(false)
})

it('treat all other types as not true', () => {
	testType.true<undefined>(false)
	testType.true<null>(false)
	testType.true<number>(false)
	testType.true<string>(false)
	testType.true<''>(false)
	testType.true<symbol>(false)
	testType.true<bigint>(false)
	testType.true<{}>(false)
	testType.true<string[]>(false)
	testType.true<[]>(false)
	testType.true<Function>(false)
	testType.true<() => void>(false)
})

it('treat union type as not true', () => {
	testType.true<true | false>(false)
	testType.true<true | 1>(false)
})

it('treat intersection type as not true', () => {
	testType.true<true & 1>(false)
	testType.true<{} & {}>(false)
})
