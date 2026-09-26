import { describe, it, test } from 'vitest'

import { type $Else, type $Fn, type $Then, type If, type TuplePlus, testType } from '../index.js'

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

describe('If.$Fn', () => {
	test('is If with its options applied', () => {
		testType.equal<$Fn.Apply<If.$Fn, true>, true>(true)
		testType.equal<$Fn.Apply<If.$Fn, false>, false>(true)
		testType.equal<$Fn.Apply<If.$Fn, boolean>, boolean>(true)
		testType.equal<$Fn.Apply<If.$Fn<{ $then: 'yes'; $else: 'no' }>, true>, 'yes'>(true)
		testType.equal<TuplePlus.Filter<[true, false, true], If.$Fn>, [true, true]>(true)
	})
	test('resolves a non-boolean input to the else branch', () => {
		testType.equal<$Fn.Apply<If.$Fn, 1>, false>(true)
		testType.equal<$Fn.Apply<If.$Fn<{ $then: 'yes'; $else: 'no' }>, 1>, 'no'>(true)
	})
})
