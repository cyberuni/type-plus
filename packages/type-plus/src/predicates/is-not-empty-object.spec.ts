import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotEmptyObject, type TuplePlus, testType } from '../index.js'

/* eslint-disable @typescript-eslint/ban-types */

it('returns false for the empty object type', () => {
	testType.false<IsNotEmptyObject<{}>>(true)
	testType.false<IsNotEmptyObject<object>>(true)
	testType.false<IsNotEmptyObject<Record<string, never>>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotEmptyObject<{ a: 1 }>>(true)
	testType.true<IsNotEmptyObject<number>>(true)
	testType.true<IsNotEmptyObject<null>>(true)
	testType.true<IsNotEmptyObject<undefined>>(true)
})

it('returns never for never', () => {
	testType.never<IsNotEmptyObject<never>>(true)
})

it('distributes over union', () => {
	testType.equal<IsNotEmptyObject<{} | { a: 1 }>, boolean>(true)
})

it('can override the branches', () => {
	testType.equal<IsNotEmptyObject<{ a: 1 }, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<IsNotEmptyObject<{}, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('resolves `IsNotEmptyObject.$Default` the same as no options', () => {
	// `IsNotEmptyObject.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotEmptyObject<{}, IsNotEmptyObject.$Default>, IsNotEmptyObject<{}>>(true)
	testType.equal<IsNotEmptyObject<{ a: 1 }, IsNotEmptyObject.$Default>, IsNotEmptyObject<{ a: 1 }>>(true)
	testType.equal<IsNotEmptyObject<never, IsNotEmptyObject.$Default>, IsNotEmptyObject<never>>(true)
	testType.equal<IsNotEmptyObject<{} | 1, IsNotEmptyObject.$Default>, IsNotEmptyObject<{} | 1>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotEmptyObject<{} | { a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsNotEmptyObject<{}, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotEmptyObject<{ a: 1 }, IsNotEmptyObject.$Branch>, $Then>(true)
	testType.equal<IsNotEmptyObject<{}, IsNotEmptyObject.$Branch>, $Else>(true)
})

describe('IsNotEmptyObject.$Fn', () => {
	it('is IsNotEmptyObject as a type function', () => {
		testType.equal<$Fn.Apply<IsNotEmptyObject.$Fn, { a: 1 }>, true>(true)
		testType.equal<$Fn.Apply<IsNotEmptyObject.$Fn, {}>, false>(true)
		testType.equal<TuplePlus.Filter<[{}, { a: 1 }, 1], IsNotEmptyObject.$Fn>, [{ a: 1 }, 1]>(true)
	})
	it('applies its options', () => {
		testType.equal<$Fn.Apply<IsNotEmptyObject.$Fn<{ $then: 'yes'; $else: 'no' }>, {}>, 'no'>(true)
	})
})
