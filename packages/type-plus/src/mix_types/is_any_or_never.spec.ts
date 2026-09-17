import { it } from 'vitest'

import { type $Else, type $Selection, type $Then, type IsAnyOrNever, testType } from '../index.js'

it('returns true for any', () => {
	testType.equal<IsAnyOrNever<any>, true>(true)
})

it('returns true for never', () => {
	testType.equal<IsAnyOrNever<never>, true>(true)
})

it('returns false for other special types', () => {
	testType.equal<IsAnyOrNever<unknown>, false>(true)
	testType.equal<IsAnyOrNever<void>, false>(true)
})

it('returns never for other types', () => {
	testType.equal<IsAnyOrNever<undefined>, false>(true)
	testType.equal<IsAnyOrNever<null>, false>(true)
	testType.equal<IsAnyOrNever<boolean>, false>(true)
	testType.equal<IsAnyOrNever<true>, false>(true)
	testType.equal<IsAnyOrNever<false>, false>(true)
	testType.equal<IsAnyOrNever<number>, false>(true)
	testType.equal<IsAnyOrNever<1>, false>(true)
	testType.equal<IsAnyOrNever<string>, false>(true)
	testType.equal<IsAnyOrNever<''>, false>(true)
	testType.equal<IsAnyOrNever<symbol>, false>(true)
	testType.equal<IsAnyOrNever<bigint>, false>(true)
	testType.equal<IsAnyOrNever<1n>, false>(true)
	testType.equal<IsAnyOrNever<{}>, false>(true)
	testType.equal<IsAnyOrNever<{ a: 1 }>, false>(true)
	testType.equal<IsAnyOrNever<string[]>, false>(true)
	testType.equal<IsAnyOrNever<[]>, false>(true)
	testType.equal<IsAnyOrNever<Function>, false>(true)
	testType.equal<IsAnyOrNever<() => void>, false>(true)
})

it('returns true for `any | 1` because that is resolved to `any` by TypeScript', () => {
	testType.equal<any | 1, any>(true)
	testType.equal<IsAnyOrNever<any | 1>, true>(true)
})

it('returns false for `never | 1` because that is resolved to `1` by TypeScript', () => {
	testType.equal<never | 1, 1>(true)
	testType.equal<IsAnyOrNever<never | 1>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<any & 1, any>(true)
	testType.equal<IsAnyOrNever<any & 1>, true>(true)

	testType.equal<never & 1, never>(true)
	testType.equal<IsAnyOrNever<never & 1>, true>(true)
})

it('can override Then/Else', () => {
	testType.equal<IsAnyOrNever<any, $Selection.Predicate>, true>(true)
	testType.equal<IsAnyOrNever<never, $Selection.Predicate>, true>(true)

	testType.equal<IsAnyOrNever<0, $Selection.Predicate>, false>(true)
	testType.equal<IsAnyOrNever<unknown, $Selection.Predicate>, false>(true)
	testType.equal<IsAnyOrNever<void, $Selection.Predicate>, false>(true)
})

it('returns $Then or $Else with IsAnyOrNever.$Branch', () => {
	testType.equal<IsAnyOrNever<never, IsAnyOrNever.$Branch>, $Then>(true)
	testType.equal<IsAnyOrNever<'a', IsAnyOrNever.$Branch>, $Else>(true)
})

it('defaults to the predicate form', () => {
	testType.equal<IsAnyOrNever<any>, IsAnyOrNever<any, $Selection.Predicate>>(true)
	testType.equal<IsAnyOrNever<never>, IsAnyOrNever<never, $Selection.Predicate>>(true)
	testType.equal<IsAnyOrNever<1>, IsAnyOrNever<1, $Selection.Predicate>>(true)
})

it('supports the filter selection', () => {
	testType.equal<IsAnyOrNever<any, { selection: 'filter' }>, any>(true)
	testType.equal<IsAnyOrNever<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsAnyOrNever<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsAnyOrNever<unknown, { selection: 'filter' }>, never>(true)
})

it('resolves `IsAnyOrNever.$Default` the same as no options', () => {
	// `IsAnyOrNever.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsAnyOrNever<any, IsAnyOrNever.$Default>, IsAnyOrNever<any>>(true)
	testType.equal<IsAnyOrNever<never, IsAnyOrNever.$Default>, IsAnyOrNever<never>>(true)
	testType.equal<IsAnyOrNever<1, IsAnyOrNever.$Default>, IsAnyOrNever<1>>(true)
})
