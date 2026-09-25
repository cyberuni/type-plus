import { it } from 'vitest'

import { testType } from './test-type.js'

it('expects never', () => {
	testType.never<never>(true)
})

it('treat other special types as not true', () => {
	testType.never<any>(false)
	testType.never<unknown>(false)
	testType.never<void>(false)
})

it('treat all other types as not true', () => {
	testType.never<undefined>(false)
	testType.never<null>(false)
	testType.never<boolean>(false)
	testType.never<true>(false)
	testType.never<false>(false)
	testType.never<number>(false)
	testType.never<1>(false)
	testType.never<string>(false)
	testType.never<''>(false)
	testType.never<symbol>(false)
	testType.never<bigint>(false)
	testType.never<{}>(false)
	testType.never<string[]>(false)
	testType.never<[]>(false)
	testType.never<Function>(false)
	testType.never<() => void>(false)
})

it('treat union type as not true', () => {
	testType.never<never | false>(false)
	testType.never<never | 1>(false)
})

it('treat non-never intersection type as not true', () => {
	testType.never<{} & {}>(false)
})
