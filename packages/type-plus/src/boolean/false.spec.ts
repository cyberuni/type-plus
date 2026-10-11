import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of false', () => {
	testType.equal<false | undefined, false | undefined>(true)
	testType.equal<false | null, false | null>(true)

	testType.equal<false | boolean, boolean>(true)
	testType.equal<false | true, boolean>(true)
	testType.equal<false | false, false>(true)

	testType.equal<false | number, false | number>(true)
	testType.equal<false | 1, false | 1>(true)
	testType.equal<false | string, false | string>(true)
	testType.equal<false | '', false | ''>(true)
	testType.equal<false | symbol, false | symbol>(true)
	testType.equal<false | bigint, false | bigint>(true)
	testType.equal<false | 1n, false | 1n>(true)
	testType.equal<false | {}, false | {}>(true)
	testType.equal<false | { a: 1 }, false | { a: 1 }>(true)
	testType.equal<false | string[], false | string[]>(true)
	testType.equal<false | [], false | []>(true)
	testType.equal<false | Function, false | Function>(true)
	testType.equal<false | (() => void), false | (() => void)>(true)

	testType.equal<false | any, any>(true)
	testType.equal<false | unknown, unknown>(true)
	testType.equal<false | never, false>(true)
	testType.equal<false | void, false | void>(true)
})

test('intersection behavior of false', () => {
	testType.equal<false & undefined, never>(true)
	testType.equal<false & null, never>(true)

	testType.equal<false & boolean, false>(true)
	testType.equal<false & true, never>(true)
	testType.equal<false & false, false>(true)

	testType.equal<false & number, never>(true)
	testType.equal<false & 1, never>(true)
	testType.equal<false & string, never>(true)
	testType.equal<false & '', never>(true)
	testType.equal<false & symbol, never>(true)
	testType.equal<false & bigint, never>(true)
	testType.equal<false & 1n, never>(true)

	testType.equal<false & {}, false>(true)
	testType.equal<false & { a: 1 }, false & { a: 1 }>(true)
	testType.equal<false & string[], false & string[]>(true)
	testType.equal<false & [], false & []>(true)
	testType.equal<false & Function, false & Function>(true)
	testType.equal<false & (() => void), false & (() => void)>(true)

	testType.equal<false & any, any>(true)
	testType.equal<false & unknown, false>(true)
	testType.equal<false & never, never>(true)
	testType.equal<false & void, never>(true)
})
