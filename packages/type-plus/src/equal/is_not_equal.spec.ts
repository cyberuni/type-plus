import { describe, it, test } from 'vitest'

import type { $Else, $Fn, $Then, Head, IsEqual, IsNotEqual, TuplePlus, ValueOf } from '../index.js'
import { testType } from '../index.js'

it('returns true when comparing primitive types with itself', () => {
	testType.false<IsNotEqual<boolean, boolean>>(true)
	testType.false<IsNotEqual<boolean, boolean>>(true)
	testType.false<IsNotEqual<number, number>>(true)
	testType.false<IsNotEqual<string, string>>(true)
	testType.false<IsNotEqual<symbol, symbol>>(true)
	testType.false<IsNotEqual<bigint, bigint>>(true)
	testType.false<IsNotEqual<Function, Function>>(true)
	testType.false<IsNotEqual<undefined, undefined>>(true)
	testType.false<IsNotEqual<null, null>>(true)
	testType.false<IsNotEqual<object, object>>(true)
})

it('returns false when comparing primitive types against each other', () => {
	testType.true<IsNotEqual<boolean, number>>(true)
	testType.true<IsNotEqual<boolean, string>>(true)
	testType.true<IsNotEqual<boolean, symbol>>(true)
	testType.true<IsNotEqual<boolean, bigint>>(true)
	testType.true<IsNotEqual<boolean, Function>>(true)
	testType.true<IsNotEqual<boolean, undefined>>(true)
	testType.true<IsNotEqual<boolean, null>>(true)
	testType.true<IsNotEqual<boolean, object>>(true)

	testType.true<IsNotEqual<number, boolean>>(true)
	testType.true<IsNotEqual<number, string>>(true)
	testType.true<IsNotEqual<number, symbol>>(true)
	testType.true<IsNotEqual<number, bigint>>(true)
	testType.true<IsNotEqual<number, Function>>(true)
	testType.true<IsNotEqual<number, undefined>>(true)
	testType.true<IsNotEqual<number, null>>(true)
	testType.true<IsNotEqual<number, object>>(true)

	testType.true<IsNotEqual<string, boolean>>(true)
	testType.true<IsNotEqual<string, number>>(true)
	testType.true<IsNotEqual<string, symbol>>(true)
	testType.true<IsNotEqual<string, bigint>>(true)
	testType.true<IsNotEqual<string, Function>>(true)
	testType.true<IsNotEqual<string, undefined>>(true)
	testType.true<IsNotEqual<string, null>>(true)
	testType.true<IsNotEqual<string, object>>(true)

	testType.true<IsNotEqual<symbol, boolean>>(true)
	testType.true<IsNotEqual<symbol, number>>(true)
	testType.true<IsNotEqual<symbol, string>>(true)
	testType.true<IsNotEqual<symbol, bigint>>(true)
	testType.true<IsNotEqual<symbol, Function>>(true)
	testType.true<IsNotEqual<symbol, undefined>>(true)
	testType.true<IsNotEqual<symbol, null>>(true)
	testType.true<IsNotEqual<symbol, object>>(true)

	testType.true<IsNotEqual<bigint, boolean>>(true)
	testType.true<IsNotEqual<bigint, number>>(true)
	testType.true<IsNotEqual<bigint, string>>(true)
	testType.true<IsNotEqual<bigint, symbol>>(true)
	testType.true<IsNotEqual<bigint, Function>>(true)
	testType.true<IsNotEqual<bigint, undefined>>(true)
	testType.true<IsNotEqual<bigint, null>>(true)
	testType.true<IsNotEqual<bigint, object>>(true)

	testType.true<IsNotEqual<Function, boolean>>(true)
	testType.true<IsNotEqual<Function, number>>(true)
	testType.true<IsNotEqual<Function, string>>(true)
	testType.true<IsNotEqual<Function, symbol>>(true)
	testType.true<IsNotEqual<Function, bigint>>(true)
	testType.true<IsNotEqual<Function, undefined>>(true)
	testType.true<IsNotEqual<Function, null>>(true)
	testType.true<IsNotEqual<Function, object>>(true)

	testType.true<IsNotEqual<undefined, boolean>>(true)
	testType.true<IsNotEqual<undefined, number>>(true)
	testType.true<IsNotEqual<undefined, string>>(true)
	testType.true<IsNotEqual<undefined, symbol>>(true)
	testType.true<IsNotEqual<undefined, bigint>>(true)
	testType.true<IsNotEqual<undefined, Function>>(true)
	testType.true<IsNotEqual<undefined, null>>(true)
	testType.true<IsNotEqual<undefined, object>>(true)

	testType.true<IsNotEqual<null, boolean>>(true)
	testType.true<IsNotEqual<null, number>>(true)
	testType.true<IsNotEqual<null, string>>(true)
	testType.true<IsNotEqual<null, symbol>>(true)
	testType.true<IsNotEqual<null, bigint>>(true)
	testType.true<IsNotEqual<null, Function>>(true)
	testType.true<IsNotEqual<null, undefined>>(true)
	testType.true<IsNotEqual<null, object>>(true)

	testType.true<IsNotEqual<object, boolean>>(true)
	testType.true<IsNotEqual<object, number>>(true)
	testType.true<IsNotEqual<object, string>>(true)
	testType.true<IsNotEqual<object, symbol>>(true)
	testType.true<IsNotEqual<object, bigint>>(true)
	testType.true<IsNotEqual<object, Function>>(true)
	testType.true<IsNotEqual<object, undefined>>(true)
	testType.true<IsNotEqual<object, null>>(true)

	testType.true<IsNotEqual<number, boolean>>(true)
	testType.true<IsNotEqual<string, boolean>>(true)
	testType.true<IsNotEqual<symbol, boolean>>(true)
	testType.true<IsNotEqual<bigint, boolean>>(true)
	testType.true<IsNotEqual<Function, boolean>>(true)
	testType.true<IsNotEqual<undefined, boolean>>(true)
	testType.true<IsNotEqual<null, boolean>>(true)
	testType.true<IsNotEqual<object, boolean>>(true)

	testType.true<IsNotEqual<boolean, number>>(true)
	testType.true<IsNotEqual<string, number>>(true)
	testType.true<IsNotEqual<symbol, number>>(true)
	testType.true<IsNotEqual<bigint, number>>(true)
	testType.true<IsNotEqual<Function, number>>(true)
	testType.true<IsNotEqual<undefined, number>>(true)
	testType.true<IsNotEqual<null, number>>(true)
	testType.true<IsNotEqual<object, number>>(true)

	testType.true<IsNotEqual<boolean, string>>(true)
	testType.true<IsNotEqual<number, string>>(true)
	testType.true<IsNotEqual<symbol, string>>(true)
	testType.true<IsNotEqual<bigint, string>>(true)
	testType.true<IsNotEqual<Function, string>>(true)
	testType.true<IsNotEqual<undefined, string>>(true)
	testType.true<IsNotEqual<null, string>>(true)
	testType.true<IsNotEqual<object, string>>(true)

	testType.true<IsNotEqual<boolean, symbol>>(true)
	testType.true<IsNotEqual<number, symbol>>(true)
	testType.true<IsNotEqual<string, symbol>>(true)
	testType.true<IsNotEqual<bigint, symbol>>(true)
	testType.true<IsNotEqual<Function, symbol>>(true)
	testType.true<IsNotEqual<undefined, symbol>>(true)
	testType.true<IsNotEqual<null, symbol>>(true)
	testType.true<IsNotEqual<object, symbol>>(true)

	testType.true<IsNotEqual<boolean, bigint>>(true)
	testType.true<IsNotEqual<number, bigint>>(true)
	testType.true<IsNotEqual<string, bigint>>(true)
	testType.true<IsNotEqual<symbol, bigint>>(true)
	testType.true<IsNotEqual<Function, bigint>>(true)
	testType.true<IsNotEqual<undefined, bigint>>(true)
	testType.true<IsNotEqual<null, bigint>>(true)
	testType.true<IsNotEqual<object, bigint>>(true)

	testType.true<IsNotEqual<boolean, Function>>(true)
	testType.true<IsNotEqual<number, Function>>(true)
	testType.true<IsNotEqual<string, Function>>(true)
	testType.true<IsNotEqual<symbol, Function>>(true)
	testType.true<IsNotEqual<bigint, Function>>(true)
	testType.true<IsNotEqual<undefined, Function>>(true)
	testType.true<IsNotEqual<null, Function>>(true)
	testType.true<IsNotEqual<object, Function>>(true)

	testType.true<IsNotEqual<boolean, undefined>>(true)
	testType.true<IsNotEqual<number, undefined>>(true)
	testType.true<IsNotEqual<string, undefined>>(true)
	testType.true<IsNotEqual<symbol, undefined>>(true)
	testType.true<IsNotEqual<bigint, undefined>>(true)
	testType.true<IsNotEqual<Function, undefined>>(true)
	testType.true<IsNotEqual<null, undefined>>(true)
	testType.true<IsNotEqual<object, undefined>>(true)

	testType.true<IsNotEqual<boolean, null>>(true)
	testType.true<IsNotEqual<number, null>>(true)
	testType.true<IsNotEqual<string, null>>(true)
	testType.true<IsNotEqual<symbol, null>>(true)
	testType.true<IsNotEqual<bigint, null>>(true)
	testType.true<IsNotEqual<Function, null>>(true)
	testType.true<IsNotEqual<undefined, null>>(true)
	testType.true<IsNotEqual<object, null>>(true)

	testType.true<IsNotEqual<boolean, object>>(true)
	testType.true<IsNotEqual<number, object>>(true)
	testType.true<IsNotEqual<string, object>>(true)
	testType.true<IsNotEqual<symbol, object>>(true)
	testType.true<IsNotEqual<bigint, object>>(true)
	testType.true<IsNotEqual<Function, object>>(true)
	testType.true<IsNotEqual<undefined, object>>(true)
	testType.true<IsNotEqual<null, object>>(true)
})

