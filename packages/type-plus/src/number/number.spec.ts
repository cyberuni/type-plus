import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of number', () => {
	testType.equal<number | undefined, number | undefined>(true)
	testType.equal<number | null, number | null>(true)
	testType.equal<number | boolean, number | boolean>(true)
	testType.equal<number | true, number | true>(true)
	testType.equal<number | false, number | false>(true)
	testType.equal<number | number, number>(true)
	testType.equal<number | 1, number>(true)
	testType.equal<number | string, number | string>(true)
	testType.equal<number | '', number | ''>(true)
	testType.equal<number | symbol, number | symbol>(true)
	testType.equal<number | bigint, number | bigint>(true)
	testType.equal<number | 1n, number | 1n>(true)
	testType.equal<number | {}, number | {}>(true)
	testType.equal<number | { a: 1 }, number | { a: 1 }>(true)
	testType.equal<number | string[], number | string[]>(true)
	testType.equal<number | [], number | []>(true)
	testType.equal<number | Function, number | Function>(true)
	testType.equal<number | (() => void), number | (() => void)>(true)

	testType.equal<number | any, any>(true)
	testType.equal<number | unknown, unknown>(true)
	testType.equal<number | never, number>(true)
	testType.equal<number | void, number | void>(true)
})

test('intersection behavior of number', () => {
	testType.equal<number & undefined, never>(true)
	testType.equal<number & null, never>(true)

	testType.equal<number & boolean, never>(true)
	testType.equal<number & true, never>(true)
	testType.equal<number & false, never>(true)

	testType.equal<number & number, number>(true)
	testType.equal<number & 1, 1>(true)
	testType.equal<number & string, never>(true)
	testType.equal<number & '', never>(true)
	testType.equal<number & symbol, never>(true)
	testType.equal<number & bigint, never>(true)
	testType.equal<number & 1n, never>(true)

	testType.equal<number & {}, number>(true)

	testType.equal<number & { a: 1 }, number & { a: 1 }>(true)
	testType.equal<number & string[], number & string[]>(true)
	testType.equal<number & [], number & []>(true)
	testType.equal<number & Function, number & Function>(true)
	testType.equal<number & (() => void), number & (() => void)>(true)

	testType.equal<number & any, any>(true)
	testType.equal<number & unknown, number>(true)
	testType.equal<number & never, never>(true)
	testType.equal<number & void, never>(true)
})
