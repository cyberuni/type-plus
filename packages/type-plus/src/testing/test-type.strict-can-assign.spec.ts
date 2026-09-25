import { it } from 'vitest'

import { testType } from '../index.js'

it('should pass if A can assign to B', () => {
	testType.strictCanAssign<number, number>(true)
	testType.strictCanAssign<string, string>(true)
})

it('should pass if A is a literal of B', () => {
	testType.strictCanAssign<123, number>(true)
})

it('should pass only if A is fully assignable to B across all branches', () => {
	testType.strictCanAssign<string | number, number | string>(true)

	testType.strictCanAssign<string | number, number>(false)
})
