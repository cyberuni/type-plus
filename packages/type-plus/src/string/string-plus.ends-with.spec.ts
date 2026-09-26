import { it } from 'vitest'

import { type $Else, type $Then, type StringPlus, testType } from '../index.js'

it('returns true when Subject ends with Search', () => {
	testType.equal<StringPlus.EndsWith<'abc', 'bc'>, true>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'c'>, true>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'abc'>, true>(true)
})

it('returns false when Subject does not end with Search', () => {
	testType.equal<StringPlus.EndsWith<'abc', 'ab'>, false>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'b'>, false>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'zabc'>, false>(true)
})

it('matches every string literal with an empty Search', () => {
	testType.equal<StringPlus.EndsWith<'abc', ''>, true>(true)
	testType.equal<StringPlus.EndsWith<'', ''>, true>(true)
})

it('takes the else branch for the wide string', () => {
	testType.equal<StringPlus.EndsWith<string, 'a'>, false>(true)
})

it('distributes over a union Subject', () => {
	testType.equal<StringPlus.EndsWith<'abc' | 'bcd', 'bc'>, boolean>(true)
})

it('can override the branches', () => {
	testType.equal<StringPlus.EndsWith<'abc', 'bc', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'ab', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('resolves `StringPlus.EndsWith.$Default` the same as no options', () => {
	testType.equal<StringPlus.EndsWith<'abc', 'bc', StringPlus.EndsWith.$Default>, StringPlus.EndsWith<'abc', 'bc'>>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'ab', StringPlus.EndsWith.$Default>, StringPlus.EndsWith<'abc', 'ab'>>(true)
})

it('works as filter', () => {
	testType.equal<StringPlus.EndsWith<'abc', 'bc', { selection: 'filter' }>, 'abc'>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'ab', { selection: 'filter' }>, never>(true)
	testType.equal<StringPlus.EndsWith<'abc' | 'bcd', 'bc', { selection: 'filter' }>, 'abc'>(true)
})

it('works with unique branches', () => {
	testType.equal<StringPlus.EndsWith<'abc', 'bc', StringPlus.EndsWith.$Branch>, $Then>(true)
	testType.equal<StringPlus.EndsWith<'abc', 'ab', StringPlus.EndsWith.$Branch>, $Else>(true)
})
