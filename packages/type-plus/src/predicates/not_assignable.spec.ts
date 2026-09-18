import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type NotAssignable, type TuplePlus, testType } from '../index.js'

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

it('answers unknown-like unions such as `{} | null | undefined` structurally', () => {
	// TypeScript relates `unknown` and `{} | null | undefined` both ways,
	// so `$Special` sees the union as `unknown`; it must still be answered by assignability.
	testType.equal<NotAssignable<unknown, {} | null | undefined>, false>(true)
	testType.equal<NotAssignable<unknown, object | null | undefined>, true>(true)
	testType.equal<NotAssignable<{} | null | undefined, object | null | undefined>, false>(true)
	testType.equal<NotAssignable<{} | null | undefined, { a?: 1 } | null | undefined>, false>(true)
	testType.equal<NotAssignable<{} | null | undefined, {}>, true>(true)
	testType.equal<NotAssignable<{} | null | undefined, object | null | undefined, { $unknown: 1 }>, 1>(true)
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

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<NotAssignable<any, any>, NotAssignable<any, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<any, unknown>, NotAssignable<any, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<any, never>, NotAssignable<any, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<any, void>, NotAssignable<any, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<any, undefined>, NotAssignable<any, undefined, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<any, {}>, NotAssignable<any, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<any, {} | null | undefined>,
			NotAssignable<any, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<any, number>, NotAssignable<any, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<any, 1 | 'a'>, NotAssignable<any, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<any, object>, NotAssignable<any, object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<unknown, any>, NotAssignable<unknown, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<unknown, unknown>, NotAssignable<unknown, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<unknown, never>, NotAssignable<unknown, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<unknown, void>, NotAssignable<unknown, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<unknown, undefined>, NotAssignable<unknown, undefined, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<NotAssignable<unknown, {}>, NotAssignable<unknown, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<unknown, {} | null | undefined>,
			NotAssignable<unknown, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<unknown, number>, NotAssignable<unknown, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<unknown, 1 | 'a'>, NotAssignable<unknown, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<unknown, object>, NotAssignable<unknown, object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, any>, NotAssignable<never, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, unknown>, NotAssignable<never, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, never>, NotAssignable<never, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, void>, NotAssignable<never, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, undefined>, NotAssignable<never, undefined, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, {}>, NotAssignable<never, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<never, {} | null | undefined>,
			NotAssignable<never, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<never, number>, NotAssignable<never, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, 1 | 'a'>, NotAssignable<never, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<never, object>, NotAssignable<never, object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, any>, NotAssignable<void, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, unknown>, NotAssignable<void, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, never>, NotAssignable<void, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, void>, NotAssignable<void, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, undefined>, NotAssignable<void, undefined, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, {}>, NotAssignable<void, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<void, {} | null | undefined>,
			NotAssignable<void, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<void, number>, NotAssignable<void, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, 1 | 'a'>, NotAssignable<void, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<void, object>, NotAssignable<void, object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<undefined, any>, NotAssignable<undefined, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<undefined, unknown>, NotAssignable<undefined, unknown, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<NotAssignable<undefined, never>, NotAssignable<undefined, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<undefined, void>, NotAssignable<undefined, void, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<undefined, undefined>,
			NotAssignable<undefined, undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<undefined, {}>, NotAssignable<undefined, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<undefined, {} | null | undefined>,
			NotAssignable<undefined, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<undefined, number>, NotAssignable<undefined, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<undefined, 1 | 'a'>, NotAssignable<undefined, 1 | 'a', { selection: 'predicate' }>>(
			true,
		)
		testType.equal<NotAssignable<undefined, object>, NotAssignable<undefined, object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, any>, NotAssignable<{}, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, unknown>, NotAssignable<{}, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, never>, NotAssignable<{}, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, void>, NotAssignable<{}, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, undefined>, NotAssignable<{}, undefined, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, {}>, NotAssignable<{}, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<{}, {} | null | undefined>,
			NotAssignable<{}, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<{}, number>, NotAssignable<{}, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, 1 | 'a'>, NotAssignable<{}, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{}, object>, NotAssignable<{}, object, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, any>,
			NotAssignable<{} | null | undefined, any, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, unknown>,
			NotAssignable<{} | null | undefined, unknown, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, never>,
			NotAssignable<{} | null | undefined, never, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, void>,
			NotAssignable<{} | null | undefined, void, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, undefined>,
			NotAssignable<{} | null | undefined, undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, {}>,
			NotAssignable<{} | null | undefined, {}, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, {} | null | undefined>,
			NotAssignable<{} | null | undefined, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, number>,
			NotAssignable<{} | null | undefined, number, { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, 1 | 'a'>,
			NotAssignable<{} | null | undefined, 1 | 'a', { selection: 'predicate' }>
		>(true)
		testType.equal<
			NotAssignable<{} | null | undefined, object>,
			NotAssignable<{} | null | undefined, object, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<1, any>, NotAssignable<1, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1, unknown>, NotAssignable<1, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1, never>, NotAssignable<1, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1, void>, NotAssignable<1, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1, undefined>, NotAssignable<1, undefined, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1, {}>, NotAssignable<1, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<1, {} | null | undefined>,
			NotAssignable<1, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<1, number>, NotAssignable<1, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1, 1 | 'a'>, NotAssignable<1, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1, object>, NotAssignable<1, object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, any>, NotAssignable<number, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, unknown>, NotAssignable<number, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, never>, NotAssignable<number, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, void>, NotAssignable<number, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, undefined>, NotAssignable<number, undefined, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, {}>, NotAssignable<number, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<number, {} | null | undefined>,
			NotAssignable<number, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<number, number>, NotAssignable<number, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, 1 | 'a'>, NotAssignable<number, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<number, object>, NotAssignable<number, object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1 | 'a', any>, NotAssignable<1 | 'a', any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1 | 'a', unknown>, NotAssignable<1 | 'a', unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1 | 'a', never>, NotAssignable<1 | 'a', never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1 | 'a', void>, NotAssignable<1 | 'a', void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1 | 'a', undefined>, NotAssignable<1 | 'a', undefined, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<NotAssignable<1 | 'a', {}>, NotAssignable<1 | 'a', {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<1 | 'a', {} | null | undefined>,
			NotAssignable<1 | 'a', {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<1 | 'a', number>, NotAssignable<1 | 'a', number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1 | 'a', 1 | 'a'>, NotAssignable<1 | 'a', 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<1 | 'a', object>, NotAssignable<1 | 'a', object, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{ a: 1 }, any>, NotAssignable<{ a: 1 }, any, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{ a: 1 }, unknown>, NotAssignable<{ a: 1 }, unknown, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{ a: 1 }, never>, NotAssignable<{ a: 1 }, never, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{ a: 1 }, void>, NotAssignable<{ a: 1 }, void, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{ a: 1 }, undefined>, NotAssignable<{ a: 1 }, undefined, { selection: 'predicate' }>>(
			true,
		)
		testType.equal<NotAssignable<{ a: 1 }, {}>, NotAssignable<{ a: 1 }, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			NotAssignable<{ a: 1 }, {} | null | undefined>,
			NotAssignable<{ a: 1 }, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<NotAssignable<{ a: 1 }, number>, NotAssignable<{ a: 1 }, number, { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{ a: 1 }, 1 | 'a'>, NotAssignable<{ a: 1 }, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<NotAssignable<{ a: 1 }, object>, NotAssignable<{ a: 1 }, object, { selection: 'predicate' }>>(true)
	})

	it('resolves `NotAssignable.$Default` the same as no options', () => {
		// `NotAssignable.$Default` documents the default; the type never reads it, so pin the two together.
		testType.equal<NotAssignable<any, any, NotAssignable.$Default>, NotAssignable<any, any>>(true)
		testType.equal<NotAssignable<unknown, unknown, NotAssignable.$Default>, NotAssignable<unknown, unknown>>(true)
		testType.equal<NotAssignable<never, never, NotAssignable.$Default>, NotAssignable<never, never>>(true)
		testType.equal<NotAssignable<void, void, NotAssignable.$Default>, NotAssignable<void, void>>(true)
		testType.equal<NotAssignable<1, any, NotAssignable.$Default>, NotAssignable<1, any>>(true)
		testType.equal<NotAssignable<1, unknown, NotAssignable.$Default>, NotAssignable<1, unknown>>(true)
		testType.equal<NotAssignable<1, never, NotAssignable.$Default>, NotAssignable<1, never>>(true)
		testType.equal<NotAssignable<never, number, NotAssignable.$Default>, NotAssignable<never, number>>(true)
		testType.equal<NotAssignable<1, number, NotAssignable.$Default>, NotAssignable<1, number>>(true)
		testType.equal<NotAssignable<number, 1, NotAssignable.$Default>, NotAssignable<number, 1>>(true)
		testType.equal<NotAssignable<1 | 2, 1, NotAssignable.$Default>, NotAssignable<1 | 2, 1>>(true)
		testType.equal<NotAssignable<boolean, true, NotAssignable.$Default>, NotAssignable<boolean, true>>(true)
		testType.equal<NotAssignable<{ a: 1 }, {}, NotAssignable.$Default>, NotAssignable<{ a: 1 }, {}>>(true)
	})
})

describe('NotAssignable.$Fn', () => {
	it('is NotAssignable with its fixed input applied', () => {
		testType.equal<$Fn.Apply<NotAssignable.$Fn<'a'>, number>, true>(true)
		testType.equal<$Fn.Apply<NotAssignable.$Fn<number>, 1>, false>(true)
		testType.equal<TuplePlus.Filter<[1, 'a'], NotAssignable.$Fn<number>>, ['a']>(true)
	})
})
