import { it, test } from 'vitest'

import { type $Else, type $Then, type If, testType } from '../index.js'

test('true gets the $then branch', () => {
	2 satisfies If<true, { $then: 2; $else: 3 }>
})

test('false gets the $else branch', () => {
	3 satisfies If<false, { $then: 2; $else: 3 }>
})

test('defaults to true/false', () => {
	testType.true<If<true>>(true)
	testType.false<If<false>>(true)

	// `If.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<If<true, If.$Default>, If<true>>(true)
	testType.equal<If<false, If.$Default>, If<false>>(true)
	testType.equal<If<boolean, If.$Default>, If<boolean>>(true)
	testType.equal<If<never, If.$Default>, If<never>>(true)
	testType.equal<If<any, If.$Default>, If<any>>(true)
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
