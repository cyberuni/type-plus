/**
 * Pins the `@example` blocks in the numeric TSDoc comments to the actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/numeric/*.ts`,
 * so a doc example that drifts from the implementation fails to compile.
 *
 * See https://github.com/cyberuni/type-plus/issues/431.
 */
import { it } from 'vitest'

import {
	type $Else,
	type $Then,
	type IsInteger,
	type IsNegative,
	type IsNotInteger,
	type IsNotNegative,
	type IsNotNumeric,
	type IsNotPositive,
	type IsNumeric,
	type IsPositive,
	type NumericToString,
	testType,
} from '../index.js'

it('IsNegative examples in TSDoc are accurate', () => {
	testType.equal<IsNegative<-1>, true>(true)
	testType.equal<IsNegative<-1.1>, true>(true)
	testType.equal<IsNegative<-1n>, true>(true)
	testType.equal<IsNegative<0>, false>(true)
	testType.equal<IsNegative<-0>, false>(true)
	testType.equal<IsNegative<1>, false>(true)
	testType.equal<IsNegative<1n>, false>(true)
	testType.equal<IsNegative<number>, boolean>(true)
	testType.equal<IsNegative<bigint>, boolean>(true)
	testType.equal<IsNegative<any>, false>(true)
	testType.equal<IsNegative<unknown>, false>(true)
	testType.equal<IsNegative<never>, false>(true)
	testType.equal<IsNegative<void>, false>(true)
	testType.equal<IsNegative<string>, false>(true)
	testType.equal<IsNegative<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNegative<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNegative<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNegative<-1 | string>, boolean>(true)
	testType.equal<IsNegative<-1 | string, { distributive: false }>, false>(true)
	testType.equal<IsNegative<-1, IsNegative.$Branch>, $Then>(true)
	testType.equal<IsNegative<1, IsNegative.$Branch>, $Else>(true)
})

it('IsPositive examples in TSDoc are accurate', () => {
	testType.equal<IsPositive<1>, true>(true)
	testType.equal<IsPositive<0>, true>(true)
	testType.equal<IsPositive<-0>, true>(true)
	testType.equal<IsPositive<1n>, true>(true)
	testType.equal<IsPositive<-1>, false>(true)
	testType.equal<IsPositive<-1n>, false>(true)
	testType.equal<IsPositive<number>, boolean>(true)
	testType.equal<IsPositive<bigint>, boolean>(true)
	testType.equal<IsPositive<any>, false>(true)
	testType.equal<IsPositive<unknown>, false>(true)
	testType.equal<IsPositive<never>, false>(true)
	testType.equal<IsPositive<void>, false>(true)
	testType.equal<IsPositive<string>, false>(true)
	testType.equal<IsPositive<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsPositive<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsPositive<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsPositive<1 | string>, boolean>(true)
	testType.equal<IsPositive<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsPositive<1, IsPositive.$Branch>, $Then>(true)
	testType.equal<IsPositive<-1, IsPositive.$Branch>, $Else>(true)
})

it('IsNotNegative examples in TSDoc are accurate', () => {
	testType.equal<IsNotNegative<1>, true>(true)
	testType.equal<IsNotNegative<0>, true>(true)
	testType.equal<IsNotNegative<-0>, true>(true)
	testType.equal<IsNotNegative<1n>, true>(true)
	testType.equal<IsNotNegative<-1>, false>(true)
	testType.equal<IsNotNegative<-1n>, false>(true)
	testType.equal<IsNotNegative<number>, boolean>(true)
	testType.equal<IsNotNegative<bigint>, boolean>(true)
	testType.equal<IsNotNegative<any>, true>(true)
	testType.equal<IsNotNegative<unknown>, true>(true)
	testType.equal<IsNotNegative<never>, true>(true)
	testType.equal<IsNotNegative<void>, true>(true)
	testType.equal<IsNotNegative<string>, true>(true)
	testType.equal<IsNotNegative<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotNegative<-1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNegative<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotNegative<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNegative<-1 | string>, boolean>(true)
	testType.equal<IsNotNegative<-1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNegative<1, IsNotNegative.$Branch>, $Then>(true)
	testType.equal<IsNotNegative<-1, IsNotNegative.$Branch>, $Else>(true)
})

it('IsNotPositive examples in TSDoc are accurate', () => {
	testType.equal<IsNotPositive<-1>, true>(true)
	testType.equal<IsNotPositive<-1n>, true>(true)
	testType.equal<IsNotPositive<0>, false>(true)
	testType.equal<IsNotPositive<-0>, false>(true)
	testType.equal<IsNotPositive<1>, false>(true)
	testType.equal<IsNotPositive<1n>, false>(true)
	testType.equal<IsNotPositive<number>, boolean>(true)
	testType.equal<IsNotPositive<bigint>, boolean>(true)
	testType.equal<IsNotPositive<any>, true>(true)
	testType.equal<IsNotPositive<unknown>, true>(true)
	testType.equal<IsNotPositive<never>, true>(true)
	testType.equal<IsNotPositive<void>, true>(true)
	testType.equal<IsNotPositive<string>, true>(true)
	testType.equal<IsNotPositive<-1, { selection: 'filter' }>, -1>(true)
	testType.equal<IsNotPositive<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotPositive<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotPositive<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotPositive<1 | string>, boolean>(true)
	testType.equal<IsNotPositive<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotPositive<-1, IsNotPositive.$Branch>, $Then>(true)
	testType.equal<IsNotPositive<1, IsNotPositive.$Branch>, $Else>(true)
})

