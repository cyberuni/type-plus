import { describe, it } from 'vitest'
import { type $Else, type $Then, type IsNotTemplateLiteral, testType } from '../index.js'

it('returns true for string', () => {
	testType.true<IsNotTemplateLiteral<string>>(true)
})

it('returns true if T is a string literal', () => {
	testType.true<IsNotTemplateLiteral<''>>(true)
	testType.true<IsNotTemplateLiteral<'a'>>(true)
})

it('returns false for template literal', () => {
	testType.false<IsNotTemplateLiteral<`${number}`>>(true)
	testType.true<IsNotTemplateLiteral<`${string}`>>(true)
	testType.false<IsNotTemplateLiteral<`${bigint}`>>(true)

	testType.false<IsNotTemplateLiteral<`a${number}`>>(true)
	testType.false<IsNotTemplateLiteral<`a${string}`>>(true)
	testType.false<IsNotTemplateLiteral<`a${bigint}`>>(true)

	testType.false<IsNotTemplateLiteral<`${number}c`>>(true)
	testType.false<IsNotTemplateLiteral<`${string}c`>>(true)
	testType.false<IsNotTemplateLiteral<`${bigint}c`>>(true)

	testType.false<IsNotTemplateLiteral<`a${number}c`>>(true)
	testType.false<IsNotTemplateLiteral<`a${string}c`>>(true)
	testType.false<IsNotTemplateLiteral<`a${bigint}c`>>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.true<IsNotTemplateLiteral<`${number | string | bigint}`>>(true)
	testType.false<IsNotTemplateLiteral<`a${number | string | bigint}`>>(true)
	testType.false<IsNotTemplateLiteral<`${number | string | bigint}c`>>(true)
})

it('returns true if T can be reduced to a string literal', () => {
	testType.true<IsNotTemplateLiteral<`${boolean}`>>(true)
	testType.true<IsNotTemplateLiteral<`a${1}`>>(true)
	testType.true<IsNotTemplateLiteral<`${1n}c`>>(true)
	testType.true<IsNotTemplateLiteral<`a${null}c`>>(true)
})

it('returns true for Uppercase or Lowercase string', () => {
	testType.true<IsNotTemplateLiteral<Uppercase<Lowercase<Uppercase<string>>>>>(true)
	testType.true<IsNotTemplateLiteral<Lowercase<Lowercase<Uppercase<string>>>>>(true)
})

it('returns true for Uppercase or Lowercase string literal', () => {
	testType.true<IsNotTemplateLiteral<Uppercase<'abc'>>>(true)
	testType.true<IsNotTemplateLiteral<Lowercase<'abc'>>>(true)
})

it('returns false for intrinsic manipulative types with template literal', () => {
	testType.false<IsNotTemplateLiteral<Uppercase<`${number}`>>>(true)
	testType.false<IsNotTemplateLiteral<Lowercase<`${bigint}`>>>(true)
	testType.false<IsNotTemplateLiteral<Capitalize<`a${number}`>>>(true)
	testType.false<IsNotTemplateLiteral<Uncapitalize<`${string}c`>>>(true)

	testType.false<IsNotTemplateLiteral<Uppercase<Uppercase<Lowercase<`a${number}c`>>>>>(true)
	testType.false<IsNotTemplateLiteral<Uppercase<Lowercase<Uppercase<`a${number}c`>>>>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotTemplateLiteral<any>>(true)
	testType.true<IsNotTemplateLiteral<unknown>>(true)
	testType.true<IsNotTemplateLiteral<void>>(true)
	testType.true<IsNotTemplateLiteral<never>>(true)
})

