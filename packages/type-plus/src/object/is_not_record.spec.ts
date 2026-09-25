import { describe, test } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsNotRecord, type TuplePlus, testType } from '../index.js'

test('boolean, number, string, null, undefined, symbol are not record', () => {
	testType.true<IsNotRecord<undefined>>(true)
	testType.true<IsNotRecord<null>>(true)
	testType.true<IsNotRecord<boolean>>(true)
	testType.true<IsNotRecord<number>>(true)
	testType.true<IsNotRecord<string>>(true)
	testType.true<IsNotRecord<symbol>>(true)
})

test('array is not record', () => {
	testType.true<IsNotRecord<[]>>(true)
	testType.true<IsNotRecord<number[]>>(true)
})

test('object is record', () => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	testType.false<IsNotRecord<{}>>(true)
	testType.false<IsNotRecord<object>>(true)
	testType.false<IsNotRecord<{ a: string }>>(true)
	testType.false<IsNotRecord<Record<string, number>>>(true)
})

test('distributes over union', () => {
	testType.equal<IsNotRecord<{ a: 1 } | number[]>, boolean>(true)
	testType.equal<IsNotRecord<{ a: 1 } | { b: 1 }>, false>(true)
})

test('can override the branches', () => {
	testType.equal<IsNotRecord<{ a: 1 }, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	testType.equal<IsNotRecord<number[], { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<IsNotRecord<string, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
})

test('resolves `IsNotRecord.$Default` the same as no options', () => {
	// `IsNotRecord.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotRecord<{ a: 1 }, IsNotRecord.$Default>, IsNotRecord<{ a: 1 }>>(true)
	testType.equal<IsNotRecord<number[], IsNotRecord.$Default>, IsNotRecord<number[]>>(true)
	testType.equal<IsNotRecord<string, IsNotRecord.$Default>, IsNotRecord<string>>(true)
	testType.equal<IsNotRecord<{ a: 1 } | number[], IsNotRecord.$Default>, IsNotRecord<{ a: 1 } | number[]>>(true)
})

test('works as filter', () => {
	testType.equal<IsNotRecord<{ a: 1 } | number[], { selection: 'filter' }>, number[]>(true)
	testType.equal<IsNotRecord<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotRecord<{ a: 1 }, { selection: 'filter' }>, never>(true)
})

test('works with unique branches', () => {
	testType.equal<IsNotRecord<string, IsNotRecord.$Branch>, $Then>(true)
	testType.equal<IsNotRecord<{ a: 1 }, IsNotRecord.$Branch>, $Else>(true)
})

describe('IsNotRecord.$Fn', () => {
	test('is IsNotRecord as a type function', () => {
		testType.equal<$Fn.Apply<IsNotRecord.$Fn, number[]>, true>(true)
		testType.equal<$Fn.Apply<IsNotRecord.$Fn, { a: 1 }>, false>(true)
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, number[]], IsNotRecord.$Fn>, [1, number[]]>(true)
	})
	test('applies its options', () => {
		testType.equal<$Fn.Apply<IsNotRecord.$Fn<{ $then: 'yes'; $else: 'no' }>, { a: 1 }>, 'no'>(true)
	})
})
