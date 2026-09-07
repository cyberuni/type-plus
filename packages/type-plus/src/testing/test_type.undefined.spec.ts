import { it } from 'vitest'

import { testType } from './test_type.js'

it('accepts undefined', () => {
	testType.undefined<undefined>(true)
})

it('rejects null', () => {
	testType.undefined<null>(false)
})

it('treat special types as not true', () => {
	testType.undefined<any>(false)
	testType.undefined<unknown>(false)
	testType.undefined<never>(false)
	testType.undefined<void>(false)
})

it('treat all other types as not true', () => {
	testType.undefined<null>(false)
	testType.undefined<number>(false)
	testType.undefined<string>(false)
	testType.undefined<''>(false)
	testType.undefined<symbol>(false)
	testType.undefined<bigint>(false)
	testType.undefined<{}>(false)
	testType.undefined<string[]>(false)
	testType.undefined<[]>(false)
	testType.undefined<Function>(false)
	testType.undefined<() => void>(false)
})

it('hasUndefined accepts undefined and unions containing undefined', () => {
	testType.hasUndefined<undefined>(true)
	testType.hasUndefined<number | undefined>(true)
	testType.hasUndefined<undefined | null>(true)
	testType.hasUndefined<undefined | null | string>(true)
})

it('hasUndefined rejects types without undefined', () => {
	testType.hasUndefined<number>(false)
	testType.hasUndefined<null>(false)
	testType.hasUndefined<number | null>(false)
	testType.hasUndefined<() => void>(false)
})

it('hasUndefined treats special types as not containing undefined', () => {
	testType.hasUndefined<any>(false)
	testType.hasUndefined<unknown>(false)
	testType.hasUndefined<never>(false)
	testType.hasUndefined<void>(false)
})

it('hasUndefined asserts where a distributive check cannot', () => {
	// `distributive: true` widens to `boolean`, which accepts either argument
	testType.undefined<number | undefined, { distributive: true }>(true)
	testType.undefined<number | undefined, { distributive: true }>(false)

	// `hasUndefined` folds the branches back into a single `true`
	testType.hasUndefined<number | undefined>(true)
})
