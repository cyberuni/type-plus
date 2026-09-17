import { describe, it } from 'vitest'
import { type $Else, type $Then, type Equal, type Head, testType } from '../index.js'

describe('any', () => {
	it('basic comparison', () => {
		testType.true<Equal<any, any>>(true)
		testType.false<Equal<any, unknown>>(true)
		testType.false<Equal<any, never>>(true)
		testType.false<Equal<any, void>>(true)
		testType.false<Equal<any, undefined>>(true)
		testType.false<Equal<any, null>>(true)
		testType.false<Equal<any, boolean>>(true)
		testType.false<Equal<any, true>>(true)
		testType.false<Equal<any, false>>(true)
		testType.false<Equal<any, number>>(true)
		testType.false<Equal<any, 1>>(true)
		testType.false<Equal<any, string>>(true)
		testType.false<Equal<any, ''>>(true)
		testType.false<Equal<any, symbol>>(true)
		testType.false<Equal<any, bigint>>(true)
		testType.false<Equal<any, 1n>>(true)
		testType.false<Equal<any, object>>(true)
		testType.false<Equal<any, {}>>(true)
		testType.false<Equal<any, { a: 1 }>>(true)
		testType.false<Equal<any, string[]>>(true)
		testType.false<Equal<any, []>>(true)
		testType.false<Equal<any, Function>>(true)
		testType.false<Equal<any, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<any, any, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<any, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<any, any, { $then: 1 }>, 1>(true)
		testType.equal<Equal<any, '', { $else: 1 }>, 1>(true)
	})
})

describe('unknown', () => {
	it('basic comparison', () => {
		testType.true<Equal<unknown, unknown>>(true)
		testType.false<Equal<unknown, any>>(true)
		testType.false<Equal<unknown, never>>(true)
		testType.false<Equal<unknown, void>>(true)
		testType.false<Equal<unknown, undefined>>(true)
		testType.false<Equal<unknown, null>>(true)
		testType.false<Equal<unknown, boolean>>(true)
		testType.false<Equal<unknown, true>>(true)
		testType.false<Equal<unknown, false>>(true)
		testType.false<Equal<unknown, number>>(true)
		testType.false<Equal<unknown, 1>>(true)
		testType.false<Equal<unknown, string>>(true)
		testType.false<Equal<unknown, ''>>(true)
		testType.false<Equal<unknown, symbol>>(true)
		testType.false<Equal<unknown, bigint>>(true)
		testType.false<Equal<unknown, 1n>>(true)
		testType.false<Equal<unknown, object>>(true)
		testType.false<Equal<unknown, {}>>(true)
		testType.false<Equal<unknown, { a: 1 }>>(true)
		testType.false<Equal<unknown, string[]>>(true)
		testType.false<Equal<unknown, []>>(true)
		testType.false<Equal<unknown, Function>>(true)
		testType.false<Equal<unknown, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<unknown, unknown, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<unknown, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<unknown, unknown, { $then: 1 }>, 1>(true)
		testType.equal<Equal<unknown, '', { $else: 1 }>, 1>(true)
	})
})

describe('never', () => {
	it('basic comparison', () => {
		testType.true<Equal<never, never>>(true)
		testType.false<Equal<never, any>>(true)
		testType.false<Equal<never, unknown>>(true)
		testType.false<Equal<never, void>>(true)
		testType.false<Equal<never, 1>>(true)
		testType.false<Equal<never, undefined>>(true)
		testType.false<Equal<never, null>>(true)
		testType.false<Equal<never, boolean>>(true)
		testType.false<Equal<never, true>>(true)
		testType.false<Equal<never, false>>(true)
		testType.false<Equal<never, number>>(true)
		testType.false<Equal<never, 1>>(true)
		testType.false<Equal<never, string>>(true)
		testType.false<Equal<never, ''>>(true)
		testType.false<Equal<never, symbol>>(true)
		testType.false<Equal<never, bigint>>(true)
		testType.false<Equal<never, 1n>>(true)
		testType.false<Equal<never, object>>(true)
		testType.false<Equal<never, {}>>(true)
		testType.false<Equal<never, { a: 1 }>>(true)
		testType.false<Equal<never, string[]>>(true)
		testType.false<Equal<never, []>>(true)
		testType.false<Equal<never, Function>>(true)
		testType.false<Equal<never, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<never, never, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<never, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<never, never, { $then: 1 }>, 1>(true)
		testType.equal<Equal<never, '', { $else: 1 }>, 1>(true)
	})
})

