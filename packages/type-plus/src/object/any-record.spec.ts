import { it } from 'vitest'

import { type AnyRecord, type KeyTypes, testType } from '../index.js'

it('is a record of string, number and symbol index signatures', () => {
	testType.equal<AnyRecord, { [x: string]: any; [x: number]: any; [x: symbol]: any }>(true)
})

it('use as type criteria', () => {
	type X<T extends AnyRecord> = keyof T

	testType.equal<X<{ a: 1 }>, 'a'>(true)

	// This is how TypeScript behaves
	testType.equal<X<never>, KeyTypes>(true)
	// This is what we want it to be
	// @ts-expect-error
	testType.equal<X<never>, never>(true)
})

it('shows how AnyRecord behaves as criteria against primitive types', () => {
	testType.equal<Boolean extends AnyRecord ? true : false, true>(true)
	testType.equal<Number extends AnyRecord ? true : false, true>(true)
	testType.equal<String extends AnyRecord ? true : false, true>(true)
	testType.equal<Function extends AnyRecord ? true : false, true>(true)
	testType.equal<Object extends AnyRecord ? true : false, true>(true)
	testType.equal<Symbol extends AnyRecord ? true : false, true>(true)
	testType.equal<BigInt extends AnyRecord ? true : false, true>(true)
})
