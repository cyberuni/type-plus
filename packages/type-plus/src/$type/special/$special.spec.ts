import { describe, it } from 'vitest'
import { type $Special, testType } from '../../index.js'

it('act as predicate by default', () => {
	testType.equal<$Special<any>, true>(true)
	testType.equal<$Special<unknown>, true>(true)
	testType.equal<$Special<never>, true>(true)
	testType.equal<$Special<void>, true>(true)
	testType.equal<$Special<undefined>, false>(true)
	testType.equal<$Special<null>, false>(true)
	testType.equal<$Special<boolean>, false>(true)
	testType.equal<$Special<true>, false>(true)
	testType.equal<$Special<number>, false>(true)
	testType.equal<$Special<1>, false>(true)
	testType.equal<$Special<string>, false>(true)
	testType.equal<$Special<''>, false>(true)
	testType.equal<$Special<symbol>, false>(true)
	testType.equal<$Special<bigint>, false>(true)
	testType.equal<$Special<1n>, false>(true)
	testType.equal<$Special<{}>, false>(true)
	testType.equal<$Special<{ a: 1 }>, false>(true)
	testType.equal<$Special<string[]>, false>(true)
	testType.equal<$Special<[]>, false>(true)
	testType.equal<$Special<Function>, false>(true)
	testType.equal<$Special<() => void>, false>(true)
})

it('can handle any specifically', () => {
	testType.equal<$Special<any, { $any: 1 }>, 1>(true)
})

it('can handle unknown specifically', () => {
	testType.equal<$Special<unknown, { $unknown: 1 }>, 1>(true)
})

it('can handle never specifically', () => {
	testType.equal<$Special<never, { $never: 1 }>, 1>(true)
})

it('can handle void specifically', () => {
	testType.equal<$Special<void, { $void: 1 }>, 1>(true)
})

it('can handle all special types in $then branch', () => {
	testType.equal<$Special<any, { $then: 1 }>, 1>(true)
	testType.equal<$Special<unknown, { $then: 1 }>, 1>(true)
	testType.equal<$Special<never, { $then: 1 }>, 1>(true)
	testType.equal<$Special<void, { $then: 1 }>, 1>(true)
})

it('can handle all non special types in $else branch', () => {
	testType.equal<$Special<undefined, { $else: 1 }>, 1>(true)
	testType.equal<$Special<null, { $else: 1 }>, 1>(true)
	testType.equal<$Special<boolean, { $else: 1 }>, 1>(true)
	testType.equal<$Special<true, { $else: 1 }>, 1>(true)
	testType.equal<$Special<number, { $else: 1 }>, 1>(true)
	testType.equal<$Special<1, { $else: 1 }>, 1>(true)
	testType.equal<$Special<string, { $else: 1 }>, 1>(true)
	testType.equal<$Special<'', { $else: 1 }>, 1>(true)
	testType.equal<$Special<symbol, { $else: 1 }>, 1>(true)
	testType.equal<$Special<bigint, { $else: 1 }>, 1>(true)
	testType.equal<$Special<1n, { $else: 1 }>, 1>(true)
	testType.equal<$Special<{}, { $else: 1 }>, 1>(true)
	testType.equal<$Special<{ a: 1 }, { $else: 1 }>, 1>(true)
	testType.equal<$Special<string[], { $else: 1 }>, 1>(true)
	testType.equal<$Special<[], { $else: 1 }>, 1>(true)
	testType.equal<$Special<Function, { $else: 1 }>, 1>(true)
	testType.equal<$Special<() => void, { $else: 1 }>, 1>(true)
})

it('supports filter', () => {
	testType.equal<$Special<any, { selection: 'filter' }>, any>(true)
	testType.equal<$Special<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<$Special<never, { selection: 'filter' }>, never>(true)
	testType.equal<$Special<void, { selection: 'filter' }>, void>(true)
	testType.equal<$Special<number, { selection: 'filter' }>, never>(true)
})

type Answers = { $any: 1; $unknown: 2; $never: 3; $void: 4; $else: 5 }

describe('Values', () => {
	it('picks the answer for the special type', () => {
		testType.equal<$Special.Values<any, Answers>, 1>(true)
		testType.equal<$Special.Values<unknown, Answers>, 2>(true)
		testType.equal<$Special.Values<never, Answers>, 3>(true)
		testType.equal<$Special.Values<void, Answers>, 4>(true)
		testType.equal<$Special.Values<string, Answers>, 5>(true)
	})

	it('detects special types as $Special does', () => {
		testType.equal<$Special.Values<any, Answers>, $Special<any, Answers>>(true)
		testType.equal<$Special.Values<unknown, Answers>, $Special<unknown, Answers>>(true)
		testType.equal<$Special.Values<never, Answers>, $Special<never, Answers>>(true)
		testType.equal<$Special.Values<void, Answers>, $Special<void, Answers>>(true)
		testType.equal<$Special.Values<undefined, Answers>, $Special<undefined, Answers>>(true)
		testType.equal<$Special.Values<null, Answers>, $Special<null, Answers>>(true)
		testType.equal<$Special.Values<{}, Answers>, $Special<{}, Answers>>(true)
		testType.equal<$Special.Values<{} | null | undefined, Answers>, $Special<{} | null | undefined, Answers>>(true)
		testType.equal<$Special.Values<void | undefined, Answers>, $Special<void | undefined, Answers>>(true)
		testType.equal<$Special.Values<string, Answers>, $Special<string, Answers>>(true)
		testType.equal<$Special.Values<1, Answers>, $Special<1, Answers>>(true)
		testType.equal<$Special.Values<{ a: 1 }, Answers>, $Special<{ a: 1 }, Answers>>(true)
		testType.equal<$Special.Values<() => void, Answers>, $Special<() => void, Answers>>(true)
		testType.equal<$Special.Values<string[], Answers>, $Special<string[], Answers>>(true)
		testType.equal<$Special.Values<{} | 1, Answers>, $Special<{} | 1, Answers>>(true)
		testType.equal<$Special.Values<never | 1, Answers>, $Special<never | 1, Answers>>(true)
		testType.equal<$Special.Values<unknown | 1, Answers>, $Special<unknown | 1, Answers>>(true)
		testType.equal<$Special.Values<any | 1, Answers>, $Special<any | 1, Answers>>(true)
	})
})