describe('void', () => {
	it('basic comparison', () => {
		testType.true<Equal<void, void>>(true)
		testType.false<Equal<void, any>>(true)
		testType.false<Equal<void, unknown>>(true)
		testType.false<Equal<void, never>>(true)
		testType.false<Equal<void, undefined>>(true)
		testType.false<Equal<void, null>>(true)
		testType.false<Equal<void, boolean>>(true)
		testType.false<Equal<void, true>>(true)
		testType.false<Equal<void, false>>(true)
		testType.false<Equal<void, number>>(true)
		testType.false<Equal<void, 1>>(true)
		testType.false<Equal<void, string>>(true)
		testType.false<Equal<void, ''>>(true)
		testType.false<Equal<void, symbol>>(true)
		testType.false<Equal<void, bigint>>(true)
		testType.false<Equal<void, 1n>>(true)
		testType.false<Equal<void, object>>(true)
		testType.false<Equal<void, {}>>(true)
		testType.false<Equal<void, { a: 1 }>>(true)
		testType.false<Equal<void, string[]>>(true)
		testType.false<Equal<void, []>>(true)
		testType.false<Equal<void, Function>>(true)
		testType.false<Equal<void, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<void, void, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<void, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<void, void, { $then: 1 }>, 1>(true)
		testType.equal<Equal<void, '', { $else: 1 }>, 1>(true)
	})
})

describe('undefined', () => {
	it('basic comparison', () => {
		testType.true<Equal<undefined, undefined>>(true)
		testType.false<Equal<undefined, any>>(true)
		testType.false<Equal<undefined, unknown>>(true)
		testType.false<Equal<undefined, never>>(true)
		testType.false<Equal<undefined, void>>(true)
		testType.false<Equal<undefined, null>>(true)
		testType.false<Equal<undefined, boolean>>(true)
		testType.false<Equal<undefined, true>>(true)
		testType.false<Equal<undefined, false>>(true)
		testType.false<Equal<undefined, number>>(true)
		testType.false<Equal<undefined, 1>>(true)
		testType.false<Equal<undefined, string>>(true)
		testType.false<Equal<undefined, ''>>(true)
		testType.false<Equal<undefined, symbol>>(true)
		testType.false<Equal<undefined, bigint>>(true)
		testType.false<Equal<undefined, 1n>>(true)
		testType.false<Equal<undefined, object>>(true)
		testType.false<Equal<undefined, {}>>(true)
		testType.false<Equal<undefined, { a: 1 }>>(true)
		testType.false<Equal<undefined, string[]>>(true)
		testType.false<Equal<undefined, []>>(true)
		testType.false<Equal<undefined, Function>>(true)
		testType.false<Equal<undefined, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<undefined, undefined, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<undefined, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<undefined, undefined, { $then: 1 }>, 1>(true)
		testType.equal<Equal<undefined, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<undefined | 0, undefined | 0>, true>(true)
		testType.equal<Equal<undefined | 0, undefined>, false>(true)
		testType.equal<Equal<undefined, undefined | 0>, false>(true)
	})
})

describe('null', () => {
	it('basic comparison', () => {
		testType.true<Equal<null, null>>(true)
		testType.false<Equal<null, any>>(true)
		testType.false<Equal<null, unknown>>(true)
		testType.false<Equal<null, never>>(true)
		testType.false<Equal<null, void>>(true)
		testType.false<Equal<null, undefined>>(true)
		testType.false<Equal<null, boolean>>(true)
		testType.false<Equal<null, true>>(true)
		testType.false<Equal<null, false>>(true)
		testType.false<Equal<null, number>>(true)
		testType.false<Equal<null, 1>>(true)
		testType.false<Equal<null, string>>(true)
		testType.false<Equal<null, ''>>(true)
		testType.false<Equal<null, symbol>>(true)
		testType.false<Equal<null, bigint>>(true)
		testType.false<Equal<null, 1n>>(true)
		testType.false<Equal<null, object>>(true)
		testType.false<Equal<null, {}>>(true)
		testType.false<Equal<null, { a: 1 }>>(true)
		testType.false<Equal<null, string[]>>(true)
		testType.false<Equal<null, []>>(true)
		testType.false<Equal<null, Function>>(true)
		testType.false<Equal<null, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<null, null, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<null, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<null, null, { $then: 1 }>, 1>(true)
		testType.equal<Equal<null, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<null | 0, null | 0>, true>(true)
		testType.equal<Equal<null | 0, null>, false>(true)
		testType.equal<Equal<null, null | 0>, false>(true)
	})
})

describe('boolean', () => {
	it('basic comparison', () => {
		testType.true<Equal<boolean, boolean>>(true)
		testType.false<Equal<boolean, any>>(true)
		testType.false<Equal<boolean, unknown>>(true)
		testType.false<Equal<boolean, never>>(true)
		testType.false<Equal<boolean, void>>(true)
		testType.false<Equal<boolean, undefined>>(true)
		testType.false<Equal<boolean, null>>(true)
		testType.false<Equal<boolean, true>>(true)
		testType.false<Equal<boolean, false>>(true)
		testType.false<Equal<boolean, number>>(true)
		testType.false<Equal<boolean, 1>>(true)
		testType.false<Equal<boolean, string>>(true)
		testType.false<Equal<boolean, ''>>(true)
		testType.false<Equal<boolean, symbol>>(true)
		testType.false<Equal<boolean, bigint>>(true)
		testType.false<Equal<boolean, 1n>>(true)
		testType.false<Equal<boolean, object>>(true)
		testType.false<Equal<boolean, {}>>(true)
		testType.false<Equal<boolean, { a: 1 }>>(true)
		testType.false<Equal<boolean, string[]>>(true)
		testType.false<Equal<boolean, []>>(true)
		testType.false<Equal<boolean, Function>>(true)
		testType.false<Equal<boolean, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<boolean, boolean, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<boolean, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<boolean, boolean, { $then: 1 }>, 1>(true)
		testType.equal<Equal<boolean, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<boolean | 0, boolean | 0>, true>(true)
		testType.equal<Equal<boolean | 0, boolean>, false>(true)
		testType.equal<Equal<boolean, boolean | 0>, false>(true)
	})
})

