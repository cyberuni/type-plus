import { test } from 'vitest'

import {
	type Assignable,
	type Extendable,
	type IsExtend,
	type IsNotExtend,
	type NotAssignable,
	type NotExtendable,
	testType,
} from '../index.js'

test('Extendable filters to A when A extends B, and to never when it does not', () => {
	testType.equal<Extendable<1, number>, 1>(true)
	testType.equal<Extendable<string, number>, never>(true)
})

test('Extendable takes explicit Then/Else', () => {
	testType.equal<Extendable<string, number, 'yes', 'no'>, 'no'>(true)
})

test('Extendable yields the whole A on a union, not the matching member', () => {
	// `Then` defaults to the whole `A`, so every surviving branch yields all of it
	testType.equal<Extendable<1 | 'a', number>, 1 | 'a'>(true)
})

test('NotExtendable filters to A when A does not extend B, and to never when it does', () => {
	testType.equal<NotExtendable<1, number>, never>(true)
	testType.equal<NotExtendable<string, number>, string>(true)
})

test('NotExtendable takes explicit Then/Else', () => {
	testType.equal<NotExtendable<string, number, 'yes', 'no'>, 'yes'>(true)
})

test('IsExtend predicates whether A extends B', () => {
	testType.equal<IsExtend<1, number>, true>(true)
	testType.equal<IsExtend<string, number>, false>(true)
})

test('IsExtend distributes and does not special-case the special types', () => {
	testType.equal<IsExtend<1 | 'a', number>, boolean>(true)
	testType.equal<IsExtend<any, number>, boolean>(true)
	testType.equal<IsExtend<never, number>, never>(true)
})

test('IsNotExtend predicates whether A does not extend B', () => {
	testType.equal<IsNotExtend<1, number>, false>(true)
	testType.equal<IsNotExtend<string, number>, true>(true)
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
test('Assignable.$ and NotAssignable.$ reproduce the deprecated Extends types', () => {
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
