import { describe, it } from 'vitest'

import {
	type $Any,
	type $BranchOptions,
	type $Else,
	type $NotNever,
	type $Then,
	type $Unknown,
	type IsNever,
	testType,
} from '../index.js'

// alternative implementation
// export type IsNever<
// 	T,
// 	$O extends IsNever.$Options = {}
// > = [T, never] extends [never, T]
// 	? $ResolveBranch<$O, [$Then], T>
// 	: $ResolveBranch<
// 		'$else' extends keyof $O ? $O :
// 		$O['selection'] extends 'filter' ? $O & { $else: $NotNever } : $O,
// 		[0 extends 1 & T ? $Any : unknown, [unknown] extends [T] ? $Unknown : unknown, $Else],
// 		T
// 	>

it('returns true for never', () => {
	testType.true<IsNever<never>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsNever<unknown>>(true)
	testType.false<IsNever<void>>(true)
	testType.false<IsNever<any>>(true)
})

it('returns false for other types', () => {
	testType.false<IsNever<undefined>>(true)
	testType.false<IsNever<null>>(true)
	testType.false<IsNever<number>>(true)
	testType.false<IsNever<1>>(true)
	testType.false<IsNever<boolean>>(true)
	testType.false<IsNever<true>>(true)
	testType.false<IsNever<false>>(true)
	testType.false<IsNever<string>>(true)
	testType.false<IsNever<''>>(true)
	testType.false<IsNever<symbol>>(true)
	testType.false<IsNever<bigint>>(true)
	testType.false<IsNever<1n>>(true)
	testType.false<IsNever<{}>>(true)
	testType.false<IsNever<string[]>>(true)
	testType.false<IsNever<[]>>(true)
	testType.false<IsNever<Function>>(true)
	testType.false<IsNever<() => void>>(true)
})

it('returns false for union type as it is resolved immediately by TypeScript to T', () => {
	testType.equal<never | 1, 1>(true)
	testType.false<IsNever<never | 1>>(true)
})

it('returns true for intersection type', () => {
	testType.equal<never & { a: 1 }, never>(true)
	testType.true<IsNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNever<never, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsNever<never, $BranchOptions<$Then | $Else>>, $Then>(true)
	testType.equal<IsNever<0, $BranchOptions<$Then | $Else>>, $Else>(true)

	testType.equal<IsNever<any, $BranchOptions<$Else>>, $Else>(true)
	testType.equal<IsNever<any, $BranchOptions<$Any>>, $Any>(true)
	testType.equal<IsNever<any, $BranchOptions<$Any | $Else>>, $Any>(true)
	testType.equal<IsNever<unknown, $BranchOptions<$Else>>, $Else>(true)
	testType.equal<IsNever<unknown, $BranchOptions<$Unknown>>, $Unknown>(true)
	testType.equal<IsNever<unknown, $BranchOptions<$Unknown | $Else>>, $Unknown>(true)
})

it('works with partial customization', () => {
	testType.equal<IsNever<never, { $then: 1 }>, 1>(true)
	testType.equal<IsNever<0, { $then: 1 }>, false>(true)

	testType.equal<IsNever<never, { $else: 2 }>, true>(true)
	testType.equal<IsNever<0, { $else: 2 }>, 2>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNever<unknown>, false>(true)
	testType.equal<IsNever<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNever<any>, false>(true)
	testType.equal<IsNever<any, { $any: unknown }>, unknown>(true)
})

describe('filter', () => {
	it('returns never if T is never', () => {
		testType.equal<IsNever<never, { selection: 'filter' }>, never>(true)
		testType.equal<IsNever<void, { selection: 'filter'; $else: $NotNever }>, $NotNever>(true)
	})

	it('returns $NotNever for other special types', () => {
		testType.equal<IsNever<unknown, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<void, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<any, { selection: 'filter' }>, $NotNever>(true)
	})

	it('returns $NotNever for other types', () => {
		testType.equal<IsNever<undefined, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<null, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<number, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<boolean, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<true, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<false, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<string, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<'', { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<symbol, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<bigint, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<{}, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<string[], { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<[], { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<Function, { selection: 'filter' }>, $NotNever>(true)
		testType.equal<IsNever<() => void, { selection: 'filter' }>, $NotNever>(true)
	})

	it('returns $NotNever for union type', () => {
		testType.equal<IsNever<never | 1, { selection: 'filter' }>, $NotNever>(true)
	})

	it('returns never for intersection type', () => {
		// TypeScript resolve this to `never` automatically,
		// so `IsNever<>` actually does not do anthing in this case.
		testType.never<never & { a: 1 }>(true)
		testType.never<IsNever<never & { a: 1 }, { selection: 'filter' }>>(true)
	})
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNever<any>, IsNever<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<unknown>, IsNever<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<never>, IsNever<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<void>, IsNever<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<{}>, IsNever<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<object>, IsNever<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<undefined>, IsNever<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<null>, IsNever<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<{} | null | undefined>, IsNever<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<string>, IsNever<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<'a'>, IsNever<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNever<1>, IsNever<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<{ a: 1 }>, IsNever<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<() => void>, IsNever<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<string[]>, IsNever<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNever<{} | 1>, IsNever<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<string | 1>, IsNever<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<object | undefined>, IsNever<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<void | undefined>, IsNever<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<never | 1>, IsNever<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNever<unknown | 1>, IsNever<unknown | 1, { selection: 'predicate' }>>(true)
	})
})
