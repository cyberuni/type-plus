import { it } from 'vitest'

import { type $Else, type $Then, type StringPlus, testType } from '../index.js'

it('returns true when Subject starts with Search', () => {
	testType.equal<StringPlus.StartsWith<'abc', 'ab'>, true>(true)
	testType.equal<StringPlus.StartsWith<'abc', 'a'>, true>(true)
	testType.equal<StringPlus.StartsWith<'abc', 'abc'>, true>(true)
})

it('returns false when Subject does not start with Search', () => {
	testType.equal<StringPlus.StartsWith<'abc', 'bc'>, false>(true)
	testType.equal<StringPlus.StartsWith<'abc', 'b'>, false>(true)
	testType.equal<StringPlus.StartsWith<'abc', 'abcd'>, false>(true)
})

it('matches every string literal with an empty Search', () => {
	testType.equal<StringPlus.StartsWith<'abc', ''>, true>(true)
	testType.equal<StringPlus.StartsWith<'', ''>, true>(true)
})

it('takes the else branch for the wide string', () => {
	testType.equal<StringPlus.StartsWith<string, 'a'>, false>(true)
})

it('distributes over a union Subject', () => {
	testType.equal<StringPlus.StartsWith<'abc' | 'bcd', 'ab'>, boolean>(true)
})

it('can override the branches', () => {
	testType.equal<StringPlus.StartsWith<'abc', 'ab', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<StringPlus.StartsWith<'abc', 'bc', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('resolves `StringPlus.StartsWith.$Default` the same as no options', () => {
	testType.equal<
		StringPlus.StartsWith<'abc', 'ab', StringPlus.StartsWith.$Default>,
		StringPlus.StartsWith<'abc', 'ab'>
	>(true)
	testType.equal<
		StringPlus.StartsWith<'abc', 'bc', StringPlus.StartsWith.$Default>,
		StringPlus.StartsWith<'abc', 'bc'>
	>(true)
})

it('works as filter', () => {
	testType.equal<StringPlus.StartsWith<'abc', 'ab', { selection: 'filter' }>, 'abc'>(true)
	testType.equal<StringPlus.StartsWith<'abc', 'bc', { selection: 'filter' }>, never>(true)
	testType.equal<StringPlus.StartsWith<'abc' | 'bcd', 'ab', { selection: 'filter' }>, 'abc'>(true)
})

it('works with unique branches', () => {
	testType.equal<StringPlus.StartsWith<'abc', 'ab', StringPlus.StartsWith.$Branch>, $Then>(true)
	testType.equal<StringPlus.StartsWith<'abc', 'bc', StringPlus.StartsWith.$Branch>, $Else>(true)
})
