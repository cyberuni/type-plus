import { it } from 'vitest'

import { type StringToNumber, testType } from '../index.js'

it('casts an integer string', () => {
	testType.equal<StringToNumber<'1'>, 1>(true)
	testType.equal<StringToNumber<'-1'>, -1>(true)
	testType.equal<StringToNumber<'0'>, 0>(true)
	testType.equal<StringToNumber<'-0'>, 0>(true)
})

it('casts a float string, dropping trailing zeros', () => {
	testType.equal<StringToNumber<'1.5'>, 1.5>(true)
	testType.equal<StringToNumber<'1.50'>, 1.5>(true)
	testType.equal<StringToNumber<'1.0'>, 1>(true)
})

it('fails on a string that is not a number', () => {
	testType.never<StringToNumber<'a'>>(true)
	testType.never<StringToNumber<'1n'>>(true)
})

it('can override the fail case', () => {
	testType.equal<StringToNumber<'a', { $fail: 'NaN' }>, 'NaN'>(true)
})
