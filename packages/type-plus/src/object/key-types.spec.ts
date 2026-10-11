import { it } from 'vitest'

import type { KeyTypes } from '../index.js'
import { testType } from '../testing/index.js'

it('contains type of all keys', () => {
	testType.equal<KeyTypes, string | number | symbol>(true)

	acceptKeys('a')
	acceptKeys(1)
	acceptKeys(Symbol())

	function acceptKeys(k: KeyTypes) {
		return k
	}
})
