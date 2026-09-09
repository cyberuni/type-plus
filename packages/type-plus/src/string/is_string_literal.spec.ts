import { describe, it } from 'vitest'
import { type $Else, type $Then, type IsStringLiteral, testType } from '../index.js'

it('returns false for string', () => {
	testType.false<IsStringLiteral<string>>(true)
	testType.equal<`${string}`, string>(true)
	testType.false<IsStringLiteral<`${string}`>>(true)
})

it('returns true if T is a string literal', () => {
	testType.true<IsStringLiteral<''>>(true)
	testType.true<IsStringLiteral<'a'>>(true)
})

it('considers template literal as a subset of string literal', () => {
	testType.true<IsStringLiteral<`${''}`>>(true)
	testType.true<IsStringLiteral<`${'b'}`>>(true)
	testType.true<IsStringLiteral<`${boolean}`>>(true)
	testType.true<IsStringLiteral<`${true}`>>(true)
	testType.true<IsStringLiteral<`${false}`>>(true)
	testType.true<IsStringLiteral<`${number}`>>(true)
	testType.true<IsStringLiteral<`${1}`>>(true)
	testType.true<IsStringLiteral<`${1.1}`>>(true)
	testType.true<IsStringLiteral<`${-1}`>>(true)
	testType.true<IsStringLiteral<`${bigint}`>>(true)
	testType.true<IsStringLiteral<`${1n}`>>(true)
	testType.true<IsStringLiteral<`${null}`>>(true)
	testType.true<IsStringLiteral<`${undefined}`>>(true)

	testType.true<IsStringLiteral<`a${'b'}`>>(true)
	testType.true<IsStringLiteral<`a${boolean}`>>(true)
	testType.true<IsStringLiteral<`a${true}`>>(true)
	testType.true<IsStringLiteral<`a${false}`>>(true)
	testType.true<IsStringLiteral<`a${number}`>>(true)
	testType.true<IsStringLiteral<`a${1}`>>(true)
	testType.true<IsStringLiteral<`a${1.1}`>>(true)
	testType.true<IsStringLiteral<`a${-1}`>>(true)
	testType.true<IsStringLiteral<`a${string}`>>(true)
	testType.true<IsStringLiteral<`a${bigint}`>>(true)
	testType.true<IsStringLiteral<`a${1n}`>>(true)
	testType.true<IsStringLiteral<`a${null}`>>(true)
	testType.true<IsStringLiteral<`a${undefined}`>>(true)

	testType.true<IsStringLiteral<`${'b'}c`>>(true)
	testType.true<IsStringLiteral<`${boolean}c`>>(true)
	testType.true<IsStringLiteral<`${true}c`>>(true)
	testType.true<IsStringLiteral<`${false}c`>>(true)
	testType.true<IsStringLiteral<`${number}c`>>(true)
	testType.true<IsStringLiteral<`${1}c`>>(true)
	testType.true<IsStringLiteral<`${1.1}c`>>(true)
	testType.true<IsStringLiteral<`${-1}c`>>(true)
	testType.true<IsStringLiteral<`${string}c`>>(true)
	testType.true<IsStringLiteral<`${bigint}c`>>(true)
	testType.true<IsStringLiteral<`${1n}c`>>(true)
	testType.true<IsStringLiteral<`${null}c`>>(true)
	testType.true<IsStringLiteral<`${undefined}c`>>(true)

	testType.true<IsStringLiteral<`a${'b'}c`>>(true)
	testType.true<IsStringLiteral<`a${boolean}c`>>(true)
	testType.true<IsStringLiteral<`a${true}c`>>(true)
	testType.true<IsStringLiteral<`a${false}c`>>(true)
	testType.true<IsStringLiteral<`a${number}c`>>(true)
	testType.true<IsStringLiteral<`a${1}c`>>(true)
	testType.true<IsStringLiteral<`a${1.1}c`>>(true)
	testType.true<IsStringLiteral<`a${-1}c`>>(true)
	testType.true<IsStringLiteral<`a${string}c`>>(true)
	testType.true<IsStringLiteral<`a${bigint}c`>>(true)
	testType.true<IsStringLiteral<`a${1n}c`>>(true)
	testType.true<IsStringLiteral<`a${null}c`>>(true)
	testType.true<IsStringLiteral<`a${undefined}c`>>(true)
})

