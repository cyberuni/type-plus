import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of null', () => {
	testType.equal<null | undefined, null | undefined>(true)
	testType.equal<null | null, null>(true)
	testType.equal<null | boolean, null | boolean>(true)
	testType.equal<null | true, null | true>(true)
	testType.equal<null | false, null | false>(true)
	testType.equal<null | number, null | number>(true)
	testType.equal<null | 1, null | 1>(true)
	testType.equal<null | string, null | string>(true)
	testType.equal<null | '', null | ''>(true)
	testType.equal<null | symbol, null | symbol>(true)
	testType.equal<null | bigint, null | bigint>(true)
	testType.equal<null | 1n, null | 1n>(true)
	testType.equal<null | {}, null | {}>(true)
	testType.equal<null | { a: 1 }, null | { a: 1 }>(true)
	testType.equal<null | string[], null | string[]>(true)
	testType.equal<null | [], null | []>(true)
	testType.equal<null | null, null>(true)
	testType.equal<null | (() => void), null | (() => void)>(true)

	testType.equal<null | any, any>(true)
	testType.equal<null | unknown, unknown>(true)
	testType.equal<null | never, null>(true)
	testType.equal<null | void, null | void>(true)
})

test('intersection behavior of null', () => {
	testType.equal<null & undefined, never>(true)
	testType.equal<null & null, null>(true)

	testType.equal<null & boolean, never>(true)
	testType.equal<null & true, never>(true)
	testType.equal<null & false, never>(true)

	testType.equal<null & number, never>(true)
	testType.equal<null & 1, never>(true)
	testType.equal<null & string, never>(true)
	testType.equal<null & '', never>(true)
	testType.equal<null & symbol, never>(true)
	testType.equal<null & bigint, never>(true)
	testType.equal<null & 1n, never>(true)

	testType.equal<null & {}, never>(true)

	testType.equal<null & { a: 1 }, never>(true)
	testType.equal<null & string[], never>(true)
	testType.equal<null & [], never>(true)
	testType.equal<null & null, null>(true)
	testType.equal<null & (() => void), never>(true)

	testType.equal<null & any, any>(true)
	testType.equal<null & unknown, null>(true)
	testType.equal<null & never, never>(true)
	testType.equal<null & void, never>(true)
})
