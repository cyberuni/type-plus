/**
 * Pins the `@example` blocks in the `src/function/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/function/*.ts`, so a
 * doc example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import {
	type $Else,
	type $Then,
	type AnyFunction,
	type ExtractFunction,
	type IsFunction,
	type IsNotFunction,
	testType,
} from '../index.js'

it('IsFunction examples in TSDoc are accurate', () => {
	testType.equal<IsFunction<Function>, true>(true)
	testType.equal<IsFunction<() => void>, true>(true)

	testType.equal<IsFunction<never>, false>(true)
	testType.equal<IsFunction<unknown>, false>(true)
	testType.equal<IsFunction<number>, false>(true)

	testType.equal<IsFunction<Function | number>, boolean>(true)
	testType.equal<IsFunction<(() => string) | number>, boolean>(true)

	testType.equal<IsFunction<Function, { selection: 'filter' }>, Function>(true)
	testType.equal<IsFunction<() => void, { selection: 'filter' }>, () => void>(true)

	testType.equal<IsFunction<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsFunction<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsFunction<Function | number, { selection: 'filter' }>, Function>(true)

	testType.equal<IsFunction<(() => string) | number, { selection: 'filter' }>, () => string>(true)

	testType.equal<IsFunction<Function | 1>, boolean>(true)
	testType.equal<IsFunction<Function | 1, { distributive: false }>, false>(true)

	testType.equal<IsFunction<Function, IsFunction.$Branch>, $Then>(true)
	testType.equal<IsFunction<string, IsFunction.$Branch>, $Else>(true)
})

it('IsNotFunction examples in TSDoc are accurate', () => {
	testType.equal<IsNotFunction<Function>, false>(true)
	testType.equal<IsNotFunction<() => void>, false>(true)

	testType.equal<IsNotFunction<never>, true>(true)
	testType.equal<IsNotFunction<unknown>, true>(true)
	testType.equal<IsNotFunction<number>, true>(true)

	testType.equal<IsNotFunction<Function | number>, boolean>(true)
	testType.equal<IsNotFunction<(() => string) | number>, boolean>(true)

	testType.equal<IsNotFunction<Function, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotFunction<() => void, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotFunction<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotFunction<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotFunction<Function | number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNotFunction<(() => string) | number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNotFunction<Function | 1>, boolean>(true)
	testType.equal<IsNotFunction<Function | 1, { distributive: false }>, true>(true)

	testType.equal<IsNotFunction<Function, IsNotFunction.$Branch>, $Else>(true)
	testType.equal<IsNotFunction<string, IsNotFunction.$Branch>, $Then>(true)
})

it('AnyFunction examples in TSDoc are accurate', () => {
	testType.equal<(() => void) extends AnyFunction ? true : false, true>(true)
	testType.equal<((a: string) => number) extends AnyFunction<[string], number> ? true : false, true>(true)
	testType.equal<((a: string) => number) extends AnyFunction<[number]> ? true : false, false>(true)
})

it('ExtractFunction example in TSDoc is accurate', () => {
	testType.equal<ExtractFunction<(() => void) & { a: 1 }>, () => void>(true)
})
