import { describe, it, test } from 'vitest'
import {
	type $Else,
	type $Fn,
	type $Then,
	type Head,
	type IsEqual,
	type IsNotEqual,
	type TuplePlus,
	testType,
	type ValueOf,
} from '../index.js'

describe('any', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<any, any>>(true)
		testType.false<IsEqual<any, unknown>>(true)
		testType.false<IsEqual<any, never>>(true)
		testType.false<IsEqual<any, void>>(true)
		testType.false<IsEqual<any, undefined>>(true)
		testType.false<IsEqual<any, null>>(true)
		testType.false<IsEqual<any, boolean>>(true)
		testType.false<IsEqual<any, true>>(true)
		testType.false<IsEqual<any, false>>(true)
		testType.false<IsEqual<any, number>>(true)
		testType.false<IsEqual<any, 1>>(true)
		testType.false<IsEqual<any, string>>(true)
		testType.false<IsEqual<any, ''>>(true)
		testType.false<IsEqual<any, symbol>>(true)
		testType.false<IsEqual<any, bigint>>(true)
		testType.false<IsEqual<any, 1n>>(true)
		testType.false<IsEqual<any, object>>(true)
		testType.false<IsEqual<any, {}>>(true)
		testType.false<IsEqual<any, { a: 1 }>>(true)
		testType.false<IsEqual<any, string[]>>(true)
		testType.false<IsEqual<any, []>>(true)
		testType.false<IsEqual<any, Function>>(true)
		testType.false<IsEqual<any, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<any, any, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<any, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<any, any, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<any, '', { $else: 1 }>, 1>(true)
	})
})

describe('unknown', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<unknown, unknown>>(true)
		testType.false<IsEqual<unknown, any>>(true)
		testType.false<IsEqual<unknown, never>>(true)
		testType.false<IsEqual<unknown, void>>(true)
		testType.false<IsEqual<unknown, undefined>>(true)
		testType.false<IsEqual<unknown, null>>(true)
		testType.false<IsEqual<unknown, boolean>>(true)
		testType.false<IsEqual<unknown, true>>(true)
		testType.false<IsEqual<unknown, false>>(true)
		testType.false<IsEqual<unknown, number>>(true)
		testType.false<IsEqual<unknown, 1>>(true)
		testType.false<IsEqual<unknown, string>>(true)
		testType.false<IsEqual<unknown, ''>>(true)
		testType.false<IsEqual<unknown, symbol>>(true)
		testType.false<IsEqual<unknown, bigint>>(true)
		testType.false<IsEqual<unknown, 1n>>(true)
		testType.false<IsEqual<unknown, object>>(true)
		testType.false<IsEqual<unknown, {}>>(true)
		testType.false<IsEqual<unknown, { a: 1 }>>(true)
		testType.false<IsEqual<unknown, string[]>>(true)
		testType.false<IsEqual<unknown, []>>(true)
		testType.false<IsEqual<unknown, Function>>(true)
		testType.false<IsEqual<unknown, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<unknown, unknown, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<unknown, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<unknown, unknown, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<unknown, '', { $else: 1 }>, 1>(true)
	})
})

describe('never', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<never, never>>(true)
		testType.false<IsEqual<never, any>>(true)
		testType.false<IsEqual<never, unknown>>(true)
		testType.false<IsEqual<never, void>>(true)
		testType.false<IsEqual<never, 1>>(true)
		testType.false<IsEqual<never, undefined>>(true)
		testType.false<IsEqual<never, null>>(true)
		testType.false<IsEqual<never, boolean>>(true)
		testType.false<IsEqual<never, true>>(true)
		testType.false<IsEqual<never, false>>(true)
		testType.false<IsEqual<never, number>>(true)
		testType.false<IsEqual<never, 1>>(true)
		testType.false<IsEqual<never, string>>(true)
		testType.false<IsEqual<never, ''>>(true)
		testType.false<IsEqual<never, symbol>>(true)
		testType.false<IsEqual<never, bigint>>(true)
		testType.false<IsEqual<never, 1n>>(true)
		testType.false<IsEqual<never, object>>(true)
		testType.false<IsEqual<never, {}>>(true)
		testType.false<IsEqual<never, { a: 1 }>>(true)
		testType.false<IsEqual<never, string[]>>(true)
		testType.false<IsEqual<never, []>>(true)
		testType.false<IsEqual<never, Function>>(true)
		testType.false<IsEqual<never, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<never, never, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<never, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<never, never, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<never, '', { $else: 1 }>, 1>(true)
	})
})

describe('void', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<void, void>>(true)
		testType.false<IsEqual<void, any>>(true)
		testType.false<IsEqual<void, unknown>>(true)
		testType.false<IsEqual<void, never>>(true)
		testType.false<IsEqual<void, undefined>>(true)
		testType.false<IsEqual<void, null>>(true)
		testType.false<IsEqual<void, boolean>>(true)
		testType.false<IsEqual<void, true>>(true)
		testType.false<IsEqual<void, false>>(true)
		testType.false<IsEqual<void, number>>(true)
		testType.false<IsEqual<void, 1>>(true)
		testType.false<IsEqual<void, string>>(true)
		testType.false<IsEqual<void, ''>>(true)
		testType.false<IsEqual<void, symbol>>(true)
		testType.false<IsEqual<void, bigint>>(true)
		testType.false<IsEqual<void, 1n>>(true)
		testType.false<IsEqual<void, object>>(true)
		testType.false<IsEqual<void, {}>>(true)
		testType.false<IsEqual<void, { a: 1 }>>(true)
		testType.false<IsEqual<void, string[]>>(true)
		testType.false<IsEqual<void, []>>(true)
		testType.false<IsEqual<void, Function>>(true)
		testType.false<IsEqual<void, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<void, void, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<void, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<void, void, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<void, '', { $else: 1 }>, 1>(true)
	})
})

describe('undefined', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<undefined, undefined>>(true)
		testType.false<IsEqual<undefined, any>>(true)
		testType.false<IsEqual<undefined, unknown>>(true)
		testType.false<IsEqual<undefined, never>>(true)
		testType.false<IsEqual<undefined, void>>(true)
		testType.false<IsEqual<undefined, null>>(true)
		testType.false<IsEqual<undefined, boolean>>(true)
		testType.false<IsEqual<undefined, true>>(true)
		testType.false<IsEqual<undefined, false>>(true)
		testType.false<IsEqual<undefined, number>>(true)
		testType.false<IsEqual<undefined, 1>>(true)
		testType.false<IsEqual<undefined, string>>(true)
		testType.false<IsEqual<undefined, ''>>(true)
		testType.false<IsEqual<undefined, symbol>>(true)
		testType.false<IsEqual<undefined, bigint>>(true)
		testType.false<IsEqual<undefined, 1n>>(true)
		testType.false<IsEqual<undefined, object>>(true)
		testType.false<IsEqual<undefined, {}>>(true)
		testType.false<IsEqual<undefined, { a: 1 }>>(true)
		testType.false<IsEqual<undefined, string[]>>(true)
		testType.false<IsEqual<undefined, []>>(true)
		testType.false<IsEqual<undefined, Function>>(true)
		testType.false<IsEqual<undefined, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<undefined, undefined, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<undefined, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<undefined, undefined, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<undefined, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<undefined | 0, undefined | 0>, true>(true)
		testType.equal<IsEqual<undefined | 0, undefined>, false>(true)
		testType.equal<IsEqual<undefined, undefined | 0>, false>(true)
	})
})

