import { it } from 'vitest'

import type { StringIncludes } from '../index.js'
import { testType } from '../testing/index.js'

it('should return true if the string contains the search string', () => {
	testType.true<StringIncludes<'abc', 'b'>>(true)
})

it('should return false if the string does not contain the search string', () => {
	testType.false<StringIncludes<'abc', 'd'>>(true)
})

it('should return true if the string contains the search string at the end', () => {
	testType.true<StringIncludes<'abc', 'c'>>(true)
})

it('should return true if the string contains the search string at the beginning', () => {
	testType.true<StringIncludes<'abc', 'a'>>(true)
})

it('should return true if the string matches exactly', () => {
	testType.true<StringIncludes<'abc', 'abc'>>(true)
})

it('can override Then/Else', () => {
	testType.equal<StringIncludes<'abc', 'b', 'yes', 'no'>, 'yes'>(true)
	testType.equal<StringIncludes<'abc', 'd', 'yes', 'no'>, 'no'>(true)
})
