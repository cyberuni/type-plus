import { expect, test } from 'vitest'

import type { ExcludePropType } from '../index.js'

test('exclude type R from properties of T', () => {
	interface Customer {
		name: string
		age: number | null
	}

	type CustomerAgeNotNull = ExcludePropType<Customer, null>

	const x: CustomerAgeNotNull = { name: '', age: 0 }
	expect(x.age satisfies number).toBeTypeOf('number')
})
