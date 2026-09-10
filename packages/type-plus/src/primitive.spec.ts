import { describe, it } from 'vitest'

import { type IsNever, type PrimitiveTypes, testType } from './index.js'

describe('PrimitiveTypes', () => {
	it('covers every type built into the language, `object` and `Function` included', () => {
		testType.equal<1 extends PrimitiveTypes ? true : false, true>(true)
		testType.equal<{ a: 1 } extends PrimitiveTypes ? true : false, true>(true)
	})
})

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
