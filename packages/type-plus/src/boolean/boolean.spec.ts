import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of boolean', () => {
	testType.equal<boolean | undefined, boolean | undefined>(true)
	testType.equal<boolean | null, boolean | null>(true)

	testType.equal<boolean | boolean, boolean>(true)
	testType.equal<boolean | true, boolean>(true)
	testType.equal<boolean | false, boolean>(true)

	testType.equal<boolean | number, boolean | number>(true)
	testType.equal<boolean | 1, boolean | 1>(true)
	testType.equal<boolean | string, boolean | string>(true)
	testType.equal<boolean | '', boolean | ''>(true)
	testType.equal<boolean | symbol, boolean | symbol>(true)
	testType.equal<boolean | bigint, boolean | bigint>(true)
	testType.equal<boolean | 1n, boolean | 1n>(true)
	testType.equal<boolean | {}, boolean | {}>(true)
	testType.equal<boolean | { a: 1 }, boolean | { a: 1 }>(true)
	testType.equal<boolean | string[], boolean | string[]>(true)
	testType.equal<boolean | [], boolean | []>(true)
	testType.equal<boolean | Function, boolean | Function>(true)
	testType.equal<boolean | (() => void), boolean | (() => void)>(true)

	testType.equal<boolean | any, any>(true)
	testType.equal<boolean | unknown, unknown>(true)
	testType.equal<boolean | never, boolean>(true)
	testType.equal<boolean | void, boolean | void>(true)
})

test('intersection behavior of boolean', () => {
	testType.equal<boolean & undefined, never>(true)
	testType.equal<boolean & null, never>(true)

	testType.equal<boolean & boolean, boolean>(true)
	testType.equal<boolean & true, true>(true)
	testType.equal<boolean & false, false>(true)

	testType.equal<boolean & number, never>(true)
	testType.equal<boolean & 1, never>(true)
	testType.equal<boolean & string, never>(true)
	testType.equal<boolean & '', never>(true)
	testType.equal<boolean & symbol, never>(true)
	testType.equal<boolean & bigint, never>(true)
	testType.equal<boolean & 1n, never>(true)

	testType.equal<boolean & {}, boolean>(true)
	testType.equal<boolean & { a: 1 }, boolean & { a: 1 }>(true)
	testType.equal<true & { a: 1 }, true & { a: 1 }>(true)
	testType.equal<false & { a: 1 }, false & { a: 1 }>(true)
	testType.equal<boolean & string[], boolean & string[]>(true)
	testType.equal<boolean & [], boolean & []>(true)
	testType.equal<boolean & Function, boolean & Function>(true)
	testType.equal<boolean & (() => void), boolean & (() => void)>(true)

	testType.equal<boolean & any, any>(true)
	testType.equal<boolean & unknown, boolean>(true)
	testType.equal<boolean & never, never>(true)
	testType.equal<boolean & void, never>(true)
})
