import { describe, expect, test } from 'vitest'

import { assertType } from './assertion/assert_type.js'
import { type JSONArray, type JSONObject, type JSONPrimitive, JSONTypes } from './json.js'
import { testType } from './testing/test_type.js'
import { isType } from './type-guard/is_type.js'

test('JSONTypes is the union of the three JSON shapes', () => {
	testType.equal<JSONTypes, JSONPrimitive | JSONObject | JSONArray>(true)
})

test('admits what survives a JSON round trip, and nothing else', () => {
	testType.equal<{ a: 1 } extends JSONTypes ? true : false, true>(true)
	testType.equal<Date extends JSONTypes ? true : false, false>(true)
})

test('JSONPrimitive has no undefined, because JSON has no such value', () => {
	testType.equal<JSONPrimitive, boolean | number | string | null>(true)
	testType.equal<null extends JSONPrimitive ? true : false, true>(true)
	testType.equal<undefined extends JSONPrimitive ? true : false, false>(true)
})

test('every JSONObject property is optional, so reading one may be undefined', () => {
	testType.equal<JSONObject['a'], JSONTypes | undefined>(true)
	testType.equal<{ a: 1; b: 'x' } extends JSONObject ? true : false, true>(true)
	testType.equal<{ a: Date } extends JSONObject ? true : false, false>(true)
})

test('a JSONArray holds any mix of JSONTypes', () => {
	testType.equal<JSONArray[number], JSONTypes>(true)
	testType.equal<[1, 'x', null] extends JSONArray ? true : false, true>(true)
	testType.equal<[() => void] extends JSONArray ? true : false, false>(true)
})

test('empty object', () => {
	assertType<JSONTypes>({})
})

test('empty array', () => {
	assertType<JSONTypes>([])
})

test('string array', () => {
	assertType<JSONTypes>(['a'])
})

test('JSONObject', () => {
	isType<JSONObject>({})
})

describe('JSONTypes.get', () => {
	test('cast to T | undefined without props', () => {
		const a = JSONTypes.get<string>('abc')
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})
	test('get object props', () => {
		const a = JSONTypes.get<string>({ a: { b: 'abc' } }, 'a', 'b')
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})

	test('get array entry', () => {
		const a = JSONTypes.get<string>(['abc'], 0)
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})
	test('undefined when any step of the path is missing', () => {
		const doc = { a: { b: [1, 2] } }
		expect(JSONTypes.get(doc, 'a', 'nope')).toBe(undefined)
		expect(JSONTypes.get(doc, 'a', 'b', 'c', 'd')).toBe(undefined)
	})

	test('nested', () => {
		const a = JSONTypes.get<string>({ a: { b: [{ c: 'abc' }] } }, 'a', 'b', 0, 'c')
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})
})
