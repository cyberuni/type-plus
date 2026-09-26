import { it } from 'vitest'

import { type StringPlus, testType } from '../index.js'

it('replaces the first occurrence of Search', () => {
	testType.equal<StringPlus.Replace<'a.b.c', '.', '/'>, 'a/b.c'>(true)
	testType.equal<StringPlus.Replace<'abcabc', 'bc', 'x'>, 'axabc'>(true)
	testType.equal<StringPlus.Replace<'abc', 'abc', ''>, ''>(true)
})

it('returns Subject unchanged when it does not contain Search', () => {
	testType.equal<StringPlus.Replace<'abc', 'd', 'x'>, 'abc'>(true)
	testType.equal<StringPlus.Replace<'', 'a', 'x'>, ''>(true)
})

it('prepends Replacement for an empty Search', () => {
	testType.equal<StringPlus.Replace<'abc', '', 'x'>, 'xabc'>(true)
	testType.equal<StringPlus.Replace<'', '', 'x'>, 'x'>(true)
})

it('gives string for a wide Subject or Search', () => {
	testType.equal<StringPlus.Replace<string, 'a', 'x'>, string>(true)
	testType.equal<StringPlus.Replace<'abc', string, 'x'>, string>(true)
})

it('distributes over a union Subject', () => {
	testType.equal<StringPlus.Replace<'a.b' | 'c.d', '.', '/'>, 'a/b' | 'c/d'>(true)
})
