import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('typed arrays are not generic', () => {
	const u = new Uint8Array(4)
	testType.equal<typeof u, Uint8Array>(true)
})
