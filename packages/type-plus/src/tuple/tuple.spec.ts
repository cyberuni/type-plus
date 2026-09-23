import { test } from 'vitest'

import { testType } from '../index.js'

test('union behavior of tuple', () => {
	testType.equal<['a'] | undefined, ['a'] | undefined>(true)
	testType.equal<['a'] | null, ['a'] | null>(true)
	testType.equal<['a'] | boolean, ['a'] | boolean>(true)
	testType.equal<['a'] | true, ['a'] | true>(true)
	testType.equal<['a'] | false, ['a'] | false>(true)
	testType.equal<['a'] | number, ['a'] | number>(true)
	testType.equal<['a'] | 1, ['a'] | 1>(true)
	testType.equal<['a'] | string, ['a'] | string>(true)
	testType.equal<['a'] | '', ['a'] | ''>(true)
	testType.equal<['a'] | symbol, ['a'] | symbol>(true)
	testType.equal<['a'] | bigint, ['a'] | bigint>(true)
	testType.equal<['a'] | 1n, ['a'] | 1n>(true)
	testType.equal<['a'] | {}, ['a'] | {}>(true)
	testType.equal<['a'] | { a: 1 }, ['a'] | { a: 1 }>(true)
	testType.equal<['a'] | string[], ['a'] | string[]>(true)
	testType.equal<['a'] | [], ['a'] | []>(true)
	testType.equal<['a'] | Function, ['a'] | Function>(true)
	testType.equal<['a'] | (() => void), ['a'] | (() => void)>(true)

	testType.equal<['a'] | any, any>(true)
	testType.equal<['a'] | unknown, unknown>(true)
	testType.equal<['a'] | never, ['a']>(true)
	testType.equal<['a'] | void, ['a'] | void>(true)
})

test('intersection behavior of tuple', () => {
	testType.equal<['a'] & undefined, never>(true)
	testType.equal<['a'] & null, never>(true)

	testType.equal<['a'] & boolean, ['a'] & boolean>(true)
	testType.equal<['a'] & true, ['a'] & true>(true)
	testType.equal<['a'] & false, ['a'] & false>(true)
	testType.equal<['a'] & number, ['a'] & number>(true)
	testType.equal<['a'] & 1, ['a'] & 1>(true)
	testType.equal<['a'] & string, ['a'] & string>(true)
	testType.equal<['a'] & '', ['a'] & ''>(true)

	testType.equal<['a'] & symbol, symbol>(false)

	testType.equal<['a'] & bigint, ['a'] & bigint>(true)
	testType.equal<['a'] & 1n, ['a'] & 1n>(true)

	testType.equal<['a'] & {}, ['a']>(true)

	testType.equal<['a'] & { a: 1 }, ['a'] & { a: 1 }>(true)
	testType.equal<['a'] & string[], ['a'] & string[]>(true)
	testType.equal<['a'] & [], ['a'] & []>(true)
	testType.equal<['a'] & Function, ['a'] & Function>(true)
	testType.equal<['a'] & (() => void), ['a'] & (() => void)>(true)

	testType.equal<['a'] & any, any>(true)
	testType.equal<['a'] & unknown, ['a']>(true)
	testType.equal<['a'] & never, never>(true)
	testType.equal<['a'] & void, ['a'] & void>(true)
})
