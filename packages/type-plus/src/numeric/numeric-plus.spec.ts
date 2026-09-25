import { it } from 'vitest'

import { isType, type NumericPlus, testType } from '../index.js'

it('exports', () => {
	isType<NumericPlus.Zero>(-0)
	isType<NumericPlus.Numeric>(1)
})

it('IsNumeric behaves like the top level IsNumeric', () => {
	testType.equal<NumericPlus.IsNumeric<1n>, true>(true)
})

it('IsPositive behaves like the top level IsPositive', () => {
	testType.equal<NumericPlus.IsPositive<-1>, false>(true)
})
