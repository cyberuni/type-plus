import { describe, it } from 'vitest'
import { type $Else, type $Then, type IsTemplateLiteral, testType } from '../index.js'

it('returns false for string', () => {
	testType.false<IsTemplateLiteral<string>>(true)
})

it('returns false if T is a string literal', () => {
	testType.false<IsTemplateLiteral<''>>(true)
	testType.false<IsTemplateLiteral<'a'>>(true)
})

it('returns true for template literal', () => {
	testType.true<IsTemplateLiteral<`${number}`>>(true)
	testType.false<IsTemplateLiteral<`${string}`>>(true)
	testType.true<IsTemplateLiteral<`${bigint}`>>(true)

	testType.true<IsTemplateLiteral<`a${number}`>>(true)
	testType.true<IsTemplateLiteral<`a${string}`>>(true)
	testType.true<IsTemplateLiteral<`a${bigint}`>>(true)

	testType.true<IsTemplateLiteral<`${number}c`>>(true)
	testType.true<IsTemplateLiteral<`${string}c`>>(true)
	testType.true<IsTemplateLiteral<`${bigint}c`>>(true)

	testType.true<IsTemplateLiteral<`a${number}c`>>(true)
	testType.true<IsTemplateLiteral<`a${string}c`>>(true)
	testType.true<IsTemplateLiteral<`a${bigint}c`>>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.false<IsTemplateLiteral<`${number | string | bigint}`>>(true)
	testType.true<IsTemplateLiteral<`a${number | string | bigint}`>>(true)
	testType.true<IsTemplateLiteral<`${number | string | bigint}c`>>(true)
})

it('returns false if T can be reduced to a string literal', () => {
	testType.false<IsTemplateLiteral<`${''}`>>(true)
	testType.false<IsTemplateLiteral<`${'b'}`>>(true)
	testType.false<IsTemplateLiteral<`${boolean}`>>(true)
	testType.false<IsTemplateLiteral<`${true}`>>(true)
	testType.false<IsTemplateLiteral<`${false}`>>(true)
	testType.false<IsTemplateLiteral<`${1}`>>(true)
	testType.false<IsTemplateLiteral<`${1.1}`>>(true)
	testType.false<IsTemplateLiteral<`${-1}`>>(true)
	testType.false<IsTemplateLiteral<`${1n}`>>(true)
	testType.false<IsTemplateLiteral<`${null}`>>(true)
	testType.false<IsTemplateLiteral<`${undefined}`>>(true)

	testType.false<IsTemplateLiteral<`a${'b'}`>>(true)
	testType.false<IsTemplateLiteral<`a${boolean}`>>(true)
	testType.false<IsTemplateLiteral<`a${true}`>>(true)
	testType.false<IsTemplateLiteral<`a${false}`>>(true)
	testType.false<IsTemplateLiteral<`a${1}`>>(true)
	testType.false<IsTemplateLiteral<`a${1.1}`>>(true)
	testType.false<IsTemplateLiteral<`a${-1}`>>(true)
	testType.false<IsTemplateLiteral<`a${1n}`>>(true)
	testType.false<IsTemplateLiteral<`a${null}`>>(true)
	testType.false<IsTemplateLiteral<`a${undefined}`>>(true)

	testType.false<IsTemplateLiteral<`${'b'}c`>>(true)
	testType.false<IsTemplateLiteral<`${boolean}c`>>(true)
	testType.false<IsTemplateLiteral<`${true}c`>>(true)
	testType.false<IsTemplateLiteral<`${false}c`>>(true)
	testType.false<IsTemplateLiteral<`${1}c`>>(true)
	testType.false<IsTemplateLiteral<`${1.1}c`>>(true)
	testType.false<IsTemplateLiteral<`${-1}c`>>(true)
	testType.false<IsTemplateLiteral<`${1n}c`>>(true)
	testType.false<IsTemplateLiteral<`${null}c`>>(true)
	testType.false<IsTemplateLiteral<`${undefined}c`>>(true)

	testType.false<IsTemplateLiteral<`a${'b'}c`>>(true)
	testType.false<IsTemplateLiteral<`a${boolean}c`>>(true)
	testType.false<IsTemplateLiteral<`a${true}c`>>(true)
	testType.false<IsTemplateLiteral<`a${false}c`>>(true)
	testType.false<IsTemplateLiteral<`a${1}c`>>(true)
	testType.false<IsTemplateLiteral<`a${1.1}c`>>(true)
	testType.false<IsTemplateLiteral<`a${-1}c`>>(true)
	testType.false<IsTemplateLiteral<`a${1n}c`>>(true)
	testType.false<IsTemplateLiteral<`a${null}c`>>(true)
	testType.false<IsTemplateLiteral<`a${undefined}c`>>(true)
})

