import { it } from 'vitest'

import { type $Else, type $Then, type StringIncludes, type StringPlus, testType } from '../index.js'

it('exposes Includes', () => {
	testType.equal<StringPlus.Includes<'', ''>, StringIncludes<'', ''>>(true)
	testType.equal<StringPlus.Includes<'abc', 'a'>, true>(true)
	testType.equal<StringPlus.Includes<'abc', 'd'>, false>(true)
})

it('Includes can override the branches', () => {
	testType.equal<StringPlus.Includes<'abc', 'a', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<StringPlus.Includes<'abc', 'd', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('Includes works as filter', () => {
	testType.equal<StringPlus.Includes<'abc', 'a', { selection: 'filter' }>, 'abc'>(true)
	testType.equal<StringPlus.Includes<'abc', 'd', { selection: 'filter' }>, never>(true)
})

it('Includes works with unique branches', () => {
	testType.equal<StringPlus.Includes<'abc', 'a', StringPlus.Includes.$Branch>, $Then>(true)
	testType.equal<StringPlus.Includes<'abc', 'd', StringPlus.Includes.$Branch>, $Else>(true)
})

it('exposes Split', () => {
	testType.equal<StringPlus.Split<'abc', ''>, ['a', 'b', 'c']>(true)
	testType.equal<StringPlus.Split<'abc', 'a'>, ['', 'bc']>(true)
	testType.equal<StringPlus.Split<'abc', 'b'>, ['a', 'c']>(true)
	testType.equal<StringPlus.Split<'abc', 'c'>, ['ab', '']>(true)
})
