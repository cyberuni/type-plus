/**
 * Pins the `@example` blocks in the `src/object/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/object/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { expect, it } from 'vitest'

import {
	type $Else,
	type $Then,
	type ANotB,
	type AnyRecord,
	type BNotA,
	type Except,
	everyKey,
	filterKey,
	findKey,
	forEachKey,
	getField,
	type HasKey,
	hasKey,
	hasProperty,
	type IsNotObject,
	type IsObject,
	type IsRecord,
	type KeysOfOptional,
	type KeysWithDiffType,
	type KnownKeys,
	type LeftJoin,
	mapKey,
	type ObjectPlus,
	omit,
	type PartialExcept,
	type Properties,
	pick,
	type RecursiveRequired,
	type ReplaceProperty,
	type Required,
	type RequiredExcept,
	type RequiredKeys,
	type RequiredPick,
	record,
	reduceByKey,
	replaceProperty,
	type Split,
	type SpreadRecord,
	someKey,
	testType,
	typeOverrideIncompatible,
	type ValueOf,
} from '../index.js'

it('IsObject examples in TSDoc are accurate', () => {
	testType.equal<IsObject<object>, true>(true)
	testType.equal<IsObject<{}>, true>(true)
	testType.equal<IsObject<{ a: 1 }>, true>(true)
	testType.equal<IsObject<Function>, true>(true)
	testType.equal<IsObject<never>, false>(true)
	testType.equal<IsObject<unknown>, false>(true)
	testType.equal<IsObject<number>, false>(true)
	testType.equal<IsObject<{} | bigint>, boolean>(true)
	testType.equal<IsObject<{}, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsObject<Function, { selection: 'filter' }>, Function>(true)
	testType.equal<IsObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<{} | bigint, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<object, { exact: true }>, true>(true)
	testType.equal<IsObject<{}, { exact: true }>, false>(true)
	testType.equal<IsObject<{} | 1>, boolean>(true)
	testType.equal<IsObject<{} | 1, { distributive: false }>, false>(true)
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<string, IsObject.$Branch>, $Else>(true)
})

it('IsNotObject examples in TSDoc are accurate', () => {
	testType.equal<IsNotObject<{}>, false>(true)
	testType.equal<IsNotObject<{ a: 1 }>, false>(true)
	testType.equal<IsNotObject<Function>, false>(true)
	testType.equal<IsNotObject<number>, true>(true)
	testType.equal<IsNotObject<object>, false>(true)
	testType.equal<IsNotObject<never>, true>(true)
	testType.equal<IsNotObject<unknown>, true>(true)
	testType.equal<IsNotObject<{} | bigint>, boolean>(true)
	testType.equal<IsNotObject<{}, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<{ a: 1 }, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<Function, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotObject<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotObject<{} | bigint, { selection: 'filter' }>, bigint>(true)
	testType.equal<IsNotObject<object, { exact: true }>, false>(true)
	testType.equal<IsNotObject<{}, { exact: true }>, true>(true)
	testType.equal<IsNotObject<{} | 1>, boolean>(true)
	testType.equal<IsNotObject<{} | 1, { distributive: false }>, true>(true)
	testType.equal<IsNotObject<{}, IsNotObject.$Branch>, $Else>(true)
	testType.equal<IsNotObject<string, IsNotObject.$Branch>, $Then>(true)
})

it('Properties examples in TSDoc are accurate', () => {
	type T = { a: number; b?: string }
	testType.equal<Properties<T>, { a: number; b?: string }>(true)
	testType.equal<Properties<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>(true)
})

it('ANotB and BNotA examples in TSDoc are accurate', () => {
	type A = { a: number; b: string }
	type B = { a: number; b: number; c: boolean }
	testType.equal<ANotB<A, B>, { b: string }>(true)
	testType.equal<ANotB<A, A>, never>(true)
	testType.equal<ANotB<{ a: 1 }, { b: 2 }>, { a: 1 }>(true)
	testType.equal<BNotA<A, B>, { b: number; c: boolean }>(true)
})

it('AnyRecord examples in TSDoc are accurate', () => {
	testType.equal<AnyRecord, { [x: string]: any; [x: number]: any; [x: symbol]: any }>(true)
})

it('IsRecord examples in TSDoc are accurate', () => {
	testType.equal<IsRecord<{ a: 1 }>, true>(true)
	testType.equal<IsRecord<Record<string, number>>, true>(true)
	testType.equal<IsRecord<number[]>, false>(true)
	testType.equal<IsRecord<string>, false>(true)
})

it('ValueOf examples in TSDoc are accurate', () => {
	testType.equal<ValueOf<{ a: 1; b: 2 }>, 1 | 2>(true)
	testType.equal<ValueOf<{ a: number; b: string }>, number | string>(true)
	testType.equal<ValueOf<Record<string, boolean>>, boolean>(true)
})

it('KeysOfOptional examples in TSDoc are accurate', () => {
	testType.equal<KeysOfOptional<{ a: 1; b: 2 }>, 'a' | 'b'>(true)
	testType.equal<KeysOfOptional<Record<'x' | 'y', number>>, 'x' | 'y'>(true)
	// the name says otherwise: one optional property collapses the inference
	testType.equal<KeysOfOptional<{ a?: 1; b: 2 }>, never>(true)
})

it('KeysWithDiffType examples in TSDoc are accurate', () => {
	type A = { a: number; b: string }
	type B = { a: number; b: number; c: boolean }
	testType.equal<KeysWithDiffType<A, B>, 'b'>(true)
	// the comparison runs one way only
	testType.equal<KeysWithDiffType<{ a: 1 }, { a: number }>, never>(true)
	testType.equal<KeysWithDiffType<{ a: number }, { a: 1 }>, 'a'>(true)
	testType.equal<KeysWithDiffType<{ a: 1 }, { a: 1 }>, never>(true)
	testType.equal<KeysWithDiffType<{ a: 1 }, { b: 2 }>, never>(true)
})

it('KnownKeys examples in TSDoc are accurate', () => {
	// `never` for every input -- the type no longer does what its name says.
	// Pinned to the actual behavior; see the TSDoc note on `KnownKeys`.
	testType.equal<KnownKeys<{ a: 1; b: 2 }>, never>(true)
	testType.equal<KnownKeys<{ a?: boolean; [k: string]: any }>, never>(true)
	testType.equal<KnownKeys<string>, never>(true)
})

it('RecursiveRequired examples in TSDoc are accurate', () => {
	testType.equal<RecursiveRequired<{ a: { b?: number } }>, { a: { b: number } }>(true)
	testType.equal<RecursiveRequired<{ a: Array<{ b?: number }> }>, { a: Array<{ b: number }> }>(true)
	// the descent stops at an optional property; see the TSDoc note
	testType.equal<RecursiveRequired<{ a?: { b?: number } }>, { a: { b?: number } }>(true)
})

it('Required, RequiredPick and RequiredExcept examples in TSDoc are accurate', () => {
	testType.equal<Required<{ a?: number; b: string | undefined }>, { a: number; b: string }>(true)
	testType.equal<RequiredPick<{ a?: 1; b?: 2 }, 'a'>, { a: 1; b?: 2 }>(true)
	testType.equal<RequiredExcept<{ a?: 1; b?: 2 }, 'a'>, { b: 2; a?: 1 }>(true)
})

it('RequiredKeys examples in TSDoc are accurate', () => {
	testType.equal<RequiredKeys<{ a: 1; b?: 2 }>, 'a'>(true)
	testType.equal<RequiredKeys<{ a: 1 } | { b: 2; c?: 3 }>, 'a' | 'b'>(true)
})

it('SpreadRecord examples in TSDoc are accurate', () => {
	testType.equal<
		SpreadRecord<{ a: number; b: string }, { b: boolean; c: number }>,
		{ a: number; b: boolean; c: number }
	>(true)
})

it('LeftJoin examples in TSDoc are accurate', () => {
	testType.equal<LeftJoin<{ a: number; b: string }, { b: number; c: boolean }>, { a: number; b: number; c: boolean }>(
		true,
	)
	testType.equal<LeftJoin<{ a: 1 }, { a: 1 }>, { a: 1 }>(true)
	testType.equal<LeftJoin<{ a: 1 }, { b: 2 }>, { a: 1 } & { b: 2 }>(true)
})

it('ReplaceProperty examples in TSDoc are accurate', () => {
	testType.equal<ReplaceProperty<{ a: number; b: string }, 'a', boolean>, { b: string; a: boolean }>(true)
})

it('HasKey examples in TSDoc are accurate', () => {
	testType.equal<HasKey<{ a: 1 }, 'a'>, true>(true)
	testType.equal<HasKey<{ a: 1 }, 'b'>, false>(true)
	testType.equal<HasKey<{ a: 1 }, 'b', 'yes', 'no'>, 'no'>(true)
})

it('Split examples in TSDoc are accurate', () => {
	testType.equal<Split<{ a: number; b: string }, { a: undefined }>, { a: number }>(true)
	testType.equal<Split<{ a?: number; b: string }, { a: 1 }>, { a: number }>(true)
})

it('Except examples in TSDoc are accurate', () => {
	testType.equal<Except<{ a: 1; b: 2; c: 3 }, 'b'>, { a: 1; c: 3 }>(true)
})

it('PartialExcept examples in TSDoc are accurate', () => {
	testType.equal<PartialExcept<{ a: 1; b: 2; c: 3 }, 'a'>, { a: 1; b?: 2 | undefined; c?: 3 | undefined }>(true)
})

it('ObjectPlus.Merge example in TSDoc is accurate', () => {
	testType.equal<ObjectPlus.Merge<{ a: number; b: string }, { b: boolean }>, { a: number; b: boolean }>(true)
})

it('omit examples in TSDoc are accurate', () => {
	const r = omit({ a: 1, b: 'x', c: true }, 'b')
	expect(r).toEqual({ a: 1, c: true })
	testType.equal<typeof r, { a: number; c: boolean }>(true)

	expect(omit({ a: 1, b: 2, c: 3 }, 'a', 'b')).toEqual({ c: 3 })

	// the prototype claim in the TSDoc
	expect(Object.getPrototypeOf(omit(record<'a' | 'b', number>({ a: 1, b: 2 }), 'a'))).toBe(null)
	expect(Object.getPrototypeOf(omit({ a: 1, b: 2 }, 'a'))).toBe(Object.prototype)
})

it('pick examples in TSDoc are accurate', () => {
	const r = pick({ a: 1, b: 'x', c: true }, 'a', 'c')
	expect(r).toEqual({ a: 1, c: true })
	testType.equal<typeof r, { a: number; c: boolean }>(true)

	expect(Object.getPrototypeOf(pick(record<'a' | 'b', number>({ a: 1, b: 2 }), 'a'))).toBe(null)
	expect(Object.getPrototypeOf(pick({ a: 1, b: 2 }, 'a'))).toBe(Object.prototype)
})

it('getField examples in TSDoc are accurate', () => {
	const o = { a: 1 } as { a: number } | undefined

	const r = getField(o, 'a')
	expect(r).toBe(1)
	testType.equal<typeof r, number>(true)

	expect(getField(undefined as typeof o, 'a')).toBe(undefined)

	// the default's own literal type wins, and the check is truthiness
	const d = getField(o, 'a', 5)
	expect(d).toBe(1)
	testType.equal<typeof d, 5>(true)
	expect(getField({ a: 0 } as { a: number }, 'a', 5)).toBe(5)
})

it('hasKey examples in TSDoc are accurate', () => {
	const yes = hasKey({ a: 1 }, 'a')
	expect(yes).toBe(true)
	testType.equal<typeof yes, true>(true)

	// the documented runtime/type disagreement: truthiness, not `in`
	const falsy = hasKey({ a: 0 }, 'a')
	expect(falsy).toBe(false)
	testType.equal<typeof falsy, true>(true)
})

it('hasProperty examples in TSDoc are accurate', () => {
	const v = { a: 1 } as { a: number } | { b: string }
	if (hasProperty(v, 'a')) {
		// `T[P]` on a union is `unknown`, so the guard does not recover the
		// member's own property type; see the TSDoc note on `hasProperty`.
		testType.equal<typeof v.a, unknown>(true)
	} else {
		expect.unreachable()
	}

	expect(hasProperty({ a: 0 }, 'a')).toBe(false)
})

it('replaceProperty examples in TSDoc are accurate', () => {
	const r = replaceProperty({ a: 1, b: 'x' }, 'a', 'z')
	expect(r).toEqual({ a: 'z', b: 'x' })
	testType.equal<typeof r, { b: string; a: string }>(true)
})

it('key iteration examples in TSDoc are accurate', () => {
	expect(everyKey({ a: 1, b: 2 }, (k) => typeof k === 'string')).toBe(true)
	expect(everyKey({ a: 1, b: 2 }, (k) => k === 'a')).toBe(false)

	expect(someKey({ a: 1, b: 2 }, (k) => k === 'b')).toBe(true)
	expect(someKey({ a: 1, b: 2 }, (k, _i, _a, s) => s[k] > 5)).toBe(false)

	const filtered = filterKey({ a: 1, b: 2 }, (k) => k === 'a')
	expect(filtered).toEqual(['a'])
	testType.equal<typeof filtered, Array<'a' | 'b'>>(true)

	const found = findKey({ a: 1, b: 2 }, (k) => k === 'b')
	expect(found).toBe('b')
	testType.equal<typeof found, 'a' | 'b' | undefined>(true)
	expect(findKey({ a: 1 }, () => false)).toBe(undefined)

	const seen: string[] = []
	forEachKey({ a: 1, b: 2 }, (k) => {
		seen.push(String(k))
	})
	expect(seen).toEqual(['a', 'b'])

	expect(mapKey({ a: 1, b: 2 }, (k, i) => `${String(k)}${i}`)).toEqual(['a0', 'b1'])
	expect(mapKey({ a: 1, b: 2 }, (k, _i, _a, s) => s[k])).toEqual([1, 2])

	expect(reduceByKey({ a: 1, b: 2 }, (acc, k) => acc + String(k), '')).toBe('ab')
	expect(reduceByKey({ a: 1, b: 2 }, (acc, k, _i, _a, s) => acc + s[k], 0)).toBe(3)
})

it('typeOverrideIncompatible example in TSDoc is accurate', () => {
	const toTarget = typeOverrideIncompatible<{ a: number; b: string }>()

	const r = toTarget({ a: 1, b: 2 }, { b: 'x' })
	expect(r).toEqual({ a: 1, b: 'x' })
	testType.equal<typeof r, { a: number; b: string }>(true)
})