it('returns false for Uppercase or Lowercase string', () => {
	testType.false<IsTemplateLiteral<Uppercase<string>>>(true)
	testType.false<IsTemplateLiteral<Uppercase<Uppercase<string>>>>(true)
	testType.false<IsTemplateLiteral<Uppercase<Lowercase<string>>>>(true)
	testType.false<IsTemplateLiteral<Uppercase<Uppercase<Lowercase<string>>>>>(true)
	testType.false<IsTemplateLiteral<Uppercase<Lowercase<Uppercase<string>>>>>(true)

	testType.false<IsTemplateLiteral<Lowercase<string>>>(true)
	testType.false<IsTemplateLiteral<Lowercase<Lowercase<string>>>>(true)
	testType.false<IsTemplateLiteral<Lowercase<Uppercase<string>>>>(true)
	testType.false<IsTemplateLiteral<Lowercase<Lowercase<Uppercase<string>>>>>(true)
	testType.false<IsTemplateLiteral<Lowercase<Uppercase<Lowercase<string>>>>>(true)
})

it('returns false for Uppercase or Lowercase string literal', () => {
	testType.false<IsTemplateLiteral<Uppercase<'abc'>>>(true)
	testType.false<IsTemplateLiteral<Uppercase<'foo'>>>(true)

	testType.false<IsTemplateLiteral<Lowercase<'abc'>>>(true)
	testType.false<IsTemplateLiteral<Lowercase<'foo'>>>(true)
})

