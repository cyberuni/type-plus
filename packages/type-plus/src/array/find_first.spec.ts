import { describe, it } from 'vitest'

import { type FindFirst, testType } from '../index.js'

describe('For Array', () => {
	it('returns never if the type in the array does not satisfy the criteria', () => {
		testType.equal<FindFirst<string[], number>, never>(true)
	})

	it('returns T if T satisfies the Criteria', () => {
		testType.equal<FindFirst<number[], number>, number>(true)
		testType.equal<FindFirst<Array<string | number>, number | string>, string | number>(true)
	})

	it('returns Criteria | undefined if T is a widen type of Criteria', () => {
		testType.equal<FindFirst<number[], 1>, 1 | undefined>(true)
		testType.equal<FindFirst<Array<string | number>, 1>, 1 | undefined>(true)
		testType.equal<FindFirst<Array<{ a: number } | { b: number }>, { a: 1 }>, { a: 1 } | undefined>(true)
	})

	it('can override widen case', () => {
		testType.equal<FindFirst<number[], 1, { $widen: never }>, never>(true)
	})

	it('returns Criteria if T is a union partially satisfies the Criteria', () => {
		testType.equal<FindFirst<Array<string | number>, number>, number>(true)
		testType.equal<FindFirst<Array<1 | 2 | 'x'>, number>, 1 | 2>(true)
	})

	it('can override unionNotMach to `undefined`', () => {
		// adding `undefined` to the result better match the behavior in JavaScript,
		// as an array of `Array<string | number>` can contains only `string` or `number`.
		// so `Find<Array<string | number>, string>` returns `string | undefined`.
		testType.equal<FindFirst<Array<string | number>, number, { $unionNotMatch: undefined }>, number | undefined>(true)
		testType.equal<FindFirst<Array<1 | 2 | 'x'>, number, { $unionNotMatch: undefined }>, 1 | 2 | undefined>(true)
	})
	it('support readonly array', () => {
		testType.equal<FindFirst<Readonly<Array<string | number>>, number>, number>(true)
	})
})

describe('for Tuple', () => {
	it('returns never for empty tuple', () => {
		testType.equal<FindFirst<[], number>, never>(true)
	})

	it('can override empty tuple case', () => {
		testType.equal<FindFirst<[], number, { $emptyTuple: 1 }>, 1>(true)
	})

	it('pick first type matching criteria', () => {
		testType.equal<FindFirst<[true, 1, 'x', 3], 1>, 1>(true)
		testType.equal<FindFirst<[true, 1, 'x', 3], 'x'>, 'x'>(true)
		testType.equal<FindFirst<[true, 1, 'x', 3], true>, true>(true)
	})

	it('uses widen type to match literal types', () => {
		testType.equal<FindFirst<[true, 1, 'x', 3], number>, 1>(true)
		testType.equal<FindFirst<[true, 1, 'x', 3], string>, 'x'>(true)
		testType.equal<FindFirst<[true, 1, 'x', 3], boolean>, true>(true)
	})

	it('returns Criteria | undefined if the matching entry is a widen type of Criteria', () => {
		testType.equal<FindFirst<[string, number, 1], 1>, 1 | undefined>(true)
	})

	it('returns Criteria if the matching entry is a union partially satisfies the Criteria', () => {
		testType.equal<FindFirst<[true, number | string], string>, string>(true)
	})

	it('no match gets never', () => {
		type Actual = FindFirst<[true, 1, 'x'], 2>
		testType.equal<Actual, never>(true)
	})

	it('pick object', () => {
		type Actual = FindFirst<
			[{ name: 'a'; type: 1 }, { name: 'b'; type: 2 }, { name: 'c'; type: 3 }, { name: 'b'; type: 4 }],
			{ name: 'b' }
		>['type']
		testType.equal<Actual, 2>(true)
	})

	it('support readonly array', () => {
		testType.equal<FindFirst<readonly [true, 1, 'x', 3], number>, 1>(true)
	})
})
