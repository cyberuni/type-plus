import { test } from 'vitest'

import { type IsEmptyObject, testType } from '../index.js'

test('true for {}', () => {
	testType.true<IsEmptyObject<{}>>(true)
})
test('true for anything `{}` extends, as `{}` means "not null or undefined"', () => {
	testType.true<IsEmptyObject<object>>(true)
	testType.true<IsEmptyObject<Record<string, never>>>(true)
})
test('false for everything else', () => {
	testType.false<IsEmptyObject<undefined>>(true)
	testType.false<IsEmptyObject<false>>(true)
	testType.false<IsEmptyObject<0>>(true)
	testType.false<IsEmptyObject<number>>(true)
	testType.false<IsEmptyObject<''>>(true)
	testType.false<IsEmptyObject<{ a: 1 }>>(true)
})
test('never for never', () => {
	testType.equal<IsEmptyObject<never>, never>(true)
})
