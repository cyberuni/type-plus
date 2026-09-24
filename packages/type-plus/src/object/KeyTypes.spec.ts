import { it } from 'vitest'

import { type KeyTypes, testType } from '../index.js'

it('contains type of all keys', () => {
	testType.equal<KeyTypes, string | number | symbol>(true)

	acceptKeys('a')
	acceptKeys(1)
	acceptKeys(Symbol())

	function acceptKeys(k: KeyTypes) {
		return k
	}
})