it('compares never', () => {
	testType.false<IsNotEqual<never, never>>(true)
	testType.true<IsNotEqual<never, 1>>(true)
	testType.true<IsNotEqual<1, never>>(true)

	testType.true<IsNotEqual<undefined, never>>(true)
	testType.true<IsNotEqual<never, undefined>>(true)
	testType.true<IsNotEqual<never, IsNotEqual<never, ValueOf<string>>>>(true)
	testType.true<IsNotEqual<never, IsEqual<never, ValueOf<string>>>>(true)
})

it('compares void', () => {
	testType.false<IsNotEqual<void, void>>(true)
	testType.true<IsNotEqual<void, 1>>(true)
	testType.true<IsNotEqual<1, void>>(true)
})

it('compares unknown', () => {
	testType.false<IsNotEqual<unknown, unknown>>(true)
	testType.true<IsNotEqual<unknown, 1>>(true)
	testType.true<IsNotEqual<1, unknown>>(true)
})

it('compares any', () => {
	testType.false<IsNotEqual<any, any>>(true)
	testType.true<IsNotEqual<any, 1>>(true)
	testType.true<IsNotEqual<1, any>>(true)
})

it('compares any against never', () => {
	testType.true<IsNotEqual<any, never>>(true)
	testType.true<IsNotEqual<never, any>>(true)
})

