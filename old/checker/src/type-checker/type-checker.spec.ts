import { describe, test } from '@jest/globals'
import { assertType } from '../index.js'
import * as T from '../types/index.js'
import { createTypeChecker } from './type-checker.js'

describe('check()', () => {
	test('bool', () => {
		const checker = createTypeChecker()

		const s: unknown = false
		if (checker.check({ strict: false, debug: false }, T.boolean.true, s)) {
			assertType<true>(s)
		}
	})
})
