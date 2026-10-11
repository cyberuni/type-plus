import { test } from 'vitest'
import { testType } from '../testing/index.js'

test('union behavior of bigint', () => {
	testType.equal<bigint | undefined, bigint | undefined>(true)
	testType.equal<bigint | null, bigint | null>(true)
	testType.equal<bigint | boolean, bigint | boolean>(true)
	testType.equal<bigint | true, bigint | true>(true)
	testType.equal<bigint | false, bigint | false>(true)
	testType.equal<bigint | number, bigint | number>(true)
	testType.equal<bigint | 1, bigint | 1>(true)
	testType.equal<bigint | string, bigint | string>(true)
	testType.equal<bigint | '', bigint | ''>(true)
	testType.equal<bigint | symbol, bigint | symbol>(true)

	testType.equal<bigint | 1n, bigint>(true)

	testType.equal<bigint | {}, bigint | {}>(true)
	testType.equal<bigint | { a: 1 }, bigint | { a: 1 }>(true)
	testType.equal<bigint | string[], bigint | string[]>(true)
	testType.equal<bigint | [], bigint | []>(true)
	testType.equal<bigint | Function, bigint | Function>(true)
	testType.equal<bigint | (() => void), bigint | (() => void)>(true)

	testType.equal<bigint | any, any>(true)
	testType.equal<bigint | unknown, unknown>(true)
	testType.equal<bigint | never, bigint>(true)
	testType.equal<bigint | void, bigint | void>(true)
})

test('intersection behavior of bigint', () => {
	testType.equal<bigint & undefined, never>(true)
	testType.equal<bigint & null, never>(true)
	testType.equal<bigint & boolean, never>(true)
	testType.equal<bigint & true, never>(true)
	testType.equal<bigint & false, never>(true)
	testType.equal<bigint & number, never>(true)

	testType.equal<bigint & 1, never>(true)

	testType.equal<bigint & string, never>(true)
	testType.equal<bigint & '', never>(true)
	testType.equal<bigint & symbol, never>(true)

	testType.equal<bigint & bigint, bigint>(true)
	testType.equal<bigint & 1n, 1n>(true)

	testType.equal<bigint & {}, bigint & {}>(true)
	testType.equal<bigint & { a: 1 }, bigint & { a: 1 }>(true)
	testType.equal<bigint & string[], bigint & string[]>(true)
	testType.equal<bigint & [], bigint & []>(true)
	testType.equal<bigint & Function, bigint & Function>(true)
	testType.equal<bigint & (() => void), bigint & (() => void)>(true)

	testType.equal<bigint & any, any>(true)
	testType.equal<bigint & unknown, bigint>(true)
	testType.equal<bigint & never, never>(true)
	testType.equal<bigint & void, never>(true)
})