it('returns true for other types', () => {
	testType.true<IsNotTemplateLiteral<undefined>>(true)
	testType.true<IsNotTemplateLiteral<null>>(true)
	testType.true<IsNotTemplateLiteral<boolean>>(true)
	testType.true<IsNotTemplateLiteral<true>>(true)
	testType.true<IsNotTemplateLiteral<false>>(true)
	testType.true<IsNotTemplateLiteral<number>>(true)
	testType.true<IsNotTemplateLiteral<1>>(true)
	testType.true<IsNotTemplateLiteral<string>>(true)
	testType.true<IsNotTemplateLiteral<symbol>>(true)
	testType.true<IsNotTemplateLiteral<bigint>>(true)
	testType.true<IsNotTemplateLiteral<1n>>(true)
	testType.true<IsNotTemplateLiteral<{}>>(true)
	testType.true<IsNotTemplateLiteral<string[]>>(true)
	testType.true<IsNotTemplateLiteral<[]>>(true)
	testType.true<IsNotTemplateLiteral<Function>>(true)
	testType.true<IsNotTemplateLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<`${number}` | string, string>(true)
	testType.equal<IsNotTemplateLiteral<`${number}` | string>, true>(true)
	testType.equal<IsNotTemplateLiteral<`${number}` | number>, boolean>(true)
	testType.equal<IsNotTemplateLiteral<`${number}` | boolean>, boolean>(true)
	testType.equal<IsNotTemplateLiteral<`a${number}` | `${bigint}c`>, false>(true)

	testType.equal<IsNotTemplateLiteral<Uppercase<`${number}`> | number>, boolean>(true)
	testType.equal<IsNotTemplateLiteral<Lowercase<`${number}`> | 'abc'>, boolean>(true)
	testType.equal<IsNotTemplateLiteral<Capitalize<`a${number}` | `${bigint}c`>>, false>(true)
	testType.equal<IsNotTemplateLiteral<Uncapitalize<`${boolean}` | `${null}`>>, true>(true)
})

it('returns true for intersection type of non template literal and record', () => {
	testType.true<IsNotTemplateLiteral<123 & { a: 1 }>>(true)
	testType.true<IsNotTemplateLiteral<string & { a: 1 }>>(true)

	testType.true<IsNotTemplateLiteral<'' & { a: 1 }>>(true)
	testType.true<IsNotTemplateLiteral<'abc' & { a: 1 }>>(true)
	testType.true<IsNotTemplateLiteral<Uppercase<``> & { a: 1 }>>(true)
})

it('returns false for intersection type of template literal and record', () => {
	testType.false<IsNotTemplateLiteral<`a-${number}` & { a: 1 }>>(true)
	testType.false<IsNotTemplateLiteral<Uppercase<`${number}`> & { a: 1 }>>(true)
})

