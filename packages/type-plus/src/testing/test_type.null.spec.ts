import { it } from 'vitest'

import { testType } from './test_type.js'

it('accepts null', () => {
	testType.null<null>(true)
})

it('rejects undefined', () => {
	testType.null<undefined>(false)
})

it('treat special types as not true', () => {
	testType.null<any>(false)
	testType.null<unknown>(false)
	testType.null<never>(false)
	testType.null<void>(false)
})

it('treat all other types as not true', () => {
	testType.null<undefined>(false)
	testType.null<number>(false)
	testType.null<string>(false)
	testType.null<''>(false)
	testType.null<symbol>(false)
	testType.null<bigint>(false)
	testType.null<{}>(false)
	testType.null<string[]>(false)
	testType.null<[]>(false)
	testType.null<Function>(false)
	testType.null<() => void>(false)
})

it('hasNull accepts null and unions containing null', () => {
	testType.hasNull<null>(true)
	testType.hasNull<number | null>(true)
	testType.hasNull<undefined | null>(true)
	testType.hasNull<undefined | null | string>(true)
})

it('hasNull rejects types without null', () => {
	testType.hasNull<number>(false)
	testType.hasNull<undefined>(false)
	testType.hasNull<number | undefined>(false)
	testType.hasNull<() => void>(false)
})

it('hasNull treats special types as not containing null', () => {
	testType.hasNull<any>(false)
	testType.hasNull<unknown>(false)
	testType.hasNull<never>(false)
	testType.hasNull<void>(false)
})
