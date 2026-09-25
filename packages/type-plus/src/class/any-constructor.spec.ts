import { test } from 'vitest'

import { type AnyConstructor, testType } from '../index.js'

class Foo {
	constructor(readonly a: number) {}
}

test('matches the class, not its instance type', () => {
	testType.equal<typeof Foo extends AnyConstructor ? true : false, true>(true)
	testType.equal<Foo extends AnyConstructor ? true : false, false>(true)
})

test('narrowing the params turns it into a shape constraint', () => {
	testType.equal<typeof Foo extends AnyConstructor<[string]> ? true : false, false>(true)
})

test('basic', () => {
	// biome-ignore lint/complexity/useArrowFunction: on purpose
	const a = function () {} as any as AnyConstructor

	new a()
})

test('specify params with tuple', () => {
	// biome-ignore lint/complexity/useArrowFunction: on purpose
	const a = function () {} as any as AnyConstructor<[count: number, value: string]>

	new a(1, 'a')
})