describe('disable distribution', () => {
	it('returns true for string', () => {
		testType.true<IsNotTemplateLiteral<string, { distributive: false }>>(true)
	})

	it('returns true if T is a string literal', () => {
		testType.true<IsNotTemplateLiteral<'', { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<'a', { distributive: false }>>(true)
	})

	it('returns false for template literal', () => {
		testType.false<IsNotTemplateLiteral<`${number}`, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<`a${string}`, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<`${bigint}c`, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<`a${number | string | bigint}`, { distributive: false }>>(true)
	})

	it('returns true if T can be reduced to a string literal', () => {
		testType.true<IsNotTemplateLiteral<`${''}`, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<`a${true}`, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<`${false}c`, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<`a${undefined}c`, { distributive: false }>>(true)
	})

	it('returns true for Uppercase or Lowercase string', () => {
		testType.true<IsNotTemplateLiteral<Uppercase<string>, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<Uppercase<Lowercase<Uppercase<string>>>, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<Lowercase<Uppercase<Lowercase<string>>>, { distributive: false }>>(true)
	})

	it('returns true for Uppercase or Lowercase string literal', () => {
		testType.true<IsNotTemplateLiteral<Uppercase<'abc'>, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<Lowercase<'foo'>, { distributive: false }>>(true)
	})

	it('returns false for Uppercase or Lowercase template literal', () => {
		testType.false<IsNotTemplateLiteral<Uppercase<`${number}`>, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<Uppercase<`a${string}`>, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<Uppercase<`${bigint}c`>, { distributive: false }>>(true)

		testType.false<IsNotTemplateLiteral<Lowercase<`${bigint}`>, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<Lowercase<`a${bigint}c`>, { distributive: false }>>(true)

		testType.false<IsNotTemplateLiteral<Uppercase<Uppercase<`a${number}c`>>, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<Uppercase<Lowercase<`a${number}c`>>, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<Uppercase<Uppercase<Lowercase<`a${number}c`>>>, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<Uppercase<Lowercase<Uppercase<`a${number}c`>>>, { distributive: false }>>(true)
	})

	it('returns true for special types', () => {
		testType.true<IsNotTemplateLiteral<any, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<unknown, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<void, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<never, { distributive: false }>>(true)
	})

	it('returns true for other types', () => {
		testType.true<IsNotTemplateLiteral<undefined, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<null, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<boolean, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<true, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<false, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<number, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<1, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<string, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<symbol, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<bigint, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<1n, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<{}, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<string[], { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<[], { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<Function, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<() => void, { distributive: false }>>(true)
	})

	it('distribute is disabled', () => {
		testType.equal<IsNotTemplateLiteral<`${number}` | number, { distributive: false }>, true>(true)
		testType.equal<IsNotTemplateLiteral<Uppercase<`${number}`> | number, { distributive: false }>, true>(true)
		testType.equal<IsNotTemplateLiteral<Lowercase<`${number}`> | 'abc', { distributive: false }>, true>(true)
		testType.equal<IsNotTemplateLiteral<Capitalize<`a${number}` | `${bigint}c`>, { distributive: false }>, false>(true)
		testType.equal<IsNotTemplateLiteral<Uncapitalize<`${boolean}` | `${null}`>, { distributive: false }>, true>(true)
	})

	it('returns true for intersection type of non template literal and record', () => {
		testType.true<IsNotTemplateLiteral<123 & { a: 1 }, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<string & { a: 1 }, { distributive: false }>>(true)

		testType.true<IsNotTemplateLiteral<'' & { a: 1 }, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<'abc' & { a: 1 }, { distributive: false }>>(true)
		testType.true<IsNotTemplateLiteral<Uppercase<``> & { a: 1 }, { distributive: false }>>(true)
	})

	it('returns false for intersection type of template literal and record', () => {
		testType.false<IsNotTemplateLiteral<`a-${number}` & { a: 1 }, { distributive: false }>>(true)
		testType.false<IsNotTemplateLiteral<Uppercase<`${number}`> & { a: 1 }, { distributive: false }>>(true)
	})
})

it('works as filter', () => {
	testType.equal<IsNotTemplateLiteral<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotTemplateLiteral<'', { selection: 'filter' }>, ''>(true)
	testType.equal<IsNotTemplateLiteral<`${number}`, { selection: 'filter' }>, never>(true)

	testType.equal<IsNotTemplateLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTemplateLiteral<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotTemplateLiteral<string | number, { selection: 'filter' }>, string | number>(true)
	testType.equal<IsNotTemplateLiteral<`${number}` | number, { selection: 'filter' }>, number>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotTemplateLiteral<string, IsNotTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotTemplateLiteral<'a', IsNotTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotTemplateLiteral<`${number}`, IsNotTemplateLiteral.$Branch>, $Else>(true)

	testType.equal<IsNotTemplateLiteral<bigint, IsNotTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotTemplateLiteral<any, IsNotTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotTemplateLiteral<unknown, IsNotTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotTemplateLiteral<never, IsNotTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotTemplateLiteral<void, IsNotTemplateLiteral.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotTemplateLiteral<any>, true>(true)
	testType.equal<IsNotTemplateLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotTemplateLiteral<unknown>, true>(true)
	testType.equal<IsNotTemplateLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotTemplateLiteral<never>, true>(true)
	testType.equal<IsNotTemplateLiteral<never, { $never: unknown }>, unknown>(true)
})
