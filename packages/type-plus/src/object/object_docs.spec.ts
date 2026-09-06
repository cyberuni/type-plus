/**
 * Pins the `@example` blocks in the `src/object/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/object/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import { type $Else, type $Then, type IsNotObject, type IsObject, type Properties, testType } from '../index.js'

it('IsObject examples in TSDoc are accurate', () => {
	testType.equal<IsObject<object>, true>(true)
	testType.equal<IsObject<{}>, true>(true)
	testType.equal<IsObject<{ a: 1 }>, true>(true)
	testType.equal<IsObject<Function>, true>(true)
	testType.equal<IsObject<never>, false>(true)
	testType.equal<IsObject<unknown>, false>(true)
	testType.equal<IsObject<number>, false>(true)
	testType.equal<IsObject<{} | bigint>, boolean>(true)
	testType.equal<IsObject<{}, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsObject<Function, { selection: 'filter' }>, Function>(true)
	testType.equal<IsObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<{} | bigint, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<object, { exact: true }>, true>(true)
	testType.equal<IsObject<{}, { exact: true }>, false>(true)
	testType.equal<IsObject<{} | 1>, boolean>(true)
	testType.equal<IsObject<{} | 1, { distributive: false }>, false>(true)
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<string, IsObject.$Branch>, $Else>(true)
})

it('IsNotObject examples in TSDoc are accurate', () => {
	testType.equal<IsNotObject<{}>, false>(true)
	testType.equal<IsNotObject<{ a: 1 }>, false>(true)
	testType.equal<IsNotObject<Function>, false>(true)
	testType.equal<IsNotObject<number>, true>(true)
	testType.equal<IsNotObject<object>, false>(true)
	testType.equal<IsNotObject<never>, true>(true)
	testType.equal<IsNotObject<unknown>, true>(true)
	testType.equal<IsNotObject<{} | bigint>, boolean>(true)
	testType.equal<IsNotObject<{}, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<{ a: 1 }, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<Function, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotObject<{} | bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNotObject<object, { exact: true }>, false>(true)
	testType.equal<IsNotObject<{}, { exact: true }>, true>(true)
	testType.equal<IsNotObject<{} | 1>, boolean>(true)
	testType.equal<IsNotObject<{} | 1, { distributive: false }>, true>(true)
	testType.equal<IsNotObject<{}, IsNotObject.$Branch>, $Else>(true)
	testType.equal<IsNotObject<string, IsNotObject.$Branch>, $Then>(true)
})

it('Properties examples in TSDoc are accurate', () => {
	type T = { a: number; b?: string }
	testType.equal<Properties<T>, { a: number; b?: string }>(true)
	testType.equal<Properties<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>(true)
})
