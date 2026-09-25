import { test } from 'vitest'

import type { PromiseValueMerge } from '../index.js'

test('merge promise value', async () => {
	const result = {} as PromiseValueMerge<Promise<{ a: string }>, Promise<{ b: string }>>
	const value = await result
	value satisfies { a: string; b: string }
})
