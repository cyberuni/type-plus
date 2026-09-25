import { it } from 'vitest'

import { type StringToBigint, testType } from '../index.js'

it('casts a string with the n suffix', () => {
	testType.equal<StringToBigint<'1n'>, 1n>(true)
	testType.equal<StringToBigint<'-1n'>, -1n>(true)
	testType.equal<StringToBigint<'0n'>, 0n>(true)
	testType.equal<StringToBigint<'-0n'>, 0n>(true)
})

it('fails on a string without the n suffix', () => {
	testType.never<StringToBigint<'1'>>(true)
	testType.never<StringToBigint<'a'>>(true)
})

it('can override the fail case', () => {
	testType.equal<StringToBigint<'1', { $fail: 'no' }>, 'no'>(true)
})
