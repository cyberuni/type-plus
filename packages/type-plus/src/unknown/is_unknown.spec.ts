import { describe, it } from 'vitest'

import {
	type $Any,
	type $BranchOptions,
	type $Else,
	type $Fn,
	type $Never,
	type $Selection,
	type $Then,
	type IsUnknown,
	testType,
} from '../index.js'

// alternative implementation
// export type IsUnknown<
// 	T,
// 	$O extends IsUnknown.$Options = {}
// > =
// 	0 extends 1 & T
// 	? $ResolveBranch<$O, [$Any, $Else]>
// 	: (
// 		[T, never] extends [never, T]
// 		? $ResolveBranch<$O, [$Never, $Else]>
// 		: (
// 			[T, unknown] extends [unknown, T]
// 			? $ResolveBranch<$O, [$Then], T>
// 			: $ResolveBranch<$O, [$Else]>
// 		)
// 	)

it('returns true for unknown', () => {
	testType.true<IsUnknown<unknown>>(true)
})

it('returns false for other special types', () => {
	testType.false<IsUnknown<any>>(true)
	testType.false<IsUnknown<void>>(true)
	testType.false<IsUnknown<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsUnknown<null>>(true)
	testType.false<IsUnknown<number>>(true)
	testType.false<IsUnknown<boolean>>(true)
	testType.false<IsUnknown<true>>(true)
	testType.false<IsUnknown<false>>(true)
	testType.false<IsUnknown<string>>(true)
	testType.false<IsUnknown<''>>(true)
	testType.false<IsUnknown<symbol>>(true)
	testType.false<IsUnknown<bigint>>(true)
	testType.false<IsUnknown<{}>>(true)
	testType.false<IsUnknown<string[]>>(true)
	testType.false<IsUnknown<[]>>(true)
	testType.false<IsUnknown<Function>>(true)
	testType.false<IsUnknown<() => void>>(true)
})

it('returns true for union type as unknown | <others> => unknown', () => {
	testType.equal<unknown | 1, unknown>(true)
	testType.true<IsUnknown<unknown | 1>>(true)
})

it('returns false as unknown & any => any', () => {
	testType.equal<unknown & any, any>(true)
	testType.false<IsUnknown<unknown & any>>(true)
})

it('returns true as unknown & void => void', () => {
	testType.equal<unknown & void, void>(true)
	testType.false<IsUnknown<unknown & void>>(true)
})

it('returns false as unknown & never => never', () => {
	testType.equal<unknown & never, never>(true)
	testType.false<IsUnknown<unknown & never>>(true)
})

it('returns false for intersection type', () => {
	testType.equal<unknown & { a: 1 }, { a: 1 }>(true)
	testType.false<IsUnknown<unknown & { a: 1 }>>(true)
})

it('returns false as unknown & <others> => <other>', () => {
	testType.false<IsUnknown<unknown & null>>(true)
	testType.false<IsUnknown<unknown & number>>(true)
	testType.false<IsUnknown<unknown & 1>>(true)
	testType.false<IsUnknown<unknown & boolean>>(true)
	testType.false<IsUnknown<unknown & true>>(true)
	testType.false<IsUnknown<unknown & false>>(true)
	testType.false<IsUnknown<unknown & string>>(true)
	testType.false<IsUnknown<unknown & ''>>(true)
	testType.false<IsUnknown<unknown & symbol>>(true)
	testType.false<IsUnknown<unknown & bigint>>(true)
	testType.false<IsUnknown<unknown & 1n>>(true)
	testType.false<IsUnknown<unknown & {}>>(true)
	testType.false<IsUnknown<unknown & { a: 1 }>>(true)
	testType.false<IsUnknown<unknown & string[]>>(true)
	testType.false<IsUnknown<unknown & []>>(true)
	testType.false<IsUnknown<unknown & Function>>(true)
	testType.false<IsUnknown<unknown & (() => void)>>(true)
})

it('works as filter', () => {
	testType.equal<IsUnknown<unknown, { selection: 'filter' }>, unknown>(true)

	testType.equal<IsUnknown<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnknown<undefined, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnknown<string | boolean, { selection: 'filter' }>, never>(true)

	testType.equal<IsUnknown<string | unknown, { selection: 'filter' }>, unknown>(true)
})

it('works with unique branches', () => {
	testType.equal<IsUnknown<unknown, $BranchOptions<$Then>>, $Then>(true)
	testType.equal<IsUnknown<number, $BranchOptions<$Then | $Else>>, $Else>(true)

	testType.equal<IsUnknown<any, $BranchOptions<$Else>>, $Else>(true)
	testType.equal<IsUnknown<any, $BranchOptions<$Any>>, $Any>(true)
	testType.equal<IsUnknown<any, $BranchOptions<$Any | $Else>>, $Any>(true)

	testType.equal<IsUnknown<never, $BranchOptions<$Else>>, $Else>(true)
	testType.equal<IsUnknown<never, $BranchOptions<$Never>>, $Never>(true)
	testType.equal<IsUnknown<never, $BranchOptions<$Never | $Else>>, $Never>(true)

	testType.equal<IsUnknown<void, $Selection.Branch>, $Else>(true)
})

it('can override $never branch', () => {
	testType.equal<IsUnknown<never>, false>(true)
	testType.equal<IsUnknown<never, { $never: unknown }>, unknown>(true)
})

it('can override $any branch', () => {
	testType.equal<IsUnknown<any>, false>(true)
	testType.equal<IsUnknown<any, { $any: unknown }>, unknown>(true)
})

it('can override $void branch', () => {
	testType.equal<IsUnknown<void>, false>(true)
	testType.equal<IsUnknown<void, { $void: unknown }>, unknown>(true)
	testType.equal<IsUnknown<void, { $void: 123 }>, 123>(true)
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsUnknown<any>, IsUnknown<any, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<unknown>, IsUnknown<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<never>, IsUnknown<never, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<void>, IsUnknown<void, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<{}>, IsUnknown<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<object>, IsUnknown<object, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<undefined>, IsUnknown<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<null>, IsUnknown<null, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<{} | null | undefined>, IsUnknown<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<string>, IsUnknown<string, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<'a'>, IsUnknown<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<1>, IsUnknown<1, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<{ a: 1 }>, IsUnknown<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<() => void>, IsUnknown<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<string[]>, IsUnknown<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<{} | 1>, IsUnknown<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<string | 1>, IsUnknown<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<object | undefined>, IsUnknown<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<void | undefined>, IsUnknown<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<never | 1>, IsUnknown<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsUnknown<unknown | 1>, IsUnknown<unknown | 1, { selection: 'predicate' }>>(true)
	})
})

describe('IsUnknown.$Fn', () => {
	it('is IsUnknown as a type function', () => {
		testType.equal<$Fn.Apply<IsUnknown.$Fn, unknown>, true>(true)
		testType.equal<$Fn.Apply<IsUnknown.$Fn, 1>, false>(true)
	})
})
