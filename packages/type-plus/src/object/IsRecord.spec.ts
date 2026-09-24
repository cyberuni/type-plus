import { describe, test } from 'vitest'

import { type $Else, type $Fn, type $Then, assertType, type IsRecord, type TuplePlus, testType } from '../index.js'

test('boolean, number, string, null, undefined, symbol are not record', () => {
	assertType.isFalse(false as IsRecord<undefined>)
	assertType.isFalse(false as IsRecord<null>)
	assertType.isFalse(false as IsRecord<boolean>)
	assertType.isFalse(false as IsRecord<number>)
	assertType.isFalse(false as IsRecord<string>)
	assertType.isFalse(false as IsRecord<symbol>)
})

test('array is not record', () => {
	assertType.isFalse(false as IsRecord<[]>)
	assertType.isFalse(false as IsRecord<number[]>)
})

test('object is record', () => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	assertType.isTrue(true as IsRecord<{}>)
	// eslint-disable-next-line @typescript-eslint/ban-types
	assertType.isTrue(true as IsRecord<object>)
	assertType.isTrue(true as IsRecord<{ a: string }>)
	assertType.isTrue(true as IsRecord<Record<string, number>>)
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