describe('true', () => {
	it('basic comparison', () => {
		testType.true<Equal<true, true>>(true)
		testType.false<Equal<true, any>>(true)
		testType.false<Equal<true, unknown>>(true)
		testType.false<Equal<true, never>>(true)
		testType.false<Equal<true, void>>(true)
		testType.false<Equal<true, undefined>>(true)
		testType.false<Equal<true, null>>(true)
		testType.false<Equal<true, boolean>>(true)
		testType.false<Equal<true, false>>(true)
		testType.false<Equal<true, number>>(true)
		testType.false<Equal<true, 1>>(true)
		testType.false<Equal<true, string>>(true)
		testType.false<Equal<true, ''>>(true)
		testType.false<Equal<true, symbol>>(true)
		testType.false<Equal<true, bigint>>(true)
		testType.false<Equal<true, 1n>>(true)
		testType.false<Equal<true, object>>(true)
		testType.false<Equal<true, {}>>(true)
		testType.false<Equal<true, { a: 1 }>>(true)
		testType.false<Equal<true, string[]>>(true)
		testType.false<Equal<true, []>>(true)
		testType.false<Equal<true, Function>>(true)
		testType.false<Equal<true, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<true, true, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<true, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<true, true, { $then: 1 }>, 1>(true)
		testType.equal<Equal<true, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<true | 0, true | 0>, true>(true)
		testType.equal<Equal<true | 0, true>, false>(true)
		testType.equal<Equal<true, true | 0>, false>(true)
	})
})

describe('false', () => {
	it('basic comparison', () => {
		testType.true<Equal<false, false>>(true)
		testType.false<Equal<false, any>>(true)
		testType.false<Equal<false, unknown>>(true)
		testType.false<Equal<false, never>>(true)
		testType.false<Equal<false, void>>(true)
		testType.false<Equal<false, undefined>>(true)
		testType.false<Equal<false, null>>(true)
		testType.false<Equal<false, boolean>>(true)
		testType.false<Equal<false, true>>(true)
		testType.false<Equal<false, number>>(true)
		testType.false<Equal<false, 1>>(true)
		testType.false<Equal<false, string>>(true)
		testType.false<Equal<false, ''>>(true)
		testType.false<Equal<false, symbol>>(true)
		testType.false<Equal<false, bigint>>(true)
		testType.false<Equal<false, 1n>>(true)
		testType.false<Equal<false, object>>(true)
		testType.false<Equal<false, {}>>(true)
		testType.false<Equal<false, { a: 1 }>>(true)
		testType.false<Equal<false, string[]>>(true)
		testType.false<Equal<false, []>>(true)
		testType.false<Equal<false, Function>>(true)
		testType.false<Equal<false, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<false, false, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<false, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<false, false, { $then: 1 }>, 1>(true)
		testType.equal<Equal<false, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<false | 0, false | 0>, true>(true)
		testType.equal<Equal<false | 0, false>, false>(true)
		testType.equal<Equal<false, false | 0>, false>(true)
	})
})

describe('number', () => {
	it('basic comparison', () => {
		testType.true<Equal<number, number>>(true)
		testType.false<Equal<number, any>>(true)
		testType.false<Equal<number, unknown>>(true)
		testType.false<Equal<number, never>>(true)
		testType.false<Equal<number, void>>(true)
		testType.false<Equal<number, undefined>>(true)
		testType.false<Equal<number, null>>(true)
		testType.false<Equal<number, boolean>>(true)
		testType.false<Equal<number, true>>(true)
		testType.false<Equal<number, false>>(true)
		testType.false<Equal<number, 1>>(true)
		testType.false<Equal<number, string>>(true)
		testType.false<Equal<number, ''>>(true)
		testType.false<Equal<number, symbol>>(true)
		testType.false<Equal<number, bigint>>(true)
		testType.false<Equal<number, 1n>>(true)
		testType.false<Equal<number, object>>(true)
		testType.false<Equal<number, {}>>(true)
		testType.false<Equal<number, { a: 1 }>>(true)
		testType.false<Equal<number, string[]>>(true)
		testType.false<Equal<number, []>>(true)
		testType.false<Equal<number, Function>>(true)
		testType.false<Equal<number, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<number, number, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<number, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<number, number, { $then: 1 }>, 1>(true)
		testType.equal<Equal<number, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<number | '0', number | '0'>, true>(true)
		testType.equal<Equal<number | '0', number>, false>(true)
		testType.equal<Equal<number, number | '0'>, false>(true)
	})
})

