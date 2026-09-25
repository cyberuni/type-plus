import { it } from 'vitest'

import { isType, type Zero } from '../index.js'

it('can be 0', () => {
	isType<Zero>(0)
})

it('can be bigint 0n', () => {
	isType<Zero>(0n)
})