it('returns true for intrinsic manipulative types with template literal', () => {
	testType.true<IsTemplateLiteral<Uppercase<`${number}`>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`${bigint}`>>>(true)

	testType.true<IsTemplateLiteral<Uppercase<`a${number}`>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`a${string}`>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`a${bigint}`>>>(true)

	testType.true<IsTemplateLiteral<Uppercase<`${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Uppercase<`a${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`a${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`a${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Lowercase<`${number}`>>>(true)
	testType.true<IsTemplateLiteral<Lowercase<`${bigint}`>>>(true)

	testType.true<IsTemplateLiteral<Lowercase<`a${number}`>>>(true)
	testType.true<IsTemplateLiteral<Lowercase<`a${string}`>>>(true)
	testType.true<IsTemplateLiteral<Lowercase<`a${bigint}`>>>(true)

	testType.true<IsTemplateLiteral<Lowercase<`${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Lowercase<`${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Lowercase<`${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Lowercase<`a${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Lowercase<`a${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Lowercase<`a${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Capitalize<`${number}`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`${bigint}`>>>(true)

	testType.true<IsTemplateLiteral<Capitalize<`a${number}`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`a${string}`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`a${bigint}`>>>(true)

	testType.true<IsTemplateLiteral<Capitalize<`${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Capitalize<`.${number}`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`a${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`a${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Capitalize<`a${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Uncapitalize<`a${number}`>>>(true)
	testType.true<IsTemplateLiteral<Uncapitalize<`a${string}`>>>(true)
	testType.true<IsTemplateLiteral<Uncapitalize<`a${bigint}`>>>(true)

	testType.true<IsTemplateLiteral<Uncapitalize<`${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Uncapitalize<`${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Uncapitalize<`${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Uncapitalize<`.${number}`>>>(true)
	testType.true<IsTemplateLiteral<Uncapitalize<`a${number}c`>>>(true)
	testType.true<IsTemplateLiteral<Uncapitalize<`a${string}c`>>>(true)
	testType.true<IsTemplateLiteral<Uncapitalize<`a${bigint}c`>>>(true)

	testType.true<IsTemplateLiteral<Uppercase<Uppercase<`a${number}c`>>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<Lowercase<`a${number}c`>>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<Uppercase<Lowercase<`a${number}c`>>>>>(true)
	testType.true<IsTemplateLiteral<Uppercase<Lowercase<Uppercase<`a${number}c`>>>>>(true)
})

it('returns false for special types', () => {
	testType.false<IsTemplateLiteral<any>>(true)
	testType.false<IsTemplateLiteral<unknown>>(true)
	testType.false<IsTemplateLiteral<void>>(true)
	testType.false<IsTemplateLiteral<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsTemplateLiteral<undefined>>(true)
	testType.false<IsTemplateLiteral<null>>(true)
	testType.false<IsTemplateLiteral<boolean>>(true)
	testType.false<IsTemplateLiteral<true>>(true)
	testType.false<IsTemplateLiteral<false>>(true)
	testType.false<IsTemplateLiteral<number>>(true)
	testType.false<IsTemplateLiteral<1>>(true)
	testType.false<IsTemplateLiteral<string>>(true)
	testType.false<IsTemplateLiteral<symbol>>(true)
	testType.false<IsTemplateLiteral<bigint>>(true)
	testType.false<IsTemplateLiteral<1n>>(true)
	testType.false<IsTemplateLiteral<{}>>(true)
	testType.false<IsTemplateLiteral<string[]>>(true)
	testType.false<IsTemplateLiteral<[]>>(true)
	testType.false<IsTemplateLiteral<Function>>(true)
	testType.false<IsTemplateLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<`${number}` | string, string>(true)
	testType.equal<IsTemplateLiteral<`${number}` | string>, false>(true)
	testType.equal<IsTemplateLiteral<`${number}` | number>, boolean>(true)
	testType.equal<IsTemplateLiteral<`${number}` | 'abc'>, boolean>(true)
	testType.equal<IsTemplateLiteral<`${number}` | boolean>, boolean>(true)
	testType.equal<IsTemplateLiteral<`a${number}` | `${bigint}c`>, true>(true)
	testType.equal<IsTemplateLiteral<`${boolean}` | `${null}`>, false>(true)

	testType.equal<IsTemplateLiteral<Uppercase<`${number}`> | number>, boolean>(true)
	testType.equal<IsTemplateLiteral<Lowercase<`${number}`> | 'abc'>, boolean>(true)
	testType.equal<IsTemplateLiteral<Capitalize<`a${number}` | `${bigint}c`>>, true>(true)
	testType.equal<IsTemplateLiteral<Uncapitalize<`${boolean}` | `${null}`>>, false>(true)
})

it('returns false for intersection type of non template literal and record', () => {
	testType.false<IsTemplateLiteral<123 & { a: 1 }>>(true)
	testType.false<IsTemplateLiteral<string & { a: 1 }>>(true)

	// @ts-expect-error https://github.com/microsoft/TypeScript/issues/57918
	testType.false<IsTemplateLiteral<'' & { a: 1 }>>(true)
	// @ts-expect-error https://github.com/microsoft/TypeScript/issues/57918
	testType.false<IsTemplateLiteral<'abc' & { a: 1 }>>(true)
	// @ts-expect-error https://github.com/microsoft/TypeScript/issues/57918
	testType.false<IsTemplateLiteral<Uppercase<``> & { a: 1 }>>(true)
})

it('returns true for intersection type of template literal and record', () => {
	testType.true<IsTemplateLiteral<`a-${number}` & { a: 1 }>>(true)
	testType.true<IsTemplateLiteral<Uppercase<`${number}`> & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsTemplateLiteral<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsTemplateLiteral<'', { selection: 'filter' }>, never>(true)
	testType.equal<IsTemplateLiteral<`${number}`, { selection: 'filter' }>, `${number}`>(true)

	testType.equal<IsTemplateLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsTemplateLiteral<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsTemplateLiteral<string | number, { selection: 'filter' }>, never>(true)
	testType.equal<IsTemplateLiteral<`${number}` | number, { selection: 'filter' }>, `${number}`>(true)
})

it('works with unique branches', () => {
	testType.equal<IsTemplateLiteral<string, IsTemplateLiteral.$Branch>, $Else>(true)
	testType.equal<IsTemplateLiteral<'a', IsTemplateLiteral.$Branch>, $Else>(true)
	testType.equal<IsTemplateLiteral<`${number}`, IsTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsTemplateLiteral<`${number}`, { $then: String; $else: never }>, String>(true)

	testType.equal<IsTemplateLiteral<bigint, IsTemplateLiteral.$Branch>, $Else>(true)
	testType.equal<IsTemplateLiteral<any, IsTemplateLiteral.$Branch>, $Else>(true)
	testType.equal<IsTemplateLiteral<unknown, IsTemplateLiteral.$Branch>, $Else>(true)
	testType.equal<IsTemplateLiteral<never, IsTemplateLiteral.$Branch>, $Else>(true)
	testType.equal<IsTemplateLiteral<void, IsTemplateLiteral.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsTemplateLiteral<any>, false>(true)
	testType.equal<IsTemplateLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsTemplateLiteral<unknown>, false>(true)
	testType.equal<IsTemplateLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsTemplateLiteral<never>, false>(true)
	testType.equal<IsTemplateLiteral<never, { $never: unknown }>, unknown>(true)
})

describe('disable distribution', () => {
	it('returns false for string', () => {
		testType.false<IsTemplateLiteral<string, { distributive: false }>>(true)
	})

	it('returns false if T is a string literal', () => {
		testType.false<IsTemplateLiteral<'', { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<'a', { distributive: false }>>(true)
	})

	it('returns true for template literal', () => {
		testType.true<IsTemplateLiteral<`${number}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${string}`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`${bigint}`, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<`a${number}`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`a${string}`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`a${bigint}`, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<`${number}c`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`${string}c`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`${bigint}c`, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<`a${number}c`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`a${string}c`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`a${bigint}c`, { distributive: false }>>(true)

		testType.equal<`${number | string | bigint}`, string>(true)
		testType.false<IsTemplateLiteral<`${number | string | bigint}`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`a${number | string | bigint}`, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<`${number | string | bigint}c`, { distributive: false }>>(true)
	})

	it('returns false if T can be reduced to a string literal', () => {
		testType.false<IsTemplateLiteral<`${''}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${'b'}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${boolean}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${true}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${false}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${1}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${1.1}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${-1}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${1n}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${null}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${undefined}`, { distributive: false }>>(true)

		testType.false<IsTemplateLiteral<`a${'b'}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${boolean}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${true}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${false}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${1}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${1.1}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${-1}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${1n}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${null}`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${undefined}`, { distributive: false }>>(true)

		testType.false<IsTemplateLiteral<`${'b'}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${boolean}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${true}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${false}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${1}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${1.1}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${-1}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${1n}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${null}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`${undefined}c`, { distributive: false }>>(true)

		testType.false<IsTemplateLiteral<`a${'b'}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${boolean}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${true}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${false}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${1}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${1.1}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${-1}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${1n}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${null}c`, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<`a${undefined}c`, { distributive: false }>>(true)
	})

	it('returns false for Uppercase or Lowercase string', () => {
		testType.false<IsTemplateLiteral<Uppercase<string>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Uppercase<Uppercase<string>>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Uppercase<Lowercase<string>>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Uppercase<Uppercase<Lowercase<string>>>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Uppercase<Lowercase<Uppercase<string>>>, { distributive: false }>>(true)

		testType.false<IsTemplateLiteral<Lowercase<string>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Lowercase<Lowercase<string>>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Lowercase<Uppercase<string>>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Lowercase<Lowercase<Uppercase<string>>>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Lowercase<Uppercase<Lowercase<string>>>, { distributive: false }>>(true)
	})

	it('returns false for Uppercase or Lowercase string literal', () => {
		testType.false<IsTemplateLiteral<Uppercase<'abc'>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Uppercase<'foo'>, { distributive: false }>>(true)

		testType.false<IsTemplateLiteral<Lowercase<'abc'>, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Lowercase<'foo'>, { distributive: false }>>(true)
	})

	it('returns true for Uppercase or Lowercase template literal', () => {
		testType.true<IsTemplateLiteral<Uppercase<`${number}`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`${bigint}`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Uppercase<`a${number}`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`a${string}`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`a${bigint}`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Uppercase<`${number}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`${string}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`${bigint}c`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Uppercase<`a${number}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`a${string}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`a${bigint}c`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Lowercase<`${number}`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Lowercase<`${bigint}`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Lowercase<`a${number}`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Lowercase<`a${string}`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Lowercase<`a${bigint}`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Lowercase<`${number}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Lowercase<`${string}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Lowercase<`${bigint}c`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Lowercase<`a${number}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Lowercase<`a${string}c`>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Lowercase<`a${bigint}c`>, { distributive: false }>>(true)

		testType.true<IsTemplateLiteral<Uppercase<Uppercase<`a${number}c`>>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<Lowercase<`a${number}c`>>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<Uppercase<Lowercase<`a${number}c`>>>, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<Lowercase<Uppercase<`a${number}c`>>>, { distributive: false }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsTemplateLiteral<any, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<unknown, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<void, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<never, { distributive: false }>>(true)
	})

	it('returns false for other types', () => {
		testType.false<IsTemplateLiteral<undefined, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<null, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<boolean, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<true, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<false, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<number, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<1, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<string, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<symbol, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<bigint, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<1n, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<{}, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<string[], { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<[], { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<Function, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<() => void, { distributive: false }>>(true)
	})

	it('distribute is disabled', () => {
		testType.equal<`${number}` | string, string>(true)
		testType.equal<IsTemplateLiteral<`${number}` | string, { distributive: false }>, false>(true)
		testType.equal<IsTemplateLiteral<`${number}` | number, { distributive: false }>, false>(true)
		testType.equal<IsTemplateLiteral<`${number}` | 'abc', { distributive: false }>, false>(true)
		testType.equal<IsTemplateLiteral<`a${number}` | `${bigint}c`, { distributive: false }>, true>(true)
		testType.equal<IsTemplateLiteral<`${boolean}` | `${null}`, { distributive: false }>, false>(true)

		testType.equal<IsTemplateLiteral<Uppercase<`${number}`> | number, { distributive: false }>, false>(true)
		testType.equal<IsTemplateLiteral<Lowercase<`${number}`> | 'abc', { distributive: false }>, false>(true)
		testType.equal<IsTemplateLiteral<Capitalize<`a${number}` | `${bigint}c`>, { distributive: false }>, true>(true)
		testType.equal<IsTemplateLiteral<Uncapitalize<`${boolean}` | `${null}`>, { distributive: false }>, false>(true)
	})

	it('returns false for intersection type of non template literal and record', () => {
		testType.false<IsTemplateLiteral<123 & { a: 1 }, { distributive: false }>>(true)
		testType.false<IsTemplateLiteral<string & { a: 1 }, { distributive: false }>>(true)

		// @ts-expect-error https://github.com/microsoft/TypeScript/issues/57918
		testType.false<IsTemplateLiteral<'' & { a: 1 }, { distributive: false }>>(true)
		// @ts-expect-error https://github.com/microsoft/TypeScript/issues/57918
		testType.false<IsTemplateLiteral<'abc' & { a: 1 }, { distributive: false }>>(true)
		// @ts-expect-error https://github.com/microsoft/TypeScript/issues/57918
		testType.false<IsTemplateLiteral<Uppercase<``> & { a: 1 }, { distributive: false }>>(true)
	})

	it('returns true for intersection type of template literal and record', () => {
		testType.true<IsTemplateLiteral<`a-${number}` & { a: 1 }, { distributive: false }>>(true)
		testType.true<IsTemplateLiteral<Uppercase<`${number}`> & { a: 1 }, { distributive: false }>>(true)
	})
})