describe('null', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<null, null>>(true)
		testType.false<IsEqual<null, any>>(true)
		testType.false<IsEqual<null, unknown>>(true)
		testType.false<IsEqual<null, never>>(true)
		testType.false<IsEqual<null, void>>(true)
		testType.false<IsEqual<null, undefined>>(true)
		testType.false<IsEqual<null, boolean>>(true)
		testType.false<IsEqual<null, true>>(true)
		testType.false<IsEqual<null, false>>(true)
		testType.false<IsEqual<null, number>>(true)
		testType.false<IsEqual<null, 1>>(true)
		testType.false<IsEqual<null, string>>(true)
		testType.false<IsEqual<null, ''>>(true)
		testType.false<IsEqual<null, symbol>>(true)
		testType.false<IsEqual<null, bigint>>(true)
		testType.false<IsEqual<null, 1n>>(true)
		testType.false<IsEqual<null, object>>(true)
		testType.false<IsEqual<null, {}>>(true)
		testType.false<IsEqual<null, { a: 1 }>>(true)
		testType.false<IsEqual<null, string[]>>(true)
		testType.false<IsEqual<null, []>>(true)
		testType.false<IsEqual<null, Function>>(true)
		testType.false<IsEqual<null, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<null, null, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<null, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<null, null, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<null, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<null | 0, null | 0>, true>(true)
		testType.equal<IsEqual<null | 0, null>, false>(true)
		testType.equal<IsEqual<null, null | 0>, false>(true)
	})
})

describe('boolean', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<boolean, boolean>>(true)
		testType.false<IsEqual<boolean, any>>(true)
		testType.false<IsEqual<boolean, unknown>>(true)
		testType.false<IsEqual<boolean, never>>(true)
		testType.false<IsEqual<boolean, void>>(true)
		testType.false<IsEqual<boolean, undefined>>(true)
		testType.false<IsEqual<boolean, null>>(true)
		testType.false<IsEqual<boolean, true>>(true)
		testType.false<IsEqual<boolean, false>>(true)
		testType.false<IsEqual<boolean, number>>(true)
		testType.false<IsEqual<boolean, 1>>(true)
		testType.false<IsEqual<boolean, string>>(true)
		testType.false<IsEqual<boolean, ''>>(true)
		testType.false<IsEqual<boolean, symbol>>(true)
		testType.false<IsEqual<boolean, bigint>>(true)
		testType.false<IsEqual<boolean, 1n>>(true)
		testType.false<IsEqual<boolean, object>>(true)
		testType.false<IsEqual<boolean, {}>>(true)
		testType.false<IsEqual<boolean, { a: 1 }>>(true)
		testType.false<IsEqual<boolean, string[]>>(true)
		testType.false<IsEqual<boolean, []>>(true)
		testType.false<IsEqual<boolean, Function>>(true)
		testType.false<IsEqual<boolean, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<boolean, boolean, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<boolean, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<boolean, boolean, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<boolean, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<boolean | 0, boolean | 0>, true>(true)
		testType.equal<IsEqual<boolean | 0, boolean>, false>(true)
		testType.equal<IsEqual<boolean, boolean | 0>, false>(true)
	})
})

describe('true', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<true, true>>(true)
		testType.false<IsEqual<true, any>>(true)
		testType.false<IsEqual<true, unknown>>(true)
		testType.false<IsEqual<true, never>>(true)
		testType.false<IsEqual<true, void>>(true)
		testType.false<IsEqual<true, undefined>>(true)
		testType.false<IsEqual<true, null>>(true)
		testType.false<IsEqual<true, boolean>>(true)
		testType.false<IsEqual<true, false>>(true)
		testType.false<IsEqual<true, number>>(true)
		testType.false<IsEqual<true, 1>>(true)
		testType.false<IsEqual<true, string>>(true)
		testType.false<IsEqual<true, ''>>(true)
		testType.false<IsEqual<true, symbol>>(true)
		testType.false<IsEqual<true, bigint>>(true)
		testType.false<IsEqual<true, 1n>>(true)
		testType.false<IsEqual<true, object>>(true)
		testType.false<IsEqual<true, {}>>(true)
		testType.false<IsEqual<true, { a: 1 }>>(true)
		testType.false<IsEqual<true, string[]>>(true)
		testType.false<IsEqual<true, []>>(true)
		testType.false<IsEqual<true, Function>>(true)
		testType.false<IsEqual<true, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<true, true, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<true, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<true, true, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<true, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<true | 0, true | 0>, true>(true)
		testType.equal<IsEqual<true | 0, true>, false>(true)
		testType.equal<IsEqual<true, true | 0>, false>(true)
	})
})

describe('false', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<false, false>>(true)
		testType.false<IsEqual<false, any>>(true)
		testType.false<IsEqual<false, unknown>>(true)
		testType.false<IsEqual<false, never>>(true)
		testType.false<IsEqual<false, void>>(true)
		testType.false<IsEqual<false, undefined>>(true)
		testType.false<IsEqual<false, null>>(true)
		testType.false<IsEqual<false, boolean>>(true)
		testType.false<IsEqual<false, true>>(true)
		testType.false<IsEqual<false, number>>(true)
		testType.false<IsEqual<false, 1>>(true)
		testType.false<IsEqual<false, string>>(true)
		testType.false<IsEqual<false, ''>>(true)
		testType.false<IsEqual<false, symbol>>(true)
		testType.false<IsEqual<false, bigint>>(true)
		testType.false<IsEqual<false, 1n>>(true)
		testType.false<IsEqual<false, object>>(true)
		testType.false<IsEqual<false, {}>>(true)
		testType.false<IsEqual<false, { a: 1 }>>(true)
		testType.false<IsEqual<false, string[]>>(true)
		testType.false<IsEqual<false, []>>(true)
		testType.false<IsEqual<false, Function>>(true)
		testType.false<IsEqual<false, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<false, false, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<false, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<false, false, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<false, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<false | 0, false | 0>, true>(true)
		testType.equal<IsEqual<false | 0, false>, false>(true)
		testType.equal<IsEqual<false, false | 0>, false>(true)
	})
})

describe('number', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<number, number>>(true)
		testType.false<IsEqual<number, any>>(true)
		testType.false<IsEqual<number, unknown>>(true)
		testType.false<IsEqual<number, never>>(true)
		testType.false<IsEqual<number, void>>(true)
		testType.false<IsEqual<number, undefined>>(true)
		testType.false<IsEqual<number, null>>(true)
		testType.false<IsEqual<number, boolean>>(true)
		testType.false<IsEqual<number, true>>(true)
		testType.false<IsEqual<number, false>>(true)
		testType.false<IsEqual<number, 1>>(true)
		testType.false<IsEqual<number, string>>(true)
		testType.false<IsEqual<number, ''>>(true)
		testType.false<IsEqual<number, symbol>>(true)
		testType.false<IsEqual<number, bigint>>(true)
		testType.false<IsEqual<number, 1n>>(true)
		testType.false<IsEqual<number, object>>(true)
		testType.false<IsEqual<number, {}>>(true)
		testType.false<IsEqual<number, { a: 1 }>>(true)
		testType.false<IsEqual<number, string[]>>(true)
		testType.false<IsEqual<number, []>>(true)
		testType.false<IsEqual<number, Function>>(true)
		testType.false<IsEqual<number, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<number, number, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<number, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<number, number, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<number, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<number | '0', number | '0'>, true>(true)
		testType.equal<IsEqual<number | '0', number>, false>(true)
		testType.equal<IsEqual<number, number | '0'>, false>(true)
	})
})