it('returns true for Uppercase string literal', () => {
	testType.true<IsStringLiteral<Uppercase<'abc'>>>(true)
	testType.true<IsStringLiteral<Uppercase<'foo'>>>(true)
})

it('returns true for Uppercase template literal', () => {
	testType.true<IsStringLiteral<Uppercase<`${''}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${'b'}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${boolean}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${true}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${false}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${number}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${1}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${1.1}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${-1}`>>>(true)
	testType.false<IsStringLiteral<Uppercase<`${string}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${bigint}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${1n}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${null}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${undefined}`>>>(true)

	testType.true<IsStringLiteral<Uppercase<`a${'b'}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${boolean}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${true}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${false}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${number}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${1}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${1.1}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${-1}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${string}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${bigint}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${1n}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${null}`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`a${undefined}`>>>(true)

	testType.true<IsStringLiteral<Uppercase<`${'b'}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${boolean}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${true}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${false}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${number}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${1}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${1.1}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${-1}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${string}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${bigint}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${1n}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${null}c`>>>(true)
	testType.true<IsStringLiteral<Uppercase<`${undefined}c`>>>(true)
})

it('returns false for Uppercase string', () => {
	testType.false<IsStringLiteral<Uppercase<string>>>(true)
	testType.false<IsStringLiteral<Uppercase<Uppercase<string>>>>(true)
	testType.false<IsStringLiteral<Uppercase<Lowercase<string>>>>(true)
	testType.false<IsStringLiteral<Uppercase<Uppercase<Lowercase<string>>>>>(true)
	testType.false<IsStringLiteral<Uppercase<Lowercase<Uppercase<string>>>>>(true)
})

it('returns true for Lowercase string literal', () => {
	testType.true<IsStringLiteral<Lowercase<'abc'>>>(true)
	testType.true<IsStringLiteral<Lowercase<'foo'>>>(true)
})

it('returns true for Lowercase template literal', () => {
	testType.true<IsStringLiteral<Lowercase<`${''}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${'b'}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${boolean}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${true}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${false}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${number}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${1}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${1.1}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${-1}`>>>(true)
	testType.false<IsStringLiteral<Lowercase<`${string}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${bigint}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${1n}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${null}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${undefined}`>>>(true)

	testType.true<IsStringLiteral<Lowercase<`a${'b'}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${boolean}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${true}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${false}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${number}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${1}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${1.1}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${-1}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${string}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${bigint}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${1n}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${null}`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`a${undefined}`>>>(true)

	testType.true<IsStringLiteral<Lowercase<`${'b'}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${boolean}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${true}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${false}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${number}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${1}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${1.1}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${-1}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${string}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${bigint}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${1n}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${null}c`>>>(true)
	testType.true<IsStringLiteral<Lowercase<`${undefined}c`>>>(true)
})

it('returns false for Lowercase string', () => {
	testType.false<IsStringLiteral<Lowercase<string>>>(true)
	testType.false<IsStringLiteral<Lowercase<Lowercase<string>>>>(true)
	testType.false<IsStringLiteral<Lowercase<Uppercase<string>>>>(true)
	testType.false<IsStringLiteral<Lowercase<Lowercase<Uppercase<string>>>>>(true)
	testType.false<IsStringLiteral<Lowercase<Uppercase<Lowercase<string>>>>>(true)
})

it('returns false for special types', () => {
	testType.false<IsStringLiteral<void>>(true)
	testType.false<IsStringLiteral<unknown>>(true)
	testType.false<IsStringLiteral<any>>(true)
	testType.false<IsStringLiteral<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsStringLiteral<undefined>>(true)
	testType.false<IsStringLiteral<null>>(true)
	testType.false<IsStringLiteral<boolean>>(true)
	testType.false<IsStringLiteral<true>>(true)
	testType.false<IsStringLiteral<false>>(true)
	testType.false<IsStringLiteral<number>>(true)
	testType.false<IsStringLiteral<-1>>(true)
	testType.false<IsStringLiteral<0>>(true)
	testType.false<IsStringLiteral<1>>(true)
	testType.false<IsStringLiteral<1.1>>(true)
	testType.false<IsStringLiteral<string>>(true)
	testType.false<IsStringLiteral<bigint>>(true)
	testType.false<IsStringLiteral<-1n>>(true)
	testType.false<IsStringLiteral<0n>>(true)
	testType.false<IsStringLiteral<1n>>(true)
	testType.false<IsStringLiteral<symbol>>(true)
	testType.false<IsStringLiteral<{}>>(true)
	testType.false<IsStringLiteral<string[]>>(true)
	testType.false<IsStringLiteral<[]>>(true)
	testType.false<IsStringLiteral<Function>>(true)
	testType.false<IsStringLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsStringLiteral<string | number>, false>(true)
	testType.equal<IsStringLiteral<'a' | number>, boolean>(true)
	testType.equal<IsStringLiteral<'a' | boolean>, boolean>(true)
})

