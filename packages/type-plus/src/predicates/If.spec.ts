import { it, test } from 'vitest'

import { type $Else, type $Then, assertType, type If, testType } from '../index.js'

test('true gets the $then branch', () => {
	assertType<If<true, { $then: 2; $else: 3 }>>(2)
})

test('false gets the $else branch', () => {
	assertType<If<false, { $then: 2; $else: 3 }>>(3)
})

test('defaults to true/false', () => {
	testType.true<If<true>>(true)
	testType.false<If<false>>(true)
})

test('boolean distributes to both branches', () => {
	testType.boolean<If<boolean>>(true)
	testType.equal<If<boolean, { $then: 'yes'; $else: 'no' }>, 'yes' | 'no'>(true)
})

it('works as filter', () => {
	testType.equal<If<true, { selection: 'filter' }>, true>(true)
	testType.equal<If<false, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<If<true, If.$Branch>, $Then>(true)
	testType.equal<If<false, If.$Branch>, $Else>(true)
})
