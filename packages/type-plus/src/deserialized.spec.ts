import { describe, it } from 'vitest'

import type { Deserialized, Serialized } from './index.js'
import { testType } from './testing/index.js'

describe('Deserialized', () => {
	it('gives back the value type of either format', () => {
		testType.equal<Deserialized<Serialized<{ a: number }>>, { a: number }>(true)
		testType.equal<Deserialized<Serialized<{ a: number }, { circular: true }>>, { a: number }>(true)
	})

	it('rejects a plain string', () => {
		// @ts-expect-error a plain string carries no type
		testType.never<Deserialized<string>>(true)
	})
})
