import { describe, expect, test } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsRecord, type TuplePlus, testType } from '../index.js'

test('boolean, number, string, null, undefined, symbol are not record', () => {
	expect(false as IsRecord<undefined> satisfies false).toBe(false)
	expect(false as IsRecord<null> satisfies false).toBe(false)
	expect(false as IsRecord<boolean> satisfies false).toBe(false)
	expect(false as IsRecord<number> satisfies false).toBe(false)
	expect(false as IsRecord<string> satisfies false).toBe(false)
	expect(false as IsRecord<symbol> satisfies false).toBe(false)
})

test('array is not record', () => {
	expect(false as IsRecord<[]> satisfies false).toBe(false)
	expect(false as IsRecord<number[]> satisfies false).toBe(false)
})

test('object is record', () => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	expect(true as IsRecord<{}> satisfies true).toBe(true)
	// eslint-disable-next-line @typescript-eslint/ban-types
	expect(true as IsRecord<object> satisfies true).toBe(true)
	expect(true as IsRecord<{ a: string }> satisfies true).toBe(true)
	expect(true as IsRecord<Record<string, number>> satisfies true).toBe(true)
})

test('distributes over union', () => {
	testType.equal<IsRecord<{ a: 1 } | number[]>, boolean>(true)
	testType.equal<IsRecord<{ a: 1 } | { b: 1 }>, true>(true)
})

test('can override the branches', () => {
	testType.equal<IsRecord<{ a: 1 }, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<IsRecord<number[], { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	testType.equal<IsRecord<string, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

test('resolves `IsRecord.$Default` the same as no options', () => {
	// `IsRecord.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsRecord<{ a: 1 }, IsRecord.$Default>, IsRecord<{ a: 1 }>>(true)
	testType.equal<IsRecord<number[], IsRecord.$Default>, IsRecord<number[]>>(true)
	testType.equal<IsRecord<string, IsRecord.$Default>, IsRecord<string>>(true)
	testType.equal<IsRecord<{ a: 1 } | number[], IsRecord.$Default>, IsRecord<{ a: 1 } | number[]>>(true)
})

test('works as filter', () => {
	testType.equal<IsRecord<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsRecord<{ a: 1 } | number[], { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsRecord<number[], { selection: 'filter' }>, never>(true)
	testType.equal<IsRecord<string, { selection: 'filter' }>, never>(true)
})

test('works with unique branches', () => {
	testType.equal<IsRecord<{ a: 1 }, IsRecord.$Branch>, $Then>(true)
	testType.equal<IsRecord<string, IsRecord.$Branch>, $Else>(true)
})

describe('IsRecord.$Fn', () => {
	test('is IsRecord as a type function', () => {
		testType.equal<$Fn.Apply<IsRecord.$Fn, { a: 1 }>, true>(true)
		testType.equal<$Fn.Apply<IsRecord.$Fn, number[]>, false>(true)
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, number[]], IsRecord.$Fn>, [{ a: 1 }]>(true)
	})
	test('applies its options', () => {
		testType.equal<$Fn.Apply<IsRecord.$Fn<{ $then: 'yes'; $else: 'no' }>, number[]>, 'no'>(true)
	})
})
