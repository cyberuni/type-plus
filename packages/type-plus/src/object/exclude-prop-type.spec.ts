import { expect, test } from 'vitest'

import { type ExcludePropType, testType } from '../index.js'

test('exclude type R from properties of T', () => {
	interface Customer {
		name: string
		age: number | null
	}

	type CustomerAgeNotNull = ExcludePropType<Customer, null>
	testType.equal<CustomerAgeNotNull, { name: string; age: number }>(true)
	testType.equal<ExcludePropType<{ name: string; age: number | null }, null>, { name: string; age: number }>(true)

	const x: CustomerAgeNotNull = { name: '', age: 0 }
	expect(x.age satisfies number).toBeTypeOf('number')
})
