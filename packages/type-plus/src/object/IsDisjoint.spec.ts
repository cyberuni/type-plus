import { describe, test } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsDisjoint, type TuplePlus, testType } from '../index.js'

test('disjoint returns true', () => {
	type A = { a: 1 }
	type B = { b: 1 }
	testType.true<IsDisjoint<A, B>>(true)
})

test('same type returns false', () => {
	type A = { a: 1 }
	type B = { a: 1 }
	testType.false<IsDisjoint<A, B>>(true)
})

test('A subset of B returns false', () => {
	type A = { a: 1 }
	type B = { a: 1; b: 1 }
	testType.false<IsDisjoint<A, B>>(true)
})

test('B subset of A returns false', () => {
	type A = { a: 1; b: 1 }
	type B = { a: 1 }
	testType.false<IsDisjoint<A, B>>(true)
})

test('literal records', () => {
	testType.true<IsDisjoint<{ a: 1 }, { b: 1 }>>(true)
	testType.false<IsDisjoint<{ a: 1 }, { a: 2; b: 1 }>>(true)
})

test('partial overlap on both sides returns false', () => {
	testType.false<IsDisjoint<{ a: 1; c: 1 }, { a: 1; b: 1 }>>(true)
})

test('an empty record is disjoint from any record', () => {
	testType.true<IsDisjoint<{ a: 1 }, {}>>(true)
	testType.true<IsDisjoint<{}, { a: 1 }>>(true)
	testType.true<IsDisjoint<{}, {}>>(true)
})

test('index signature shares every key of its key type', () => {
	testType.false<IsDisjoint<Record<string, 1>, { a: 1 }>>(true)
	testType.true<IsDisjoint<Record<symbol, 1>, { a: 1 }>>(true)
})

test('can override the branches', () => {
	testType.equal<IsDisjoint<{ a: 1 }, { b: 1 }, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<IsDisjoint<{ a: 1 }, { a: 1 }, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

test('resolves `IsDisjoint.$Default` the same as no options', () => {
	// `IsDisjoint.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsDisjoint<{ a: 1 }, { b: 1 }, IsDisjoint.$Default>, IsDisjoint<{ a: 1 }, { b: 1 }>>(true)
	testType.equal<IsDisjoint<{ a: 1 }, { a: 1 }, IsDisjoint.$Default>, IsDisjoint<{ a: 1 }, { a: 1 }>>(true)
	testType.equal<IsDisjoint<{ a: 1 }, {}, IsDisjoint.$Default>, IsDisjoint<{ a: 1 }, {}>>(true)
})

test('works as filter', () => {
	testType.equal<IsDisjoint<{ a: 1 }, { b: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsDisjoint<{ a: 1 }, { a: 1 }, { selection: 'filter' }>, never>(true)
})

test('works with unique branches', () => {
	testType.equal<IsDisjoint<{ a: 1 }, { b: 1 }, IsDisjoint.$Branch>, $Then>(true)
	testType.equal<IsDisjoint<{ a: 1 }, { a: 1 }, IsDisjoint.$Branch>, $Else>(true)
})

describe('IsDisjoint.$Fn', () => {
	test('is IsDisjoint with its fixed input applied', () => {
		testType.equal<$Fn.Apply<IsDisjoint.$Fn<{ a: 1 }>, { b: 1 }>, true>(true)
		testType.equal<$Fn.Apply<IsDisjoint.$Fn<{ a: 1 }>, { a: 2 }>, false>(true)
		testType.equal<TuplePlus.Filter<[{ a: 1 }, { b: 1 }], IsDisjoint.$Fn<{ a: 1 }>>, [{ b: 1 }]>(true)
	})
	test('resolves a non-record input to the else branch', () => {
		testType.equal<$Fn.Apply<IsDisjoint.$Fn<{ a: 1 }>, 1>, false>(true)
		testType.equal<$Fn.Apply<IsDisjoint.$Fn<{ a: 1 }, { $else: 'no' }>, 1>, 'no'>(true)
	})
})
