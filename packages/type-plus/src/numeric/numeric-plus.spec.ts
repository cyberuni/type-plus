import { it } from 'vitest'

import { type NumericPlus, testType } from '../index.js'

it('exports', () => {
	;-0 satisfies NumericPlus.Zero
	1 satisfies NumericPlus.Numeric
})

it('IsNumeric behaves like the top level IsNumeric', () => {
	testType.equal<NumericPlus.IsNumeric<1n>, true>(true)
})

it('IsPositive behaves like the top level IsPositive', () => {
	testType.equal<NumericPlus.IsPositive<-1>, false>(true)
})
