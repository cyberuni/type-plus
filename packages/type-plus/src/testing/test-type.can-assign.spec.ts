import { it } from 'vitest'

import { testType } from '../index.js'

it('should pass if A can assign to B', () => {
	testType.canAssign<number, number>(true)
	testType.canAssign<string, string>(true)
})

it('should pass if A is a literal of B', () => {
	testType.canAssign<123, number>(true)
})

it('accepts both true/false if A is a union an partially assignable to B', () => {
	testType.canAssign<string | number, number>(true)
	testType.canAssign<string | number, number>(false)
})
