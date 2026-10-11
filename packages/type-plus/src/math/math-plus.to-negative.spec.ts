import { it } from 'vitest'

import type { MathPlus } from '../index.js'
import { testType } from '../testing/index.js'

it('converts positive bigint to negative', () => {
	testType.equal<MathPlus.ToNegative<1n>, -1n>(true)
})

it('converts positive number to negative', () => {
	testType.equal<MathPlus.ToNegative<1>, -1>(true)
})

it('converts 0 to 0', () => {
	testType.equal<MathPlus.ToNegative<0>, 0>(true)
	testType.equal<MathPlus.ToNegative<0n>, 0n>(true)

	testType.equal<MathPlus.ToNegative<-0>, 0>(true)
	testType.equal<MathPlus.ToNegative<-0n>, 0n>(true)
})

it('returns N if N is negative', () => {
	testType.equal<MathPlus.ToNegative<-1>, -1>(true)
	testType.equal<MathPlus.ToNegative<-1n>, -1n>(true)
})
