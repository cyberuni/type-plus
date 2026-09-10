import { it } from 'vitest'

import { isType, type NumberPlus, testType } from '../index.js'

it('exports', () => {
	isType<NumberPlus.Zero>(-0)
	testType.false<NumberPlus.IsNumber<1, { exact: true }>>(true)
})

it('IsNumber behaves like the top level IsNumber', () => {
	testType.equal<NumberPlus.IsNumber<1>, true>(true)
})

it('re-exports IsInteger from the numeric family', () => {
	testType.equal<NumberPlus.IsInteger<1.1>, false>(true)
})
