import { it } from 'vitest'

import { testType } from './test-type.js'

it('accepts true and false', () => {
	testType.false<false>(true)
	testType.false<true>(false)
})

it('treat boolean as not true', () => {
	testType.false<boolean>(false)
})

it('treat special types as not true', () => {
	testType.false<any>(false)
	testType.false<unknown>(false)
	testType.false<never>(false)
	testType.false<void>(false)
})

it('treat all other types as not true', () => {
	testType.false<undefined>(false)
	testType.false<null>(false)
	testType.false<number>(false)
	testType.false<string>(false)
	testType.false<''>(false)
	testType.false<symbol>(false)
	testType.false<bigint>(false)
	testType.false<{}>(false)
	testType.false<string[]>(false)
	testType.false<[]>(false)
	testType.false<Function>(false)
	testType.false<() => void>(false)
})

it('treat union type as not true', () => {
	testType.false<true | false>(false)
	testType.false<true | 1>(false)
})

it('treat intersection type as not true', () => {
	testType.false<true & 1>(false)
	testType.false<{} & {}>(false)
})