describe('number literal', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<1, 1>>(true)
		testType.false<IsEqual<1, any>>(true)
		testType.false<IsEqual<1, unknown>>(true)
		testType.false<IsEqual<1, never>>(true)
		testType.false<IsEqual<1, void>>(true)
		testType.false<IsEqual<1, undefined>>(true)
		testType.false<IsEqual<1, null>>(true)
		testType.false<IsEqual<1, boolean>>(true)
		testType.false<IsEqual<1, true>>(true)
		testType.false<IsEqual<1, false>>(true)
		testType.false<IsEqual<1, number>>(true)
		testType.false<IsEqual<1, 2>>(true)
		testType.false<IsEqual<1, string>>(true)
		testType.false<IsEqual<1, ''>>(true)
		testType.false<IsEqual<1, symbol>>(true)
		testType.false<IsEqual<1, bigint>>(true)
		testType.false<IsEqual<1, 1n>>(true)
		testType.false<IsEqual<1, object>>(true)
		testType.false<IsEqual<1, {}>>(true)
		testType.false<IsEqual<1, { a: 1 }>>(true)
		testType.false<IsEqual<1, string[]>>(true)
		testType.false<IsEqual<1, []>>(true)
		testType.false<IsEqual<1, Function>>(true)
		testType.false<IsEqual<1, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<1, 1, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<1, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<1, 1, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<1, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<1 | 0, 1 | 0>, true>(true)
		testType.equal<IsEqual<1 | 0, 1>, false>(true)
		testType.equal<IsEqual<1, 1 | 0>, false>(true)
	})
})

describe('string', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<string, string>>(true)
		testType.false<IsEqual<string, any>>(true)
		testType.false<IsEqual<string, unknown>>(true)
		testType.false<IsEqual<string, never>>(true)
		testType.false<IsEqual<string, void>>(true)
		testType.false<IsEqual<string, undefined>>(true)
		testType.false<IsEqual<string, null>>(true)
		testType.false<IsEqual<string, boolean>>(true)
		testType.false<IsEqual<string, true>>(true)
		testType.false<IsEqual<string, false>>(true)
		testType.false<IsEqual<string, number>>(true)
		testType.false<IsEqual<string, 1>>(true)
		testType.false<IsEqual<string, ''>>(true)
		testType.false<IsEqual<string, symbol>>(true)
		testType.false<IsEqual<string, bigint>>(true)
		testType.false<IsEqual<string, 1n>>(true)
		testType.false<IsEqual<string, object>>(true)
		testType.false<IsEqual<string, {}>>(true)
		testType.false<IsEqual<string, { a: 1 }>>(true)
		testType.false<IsEqual<string, string[]>>(true)
		testType.false<IsEqual<string, []>>(true)
		testType.false<IsEqual<string, Function>>(true)
		testType.false<IsEqual<string, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<string, string, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<string, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<string, string, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<string, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<string | 0, string | 0>, true>(true)
		testType.equal<IsEqual<string | 0, string>, false>(true)
		testType.equal<IsEqual<string, string | 0>, false>(true)
	})
})

describe('string literal', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<'a', 'a'>>(true)
		testType.false<IsEqual<'a', any>>(true)
		testType.false<IsEqual<'a', unknown>>(true)
		testType.false<IsEqual<'a', never>>(true)
		testType.false<IsEqual<'a', void>>(true)
		testType.false<IsEqual<'a', undefined>>(true)
		testType.false<IsEqual<'a', null>>(true)
		testType.false<IsEqual<'a', boolean>>(true)
		testType.false<IsEqual<'a', true>>(true)
		testType.false<IsEqual<'a', false>>(true)
		testType.false<IsEqual<'a', number>>(true)
		testType.false<IsEqual<'a', string>>(true)
		testType.false<IsEqual<'a', ''>>(true)
		testType.false<IsEqual<'a', symbol>>(true)
		testType.false<IsEqual<'a', bigint>>(true)
		testType.false<IsEqual<'a', 1n>>(true)
		testType.false<IsEqual<'a', object>>(true)
		testType.false<IsEqual<'a', {}>>(true)
		testType.false<IsEqual<'a', { a: 1 }>>(true)
		testType.false<IsEqual<'a', string[]>>(true)
		testType.false<IsEqual<'a', []>>(true)
		testType.false<IsEqual<'a', Function>>(true)
		testType.false<IsEqual<'a', () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<'a', 'a', IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<'a', 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<'a', 'a', { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<'a', '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<'a' | 0, 'a' | 0>, true>(true)
		testType.equal<IsEqual<'a' | 0, 'a'>, false>(true)
		testType.equal<IsEqual<'a', 'a' | 0>, false>(true)
	})
})

describe('symbol', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<symbol, symbol>>(true)
		testType.false<IsEqual<symbol, any>>(true)
		testType.false<IsEqual<symbol, unknown>>(true)
		testType.false<IsEqual<symbol, never>>(true)
		testType.false<IsEqual<symbol, void>>(true)
		testType.false<IsEqual<symbol, undefined>>(true)
		testType.false<IsEqual<symbol, null>>(true)
		testType.false<IsEqual<symbol, boolean>>(true)
		testType.false<IsEqual<symbol, true>>(true)
		testType.false<IsEqual<symbol, false>>(true)
		testType.false<IsEqual<symbol, number>>(true)
		testType.false<IsEqual<symbol, 1>>(true)
		testType.false<IsEqual<symbol, string>>(true)
		testType.false<IsEqual<symbol, ''>>(true)
		testType.false<IsEqual<symbol, bigint>>(true)
		testType.false<IsEqual<symbol, 1n>>(true)
		testType.false<IsEqual<symbol, object>>(true)
		testType.false<IsEqual<symbol, {}>>(true)
		testType.false<IsEqual<symbol, { a: 1 }>>(true)
		testType.false<IsEqual<symbol, string[]>>(true)
		testType.false<IsEqual<symbol, []>>(true)
		testType.false<IsEqual<symbol, Function>>(true)
		testType.false<IsEqual<symbol, () => void>>(true)
	})

	it('compares actual symbol', () => {
		const s = Symbol()
		testType.true<IsEqual<typeof s, typeof s>>(true)
		testType.false<IsEqual<typeof s, symbol>>(true)
	})

	it('treats two distinct unique symbols as not equal', () => {
		const s1 = Symbol()
		const s2 = Symbol()
		testType.true<IsEqual<typeof s1, typeof s1>>(true)
		testType.false<IsEqual<typeof s1, typeof s2>>(true)
		testType.false<IsEqual<typeof s1, symbol>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<symbol, symbol, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<symbol, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<symbol, symbol, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<symbol, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<symbol | 0, symbol | 0>, true>(true)
		testType.equal<IsEqual<symbol | 0, symbol>, false>(true)
		testType.equal<IsEqual<symbol, symbol | 0>, false>(true)
	})
})

