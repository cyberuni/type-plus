import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsLiteral, testType } from '../index.js'

describe('IsLiteral<T>', () => {
	it('returns false for `number` type', () => {
		testType.false<IsLiteral<number>>(true)
	})

	it('returns true for numeric literals', () => {
		testType.true<IsLiteral<1>>(true)
		testType.true<IsLiteral<12345>>(true)
	})

	it('returns false for `string` type', () => {
		testType.false<IsLiteral<string>>(true)
	})

	it('returns true for string literals', () => {
		testType.true<IsLiteral<'1'>>(true)
		testType.true<IsLiteral<'abc'>>(true)
	})

	it('returns false for `boolean` type', () => {
		testType.false<IsLiteral<boolean>>(true)
	})

	it('returns true for boolean literals', () => {
		testType.true<IsLiteral<true>>(true)
		testType.true<IsLiteral<false>>(true)
	})

	it('returns false for `symbol` type', () => {
		testType.false<IsLiteral<symbol>>(true)
	})

	it('returns true for unique symbol', () => {
		const sym = Symbol()
		const keySym = Symbol.for('key')
		testType.true<IsLiteral<typeof sym>>(true)
		testType.true<IsLiteral<typeof keySym>>(true)
	})

	it('returns false for `bigint` type', () => {
		testType.false<IsLiteral<bigint>>(true)
	})

	it('returns true for bigint literals', () => {
		testType.true<IsLiteral<1n>>(true)
		testType.true<IsLiteral<12345n>>(true)
	})

	it('override $then/$else', () => {
		testType.equal<IsLiteral<'1', { $then: 'yes' }>, 'yes'>(true)
		testType.equal<IsLiteral<string, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
		testType.equal<IsLiteral<'a', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	})

	it('supports filter', () => {
		testType.equal<IsLiteral<'a', { selection: 'filter' }>, 'a'>(true)
		testType.equal<IsLiteral<1n, { selection: 'filter' }>, 1n>(true)
		testType.equal<IsLiteral<string, { selection: 'filter' }>, never>(true)
		testType.equal<IsLiteral<number, { selection: 'filter' }>, never>(true)
	})

	it('supports branching', () => {
		testType.equal<IsLiteral<1, IsLiteral.$Branch>, $Then>(true)
		testType.equal<IsLiteral<number, IsLiteral.$Branch>, $Else>(true)
	})
})
