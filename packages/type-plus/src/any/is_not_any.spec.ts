import { describe, it } from 'vitest'

import type { $Void } from '../$type/special/$void.js'
import { type $Else, type $Never, type $Then, type $Unknown, type IsNotAny, testType } from '../index.js'

// alternative implementation
// export type IsNotAny<
// 	T,
// 	$O extends IsNotAny.$Options = {}
// > =
// 	0 extends 1 & T
// 	? $ResolveBranch<$O, [$Else]>
// 	: $ResolveBranch<
// 		$O,
// 		[[unknown] extends [T] ? $Unknown : unknown, [never] extends [T] ? $Never : unknown, $Then],
// 		T
// 	>

it('returns false for any', () => {
	testType.equal<IsNotAny<any>, false>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotAny<unknown>, true>(true)
	testType.equal<IsNotAny<void>, true>(true)
	testType.equal<IsNotAny<never>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotAny<undefined>, true>(true)
	testType.equal<IsNotAny<null>, true>(true)
	testType.equal<IsNotAny<boolean>, true>(true)
	testType.equal<IsNotAny<true>, true>(true)
	testType.equal<IsNotAny<false>, true>(true)
	testType.equal<IsNotAny<number>, true>(true)
	testType.equal<IsNotAny<1>, true>(true)
	testType.equal<IsNotAny<string>, true>(true)
	testType.equal<IsNotAny<''>, true>(true)
	testType.equal<IsNotAny<symbol>, true>(true)
	testType.equal<IsNotAny<bigint>, true>(true)
	testType.equal<IsNotAny<1n>, true>(true)
	testType.equal<IsNotAny<{}>, true>(true)
	testType.equal<IsNotAny<string[]>, true>(true)
	testType.equal<IsNotAny<[]>, true>(true)
	testType.equal<IsNotAny<Function>, true>(true)
	testType.equal<IsNotAny<() => void>, true>(true)
})

it('returns false for union type as it is resolved immediately by TypeScript to any', () => {
	testType.equal<any | 1, any>(true)
	testType.equal<IsNotAny<any | 1>, false>(true)
})

it('returns false for intersection type as it is resolved immediately by TypeScript to any', () => {
	testType.equal<any & 1, any>(true)
	testType.equal<IsNotAny<any & 1>, false>(true)
})

it('work as branching', () => {
	testType.equal<IsNotAny<any, IsNotAny.$Branch>, $Else>(true)
	testType.equal<IsNotAny<0, IsNotAny.$Branch>, $Then>(true)

	testType.equal<IsNotAny<unknown, IsNotAny.$Branch>, $Unknown>(true)
	testType.equal<IsNotAny<never, IsNotAny.$Branch>, $Never>(true)
	testType.equal<IsNotAny<void, IsNotAny.$Branch>, $Void>(true)
})

it('works with partial customization', () => {
	testType.equal<IsNotAny<any, { $then: 1 }>, false>(true)
	testType.equal<IsNotAny<0, { $then: 1 }>, 1>(true)

	testType.equal<IsNotAny<any, { $else: 2 }>, 2>(true)
	testType.equal<IsNotAny<0, { $else: 2 }>, true>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotAny<unknown>, true>(true)
	testType.equal<IsNotAny<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotAny<never>, true>(true)
	testType.equal<IsNotAny<never, { $never: unknown }>, unknown>(true)
})

describe('filter', () => {
	it('returns never for any', () => {
		testType.never<IsNotAny<any, { selection: 'filter' }>>(true)
	})

	it('returns T for other special types', () => {
		testType.equal<IsNotAny<unknown, { selection: 'filter' }>, unknown>(true)
		testType.equal<IsNotAny<void, { selection: 'filter' }>, void>(true)
		testType.equal<IsNotAny<never, { selection: 'filter' }>, never>(true)
	})

	it('returns T for other types', () => {
		testType.equal<IsNotAny<undefined, { selection: 'filter' }>, undefined>(true)
		testType.equal<IsNotAny<null, { selection: 'filter' }>, null>(true)
		testType.equal<IsNotAny<boolean, { selection: 'filter' }>, boolean>(true)
		testType.equal<IsNotAny<true, { selection: 'filter' }>, true>(true)
		testType.equal<IsNotAny<false, { selection: 'filter' }>, false>(true)
		testType.equal<IsNotAny<number, { selection: 'filter' }>, number>(true)
		testType.equal<IsNotAny<1, { selection: 'filter' }>, 1>(true)
		testType.equal<IsNotAny<string, { selection: 'filter' }>, string>(true)
		testType.equal<IsNotAny<'', { selection: 'filter' }>, ''>(true)
		testType.equal<IsNotAny<symbol, { selection: 'filter' }>, symbol>(true)
		testType.equal<IsNotAny<bigint, { selection: 'filter' }>, bigint>(true)
		testType.equal<IsNotAny<1n, { selection: 'filter' }>, 1n>(true)
		testType.equal<IsNotAny<{}, { selection: 'filter' }>, {}>(true)
		testType.equal<IsNotAny<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
		testType.equal<IsNotAny<string[], { selection: 'filter' }>, string[]>(true)
		testType.equal<IsNotAny<[], { selection: 'filter' }>, []>(true)
		testType.equal<IsNotAny<Function, { selection: 'filter' }>, Function>(true)
		testType.equal<IsNotAny<() => void, { selection: 'filter' }>, () => void>(true)
	})

	it('returns never for union type', () => {
		testType.equal<any | 1, any>(true)
		testType.equal<IsNotAny<any | 1, { selection: 'filter' }>, never>(true)
	})

	it('returns never for intersection type', () => {
		testType.equal<any & 1, any>(true)
		testType.equal<IsNotAny<any & 1, { selection: 'filter' }>, never>(true)
	})
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNotAny<any>, IsNotAny<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<unknown>, IsNotAny<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<never>, IsNotAny<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<void>, IsNotAny<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<{}>, IsNotAny<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<object>, IsNotAny<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<undefined>, IsNotAny<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<null>, IsNotAny<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<{} | null | undefined>, IsNotAny<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<string>, IsNotAny<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<'a'>, IsNotAny<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<1>, IsNotAny<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<{ a: 1 }>, IsNotAny<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<() => void>, IsNotAny<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<string[]>, IsNotAny<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<{} | 1>, IsNotAny<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<string | 1>, IsNotAny<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<object | undefined>, IsNotAny<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<void | 1>, IsNotAny<void | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<void | undefined>, IsNotAny<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<undefined | 1>, IsNotAny<undefined | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<void & { a: 1 }>, IsNotAny<void & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<never | 1>, IsNotAny<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotAny<unknown | 1>, IsNotAny<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
