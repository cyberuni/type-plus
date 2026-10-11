import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of never', () => {
	testType.equal<never | undefined, undefined>(true)
	testType.equal<never | null, null>(true)
	testType.equal<never | boolean, boolean>(true)
	testType.equal<never | true, true>(true)
	testType.equal<never | false, false>(true)
	testType.equal<never | number, number>(true)
	testType.equal<never | 1, 1>(true)
	testType.equal<never | string, string>(true)
	testType.equal<never | '', ''>(true)
	testType.equal<never | symbol, symbol>(true)
	testType.equal<never | bigint, bigint>(true)
	testType.equal<never | 1n, 1n>(true)
	testType.equal<never | {}, {}>(true)
	testType.equal<never | { a: 1 }, { a: 1 }>(true)
	testType.equal<never | string[], string[]>(true)
	testType.equal<never | [], []>(true)
	testType.equal<never | never, never>(true)
	testType.equal<never | (() => void), () => void>(true)

	testType.equal<never | any, any>(true)
	testType.equal<never | unknown, unknown>(true)
	testType.equal<never | never, never>(true)
	testType.equal<never | void, void>(true)
})

test('intersection behavior of never', () => {
	testType.equal<never & undefined, never>(true)
	testType.equal<never & null, never>(true)

	testType.equal<never & boolean, never>(true)
	testType.equal<never & true, never>(true)
	testType.equal<never & false, never>(true)

	testType.equal<never & number, never>(true)
	testType.equal<never & 1, never>(true)
	testType.equal<never & string, never>(true)
	testType.equal<never & '', never>(true)
	testType.equal<never & symbol, never>(true)
	testType.equal<never & bigint, never>(true)
	testType.equal<never & 1n, never>(true)

	testType.equal<never & {}, never>(true)

	testType.equal<never & { a: 1 }, never>(true)
	testType.equal<never & string[], never>(true)
	testType.equal<never & [], never>(true)
	testType.equal<never & never, never>(true)
	testType.equal<never & (() => void), never>(true)

	testType.equal<never & any, never>(true)
	testType.equal<never & unknown, never>(true)
	testType.equal<never & never, never>(true)
	testType.equal<never & void, never>(true)
})
