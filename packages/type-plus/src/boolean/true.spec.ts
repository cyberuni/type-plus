import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of true', () => {
	testType.equal<true | undefined, true | undefined>(true)
	testType.equal<true | null, true | null>(true)

	testType.equal<true | boolean, boolean>(true)
	testType.equal<true | true, true>(true)
	testType.equal<true | false, boolean>(true)

	testType.equal<true | number, true | number>(true)
	testType.equal<true | 1, true | 1>(true)
	testType.equal<true | string, true | string>(true)
	testType.equal<true | '', true | ''>(true)
	testType.equal<true | symbol, true | symbol>(true)
	testType.equal<true | bigint, true | bigint>(true)
	testType.equal<true | 1n, true | 1n>(true)
	testType.equal<true | {}, true | {}>(true)
	testType.equal<true | { a: 1 }, true | { a: 1 }>(true)
	testType.equal<true | string[], true | string[]>(true)
	testType.equal<true | [], true | []>(true)
	testType.equal<true | Function, true | Function>(true)
	testType.equal<true | (() => void), true | (() => void)>(true)

	testType.equal<true | any, any>(true)
	testType.equal<true | unknown, unknown>(true)
	testType.equal<true | never, true>(true)
	testType.equal<true | void, true | void>(true)
})

test('intersection behavior of true', () => {
	testType.equal<true & undefined, never>(true)
	testType.equal<true & null, never>(true)

	testType.equal<true & boolean, true>(true)
	testType.equal<true & true, true>(true)
	testType.equal<true & false, never>(true)

	testType.equal<true & number, never>(true)
	testType.equal<true & 1, never>(true)
	testType.equal<true & string, never>(true)
	testType.equal<true & '', never>(true)
	testType.equal<true & symbol, never>(true)
	testType.equal<true & bigint, never>(true)
	testType.equal<true & 1n, never>(true)

	testType.equal<true & {}, true>(true)
	testType.equal<true & { a: 1 }, true & { a: 1 }>(true)
	testType.equal<true & string[], true & string[]>(true)
	testType.equal<true & [], true & []>(true)
	testType.equal<true & Function, true & Function>(true)
	testType.equal<true & (() => void), true & (() => void)>(true)

	testType.equal<true & any, any>(true)
	testType.equal<true & unknown, true>(true)
	testType.equal<true & never, never>(true)
	testType.equal<true & void, never>(true)
})
