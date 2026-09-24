import { describe, it } from 'vitest'

import { type Filter, type IsObject, testType } from '../index.js'

describe('Filter<A, C>', () => {
	describe('A is array', () => {
		it('returns A when criteria matches the type of the entries', () => {
			testType.equal<Filter<string[], string>, string[]>(true)
		})

		it('returns never[] when criteria does not match the type of the entries', () => {
			testType.equal<Filter<string[], number>, never[]>(true)
		})

		it('removes unmatched type form array', () => {
			testType.equal<Filter<Array<string | number>, string>, string[]>(true)
		})

		it('removes unmatched undefined and null as expected', () => {
			testType.equal<Filter<Array<string | undefined | null>, string>, string[]>(true)
		})

		it('can filter with undefined and null', () => {
			// Array<undefined | null> is destructured to undefined[] | null[] by TypeScript
			testType.equal<Filter<Array<string | undefined | null>, undefined | null>, undefined[] | null[]>(true)
		})

		it('applies a type function to the element types', () => {
			testType.equal<Filter<Array<1 | { a: 1 }>, IsObject.$Fn>, Array<{ a: 1 }>>(true)
			testType.equal<Filter<Array<1 | 2>, IsObject.$Fn>, never[]>(true)
		})

		it('work with never[]', () => {
			testType.equal<Filter<never[], undefined>, never[]>(true)
		})
	})

	describe('A is Tuple', () => {
		it('matching criteria', () => {
			testType.equal<Filter<[1, 2, 3, 4], 2 | 4>, [2, 4]>(true)
			testType.equal<Filter<[1, 2, '3'], number>, [1, 2]>(true)
		})

		it('no match gets []', () => {
			type Actual = Filter<[1, 2, 3, 4], 5>
			testType.equal<[], Actual>(true)
		})

		it('empty tuple gets empty tuple', () => {
			testType.equal<Filter<[], number>, []>(true)
		})

		it('matching undefined and null', () => {
			testType.equal<Filter<[1, undefined, 3, null], undefined | null>, [undefined, null]>(true)
		})
	})

	it('support readonly array', () => {
		testType.equal<Filter<Readonly<Array<string | number>>, string>, string[]>(true)
		testType.equal<Filter<readonly [1, undefined, 3, null], undefined | null>, [undefined, null]>(true)
	})
})