it('compares boolean with literals', () => {
	testType.false<IsNotEqual<true, true>>(true)
	testType.false<IsNotEqual<false, false>>(true)
	testType.false<IsNotEqual<boolean, boolean>>(true)

	testType.true<IsNotEqual<true, false>>(true)
	testType.true<IsNotEqual<false, true>>(true)
})

it('compares boolean literal with others', () => {
	testType.true<IsNotEqual<true, undefined>>(true)
	testType.true<IsNotEqual<true, null>>(true)
	testType.true<IsNotEqual<true, number>>(true)
	testType.true<IsNotEqual<true, string>>(true)
	testType.true<IsNotEqual<true, symbol>>(true)
	testType.true<IsNotEqual<true, object>>(true)
	testType.true<IsNotEqual<true, Function>>(true)

	testType.true<IsNotEqual<false, undefined>>(true)
	testType.true<IsNotEqual<false, null>>(true)
	testType.true<IsNotEqual<false, number>>(true)
	testType.true<IsNotEqual<false, string>>(true)
	testType.true<IsNotEqual<false, symbol>>(true)
	testType.true<IsNotEqual<false, object>>(true)
	testType.true<IsNotEqual<false, Function>>(true)
})

test('literal is not Notequal to widen type', () => {
	testType.true<IsNotEqual<1, number>>(true)
	testType.true<IsNotEqual<number, 1>>(true)

	testType.true<IsNotEqual<'a', string>>(true)
	testType.true<IsNotEqual<string, 'a'>>(true)
})

test('same object is true', () => {
	testType.false<IsNotEqual<{ a: 1 }, { a: 1 }>>(true)
})

