/**
 * Pins the `@example` blocks in the `src/number/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/number/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import {
	type $Else,
	type $Then,
	type IsNotNumber,
	type IsNotNumberLiteral,
	type IsNumber,
	type IsNumberLiteral,
	type NumberPlus,
	testType,
} from '../index.js'

it('IsNumber examples in TSDoc are accurate', () => {
	testType.equal<IsNumber<number>, true>(true)
	testType.equal<IsNumber<1>, true>(true)
	testType.equal<IsNumber<never>, false>(true)
	testType.equal<IsNumber<unknown>, false>(true)
	testType.equal<IsNumber<string | boolean>, false>(true)
	testType.equal<IsNumber<string | number>, boolean>(true)

	testType.equal<IsNumber<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNumber<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumber<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumber<string | boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumber<string | number, { selection: 'filter' }>, number>(true)

	testType.equal<IsNumber<1 | string>, boolean>(true)
	testType.equal<IsNumber<1 | string, { distributive: false }>, false>(true)

	testType.equal<IsNumber<number, IsNumber.$Branch>, $Then>(true)
	testType.equal<IsNumber<string, IsNumber.$Branch>, $Else>(true)
})

it('IsNotNumber examples in TSDoc are accurate', () => {
	testType.equal<IsNotNumber<number>, false>(true)
	testType.equal<IsNotNumber<1>, false>(true)
	testType.equal<IsNotNumber<never>, true>(true)
	testType.equal<IsNotNumber<unknown>, true>(true)
	testType.equal<IsNotNumber<string | number>, boolean>(true)

	testType.equal<IsNotNumber<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumber<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumber<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumber<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotNumber<string | 1, { selection: 'filter' }>, string>(true)

	testType.equal<IsNotNumber<1 | string>, boolean>(true)
	testType.equal<IsNotNumber<1 | string, { distributive: false }>, true>(true)

	testType.equal<IsNotNumber<string, IsNotNumber.$Branch>, $Then>(true)
	testType.equal<IsNotNumber<number, IsNotNumber.$Branch>, $Else>(true)
})

it('IsNumberLiteral examples in TSDoc are accurate', () => {
	testType.equal<IsNumberLiteral<number>, false>(true)
	testType.equal<IsNumberLiteral<1>, true>(true)
	testType.equal<IsNumberLiteral<never>, false>(true)
	testType.equal<IsNumberLiteral<unknown>, false>(true)
	testType.equal<IsNumberLiteral<string | boolean>, false>(true)
	testType.equal<IsNumberLiteral<string | 1>, boolean>(true)

	testType.equal<IsNumberLiteral<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumberLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<string | boolean, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumberLiteral<string | 1, { selection: 'filter' }>, 1>(true)

	testType.equal<IsNumberLiteral<1 | string>, boolean>(true)
	testType.equal<IsNumberLiteral<1 | string, { distributive: false }>, false>(true)

	testType.equal<IsNumberLiteral<1, IsNumberLiteral.$Branch>, $Then>(true)
	testType.equal<IsNumberLiteral<string, IsNumberLiteral.$Branch>, $Else>(true)
})

it('IsNotNumberLiteral examples in TSDoc are accurate', () => {
	testType.equal<IsNotNumberLiteral<number>, true>(true)
	testType.equal<IsNotNumberLiteral<1>, false>(true)
	testType.equal<IsNotNumberLiteral<never>, true>(true)
	testType.equal<IsNotNumberLiteral<unknown>, true>(true)
	testType.equal<IsNotNumberLiteral<string | boolean>, true>(true)
	testType.equal<IsNotNumberLiteral<string | 1>, boolean>(true)

	testType.equal<IsNotNumberLiteral<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotNumberLiteral<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumberLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumberLiteral<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotNumberLiteral<1 | string, { selection: 'filter' }>, string>(true)

	testType.equal<IsNotNumberLiteral<1 | string>, boolean>(true)
	testType.equal<IsNotNumberLiteral<1 | string, { distributive: false }>, true>(true)

	testType.equal<IsNotNumberLiteral<1, IsNotNumberLiteral.$Branch>, $Else>(true)
	testType.equal<IsNotNumberLiteral<string, IsNotNumberLiteral.$Branch>, $Then>(true)
})

it('NumberPlus examples in TSDoc are accurate', () => {
	testType.equal<NumberPlus.IsNumber<1>, true>(true)
	testType.equal<NumberPlus.IsInteger<1.1>, false>(true)
})