describe('bigint', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<bigint, bigint>>(true)
		testType.false<IsEqual<bigint, any>>(true)
		testType.false<IsEqual<bigint, unknown>>(true)
		testType.false<IsEqual<bigint, never>>(true)
		testType.false<IsEqual<bigint, void>>(true)
		testType.false<IsEqual<bigint, undefined>>(true)
		testType.false<IsEqual<bigint, null>>(true)
		testType.false<IsEqual<bigint, boolean>>(true)
		testType.false<IsEqual<bigint, true>>(true)
		testType.false<IsEqual<bigint, false>>(true)
		testType.false<IsEqual<bigint, number>>(true)
		testType.false<IsEqual<bigint, 1>>(true)
		testType.false<IsEqual<bigint, string>>(true)
		testType.false<IsEqual<bigint, ''>>(true)
		testType.false<IsEqual<bigint, symbol>>(true)
		testType.false<IsEqual<bigint, 1n>>(true)
		testType.false<IsEqual<bigint, object>>(true)
		testType.false<IsEqual<bigint, {}>>(true)
		testType.false<IsEqual<bigint, { a: 1 }>>(true)
		testType.false<IsEqual<bigint, string[]>>(true)
		testType.false<IsEqual<bigint, []>>(true)
		testType.false<IsEqual<bigint, Function>>(true)
		testType.false<IsEqual<bigint, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<bigint, bigint, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<bigint, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<bigint, bigint, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<bigint, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<bigint | 0, bigint | 0>, true>(true)
		testType.equal<IsEqual<bigint | 0, bigint>, false>(true)
		testType.equal<IsEqual<bigint, bigint | 0>, false>(true)
	})
})

describe('bigint literal', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<2n, 2n>>(true)
		testType.false<IsEqual<2n, any>>(true)
		testType.false<IsEqual<2n, unknown>>(true)
		testType.false<IsEqual<2n, never>>(true)
		testType.false<IsEqual<2n, void>>(true)
		testType.false<IsEqual<2n, undefined>>(true)
		testType.false<IsEqual<2n, null>>(true)
		testType.false<IsEqual<2n, boolean>>(true)
		testType.false<IsEqual<2n, true>>(true)
		testType.false<IsEqual<2n, false>>(true)
		testType.false<IsEqual<2n, number>>(true)
		testType.false<IsEqual<2n, 1>>(true)
		testType.false<IsEqual<2n, string>>(true)
		testType.false<IsEqual<2n, ''>>(true)
		testType.false<IsEqual<2n, symbol>>(true)
		testType.false<IsEqual<2n, bigint>>(true)
		testType.false<IsEqual<2n, 1n>>(true)
		testType.false<IsEqual<2n, object>>(true)
		testType.false<IsEqual<2n, {}>>(true)
		testType.false<IsEqual<2n, { a: 1 }>>(true)
		testType.false<IsEqual<2n, string[]>>(true)
		testType.false<IsEqual<2n, []>>(true)
		testType.false<IsEqual<2n, Function>>(true)
		testType.false<IsEqual<2n, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<2n, 2n, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<2n, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<2n, 2n, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<2n, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<2n | 0, 2n | 0>, true>(true)
		testType.equal<IsEqual<2n | 0, 2n>, false>(true)
		testType.equal<IsEqual<2n, 2n | 0>, false>(true)
	})
})

describe('object', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<object, object>>(true)
		testType.false<IsEqual<object, any>>(true)
		testType.false<IsEqual<object, unknown>>(true)
		testType.false<IsEqual<object, never>>(true)
		testType.false<IsEqual<object, void>>(true)
		testType.false<IsEqual<object, undefined>>(true)
		testType.false<IsEqual<object, null>>(true)
		testType.false<IsEqual<object, boolean>>(true)
		testType.false<IsEqual<object, true>>(true)
		testType.false<IsEqual<object, false>>(true)
		testType.false<IsEqual<object, number>>(true)
		testType.false<IsEqual<object, 1>>(true)
		testType.false<IsEqual<object, string>>(true)
		testType.false<IsEqual<object, ''>>(true)
		testType.false<IsEqual<object, symbol>>(true)
		testType.false<IsEqual<object, 1n>>(true)
		testType.false<IsEqual<object, {}>>(true)
		testType.false<IsEqual<object, { a: 1 }>>(true)
		testType.false<IsEqual<object, string[]>>(true)
		testType.false<IsEqual<object, []>>(true)
		testType.false<IsEqual<object, Function>>(true)
		testType.false<IsEqual<object, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<object, object, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<object, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<object, object, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<object, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<object | 0, object | 0>, true>(true)
		testType.equal<IsEqual<object | 0, object>, false>(true)
		testType.equal<IsEqual<object, object | 0>, false>(true)
	})
})

describe('object literal', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<{}, {}>>(true)
		testType.true<IsEqual<{ a: 2 }, { a: 2 }>>(true)
		testType.false<IsEqual<{}, any>>(true)
		testType.false<IsEqual<{}, unknown>>(true)
		testType.false<IsEqual<{}, never>>(true)
		testType.false<IsEqual<{}, void>>(true)
		testType.false<IsEqual<{}, undefined>>(true)
		testType.false<IsEqual<{}, null>>(true)
		testType.false<IsEqual<{}, boolean>>(true)
		testType.false<IsEqual<{}, true>>(true)
		testType.false<IsEqual<{}, false>>(true)
		testType.false<IsEqual<{}, number>>(true)
		testType.false<IsEqual<{}, 1>>(true)
		testType.false<IsEqual<{}, string>>(true)
		testType.false<IsEqual<{}, ''>>(true)
		testType.false<IsEqual<{}, symbol>>(true)
		testType.false<IsEqual<{}, 1n>>(true)
		testType.false<IsEqual<{}, object>>(true)
		testType.false<IsEqual<{}, { a: 1 }>>(true)
		testType.false<IsEqual<{}, string[]>>(true)
		testType.false<IsEqual<{}, []>>(true)
		testType.false<IsEqual<{}, Function>>(true)
		testType.false<IsEqual<{}, () => void>>(true)
	})

	it('object with any', () => {
		testType.false<IsEqual<{ a: any }, { a: 1 }>>(true)
		testType.false<IsEqual<{ a: 1 }, { a: any }>>(true)
		testType.true<IsEqual<{ a: any }, { a: any }>>(true)
	})

	it('A subset of B is false', () => {
		testType.false<IsEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
	})

	it('B subset of A is false', () => {
		testType.false<IsEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
	})

	it('disjoin is false', () => {
		testType.false<IsEqual<{ b: 1 }, { a: 1 }>>(true)
	})

	it('overlap is false', () => {
		testType.false<IsEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<{ a: 1 }, { a: 1 }, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<{ a: 1 }, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<{ a: 1 }, { a: 1 }, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<{ a: 1 }, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<{ a: 1 } | 0, { a: 1 } | 0>, true>(true)
		testType.equal<IsEqual<{ a: 1 } | 0, { a: 1 }>, false>(true)
		testType.equal<IsEqual<{ a: 1 }, { a: 1 } | 0>, false>(true)
	})
})