it('returns false for intersection type of non string literal and record', () => {
	testType.false<IsStringLiteral<123 & { a: 1 }>>(true)
	testType.false<IsStringLiteral<string & { a: 1 }>>(true)
})

it('consider intersection type of template literal and record as string literal', () => {
	testType.true<IsStringLiteral<`a-${number}` & { a: 1 }>>(true)
})

it('returns true for intersection type of string literal and record', () => {
	testType.true<IsStringLiteral<'' & { a: 1 }>>(true)
	testType.true<IsStringLiteral<'abc' & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsStringLiteral<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsStringLiteral<'', { selection: 'filter' }>, ''>(true)

	testType.equal<IsStringLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStringLiteral<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStringLiteral<string | number, { selection: 'filter' }>, never>(true)

	testType.equal<IsStringLiteral<'' | 1, { selection: 'filter' }>, ''>(true)
	testType.equal<IsStringLiteral<'a' | boolean, { selection: 'filter' }>, 'a'>(true)
})

it('works with unique branches', () => {
	testType.equal<IsStringLiteral<string, IsStringLiteral.$Branch>, $Else>(true)
	testType.equal<IsStringLiteral<'a', IsStringLiteral.$Branch>, $Then>(true)
	testType.equal<IsStringLiteral<'a', { $then: String; $else: never }>, String>(true)

	testType.equal<IsStringLiteral<any, IsStringLiteral.$Branch>, $Else>(true)
	testType.equal<IsStringLiteral<unknown, IsStringLiteral.$Branch>, $Else>(true)
	testType.equal<IsStringLiteral<never, IsStringLiteral.$Branch>, $Else>(true)
	testType.equal<IsStringLiteral<void, IsStringLiteral.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsStringLiteral<any>, false>(true)
	testType.equal<IsStringLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsStringLiteral<unknown>, false>(true)
	testType.equal<IsStringLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsStringLiteral<never>, false>(true)
	testType.equal<IsStringLiteral<never, { $never: unknown }>, unknown>(true)
})

