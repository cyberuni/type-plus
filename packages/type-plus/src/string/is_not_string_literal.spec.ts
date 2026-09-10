import { describe, it } from 'vitest'

import { type $Else, type $Then, type IsNotStringLiteral, testType } from '../index.js'

it('returns true for string', () => {
	testType.true<IsNotStringLiteral<string>>(true)
	testType.equal<`${string}`, string>(true)
	testType.true<IsNotStringLiteral<`${string}`>>(true)
})

it('returns false if T is a string literal', () => {
	testType.false<IsNotStringLiteral<''>>(true)
	testType.false<IsNotStringLiteral<'a'>>(true)
})

it('returns false if T is a template literal', () => {
	testType.false<IsNotStringLiteral<`${boolean}`>>(true)
	testType.false<IsNotStringLiteral<`a${number}`>>(true)
	testType.false<IsNotStringLiteral<`${bigint}c`>>(true)
	testType.false<IsNotStringLiteral<`a${null}c`>>(true)
})

it('returns false for Uppercase string literal', () => {
	testType.false<IsNotStringLiteral<Uppercase<'abc'>>>(true)
})

it('returns false for Uppercase template literal', () => {
	testType.false<IsNotStringLiteral<Uppercase<`${true}`>>>(true)
	testType.false<IsNotStringLiteral<Uppercase<`${undefined}c`>>>(true)
})

it('returns true for Uppercase string', () => {
	testType.true<IsNotStringLiteral<Uppercase<string>>>(true)
	testType.true<IsNotStringLiteral<Uppercase<Uppercase<string>>>>(true)
	testType.true<IsNotStringLiteral<Uppercase<Lowercase<string>>>>(true)
})

it('returns false for Lowercase string literal', () => {
	testType.false<IsNotStringLiteral<Lowercase<'abc'>>>(true)
	testType.false<IsNotStringLiteral<Lowercase<'foo'>>>(true)
})

it('returns false for Lowercase template literal', () => {
	testType.false<IsNotStringLiteral<Lowercase<`${false}`>>>(true)
	testType.false<IsNotStringLiteral<Lowercase<`a${1}`>>>(true)
	testType.false<IsNotStringLiteral<Lowercase<`${1n}c`>>>(true)
})

it('returns true for Lowercase string', () => {
	testType.true<IsNotStringLiteral<Lowercase<string>>>(true)
	testType.true<IsNotStringLiteral<Lowercase<Lowercase<Uppercase<string>>>>>(true)
	testType.true<IsNotStringLiteral<Lowercase<Uppercase<Lowercase<string>>>>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotStringLiteral<void>>(true)
	testType.true<IsNotStringLiteral<unknown>>(true)
	testType.true<IsNotStringLiteral<any>>(true)
	testType.true<IsNotStringLiteral<never>>(true)
})

it('returns true for all other types', () => {
	testType.true<IsNotStringLiteral<undefined>>(true)
	testType.true<IsNotStringLiteral<null>>(true)
	testType.true<IsNotStringLiteral<boolean>>(true)
	testType.true<IsNotStringLiteral<true>>(true)
	testType.true<IsNotStringLiteral<false>>(true)
	testType.true<IsNotStringLiteral<number>>(true)
	testType.true<IsNotStringLiteral<-1>>(true)
	testType.true<IsNotStringLiteral<0>>(true)
	testType.true<IsNotStringLiteral<1>>(true)
	testType.true<IsNotStringLiteral<1.1>>(true)
	testType.true<IsNotStringLiteral<string>>(true)
	testType.true<IsNotStringLiteral<bigint>>(true)
	testType.true<IsNotStringLiteral<-1n>>(true)
	testType.true<IsNotStringLiteral<0n>>(true)
	testType.true<IsNotStringLiteral<1n>>(true)
	testType.true<IsNotStringLiteral<symbol>>(true)
	testType.true<IsNotStringLiteral<{}>>(true)
	testType.true<IsNotStringLiteral<string[]>>(true)
	testType.true<IsNotStringLiteral<[]>>(true)
	testType.true<IsNotStringLiteral<Function>>(true)
	testType.true<IsNotStringLiteral<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotStringLiteral<string | number>, true>(true)
	testType.equal<IsNotStringLiteral<'a' | number>, boolean>(true)
	testType.equal<IsNotStringLiteral<'a' | boolean>, boolean>(true)
})

