import { describe, it } from 'vitest'

import {
	type $Any,
	type $BranchOptions,
	type $Else,
	type $Fn,
	type $Never,
	type $Then,
	type $Unknown,
	type IsNotNever,
	testType,
} from '../index.js'

// alternative implementation
// export type IsNotNever<
// 	T,
// 	$O extends IsNotNever.$Options = {}
// > = [T, never] extends [never, T]
// 	? $ResolveBranch<
// 		'$else' extends keyof $O ? $O :
// 		$O['selection'] extends 'filter' ? $O & { $else: $Never } : $O,
// 		[$Else],
// 		T
// 	>
// 	: $ResolveBranch<
// 		$O,
// 		[0 extends 1 & T ? $Any : unknown, [unknown] extends [T] ? $Unknown : unknown, $Then],
// 		T
// 	>

it('returns false for never', () => {
	testType.false<IsNotNever<never>>(true)
})

it('returns true for other special types', () => {
	testType.true<IsNotNever<unknown>>(true)
	testType.true<IsNotNever<void>>(true)
	testType.true<IsNotNever<any>>(true)
})

it('returns true for singular types', () => {
	testType.true<IsNotNever<undefined>>(true)
	testType.true<IsNotNever<null>>(true)
	testType.true<IsNotNever<number>>(true)
	testType.true<IsNotNever<1>>(true)
	testType.true<IsNotNever<boolean>>(true)
	testType.true<IsNotNever<true>>(true)
	testType.true<IsNotNever<false>>(true)
	testType.true<IsNotNever<string>>(true)
	testType.true<IsNotNever<''>>(true)
	testType.true<IsNotNever<symbol>>(true)
	testType.true<IsNotNever<bigint>>(true)
	testType.true<IsNotNever<1n>>(true)
	testType.true<IsNotNever<{}>>(true)
	testType.true<IsNotNever<string[]>>(true)
	testType.true<IsNotNever<[]>>(true)
	testType.true<IsNotNever<Function>>(true)
	testType.true<IsNotNever<() => void>>(true)
})

it('returns true for union type', () => {
	testType.true<IsNotNever<never | 1>>(true)
})

it('returns false for intersection type', () => {
	testType.false<IsNotNever<never & { a: 1 }>>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsNotNever<never, $BranchOptions<$Else>>, $Else>(true)
	testType.equal<IsNotNever<never, $BranchOptions<$Then | $Else>>, $Else>(true)
	testType.equal<IsNotNever<0, $BranchOptions<$Then | $Else>>, $Then>(true)

	testType.equal<IsNotNever<any, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsNotNever<any, $BranchOptions<$Any>>, $Any>(true)
	testType.equal<IsNotNever<any, $BranchOptions<$Any | $Then>>, $Any>(true)
	testType.equal<IsNotNever<unknown, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsNotNever<unknown, $BranchOptions<$Unknown>>, $Unknown>(true)
	testType.equal<IsNotNever<unknown, $BranchOptions<$Unknown | $Then>>, $Unknown>(true)
})

it('works with partial customization', () => {
	testType.equal<IsNotNever<never, { $else: 2 }>, 2>(true)
	testType.equal<IsNotNever<0, { $else: 2 }>, true>(true)

	testType.equal<IsNotNever<any, { $then: 1 }>, 1>(true)
	testType.equal<IsNotNever<unknown, { $then: 1 }>, 1>(true)
	testType.equal<IsNotNever<never, { $then: 1 }>, false>(true)
	testType.equal<IsNotNever<void, { $then: 1 }>, 1>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotNever<unknown>, true>(true)
	testType.equal<IsNotNever<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotNever<any>, true>(true)
	testType.equal<IsNotNever<any, { $any: unknown }>, unknown>(true)
})

it('can override $void branch', () => {
	testType.equal<IsNotNever<void>, true>(true)
	testType.equal<IsNotNever<void, { $void: unknown }>, unknown>(true)
	testType.equal<IsNotNever<void, { $void: 123 }>, 123>(true)
})

describe('filter', () => {
	it('returns `is_never` if T is never', () => {
		testType.equal<IsNotNever<never, { selection: 'filter' }>, $Never>(true)
	})

	it('returns T for other special types', () => {
		testType.equal<IsNotNever<unknown, { selection: 'filter' }>, unknown>(true)
		testType.equal<IsNotNever<void, { selection: 'filter' }>, void>(true)
		testType.equal<IsNotNever<any, { selection: 'filter' }>, any>(true)
	})

	it('returns T for other types', () => {
		testType.equal<IsNotNever<undefined, { selection: 'filter' }>, undefined>(true)
		testType.equal<IsNotNever<null, { selection: 'filter' }>, null>(true)
		testType.equal<IsNotNever<number, { selection: 'filter' }>, number>(true)
		testType.equal<IsNotNever<boolean, { selection: 'filter' }>, boolean>(true)
		testType.equal<IsNotNever<true, { selection: 'filter' }>, true>(true)
		testType.equal<IsNotNever<false, { selection: 'filter' }>, false>(true)
		testType.equal<IsNotNever<string, { selection: 'filter' }>, string>(true)
		testType.equal<IsNotNever<'', { selection: 'filter' }>, ''>(true)
		testType.equal<IsNotNever<symbol, { selection: 'filter' }>, symbol>(true)
		testType.equal<IsNotNever<bigint, { selection: 'filter' }>, bigint>(true)
		testType.equal<IsNotNever<{}, { selection: 'filter' }>, {}>(true)
		testType.equal<IsNotNever<string[], { selection: 'filter' }>, string[]>(true)
		testType.equal<IsNotNever<[], { selection: 'filter' }>, []>(true)
		testType.equal<IsNotNever<Function, { selection: 'filter' }>, Function>(true)
		testType.equal<IsNotNever<() => void, { selection: 'filter' }>, () => void>(true)
	})

	it('returns T for union type', () => {
		testType.equal<IsNotNever<never | 1, { selection: 'filter' }>, 1>(true)
	})

	it('returns $Never for intersection type', () => {
		testType.equal<IsNotNever<never & { a: 1 }, { selection: 'filter' }>, $Never>(true)
	})
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsNotNever<any>, IsNotNever<any, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<unknown>, IsNotNever<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<never>, IsNotNever<never, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<void>, IsNotNever<void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<{}>, IsNotNever<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<object>, IsNotNever<object, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<undefined>, IsNotNever<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<null>, IsNotNever<null, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<{} | null | undefined>, IsNotNever<{} | null | undefined, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<IsNotNever<string>, IsNotNever<string, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<'a'>, IsNotNever<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<1>, IsNotNever<1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<{ a: 1 }>, IsNotNever<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<() => void>, IsNotNever<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<string[]>, IsNotNever<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<{} | 1>, IsNotNever<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<string | 1>, IsNotNever<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<object | undefined>, IsNotNever<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<void | 1>, IsNotNever<void | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<void | undefined>, IsNotNever<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<undefined | 1>, IsNotNever<undefined | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<void & { a: 1 }>, IsNotNever<void & { a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<never | 1>, IsNotNever<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsNotNever<unknown | 1>, IsNotNever<unknown | 1, { selection: 'predicate' }>>(true)
	})
})

describe('IsNotNever.$Fn', () => {
	it('is IsNotNever as a type function', () => {
		testType.equal<$Fn.Apply<IsNotNever.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotNever.$Fn, never>, false>(true)
	})
})