describe('array', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<number[], number[]>>(true)
		testType.false<IsEqual<number[], any>>(true)
		testType.false<IsEqual<number[], unknown>>(true)
		testType.false<IsEqual<number[], never>>(true)
		testType.false<IsEqual<number[], void>>(true)
		testType.false<IsEqual<number[], undefined>>(true)
		testType.false<IsEqual<number[], null>>(true)
		testType.false<IsEqual<number[], boolean>>(true)
		testType.false<IsEqual<number[], true>>(true)
		testType.false<IsEqual<number[], false>>(true)
		testType.false<IsEqual<number[], number>>(true)
		testType.false<IsEqual<number[], 1>>(true)
		testType.false<IsEqual<number[], string>>(true)
		testType.false<IsEqual<number[], ''>>(true)
		testType.false<IsEqual<number[], symbol>>(true)
		testType.false<IsEqual<number[], 1n>>(true)
		testType.false<IsEqual<number[], {}>>(true)
		testType.false<IsEqual<number[], { a: 1 }>>(true)
		testType.false<IsEqual<number[], string[]>>(true)
		testType.false<IsEqual<number[], []>>(true)
		testType.false<IsEqual<number[], Function>>(true)
		testType.false<IsEqual<number[], () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<number[], number[], IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<number[], 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<number[], number[], { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<number[], '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<number[] | 0, number[] | 0>, true>(true)
		testType.equal<IsEqual<number[] | 0, number[]>, false>(true)
		testType.equal<IsEqual<number[], number[] | 0>, false>(true)
	})
})

describe('tuple', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<[number], [number]>>(true)
		testType.false<IsEqual<[number], any>>(true)
		testType.false<IsEqual<[number], unknown>>(true)
		testType.false<IsEqual<[number], never>>(true)
		testType.false<IsEqual<[number], void>>(true)
		testType.false<IsEqual<[number], undefined>>(true)
		testType.false<IsEqual<[number], null>>(true)
		testType.false<IsEqual<[number], boolean>>(true)
		testType.false<IsEqual<[number], true>>(true)
		testType.false<IsEqual<[number], false>>(true)
		testType.false<IsEqual<[number], number>>(true)
		testType.false<IsEqual<[number], 1>>(true)
		testType.false<IsEqual<[number], string>>(true)
		testType.false<IsEqual<[number], ''>>(true)
		testType.false<IsEqual<[number], symbol>>(true)
		testType.false<IsEqual<[number], 1n>>(true)
		testType.false<IsEqual<[number], {}>>(true)
		testType.false<IsEqual<[number], { a: 1 }>>(true)
		testType.false<IsEqual<[number], string[]>>(true)
		testType.false<IsEqual<[number], []>>(true)
		testType.false<IsEqual<[number], [number, number]>>(true)
		testType.false<IsEqual<[number], [string]>>(true)
		testType.false<IsEqual<[number], Function>>(true)
		testType.false<IsEqual<[number], () => void>>(true)
	})
	it('works against tuple', () => {
		testType.true<IsEqual<[1], [1]>>(true)
		testType.true<IsEqual<[1, 2], [1, 2]>>(true)
		testType.true<IsEqual<[any], [any]>>(true)

		testType.false<IsEqual<[any], [1]>>(true)
		testType.false<IsEqual<1, [1]>>(true)
		testType.false<IsEqual<[1], 1>>(true)
		testType.false<IsEqual<[1, 2], [2, 1]>>(true)

		testType.true<IsEqual<[never], [never]>>(true)
		testType.true<IsEqual<[any], [any]>>(true)
		testType.true<IsEqual<[unknown], [unknown]>>(true)
		testType.true<IsEqual<[void], [void]>>(true)

		testType.false<IsEqual<[any], [unknown]>>(true)
		testType.false<IsEqual<[any], [never]>>(true)
		testType.false<IsEqual<[any], [void]>>(true)
		testType.false<IsEqual<[never], [any]>>(true)
		testType.false<IsEqual<[never], [unknown]>>(true)
		testType.false<IsEqual<[never], [void]>>(true)
		testType.false<IsEqual<[unknown], [any]>>(true)
		testType.false<IsEqual<[unknown], [never]>>(true)
		testType.false<IsEqual<[unknown], [void]>>(true)
		testType.false<IsEqual<[void], [any]>>(true)
		testType.false<IsEqual<[void], [unknown]>>(true)
		testType.false<IsEqual<[void], [never]>>(true)

		testType.false<IsEqual<[any, number], [number, any]>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<[number], [number], IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<[number], 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<[number], [number], { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<[number], '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<[number] | 0, [number] | 0>, true>(true)
		testType.equal<IsEqual<[number] | 0, [number]>, false>(true)
		testType.equal<IsEqual<[number], [number] | 0>, false>(true)
	})
})

describe('Function', () => {
	it('basic comparison', () => {
		testType.true<IsEqual<Function, Function>>(true)
		testType.false<IsEqual<Function, any>>(true)
		testType.false<IsEqual<Function, unknown>>(true)
		testType.false<IsEqual<Function, never>>(true)
		testType.false<IsEqual<Function, void>>(true)
		testType.false<IsEqual<Function, undefined>>(true)
		testType.false<IsEqual<Function, null>>(true)
		testType.false<IsEqual<Function, boolean>>(true)
		testType.false<IsEqual<Function, true>>(true)
		testType.false<IsEqual<Function, false>>(true)
		testType.false<IsEqual<Function, number>>(true)
		testType.false<IsEqual<Function, 1>>(true)
		testType.false<IsEqual<Function, string>>(true)
		testType.false<IsEqual<Function, ''>>(true)
		testType.false<IsEqual<Function, symbol>>(true)
		testType.false<IsEqual<Function, bigint>>(true)
		testType.false<IsEqual<Function, 1n>>(true)
		testType.false<IsEqual<Function, object>>(true)
		testType.false<IsEqual<Function, {}>>(true)
		testType.false<IsEqual<Function, { a: 1 }>>(true)
		testType.false<IsEqual<Function, string[]>>(true)
		testType.false<IsEqual<Function, []>>(true)
		testType.false<IsEqual<Function, () => void>>(true)
	})

	it('with branching', () => {
		testType.equal<IsEqual<Function, Function, IsEqual.$Branch>, $Then>(true)
		testType.equal<IsEqual<Function, 0, IsEqual.$Branch>, $Else>(true)
	})

	it('with partial customization', () => {
		testType.equal<IsEqual<Function, Function, { $then: 1 }>, 1>(true)
		testType.equal<IsEqual<Function, '', { $else: 1 }>, 1>(true)
	})

	it('with union', () => {
		testType.equal<IsEqual<Function | 0, Function | 0>, true>(true)
		testType.equal<IsEqual<Function | 0, Function>, false>(true)
		testType.equal<IsEqual<Function, Function | 0>, false>(true)
	})
})

