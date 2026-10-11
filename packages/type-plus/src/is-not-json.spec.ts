import { describe, it } from 'vitest'

import type { $Else, $Fn, $Then, IsNotJson } from './index.js'
import { testType } from './testing/index.js'

interface User {
	id: number
	tags: string[]
	nick?: string
}

it('returns false for JSON values', () => {
	testType.false<IsNotJson<null>>(true)
	testType.false<IsNotJson<string>>(true)
	testType.false<IsNotJson<{ a: 1 }>>(true)
	testType.false<IsNotJson<[1, 'x']>>(true)
	testType.false<IsNotJson<User>>(true)
	testType.false<IsNotJson<{ a: readonly [1, 2] }>>(true)
	testType.false<IsNotJson<{ a?: number }>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotJson<any>>(true)
	testType.true<IsNotJson<unknown>>(true)
	testType.true<IsNotJson<void>>(true)
	testType.true<IsNotJson<never>>(true)
})

it('returns true for what does not survive a JSON round trip', () => {
	testType.true<IsNotJson<undefined>>(true)
	testType.true<IsNotJson<bigint>>(true)
	testType.true<IsNotJson<() => void>>(true)
	testType.true<IsNotJson<Date>>(true)
	testType.true<IsNotJson<{ a: Date }>>(true)
	testType.true<IsNotJson<{ a: undefined }>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsNotJson<string | Date>, boolean>(true)
	testType.equal<IsNotJson<string | Date, { distributive: false }>, true>(true)
})

describe('filter', () => {
	it('keeps the members of T that are not JSON', () => {
		testType.equal<IsNotJson<string | Date, { selection: 'filter' }>, Date>(true)
		testType.never<IsNotJson<User, { selection: 'filter' }>>(true)
	})

	it('returns T for special types, except never', () => {
		testType.equal<IsNotJson<unknown, { selection: 'filter' }>, unknown>(true)
		testType.never<IsNotJson<never, { selection: 'filter' }>>(true)
	})
})

describe('$Branch', () => {
	it('returns $Then if T is not JSON', () => {
		testType.equal<IsNotJson<Date, IsNotJson.$Branch>, $Then>(true)
	})

	it('returns $Else if T is JSON', () => {
		testType.equal<IsNotJson<User, IsNotJson.$Branch>, $Else>(true)
	})
})

describe('IsNotJson.$Fn', () => {
	it('is IsNotJson as a type function', () => {
		testType.equal<$Fn.Apply<IsNotJson.$Fn, Date>, true>(true)
		testType.equal<$Fn.Apply<IsNotJson.$Fn, { a: 1 }>, false>(true)
	})
})

it('resolves `IsNotJson.$Default` the same as no options', () => {
	testType.equal<IsNotJson<any, IsNotJson.$Default>, IsNotJson<any>>(true)
	testType.equal<IsNotJson<unknown, IsNotJson.$Default>, IsNotJson<unknown>>(true)
	testType.equal<IsNotJson<never, IsNotJson.$Default>, IsNotJson<never>>(true)
	testType.equal<IsNotJson<void, IsNotJson.$Default>, IsNotJson<void>>(true)
	testType.equal<IsNotJson<User, IsNotJson.$Default>, IsNotJson<User>>(true)
	testType.equal<IsNotJson<Date, IsNotJson.$Default>, IsNotJson<Date>>(true)
	testType.equal<IsNotJson<string | Date, IsNotJson.$Default>, IsNotJson<string | Date>>(true)
})

describe('without options', () => {
	it('equals the full path with default options', () => {
		testType.equal<IsNotJson<any>, IsNotJson<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<unknown>, IsNotJson<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<never>, IsNotJson<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<void>, IsNotJson<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<undefined>, IsNotJson<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<null>, IsNotJson<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<User>, IsNotJson<User, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<Date>, IsNotJson<Date, { selection: 'predicate' }>>(true)
		testType.equal<IsNotJson<string | Date>, IsNotJson<string | Date, { selection: 'predicate' }>>(true)
	})
})
