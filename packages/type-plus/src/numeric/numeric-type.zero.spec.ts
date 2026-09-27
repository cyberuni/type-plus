import { it } from 'vitest'

import type { Zero } from '../index.js'

it('can be 0', () => {
	0 satisfies Zero
})

it('can be bigint 0n', () => {
	0n satisfies Zero
})
