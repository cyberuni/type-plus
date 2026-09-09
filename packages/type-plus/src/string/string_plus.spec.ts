import { it } from 'vitest'

import { type StringIncludes, type StringPlus, testType } from '../index.js'

it('exposes Includes', () => {
	testType.equal<StringPlus.Includes<'', ''>, StringIncludes<'', ''>>(true)
	testType.equal<StringPlus.Includes<'abc', 'a'>, true>(true)
	testType.equal<StringPlus.Includes<'abc', 'd'>, false>(true)
})

it('exposes Split', () => {
	testType.equal<StringPlus.Split<'abc', ''>, ['a', 'b', 'c']>(true)
	testType.equal<StringPlus.Split<'abc', 'a'>, ['', 'bc']>(true)
	testType.equal<StringPlus.Split<'abc', 'b'>, ['a', 'c']>(true)
	testType.equal<StringPlus.Split<'abc', 'c'>, ['ab', '']>(true)
})
