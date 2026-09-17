import { describe, it } from 'vitest'
import { type $Fn, type Apply, type IsObject, type TuplePlus, testType } from '../../index.js'

interface IsOne extends $Fn {
	readonly out: this['in'] extends 1 ? true : false
}

describe('Apply', () => {
	it('calls the function with the input', () => {
		testType.equal<Apply<IsOne, 1>, true>(true)
		testType.equal<Apply<IsOne, 2>, false>(true)
	})

	it('calls a predicate function', () => {
		testType.equal<Apply<IsObject.$Fn, {}>, true>(true)
		testType.equal<Apply<IsObject.$Fn<{ exact: true }>, {}>, false>(true)
	})

	it('rejects a type that is not a $Fn', () => {
		// @ts-expect-error
		type _R = Apply<{ in: unknown; out: unknown }, 1>
	})
})

describe('$Fn', () => {
	it('works as the example shows', () => {
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], object>, [{ a: 1 }, object]>(true)
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn<{ exact: true }>>, [object]>(true)
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], $Fn.Not<IsObject.$Fn>>, [1, 'x']>(true)
	})

	it('requires the brand, so a type with `in` and `out` is matched by `extends`', () => {
		type InOut = { in: 1; out: true }
		testType.equal<$Fn.Match<InOut, InOut>, true>(true)
		testType.equal<$Fn.Match<{ in: 1; out: true; x: 1 }, InOut>, true>(true)
		testType.equal<$Fn.Match<1, InOut>, false>(true)
	})
})

describe('$Fn.Not', () => {
	it('negates the function', () => {
		testType.equal<Apply<$Fn.Not<IsObject.$Fn>, {}>, false>(true)
		testType.equal<Apply<$Fn.Not<IsObject.$Fn>, 1>, true>(true)
	})

	it('keeps boolean as boolean', () => {
		testType.equal<Apply<$Fn.Not<IsObject.$Fn>, {} | 1>, boolean>(true)
	})

	it('negates twice back to the function', () => {
		testType.equal<Apply<$Fn.Not<$Fn.Not<IsObject.$Fn>>, {}>, true>(true)
		testType.equal<Apply<$Fn.Not<$Fn.Not<IsObject.$Fn>>, 1>, false>(true)
	})
})

describe('$Fn.Match', () => {
	it('matches a plain type with extends', () => {
		testType.equal<$Fn.Match<{}, object>, true>(true)
		testType.equal<$Fn.Match<1, object>, false>(true)
	})

	it('does not distribute over a plain type or its criteria', () => {
		testType.equal<$Fn.Match<1 | 'a', number>, false>(true)
		testType.equal<$Fn.Match<1, 1 | 2>, true>(true)
		testType.equal<$Fn.Match<3, 1 | 2>, false>(true)
	})

	it('matches a function when it returns true', () => {
		testType.equal<$Fn.Match<{}, IsObject.$Fn>, true>(true)
		testType.equal<$Fn.Match<{}, IsObject.$Fn<{ exact: true }>>, false>(true)
	})

	it('does not match a function that returns boolean or never', () => {
		testType.equal<$Fn.Match<{} | 1, IsObject.$Fn>, false>(true)
		testType.equal<$Fn.Match<1, IsObject.$Fn<{ selection: 'filter' }>>, false>(true)
	})

	it('matches only never against never', () => {
		testType.equal<$Fn.Match<never, never>, true>(true)
		testType.equal<$Fn.Match<1, never>, false>(true)
	})

	it('matches anything against any', () => {
		testType.equal<$Fn.Match<1, any>, true>(true)
	})
})
