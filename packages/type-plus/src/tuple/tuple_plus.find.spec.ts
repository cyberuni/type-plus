import { it } from 'vitest'
import { type $Fn, type IsObject, type TuplePlus, testType } from '../index.js'

// TODO: handle never and $never
// it('returns never if input is never', () => {
// 	testType.equal<TuplePlus.Find<never, number>, never>(true)
// })

// it('can override the never case', () => {
// 	testType.equal<TuplePlus.Find<never, 1, { $never: 2 }>, 2>(true)
// })

it('returns never for empty tuple', () => {
	testType.equal<TuplePlus.Find<[], number>, never>(true)
})

it('can override empty tuple case', () => {
	testType.equal<TuplePlus.Find<[], number, { $emptyTuple: 1 }>, 1>(true)
})

it('does not work with array type', () => {
	testType.equal<
		TuplePlus.Find<string[], number>,
		'does not support array. Please use `FindFirst` or `ArrayPlus.Find` instead.'
	>(true)
})

it('can override array case', () => {
	testType.equal<TuplePlus.Find<string[], number, { $array: 1 }>, 1>(true)
})

it('no match gets never', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x'], 2>, never>(true)
})

it('can override no_match case', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x'], 2, { $notMatch: 1 }>, 1>(true)
})

it('pick first type matching criteria', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], 1>, 1>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], 'x'>, 'x'>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], true>, true>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], false>, never>(true)
})

it('uses widen type to match literal types', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], number>, 1>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], string>, 'x'>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], boolean>, true>(true)
})

it('returns Criteria | undefined if T is a widen type of Criteria', () => {
	testType.equal<TuplePlus.Find<[number, 1, 2], 1>, 1 | undefined>(true)
	testType.equal<TuplePlus.Find<[string | number], 1>, 1 | undefined>(true)
	testType.equal<TuplePlus.Find<[{ a: number } | { b: number }], { a: 1 }>, { a: 1 } | undefined>(true)
})

it('can override widen case', () => {
	testType.equal<TuplePlus.Find<[number, string], 1, { $widen: 12 }>, 12>(true)
})

it('can disable widen', () => {
	testType.equal<TuplePlus.Find<[number], 1, { widen: false }>, never>(true)
})

it('returns Criteria if T is a union partially satisfies the Criteria', () => {
	testType.equal<TuplePlus.Find<[string | number], number>, number>(true)
})

it('can return T | undefined by overriding unionNotMach to `undefined`', () => {
	// adding `undefined` to the result better match the behavior in JavaScript,
	// as an array of `Array<string | number>` can contains only `string` or `number`.
	// so `Find<Array<string | number>, string>` returns `string | undefined`.
	testType.equal<TuplePlus.Find<[string | number], number, { $unionNotMatch: undefined }>, number | undefined>(true)
})

it('pick object', () => {
	type Actual = TuplePlus.Find<
		[{ name: 'a'; type: 1 }, { name: 'b'; type: 2 }, { name: 'c'; type: 3 }, { name: 'b'; type: 4 }],
		{ name: 'b' }
	>['type']
	testType.equal<Actual, 2>(true)
})

it('finds the first entry a type function returns true for', () => {
	testType.equal<TuplePlus.Find<[1, { a: 1 }, object], IsObject.$Fn>, { a: 1 }>(true)
	testType.equal<TuplePlus.Find<[1, { a: 1 }, object], IsObject.$Fn<{ exact: true }>>, object>(true)
	testType.equal<TuplePlus.Find<[{ a: 1 }, 1, 'x'], $Fn.Not<IsObject.$Fn>>, 1>(true)
	testType.equal<TuplePlus.Find<[1, 'x'], IsObject.$Fn>, never>(true)
})

it('does not widen with a type function', () => {
	testType.equal<TuplePlus.Find<[number], $Fn.Not<IsObject.$Fn>>, number>(true)
})

it('matches the union members of an entry against a type function', () => {
	testType.equal<TuplePlus.Find<[true, number | { a: 1 }], IsObject.$Fn>, { a: 1 }>(true)
	testType.equal<
		TuplePlus.Find<[true, number | { a: 1 }], IsObject.$Fn, { $unionNotMatch: undefined }>,
		{ a: 1 } | undefined
	>(true)
})
