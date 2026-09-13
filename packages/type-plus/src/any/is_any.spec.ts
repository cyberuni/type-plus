import { describe, it } from 'vitest'

import type { $Void } from '../$type/special/$void.js'
import { type $Else, type $Never, type $Selection, type $Then, type $Unknown, type IsAny, testType } from '../index.js'

// alternative implementation
// export type IsAny<
// 	T,
// 	$O extends IsAny.$Options = {}
// > = 0 extends 1 & T
// 	? $ResolveBranch<$O, [$Then], T>
// 	: $ResolveBranch<
// 		$O,
// 		[[unknown] extends [T] ? $Unknown : unknown, [never] extends [T] ? $Never : unknown, $Else],
// 		T
// 	>

it('returns true for any', () => {
	testType.equal<IsAny<any>, true>(true)
})

it('returns false for other special types', () => {
	testType.false<IsAny<unknown>>(true)
	testType.false<IsAny<void>>(true)
	testType.false<IsAny<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsAny<undefined>>(true)
	testType.false<IsAny<null>>(true)
	testType.false<IsAny<boolean>>(true)
	testType.false<IsAny<true>>(true)
	testType.false<IsAny<false>>(true)
	testType.false<IsAny<number>>(true)
	testType.false<IsAny<1>>(true)
	testType.false<IsAny<string>>(true)
	testType.false<IsAny<''>>(true)
	testType.false<IsAny<symbol>>(true)
	testType.false<IsAny<bigint>>(true)
	testType.false<IsAny<1n>>(true)
	testType.false<IsAny<{}>>(true)
	testType.false<IsAny<{ a: 1 }>>(true)
	testType.false<IsAny<string[]>>(true)
	testType.false<IsAny<[]>>(true)
	testType.false<IsAny<Function>>(true)
	testType.false<IsAny<() => void>>(true)
})

it('work as branching', () => {
	testType.equal<IsAny<any, IsAny.$Branch>, $Then>(true)
	testType.equal<IsAny<0, IsAny.$Branch>, $Else>(true)

	testType.equal<IsAny<unknown, $Selection.Branch>, $Else>(true)
	testType.equal<IsAny<unknown, IsAny.$Branch>, $Unknown>(true)
	testType.equal<IsAny<never, $Selection.Branch>, $Else>(true)
	testType.equal<IsAny<never, IsAny.$Branch>, $Never>(true)
	testType.equal<IsAny<void, IsAny.$Branch>, $Void>(true)
})

it('works with partial customization', () => {
	testType.equal<IsAny<any, { $then: 1 }>, 1>(true)
	testType.equal<IsAny<0, { $then: 1 }>, false>(true)

	testType.equal<IsAny<any, { $else: 2 }>, true>(true)
	testType.equal<IsAny<0, { $else: 2 }>, 2>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsAny<unknown>, false>(true)
	testType.equal<IsAny<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsAny<never>, false>(true)
	testType.equal<IsAny<never, { $never: unknown }>, unknown>(true)
})

it('can override $void branch', () => {
	testType.equal<IsAny<void>, false>(true)
	testType.equal<IsAny<void, { $void: unknown }>, unknown>(true)
})

describe('filter', () => {
	it('returns any for any', () => {
		testType.equal<IsAny<any, { selection: 'filter' }>, any>(true)
	})

	it('returns never for other special types', () => {
		testType.never<IsAny<unknown, { selection: 'filter' }>>(true)
		testType.never<IsAny<void, { selection: 'filter' }>>(true)
		testType.never<IsAny<never, { selection: 'filter' }>>(true)
	})

	it('returns never for other types', () => {
		testType.never<IsAny<undefined, { selection: 'filter' }>>(true)
		testType.never<IsAny<null, { selection: 'filter' }>>(true)
		testType.never<IsAny<boolean, { selection: 'filter' }>>(true)
		testType.never<IsAny<true, { selection: 'filter' }>>(true)
		testType.never<IsAny<false, { selection: 'filter' }>>(true)
		testType.never<IsAny<number, { selection: 'filter' }>>(true)
		testType.never<IsAny<1, { selection: 'filter' }>>(true)
		testType.never<IsAny<string, { selection: 'filter' }>>(true)
		testType.never<IsAny<'', { selection: 'filter' }>>(true)
		testType.never<IsAny<symbol, { selection: 'filter' }>>(true)
		testType.never<IsAny<bigint, { selection: 'filter' }>>(true)
		testType.never<IsAny<1n, { selection: 'filter' }>>(true)
		testType.never<IsAny<{}, { selection: 'filter' }>>(true)
		testType.never<IsAny<{ a: 1 }, { selection: 'filter' }>>(true)
		testType.never<IsAny<string[], { selection: 'filter' }>>(true)
		testType.never<IsAny<[], { selection: 'filter' }>>(true)
		testType.never<IsAny<Function, { selection: 'filter' }>>(true)
		testType.never<IsAny<() => void, { selection: 'filter' }>>(true)
	})

	it('returns any for union type', () => {
		testType.equal<any | 1, any>(true)
		testType.any<IsAny<any | 1, { selection: 'filter' }>>(true)
	})

	it('returns any for intersection type', () => {
		testType.equal<any & 1, any>(true)
		testType.any<IsAny<any & 1, { selection: 'filter' }>>(true)
	})
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsAny<any>, IsAny<any, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<unknown>, IsAny<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<never>, IsAny<never, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<void>, IsAny<void, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<{}>, IsAny<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<object>, IsAny<object, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<undefined>, IsAny<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<null>, IsAny<null, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<{} | null | undefined>, IsAny<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<string>, IsAny<string, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<'a'>, IsAny<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsAny<1>, IsAny<1, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<{ a: 1 }>, IsAny<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<() => void>, IsAny<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<string[]>, IsAny<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsAny<{} | 1>, IsAny<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<string | 1>, IsAny<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<object | undefined>, IsAny<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<void | undefined>, IsAny<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<never | 1>, IsAny<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsAny<unknown | 1>, IsAny<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
