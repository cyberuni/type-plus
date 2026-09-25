import { expect, it } from 'vitest'

import { testType } from './test-type.js'

it('can inspect type T', () => {
	testType.inspect<{ a: number }>((_t) => testType.equal<typeof _t.type, { a: number }>(true))
})

it('can inspect how T extends specific type', () => {
	testType.inspect<{ a: number }>((t) => {
		expect(t.extends<{ a: string }>() satisfies false).toBe(true)
	})
})

it('can inspect T extends basic types', () => {
	testType.inspect<123>(
		({
			extends_1,
			extends_1n,
			extends_a,
			extends_any,
			extends_array_unknown,
			extends_bigint,
			extends_boolean,
			extends_false,
			extends_function,
			extends_never,
			extends_null,
			extends_number,
			extends_object,
			extends_string,
			extends_symbol,
			extends_true,
			extends_tuple_empty,
			extends_undefined,
			extends_unknown,
			extends_void,
		}) => {
			testType.false<typeof extends_1>(true)
			testType.false<typeof extends_1n>(true)
			testType.false<typeof extends_a>(true)
			testType.true<typeof extends_any>(true)
			testType.false<typeof extends_array_unknown>(true)
			testType.false<typeof extends_bigint>(true)
			testType.false<typeof extends_boolean>(true)
			testType.false<typeof extends_false>(true)
			testType.false<typeof extends_function>(true)
			testType.false<typeof extends_never>(true)
			testType.false<typeof extends_null>(true)
			testType.true<typeof extends_number>(true)
			testType.false<typeof extends_object>(true)
			testType.false<typeof extends_string>(true)
			testType.false<typeof extends_symbol>(true)
			testType.false<typeof extends_true>(true)
			testType.false<typeof extends_tuple_empty>(true)
			testType.false<typeof extends_undefined>(true)
			testType.true<typeof extends_unknown>(true)
			testType.false<typeof extends_void>(true)
		},
	)
})

it('can inspect how T union with specific type', () => {
	testType.inspect<{ a: number }>((t) => {
		t.union<{ a: string }>() satisfies { a: number } | { a: string }
	})
})

it('can inspect T union with basic types', () => {
	testType.inspect<123>(
		({
			union_1,
			union_1n,
			union_a,
			union_any,
			union_array_unknown,
			union_bigint,
			union_boolean,
			union_false,
			union_function,
			union_never,
			union_null,
			union_number,
			union_object,
			union_string,
			union_symbol,
			union_true,
			union_tuple_empty,
			union_undefined,
			union_unknown,
			union_void,
		}) => {
			testType.equal<typeof union_1, 123 | 1>(true)
			testType.equal<typeof union_1n, 123 | 1n>(true)
			testType.equal<typeof union_a, 123 | 'a'>(true)
			testType.equal<typeof union_any, any>(true)
			testType.equal<typeof union_array_unknown, 123 | unknown[]>(true)
			testType.equal<typeof union_bigint, 123 | bigint>(true)
			testType.equal<typeof union_boolean, 123 | boolean>(true)
			testType.equal<typeof union_false, 123 | false>(true)
			testType.equal<typeof union_function, 123 | Function>(true)
			testType.equal<typeof union_never, 123>(true)
			testType.equal<typeof union_null, 123 | null>(true)
			testType.equal<typeof union_number, number>(true)
			testType.equal<typeof union_object, 123 | object>(true)
			testType.equal<typeof union_string, 123 | string>(true)
			testType.equal<typeof union_symbol, 123 | symbol>(true)
			testType.equal<typeof union_true, 123 | true>(true)
			testType.equal<typeof union_tuple_empty, 123 | []>(true)
			testType.equal<typeof union_undefined, 123 | undefined>(true)
			testType.equal<typeof union_unknown, unknown>(true)
			testType.equal<typeof union_void, 123 | void>(true)
		},
	)
})

it('can inspect how T intersect with specific type', () => {
	testType.inspect<{ a: number }>((t) => {
		t.intersect<{ a: string }>() satisfies { a: number } | { a: string }
	})
})

it('can inspect T intersect with basic types', () => {
	testType.inspect<123>(
		({
			intersect_1,
			intersect_1n,
			intersect_a,
			intersect_any,
			intersect_array_unknown,
			intersect_bigint,
			intersect_boolean,
			intersect_false,
			intersect_function,
			intersect_never,
			intersect_null,
			intersect_number,
			intersect_object,
			intersect_string,
			intersect_symbol,
			intersect_true,
			intersect_tuple_empty,
			intersect_undefined,
			intersect_unknown,
			intersect_void,
		}) => {
			testType.equal<typeof intersect_1, never>(true)
			testType.equal<typeof intersect_1n, never>(true)
			testType.equal<typeof intersect_a, never>(true)
			testType.equal<typeof intersect_any, any>(true)
			testType.equal<typeof intersect_array_unknown, 123 & unknown[]>(true)
			testType.equal<typeof intersect_bigint, never>(true)
			testType.equal<typeof intersect_boolean, never>(true)
			testType.equal<typeof intersect_false, never>(true)
			testType.equal<typeof intersect_function, 123 & Function>(true)
			testType.equal<typeof intersect_never, never>(true)
			testType.equal<typeof intersect_null, never>(true)
			testType.equal<typeof intersect_number, 123>(true)
			testType.equal<typeof intersect_object, never>(true)
			testType.equal<typeof intersect_string, never>(true)
			testType.equal<typeof intersect_symbol, never>(true)
			testType.equal<typeof intersect_true, never>(true)
			testType.equal<typeof intersect_tuple_empty, 123 & []>(true)
			testType.equal<typeof intersect_undefined, never>(true)
			testType.equal<typeof intersect_unknown, 123>(true)
			testType.equal<typeof intersect_void, never>(true)
		},
	)
})
