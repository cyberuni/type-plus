import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of Function', () => {
	testType.equal<Function | undefined, Function | undefined>(true)
	testType.equal<Function | null, Function | null>(true)
	testType.equal<Function | boolean, Function | boolean>(true)
	testType.equal<Function | true, Function | true>(true)
	testType.equal<Function | false, Function | false>(true)
	testType.equal<Function | number, Function | number>(true)
	testType.equal<Function | 1, Function | 1>(true)
	testType.equal<Function | string, Function | string>(true)
	testType.equal<Function | '', Function | ''>(true)
	testType.equal<Function | symbol, Function | symbol>(true)
	testType.equal<Function | bigint, Function | bigint>(true)
	testType.equal<Function | 1n, Function | 1n>(true)
	testType.equal<Function | {}, Function | {}>(true)
	testType.equal<Function | { a: 1 }, Function | { a: 1 }>(true)
	testType.equal<Function | string[], Function | string[]>(true)
	testType.equal<Function | [], Function | []>(true)
	testType.equal<Function | Function, Function>(true)
	testType.equal<Function | (() => void), Function | (() => void)>(true)

	testType.equal<Function | any, any>(true)
	testType.equal<Function | unknown, unknown>(true)
	testType.equal<Function | never, Function>(true)
	testType.equal<Function | void, Function | void>(true)
})

test('intersection behavior of Function', () => {
	testType.equal<Function & undefined, never>(true)
	testType.equal<Function & null, never>(true)

	testType.equal<Function & boolean, Function & boolean>(true)
	testType.equal<Function & true, Function & true>(true)
	testType.equal<Function & false, Function & false>(true)

	testType.equal<Function & number, Function & number>(true)
	testType.equal<Function & 1, Function & 1>(true)
	testType.equal<Function & string, Function & string>(true)
	testType.equal<Function & '', Function & ''>(true)
	testType.equal<Function & symbol, Function & symbol>(true)
	testType.equal<Function & bigint, Function & bigint>(true)
	testType.equal<Function & 1n, Function & 1n>(true)

	testType.equal<Function & {}, Function>(true)

	testType.equal<Function & { a: 1 }, Function & { a: 1 }>(true)
	testType.equal<Function & string[], Function & string[]>(true)
	testType.equal<Function & [], Function & []>(true)
	testType.equal<Function & Function, Function>(true)
	testType.equal<Function & (() => void), Function & (() => void)>(true)

	testType.equal<Function & any, any>(true)
	testType.equal<Function & unknown, Function>(true)
	testType.equal<Function & never, never>(true)
	testType.equal<Function & void, Function & void>(true)
})
