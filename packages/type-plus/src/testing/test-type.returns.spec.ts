import { expect, it } from 'vitest'

import { testType } from '../index.js'

it('binds the return type of a function as the subject', () => {
	testType.of((a: number) => String(a)).returns.equal<string>(true)
	testType.of(async () => 1).returns.equal<Promise<number>>(true)

	// @ts-expect-error
	testType.of((a: number) => String(a)).returns.equal<number>(true)
})

it('keeps every check on the return subject', () => {
	testType.of(() => 'a' as const).returns.string<{ exact: true }>(false)
	testType.of(() => undefined).returns.undefined(true)
	testType.of((): void => {}).returns.void(true)
	testType.of(() => 1).returns.canAssign<number>(true)
})

it('is the union of the return types for a union of functions', () => {
	testType.of((() => 1) as (() => number) | (() => string)).returns.equal<number | string>(true)
})

it('is the return type of the last overload for an overloaded function', () => {
	function f(a: number): number
	function f(a: string): string
	function f(a: unknown) {
		return a
	}
	testType.of(f).returns.equal<string>(true)
})

it('chains into another function subject', () => {
	testType.of(() => (a: number) => a).returns.parameters.equal<[a: number]>(true)
	testType.of(() => (a: number) => a).returns.returns.equal<number>(true)
})

it('rejects a check on a type that is not a function', () => {
	testType.equal<testType.Subject<number>['returns'], testType.Failed<'returns', number, (...args: any[]) => any>>(true)

	// @ts-expect-error
	testType.of(1).returns.equal<number>(true)
	// @ts-expect-error
	testType.of('a' as unknown).returns.unknown(true)
})

it('returns expected at runtime', () => {
	expect(testType.of(() => 1).returns.number(true)).toBe(true)
})
