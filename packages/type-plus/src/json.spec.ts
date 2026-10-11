import { describe, it } from 'vitest'

import type {
	JSONArray,
	JSONObject,
	JSONPrimitive,
	JSONTypes,
	JsonArray,
	JsonObject,
	JsonPrimitive,
	JsonTypes,
} from './index.js'
import { testType } from './testing/index.js'

describe('JsonTypes', () => {
	it('is the union of the three JSON shapes', () => {
		testType.equal<JsonTypes, JsonPrimitive | JsonObject | JsonArray>(true)
	})

	it('admits what survives a JSON round trip', () => {
		testType.equal<{ a: 1 } extends JsonTypes ? true : false, true>(true)
		testType.equal<{ readonly a: readonly [1, 2] } extends JsonTypes ? true : false, true>(true)
		;({}) satisfies JsonTypes
		;[] satisfies JsonTypes
		;['a'] satisfies JsonTypes
		;({ a: [1, { b: null }] }) satisfies JsonTypes
	})

	it('admits readonly and `as const` data', () => {
		;({ a: [1, 2] }) as const satisfies JsonTypes
		;[1, 'x'] as const satisfies JsonTypes
	})

	it('rejects what does not survive a JSON round trip', () => {
		testType.equal<Date extends JsonTypes ? true : false, false>(true)
		testType.equal<undefined extends JsonTypes ? true : false, false>(true)
		testType.equal<bigint extends JsonTypes ? true : false, false>(true)
		testType.equal<(() => void) extends JsonTypes ? true : false, false>(true)
	})

	it('rejects a property holding undefined', () => {
		testType.equal<{ a: undefined } extends JsonTypes ? true : false, false>(true)
		// @ts-expect-error `undefined` is not a JSON value
		const r: JsonTypes = { a: undefined }
		void r
	})

	it('admits an optional property', () => {
		testType.equal<{ a?: number } extends JsonTypes ? true : false, true>(true)
		const o: { a?: number } = {}
		o satisfies JsonTypes
	})

	it('rejects an interface, which has no implicit index signature', () => {
		interface User {
			id: number
		}
		testType.equal<User extends JsonTypes ? true : false, false>(true)
	})
})

describe('JsonPrimitive', () => {
	it('has no undefined, because JSON has no such value', () => {
		testType.equal<JsonPrimitive, boolean | number | string | null>(true)
		testType.equal<null extends JsonPrimitive ? true : false, true>(true)
		testType.equal<undefined extends JsonPrimitive ? true : false, false>(true)
	})
})

describe('JsonObject', () => {
	it('holds JsonTypes under string keys', () => {
		testType.equal<JsonObject[string], JsonTypes>(true)
		testType.equal<{ a: 1; b: 'x' } extends JsonObject ? true : false, true>(true)
		testType.equal<{ a: Date } extends JsonObject ? true : false, false>(true)
		;({}) satisfies JsonObject
	})

	it('admits an absent key but not an undefined one', () => {
		testType.equal<{ a?: number } extends JsonObject ? true : false, true>(true)
		testType.equal<{ a: undefined } extends JsonObject ? true : false, false>(true)
		testType.equal<{ a: number | undefined } extends JsonObject ? true : false, false>(true)
	})

	it('reads a key as possibly absent under noUncheckedIndexedAccess', () => {
		const o: JsonObject = JSON.parse('{}')
		const r = o['a']
		testType.equal<typeof r, JsonTypes | undefined>(true)
	})
})

describe('JsonArray', () => {
	it('holds any mix of JsonTypes', () => {
		testType.equal<JsonArray[number], JsonTypes>(true)
		testType.equal<[1, 'x', null] extends JsonArray ? true : false, true>(true)
		testType.equal<[() => void] extends JsonArray ? true : false, false>(true)
	})

	it('admits readonly arrays and tuples', () => {
		testType.equal<readonly [1, 'x'] extends JsonArray ? true : false, true>(true)
		testType.equal<readonly string[] extends JsonArray ? true : false, true>(true)
		testType.equal<string[] extends JsonArray ? true : false, true>(true)
	})
})

it('the deprecated JSON* names are the same types', () => {
	testType.equal<JSONTypes, JsonTypes>(true)
	testType.equal<JSONPrimitive, JsonPrimitive>(true)
	testType.equal<JSONObject, JsonObject>(true)
	testType.equal<JSONArray, JsonArray>(true)
})