describe('number literal', () => {
	it('basic comparison', () => {
		testType.true<Equal<1, 1>>(true)
		testType.false<Equal<1, any>>(true)
		testType.false<Equal<1, unknown>>(true)
		testType.false<Equal<1, never>>(true)
		testType.false<Equal<1, void>>(true)
		testType.false<Equal<1, undefined>>(true)
		testType.false<Equal<1, null>>(true)
		testType.false<Equal<1, boolean>>(true)
		testType.false<Equal<1, true>>(true)
		testType.false<Equal<1, false>>(true)
		testType.false<Equal<1, number>>(true)
		testType.false<Equal<1, 2>>(true)
		testType.false<Equal<1, string>>(true)
		testType.false<Equal<1, ''>>(true)
		testType.false<Equal<1, symbol>>(true)
		testType.false<Equal<1, bigint>>(true)
		testType.false<Equal<1, 1n>>(true)
		testType.false<Equal<1, object>>(true)
		testType.false<Equal<1, {}>>(true)
		testType.false<Equal<1, { a: 1 }>>(true)
		testType.false<Equal<1, string[]>>(true)
		testType.false<Equal<1, []>>(true)
		testType.false<Equal<1, Function>>(true)
		testType.false<Equal<1, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<1, 1, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<1, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<1, 1, { $then: 1 }>, 1>(true)
		testType.equal<Equal<1, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<1 | 0, 1 | 0>, true>(true)
		testType.equal<Equal<1 | 0, 1>, false>(true)
		testType.equal<Equal<1, 1 | 0>, false>(true)
	})
})

describe('string', () => {
	it('basic comparison', () => {
		testType.true<Equal<string, string>>(true)
		testType.false<Equal<string, any>>(true)
		testType.false<Equal<string, unknown>>(true)
		testType.false<Equal<string, never>>(true)
		testType.false<Equal<string, void>>(true)
		testType.false<Equal<string, undefined>>(true)
		testType.false<Equal<string, null>>(true)
		testType.false<Equal<string, boolean>>(true)
		testType.false<Equal<string, true>>(true)
		testType.false<Equal<string, false>>(true)
		testType.false<Equal<string, number>>(true)
		testType.false<Equal<string, 1>>(true)
		testType.false<Equal<string, ''>>(true)
		testType.false<Equal<string, symbol>>(true)
		testType.false<Equal<string, bigint>>(true)
		testType.false<Equal<string, 1n>>(true)
		testType.false<Equal<string, object>>(true)
		testType.false<Equal<string, {}>>(true)
		testType.false<Equal<string, { a: 1 }>>(true)
		testType.false<Equal<string, string[]>>(true)
		testType.false<Equal<string, []>>(true)
		testType.false<Equal<string, Function>>(true)
		testType.false<Equal<string, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<string, string, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<string, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<string, string, { $then: 1 }>, 1>(true)
		testType.equal<Equal<string, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<string | 0, string | 0>, true>(true)
		testType.equal<Equal<string | 0, string>, false>(true)
		testType.equal<Equal<string, string | 0>, false>(true)
	})
})

describe('string literal', () => {
	it('basic comparison', () => {
		testType.true<Equal<'a', 'a'>>(true)
		testType.false<Equal<'a', any>>(true)
		testType.false<Equal<'a', unknown>>(true)
		testType.false<Equal<'a', never>>(true)
		testType.false<Equal<'a', void>>(true)
		testType.false<Equal<'a', undefined>>(true)
		testType.false<Equal<'a', null>>(true)
		testType.false<Equal<'a', boolean>>(true)
		testType.false<Equal<'a', true>>(true)
		testType.false<Equal<'a', false>>(true)
		testType.false<Equal<'a', number>>(true)
		testType.false<Equal<'a', string>>(true)
		testType.false<Equal<'a', ''>>(true)
		testType.false<Equal<'a', symbol>>(true)
		testType.false<Equal<'a', bigint>>(true)
		testType.false<Equal<'a', 1n>>(true)
		testType.false<Equal<'a', object>>(true)
		testType.false<Equal<'a', {}>>(true)
		testType.false<Equal<'a', { a: 1 }>>(true)
		testType.false<Equal<'a', string[]>>(true)
		testType.false<Equal<'a', []>>(true)
		testType.false<Equal<'a', Function>>(true)
		testType.false<Equal<'a', () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<'a', 'a', Equal.$Branch>, $Then>(true)
		testType.equal<Equal<'a', 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<'a', 'a', { $then: 1 }>, 1>(true)
		testType.equal<Equal<'a', '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<'a' | 0, 'a' | 0>, true>(true)
		testType.equal<Equal<'a' | 0, 'a'>, false>(true)
		testType.equal<Equal<'a', 'a' | 0>, false>(true)
	})
})

