import { it } from 'vitest'

import { type $Else, type $Then, type IsNotLiteral, testType } from '../index.js'

it('returns true for widened types', () => {
	testType.true<IsNotLiteral<number>>(true)
	testType.true<IsNotLiteral<string>>(true)
	testType.true<IsNotLiteral<boolean>>(true)
	testType.true<IsNotLiteral<bigint>>(true)
	testType.true<IsNotLiteral<symbol>>(true)
})

it('returns false for literals', () => {
	const someSymbol = Symbol()
	testType.false<IsNotLiteral<'a'>>(true)
	testType.false<IsNotLiteral<1>>(true)
	testType.false<IsNotLiteral<true>>(true)
	testType.false<IsNotLiteral<1n>>(true)
	testType.false<IsNotLiteral<typeof someSymbol>>(true)
})

it('can override the branches', () => {
	testType.equal<IsNotLiteral<string, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<IsNotLiteral<'a', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('resolves `IsNotLiteral.$Default` the same as no options', () => {
	// `IsNotLiteral.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsNotLiteral<string, IsNotLiteral.$Default>, IsNotLiteral<string>>(true)
	testType.equal<IsNotLiteral<'a', IsNotLiteral.$Default>, IsNotLiteral<'a'>>(true)
	testType.equal<IsNotLiteral<boolean, IsNotLiteral.$Default>, IsNotLiteral<boolean>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotLiteral<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotLiteral<'a', { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotLiteral<number, IsNotLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotLiteral<1, IsNotLiteral.$Branch>, $Else>(true)
})
