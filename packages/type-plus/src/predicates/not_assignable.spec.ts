import { it } from 'vitest'

import { type $Else, type $Then, type NotAssignable, testType } from '../index.js'

it('check if A can be assigned to B', () => {
	testType.false<NotAssignable<1, 1>>(true)
	testType.false<NotAssignable<1, number>>(true)
	testType.false<NotAssignable<number, number>>(true)
	testType.false<NotAssignable<'a', 'a'>>(true)
	testType.false<NotAssignable<'a', string>>(true)
	testType.false<NotAssignable<string, string>>(true)
	testType.false<NotAssignable<false, boolean>>(true)
	testType.false<NotAssignable<true, boolean>>(true)
	testType.false<NotAssignable<boolean, boolean>>(true)
	testType.false<NotAssignable<{ a: 1 }, { a: number }>>(true)
	testType.false<NotAssignable<{ a: string; b: number }, { a: string }>>(true)

	testType.true<NotAssignable<number, 1>>(true)
	testType.true<NotAssignable<string, 'a'>>(true)
	testType.true<NotAssignable<{ a: number }, { a: 1 }>>(true)
	testType.true<NotAssignable<{ a: string }, { a: string; b: number }>>(true)
})

it('returns true when B is `any` as anything can be assigned to `any`', () => {
	testType.false<NotAssignable<any, any>>(true)
	testType.false<NotAssignable<unknown, any>>(true)
	testType.false<NotAssignable<never, any>>(true)

	testType.false<NotAssignable<1, any>>(true)
	testType.false<NotAssignable<null, any>>(true)
	testType.false<NotAssignable<undefined, any>>(true)
})

it('returns true when B is `unknown` as anything can be assigned to `unknown`', () => {
	testType.false<NotAssignable<any, unknown>>(true)
	testType.false<NotAssignable<unknown, unknown>>(true)
	testType.false<NotAssignable<never, unknown>>(true)

	testType.false<NotAssignable<1, unknown>>(true)
	testType.false<NotAssignable<null, unknown>>(true)
	testType.false<NotAssignable<undefined, unknown>>(true)
})

it('returns false when B is `never` except when A is `never`', () => {
	testType.true<NotAssignable<any, never>>(true)
	testType.true<NotAssignable<unknown, never>>(true)
	testType.false<NotAssignable<never, never>>(true)

	testType.true<NotAssignable<1, never>>(true)
	testType.true<NotAssignable<null, never>>(true)
	testType.true<NotAssignable<undefined, never>>(true)
})

it('follows TypeScript for special types on the `A` side', () => {
	// `any` is assignable to everything but `never`.
	testType.equal<NotAssignable<any, 1>, false>(true)
	// `unknown` is assignable only to `any` and `unknown`.
	testType.equal<NotAssignable<unknown, 1>, true>(true)
	// `never` is the bottom type, so it is assignable to everything.
	testType.equal<NotAssignable<never, 1>, false>(true)
})

it('treats `void` as an ordinary type on either side', () => {
	testType.equal<NotAssignable<undefined, void>, false>(true)
	testType.equal<NotAssignable<1, void>, true>(true)
	testType.equal<NotAssignable<void, void>, false>(true)
	testType.equal<NotAssignable<void, 1>, true>(true)
	testType.equal<NotAssignable<void, undefined>, true>(true)

	testType.equal<NotAssignable<any, void>, false>(true)
	testType.equal<NotAssignable<unknown, void>, true>(true)
	testType.equal<NotAssignable<never, void>, false>(true)
	testType.equal<NotAssignable<void, any>, false>(true)
	testType.equal<NotAssignable<void, unknown>, false>(true)
	testType.equal<NotAssignable<void, never>, true>(true)
})

it('can disable distribution', () => {
	testType.equal<NotAssignable<boolean, true>, boolean>(true)
	testType.equal<NotAssignable<boolean, true, { distributive: false }>, true>(true)

	testType.equal<NotAssignable<number | string, number>, boolean>(true)
	testType.equal<NotAssignable<number | string, number, { distributive: false }>, true>(true)
})

it('can use as filter', () => {
	testType.equal<NotAssignable<1, number, { selection: 'filter' }>, never>(true)
	testType.equal<NotAssignable<number, 1, { selection: 'filter' }>, number>(true)
})

it('work as branching', () => {
	testType.equal<NotAssignable<1, any, NotAssignable.$Branch>, $Else>(true)
	testType.equal<NotAssignable<1, unknown, NotAssignable.$Branch>, $Else>(true)
	testType.equal<NotAssignable<1, never, NotAssignable.$Branch>, $Then>(true)
	testType.equal<NotAssignable<never, never, NotAssignable.$Branch>, $Else>(true)
	testType.equal<NotAssignable<1, number, NotAssignable.$Branch>, $Else>(true)
	testType.equal<NotAssignable<true, number, NotAssignable.$Branch>, $Then>(true)
})

it('works with partial customization', () => {
	testType.equal<NotAssignable<any, any, { $then: 1 }>, false>(true)
	testType.equal<NotAssignable<any, unknown, { $then: 1 }>, false>(true)
	testType.equal<NotAssignable<never, never, { $then: 1 }>, false>(true)
	testType.equal<NotAssignable<0, number, { $then: 1 }>, false>(true)
	testType.equal<NotAssignable<1, never, { $else: 2 }>, true>(true)
	testType.equal<NotAssignable<0, string, { $else: 2 }>, true>(true)

	testType.equal<NotAssignable<any, any, { $else: 1 }>, 1>(true)
	testType.equal<NotAssignable<any, unknown, { $else: 1 }>, 1>(true)
	testType.equal<NotAssignable<never, never, { $else: 1 }>, 1>(true)
	testType.equal<NotAssignable<0, number, { $else: 1 }>, 1>(true)
	testType.equal<NotAssignable<1, never, { $then: 1 }>, 1>(true)
	testType.equal<NotAssignable<0, string, { $then: 1 }>, 1>(true)
})

it('can override $any branch', () => {
	testType.equal<NotAssignable<any, any>, false>(true)
	testType.equal<NotAssignable<any, any, { $any: unknown }>, unknown>(true)
	testType.equal<NotAssignable<any, number, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<NotAssignable<unknown, unknown>, false>(true)
	testType.equal<NotAssignable<unknown, unknown, { $unknown: unknown }>, unknown>(true)
	testType.equal<NotAssignable<unknown, number, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<NotAssignable<never, never>, false>(true)
	testType.equal<NotAssignable<never, never, { $never: unknown }>, unknown>(true)
	testType.equal<NotAssignable<never, number, { $never: unknown }>, unknown>(true)
	testType.equal<NotAssignable<1, never, { $never: unknown }>, true>(true)
})
