import { it } from 'vitest'

import { testType } from '../index.js'

it('passes when a construct signature accepts the arguments', () => {
	testType.constructibleWith<DateConstructor, []>(true)
	testType.constructibleWith<DateConstructor, [number, number]>(true)
	testType.constructibleWith<DateConstructor, [boolean]>(false)

	// @ts-expect-error
	testType.constructibleWith<DateConstructor, [boolean]>(true)
})

it('checks the constructor of a class', () => {
	class Point {
		constructor(
			public x: number,
			public y = 0,
		) {}
	}

	testType.constructibleWith<typeof Point, [number]>(true)
	testType.constructibleWith<typeof Point, [number, number]>(true)
	testType.constructibleWith<typeof Point, []>(false)
})

it('checks every overload of the constructor', () => {
	class Id {
		constructor(value: string)
		constructor(value: number, radix: number)
		constructor(_value: string | number, _radix?: number) {}
	}

	testType.constructibleWith<typeof Id, [string]>(true)
	testType.constructibleWith<typeof Id, [number, number]>(true)
	testType.constructibleWith<typeof Id, [number]>(false)
})

it('fails for an abstract class', () => {
	abstract class Base {}

	testType.constructibleWith<typeof Base, []>(false)
})

it('fails for a type with no construct signature', () => {
	testType.constructibleWith<() => void, []>(false)
	testType.constructibleWith<string, []>(false)
	testType.constructibleWith<never, []>(false)
})

it('passes for any', () => {
	testType.constructibleWith<any, [1, 2]>(true)
})

it('is available as a deferred check', () => {
	testType.assert(testType.defer.constructibleWith<DateConstructor, []>())
	testType.assert(testType.defer.not.constructibleWith<DateConstructor, [boolean]>())

	// @ts-expect-error
	testType.assert(testType.defer.constructibleWith<DateConstructor, [boolean]>())
})

it('is available on testType.of', () => {
	testType.of(Date).constructibleWith<[number]>(true)
	testType.of(Date).constructibleWith<[boolean]>(false)

	// @ts-expect-error
	testType.of(Date).constructibleWith<[boolean]>(true)
})
