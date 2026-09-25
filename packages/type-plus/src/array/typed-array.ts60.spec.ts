import { test } from 'vitest'
import { testType } from '../index.js'

test('typed arrays are generic over their buffer', () => {
	const u = new Uint8Array(4)
	testType.equal<typeof u, Uint8Array<ArrayBuffer>>(true)
})

test('the buffer type parameter is invariant enough to distinguish ArrayBufferLike', () => {
	const u = new Uint8Array(4)
	testType.equal<typeof u, Uint8Array<ArrayBufferLike>>(false)
})
