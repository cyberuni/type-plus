import { describe, expect, test } from 'vitest'

import {
	type JSONArray,
	type JSONObject,
	type JSONPrimitive,
	JSONTypes,
	type JsonArray,
	type JsonObject,
	type JsonPrimitive,
	JsonTypes,
} from './json.js'
import { testType } from './testing/test-type.js'
import { isType } from './type-guard/is-type.js'

test('JsonTypes is the union of the three JSON shapes', () => {
	testType.equal<JsonTypes, JsonPrimitive | JsonObject | JsonArray>(true)
})

test('admits what survives a JSON round trip, and nothing else', () => {
	testType.equal<{ a: 1 } extends JsonTypes ? true : false, true>(true)
	testType.equal<Date extends JsonTypes ? true : false, false>(true)
})

test('JsonPrimitive has no undefined, because JSON has no such value', () => {
	testType.equal<JsonPrimitive, boolean | number | string | null>(true)
	testType.equal<null extends JsonPrimitive ? true : false, true>(true)
	testType.equal<undefined extends JsonPrimitive ? true : false, false>(true)
})

test('every JsonObject property is optional, so reading one may be undefined', () => {
	testType.equal<JsonObject['a'], JsonTypes | undefined>(true)
	testType.equal<{ a: 1; b: 'x' } extends JsonObject ? true : false, true>(true)
	testType.equal<{ a: Date } extends JsonObject ? true : false, false>(true)
})

test('a JsonArray holds any mix of JsonTypes', () => {
	testType.equal<JsonArray[number], JsonTypes>(true)
	testType.equal<[1, 'x', null] extends JsonArray ? true : false, true>(true)
	testType.equal<[() => void] extends JsonArray ? true : false, false>(true)
})

test('empty object', () => {
	;({}) satisfies JsonTypes
})

test('empty array', () => {
	;[] satisfies JsonTypes
})

test('string array', () => {
	;['a'] satisfies JsonTypes
})

test('JsonObject', () => {
	isType<JsonObject>({})
})

describe('JsonTypes.get', () => {
	test('cast to T | undefined without props', () => {
		const a = JsonTypes.get<string>('abc')
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})
	test('get object props', () => {
		const a = JsonTypes.get<string>({ a: { b: 'abc' } }, 'a', 'b')
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})

	test('get array entry', () => {
		const a = JsonTypes.get<string>(['abc'], 0)
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})
	test('undefined when any step of the path is missing', () => {
		const doc = { a: { b: [1, 2] } }
		expect(JsonTypes.get(doc, 'a', 'nope')).toBe(undefined)
		expect(JsonTypes.get(doc, 'a', 'b', 'c', 'd')).toBe(undefined)
	})

	test('nested', () => {
		const a = JsonTypes.get<string>({ a: { b: [{ c: 'abc' }] } }, 'a', 'b', 0, 'c')
		isType<string | undefined>(a)
		expect(a).toBe('abc')
	})
})

test('the deprecated JSON* names are the same types', () => {
	testType.equal<JSONTypes, JsonTypes>(true)
	testType.equal<JSONPrimitive, JsonPrimitive>(true)
	testType.equal<JSONObject, JsonObject>(true)
	testType.equal<JSONArray, JsonArray>(true)
	expect(JSONTypes).toBe(JsonTypes)
})
