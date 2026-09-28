import { it } from 'vitest'

import { testType } from '../index.js'

function f(value: string): string
function f(value: number, radix: number): string
function f(value: string | number, radix?: number) {
	return typeof value === 'number' ? value.toString(radix) : value
}

it('passes when an overload accepts the arguments', () => {
	testType.callableWith<typeof f, [string]>(true)
	testType.callableWith<typeof f, [number, number]>(true)
	testType.callableWith<typeof f, [number]>(false) // no overload takes one number

	// @ts-expect-error
	testType.callableWith<typeof f, [number]>(true)
})

it('checks every overload, which equal on Parameters cannot', () => {
	testType.equal<Parameters<typeof f>, [value: number, radix: number]>(true)
	testType.callableWith<typeof f, [string]>(true)
})

it('does not match an argument list that no single overload takes', () => {
	testType.callableWith<typeof f, [string | number]>(false)
	testType.callableWith<typeof f, [string, number]>(false)
	testType.callableWith<typeof f, []>(false)
})

it('checks arity, optional and rest parameters', () => {
	testType.callableWith<() => void, []>(true)
	testType.callableWith<() => void, [1]>(false)
	testType.callableWith<(a: string, b?: number) => void, [string]>(true)
	testType.callableWith<(a: string, b?: number) => void, [string, number]>(true)
	testType.callableWith<(a: string, b?: number) => void, [string, string]>(false)
	testType.callableWith<(...a: string[]) => void, []>(true)
	testType.callableWith<(...a: string[]) => void, ['a', 'b', 'c']>(true)
	testType.callableWith<(...a: string[]) => void, [1]>(false)
})

it('accepts a readonly argument tuple', () => {
	testType.callableWith<typeof f, readonly [string]>(true)
})

it('checks a generic overload against the constraints of its type parameters', () => {
	testType.callableWith<<T extends string>(value: T) => T, [string]>(true)
	testType.callableWith<<T extends string>(value: T) => T, [number]>(false)
})

it('reads up to ten overloads', () => {
	type Ten = {
		(a: 1): void
		(a: 2): void
		(a: 3): void
		(a: 4): void
		(a: 5): void
		(a: 6): void
		(a: 7): void
		(a: 8): void
		(a: 9): void
		(a: 10): void
	}
	testType.callableWith<Ten, [1]>(true)
	testType.callableWith<Ten, [10]>(true)
	testType.callableWith<Ten, [11]>(false)
})

it('requires every member of a union of functions to accept the arguments', () => {
	testType.callableWith<((a: string) => void) | ((a: string, b?: number) => void), [string]>(true)
	testType.callableWith<((a: string) => void) | ((a: number) => void), [string]>(false)
})

it('fails for a type with no call signature', () => {
	testType.callableWith<string, []>(false)
	testType.callableWith<never, []>(false)
	testType.callableWith<new () => object, []>(false)
})

it('passes for any', () => {
	testType.callableWith<any, [1, 2]>(true)
})

it('is available as a deferred check', () => {
	testType.assert(testType.defer.callableWith<typeof f, [string]>())
	testType.assert(testType.defer.not.callableWith<typeof f, [number]>())

	// @ts-expect-error
	testType.assert(testType.defer.callableWith<typeof f, [number]>())
})

it('is available on testType.of', () => {
	testType.of(f).callableWith<[string]>(true)
	testType.of(f).callableWith<[number]>(false)

	// @ts-expect-error
	testType.of(f).callableWith<[number]>(true)
})
