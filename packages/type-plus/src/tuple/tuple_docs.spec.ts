/**
 * Pins the `@example` blocks in the `src/tuple/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/tuple/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import {
	type $Else,
	type $Then,
	type CommonPropKeys,
	type DropFirst,
	type DropLast,
	type DropMatch,
	type IsNotTuple,
	type IsTuple,
	type TuplePlus,
	testType,
} from '../index.js'

it('IsTuple examples in TSDoc are accurate', () => {
	testType.equal<IsTuple<[]>, true>(true)
	testType.equal<IsTuple<number[]>, false>(true)
	testType.equal<IsTuple<string>, false>(true)
	testType.equal<IsTuple<never>, false>(true)
	testType.equal<IsTuple<unknown>, false>(true)
	testType.equal<IsTuple<[], { selection: 'filter' }>, []>(true)
	testType.equal<IsTuple<[1], { selection: 'filter' }>, [1]>(true)
	testType.equal<IsTuple<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsTuple<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsTuple<[] | boolean, { selection: 'filter' }>, []>(true)
	testType.equal<IsTuple<[1] | 1>, boolean>(true)
	testType.equal<IsTuple<[] | 1, { distributive: false }>, false>(true)
	testType.equal<IsTuple<[], IsTuple.$Branch>, $Then>(true)
	testType.equal<IsTuple<string, IsTuple.$Branch>, $Else>(true)
})

it('IsNotTuple examples in TSDoc are accurate', () => {
	testType.equal<IsNotTuple<[]>, false>(true)
	testType.equal<IsNotTuple<[1]>, false>(true)
	testType.equal<IsNotTuple<number[]>, true>(true)
	testType.equal<IsNotTuple<string>, true>(true)
	testType.equal<IsNotTuple<never>, true>(true)
	testType.equal<IsNotTuple<unknown>, true>(true)
	testType.equal<IsNotTuple<[], { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<[1], { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotTuple<[] | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotTuple<[1] | bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNotTuple<[] | 1>, boolean>(true)
	testType.equal<IsNotTuple<[] | 1, { distributive: false }>, true>(true)
	testType.equal<IsNotTuple<bigint, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<[], IsNotTuple.$Branch>, $Else>(true)
})

it('Drop examples in TSDoc are accurate', () => {
	testType.equal<DropFirst<[1, 2, 3]>, [2, 3]>(true)
	testType.equal<DropFirst<[string]>, []>(true)
	testType.equal<DropFirst<[]>, []>(true)
	testType.equal<DropFirst<string[]>, string[]>(true)
	testType.equal<DropLast<[1, 2, 3]>, [1, 2]>(true)
	testType.equal<DropLast<[string]>, []>(true)
	testType.equal<DropLast<[]>, []>(true)
	testType.equal<DropLast<string[]>, string[]>(true)
	testType.equal<DropMatch<Array<string | undefined>, undefined>, string[]>(true)
	testType.equal<DropMatch<Array<string>, string>, never[]>(true)
	testType.equal<DropMatch<Array<1 | 2>, number>, never[]>(true)
})

it('CommonPropKeys examples in TSDoc are accurate', () => {
	testType.equal<CommonPropKeys<[{ a: number }, { b: number }]>, never>(true)
	testType.equal<CommonPropKeys<[{ a: number; c: 1 }, { b: number; c: 2 }]>, 'c'>(true)
	testType.equal<TuplePlus.CommonPropKeys<[{ a: number }, { b: number }]>, never>(true)
	testType.equal<TuplePlus.CommonPropKeys<[{ a: number; c: 1 }, { b: number; c: 2 }]>, 'c'>(true)
})

it('TuplePlus.Filter examples in TSDoc are accurate', () => {
	testType.equal<TuplePlus.Filter<[1, 2, '3'], number>, [1, 2]>(true)
	testType.equal<TuplePlus.Filter<[1, 2, '3'], true>, []>(true)
})

it('TuplePlus.Find examples in TSDoc are accurate', () => {
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], string>, 'x'>(true)
	testType.equal<TuplePlus.Find<[true, 1, 'x', 3], number>, 1>(true)
	testType.equal<TuplePlus.Find<[string, number, 1], 1>, 1 | undefined>(true)
	testType.equal<TuplePlus.Find<[true, number | string], string>, string>(true)
	testType.equal<TuplePlus.Find<[true, number | string], string, { $unionNotMatch: undefined }>, string | undefined>(
		true,
	)
	testType.equal<TuplePlus.Find<[true, 1, 'x'], 2>, never>(true)
})
