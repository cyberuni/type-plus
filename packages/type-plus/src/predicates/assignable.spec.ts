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

it('answers unknown-like unions such as `{} | null | undefined` structurally', () => {
	// TypeScript relates `unknown` and `{} | null | undefined` both ways,
	// so `$Special` sees the union as `unknown`; it must still be answered by assignability.
	testType.equal<Assignable<unknown, {} | null | undefined>, true>(true)
	testType.equal<Assignable<unknown, object | null | undefined>, false>(true)
	testType.equal<Assignable<{} | null | undefined, object | null | undefined>, true>(true)
	testType.equal<Assignable<{} | null | undefined, { a?: 1 } | null | undefined>, true>(true)
	testType.equal<Assignable<{} | null | undefined, {}>, false>(true)
	testType.equal<Assignable<{} | null | undefined, object | null | undefined, { $unknown: 1 }>, 1>(true)
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

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<Assignable<any, any>, Assignable<any, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<any, unknown>, Assignable<any, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<any, never>, Assignable<any, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<any, void>, Assignable<any, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<any, undefined>, Assignable<any, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<any, {}>, Assignable<any, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<any, {} | null | undefined>,
			Assignable<any, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<any, number>, Assignable<any, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<any, 1 | 'a'>, Assignable<any, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<any, object>, Assignable<any, object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, any>, Assignable<unknown, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, unknown>, Assignable<unknown, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, never>, Assignable<unknown, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, void>, Assignable<unknown, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, undefined>, Assignable<unknown, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, {}>, Assignable<unknown, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<unknown, {} | null | undefined>,
			Assignable<unknown, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<unknown, number>, Assignable<unknown, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, 1 | 'a'>, Assignable<unknown, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<unknown, object>, Assignable<unknown, object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, any>, Assignable<never, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, unknown>, Assignable<never, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, never>, Assignable<never, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, void>, Assignable<never, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, undefined>, Assignable<never, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, {}>, Assignable<never, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<never, {} | null | undefined>,
			Assignable<never, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<never, number>, Assignable<never, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, 1 | 'a'>, Assignable<never, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<never, object>, Assignable<never, object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, any>, Assignable<void, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, unknown>, Assignable<void, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, never>, Assignable<void, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, void>, Assignable<void, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, undefined>, Assignable<void, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, {}>, Assignable<void, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<void, {} | null | undefined>,
			Assignable<void, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<void, number>, Assignable<void, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, 1 | 'a'>, Assignable<void, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<void, object>, Assignable<void, object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, any>, Assignable<undefined, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, unknown>, Assignable<undefined, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, never>, Assignable<undefined, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, void>, Assignable<undefined, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, undefined>, Assignable<undefined, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, {}>, Assignable<undefined, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<undefined, {} | null | undefined>,
			Assignable<undefined, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<undefined, number>, Assignable<undefined, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, 1 | 'a'>, Assignable<undefined, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<undefined, object>, Assignable<undefined, object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, any>, Assignable<{}, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, unknown>, Assignable<{}, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, never>, Assignable<{}, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, void>, Assignable<{}, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, undefined>, Assignable<{}, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, {}>, Assignable<{}, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<{}, {} | null | undefined>,
			Assignable<{}, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<{}, number>, Assignable<{}, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, 1 | 'a'>, Assignable<{}, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{}, object>, Assignable<{}, object, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<{} | null | undefined, any>,
			Assignable<{} | null | undefined, any, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, unknown>,
			Assignable<{} | null | undefined, unknown, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, never>,
			Assignable<{} | null | undefined, never, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, void>,
			Assignable<{} | null | undefined, void, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, undefined>,
			Assignable<{} | null | undefined, undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, {}>,
			Assignable<{} | null | undefined, {}, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, {} | null | undefined>,
			Assignable<{} | null | undefined, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, number>,
			Assignable<{} | null | undefined, number, { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, 1 | 'a'>,
			Assignable<{} | null | undefined, 1 | 'a', { selection: 'predicate' }>
		>(true)
		testType.equal<
			Assignable<{} | null | undefined, object>,
			Assignable<{} | null | undefined, object, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<1, any>, Assignable<1, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1, unknown>, Assignable<1, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1, never>, Assignable<1, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1, void>, Assignable<1, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1, undefined>, Assignable<1, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1, {}>, Assignable<1, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<1, {} | null | undefined>,
			Assignable<1, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<1, number>, Assignable<1, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1, 1 | 'a'>, Assignable<1, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1, object>, Assignable<1, object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, any>, Assignable<number, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, unknown>, Assignable<number, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, never>, Assignable<number, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, void>, Assignable<number, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, undefined>, Assignable<number, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, {}>, Assignable<number, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<number, {} | null | undefined>,
			Assignable<number, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<number, number>, Assignable<number, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, 1 | 'a'>, Assignable<number, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<number, object>, Assignable<number, object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', any>, Assignable<1 | 'a', any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', unknown>, Assignable<1 | 'a', unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', never>, Assignable<1 | 'a', never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', void>, Assignable<1 | 'a', void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', undefined>, Assignable<1 | 'a', undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', {}>, Assignable<1 | 'a', {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<1 | 'a', {} | null | undefined>,
			Assignable<1 | 'a', {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<1 | 'a', number>, Assignable<1 | 'a', number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', 1 | 'a'>, Assignable<1 | 'a', 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<1 | 'a', object>, Assignable<1 | 'a', object, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, any>, Assignable<{ a: 1 }, any, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, unknown>, Assignable<{ a: 1 }, unknown, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, never>, Assignable<{ a: 1 }, never, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, void>, Assignable<{ a: 1 }, void, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, undefined>, Assignable<{ a: 1 }, undefined, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, {}>, Assignable<{ a: 1 }, {}, { selection: 'predicate' }>>(true)
		testType.equal<
			Assignable<{ a: 1 }, {} | null | undefined>,
			Assignable<{ a: 1 }, {} | null | undefined, { selection: 'predicate' }>
		>(true)
		testType.equal<Assignable<{ a: 1 }, number>, Assignable<{ a: 1 }, number, { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, 1 | 'a'>, Assignable<{ a: 1 }, 1 | 'a', { selection: 'predicate' }>>(true)
		testType.equal<Assignable<{ a: 1 }, object>, Assignable<{ a: 1 }, object, { selection: 'predicate' }>>(true)
	})

	it('resolves `Assignable.$Default` the same as no options', () => {
		// `Assignable.$Default` documents the default; the type never reads it, so pin the two together.
		testType.equal<Assignable<any, any, Assignable.$Default>, Assignable<any, any>>(true)
		testType.equal<Assignable<unknown, unknown, Assignable.$Default>, Assignable<unknown, unknown>>(true)
		testType.equal<Assignable<never, never, Assignable.$Default>, Assignable<never, never>>(true)
		testType.equal<Assignable<void, void, Assignable.$Default>, Assignable<void, void>>(true)
		testType.equal<Assignable<1, any, Assignable.$Default>, Assignable<1, any>>(true)
		testType.equal<Assignable<1, unknown, Assignable.$Default>, Assignable<1, unknown>>(true)
		testType.equal<Assignable<1, never, Assignable.$Default>, Assignable<1, never>>(true)
		testType.equal<Assignable<never, number, Assignable.$Default>, Assignable<never, number>>(true)
		testType.equal<Assignable<1, number, Assignable.$Default>, Assignable<1, number>>(true)
		testType.equal<Assignable<number, 1, Assignable.$Default>, Assignable<number, 1>>(true)
		testType.equal<Assignable<1 | 2, 1, Assignable.$Default>, Assignable<1 | 2, 1>>(true)
		testType.equal<Assignable<boolean, true, Assignable.$Default>, Assignable<boolean, true>>(true)
		testType.equal<Assignable<{ a: 1 }, {}, Assignable.$Default>, Assignable<{ a: 1 }, {}>>(true)
	})
})

describe('option keys', () => {
	it('accepts the known options', () => {
		testType.equal<Assignable<1 | 'a', number, { distributive: false; selection: 'filter' }>, never>(true)
	})

	it('rejects a misspelled key next to a valid one', () => {
		// @ts-expect-error 'distributiv' is not a valid option. Did you mean 'distributive'?
		testType.never<Assignable<1, number, { distributiv: false; selection: 'filter' }>>(false)
	})

	it('rejects a key another predicate has', () => {
		// @ts-expect-error 'exact' is not a valid option
		testType.never<Assignable<1, number, { exact: true; distributive: false }>>(false)
	})
})