it('IsInteger examples in TSDoc are accurate', () => {
	testType.equal<IsInteger<0>, true>(true)
	testType.equal<IsInteger<-1>, true>(true)
	testType.equal<IsInteger<1n>, true>(true)
	testType.equal<IsInteger<bigint>, true>(true)
	testType.equal<IsInteger<1.1>, false>(true)
	testType.equal<IsInteger<number>, boolean>(true)
	testType.equal<IsInteger<any>, false>(true)
	testType.equal<IsInteger<unknown>, false>(true)
	testType.equal<IsInteger<never>, false>(true)
	testType.equal<IsInteger<void>, false>(true)
	testType.equal<IsInteger<string>, false>(true)
	testType.equal<IsInteger<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsInteger<1.1, { selection: 'filter' }>, never>(true)
	testType.equal<IsInteger<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsInteger<1 | string>, boolean>(true)
	testType.equal<IsInteger<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsInteger<1, IsInteger.$Branch>, $Then>(true)
	testType.equal<IsInteger<1.1, IsInteger.$Branch>, $Else>(true)
})

it('IsNotInteger examples in TSDoc are accurate', () => {
	testType.equal<IsNotInteger<1.1>, true>(true)
	testType.equal<IsNotInteger<0>, false>(true)
	testType.equal<IsNotInteger<1n>, false>(true)
	testType.equal<IsNotInteger<bigint>, false>(true)
	testType.equal<IsNotInteger<number>, boolean>(true)
	testType.equal<IsNotInteger<any>, true>(true)
	testType.equal<IsNotInteger<unknown>, true>(true)
	testType.equal<IsNotInteger<never>, true>(true)
	testType.equal<IsNotInteger<void>, true>(true)
	testType.equal<IsNotInteger<string>, true>(true)
	testType.equal<IsNotInteger<1.1, { selection: 'filter' }>, 1.1>(true)
	testType.equal<IsNotInteger<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotInteger<number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotInteger<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotInteger<1 | string>, boolean>(true)
	testType.equal<IsNotInteger<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotInteger<1.1, IsNotInteger.$Branch>, $Then>(true)
	testType.equal<IsNotInteger<1, IsNotInteger.$Branch>, $Else>(true)
})

it('IsNumeric examples in TSDoc are accurate', () => {
	testType.equal<IsNumeric<1>, true>(true)
	testType.equal<IsNumeric<1.1>, true>(true)
	testType.equal<IsNumeric<1n>, true>(true)
	testType.equal<IsNumeric<number>, true>(true)
	testType.equal<IsNumeric<bigint>, true>(true)
	testType.equal<IsNumeric<string>, false>(true)
	testType.equal<IsNumeric<any>, false>(true)
	testType.equal<IsNumeric<unknown>, false>(true)
	testType.equal<IsNumeric<never>, false>(true)
	testType.equal<IsNumeric<void>, false>(true)
	testType.equal<IsNumeric<1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNumeric<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsNumeric<string | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNumeric<1 | string>, boolean>(true)
	testType.equal<IsNumeric<1 | string, { distributive: false }>, false>(true)
	testType.equal<IsNumeric<1, IsNumeric.$Branch>, $Then>(true)
	testType.equal<IsNumeric<string, IsNumeric.$Branch>, $Else>(true)
})

it('IsNotNumeric examples in TSDoc are accurate', () => {
	testType.equal<IsNotNumeric<1>, false>(true)
	testType.equal<IsNotNumeric<1.1>, false>(true)
	testType.equal<IsNotNumeric<1n>, false>(true)
	testType.equal<IsNotNumeric<number>, false>(true)
	testType.equal<IsNotNumeric<bigint>, false>(true)
	testType.equal<IsNotNumeric<string>, true>(true)
	testType.equal<IsNotNumeric<any>, true>(true)
	testType.equal<IsNotNumeric<unknown>, true>(true)
	testType.equal<IsNotNumeric<never>, true>(true)
	testType.equal<IsNotNumeric<void>, true>(true)
	testType.equal<IsNotNumeric<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotNumeric<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNumeric<string | number, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotNumeric<1 | string>, boolean>(true)
	testType.equal<IsNotNumeric<1 | string, { distributive: false }>, true>(true)
	testType.equal<IsNotNumeric<string, IsNotNumeric.$Branch>, $Then>(true)
	testType.equal<IsNotNumeric<1, IsNotNumeric.$Branch>, $Else>(true)
})

it('NumericToString examples in TSDoc are accurate', () => {
	testType.equal<NumericToString<1>, '1'>(true)
	testType.equal<NumericToString<1.23>, '1.23'>(true)
	testType.equal<NumericToString<0.00123>, '0.00123'>(true)
	testType.equal<NumericToString<1n>, '1n'>(true)
	testType.equal<NumericToString<-1>, '-1'>(true)
	testType.equal<NumericToString<-1n>, '-1n'>(true)
})
