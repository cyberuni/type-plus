import { expect, it } from 'vitest'

import { testType } from '../index.js'

it('binds the parameters of a function as the subject', () => {
	testType.of((a: number, b?: string) => [a, b]).parameters.equal<[a: number, b?: string | undefined]>(true)
	testType.of(() => 1).parameters.equal<[]>(true)

	// @ts-expect-error
	testType.of((a: number) => a).parameters.equal<[string]>(true)
})

it('keeps every check on the parameters subject', () => {
	testType.of((a: number) => a).parameters.tuple(true)
	testType.of((...args: number[]) => args).parameters.array(true)
	testType.of((a: number) => a).parameters.canAssign<unknown[]>(true)
})

it('is the union of the parameter tuples for a union of functions', () => {
	testType
		.of(((a: number) => a) as ((a: number) => number) | ((b: string) => string))
		.parameters.equal<[a: number] | [b: string]>(true)
})

it('is the parameters of the last overload for an overloaded function', () => {
	function f(a: number): number
	function f(a: string): string
	function f(a: unknown) {
		return a
	}
	testType.of(f).parameters.equal<[a: string]>(true)
})

it('rejects a check on a type that is not a function', () => {
	testType.equal<
		testType.Subject<number>['parameters'],
		testType.Failed<'parameters', number, (...args: any[]) => any>
	>(true)

	// @ts-expect-error
	testType.of(1).parameters.equal<[]>(true)
})

it('returns expected at runtime', () => {
	expect(testType.of((a: number) => a).parameters.tuple(true)).toBe(true)
})
