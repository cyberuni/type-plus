import { test } from 'vitest'

import { type AnyFunction, assertType, testType } from '../index.js'

test('the bare form matches every function', () => {
	testType.equal<(() => void) extends AnyFunction ? true : false, true>(true)
	testType.equal<((a: string) => number) extends AnyFunction ? true : false, true>(true)
})

test('narrowing the params turns it into a shape constraint', () => {
	testType.equal<((a: string) => number) extends AnyFunction<[string], number> ? true : false, true>(true)
	testType.equal<((a: string) => number) extends AnyFunction<[number]> ? true : false, false>(true)
})

test('basic', () => {
	function doCallback(cb: AnyFunction) {
		cb()
	}

	doCallback(() => {})
	doCallback((_) => {})
	doCallback((a: number, b: number) => a + b)
})

test('define param as tuple', () => {
	const foo: AnyFunction<[number, string]> = (x) => x
	foo(1, 'a')
})

test('define result type', () => {
	const foo: AnyFunction<string[], string> = (x) => x
	assertType.isString(foo('a'))
})