it('resolves `IsEqual.$Default` the same as no options', () => {
	// `IsEqual.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsEqual<any, any, IsEqual.$Default>, IsEqual<any, any>>(true)
	testType.equal<IsEqual<any, unknown, IsEqual.$Default>, IsEqual<any, unknown>>(true)
	testType.equal<IsEqual<unknown, unknown, IsEqual.$Default>, IsEqual<unknown, unknown>>(true)
	testType.equal<IsEqual<never, never, IsEqual.$Default>, IsEqual<never, never>>(true)
	testType.equal<IsEqual<never, undefined, IsEqual.$Default>, IsEqual<never, undefined>>(true)
	testType.equal<IsEqual<void, void, IsEqual.$Default>, IsEqual<void, void>>(true)
	testType.equal<IsEqual<void, undefined, IsEqual.$Default>, IsEqual<void, undefined>>(true)
	testType.equal<IsEqual<1, 1, IsEqual.$Default>, IsEqual<1, 1>>(true)
	testType.equal<IsEqual<1, number, IsEqual.$Default>, IsEqual<1, number>>(true)
	testType.equal<IsEqual<boolean, boolean, IsEqual.$Default>, IsEqual<boolean, boolean>>(true)
	testType.equal<IsEqual<boolean, true, IsEqual.$Default>, IsEqual<boolean, true>>(true)
	testType.equal<IsEqual<1 | 2, 1, IsEqual.$Default>, IsEqual<1 | 2, 1>>(true)
	testType.equal<IsEqual<{ a: 1 }, { a: 1 }, IsEqual.$Default>, IsEqual<{ a: 1 }, { a: 1 }>>(true)
	testType.equal<IsEqual<{ a: 1 }, { readonly a: 1 }, IsEqual.$Default>, IsEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with union types containing undefined', () => {
	testType.false<IsEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	testType.false<IsEqual<1 | 2, 1>>(true)
	testType.false<IsEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	testType.true<
		IsEqual<((v: string) => string) | ((v: number) => number), ((v: string) => string) | ((v: number) => number)>
	>(true)

	testType.false<IsEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	testType.false<IsEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('detects literal and widen type are different', () => {
	testType.false<IsEqual<1, number>>(true)
	testType.false<IsEqual<number, 1>>(true)
	testType.false<IsEqual<1 & { a: 1 }, number & { a: 1 }>>(true)
	testType.false<IsEqual<bigint & { a: 1 }, 1n & { a: 1 }>>(true)

	testType.true<IsEqual<1 & { a: 1 }, 1 & { a: 1 }>>(true)
})

it('works with intersect types', () => {
	testType.true<IsEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	testType.true<IsEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	testType.true<IsEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	testType.true<IsEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	testType.false<IsEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	testType.false<IsEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)

	testType.true<IsEqual<{ nested: { a: number; b: string } }, { nested: { a: number } & { b: string } }>>(
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

	testType.true<IsEqual<F, { (v: string): string; (v: number): number }>>(true)
	testType.false<IsEqual<F, { (v: string): string; (v: number): string }>>(true)

	testType.false<IsEqual<F, (v: number) => number>>(true)
	testType.false<IsEqual<F, (v: string) => number>>(true)

	testType.false<IsEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	testType.true<
		IsEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	testType.true<IsEqual<1 | (number & {}), 1 | (number & {})>>(true)

	testType.false<IsEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	testType.true<IsEqual<A, B>>(true)
	testType.true<IsEqual<A | B, B>>(true)

	testType.true<IsEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complex cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	testType.true<IsEqual<A, B>>(true)
	testType.true<IsEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	testType.true<IsEqual<P, { c: 1 }>>(true)
	testType.true<IsEqual<P, { c: 1 } | { c: 1 }>>(true)
	testType.true<IsEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	testType.false<IsEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	testType.true<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	testType.false<IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>>(
		true,
	)
	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can detect difference with optional param', () => {
	testType.false<IsEqual<() => void, (a?: number) => void>>(true)
})

it('can detect difference with union return value', () => {
	testType.false<IsEqual<() => number, () => number | undefined>>(true)
})

describe('IsEqual.$Fn', () => {
	it('is IsEqual with its fixed input applied', () => {
		testType.equal<$Fn.Apply<IsEqual.$Fn<1>, 1>, true>(true)
		testType.equal<$Fn.Apply<IsEqual.$Fn<1>, number>, false>(true)
		testType.equal<TuplePlus.Filter<[1, number, 1], IsEqual.$Fn<1>>, [1, 1]>(true)
	})
})

it('returns true when comparing primitive types with itself', () => {
	testType.true<IsEqual<boolean, boolean>>(true)
	testType.true<IsEqual<boolean, boolean>>(true)
	testType.true<IsEqual<number, number>>(true)
	testType.true<IsEqual<string, string>>(true)
	testType.true<IsEqual<symbol, symbol>>(true)
	testType.true<IsEqual<bigint, bigint>>(true)
	testType.true<IsEqual<Function, Function>>(true)
	testType.true<IsEqual<undefined, undefined>>(true)
	testType.true<IsEqual<null, null>>(true)
	testType.true<IsEqual<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	testType.false<IsEqual<boolean, number>>(true)
	testType.false<IsEqual<boolean, string>>(true)
	testType.false<IsEqual<boolean, symbol>>(true)
	testType.false<IsEqual<boolean, bigint>>(true)
	testType.false<IsEqual<boolean, Function>>(true)
	testType.false<IsEqual<boolean, undefined>>(true)
	testType.false<IsEqual<boolean, null>>(true)
	testType.false<IsEqual<boolean, object>>(true)

	testType.false<IsEqual<number, boolean>>(true)
	testType.false<IsEqual<number, string>>(true)
	testType.false<IsEqual<number, symbol>>(true)
	testType.false<IsEqual<number, bigint>>(true)
	testType.false<IsEqual<number, Function>>(true)
	testType.false<IsEqual<number, undefined>>(true)
	testType.false<IsEqual<number, null>>(true)
	testType.false<IsEqual<number, object>>(true)

	testType.false<IsEqual<string, boolean>>(true)
	testType.false<IsEqual<string, number>>(true)
	testType.false<IsEqual<string, symbol>>(true)
	testType.false<IsEqual<string, bigint>>(true)
	testType.false<IsEqual<string, Function>>(true)
	testType.false<IsEqual<string, undefined>>(true)
	testType.false<IsEqual<string, null>>(true)
	testType.false<IsEqual<string, object>>(true)

	testType.false<IsEqual<symbol, boolean>>(true)
	testType.false<IsEqual<symbol, number>>(true)
	testType.false<IsEqual<symbol, string>>(true)
	testType.false<IsEqual<symbol, bigint>>(true)
	testType.false<IsEqual<symbol, Function>>(true)
	testType.false<IsEqual<symbol, undefined>>(true)
	testType.false<IsEqual<symbol, null>>(true)
	testType.false<IsEqual<symbol, object>>(true)

	testType.false<IsEqual<bigint, boolean>>(true)
	testType.false<IsEqual<bigint, number>>(true)
	testType.false<IsEqual<bigint, string>>(true)
	testType.false<IsEqual<bigint, symbol>>(true)
	testType.false<IsEqual<bigint, Function>>(true)
	testType.false<IsEqual<bigint, undefined>>(true)
	testType.false<IsEqual<bigint, null>>(true)
	testType.false<IsEqual<bigint, object>>(true)

	testType.false<IsEqual<Function, boolean>>(true)
	testType.false<IsEqual<Function, number>>(true)
	testType.false<IsEqual<Function, string>>(true)
	testType.false<IsEqual<Function, symbol>>(true)
	testType.false<IsEqual<Function, bigint>>(true)
	testType.false<IsEqual<Function, undefined>>(true)
	testType.false<IsEqual<Function, null>>(true)
	testType.false<IsEqual<Function, object>>(true)

	testType.false<IsEqual<undefined, boolean>>(true)
	testType.false<IsEqual<undefined, number>>(true)
	testType.false<IsEqual<undefined, string>>(true)
	testType.false<IsEqual<undefined, symbol>>(true)
	testType.false<IsEqual<undefined, bigint>>(true)
	testType.false<IsEqual<undefined, Function>>(true)
	testType.false<IsEqual<undefined, null>>(true)
	testType.false<IsEqual<undefined, object>>(true)

	testType.false<IsEqual<null, boolean>>(true)
	testType.false<IsEqual<null, number>>(true)
	testType.false<IsEqual<null, string>>(true)
	testType.false<IsEqual<null, symbol>>(true)
	testType.false<IsEqual<null, bigint>>(true)
	testType.false<IsEqual<null, Function>>(true)
	testType.false<IsEqual<null, undefined>>(true)
	testType.false<IsEqual<null, object>>(true)

	testType.false<IsEqual<object, boolean>>(true)
	testType.false<IsEqual<object, number>>(true)
	testType.false<IsEqual<object, string>>(true)
	testType.false<IsEqual<object, symbol>>(true)
	testType.false<IsEqual<object, bigint>>(true)
	testType.false<IsEqual<object, Function>>(true)
	testType.false<IsEqual<object, undefined>>(true)
	testType.false<IsEqual<object, null>>(true)

	testType.false<IsEqual<number, boolean>>(true)
	testType.false<IsEqual<string, boolean>>(true)
	testType.false<IsEqual<symbol, boolean>>(true)
	testType.false<IsEqual<bigint, boolean>>(true)
	testType.false<IsEqual<Function, boolean>>(true)
	testType.false<IsEqual<undefined, boolean>>(true)
	testType.false<IsEqual<null, boolean>>(true)
	testType.false<IsEqual<object, boolean>>(true)

	testType.false<IsEqual<boolean, number>>(true)
	testType.false<IsEqual<string, number>>(true)
	testType.false<IsEqual<symbol, number>>(true)
	testType.false<IsEqual<bigint, number>>(true)
	testType.false<IsEqual<Function, number>>(true)
	testType.false<IsEqual<undefined, number>>(true)
	testType.false<IsEqual<null, number>>(true)
	testType.false<IsEqual<object, number>>(true)

	testType.false<IsEqual<boolean, string>>(true)
	testType.false<IsEqual<number, string>>(true)
	testType.false<IsEqual<symbol, string>>(true)
	testType.false<IsEqual<bigint, string>>(true)
	testType.false<IsEqual<Function, string>>(true)
	testType.false<IsEqual<undefined, string>>(true)
	testType.false<IsEqual<null, string>>(true)
	testType.false<IsEqual<object, string>>(true)

	testType.false<IsEqual<boolean, symbol>>(true)
	testType.false<IsEqual<number, symbol>>(true)
	testType.false<IsEqual<string, symbol>>(true)
	testType.false<IsEqual<bigint, symbol>>(true)
	testType.false<IsEqual<Function, symbol>>(true)
	testType.false<IsEqual<undefined, symbol>>(true)
	testType.false<IsEqual<null, symbol>>(true)
	testType.false<IsEqual<object, symbol>>(true)

	testType.false<IsEqual<boolean, bigint>>(true)
	testType.false<IsEqual<number, bigint>>(true)
	testType.false<IsEqual<string, bigint>>(true)
	testType.false<IsEqual<symbol, bigint>>(true)
	testType.false<IsEqual<Function, bigint>>(true)
	testType.false<IsEqual<undefined, bigint>>(true)
	testType.false<IsEqual<null, bigint>>(true)
	testType.false<IsEqual<object, bigint>>(true)

	testType.false<IsEqual<boolean, Function>>(true)
	testType.false<IsEqual<number, Function>>(true)
	testType.false<IsEqual<string, Function>>(true)
	testType.false<IsEqual<symbol, Function>>(true)
	testType.false<IsEqual<bigint, Function>>(true)
	testType.false<IsEqual<undefined, Function>>(true)
	testType.false<IsEqual<null, Function>>(true)
	testType.false<IsEqual<object, Function>>(true)

	testType.false<IsEqual<boolean, undefined>>(true)
	testType.false<IsEqual<number, undefined>>(true)
	testType.false<IsEqual<string, undefined>>(true)
	testType.false<IsEqual<symbol, undefined>>(true)
	testType.false<IsEqual<bigint, undefined>>(true)
	testType.false<IsEqual<Function, undefined>>(true)
	testType.false<IsEqual<null, undefined>>(true)
	testType.false<IsEqual<object, undefined>>(true)

	testType.false<IsEqual<boolean, null>>(true)
	testType.false<IsEqual<number, null>>(true)
	testType.false<IsEqual<string, null>>(true)
	testType.false<IsEqual<symbol, null>>(true)
	testType.false<IsEqual<bigint, null>>(true)
	testType.false<IsEqual<Function, null>>(true)
	testType.false<IsEqual<undefined, null>>(true)
	testType.false<IsEqual<object, null>>(true)

	testType.false<IsEqual<boolean, object>>(true)
	testType.false<IsEqual<number, object>>(true)
	testType.false<IsEqual<string, object>>(true)
	testType.false<IsEqual<symbol, object>>(true)
	testType.false<IsEqual<bigint, object>>(true)
	testType.false<IsEqual<Function, object>>(true)
	testType.false<IsEqual<undefined, object>>(true)
	testType.false<IsEqual<null, object>>(true)
})

it('compares actual symbol', () => {
	const s = Symbol()
	testType.equal<typeof s, typeof s>(true)
	testType.equal<typeof s, symbol>(false)
})

it('compares never', () => {
	testType.true<IsEqual<never, never>>(true)
	testType.false<IsEqual<never, 1>>(true)
	testType.false<IsEqual<1, never>>(true)

	testType.false<IsEqual<undefined, never>>(true)
	testType.false<IsEqual<never, undefined>>(true)
	testType.false<IsEqual<never, IsNotEqual<never, ValueOf<string>>>>(true)
	testType.false<IsEqual<never, IsEqual<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	testType.true<IsEqual<void, void>>(true)
	testType.false<IsEqual<void, 1>>(true)
	testType.false<IsEqual<1, void>>(true)
})

it('compares unknown', () => {
	testType.true<IsEqual<unknown, unknown>>(true)
	testType.false<IsEqual<unknown, 1>>(true)
	testType.false<IsEqual<1, unknown>>(true)
})

it('compares any', () => {
	testType.true<IsEqual<any, any>>(true)
	testType.false<IsEqual<any, 1>>(true)
	testType.false<IsEqual<1, any>>(true)
})

it('compares any against never', () => {
	testType.false<IsEqual<any, never>>(true)
	testType.false<IsEqual<never, any>>(true)
})

it('compares boolean with literals', () => {
	testType.true<IsEqual<true, true>>(true)
	testType.true<IsEqual<false, false>>(true)
	testType.true<IsEqual<boolean, boolean>>(true)

	testType.false<IsEqual<true, false>>(true)
	testType.false<IsEqual<false, true>>(true)
})

it('compares boolean literal with others', () => {
	testType.false<IsEqual<true, undefined>>(true)
	testType.false<IsEqual<true, null>>(true)
	testType.false<IsEqual<true, number>>(true)
	testType.false<IsEqual<true, string>>(true)
	testType.false<IsEqual<true, symbol>>(true)
	testType.false<IsEqual<true, object>>(true)
	testType.false<IsEqual<true, Function>>(true)

	testType.false<IsEqual<false, undefined>>(true)
	testType.false<IsEqual<false, null>>(true)
	testType.false<IsEqual<false, number>>(true)
	testType.false<IsEqual<false, string>>(true)
	testType.false<IsEqual<false, symbol>>(true)
	testType.false<IsEqual<false, object>>(true)
	testType.false<IsEqual<false, Function>>(true)
})

test('literal is not equal to widen type', () => {
	testType.false<IsEqual<1, number>>(true)
	testType.false<IsEqual<number, 1>>(true)

	testType.false<IsEqual<'a', string>>(true)
	testType.false<IsEqual<string, 'a'>>(true)
})

test('same object is true', () => {
	testType.true<IsEqual<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	testType.false<IsEqual<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	testType.false<IsEqual<{ a: any }, { a: 1 }>>(true)
	testType.false<IsEqual<{ a: 1 }, { a: any }>>(true)
	testType.true<IsEqual<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	testType.false<IsEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	testType.false<IsEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	testType.false<IsEqual<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	testType.false<IsEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	testType.true<IsEqual<[1], [1]>>(true)
	testType.true<IsEqual<[1, 2], [1, 2]>>(true)
	testType.true<IsEqual<[any], [any]>>(true)

	testType.false<IsEqual<[any], [1]>>(true)
	testType.false<IsEqual<1, [1]>>(true)
	testType.false<IsEqual<[1], 1>>(true)
	testType.false<IsEqual<[1, 2], [2, 1]>>(true)

	testType.true<IsEqual<[never], [never]>>(true)
	testType.true<IsEqual<[any], [any]>>(true)
	testType.true<IsEqual<[unknown], [unknown]>>(true)
	testType.true<IsEqual<[void], [void]>>(true)

	testType.false<IsEqual<[any], [unknown]>>(true)
	testType.false<IsEqual<[any], [never]>>(true)
	testType.false<IsEqual<[any], [void]>>(true)
	testType.false<IsEqual<[never], [any]>>(true)
	testType.false<IsEqual<[never], [unknown]>>(true)
	testType.false<IsEqual<[never], [void]>>(true)
	testType.false<IsEqual<[unknown], [any]>>(true)
	testType.false<IsEqual<[unknown], [never]>>(true)
	testType.false<IsEqual<[unknown], [void]>>(true)
	testType.false<IsEqual<[void], [any]>>(true)
	testType.false<IsEqual<[void], [unknown]>>(true)
	testType.false<IsEqual<[void], [never]>>(true)

	testType.false<IsEqual<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	testType.false<IsEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	testType.false<IsEqual<1 | 2, 1>>(true)
	testType.false<IsEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	testType.true<
		IsEqual<((v: string) => string) | ((v: number) => number), ((v: string) => string) | ((v: number) => number)>
	>(true)

	testType.false<IsEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	testType.false<IsEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('detects literal and widen type are different', () => {
	testType.false<IsEqual<1, number>>(true)
	testType.false<IsEqual<number, 1>>(true)
	testType.false<IsEqual<1 & { a: 1 }, number & { a: 1 }>>(true)
	testType.false<IsEqual<bigint & { a: 1 }, 1n & { a: 1 }>>(true)

	testType.true<IsEqual<1 & { a: 1 }, 1 & { a: 1 }>>(true)
})

it('works with intersect types', () => {
	testType.true<IsEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	testType.true<IsEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	testType.true<IsEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	testType.true<IsEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	testType.false<IsEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	testType.false<IsEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)

	testType.true<IsEqual<{ nested: { a: number; b: string } }, { nested: { a: number } & { b: string } }>>(
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

	testType.true<IsEqual<F, { (v: string): string; (v: number): number }>>(true)
	testType.false<IsEqual<F, { (v: string): string; (v: number): string }>>(true)

	testType.false<IsEqual<F, (v: number) => number>>(true)
	testType.false<IsEqual<F, (v: string) => number>>(true)

	testType.false<IsEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	testType.true<
		IsEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	testType.true<IsEqual<1 | (number & {}), number>>(true)

	testType.false<IsEqual<void, null>>(true)
	testType.false<IsEqual<undefined, null>>(true)
	testType.false<IsEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	testType.true<IsEqual<A, B>>(true)
	testType.true<IsEqual<A | B, B>>(true)

	testType.true<IsEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complex cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	testType.true<IsEqual<A, B>>(true)
	testType.true<IsEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	testType.true<IsEqual<P, { c: 1 }>>(true)
	testType.true<IsEqual<P, { c: 1 } | { c: 1 }>>(true)
	testType.true<IsEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	testType.false<IsEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	testType.true<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	testType.false<IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>>(
		true,
	)
	testType.false<
		IsEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override $then/$else', () => {
	testType.equal<IsEqual<any, any, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsEqual<unknown, unknown, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsEqual<never, never, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsEqual<void, void, { $then: 1; $else: 2 }>, 1>(true)

	testType.equal<IsEqual<any, undefined, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsEqual<unknown, undefined, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsEqual<never, undefined, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsEqual<void, undefined, { $then: 1; $else: 2 }>, 2>(true)

	testType.equal<IsEqual<undefined, any, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsEqual<undefined, unknown, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsEqual<undefined, never, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsEqual<undefined, void, { $then: 1; $else: 2 }>, 2>(true)
})

it('can detect difference with optional param', () => {
	testType.false<IsEqual<() => void, (a?: number) => void>>(true)
})

it('can detect difference with union return value', () => {
	testType.false<IsEqual<() => number, () => number | undefined>>(true)
})

describe('options', () => {
	it('supports filter', () => {
		testType.equal<IsEqual<1, 1, { selection: 'filter' }>, 1>(true)
		testType.equal<IsEqual<1, number, { selection: 'filter' }>, never>(true)
		testType.equal<IsEqual<any, any, { selection: 'filter' }>, any>(true)
		testType.equal<IsEqual<never, never, { selection: 'filter' }>, never>(true)
		testType.equal<IsEqual<{ a: 1 }, { a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
		testType.equal<IsEqual<(x: 1) => void, (x: 1) => void, { selection: 'filter' }>, (x: 1) => void>(true)
	})

	it('overrides both branches', () => {
		testType.equal<IsEqual<1, 1, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
		testType.equal<IsEqual<1, 2, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	})

	it('exposes $Same, the raw identity check', () => {
		testType.equal<IsEqual.$Same<1, 1, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
		testType.equal<IsEqual.$Same<{ a: 1 } & { b: 1 }, { a: 1; b: 1 }, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	})
})