it('returns true for intersection type of non string literal and record', () => {
	testType.true<IsNotStringLiteral<123 & { a: 1 }>>(true)
	testType.true<IsNotStringLiteral<string & { a: 1 }>>(true)
})

it('consider intersection type of template literal and record as string literal', () => {
	testType.false<IsNotStringLiteral<`a-${number}` & { a: 1 }>>(true)
})

it('returns false for intersection type of string literal and record', () => {
	testType.false<IsNotStringLiteral<'' & { a: 1 }>>(true)
	testType.false<IsNotStringLiteral<'abc' & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsNotStringLiteral<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotStringLiteral<'', { selection: 'filter' }>, never>(true)

	testType.equal<IsNotStringLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStringLiteral<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStringLiteral<string | number, { selection: 'filter' }>, string | number>(true)

	testType.equal<IsNotStringLiteral<'' | 1, { selection: 'filter' }>, 1>(true)
	testType.equal<IsNotStringLiteral<'a' | boolean, { selection: 'filter' }>, boolean>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotStringLiteral<string, IsNotStringLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotStringLiteral<'a', IsNotStringLiteral.$Branch>, $Else>(true)
	testType.equal<IsNotStringLiteral<'a', { $then: String; $else: never }>, never>(true)

	testType.equal<IsNotStringLiteral<any, IsNotStringLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotStringLiteral<unknown, IsNotStringLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotStringLiteral<never, IsNotStringLiteral.$Branch>, $Then>(true)
	testType.equal<IsNotStringLiteral<void, IsNotStringLiteral.$Branch>, $Then>(true)
})

it('can override $any branch', () => {
	testType.equal<IsNotStringLiteral<any>, true>(true)
	testType.equal<IsNotStringLiteral<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsNotStringLiteral<unknown>, true>(true)
	testType.equal<IsNotStringLiteral<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsNotStringLiteral<never>, true>(true)
	testType.equal<IsNotStringLiteral<never, { $never: unknown }>, unknown>(true)
})

