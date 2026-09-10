import { describe, it } from 'vitest'

import { type $Else, type $Then, type Assignable, testType } from '../index.js'

it('check if A can be assigned to B', () => {
	testType.true<Assignable<1, 1>>(true)
	testType.true<Assignable<1, number>>(true)
	testType.true<Assignable<number, number>>(true)
	testType.true<Assignable<'a', 'a'>>(true)
	testType.true<Assignable<'a', string>>(true)
	testType.true<Assignable<string, string>>(true)
	testType.true<Assignable<false, boolean>>(true)
	testType.true<Assignable<true, boolean>>(true)
	testType.true<Assignable<boolean, boolean>>(true)
	testType.true<Assignable<{ a: 1 }, { a: number }>>(true)
	testType.true<Assignable<{ a: string; b: number }, { a: string }>>(true)

	testType.false<Assignable<number, 1>>(true)
	testType.false<Assignable<string, 'a'>>(true)
	testType.false<Assignable<{ a: number }, { a: 1 }>>(true)
	testType.false<Assignable<{ a: string }, { a: string; b: number }>>(true)
})

it('returns true when B is `any` as anything can be assigned to `any`', () => {
	testType.true<Assignable<any, any>>(true)
	testType.true<Assignable<unknown, any>>(true)
	testType.true<Assignable<never, any>>(true)

	testType.true<Assignable<1, any>>(true)
	testType.true<Assignable<null, any>>(true)
	testType.true<Assignable<undefined, any>>(true)
})

it('returns true when B is `unknown` as anything can be assigned to `unknown`', () => {
	testType.true<Assignable<any, unknown>>(true)
	testType.true<Assignable<unknown, unknown>>(true)
	testType.true<Assignable<never, unknown>>(true)

	testType.true<Assignable<1, unknown>>(true)
	testType.true<Assignable<null, unknown>>(true)
	testType.true<Assignable<undefined, unknown>>(true)
})

it('returns false when B is `never` except when A is `never`', () => {
	testType.false<Assignable<any, never>>(true)
	testType.false<Assignable<unknown, never>>(true)
	testType.true<Assignable<never, never>>(true)

	testType.false<Assignable<1, never>>(true)
	testType.false<Assignable<null, never>>(true)
	testType.false<Assignable<undefined, never>>(true)
})

it('follows TypeScript for special types on the `A` side', () => {
	// `any` is assignable to everything but `never`.
	testType.equal<Assignable<any, 1>, true>(true)
	// `unknown` is assignable only to `any` and `unknown`.
	testType.equal<Assignable<unknown, 1>, false>(true)
	// `never` is the bottom type, so it is assignable to everything.
	testType.equal<Assignable<never, 1>, true>(true)
})

it('treats `void` as an ordinary type on either side', () => {
	testType.equal<Assignable<undefined, void>, true>(true)
	testType.equal<Assignable<1, void>, false>(true)
	testType.equal<Assignable<void, void>, true>(true)
	testType.equal<Assignable<void, 1>, false>(true)
	testType.equal<Assignable<void, undefined>, false>(true)

	testType.equal<Assignable<any, void>, true>(true)
	testType.equal<Assignable<unknown, void>, false>(true)
	testType.equal<Assignable<never, void>, true>(true)
	testType.equal<Assignable<void, any>, true>(true)
	testType.equal<Assignable<void, unknown>, true>(true)
	testType.equal<Assignable<void, never>, false>(true)
})

it('can disable distribution', () => {
	testType.equal<Assignable<boolean, true>, boolean>(true)
	testType.equal<Assignable<boolean, true, { distributive: false }>, false>(true)

	testType.equal<Assignable<string, number>, false>(true)
	testType.equal<Assignable<string, number, { distributive: false }>, false>(true)
	testType.equal<Assignable<number | string, number>, boolean>(true)
	testType.equal<Assignable<number | string, number, { distributive: false }>, false>(true)
})

it('can use as filter', () => {
	testType.equal<Assignable<1, number, { selection: 'filter' }>, 1>(true)
	testType.never<Assignable<number, 1, { selection: 'filter' }>>(true)
})

