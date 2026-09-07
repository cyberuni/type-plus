import { describe, it } from 'vitest'

import { type IsNever, testType } from './index.js'

describe('IsNever<T>', () => {
	it('checks if type is never', () => {
		testType.equal<true, IsNever<never>>(true)
		testType.equal<false, IsNever<undefined>>(true)
		testType.equal<false, IsNever<null>>(true)
		testType.equal<false, IsNever<number>>(true)
		testType.equal<false, IsNever<{ a: number }>>(true)
		testType.equal<false, IsNever<[]>>(true)
	})
})
