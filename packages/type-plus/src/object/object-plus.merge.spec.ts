import { expect, it } from 'vitest'
import { type ObjectPlus, testType } from '../index.js'

it('merges with any -> any', () => {
	testType.equal<ObjectPlus.Merge<any, any>, any>(true)
	testType.equal<ObjectPlus.Merge<{ a: 1 }, any>, any>(true)
	testType.equal<ObjectPlus.Merge<any, { a: 1 }>, any>(true)
})

it('merges with never -> never', () => {
	testType.equal<ObjectPlus.Merge<never, never>, never>(true)
	testType.equal<ObjectPlus.Merge<{ a: 1 }, never>, never>(true)
	testType.equal<ObjectPlus.Merge<never, { a: 1 }>, never>(true)
})

it('returns A if A and B are the same type', () => {
	testType.equal<ObjectPlus.Merge<{ a: 1 }, { a: 1 }>, { a: 1 }>(true)
})

it('merges disjoint types', () => {
	testType.equal<ObjectPlus.Merge<{ a: 1 }, { b: 1 }>, { a: 1; b: 1 }>(true)
})

it('drops `readonly` because spreading copies values onto a fresh object', () => {
	const a: { readonly a: 1 } = { a: 1 }
	const b: { readonly b: 2 } = { b: 2 }

	const r = { ...a, ...b }
	r.a = 1
	r.b = 2
	expect(r).toEqual({ a: 1, b: 2 })

	testType.equal<ObjectPlus.Merge<{ readonly a: 1 }, { b: 2 }>, { a: 1; b: 2 }>(true)
	testType.equal<ObjectPlus.Merge<{ a: 1 }, { readonly b: 2 }>, { a: 1; b: 2 }>(true)
	testType.equal<ObjectPlus.Merge<{ readonly a?: 1 }, { b: 2 }>, { a?: 1; b: 2 }>(true)
})

it('spreads a get accessor into a writable property', () => {
	// https://github.com/unional/type-plus/issues/598
	// a get-only accessor is a `readonly` property, so it follows the same rule
	testType.equal<{ get a(): 1 }, { readonly a: 1 }>(true)

	testType.equal<ObjectPlus.Merge<{ get a(): 1 }, { b: 2 }>, { a: 1; b: 2 }>(true)
	testType.equal<ObjectPlus.Merge<{ a: 1 }, { get b(): 2 }>, { a: 1; b: 2 }>(true)
})

it('combines type with required and optional props', () => {
	testType.equal<ObjectPlus.Merge<{ a: 1 }, { b?: 1 }>, { a: 1; b?: 1 }>(true)
	testType.equal<ObjectPlus.Merge<{ a: 1 }, { b?: 1 | undefined }>, { a: 1; b?: 1 | undefined }>(true)

	testType.equal<ObjectPlus.Merge<{ a?: 1 }, { b: 1 }>, { a?: 1; b: 1 }>(true)
	testType.equal<ObjectPlus.Merge<{ a?: 1 | undefined }, { b: 1 }>, { a?: 1 | undefined; b: 1 }>(true)

	testType.equal<ObjectPlus.Merge<{ a?: 1 }, { b?: 1 }>, { a?: 1; b?: 1 }>(true)
	testType.equal<ObjectPlus.Merge<{ a?: 1 | undefined }, { b?: 1 }>, { a?: 1 | undefined; b?: 1 }>(true)
	testType.equal<ObjectPlus.Merge<{ a?: 1 }, { b?: 1 | undefined }>, { a?: 1; b?: 1 | undefined }>(true)
	testType.equal<
		ObjectPlus.Merge<{ a?: 1 | undefined }, { b?: 1 | undefined }>,
		{ a?: 1 | undefined; b?: 1 | undefined }
	>(true)
})

it('replaces property in A with property in B', () => {
	testType.equal<
		ObjectPlus.Merge<{ type: 'a' | 'b'; value: string }, { value: number }>,
		{ type: 'a' | 'b'; value: number }
	>(true)
})

