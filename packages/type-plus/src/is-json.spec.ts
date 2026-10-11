import { describe, it } from 'vitest'

import type { $Else, $Fn, $Then, IsJson, JsonTypes } from './index.js'
import { testType } from './testing/index.js'

interface User {
	id: number
	tags: string[]
	nick?: string
}

it('returns true for JSON primitives', () => {
	testType.true<IsJson<null>>(true)
	testType.true<IsJson<boolean>>(true)
	testType.true<IsJson<1>>(true)
	testType.true<IsJson<string>>(true)
})

it('returns true for JSON objects and arrays', () => {
	testType.true<IsJson<{ a: 1 }>>(true)
	testType.true<IsJson<{}>>(true)
	testType.true<IsJson<string[]>>(true)
	testType.true<IsJson<[1, 'x']>>(true)
	testType.true<IsJson<JsonTypes>>(true)
})

it('returns true for an interface', () => {
	testType.true<IsJson<User>>(true)
})

it('returns true for readonly data and optional properties', () => {
	testType.true<IsJson<{ a: readonly [1, 2] }>>(true)
	testType.true<IsJson<{ readonly a: readonly [1, 2] }>>(true)
	testType.true<IsJson<{ a?: number }>>(true)
})

it('returns false for special types', () => {
	testType.false<IsJson<any>>(true)
	testType.false<IsJson<unknown>>(true)
	testType.false<IsJson<void>>(true)
	testType.false<IsJson<never>>(true)
})

it('returns false for what does not survive a JSON round trip', () => {
	testType.false<IsJson<undefined>>(true)
	testType.false<IsJson<bigint>>(true)
	testType.false<IsJson<symbol>>(true)
	testType.false<IsJson<() => void>>(true)
	testType.false<IsJson<Date>>(true)
	testType.false<IsJson<{ a: Date }>>(true)
	testType.false<IsJson<{ a: undefined }>>(true)
	testType.false<IsJson<{ a: number | undefined }>>(true)
	testType.false<IsJson<{ a: Array<() => void> }>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsJson<string | Date>, boolean>(true)
	testType.equal<IsJson<string | 1>, true>(true)
	testType.equal<IsJson<Date | bigint>, false>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsJson<string | Date>, boolean>(true)
	testType.equal<IsJson<string | Date, { distributive: false }>, false>(true)
	testType.equal<IsJson<string | 1, { distributive: false }>, true>(true)
})

describe('filter', () => {
	it('returns T if T is JSON', () => {
		testType.equal<IsJson<User, { selection: 'filter' }>, User>(true)
		testType.equal<IsJson<null, { selection: 'filter' }>, null>(true)
	})

	it('returns never for special types', () => {
		testType.never<IsJson<any, { selection: 'filter' }>>(true)
		testType.never<IsJson<unknown, { selection: 'filter' }>>(true)
		testType.never<IsJson<void, { selection: 'filter' }>>(true)
		testType.never<IsJson<never, { selection: 'filter' }>>(true)
	})

	it('returns never if T is not JSON', () => {
		testType.never<IsJson<Date, { selection: 'filter' }>>(true)
		testType.never<IsJson<{ a: undefined }, { selection: 'filter' }>>(true)
	})

	it('keeps the JSON members of a union', () => {
		testType.equal<IsJson<string | Date, { selection: 'filter' }>, string>(true)
	})
})

describe('$Branch', () => {
	it('returns $Then if T is JSON', () => {
		testType.equal<IsJson<User, IsJson.$Branch>, $Then>(true)
	})

	it('returns $Else if T is not JSON', () => {
		testType.equal<IsJson<Date, IsJson.$Branch>, $Else>(true)
		testType.equal<IsJson<string | Date, IsJson.$Branch>, $Then | $Else>(true)
	})

	it('returns $Else for special types', () => {
		testType.equal<IsJson<any, IsJson.$Branch>, $Else>(true)
		testType.equal<IsJson<unknown, IsJson.$Branch>, $Else>(true)
		testType.equal<IsJson<never, IsJson.$Branch>, $Else>(true)
		testType.equal<IsJson<void, IsJson.$Branch>, $Else>(true)
	})

	it('can override special branches', () => {
		testType.equal<IsJson<any, { $any: unknown }>, unknown>(true)
		testType.equal<IsJson<unknown, { $unknown: unknown }>, unknown>(true)
		testType.equal<IsJson<never, { $never: unknown }>, unknown>(true)
		testType.equal<IsJson<void, { $void: unknown }>, unknown>(true)
	})
})

describe('IsJson.$Fn', () => {
	it('is IsJson as a type function', () => {
		testType.equal<$Fn.Apply<IsJson.$Fn, { a: 1 }>, true>(true)
		testType.equal<$Fn.Apply<IsJson.$Fn, Date>, false>(true)
	})
})

it('resolves `IsJson.$Default` the same as no options', () => {
	testType.equal<IsJson<any, IsJson.$Default>, IsJson<any>>(true)
	testType.equal<IsJson<unknown, IsJson.$Default>, IsJson<unknown>>(true)
	testType.equal<IsJson<never, IsJson.$Default>, IsJson<never>>(true)
	testType.equal<IsJson<void, IsJson.$Default>, IsJson<void>>(true)
	testType.equal<IsJson<User, IsJson.$Default>, IsJson<User>>(true)
	testType.equal<IsJson<Date, IsJson.$Default>, IsJson<Date>>(true)
	testType.equal<IsJson<string | Date, IsJson.$Default>, IsJson<string | Date>>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsJson<any>, IsJson<any, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<unknown>, IsJson<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<never>, IsJson<never, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<void>, IsJson<void, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<undefined>, IsJson<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<null>, IsJson<null, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<{} | null | undefined>, IsJson<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<string>, IsJson<string, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<1n>, IsJson<1n, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<User>, IsJson<User, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<Date>, IsJson<Date, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<() => void>, IsJson<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsJson<readonly [1]>, IsJson<readonly [1], { selection: 'predicate' }>>(true)
		testType.equal<IsJson<string | Date>, IsJson<string | Date, { selection: 'predicate' }>>(true)
	})
})
