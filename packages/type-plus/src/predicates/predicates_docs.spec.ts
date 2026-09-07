/**
 * Pins the `@example` blocks in the `src/predicates/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/predicates/*.ts`, so a
 * doc example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { expect, it } from 'vitest'

import {
	type Assignable,
	canAssign,
	type Extendable,
	type If,
	type IsAssign,
	type IsEmptyObject,
	type IsExtend,
	type IsNotExtend,
	type NotAssignable,
	type NotExtendable,
	testType,
} from '../index.js'

it('Extendable examples in TSDoc are accurate', () => {
	testType.equal<Extendable<1, number>, 1>(true)
	testType.equal<Extendable<string, number>, never>(true)
	testType.equal<Extendable<string, number, 'yes', 'no'>, 'no'>(true)
	// `Then` defaults to the whole `A`, so every surviving branch yields all of it
	testType.equal<Extendable<1 | 'a', number>, 1 | 'a'>(true)
})

it('NotExtendable examples in TSDoc are accurate', () => {
	testType.equal<NotExtendable<1, number>, never>(true)
	testType.equal<NotExtendable<string, number>, string>(true)
	testType.equal<NotExtendable<string, number, 'yes', 'no'>, 'yes'>(true)
})

it('IsExtend examples in TSDoc are accurate', () => {
	testType.equal<IsExtend<1, number>, true>(true)
	testType.equal<IsExtend<string, number>, false>(true)
	testType.equal<IsExtend<1 | 'a', number>, boolean>(true)
	testType.equal<IsExtend<any, number>, boolean>(true)
	testType.equal<IsExtend<never, number>, never>(true)
})

it('IsNotExtend examples in TSDoc are accurate', () => {
	testType.equal<IsNotExtend<1, number>, false>(true)
	testType.equal<IsNotExtend<string, number>, true>(true)
})

it('IsAssign examples in TSDoc are accurate', () => {
	testType.equal<IsAssign<1, number>, true>(true)
	testType.equal<IsAssign<boolean, boolean>, true>(true)
	testType.equal<IsAssign<number | string, number>, boolean>(true)
})

it('If examples in TSDoc are accurate', () => {
	testType.equal<If<true>, true>(true)
	testType.equal<If<false>, false>(true)
	testType.equal<If<true, 'yes', 'no'>, 'yes'>(true)
	testType.equal<If<boolean, 'yes', 'no'>, 'yes' | 'no'>(true)
})

it('IsEmptyObject examples in TSDoc are accurate', () => {
	testType.equal<IsEmptyObject<{}>, true>(true)
	// `{}` means "anything but null and undefined", so these pass too
	testType.equal<IsEmptyObject<object>, true>(true)
	testType.equal<IsEmptyObject<Record<string, never>>, true>(true)

	testType.equal<IsEmptyObject<{ a: 1 }>, false>(true)
	testType.equal<IsEmptyObject<number>, false>(true)

	testType.equal<IsEmptyObject<never>, never>(true)
})

it('canAssign examples in TSDoc are accurate', () => {
	const ok = canAssign<{ a: string }>()({ a: 'a' })
	expect(ok).toBe(true)
	testType.equal<typeof ok, true>(true)

	// extra properties are fine
	expect(canAssign<{ a: string }>()({ a: 'a', b: 'b' })).toBe(true)

	const t = canAssign<{ a: string }>(false)
	// not assignable, which is what was asserted
	t({ a: 1 })
	// @ts-expect-error -- assignable, so the negative assertion fails
	t({ a: '' })
})

/**
 * Pins the replacement each deprecated `Extends.ts` type names in its TSDoc.
 *
 * #665 lists all four for removal, so the claim that a modern type reproduces
 * them has to be checked rather than asserted -- a migration note that is
 * wrong is worse than none. `Assignable.$` (the type util) is the equivalent,
 * not plain `Assignable`: the latter special-cases `any`, `never` and
 * `unknown`, which these types do not.
 */
it('the Extends.ts replacements named in TSDoc are exact', () => {
	type IE<A, B, T = true, E = false> = Assignable.$<A, B, { $then: T; $else: E }>

	testType.equal<IsExtend<1, number>, IE<1, number>>(true)
	testType.equal<IsExtend<string, number>, IE<string, number>>(true)
	testType.equal<IsExtend<1 | 'a', number>, IE<1 | 'a', number>>(true)
	testType.equal<IsExtend<any, number>, IE<any, number>>(true)
	testType.equal<IsExtend<never, number>, IE<never, number>>(true)
	testType.equal<IsExtend<unknown, number>, IE<unknown, number>>(true)
	testType.equal<IsExtend<number, any>, IE<number, any>>(true)
	testType.equal<IsExtend<number, never>, IE<number, never>>(true)
	testType.equal<IsExtend<{ a: 1 }, { a: number }>, IE<{ a: 1 }, { a: number }>>(true)
	testType.equal<IsExtend<string, number, 'yes', 'no'>, IE<string, number, 'yes', 'no'>>(true)

	type INE<A, B, T = true, E = false> = NotAssignable.$<A, B, { $then: T; $else: E }>

	testType.equal<IsNotExtend<1, number>, INE<1, number>>(true)
	testType.equal<IsNotExtend<string, number>, INE<string, number>>(true)
	testType.equal<IsNotExtend<1 | 'a', number>, INE<1 | 'a', number>>(true)
	testType.equal<IsNotExtend<any, number>, INE<any, number>>(true)
	testType.equal<IsNotExtend<never, number>, INE<never, number>>(true)
	testType.equal<IsNotExtend<unknown, number>, INE<unknown, number>>(true)
	testType.equal<IsNotExtend<string, number, 'yes', 'no'>, INE<string, number, 'yes', 'no'>>(true)

	// plain `Assignable` is not the replacement: it handles the special types
	testType.equal<Assignable<any, number>, true>(true)
	testType.equal<IsExtend<any, number>, boolean>(true)

	// the filter pair agrees except on a union, where the modern type returns
	// the matching member rather than all of `A`
	testType.equal<Extendable<1, number>, Assignable.$<1, number, { selection: 'filter' }>>(true)
	testType.equal<Extendable<string, number>, Assignable.$<string, number, { selection: 'filter' }>>(true)
	testType.equal<Extendable<1 | 'a', number>, 1 | 'a'>(true)
	testType.equal<Assignable.$<1 | 'a', number, { selection: 'filter' }>, 1>(true)

	testType.equal<NotExtendable<string, number>, NotAssignable.$<string, number, { selection: 'filter' }>>(true)
	testType.equal<NotExtendable<1 | 'a', number>, 1 | 'a'>(true)
	testType.equal<NotAssignable.$<1 | 'a', number, { selection: 'filter' }>, 'a'>(true)

	// a capability the deprecated four cannot express at all
	testType.equal<Assignable.$<1 | 'a', number, { distributive: false }>, false>(true)
})
