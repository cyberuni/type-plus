/**
 * Pins the `@example` blocks in the `src/array/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/array/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import {
	type $Else,
	type $Then,
	type ArrayPlus,
	type Filter,
	type FindFirst,
	type FindLast,
	type Head,
	type IsArray,
	type IsNotArray,
	type KeepMatch,
	type Last,
	type PadStart,
	type Some,
	testType,
} from '../index.js'

it('ArrayPlus examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.Entries<[1, 2]>, [[0, 1], [1, 2]]>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly number[]>, true>(true)
})

it('FindFirst examples in TSDoc are accurate', () => {
	testType.equal<FindFirst<[true, 1, 'x', 3], string>, 'x'>(true)
	testType.equal<FindFirst<[true, 1, 'x', 3], number>, 1>(true)
	testType.equal<FindFirst<[string, number, 1], 1>, 1 | undefined>(true)
	testType.equal<FindFirst<[true, number | string], string>, string>(true)
	testType.equal<FindFirst<Array<string>, string>, string>(true)
	testType.equal<FindFirst<Array<1 | 2 | 'x'>, number>, 1 | 2>(true)
	testType.equal<FindFirst<Array<string | number>, number | string>, string | number>(true)
	testType.equal<FindFirst<Array<number>, 1>, 1 | undefined>(true)
	testType.equal<FindFirst<Array<string | number>, number>, number>(true)

	testType.equal<FindFirst<[true, 1, 'x'], 2>, never>(true)
	testType.equal<FindFirst<string[], number>, never>(true)
})

it('ArrayPlus.SplitAt examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 2>, [[1, 2], [3, 4, 5]]>(true)
	testType.equal<ArrayPlus.SplitAt<[1, 2, 3, 4, 5], -3>, [[1, 2], [3, 4, 5]]>(true)

	testType.equal<ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 2, 2>, [[1, 2, 5], [3, 4]]>(true)

	testType.equal<ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 2, 2, ['a', 'b']>, [[1, 2, 'a', 'b', 5], [3, 4]]>(true)

	testType.equal<ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 6>, [[1, 2, 3, 4, 5], []]>(true)
	testType.equal<ArrayPlus.SplitAt<[1, 2, 3, 4, 5], -6>, [[], [1, 2, 3, 4, 5]]>(true)
})

it('ArrayPlus.CommonPropKeys examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.CommonPropKeys<Array<{ a: 1 }>>, 'a'>(true)
	testType.equal<ArrayPlus.CommonPropKeys<Array<{ a: 1; b: 1 } | { a: 1; c: 1 }>>, 'a'>(true)
})

it('ArrayPlus.IsReadonly examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly string[]>, true>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly [1, 2, 3, 4, 5]>, true>(true)

	testType.equal<ArrayPlus.IsReadonly<[1, 2, 3, 4, 5]>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly string[] | number>, boolean>(true)
})

it('Filter examples in TSDoc are accurate', () => {
	testType.equal<Filter<[1, 2, '3'], number>, [1, 2]>(true)
	testType.equal<Filter<Array<string | undefined>, string>, string[]>(true)
})

it('KeepMatch examples in TSDoc are accurate', () => {
	testType.equal<KeepMatch<[1, 2, 3], number>, [1, 2, 3]>(true)
	testType.equal<KeepMatch<Array<string | undefined>, string>, string[]>(true)
})

it('ArrayPlus.Filter examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.Filter<Array<string | undefined>, string>, string[]>(true)
})

it('PadStart examples in TSDoc are accurate', () => {
	testType.equal<PadStart<number[], 1, string>, [string, ...number[]]>(true)

	testType.equal<PadStart<number[], 2, number>, number[]>(true)
	testType.equal<PadStart<number[], 3, 1>, number[]>(true)

	testType.equal<PadStart<[1, 2, 3], 5, 0>, [0, 0, 1, 2, 3]>(true)

	testType.equal<PadStart<[1, 2, 3], 5>, [unknown, unknown, 1, 2, 3]>(true)
})

it('FindLast examples in TSDoc are accurate', () => {
	testType.equal<FindLast<Array<1 | 2 | 'x'>, number>, 1 | 2 | undefined>(true)

	testType.equal<FindLast<[true, 123, 'x', 321], number>, 321>(true)
})

it('IsArray examples in TSDoc are accurate', () => {
	testType.equal<IsArray<number[]>, true>(true)
	testType.equal<IsArray<[1]>, true>(true)

	testType.equal<IsArray<number>, false>(true)

	testType.equal<IsArray<number[], { selection: 'filter' }>, number[]>(true)
	testType.equal<IsArray<number, { selection: 'filter' }>, never>(true)

	testType.equal<IsArray<number[] | 1>, boolean>(true)
	testType.equal<IsArray<number[] | 1, { distributive: false }>, false>(true)

	testType.equal<IsArray<[]>, true>(true)
	testType.equal<IsArray<[], { exact: true }>, false>(true)

	testType.equal<IsArray<number[], IsArray.$Branch>, $Then>(true)
	testType.equal<IsArray<number, IsArray.$Branch>, $Else>(true)
})

it('ArrayPlus.Reverse examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.Reverse<Array<string | number>>, Array<string | number>>(true)

	testType.equal<ArrayPlus.Reverse<[1, 2, 3]>, [3, 2, 1]>(true)
})

it('Some examples in TSDoc are accurate', () => {
	testType.equal<Some<string[], string>, true>(true)
	testType.equal<Some<['a', boolean], boolean>, true>(true)
	testType.equal<Some<['a', true], boolean>, true>(true)

	testType.equal<Some<['a', true], boolean, 'strict'>, false>(true)
})

it('ArrayPlus.Entries examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.Entries<Array<string | number>>, Array<[number, string | number]>>(true)
	testType.equal<ArrayPlus.Entries<[1, 2, 3]>, [[0, 1], [1, 2], [2, 3]]>(true)
})

it('Head examples in TSDoc are accurate', () => {
	testType.equal<Head<[1, 2, 3]>, 1>(true)
	testType.equal<Head<string[]>, string>(true)

	testType.equal<Head<[]>, never>(true)
})

it('ArrayPlus.Find examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.Find<Array<string>, string>, string>(true)
	testType.equal<ArrayPlus.Find<Array<1 | 2 | 'x'>, number>, 1 | 2>(true)
	testType.equal<ArrayPlus.Find<Array<string | number>, number | string>, string | number>(true)
	testType.equal<ArrayPlus.Find<Array<number>, 1>, 1 | undefined>(true)
	testType.equal<ArrayPlus.Find<Array<string | number>, number>, number>(true)

	testType.equal<ArrayPlus.Find<string[], number>, never>(true)
})

it('IsNotArray examples in TSDoc are accurate', () => {
	testType.equal<IsNotArray<number[]>, false>(true)
	testType.equal<IsNotArray<[1]>, false>(true)

	testType.equal<IsNotArray<number>, true>(true)

	testType.equal<IsNotArray<number[], { selection: 'filter' }>, never>(true)
	testType.equal<IsNotArray<number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNotArray<number[] | 1>, boolean>(true)
	testType.equal<IsNotArray<number[] | 1, { distributive: false }>, true>(true)

	testType.equal<IsNotArray<[]>, false>(true)
	testType.equal<IsNotArray<[], { exact: true }>, true>(true)

	testType.equal<IsNotArray<number[], IsNotArray.$Branch>, $Else>(true)
	testType.equal<IsNotArray<number, IsNotArray.$Branch>, $Then>(true)
})

it('Last examples in TSDoc are accurate', () => {
	testType.equal<Last<[1, 2, 3]>, 3>(true)
	testType.equal<Last<string[]>, string>(true)

	testType.equal<Last<[]>, never>(true)
})

it('ArrayPlus.IsIndexOutOfBound examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.IsIndexOutOfBound<[1], 0>, false>(true)
	testType.equal<ArrayPlus.IsIndexOutOfBound<[1], -1>, false>(true)

	testType.equal<ArrayPlus.IsIndexOutOfBound<[1], 1>, true>(true)
	testType.equal<ArrayPlus.IsIndexOutOfBound<[1], -2>, true>(true)
})

it('ArrayPlus.IndexAt examples in TSDoc are accurate', () => {
	testType.equal<ArrayPlus.IndexAt<['a', 'b', 'c'], 2>, 2>(true)
	testType.equal<ArrayPlus.IndexAt<['a', 'b', 'c'], -2>, 1>(true)

	testType.equal<ArrayPlus.IndexAt<['a', 'b', 'c'], 3>, 3>(true)
	testType.equal<ArrayPlus.IndexAt<['a', 'b', 'c'], -4>, 0>(true)

	testType.equal<ArrayPlus.IndexAt<[], 0>, never>(true)

	testType.equal<ArrayPlus.IndexAt<never, 0, { $never: 'n' }>, 'n'>(true)
	testType.equal<ArrayPlus.IndexAt<string[], 0, { $array: 'a' }>, 'a'>(true)
	testType.equal<ArrayPlus.IndexAt<[], 0, { caseEmptyTuple: 'e' }>, 'e'>(true)
	testType.equal<ArrayPlus.IndexAt<[1], 1, { caseUpperBound: 'u' }>, 'u'>(true)
	testType.equal<ArrayPlus.IndexAt<[1], -2, { caseLowerBound: 'l' }>, 'l'>(true)
})
