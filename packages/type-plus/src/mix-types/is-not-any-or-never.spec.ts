import { describe, it } from 'vitest'

import {
	type $Else,
	type $Fn,
	type $Selection,
	type $Then,
	type IsAnyOrNever,
	type IsNotAnyOrNever,
	testType,
} from '../index.js'

it('returns false for any', () => {
	testType.equal<IsNotAnyOrNever<any>, false>(true)
})

it('returns false for never', () => {
	testType.equal<IsNotAnyOrNever<never>, false>(true)
})

it('returns true for other special types', () => {
	testType.equal<IsNotAnyOrNever<unknown>, true>(true)
	testType.equal<IsNotAnyOrNever<void>, true>(true)
})

it('returns true for other types', () => {
	testType.equal<IsNotAnyOrNever<undefined>, true>(true)
	testType.equal<IsNotAnyOrNever<null>, true>(true)
	testType.equal<IsNotAnyOrNever<boolean>, true>(true)
	testType.equal<IsNotAnyOrNever<true>, true>(true)
	testType.equal<IsNotAnyOrNever<false>, true>(true)
	testType.equal<IsNotAnyOrNever<number>, true>(true)
	testType.equal<IsNotAnyOrNever<1>, true>(true)
	testType.equal<IsNotAnyOrNever<string>, true>(true)
	testType.equal<IsNotAnyOrNever<''>, true>(true)
	testType.equal<IsNotAnyOrNever<symbol>, true>(true)
	testType.equal<IsNotAnyOrNever<bigint>, true>(true)
	testType.equal<IsNotAnyOrNever<1n>, true>(true)
	testType.equal<IsNotAnyOrNever<{}>, true>(true)
	testType.equal<IsNotAnyOrNever<{ a: 1 }>, true>(true)
	testType.equal<IsNotAnyOrNever<string[]>, true>(true)
	testType.equal<IsNotAnyOrNever<[]>, true>(true)
	testType.equal<IsNotAnyOrNever<Function>, true>(true)
	testType.equal<IsNotAnyOrNever<() => void>, true>(true)
})

it('returns false for `any | 1` because that is resolved to `any` by TypeScript', () => {
	testType.equal<IsNotAnyOrNever<any | 1>, false>(true)
})

it('returns true for `never | 1` because that is resolved to `1` by TypeScript', () => {
	testType.equal<IsNotAnyOrNever<never | 1>, true>(true)
})

it('returns false for intersection types that resolve to any or never', () => {
	testType.equal<IsNotAnyOrNever<any & 1>, false>(true)
	testType.equal<IsNotAnyOrNever<never & 1>, false>(true)
})

it('is the negation of IsAnyOrNever', () => {
	testType.equal<$Fn.Apply<IsNotAnyOrNever.$Fn, any>, $Fn.Apply<$Fn.Not<IsAnyOrNever.$Fn>, any>>(true)
	testType.equal<$Fn.Apply<IsNotAnyOrNever.$Fn, never>, $Fn.Apply<$Fn.Not<IsAnyOrNever.$Fn>, never>>(true)
	testType.equal<$Fn.Apply<IsNotAnyOrNever.$Fn, 1>, $Fn.Apply<$Fn.Not<IsAnyOrNever.$Fn>, 1>>(true)
	testType.equal<$Fn.Apply<IsNotAnyOrNever.$Fn, unknown>, $Fn.Apply<$Fn.Not<IsAnyOrNever.$Fn>, unknown>>(true)
})

it('returns $Then or $Else with IsNotAnyOrNever.$Branch', () => {
	testType.equal<IsNotAnyOrNever<never, IsNotAnyOrNever.$Branch>, $Else>(true)
	testType.equal<IsNotAnyOrNever<any, IsNotAnyOrNever.$Branch>, $Else>(true)
	testType.equal<IsNotAnyOrNever<'a', IsNotAnyOrNever.$Branch>, $Then>(true)
})

it('defaults to the predicate form', () => {
	testType.equal<IsNotAnyOrNever<any>, IsNotAnyOrNever<any, $Selection.Predicate>>(true)
	testType.equal<IsNotAnyOrNever<never>, IsNotAnyOrNever<never, $Selection.Predicate>>(true)
	testType.equal<IsNotAnyOrNever<1>, IsNotAnyOrNever<1, $Selection.Predicate>>(true)
})

it('supports the filter selection', () => {
	testType.equal<IsNotAnyOrNever<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotAnyOrNever<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotAnyOrNever<any, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotAnyOrNever<never, { selection: 'filter' }>, never>(true)
})

it('supports partial customization', () => {
	testType.equal<IsNotAnyOrNever<1, { $then: 1 }>, 1>(true)
	testType.equal<IsNotAnyOrNever<never, { $else: 2 }>, 2>(true)
	testType.equal<IsNotAnyOrNever<any, { $else: 2 }>, 2>(true)
})

it('resolves `IsNotAnyOrNever.$Default` the same as no options', () => {
	// `IsNotAnyOrNever.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotAnyOrNever<any, IsNotAnyOrNever.$Default>, IsNotAnyOrNever<any>>(true)
	testType.equal<IsNotAnyOrNever<never, IsNotAnyOrNever.$Default>, IsNotAnyOrNever<never>>(true)
	testType.equal<IsNotAnyOrNever<1, IsNotAnyOrNever.$Default>, IsNotAnyOrNever<1>>(true)
})

describe('IsNotAnyOrNever.$Fn', () => {
	it('is IsNotAnyOrNever as a type function', () => {
		testType.equal<$Fn.Apply<IsNotAnyOrNever.$Fn, 1>, true>(true)
		testType.equal<$Fn.Apply<IsNotAnyOrNever.$Fn, never>, false>(true)
	})
})
