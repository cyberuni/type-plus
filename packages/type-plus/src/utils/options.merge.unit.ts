import { it } from 'vitest'

import type { TypePlusOptions } from '../index.js'
import { testType } from '../testing/index.js'

it('overrides cases', () => {
	testType.equal<TypePlusOptions.Merge<{ a: 3 }, { a: 1; b: 2 }>, { a: 3; b: 2 }>(true)
})

it('can specify input value as never', () => {
	testType.equal<TypePlusOptions.Merge<{ a: never }, { a: undefined; b: 2 }>, { a: never; b: 2 }>(true)
})