describe('disable distribution', () => {
	it('returns true for string', () => {
		testType.true<IsNotStringLiteral<string, { distributive: false }>>(true)
	})

	it('returns false if T is a string literal', () => {
		testType.false<IsNotStringLiteral<'', { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<'a', { distributive: false }>>(true)
	})

	it('returns false if T is a template literal', () => {
		testType.false<IsNotStringLiteral<`${false}`, { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<`a${1.1}`, { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<`${-1}c`, { distributive: false }>>(true)
	})

	it('returns false for Uppercase string literal', () => {
		testType.false<IsNotStringLiteral<Uppercase<'abc'>, { distributive: false }>>(true)
	})

	it('returns false for Uppercase template literal', () => {
		testType.false<IsNotStringLiteral<Uppercase<`${false}`>, { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<Uppercase<`a${undefined}`>, { distributive: false }>>(true)
	})

	it('returns true for Uppercase string', () => {
		testType.true<IsNotStringLiteral<Uppercase<string>, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<Uppercase<Uppercase<string>>, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<Uppercase<Lowercase<string>>, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<Uppercase<Uppercase<Lowercase<string>>>, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<Uppercase<Lowercase<Uppercase<string>>>, { distributive: false }>>(true)
	})

	it('returns false for Lowercase string literal', () => {
		testType.false<IsNotStringLiteral<Lowercase<'abc'>, { distributive: false }>>(true)
	})

	it('returns false for Lowercase template literal', () => {
		testType.false<IsNotStringLiteral<Lowercase<`${number}`>, { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<Lowercase<`a${1n}`>, { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<Lowercase<`a${undefined}c`>, { distributive: false }>>(true)
	})

	it('returns true for Lowercase string', () => {
		testType.true<IsNotStringLiteral<Lowercase<string>, { distributive: false }>>(true)
	})

	it('returns true for special types', () => {
		testType.true<IsNotStringLiteral<void, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<unknown, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<any, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<never, { distributive: false }>>(true)
	})

	it('returns true for all other types', () => {
		testType.true<IsNotStringLiteral<undefined, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<null, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<boolean, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<true, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<false, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<number, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<-1, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<0, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<1, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<1.1, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<string, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<bigint, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<-1n, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<0n, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<1n, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<symbol, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<{}, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<string[], { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<[], { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<Function, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<() => void, { distributive: false }>>(true)
	})

	it('over union', () => {
		testType.equal<IsNotStringLiteral<'a' | number, { distributive: false }>, true>(true)
	})

	it('works with intersection type', () => {
		testType.true<IsNotStringLiteral<123 & { a: 1 }, { distributive: false }>>(true)
		testType.true<IsNotStringLiteral<string & { a: 1 }, { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<'' & { a: 1 }, { distributive: false }>>(true)
		testType.false<IsNotStringLiteral<`a-${number}` & { a: 1 }, { distributive: false }>>(true)
	})
})

describe('enable exact', () => {
	it('returns true for string', () => {
		testType.true<IsNotStringLiteral<string, { exact: true }>>(true)
	})

	it('returns false if T is a string literal', () => {
		testType.false<IsNotStringLiteral<'', { exact: true }>>(true)
		testType.false<IsNotStringLiteral<'a', { exact: true }>>(true)
	})

	it('returns false if T is a template literal reducible to string literal', () => {
		testType.false<IsNotStringLiteral<`${''}`, { exact: true }>>(true)
		testType.false<IsNotStringLiteral<`a${'b'}`, { exact: true }>>(true)
		testType.false<IsNotStringLiteral<`${boolean}c`, { exact: true }>>(true)
		testType.false<IsNotStringLiteral<`a${1}c`, { exact: true }>>(true)
	})

	it('returns true if T is a non-reducible template literal', () => {
		testType.true<IsNotStringLiteral<`${number}`, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<`a${string}`, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<`${bigint}c`, { exact: true }>>(true)

		testType.true<IsNotStringLiteral<`a${number | string | bigint}`, { exact: true }>>(true)
	})

	it('returns false for Uppercase string literal', () => {
		testType.false<IsNotStringLiteral<Uppercase<'abc'>, { exact: true }>>(true)
	})

	it('returns true for Uppercase or Lowercase string', () => {
		testType.true<IsNotStringLiteral<Uppercase<string>, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<Uppercase<Uppercase<string>>, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<Uppercase<Lowercase<string>>, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<Lowercase<Uppercase<string>>, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<Lowercase<Lowercase<Uppercase<string>>>, { exact: true }>>(true)
	})

	it('returns false for intrinsic manipulative types with template literal reducible to string literal', () => {
		testType.false<IsNotStringLiteral<Uppercase<`${''}`>, { exact: true }>>(true)
		testType.false<IsNotStringLiteral<Lowercase<`${'b'}`>, { exact: true }>>(true)
		testType.false<IsNotStringLiteral<Capitalize<`${boolean}`>, { exact: true }>>(true)
		testType.false<IsNotStringLiteral<Uncapitalize<`${true}`>, { exact: true }>>(true)
	})

	it('returns true for special types', () => {
		testType.true<IsNotStringLiteral<void, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<unknown, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<any, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<never, { exact: true }>>(true)
	})

	it('returns true for all other types', () => {
		testType.true<IsNotStringLiteral<undefined, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<null, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<boolean, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<true, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<false, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<number, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<-1, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<0, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<1, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<1.1, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<string, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<bigint, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<-1n, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<0n, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<1n, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<symbol, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<{}, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<string[], { exact: true }>>(true)
		testType.true<IsNotStringLiteral<[], { exact: true }>>(true)
		testType.true<IsNotStringLiteral<Function, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		testType.equal<IsNotStringLiteral<string | number, { exact: true }>, true>(true)
		testType.equal<IsNotStringLiteral<'a' | number, { exact: true }>, boolean>(true)
	})

	it('returns true for intersection type of non string literal and record', () => {
		testType.true<IsNotStringLiteral<123 & { a: 1 }, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<string & { a: 1 }, { exact: true }>>(true)
		testType.true<IsNotStringLiteral<`a-${number}` & { a: 1 }, { exact: true }>>(true)
	})

	it('returns false for intersection type of string literal and record', () => {
		testType.false<IsNotStringLiteral<'' & { a: 1 }, { exact: true }>>(true)
		testType.false<IsNotStringLiteral<'abc' & { a: 1 }, { exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsNotStringLiteral<string, { selection: 'filter'; exact: true }>, string>(true)
		testType.equal<IsNotStringLiteral<'', { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsNotStringLiteral<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsNotStringLiteral<unknown, { selection: 'filter'; exact: true }>, unknown>(true)
		testType.equal<IsNotStringLiteral<string | number, { selection: 'filter'; exact: true }>, string | number>(true)

		testType.equal<IsNotStringLiteral<'' | 1, { selection: 'filter'; exact: true }>, 1>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsNotStringLiteral<string, IsNotStringLiteral.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotStringLiteral<'a', IsNotStringLiteral.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsNotStringLiteral<'a', { $then: String; $else: never; exact: true }>, never>(true)

		testType.equal<IsNotStringLiteral<any, IsNotStringLiteral.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotStringLiteral<unknown, IsNotStringLiteral.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotStringLiteral<never, IsNotStringLiteral.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsNotStringLiteral<void, IsNotStringLiteral.$Branch<{ exact: true }>>, $Then>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsNotStringLiteral<any, { exact: true }>, true>(true)
		testType.equal<IsNotStringLiteral<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsNotStringLiteral<unknown, { exact: true }>, true>(true)
		testType.equal<IsNotStringLiteral<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsNotStringLiteral<never, { exact: true }>, true>(true)
		testType.equal<IsNotStringLiteral<never, { $never: unknown; exact: true }>, unknown>(true)
	})

	describe('disable distribution', () => {
		it('returns true for string', () => {
			testType.true<IsNotStringLiteral<string, { distributive: false; exact: true }>>(true)
		})

		it('returns false if T is a string literal', () => {
			testType.false<IsNotStringLiteral<'', { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<'a', { distributive: false; exact: true }>>(true)
		})

		it('returns false if T is a template literal reducible to string literal', () => {
			testType.false<IsNotStringLiteral<`${''}`, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<`a${boolean}`, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<`${false}c`, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<`${1}c`, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<`a${1n}c`, { distributive: false; exact: true }>>(true)
		})

		it('returns true if T is a template literal', () => {
			testType.true<IsNotStringLiteral<`${number}`, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<`a${bigint}`, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<`${string}c`, { distributive: false; exact: true }>>(true)
		})

		it('returns false for Uppercase string literal', () => {
			testType.false<IsNotStringLiteral<Uppercase<'abc'>, { distributive: false; exact: true }>>(true)
		})

		it('returns true for manipulated template literal', () => {
			testType.true<IsNotStringLiteral<Uppercase<`${number}`>, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<Lowercase<`${bigint}`>, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<Capitalize<`a${number}`>, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<Uncapitalize<`a${string}`>, { distributive: false; exact: true }>>(true)
		})

		it('returns false for manipulated template literal reduced to string literal', () => {
			testType.false<IsNotStringLiteral<Uppercase<`${''}`>, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<Lowercase<`a${true}`>, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<Capitalize<`${1.1}c`>, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<Uncapitalize<`a${undefined}c`>, { distributive: false; exact: true }>>(true)
		})

		it('returns true for Lowercase string', () => {
			testType.true<IsNotStringLiteral<Lowercase<string>, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<Lowercase<Uppercase<string>>, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<Lowercase<Lowercase<Uppercase<string>>>, { distributive: false; exact: true }>>(
				true,
			)
		})

		it('returns true for special types', () => {
			testType.true<IsNotStringLiteral<void, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<unknown, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<any, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<never, { distributive: false; exact: true }>>(true)
		})

		it('returns true for all other types', () => {
			testType.true<IsNotStringLiteral<undefined, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<null, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<boolean, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<true, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<false, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<number, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<-1, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<0, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<1, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<1.1, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<string, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<bigint, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<-1n, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<0n, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<1n, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<symbol, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<{}, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<string[], { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<[], { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<Function, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<() => void, { distributive: false; exact: true }>>(true)
		})

		it('over union', () => {
			testType.equal<IsNotStringLiteral<'a' | number, { distributive: false; exact: true }>, true>(true)
		})

		it('returns true for intersection type of non string literal and record', () => {
			testType.true<IsNotStringLiteral<123 & { a: 1 }, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<string & { a: 1 }, { distributive: false; exact: true }>>(true)
			testType.true<IsNotStringLiteral<`a-${number}` & { a: 1 }, { distributive: false; exact: true }>>(true)
		})

		it('returns false for intersection type of string literal and record', () => {
			testType.false<IsNotStringLiteral<'' & { a: 1 }, { distributive: false; exact: true }>>(true)
			testType.false<IsNotStringLiteral<'abc' & { a: 1 }, { distributive: false; exact: true }>>(true)
		})
	})
})
