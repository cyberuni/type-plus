import { describe } from 'node:test'
import { it } from 'vitest'
import { testType } from '../testing/index.js'
import type { Properties } from './properties.js'

it('returns never for non object types except unknown and any', () => {
	testType.equal<Properties<undefined>, undefined>(true)
	testType.equal<Properties<null>, null>(true)
	testType.equal<Properties<void>, void>(true)
	testType.equal<Properties<never>, never>(true)
	testType.equal<Properties<number>, number>(true)
	testType.equal<Properties<boolean>, boolean>(true)
	testType.equal<Properties<true>, true>(true)
	testType.equal<Properties<false>, false>(true)
	testType.equal<Properties<string>, string>(true)
	testType.equal<Properties<''>, ''>(true)
	testType.equal<Properties<bigint>, bigint>(true)
	testType.equal<Properties<symbol>, symbol>(true)
	testType.equal<Properties<any>, any>(true)
	testType.equal<Properties<unknown>, unknown>(true)
})

it('returns the properties of an object type', () => {
	type T = { a: number; b: string }
	testType.equal<Properties<T>, { a: number; b: string }>(true)
})

it('returns the properties of an object type with optional properties', () => {
	type T = { a: number; b?: string }
	testType.equal<Properties<T>, { a: number; b?: string }>(true)
})

it('returns the properties of an object type with readonly properties', () => {
	type T = { readonly a: number; readonly b: string | undefined }
	testType.equal<Properties<T>, { readonly a: number; readonly b: string | undefined }>(true)
})

it('returns the properties of an object type with readonly optional properties', () => {
	type T = { readonly a: number; readonly b?: string | undefined }
	testType.equal<Properties<T>, { readonly a: number; readonly b?: string | undefined }>(true)
})

it('returns the function methods', () => {
	type R = Properties<Function>

	// and others, just use one as an example
	testType.equal<R['apply'], (this: Function, thisArg: any, argArray?: any) => any>(true)
})

it('returns {} for actual function types', () => {
	// @TODO: reason this
	// this looks "wrong", but the reason is clear:
	// the function type does not describe the extra properties from the Function prototype
	testType.equal<Properties<() => void>, {}>(true)
})

it('skips function signatures from object', () => {
	// this is because the function signatures are not indexable.
	// biome-ignore lint/style/useShorthandFunctionType: on purpose
	testType.equal<Properties<{ (): void }>, {}>(true)
	testType.equal<Properties<{ (): void; a: 1 }>, { a: 1 }>(true)
})

it('returns the properties of classes, including methods', () => {
	class Foo {
		f = 1
		foo() {}
	}
	class Boo extends Foo {
		b = 2
		boo() {}
	}

	testType.equal<Properties<Foo>, { f: number; foo(): void }>(true)
	testType.equal<Properties<Boo>, { f: number; b: number; boo(): void; foo(): void }>(true)
})

describe('intersection', () => {
	it('combines properties of disjoint types', () => {
		type T = { a: number }
		type U = { c: boolean }
		testType.equal<Properties<T & U>, { a: number; c: boolean }>(true)
	})
	it('combines properties of overlapping types', () => {
		type T = { a: number; b: string }
		type U = { a: number; c: boolean }
		testType.equal<Properties<T & U>, { a: number; b: string; c: boolean }>(true)
	})
	it('combines properties of overlapping types with optional properties', () => {
		type T = { a: number; b?: string }
		type U = { a: number; c?: boolean }
		testType.equal<Properties<T & U>, { a: number; b?: string; c?: boolean }>(true)
	})
	it('combines properties of overlapping types with different property types', () => {
		type T = { a: number; b: string }
		type U = { a: number | string; c: boolean }
		testType.equal<Properties<T & U>, { a: number; b: string; c: boolean }>(true)
	})
})
