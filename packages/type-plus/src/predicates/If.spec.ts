import { test } from 'vitest'

import { assertType, type If, testType } from '../index.js'

test('true gets Then', () => {
	assertType<If<true, 2, 3>>(2)
})

test('false gets Else', () => {
	assertType<If<false, 2, 3>>(3)
})

test('Then defaults to true and Else defaults to false', () => {
	testType.true<If<true>>(true)
	testType.false<If<false>>(true)
})
