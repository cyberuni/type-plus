import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of object', () => {
	testType.equal<object | undefined, object | undefined>(true)
	testType.equal<object | null, object | null>(true)
	testType.equal<object | boolean, object | boolean>(true)
	testType.equal<object | true, object | true>(true)
	testType.equal<object | false, object | false>(true)
	testType.equal<object | number, object | number>(true)
	testType.equal<object | 1, object | 1>(true)
	testType.equal<object | string, object | string>(true)
	testType.equal<object | '', object | ''>(true)
	testType.equal<object | symbol, object | symbol>(true)
	testType.equal<object | bigint, object | bigint>(true)
	testType.equal<object | 1n, object | 1n>(true)
	testType.equal<object | {}, object | {}>(true)
	testType.equal<object | { a: 1 }, object | { a: 1 }>(true)
	testType.equal<object | string[], object | string[]>(true)
	testType.equal<object | [], object | []>(true)
	testType.equal<object | Function, object | Function>(true)
	testType.equal<object | (() => void), object | (() => void)>(true)

	testType.equal<object | any, any>(true)
	testType.equal<object | unknown, unknown>(true)
	testType.equal<object | never, object>(true)
	testType.equal<object | void, object | void>(true)
})

test('intersection behavior of object', () => {
	testType.equal<object & undefined, never>(true)
	testType.equal<object & null, never>(true)

	testType.equal<object & boolean, never>(true)
	testType.equal<object & true, never>(true)
	testType.equal<object & false, never>(true)

	testType.equal<object & number, never>(true)
	testType.equal<object & 1, never>(true)
	testType.equal<object & string, never>(true)
	testType.equal<object & '', never>(true)
	testType.equal<object & symbol, never>(true)
	testType.equal<object & bigint, never>(true)
	testType.equal<object & 1n, never>(true)

	testType.equal<object & {}, object>(true)

	testType.equal<object & { a: 1 }, object & { a: 1 }>(true)
	testType.equal<object & string[], object & string[]>(true)
	testType.equal<object & [], object & []>(true)
	testType.equal<object & Function, object & Function>(true)
	testType.equal<object & (() => void), object & (() => void)>(true)

	testType.equal<object & any, any>(true)
	testType.equal<object & unknown, object>(true)
	testType.equal<object & never, never>(true)
	testType.equal<object & void, never>(true)
})