it('removes extra empty {}', () => {
	testType.equal<ObjectPlus.Merge<{ leaf: { boo(): number } }, {}>, { leaf: { boo(): number } }>(true)
})

it('overrides property in A with property in B', () => {
	const a: { leaf: { foo: 'foo' } } = { leaf: { foo: 'foo' } }
	const b: { leaf: { boo: 'boo' } } = { leaf: { boo: 'boo' } }

	expect({ ...a, ...b }).toEqual({ leaf: { boo: 'boo' } })

	testType.equal<ObjectPlus.Merge<{ leaf: { foo: 'foo' } }, { leaf: { boo: 'boo' } }>, { leaf: { boo: 'boo' } }>(true)
})

it('appends types of optional prop to required prop', () => {
	const x: { a: number } = { a: 1 }
	const y: { a?: string } = {}

	expect({ ...x, ...y }).toEqual({ a: 1 })

	testType.equal<ObjectPlus.Merge<{ a: number }, { a?: string }>, { a: number | string }>(true)

	testType.equal<ObjectPlus.Merge<{ a: number }, { a?: string | undefined }>, { a: number | string }>(true)
})

it('appends types of required prop to optional prop', () => {
	testType.equal<ObjectPlus.Merge<{ a?: string | undefined }, { a: number }>, { a: number }>(true)
})

it('combines type with required and optional props', () => {
	testType.equal<ObjectPlus.Merge<{ a: number }, { b?: string }>, { a: number; b?: string }>(true)

	type R = ObjectPlus.Merge<
		{ a: { c: number } },
		{
			a?: { d: string }
		}
	>

	testType.inspect<R>((t) => t)
	testType.equal<R['a'], { c: number } | { d: string }>(true)
})

it('merges an optional property with a required property merges the two as union', () => {
	type X = { a: { c: number } }
	type Y = { a?: { d: string } }
	const x: X = { a: { c: 1 } }
	const y1: Y = {}
	const y2: Y = { a: { d: 'd' } }
	expect({ ...x, ...y1 }).toEqual({ a: { c: 1 } })
	testType.canAssign<{ a: { c: number } }, ObjectPlus.Merge<X, Y>>(true)

	expect({ ...x, ...y2 }).toEqual({ a: { d: 'd' } })
	testType.canAssign<{ a: { d: string } }, ObjectPlus.Merge<X, Y>>(true)

	testType.equal<ObjectPlus.Merge<X, Y>, { a: { c: number } | { d: string } }>(true)
})

it('merges two optional properties', () => {
	testType.equal<ObjectPlus.Merge<{ a?: number }, { a?: string }>, { a?: number | string }>(true)
	testType.equal<ObjectPlus.Merge<{ a?: number | undefined }, { a?: string }>, { a?: number | string | undefined }>(
		true,
	)
	testType.equal<ObjectPlus.Merge<{ a?: number }, { a?: string | undefined }>, { a?: number | string | undefined }>(
		true,
	)
	testType.equal<
		ObjectPlus.Merge<{ a?: number | undefined }, { a?: string | undefined }>,
		{ a?: number | string | undefined }
	>(true)
})

it('spread across unions', () => {
	testType.equal<ObjectPlus.Merge<{ a: 1 } | { b: 2 }, { c: 3 }>, { a: 1; c: 3 } | { b: 2; c: 3 }>(true)
	testType.equal<ObjectPlus.Merge<{ c: 3 }, { a: 1 } | { b: 2 }>, { a: 1; c: 3 } | { b: 2; c: 3 }>(true)

	// TODO: currently the merge is not distributive
	// testType.equal<ObjectPlus.Merge<
	// 	{ a?: string | undefined } | { b: 2 }, { a: number }>,
	// 	{ a: number } | { a: number, b: 2 }
	// >(true)
})
