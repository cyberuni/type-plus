import { describe, test } from 'vitest'

import { type IsBoolean, testType } from '../index.js'

describe('IsBoolean<T>', () => {
	test('boolean/true/false', () => {
		testType.equal<true, IsBoolean<boolean>>(true)
		testType.equal<false, IsBoolean<false, { exact: true }>>(true)
		testType.equal<false, IsBoolean<true, { exact: true }>>(true)
	})
	test('override Then/Else', () => {
		testType.equal<'yes', IsBoolean<boolean, { $then: 'yes' }>>(true)
		testType.equal<'no', IsBoolean<1, { $then: 'yes'; $else: 'no' }>>(true)
	})
})
