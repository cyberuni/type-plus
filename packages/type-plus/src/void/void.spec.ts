import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of void', () => {
	testType.equal<void | undefined, void | undefined>(true)
	testType.equal<void | null, void | null>(true)
	testType.equal<void | boolean, void | boolean>(true)
	testType.equal<void | true, void | true>(true)
	testType.equal<void | false, void | false>(true)
	testType.equal<void | number, void | number>(true)
	testType.equal<void | 1, void | 1>(true)
	testType.equal<void | string, void | string>(true)
	testType.equal<void | '', void | ''>(true)
	testType.equal<void | symbol, void | symbol>(true)
	testType.equal<void | bigint, void | bigint>(true)
	testType.equal<void | 1n, void | 1n>(true)
	testType.equal<void | {}, void | {}>(true)
	testType.equal<void | { a: 1 }, void | { a: 1 }>(true)
	testType.equal<void | string[], void | string[]>(true)
	testType.equal<void | [], void | []>(true)
	testType.equal<void | Function, void | Function>(true)
	testType.equal<void | (() => void), void | (() => void)>(true)

	testType.equal<void | any, any>(true)
	testType.equal<void | unknown, unknown>(true)
	testType.equal<void | never, void>(true)
	testType.equal<void | void, void>(true)
})

test('intersection behavior of void', () => {
	testType.equal<void & undefined, undefined>(true)
	testType.equal<void & null, never>(true)

	testType.equal<void & boolean, never>(true)
	testType.equal<void & true, never>(true)
	testType.equal<void & false, never>(true)
	testType.equal<void & number, never>(true)
	testType.equal<void & 1, never>(true)
	testType.equal<void & string, never>(true)
	testType.equal<void & '', never>(true)

	testType.equal<void & symbol, never>(true)

	testType.equal<void & bigint, never>(true)
	testType.equal<void & 1n, never>(true)

	testType.equal<void & {}, void & {}>(true)

	testType.equal<void & { a: 1 }, void & { a: 1 }>(true)
	testType.equal<void & string[], void & string[]>(true)
	testType.equal<void & [], void & []>(true)
	testType.equal<void & Function, void & Function>(true)
	testType.equal<void & (() => void), void & (() => void)>(true)

	testType.equal<void & any, any>(true)
	testType.equal<void & unknown, void>(true)
	testType.equal<void & never, never>(true)
	testType.equal<void & void, void>(true)
})