describe('symbol', () => {
	it('basic comparison', () => {
		testType.true<Equal<symbol, symbol>>(true)
		testType.false<Equal<symbol, any>>(true)
		testType.false<Equal<symbol, unknown>>(true)
		testType.false<Equal<symbol, never>>(true)
		testType.false<Equal<symbol, void>>(true)
		testType.false<Equal<symbol, undefined>>(true)
		testType.false<Equal<symbol, null>>(true)
		testType.false<Equal<symbol, boolean>>(true)
		testType.false<Equal<symbol, true>>(true)
		testType.false<Equal<symbol, false>>(true)
		testType.false<Equal<symbol, number>>(true)
		testType.false<Equal<symbol, 1>>(true)
		testType.false<Equal<symbol, string>>(true)
		testType.false<Equal<symbol, ''>>(true)
		testType.false<Equal<symbol, bigint>>(true)
		testType.false<Equal<symbol, 1n>>(true)
		testType.false<Equal<symbol, object>>(true)
		testType.false<Equal<symbol, {}>>(true)
		testType.false<Equal<symbol, { a: 1 }>>(true)
		testType.false<Equal<symbol, string[]>>(true)
		testType.false<Equal<symbol, []>>(true)
		testType.false<Equal<symbol, Function>>(true)
		testType.false<Equal<symbol, () => void>>(true)
	})

	it('compares actual symbol', () => {
		const s = Symbol()
		testType.true<Equal<typeof s, typeof s>>(true)
		testType.false<Equal<typeof s, symbol>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<symbol, symbol, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<symbol, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<symbol, symbol, { $then: 1 }>, 1>(true)
		testType.equal<Equal<symbol, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<symbol | 0, symbol | 0>, true>(true)
		testType.equal<Equal<symbol | 0, symbol>, false>(true)
		testType.equal<Equal<symbol, symbol | 0>, false>(true)
	})
})

describe('bigint', () => {
	it('basic comparison', () => {
		testType.true<Equal<bigint, bigint>>(true)
		testType.false<Equal<bigint, any>>(true)
		testType.false<Equal<bigint, unknown>>(true)
		testType.false<Equal<bigint, never>>(true)
		testType.false<Equal<bigint, void>>(true)
		testType.false<Equal<bigint, undefined>>(true)
		testType.false<Equal<bigint, null>>(true)
		testType.false<Equal<bigint, boolean>>(true)
		testType.false<Equal<bigint, true>>(true)
		testType.false<Equal<bigint, false>>(true)
		testType.false<Equal<bigint, number>>(true)
		testType.false<Equal<bigint, 1>>(true)
		testType.false<Equal<bigint, string>>(true)
		testType.false<Equal<bigint, ''>>(true)
		testType.false<Equal<bigint, symbol>>(true)
		testType.false<Equal<bigint, 1n>>(true)
		testType.false<Equal<bigint, object>>(true)
		testType.false<Equal<bigint, {}>>(true)
		testType.false<Equal<bigint, { a: 1 }>>(true)
		testType.false<Equal<bigint, string[]>>(true)
		testType.false<Equal<bigint, []>>(true)
		testType.false<Equal<bigint, Function>>(true)
		testType.false<Equal<bigint, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<bigint, bigint, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<bigint, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<bigint, bigint, { $then: 1 }>, 1>(true)
		testType.equal<Equal<bigint, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<bigint | 0, bigint | 0>, true>(true)
		testType.equal<Equal<bigint | 0, bigint>, false>(true)
		testType.equal<Equal<bigint, bigint | 0>, false>(true)
	})
})

describe('bigint literal', () => {
	it('basic comparison', () => {
		testType.true<Equal<2n, 2n>>(true)
		testType.false<Equal<2n, any>>(true)
		testType.false<Equal<2n, unknown>>(true)
		testType.false<Equal<2n, never>>(true)
		testType.false<Equal<2n, void>>(true)
		testType.false<Equal<2n, undefined>>(true)
		testType.false<Equal<2n, null>>(true)
		testType.false<Equal<2n, boolean>>(true)
		testType.false<Equal<2n, true>>(true)
		testType.false<Equal<2n, false>>(true)
		testType.false<Equal<2n, number>>(true)
		testType.false<Equal<2n, 1>>(true)
		testType.false<Equal<2n, string>>(true)
		testType.false<Equal<2n, ''>>(true)
		testType.false<Equal<2n, symbol>>(true)
		testType.false<Equal<2n, bigint>>(true)
		testType.false<Equal<2n, 1n>>(true)
		testType.false<Equal<2n, object>>(true)
		testType.false<Equal<2n, {}>>(true)
		testType.false<Equal<2n, { a: 1 }>>(true)
		testType.false<Equal<2n, string[]>>(true)
		testType.false<Equal<2n, []>>(true)
		testType.false<Equal<2n, Function>>(true)
		testType.false<Equal<2n, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<2n, 2n, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<2n, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<2n, 2n, { $then: 1 }>, 1>(true)
		testType.equal<Equal<2n, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<2n | 0, 2n | 0>, true>(true)
		testType.equal<Equal<2n | 0, 2n>, false>(true)
		testType.equal<Equal<2n, 2n | 0>, false>(true)
	})
})

