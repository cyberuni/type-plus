import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of symbol', () => {
	testType.equal<symbol | undefined, symbol | undefined>(true)
	testType.equal<symbol | null, symbol | null>(true)
	testType.equal<symbol | boolean, symbol | boolean>(true)
	testType.equal<symbol | true, symbol | true>(true)
	testType.equal<symbol | false, symbol | false>(true)
	testType.equal<symbol | number, symbol | number>(true)
	testType.equal<symbol | 1, symbol | 1>(true)
	testType.equal<symbol | string, symbol | string>(true)
	testType.equal<symbol | '', symbol | ''>(true)
	testType.equal<symbol | symbol, symbol>(true)
	testType.equal<symbol | bigint, symbol | bigint>(true)
	testType.equal<symbol | 1n, symbol | 1n>(true)
	testType.equal<symbol | {}, symbol | {}>(true)
	testType.equal<symbol | { a: 1 }, symbol | { a: 1 }>(true)
	testType.equal<symbol | string[], symbol | string[]>(true)
	testType.equal<symbol | [], symbol | []>(true)
	testType.equal<symbol | Function, symbol | Function>(true)
	testType.equal<symbol | (() => void), symbol | (() => void)>(true)

	testType.equal<symbol | any, any>(true)
	testType.equal<symbol | unknown, unknown>(true)
	testType.equal<symbol | never, symbol>(true)
	testType.equal<symbol | void, symbol | void>(true)
})

test('intersection behavior of symbol', () => {
	testType.equal<symbol & undefined, never>(true)
	testType.equal<symbol & null, never>(true)

	testType.equal<symbol & boolean, never>(true)
	testType.equal<symbol & true, never>(true)
	testType.equal<symbol & false, never>(true)
	testType.equal<symbol & number, never>(true)
	testType.equal<symbol & 1, never>(true)
	testType.equal<symbol & string, never>(true)
	testType.equal<symbol & '', never>(true)

	testType.equal<symbol & symbol, symbol>(true)

	testType.equal<symbol & bigint, never>(true)
	testType.equal<symbol & 1n, never>(true)

	testType.equal<symbol & {}, symbol>(true)

	testType.equal<symbol & { a: 1 }, symbol & { a: 1 }>(true)
	testType.equal<symbol & string[], symbol & string[]>(true)
	testType.equal<symbol & [], symbol & []>(true)
	testType.equal<symbol & Function, symbol & Function>(true)
	testType.equal<symbol & (() => void), symbol & (() => void)>(true)

	testType.equal<symbol & any, any>(true)
	testType.equal<symbol & unknown, symbol>(true)
	testType.equal<symbol & never, never>(true)
	testType.equal<symbol & void, never>(true)
})
