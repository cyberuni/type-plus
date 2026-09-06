import { it, test } from 'vitest'

import type { NumericToString } from '../index.js'
import { testType } from '../index.js'

test('TypeScript bigint to string is missing the n suffix', () => {
	type R<N extends bigint> = `${N}`

	testType.equal<R<1n>, '1n'>(false)
})

it('casts number', () => {
	testType.equal<NumericToString<123>, '123'>(true)
	testType.equal<NumericToString<1>, '1'>(true)
	testType.equal<NumericToString<0>, '0'>(true)
	testType.equal<NumericToString<-0>, '0'>(true)
	testType.equal<NumericToString<-123>, '-123'>(true)
	testType.equal<NumericToString<-1>, '-1'>(true)
})

it('casts bigint', () => {
	testType.equal<NumericToString<123n>, '123n'>(true)
	testType.equal<NumericToString<1n>, '1n'>(true)
	testType.equal<NumericToString<0n>, '0n'>(true)
	testType.equal<NumericToString<-0n>, '0n'>(true)
	testType.equal<NumericToString<-123n>, '-123n'>(true)
	testType.equal<NumericToString<-1n>, '-1n'>(true)
})

it('casts float', () => {
	testType.equal<NumericToString<123.45>, '123.45'>(true)
	testType.equal<NumericToString<0.123>, '0.123'>(true)
	testType.equal<NumericToString<1.23>, '1.23'>(true)
	testType.equal<NumericToString<0.00123>, '0.00123'>(true)

	testType.equal<NumericToString<1.1>, '1.1'>(true)
	testType.equal<NumericToString<1.0>, '1'>(true)
	testType.equal<NumericToString<0.1>, '0.1'>(true)
	testType.equal<NumericToString<0.0>, '0'>(true)
	testType.equal<NumericToString<-0.0>, '0'>(true)
	testType.equal<NumericToString<-0.1>, '-0.1'>(true)
	testType.equal<NumericToString<-1.0>, '-1'>(true)
	testType.equal<NumericToString<-1.1>, '-1.1'>(true)

	testType.equal<NumericToString<-0.123>, '-0.123'>(true)
	testType.equal<NumericToString<-123.45>, '-123.45'>(true)
})