describe('disable distribution', () => {
	it('returns false for string', () => {
		testType.false<IsStringLiteral<string, { distributive: false }>>(true)
	})

	it('returns true if T is a string literal', () => {
		testType.true<IsStringLiteral<'', { distributive: false }>>(true)
		testType.true<IsStringLiteral<'a', { distributive: false }>>(true)
	})

	it('returns true if T is a template literal', () => {
		testType.true<IsStringLiteral<`${''}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${'b'}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${boolean}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${true}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${false}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${number}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${1}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${1.1}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${-1}`, { distributive: false }>>(true)
		testType.false<IsStringLiteral<`${string}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${bigint}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${1n}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${null}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${undefined}`, { distributive: false }>>(true)

		testType.true<IsStringLiteral<`a${'b'}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${boolean}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${true}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${false}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${number}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${1}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${1.1}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${-1}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${string}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${bigint}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${1n}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${null}`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${undefined}`, { distributive: false }>>(true)

		testType.true<IsStringLiteral<`${'b'}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${boolean}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${true}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${false}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${number}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${1}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${1.1}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${-1}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${string}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${bigint}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${1n}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${null}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`${undefined}c`, { distributive: false }>>(true)

		testType.true<IsStringLiteral<`a${'b'}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${boolean}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${true}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${false}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${number}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${1}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${1.1}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${-1}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${string}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${bigint}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${1n}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${null}c`, { distributive: false }>>(true)
		testType.true<IsStringLiteral<`a${undefined}c`, { distributive: false }>>(true)
	})

	it('returns true for Uppercase string literal', () => {
		testType.true<IsStringLiteral<Uppercase<'abc'>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<'foo'>, { distributive: false }>>(true)
	})

	it('returns true for Uppercase template literal', () => {
		testType.true<IsStringLiteral<Uppercase<`${''}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${'b'}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${boolean}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${true}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${false}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${number}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${1.1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${-1}`>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Uppercase<`${string}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${bigint}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${1n}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${null}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${undefined}`>, { distributive: false }>>(true)

		testType.true<IsStringLiteral<Uppercase<`a${'b'}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${boolean}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${true}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${false}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${number}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${1.1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${-1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${string}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${bigint}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${1n}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${null}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${undefined}`>, { distributive: false }>>(true)

		testType.true<IsStringLiteral<Uppercase<`${'b'}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${boolean}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${true}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${false}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${number}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${1.1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${-1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${string}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${bigint}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${1n}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${null}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`${undefined}c`>, { distributive: false }>>(true)

		testType.true<IsStringLiteral<Uppercase<`a${'b'}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${boolean}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${true}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${false}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${number}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${1.1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${-1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${string}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${bigint}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${1n}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${null}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Uppercase<`a${undefined}c`>, { distributive: false }>>(true)
	})

	it('returns false for Uppercase string', () => {
		testType.false<IsStringLiteral<Uppercase<string>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Uppercase<Uppercase<string>>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Uppercase<Lowercase<string>>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Uppercase<Uppercase<Lowercase<string>>>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Uppercase<Lowercase<Uppercase<string>>>, { distributive: false }>>(true)
	})

	it('returns true for Lowercase string literal', () => {
		testType.true<IsStringLiteral<Lowercase<'abc'>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<'foo'>, { distributive: false }>>(true)
	})

	it('returns true for Lowercase template literal', () => {
		testType.true<IsStringLiteral<Lowercase<`${'b'}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${boolean}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${true}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${false}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${number}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${1.1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${-1}`>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Lowercase<`${string}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${bigint}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${1n}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${null}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${undefined}`>, { distributive: false }>>(true)

		testType.true<IsStringLiteral<Lowercase<`a${'b'}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${boolean}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${true}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${false}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${number}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${1.1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${-1}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${string}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${bigint}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${1n}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${null}`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${undefined}`>, { distributive: false }>>(true)

		testType.true<IsStringLiteral<Lowercase<`${'b'}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${boolean}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${true}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${false}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${number}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${1.1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${-1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${string}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${bigint}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${1n}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${null}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${undefined}c`>, { distributive: false }>>(true)

		testType.true<IsStringLiteral<Lowercase<`a${'b'}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${boolean}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${true}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${false}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${number}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${1.1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${-1}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${string}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${bigint}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${1n}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${null}c`>, { distributive: false }>>(true)
		testType.true<IsStringLiteral<Lowercase<`a${undefined}c`>, { distributive: false }>>(true)
	})

	it('returns false for Lowercase string', () => {
		testType.false<IsStringLiteral<Lowercase<string>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Lowercase<Lowercase<string>>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Lowercase<Uppercase<string>>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Lowercase<Lowercase<Uppercase<string>>>, { distributive: false }>>(true)
		testType.false<IsStringLiteral<Lowercase<Uppercase<Lowercase<string>>>, { distributive: false }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsStringLiteral<void, { distributive: false }>>(true)
		testType.false<IsStringLiteral<unknown, { distributive: false }>>(true)
		testType.false<IsStringLiteral<any, { distributive: false }>>(true)
		testType.false<IsStringLiteral<never, { distributive: false }>>(true)
	})

	it('returns false for all other types', () => {
		testType.false<IsStringLiteral<undefined, { distributive: false }>>(true)
		testType.false<IsStringLiteral<null, { distributive: false }>>(true)
		testType.false<IsStringLiteral<boolean, { distributive: false }>>(true)
		testType.false<IsStringLiteral<true, { distributive: false }>>(true)
		testType.false<IsStringLiteral<false, { distributive: false }>>(true)
		testType.false<IsStringLiteral<number, { distributive: false }>>(true)
		testType.false<IsStringLiteral<-1, { distributive: false }>>(true)
		testType.false<IsStringLiteral<0, { distributive: false }>>(true)
		testType.false<IsStringLiteral<1, { distributive: false }>>(true)
		testType.false<IsStringLiteral<1.1, { distributive: false }>>(true)
		testType.false<IsStringLiteral<string, { distributive: false }>>(true)
		testType.false<IsStringLiteral<bigint, { distributive: false }>>(true)
		testType.false<IsStringLiteral<-1n, { distributive: false }>>(true)
		testType.false<IsStringLiteral<0n, { distributive: false }>>(true)
		testType.false<IsStringLiteral<1n, { distributive: false }>>(true)
		testType.false<IsStringLiteral<symbol, { distributive: false }>>(true)
		testType.false<IsStringLiteral<{}, { distributive: false }>>(true)
		testType.false<IsStringLiteral<string[], { distributive: false }>>(true)
		testType.false<IsStringLiteral<[], { distributive: false }>>(true)
		testType.false<IsStringLiteral<Function, { distributive: false }>>(true)
		testType.false<IsStringLiteral<() => void, { distributive: false }>>(true)
	})

	it('over union', () => {
		testType.equal<IsStringLiteral<string | number, { distributive: false }>, false>(true)
		testType.equal<IsStringLiteral<'a' | number, { distributive: false }>, false>(true)
	})

	it('returns false for intersection type of non string literal and record', () => {
		testType.false<IsStringLiteral<123 & { a: 1 }, { distributive: false }>>(true)
		testType.false<IsStringLiteral<string & { a: 1 }, { distributive: false }>>(true)
	})

	it('consider intersection type of template literal and record as string literal', () => {
		testType.true<IsStringLiteral<`a-${number}` & { a: 1 }, { distributive: false }>>(true)
	})

	it('returns true for intersection type of string literal and record', () => {
		testType.true<IsStringLiteral<'' & { a: 1 }, { distributive: false }>>(true)
		testType.true<IsStringLiteral<'abc' & { a: 1 }, { distributive: false }>>(true)
	})
})

describe('enable exact', () => {
	it('returns false for string', () => {
		testType.false<IsStringLiteral<string, { exact: true }>>(true)
	})

	it('returns true if T is a string literal', () => {
		testType.true<IsStringLiteral<'', { exact: true }>>(true)
		testType.true<IsStringLiteral<'a', { exact: true }>>(true)
	})

	it('returns true if T is a template literal reducible to string literal', () => {
		testType.equal<`${''}`, ''>(true)
		testType.true<IsStringLiteral<`${''}`, { exact: true }>>(true)
		testType.equal<`a-${boolean}`, 'a-true' | `a-false`>(true)
		testType.true<IsStringLiteral<`a-${boolean}`, { exact: true }>>(true)
		testType.equal<`${true}-c`, 'true-c'>(true)
		testType.true<IsStringLiteral<`${true}-c`, { exact: true }>>(true)
		testType.equal<`a-${null}-c`, 'a-null-c'>(true)
		testType.true<IsStringLiteral<`a-${null}-c`, { exact: true }>>(true)
	})

	it('returns false if T is a non-reducible template literal', () => {
		testType.false<IsStringLiteral<`${number}`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`${string}`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`${bigint}`, { exact: true }>>(true)

		testType.false<IsStringLiteral<`a${number}`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`a${string}`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`a${bigint}`, { exact: true }>>(true)

		testType.false<IsStringLiteral<`${number}c`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`${string}c`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`${bigint}c`, { exact: true }>>(true)

		testType.false<IsStringLiteral<`a${number}c`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`a${string}c`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`a${bigint}c`, { exact: true }>>(true)

		testType.false<IsStringLiteral<`a${number | string | bigint}`, { exact: true }>>(true)
		testType.false<IsStringLiteral<`${number | string | bigint}c`, { exact: true }>>(true)
	})

	it('returns true for Uppercase string literal', () => {
		testType.true<IsStringLiteral<Uppercase<'abc'>, { exact: true }>>(true)
		testType.true<IsStringLiteral<Lowercase<'abc'>, { exact: true }>>(true)
		testType.true<IsStringLiteral<Lowercase<Uppercase<'abc'>>, { exact: true }>>(true)
	})

	it('returns false for Uppercase or Lowercase string', () => {
		testType.false<IsStringLiteral<Uppercase<string>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Uppercase<Uppercase<string>>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Uppercase<Lowercase<string>>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Uppercase<Uppercase<Lowercase<string>>>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Uppercase<Lowercase<Uppercase<string>>>, { exact: true }>>(true)

		testType.false<IsStringLiteral<Lowercase<string>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Lowercase<Lowercase<string>>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Lowercase<Uppercase<string>>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Lowercase<Lowercase<Uppercase<string>>>, { exact: true }>>(true)
		testType.false<IsStringLiteral<Lowercase<Uppercase<Lowercase<string>>>, { exact: true }>>(true)
	})

	it('returns true for intrinsic manipulative types with template literal reducible to string literal', () => {
		testType.true<IsStringLiteral<Uppercase<`${''}`>, { exact: true }>>(true)
		testType.true<IsStringLiteral<Lowercase<`${'b'}`>, { exact: true }>>(true)
		testType.true<IsStringLiteral<Capitalize<`${boolean}`>, { exact: true }>>(true)
		testType.true<IsStringLiteral<Uncapitalize<`${true}`>, { exact: true }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsStringLiteral<void, { exact: true }>>(true)
		testType.false<IsStringLiteral<unknown, { exact: true }>>(true)
		testType.false<IsStringLiteral<any, { exact: true }>>(true)
		testType.false<IsStringLiteral<never, { exact: true }>>(true)
	})

	it('returns false for all other types', () => {
		testType.false<IsStringLiteral<undefined, { exact: true }>>(true)
		testType.false<IsStringLiteral<null, { exact: true }>>(true)
		testType.false<IsStringLiteral<boolean, { exact: true }>>(true)
		testType.false<IsStringLiteral<true, { exact: true }>>(true)
		testType.false<IsStringLiteral<false, { exact: true }>>(true)
		testType.false<IsStringLiteral<number, { exact: true }>>(true)
		testType.false<IsStringLiteral<-1, { exact: true }>>(true)
		testType.false<IsStringLiteral<0, { exact: true }>>(true)
		testType.false<IsStringLiteral<1, { exact: true }>>(true)
		testType.false<IsStringLiteral<1.1, { exact: true }>>(true)
		testType.false<IsStringLiteral<string, { exact: true }>>(true)
		testType.false<IsStringLiteral<bigint, { exact: true }>>(true)
		testType.false<IsStringLiteral<-1n, { exact: true }>>(true)
		testType.false<IsStringLiteral<0n, { exact: true }>>(true)
		testType.false<IsStringLiteral<1n, { exact: true }>>(true)
		testType.false<IsStringLiteral<symbol, { exact: true }>>(true)
		testType.false<IsStringLiteral<{}, { exact: true }>>(true)
		testType.false<IsStringLiteral<string[], { exact: true }>>(true)
		testType.false<IsStringLiteral<[], { exact: true }>>(true)
		testType.false<IsStringLiteral<Function, { exact: true }>>(true)
		testType.false<IsStringLiteral<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsStringLiteral<string | number, { exact: true }>, false>(true)
		testType.equal<IsStringLiteral<'a' | number, { exact: true }>, boolean>(true)
	})

	it('returns false for intersection type of non string literal and record', () => {
		testType.false<IsStringLiteral<123 & { a: 1 }, { exact: true }>>(true)
		testType.false<IsStringLiteral<string & { a: 1 }, { exact: true }>>(true)
		testType.false<IsStringLiteral<`a-${number}` & { a: 1 }, { exact: true }>>(true)
	})

	it.skip('returns true for intersection type of string literal and record', () => {
		// FIXME: https://github.com/microsoft/TypeScript/issues/57776
		// testType.true<IsStringLiteral<'abc' & { a: 1 }, { exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsStringLiteral<string, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsStringLiteral<'', { selection: 'filter'; exact: true }>, ''>(true)

		testType.equal<IsStringLiteral<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsStringLiteral<unknown, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsStringLiteral<string | number, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsStringLiteral<'' | 1, { selection: 'filter'; exact: true }>, ''>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsStringLiteral<string, IsStringLiteral.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsStringLiteral<'a', IsStringLiteral.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsStringLiteral<'a', { exact: true; $then: String; $else: never }>, String>(true)

		testType.equal<IsStringLiteral<any, IsStringLiteral.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsStringLiteral<unknown, IsStringLiteral.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsStringLiteral<never, IsStringLiteral.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsStringLiteral<void, IsStringLiteral.$Branch<{ exact: true }>>, $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsStringLiteral<any, { exact: true }>, false>(true)
		testType.equal<IsStringLiteral<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsStringLiteral<unknown, { exact: true }>, false>(true)
		testType.equal<IsStringLiteral<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsStringLiteral<never, { exact: true }>, false>(true)
		testType.equal<IsStringLiteral<never, { $never: unknown; exact: true }>, unknown>(true)
	})

	describe('disable distribution', () => {
		it('returns false for string', () => {
			testType.false<IsStringLiteral<string, { distributive: false; exact: true }>>(true)
		})

		it('returns true if T is a string literal', () => {
			testType.true<IsStringLiteral<'', { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<'a', { distributive: false; exact: true }>>(true)
		})

		it('returns true if T is a template literal reducible to string literal', () => {
			testType.true<IsStringLiteral<`${''}`, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<`a${boolean}`, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<`${false}c`, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<`${1}c`, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<`a${1n}c`, { distributive: false; exact: true }>>(true)
		})

		it('returns false if T is a template literal', () => {
			testType.false<IsStringLiteral<`${number}`, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<`a${bigint}`, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<`${string}c`, { distributive: false; exact: true }>>(true)
		})

		it('returns true for Uppercase string literal', () => {
			testType.true<IsStringLiteral<Uppercase<'abc'>, { distributive: false; exact: true }>>(true)
		})

		it('returns false for manipulated template literal', () => {
			testType.false<IsStringLiteral<Uppercase<`${number}`>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Lowercase<`${bigint}`>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Capitalize<`a${number}`>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Uncapitalize<`a${string}`>, { distributive: false; exact: true }>>(true)
		})

		it('returns true for manipulated template literal reduced to string literal', () => {
			testType.true<IsStringLiteral<Uppercase<`${''}`>, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<Lowercase<`a${true}`>, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<Capitalize<`${1.1}c`>, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<Uncapitalize<`a${undefined}c`>, { distributive: false; exact: true }>>(true)
		})

		it('returns false for Uppercase string', () => {
			testType.false<IsStringLiteral<Uppercase<string>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Uppercase<Uppercase<string>>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Uppercase<Lowercase<string>>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Uppercase<Uppercase<Lowercase<string>>>, { distributive: false; exact: true }>>(
				true,
			)
			testType.false<IsStringLiteral<Uppercase<Lowercase<Uppercase<string>>>, { distributive: false; exact: true }>>(
				true,
			)
		})

		it('returns true for Lowercase string literal', () => {
			testType.true<IsStringLiteral<Lowercase<'abc'>, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<Lowercase<'foo'>, { distributive: false; exact: true }>>(true)
		})

		it('returns false for Lowercase template literal', () => {
			testType.false<IsStringLiteral<Lowercase<`${number}`>, { distributive: false; exact: true }>>(true)
			testType.true<IsStringLiteral<Lowercase<`a${boolean}c`>, { distributive: false; exact: true }>>(true)
		})

		it('returns false for Lowercase string', () => {
			testType.false<IsStringLiteral<Lowercase<string>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Lowercase<Lowercase<string>>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Lowercase<Uppercase<string>>, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Lowercase<Lowercase<Uppercase<string>>>, { distributive: false; exact: true }>>(
				true,
			)
			testType.false<IsStringLiteral<Lowercase<Uppercase<Lowercase<string>>>, { distributive: false; exact: true }>>(
				true,
			)
		})

		it('returns false for special types', () => {
			testType.false<IsStringLiteral<void, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<unknown, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<any, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<never, { distributive: false; exact: true }>>(true)
		})

		it('returns false for all other types', () => {
			testType.false<IsStringLiteral<undefined, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<null, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<boolean, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<true, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<false, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<number, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<-1, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<0, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<1, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<1.1, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<string, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<bigint, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<-1n, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<0n, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<1n, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<symbol, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<{}, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<string[], { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<[], { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<Function, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<() => void, { distributive: false; exact: true }>>(true)
		})

		it('over union', () => {
			testType.equal<IsStringLiteral<'a' | number, { distributive: false; exact: true }>, false>(true)
		})

		it.skip('works with intersection type', () => {
			// FIXME: https://github.com/microsoft/TypeScript/issues/57776
			// testType.true<IsStringLiteral<'' & { a: 1 }, { distributive: false, exact: true }>>(true)
			testType.false<IsStringLiteral<1 & { a: 1 }, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<string & { a: 1 }, { distributive: false; exact: true }>>(true)
			testType.false<IsStringLiteral<`${number}` & { a: 1 }, { distributive: false; exact: true }>>(true)
		})
	})
})
