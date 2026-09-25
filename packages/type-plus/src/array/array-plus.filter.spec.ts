import { it } from 'vitest'

import { type $Fn, type ArrayPlus, type IsObject, testType } from '../index.js'

it('returns never for never case', () => {
	testType.equal<ArrayPlus.Filter<never, string>, never>(true)
})

it('can override never case', () => {
	testType.equal<ArrayPlus.Filter<never, string, { $never: 1 }>, 1>(true)
})

it('can override not array case', () => {
	testType.equal<ArrayPlus.Filter<[], string, { $notArray: 1 }>, 1>(true)
})

it('filter type within the array matching the criteria', () => {
	testType.equal<ArrayPlus.Filter<Array<string | undefined>, string>, string[]>(true)
})

it('defaults to match true', () => {
	testType.equal<ArrayPlus.Filter<Array<string | true | undefined>>, true[]>(true)
	testType.equal<ArrayPlus.Filter<Array<string | boolean | undefined>>, true[]>(true)
})

it('keeps the element types a type function returns true for', () => {
	testType.equal<ArrayPlus.Filter<Array<1 | { a: 1 }>, IsObject.$Fn>, Array<{ a: 1 }>>(true)
	testType.equal<ArrayPlus.Filter<Array<{ a: 1 } | object>, IsObject.$Fn<{ exact: true }>>, object[]>(true)
	testType.equal<ArrayPlus.Filter<Array<1 | { a: 1 }>, $Fn.Not<IsObject.$Fn>>, 1[]>(true)
})

it('returns never[] when a type function matches no element type', () => {
	testType.equal<ArrayPlus.Filter<Array<1 | 2>, IsObject.$Fn>, never[]>(true)
	testType.equal<ArrayPlus.Filter<never[], IsObject.$Fn>, never[]>(true)
})

it('returns the never case for never with a type function', () => {
	testType.equal<ArrayPlus.Filter<never, IsObject.$Fn>, never>(true)
})

it('returns the not array case for a tuple with a type function', () => {
	testType.equal<ArrayPlus.Filter<[{ a: 1 }], IsObject.$Fn>, never[]>(true)
	testType.equal<ArrayPlus.Filter<[{ a: 1 }], IsObject.$Fn, { $notArray: 1 }>, 1>(true)
})
