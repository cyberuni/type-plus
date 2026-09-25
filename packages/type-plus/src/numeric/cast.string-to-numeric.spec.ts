import { it, test } from 'vitest'

import type { StringToNumeric } from '../index.js'
import { testType } from '../index.js'

test('TypeScript infer floating number with trailing zeros does not work correctly', () => {
	type R<S extends string> = S extends `${infer N extends number}` ? N : never

	testType.equal<R<'1.0'>, 1.0>(false)
})

it('casts number', () => {
	testType.equal<StringToNumeric<'123'>, 123>(true)
	testType.equal<StringToNumeric<'0'>, 0>(true)
	testType.equal<StringToNumeric<'-0'>, 0>(true)
	testType.equal<StringToNumeric<'-123'>, -123>(true)
})

it('casts bigint', () => {
	testType.equal<StringToNumeric<'123n'>, 123n>(true)
	testType.equal<StringToNumeric<'0n'>, 0n>(true)
	testType.equal<StringToNumeric<'-0n'>, 0n>(true)
	testType.equal<StringToNumeric<'-123n'>, -123n>(true)
})

it('casts float', () => {
	testType.equal<StringToNumeric<'123.45'>, 123.45>(true)
	testType.equal<StringToNumeric<'0.123'>, 0.123>(true)

	testType.equal<StringToNumeric<'1.1'>, 1.1>(true)
	testType.equal<StringToNumeric<'1.10000'>, 1.1>(true)
	testType.equal<StringToNumeric<'1.0'>, 1>(true)
	testType.equal<StringToNumeric<'1.0000'>, 1>(true)
	testType.equal<StringToNumeric<'0.1'>, 0.1>(true)
	testType.equal<StringToNumeric<'0.1000'>, 0.1>(true)
	testType.equal<StringToNumeric<'0.0'>, 0>(true)
	testType.equal<StringToNumeric<'-0.0'>, 0>(true)
	testType.equal<StringToNumeric<'-0.1000'>, -0.1>(true)
	testType.equal<StringToNumeric<'-0.1'>, -0.1>(true)
	testType.equal<StringToNumeric<'-1.0000'>, -1>(true)
	testType.equal<StringToNumeric<'-1.0'>, -1>(true)
	testType.equal<StringToNumeric<'-1.10000'>, -1.1>(true)
	testType.equal<StringToNumeric<'-1.1'>, -1.1>(true)

	testType.equal<StringToNumeric<'-0.123'>, -0.123>(true)
	testType.equal<StringToNumeric<'-123.45'>, -123.45>(true)
})