describe('object', () => {
	it('basic comparison', () => {
		testType.true<Equal<object, object>>(true)
		testType.false<Equal<object, any>>(true)
		testType.false<Equal<object, unknown>>(true)
		testType.false<Equal<object, never>>(true)
		testType.false<Equal<object, void>>(true)
		testType.false<Equal<object, undefined>>(true)
		testType.false<Equal<object, null>>(true)
		testType.false<Equal<object, boolean>>(true)
		testType.false<Equal<object, true>>(true)
		testType.false<Equal<object, false>>(true)
		testType.false<Equal<object, number>>(true)
		testType.false<Equal<object, 1>>(true)
		testType.false<Equal<object, string>>(true)
		testType.false<Equal<object, ''>>(true)
		testType.false<Equal<object, symbol>>(true)
		testType.false<Equal<object, 1n>>(true)
		testType.false<Equal<object, {}>>(true)
		testType.false<Equal<object, { a: 1 }>>(true)
		testType.false<Equal<object, string[]>>(true)
		testType.false<Equal<object, []>>(true)
		testType.false<Equal<object, Function>>(true)
		testType.false<Equal<object, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<object, object, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<object, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<object, object, { $then: 1 }>, 1>(true)
		testType.equal<Equal<object, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<object | 0, object | 0>, true>(true)
		testType.equal<Equal<object | 0, object>, false>(true)
		testType.equal<Equal<object, object | 0>, false>(true)
	})
})

describe('object literal', () => {
	it('basic comparison', () => {
		testType.true<Equal<{}, {}>>(true)
		testType.true<Equal<{ a: 2 }, { a: 2 }>>(true)
		testType.false<Equal<{}, any>>(true)
		testType.false<Equal<{}, unknown>>(true)
		testType.false<Equal<{}, never>>(true)
		testType.false<Equal<{}, void>>(true)
		testType.false<Equal<{}, undefined>>(true)
		testType.false<Equal<{}, null>>(true)
		testType.false<Equal<{}, boolean>>(true)
		testType.false<Equal<{}, true>>(true)
		testType.false<Equal<{}, false>>(true)
		testType.false<Equal<{}, number>>(true)
		testType.false<Equal<{}, 1>>(true)
		testType.false<Equal<{}, string>>(true)
		testType.false<Equal<{}, ''>>(true)
		testType.false<Equal<{}, symbol>>(true)
		testType.false<Equal<{}, 1n>>(true)
		testType.false<Equal<{}, object>>(true)
		testType.false<Equal<{}, { a: 1 }>>(true)
		testType.false<Equal<{}, string[]>>(true)
		testType.false<Equal<{}, []>>(true)
		testType.false<Equal<{}, Function>>(true)
		testType.false<Equal<{}, () => void>>(true)
	})

	it('object with any', () => {
		testType.false<Equal<{ a: any }, { a: 1 }>>(true)
		testType.false<Equal<{ a: 1 }, { a: any }>>(true)
		testType.true<Equal<{ a: any }, { a: any }>>(true)
	})

	it('A subset of B is false', () => {
		testType.false<Equal<{ a: 1 }, { a: 1; b: 1 }>>(true)
	})

	it('B subset of A is false', () => {
		testType.false<Equal<{ a: 1; b: 1 }, { a: 1 }>>(true)
	})

	it('disjoin is false', () => {
		testType.false<Equal<{ b: 1 }, { a: 1 }>>(true)
	})

	it('overlap is false', () => {
		testType.false<Equal<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<{ a: 1 }, { a: 1 }, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<{ a: 1 }, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<{ a: 1 }, { a: 1 }, { $then: 1 }>, 1>(true)
		testType.equal<Equal<{ a: 1 }, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<{ a: 1 } | 0, { a: 1 } | 0>, true>(true)
		testType.equal<Equal<{ a: 1 } | 0, { a: 1 }>, false>(true)
		testType.equal<Equal<{ a: 1 }, { a: 1 } | 0>, false>(true)
	})
})