test('different object is false', () => {
	testType.true<IsNotEqual<{ a: 1 }, { b: 1 }>>(true)
})

test('object with any', () => {
	testType.true<IsNotEqual<{ a: any }, { a: 1 }>>(true)
	testType.true<IsNotEqual<{ a: 1 }, { a: any }>>(true)
	testType.false<IsNotEqual<{ a: any }, { a: any }>>(true)
})

test('A subset of B is false', () => {
	testType.true<IsNotEqual<{ a: 1 }, { a: 1; b: 1 }>>(true)
})

test('B subset of A is false', () => {
	testType.true<IsNotEqual<{ a: 1; b: 1 }, { a: 1 }>>(true)
})

test('disjoin is false', () => {
	testType.true<IsNotEqual<{ b: 1 }, { a: 1 }>>(true)
})

test('overlap is false', () => {
	testType.true<IsNotEqual<{ a: 1; b: 1 }, { a: 1; c: 2 }>>(true)
})

it('works against tuple', () => {
	testType.false<IsNotEqual<[1], [1]>>(true)
	testType.false<IsNotEqual<[1, 2], [1, 2]>>(true)
	testType.false<IsNotEqual<[any], [any]>>(true)

	testType.true<IsNotEqual<[any], [1]>>(true)
	testType.true<IsNotEqual<1, [1]>>(true)
	testType.true<IsNotEqual<[1], 1>>(true)
	testType.true<IsNotEqual<[1, 2], [2, 1]>>(true)

	testType.false<IsNotEqual<[never], [never]>>(true)
	testType.false<IsNotEqual<[any], [any]>>(true)
	testType.false<IsNotEqual<[unknown], [unknown]>>(true)

	testType.true<IsNotEqual<[any], [never]>>(true)
	testType.true<IsNotEqual<[any], [unknown]>>(true)
	testType.true<IsNotEqual<[never], [any]>>(true)
	testType.true<IsNotEqual<[never], [unknown]>>(true)
	testType.true<IsNotEqual<[unknown], [any]>>(true)
	testType.true<IsNotEqual<[unknown], [never]>>(true)

	testType.true<IsNotEqual<[any, number], [number, any]>>(true)
})

it('works with union types containing undefined', () => {
	testType.true<IsNotEqual<string | undefined, string | undefined | number>>(true)
})

it('works with union types containing symbol', () => {
	testType.true<IsNotEqual<string | symbol, string | symbol | number>>(true)
})

it('works with union of functions', () => {
	testType.false<
		IsNotEqual<((v: string) => string) | ((v: number) => number), ((v: string) => string) | ((v: number) => number)>
	>(true)

	testType.true<IsNotEqual<(v: string) => string, ((v: string) => string) | ((v: number) => number)>>(true)
	testType.true<IsNotEqual<((v: string) => string) | ((v: number) => number), (v: string) => string>>(true)
})

it('works with intersect types', () => {
	testType.false<IsNotEqual<{ a: number; b: string }, { a: number } & { b: string }>>(true)
	testType.false<IsNotEqual<{ a: number } & { b: number }, { a: number; b: number }>>(true)
	testType.false<IsNotEqual<{ a: number; b?: string }, { a: number } & { b?: string }>>(true)
	testType.false<IsNotEqual<{ a: number } & { b?: string }, { a: number; b?: string }>>(true)

	testType.true<IsNotEqual<1 | 2, 1>>(true)
	testType.true<IsNotEqual<{ a: number } & { c: number }, { a: number; b: number }>>(true)
	testType.true<IsNotEqual<{ a: number; b: number }, { a: number } & { c: number }>>(true)
})

it('works with function overload', () => {
	function foo(v: string): string
	function foo(v: number): number
	function foo(v: unknown) {
		return v
	}
	type F = typeof foo

	testType.false<IsNotEqual<F, { (v: string): string; (v: number): number }>>(true)
	testType.true<IsNotEqual<F, { (v: string): string; (v: number): string }>>(true)

	testType.true<IsNotEqual<F, (v: number) => number>>(true)
	testType.true<IsNotEqual<F, (v: string) => number>>(true)

	testType.true<IsNotEqual<(x: 0, y: null) => void, (x: number, y: string) => void>>(true)
	testType.false<
		IsNotEqual<
			((x: 0, y: null) => void) & ((x: number, y: string) => void),
			((x: number, y: string) => void) & ((x: 0, y: null) => void)
		>
	>(true)
})

