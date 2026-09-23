import { it } from 'vitest'
import { type $Fn, type ArrayPlus, type Equal, type FindLast, type IsObject, testType } from '../index.js'

it('returns T | undefined for T[] if T satisfies Criteria', () => {
	testType.equal<FindLast<string[], number>, never>(true)
	testType.equal<FindLast<number[], number>, number | undefined>(true)
	testType.equal<FindLast<Array<1 | 2 | 'x'>, number>, 1 | 2 | undefined>(true)
})

it('pick last type matching criteria', () => {
	type Actual = FindLast<[true, 1, 'x', 3], number>
	testType.equal<Actual, 3>(true)
})

it('no match gets never', () => {
	type Actual = FindLast<[true, 1, 'x'], 2>
	testType.equal<Actual, never>(true)
})

it('pick object', () => {
	testType.equal<
		FindLast<
			[{ name: 'a'; type: 1 }, { name: 'b'; type: 2 }, { name: 'c'; type: 3 }, { name: 'b'; type: 4 }],
			{ name: 'b' }
		>,
		{ name: 'b'; type: 4 }
	>(true)
})

it('is available as ArrayPlus.FindLast', () => {
	testType.equal<ArrayPlus.FindLast<[true, 1, 'x', 3], number>, 3>(true)
})

it('supports readonly array', () => {
	testType.equal<
		FindLast<
			readonly [{ name: 'a'; type: 1 }, { name: 'b'; type: 2 }, { name: 'c'; type: 3 }, { name: 'b'; type: 4 }],
			{ name: 'b' }
		>,
		{ name: 'b'; type: 4 }
	>(true)
})

it('finds the last entry a type function returns true for', () => {
	testType.equal<FindLast<[1, 'x', { a: 1 }, 2], IsObject.$Fn>, { a: 1 }>(true)
	testType.equal<FindLast<[{ a: 1 }, object, 1], IsObject.$Fn>, object>(true)
	testType.equal<FindLast<[{ a: 1 }, object, 1], IsObject.$Fn<{ exact: true }>>, object>(true)
	testType.equal<FindLast<[1, { a: 1 }, 'x'], $Fn.Not<IsObject.$Fn>>, 'x'>(true)
	testType.equal<FindLast<[1, 'x'], IsObject.$Fn>, never>(true)
	testType.equal<FindLast<[], IsObject.$Fn>, never>(true)
})

it('matches the union members of an entry against a type function', () => {
	testType.equal<FindLast<[{ a: 1 }, number | { b: 1 }], IsObject.$Fn>, { b: 1 }>(true)
	testType.equal<FindLast<[{ a: 1 }, number | string], IsObject.$Fn>, { a: 1 }>(true)
})

it('returns the matching element types | undefined for an array with a type function', () => {
	testType.equal<FindLast<Array<{ a: 1 }>, IsObject.$Fn>, { a: 1 } | undefined>(true)
	testType.equal<FindLast<Array<1 | { a: 1 }>, IsObject.$Fn>, { a: 1 } | undefined>(true)
	testType.equal<FindLast<readonly (1 | { a: 1 })[], IsObject.$Fn>, { a: 1 } | undefined>(true)
	testType.equal<FindLast<string[], IsObject.$Fn>, never>(true)
})

it('matches exactly with Equal.$Fn (strict mode)', () => {
	testType.equal<FindLast<[1, number, 2], number>, 2>(true)
	testType.equal<FindLast<[1, number, 2], Equal.$Fn<number>>, number>(true)
	testType.equal<FindLast<[1, number, 2], Equal.$Fn<1>>, 1>(true)
	testType.equal<FindLast<[1, 2, 3], Equal.$Fn<number>>, never>(true)
	testType.equal<FindLast<Array<number>, Equal.$Fn<1>>, never>(true)
})