describe('array', () => {
	it('basic comparison', () => {
		testType.true<Equal<number[], number[]>>(true)
		testType.false<Equal<number[], any>>(true)
		testType.false<Equal<number[], unknown>>(true)
		testType.false<Equal<number[], never>>(true)
		testType.false<Equal<number[], void>>(true)
		testType.false<Equal<number[], undefined>>(true)
		testType.false<Equal<number[], null>>(true)
		testType.false<Equal<number[], boolean>>(true)
		testType.false<Equal<number[], true>>(true)
		testType.false<Equal<number[], false>>(true)
		testType.false<Equal<number[], number>>(true)
		testType.false<Equal<number[], 1>>(true)
		testType.false<Equal<number[], string>>(true)
		testType.false<Equal<number[], ''>>(true)
		testType.false<Equal<number[], symbol>>(true)
		testType.false<Equal<number[], 1n>>(true)
		testType.false<Equal<number[], {}>>(true)
		testType.false<Equal<number[], { a: 1 }>>(true)
		testType.false<Equal<number[], string[]>>(true)
		testType.false<Equal<number[], []>>(true)
		testType.false<Equal<number[], Function>>(true)
		testType.false<Equal<number[], () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<number[], number[], Equal.$Branch>, $Then>(true)
		testType.equal<Equal<number[], 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<number[], number[], { $then: 1 }>, 1>(true)
		testType.equal<Equal<number[], '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<number[] | 0, number[] | 0>, true>(true)
		testType.equal<Equal<number[] | 0, number[]>, false>(true)
		testType.equal<Equal<number[], number[] | 0>, false>(true)
	})
})

describe('tuple', () => {
	it('basic comparison', () => {
		testType.true<Equal<[number], [number]>>(true)
		testType.false<Equal<[number], any>>(true)
		testType.false<Equal<[number], unknown>>(true)
		testType.false<Equal<[number], never>>(true)
		testType.false<Equal<[number], void>>(true)
		testType.false<Equal<[number], undefined>>(true)
		testType.false<Equal<[number], null>>(true)
		testType.false<Equal<[number], boolean>>(true)
		testType.false<Equal<[number], true>>(true)
		testType.false<Equal<[number], false>>(true)
		testType.false<Equal<[number], number>>(true)
		testType.false<Equal<[number], 1>>(true)
		testType.false<Equal<[number], string>>(true)
		testType.false<Equal<[number], ''>>(true)
		testType.false<Equal<[number], symbol>>(true)
		testType.false<Equal<[number], 1n>>(true)
		testType.false<Equal<[number], {}>>(true)
		testType.false<Equal<[number], { a: 1 }>>(true)
		testType.false<Equal<[number], string[]>>(true)
		testType.false<Equal<[number], []>>(true)
		testType.false<Equal<[number], [number, number]>>(true)
		testType.false<Equal<[number], [string]>>(true)
		testType.false<Equal<[number], Function>>(true)
		testType.false<Equal<[number], () => void>>(true)
	})
	it('works against tuple', () => {
		testType.true<Equal<[1], [1]>>(true)
		testType.true<Equal<[1, 2], [1, 2]>>(true)
		testType.true<Equal<[any], [any]>>(true)

		testType.false<Equal<[any], [1]>>(true)
		testType.false<Equal<1, [1]>>(true)
		testType.false<Equal<[1], 1>>(true)
		testType.false<Equal<[1, 2], [2, 1]>>(true)

		testType.true<Equal<[never], [never]>>(true)
		testType.true<Equal<[any], [any]>>(true)
		testType.true<Equal<[unknown], [unknown]>>(true)
		testType.true<Equal<[void], [void]>>(true)

		testType.false<Equal<[any], [unknown]>>(true)
		testType.false<Equal<[any], [never]>>(true)
		testType.false<Equal<[any], [void]>>(true)
		testType.false<Equal<[never], [any]>>(true)
		testType.false<Equal<[never], [unknown]>>(true)
		testType.false<Equal<[never], [void]>>(true)
		testType.false<Equal<[unknown], [any]>>(true)
		testType.false<Equal<[unknown], [never]>>(true)
		testType.false<Equal<[unknown], [void]>>(true)
		testType.false<Equal<[void], [any]>>(true)
		testType.false<Equal<[void], [unknown]>>(true)
		testType.false<Equal<[void], [never]>>(true)

		testType.false<Equal<[any, number], [number, any]>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<[number], [number], Equal.$Branch>, $Then>(true)
		testType.equal<Equal<[number], 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<[number], [number], { $then: 1 }>, 1>(true)
		testType.equal<Equal<[number], '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<[number] | 0, [number] | 0>, true>(true)
		testType.equal<Equal<[number] | 0, [number]>, false>(true)
		testType.equal<Equal<[number], [number] | 0>, false>(true)
	})
})