it('works with complex cases', () => {
	testType.false<IsNotEqual<1 | (number & {}), number>>(true)

	testType.true<IsNotEqual<void, null>>(true)
	testType.true<IsNotEqual<undefined, null>>(true)
	testType.true<IsNotEqual<() => void, () => undefined>>(true)

	type A = (() => 'foo') & (() => true)
	type B = (() => true) & (() => 'foo')

	testType.false<IsNotEqual<A, B>>(true)
	testType.false<IsNotEqual<A | B, B>>(true)

	testType.false<IsNotEqual<Head<[1, 2, 3]>, 1>>(true)
})

it('works with complex cases 2', () => {
	type A = () => 'foo'
	type B = () => 'foo'

	testType.false<IsNotEqual<A, B>>(true)
	testType.false<IsNotEqual<A | B, B>>(true)
})

it('works with intersect of the same type', () => {
	type P = { c: 1 } | { c: 1 }

	testType.false<IsNotEqual<P, { c: 1 }>>(true)
	testType.false<IsNotEqual<P, { c: 1 } | { c: 1 }>>(true)
	testType.false<IsNotEqual<P, { c: 1 } | { c: 1 } | { c: 1 }>>(true)
})

it('detect redonly', () => {
	testType.true<IsNotEqual<{ a: 1 }, { readonly a: 1 }>>(true)
})

it('works with deep any', () => {
	testType.false<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: void } }>
	>(true)

	testType.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: 1; n: never; u: unknown; v: void } }>
	>(true)

	testType.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: 2; u: unknown; v: void } }>
	>(true)
	testType.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: 3; v: void } }>
	>(true)
	testType.true<
		IsNotEqual<{ a: { a: any; n: never; u: unknown; v: void } }, { a: { a: any; n: never; u: unknown; v: 4 } }>
	>(true)
})

it('can override $then/$else', () => {
	testType.equal<IsNotEqual<any, any, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsNotEqual<unknown, unknown, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsNotEqual<never, never, { $then: 1; $else: 2 }>, 2>(true)
	testType.equal<IsNotEqual<void, void, { $then: 1; $else: 2 }>, 2>(true)

	testType.equal<IsNotEqual<any, undefined, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsNotEqual<unknown, undefined, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsNotEqual<never, undefined, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsNotEqual<void, undefined, { $then: 1; $else: 2 }>, 1>(true)

	testType.equal<IsNotEqual<undefined, any, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsNotEqual<undefined, unknown, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsNotEqual<undefined, never, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsNotEqual<undefined, void, { $then: 1; $else: 2 }>, 1>(true)
})

it('treats two distinct unique symbols as not equal', () => {
	const s1 = Symbol()
	const s2 = Symbol()
	testType.false<IsNotEqual<typeof s1, typeof s1>>(true)
	testType.true<IsNotEqual<typeof s1, typeof s2>>(true)
	testType.true<IsNotEqual<typeof s1, symbol>>(true)
})

describe('options', () => {
	it('supports filter, keeping A', () => {
		testType.equal<IsNotEqual<1, number, { selection: 'filter' }>, 1>(true)
		testType.equal<IsNotEqual<number, 1, { selection: 'filter' }>, number>(true)
		testType.equal<IsNotEqual<1, 1, { selection: 'filter' }>, never>(true)
	})

	it('supports branching', () => {
		testType.equal<IsNotEqual<1, 2, IsNotEqual.$Branch>, $Then>(true)
		testType.equal<IsNotEqual<1, 1, IsNotEqual.$Branch>, $Else>(true)
	})

	it('overrides one branch', () => {
		testType.equal<IsNotEqual<1, 2, { $then: 'yes' }>, 'yes'>(true)
		testType.equal<IsNotEqual<1, 1, { $else: 'no' }>, 'no'>(true)
	})
})

describe('IsNotEqual.$Fn', () => {
	it('is IsNotEqual with its fixed input applied', () => {
		testType.equal<$Fn.Apply<IsNotEqual.$Fn<1>, number>, true>(true)
		testType.equal<$Fn.Apply<IsNotEqual.$Fn<1>, 1>, false>(true)
		testType.equal<TuplePlus.Filter<[1, number, 1], IsNotEqual.$Fn<1>>, [number]>(true)
	})
})
