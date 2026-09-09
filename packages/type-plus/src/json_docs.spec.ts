/**
 * Pins the `@example` blocks in the `src/json.ts` TSDoc comments to the actual
 * behavior.
 *
 * Every assertion here mirrors a line documented in `src/json.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { expect, it } from 'vitest'

import {
	type ComposableTypes,
	type JSONArray,
	type JSONObject,
	type JSONPrimitive,
	type JSONTypes,
	type NonComposableTypes,
	type PrimitiveTypes,
	testType,
	type UnionKeys,
} from './index.js'
// The value half of `JSONTypes` is not re-exported from `index.ts`, so its
// examples are pinned against the module that declares it.
import { JSONTypes as JSONTypesValue } from './json.js'

it('JSONTypes examples in TSDoc are accurate', () => {
	testType.equal<JSONTypes, JSONPrimitive | JSONObject | JSONArray>(true)
	testType.equal<{ a: 1 } extends JSONTypes ? true : false, true>(true)
	testType.equal<Date extends JSONTypes ? true : false, false>(true)
})

it('JSONPrimitive examples in TSDoc are accurate', () => {
	testType.equal<JSONPrimitive, boolean | number | string | null>(true)
	testType.equal<null extends JSONPrimitive ? true : false, true>(true)
	testType.equal<undefined extends JSONPrimitive ? true : false, false>(true)
})

it('JSONObject examples in TSDoc are accurate', () => {
	testType.equal<JSONObject['a'], JSONTypes | undefined>(true)
	testType.equal<{ a: 1; b: 'x' } extends JSONObject ? true : false, true>(true)
	testType.equal<{ a: Date } extends JSONObject ? true : false, false>(true)
})

it('JSONArray examples in TSDoc are accurate', () => {
	testType.equal<JSONArray[number], JSONTypes>(true)
	testType.equal<[1, 'x', null] extends JSONArray ? true : false, true>(true)
	testType.equal<[() => void] extends JSONArray ? true : false, false>(true)
})

it('JSONTypes.get examples in TSDoc are accurate', () => {
	const doc = { a: { b: [1, 2] } }

	expect(JSONTypesValue.get<number>(doc, 'a', 'b', 1)).toBe(2)
	expect(JSONTypesValue.get(doc, 'a', 'nope')).toBe(undefined)
	expect(JSONTypesValue.get(doc, 'a', 'b', 'c', 'd')).toBe(undefined)
})

/**
 * The "Type Sets and JSON" page on the site shows these; pinned here for the
 * same reason the TSDoc examples are.
 */
it('the Type Sets and JSON page examples are accurate', () => {
	testType.equal<1 extends PrimitiveTypes ? true : false, true>(true)
	testType.equal<{ a: 1 } extends PrimitiveTypes ? true : false, true>(true)

	testType.equal<{ a: 1 } extends ComposableTypes ? true : false, true>(true)
	testType.equal<(() => void) extends ComposableTypes ? true : false, true>(true)
	testType.equal<1 extends NonComposableTypes ? true : false, true>(true)
	testType.equal<symbol extends NonComposableTypes ? true : false, true>(true)

	testType.equal<UnionKeys<{ a: 1 } | { b: 2 }>, 'a' | 'b'>(true)
	testType.equal<keyof ({ a: 1 } | { b: 2 }), never>(true)
})
