import { it } from 'vitest'

import { type ArrayPlus, type StringPlus, testType } from '../index.js'

it('joins with a comma by default', () => {
	testType.equal<ArrayPlus.Join<['a', 'b', 'c']>, 'a,b,c'>(true)
})

it('joins with the given separator', () => {
	testType.equal<ArrayPlus.Join<['a', 'b', 'c'], '/'>, 'a/b/c'>(true)
	testType.equal<ArrayPlus.Join<['a', 'b', 'c'], ''>, 'abc'>(true)
	testType.equal<ArrayPlus.Join<['a', 'b'], ', '>, 'a, b'>(true)
})

it('gives the empty string for an empty tuple', () => {
	testType.equal<ArrayPlus.Join<[]>, ''>(true)
	testType.equal<ArrayPlus.Join<readonly []>, ''>(true)
})

it('gives the element for a single-element tuple', () => {
	testType.equal<ArrayPlus.Join<['a']>, 'a'>(true)
})

it('supports a readonly tuple', () => {
	testType.equal<ArrayPlus.Join<readonly ['a', 'b']>, 'a,b'>(true)
})

it('stringifies number, bigint and boolean elements', () => {
	testType.equal<ArrayPlus.Join<[1, true, null, 2n], '-'>, '1-true--2'>(true)
})

it('turns null and undefined into the empty string, keeping the separators', () => {
	testType.equal<ArrayPlus.Join<[null, 'a']>, ',a'>(true)
	testType.equal<ArrayPlus.Join<['a', undefined]>, 'a,'>(true)
	testType.equal<ArrayPlus.Join<[undefined]>, ''>(true)
})

it('gives string for an element with no known string form', () => {
	testType.equal<ArrayPlus.Join<['a', { a: 1 }]>, `a,${string}`>(true)
})

it('gives string for an array, a tuple with a rest or optional element, or a wide separator', () => {
	testType.equal<ArrayPlus.Join<string[]>, string>(true)
	testType.equal<ArrayPlus.Join<readonly string[]>, string>(true)
	testType.equal<ArrayPlus.Join<['a', ...string[]]>, string>(true)
	testType.equal<ArrayPlus.Join<['a', 'b'?]>, string>(true)
	testType.equal<ArrayPlus.Join<['a', 'b'], string>, string>(true)
})

it('distributes over union elements', () => {
	testType.equal<ArrayPlus.Join<['a' | 'b', 'c']>, 'a,c' | 'b,c'>(true)
})

it('is the inverse of StringPlus.Split', () => {
	testType.equal<ArrayPlus.Join<StringPlus.Split<'a.b.c', '.'>, '.'>, 'a.b.c'>(true)
	testType.equal<ArrayPlus.Join<StringPlus.Split<'abc', ''>, ''>, 'abc'>(true)
})

it('handles long tuples', () => {
	type Ten = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	testType.equal<
		ArrayPlus.Join<[...Ten, ...Ten, ...Ten, ...Ten, ...Ten, ...Ten, ...Ten, ...Ten, ...Ten, ...Ten], ''>,
		'0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'
	>(true)
})