it('work as branching', () => {
	testType.equal<Assignable<1, any, Assignable.$Branch>, $Then>(true)
	testType.equal<Assignable<1, unknown, Assignable.$Branch>, $Then>(true)
	testType.equal<Assignable<1, never, Assignable.$Branch>, $Else>(true)
	testType.equal<Assignable<never, never, Assignable.$Branch>, $Then>(true)
	testType.equal<Assignable<1, number, Assignable.$Branch>, $Then>(true)
	testType.equal<Assignable<true, number, Assignable.$Branch>, $Else>(true)
})

it('works with partial customization', () => {
	testType.equal<Assignable<any, any, { $then: 1 }>, 1>(true)
	testType.equal<Assignable<any, unknown, { $then: 1 }>, 1>(true)
	testType.equal<Assignable<never, never, { $then: 1 }>, 1>(true)
	testType.equal<Assignable<0, number, { $then: 1 }>, 1>(true)
	testType.equal<Assignable<1, never, { $else: 2 }>, 2>(true)
	testType.equal<Assignable<0, string, { $else: 2 }>, 2>(true)

	testType.equal<Assignable<any, any, { $else: 2 }>, true>(true)
	testType.equal<Assignable<any, unknown, { $else: 1 }>, true>(true)
	testType.equal<Assignable<never, never, { $else: 1 }>, true>(true)
	testType.equal<Assignable<0, number, { $else: 1 }>, true>(true)
	testType.equal<Assignable<1, never, { $then: 2 }>, false>(true)
	testType.equal<Assignable<0, string, { $then: 2 }>, false>(true)
})

it('can override $any branch', () => {
	testType.equal<Assignable<any, any>, true>(true)
	testType.equal<Assignable<any, any, { $any: unknown }>, unknown>(true)
	testType.equal<Assignable<any, number, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<Assignable<unknown, unknown>, true>(true)
	testType.equal<Assignable<unknown, unknown, { $unknown: unknown }>, unknown>(true)
	testType.equal<Assignable<unknown, number, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<Assignable<never, never>, true>(true)
	testType.equal<Assignable<never, never, { $never: unknown }>, unknown>(true)
	testType.equal<Assignable<never, number, { $never: unknown }>, unknown>(true)
	testType.equal<Assignable<1, never, { $never: unknown }>, false>(true)
})

describe('disable distributive', () => {
	it('literal type to widen', () => {
		testType.true<Assignable<1, number, { distributive: false }>>(true)
		testType.true<Assignable<1, 1, { distributive: false }>>(true)
		testType.true<Assignable<number, number, { distributive: false }>>(true)
		testType.true<Assignable<'a', string, { distributive: false }>>(true)
		testType.true<Assignable<'a', 'a', { distributive: false }>>(true)
		testType.true<Assignable<string, string, { distributive: false }>>(true)
		testType.true<Assignable<false, boolean, { distributive: false }>>(true)
		testType.true<Assignable<true, boolean, { distributive: false }>>(true)
		testType.true<Assignable<boolean, boolean, { distributive: false }>>(true)
	})
	it('base type to literal type fails', () => {
		testType.false<Assignable<number, 1, { distributive: false }>>(true)
		testType.false<Assignable<string, 'a', { distributive: false }>>(true)
		testType.false<Assignable<true, false, { distributive: false }>>(true)
		testType.false<Assignable<false, true, { distributive: false }>>(true)
		testType.false<Assignable<boolean, false, { distributive: false }>>(true)
		testType.false<Assignable<boolean, true, { distributive: false }>>(true)
	})
	it('super set to sub set', () => {
		testType.true<Assignable<{ a: string; b: number }, { a: string }, { distributive: false }>>(true)
	})
	it('sub set to super set fail', () => {
		testType.false<Assignable<{ a: string }, { a: string; b: number }, { distributive: false }>>(true)
	})

	it('union types checks against all branches', () => {
		testType.true<Assignable<number | string, number | string, { distributive: false }>>(true)
		testType.true<Assignable<(number & { a: 1 }) | (string & { a: 1 }), number | string, { distributive: false }>>(true)

		testType.false<Assignable<number | string, number, { distributive: false }>>(true)
	})
})
