import { test } from 'vitest'
import { testType } from '../index.js'

test('typed arrays are not generic', () => {
	const u = new Uint8Array(4)
	testType.equal<typeof u, Uint8Array>(true)
})