describe('Function', () => {
	it('basic comparison', () => {
		testType.true<Equal<Function, Function>>(true)
		testType.false<Equal<Function, any>>(true)
		testType.false<Equal<Function, unknown>>(true)
		testType.false<Equal<Function, never>>(true)
		testType.false<Equal<Function, void>>(true)
		testType.false<Equal<Function, undefined>>(true)
		testType.false<Equal<Function, null>>(true)
		testType.false<Equal<Function, boolean>>(true)
		testType.false<Equal<Function, true>>(true)
		testType.false<Equal<Function, false>>(true)
		testType.false<Equal<Function, number>>(true)
		testType.false<Equal<Function, 1>>(true)
		testType.false<Equal<Function, string>>(true)
		testType.false<Equal<Function, ''>>(true)
		testType.false<Equal<Function, symbol>>(true)
		testType.false<Equal<Function, bigint>>(true)
		testType.false<Equal<Function, 1n>>(true)
		testType.false<Equal<Function, object>>(true)
		testType.false<Equal<Function, {}>>(true)
		testType.false<Equal<Function, { a: 1 }>>(true)
		testType.false<Equal<Function, string[]>>(true)
		testType.false<Equal<Function, []>>(true)
		testType.false<Equal<Function, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<Equal<Function, Function, Equal.$Branch>, $Then>(true)
		testType.equal<Equal<Function, 0, Equal.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<Equal<Function, Function, { $then: 1 }>, 1>(true)
		testType.equal<Equal<Function, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<Equal<Function | 0, Function | 0>, true>(true)
		testType.equal<Equal<Function | 0, Function>, false>(true)
		testType.equal<Equal<Function, Function | 0>, false>(true)
	})
})

it('resolves `Equal.$Default` the same as no options', () => {
	// `Equal.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<Equal<any, any, Equal.$Default>, Equal<any, any>>(true)
	testType.equal<Equal<any, unknown, Equal.$Default>, Equal<any, unknown>>(true)
	testType.equal<Equal<unknown, unknown, Equal.$Default>, Equal<unknown, unknown>>(true)
	testType.equal<Equal<never, never, Equal.$Default>, Equal<never, never>>(true)
	testType.equal<Equal<never, undefined, Equal.$Default>, Equal<never, undefined>>(true)
	testType.equal<Equal<void, void, Equal.$Default>, Equal<void, void>>(true)
	testType.equal<Equal<void, undefined, Equal.$Default>, Equal<void, undefined>>(true)
	testType.equal<Equal<1, 1, Equal.$Default>, Equal<1, 1>>(true)
	testType.equal<Equal<1, number, Equal.$Default>, Equal<1, number>>(true)
	testType.equal<Equal<boolean, boolean, Equal.$Default>, Equal<boolean, boolean>>(true)
	testType.equal<Equal<boolean, true, Equal.$Default>, Equal<boolean, true>>(true)
	testType.equal<Equal<1 | 2, 1, Equal.$Default>, Equal<1 | 2, 1>>(true)
	testType.equal<Equal<{ a: 1 }, { a: 1 }, Equal.$Default>, Equal<{ a: 1 }, { a: 1 }>>(true)
	testType.equal<Equal<{ a: 1 }, { readonly a: 1 }, Equal.$Default>, Equal<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with union types containing undefined', () => {
	testType.false<Equal<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	testType.false<Equal<1 | 2, 1>>(true)
	testType.false<Equal<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	testType.true<
		Equal<((v: string) => string) | ((v: number) => number), ((v: string) => string) | ((v: number) => number)>
	>(true)

	testType.false<Equal<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	testType.false<Equal<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('detects literal and widen type are different', () => {
	testType.false<Equal<1, number>>(true)
	testType.false<Equal<number, 1>>(true)
	testType.false<Equal<1 & { a: 1 }, number & { a: 1 }>>(true)
	testType.false<Equal<bigint & { a: 1 }, 1n & { a: 1 }>>(true)

	testType.true<Equal<1 & { a: 1 }, 1 & { a: 1 }>>(true)
})

it('works with intersect types', () => {
	testType.true<Equal<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	testType.true<Equal<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	testType.true<Equal<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	testType.true<Equal<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	testType.false<Equal<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	testType.false<Equal<{ a: number; b: number }, { a: number } & { c: number }>>(true)

	testType.true<Equal<{ nested: { a: number; b: string } }, { nested: { a: number } & { b: string } }>>(
		// @ts-expect-error: Known limitation: nested intersection type properties don't work.
		true,
	)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	testType.true<Equal<F, { (v: string): string; (v: number): number }>>(true)
	testType.false<Equal<F, { (v: string): string; (v: number): string }>>(true)

	testType.false<Equal<F, (v: number) => number>>(true)
	testType.false<Equal<F, (v: string) => number>>(true)

	testType.false<Equal<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	testType.true<
		Equal<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	testType.true<Equal<1 | (number & {}), 1 | (number & {})>>(true)

	testType.false<Equal<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	testType.true<Equal<A, B>>(true)
	testType.true<Equal<A | B, B>>(true)

	testType.true<Equal<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complex cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	testType.true<Equal<A, B>>(true)
	testType.true<Equal<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	testType.true<Equal<P, { c: 1 }>>(true)
	testType.true<Equal<P, { c: 1 } | { c: 1 }>>(true)
	testType.true<Equal<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	testType.false<Equal<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	testType.true<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>>(
		true,
	)
	testType.false<Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>>(
		true,
	)
	testType.false<
		Equal<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can detect difference with optional param', () => {
	testType.false<Equal<() => void, (a?: number) => void>>(true)
})

it('can detect difference with union return value', () => {
	testType.false<Equal<() => number, () => number | undefined>>(true)
})
