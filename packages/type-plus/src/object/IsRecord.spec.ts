import { test } from 'vitest'

import { assertType, type IsRecord } from '../index.js'

test('boolean, number, string, null, undefined, symbol are not record', () => {
	assertType.isFalse(false as IsRecord<undefined>)
	assertType.isFalse(false as IsRecord<null>)
	assertType.isFalse(false as IsRecord<boolean>)
	assertType.isFalse(false as IsRecord<number>)
	assertType.isFalse(false as IsRecord<string>)
	assertType.isFalse(false as IsRecord<symbol>)
})

test('array is not record', () => {
	assertType.isFalse(false as IsRecord<[]>)
	assertType.isFalse(false as IsRecord<number[]>)
})

test('object is record', () => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	assertType.isTrue(true as IsRecord<{}>)
	// eslint-disable-next-line @typescript-eslint/ban-types
	assertType.isTrue(true as IsRecord<object>)
	assertType.isTrue(true as IsRecord<{ a: string }>)
	assertType.isTrue(true as IsRecord<Record<string, number>>)
})
