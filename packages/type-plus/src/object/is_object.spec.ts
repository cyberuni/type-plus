import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsObject, type TuplePlus, testType } from '../index.js'

it('returns true if T is object', () => {
	testType.true<IsObject<object>>(true)
})

it('returns true if T is object literal', () => {
	testType.true<IsObject<{}>>(true)
	testType.true<IsObject<{ a: 1 }>>(true)
})

it('returns true if T is function as function is a subtype of object', () => {
	testType.true<IsObject<Function>>(true)
	testType.true<IsObject<() => void>>(true)
})

it('returns true if T is array or tuple', () => {
	testType.true<IsObject<string[]>>(true)
	testType.true<IsObject<[]>>(true)
	testType.true<IsObject<[1, 2]>>(true)
})

it('returns false for special types', () => {
	testType.false<IsObject<void>>(true)
	testType.false<IsObject<unknown>>(true)
	testType.false<IsObject<any>>(true)
	testType.false<IsObject<never>>(true)
})

it('returns false for all other types', () => {
	testType.false<IsObject<undefined>>(true)
	testType.false<IsObject<null>>(true)
	testType.false<IsObject<boolean>>(true)
	testType.false<IsObject<true>>(true)
	testType.false<IsObject<false>>(true)
	testType.false<IsObject<number>>(true)
	testType.false<IsObject<1>>(true)
	testType.false<IsObject<string>>(true)
	testType.false<IsObject<''>>(true)
	testType.false<IsObject<symbol>>(true)
	testType.false<IsObject<bigint>>(true)
	testType.false<IsObject<1n>>(true)
})

it('distributes for union type', () => {
	testType.equal<IsObject<object | 1>, boolean>(true)
	testType.equal<IsObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsObject<{} | bigint>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsObject<{ a: 1 } | 1>, boolean>(true)
	testType.equal<IsObject<{ a: 1 } | 1, { distributive: false }>, false>(true)

	testType.equal<IsObject<{} | 1>, boolean>(true)
	testType.equal<IsObject<{} | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<object & [], object & []>(true)
	testType.true<IsObject<object & []>>(true)
	testType.true<IsObject<object & [], { distributive: false }>>(true)

	testType.true<IsObject<{ a: 1 } & []>>(true)
	testType.true<IsObject<{ a: 1 } & [], { distributive: false }>>(true)
})

it('works as filter', () => {
	testType.equal<IsObject<object, { selection: 'filter' }>, object>(true)
	testType.equal<IsObject<{}, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<{ a: 1 }, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsObject<Function, { selection: 'filter' }>, Function>(true)

	testType.equal<IsObject<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<1, { selection: 'filter' }>, never>(true)
	testType.equal<IsObject<object | boolean, { selection: 'filter' }>, object>(true)
	testType.equal<IsObject<{ a: 1 } | boolean, { selection: 'filter' }>, { a: 1 }>(true)
	testType.equal<IsObject<{} | bigint, { selection: 'filter' }>, {}>(true)
})

it('works with unique branches', () => {
	testType.equal<IsObject<object, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<{ a: 1 }, IsObject.$Branch>, $Then>(true)

	testType.equal<IsObject<any, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<unknown, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<never, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<void, IsObject.$Branch>, $Else>(true)
	testType.equal<IsObject<string, IsObject.$Branch>, $Else>(true)

	testType.equal<IsObject<object | 1, IsObject.$Branch>, $Then | $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsObject<any>, false>(true)
	testType.equal<IsObject<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsObject<unknown>, false>(true)
	testType.equal<IsObject<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsObject<never>, false>(true)
	testType.equal<IsObject<never, { $never: unknown }>, unknown>(true)
})

describe('exact', () => {
	it('returns true for object', () => {
		testType.equal<IsObject<object, { exact: true }>, true>(true)
	})

	it('returns false for object literal', () => {
		testType.equal<IsObject<{ a: number }, { exact: true }>, false>(true)
	})

	it('returns false for empty object literal', () => {
		testType.equal<IsObject<{}, { exact: true }>, false>(true)
	})

	it('returns false if T is array or tuple', () => {
		testType.false<IsObject<string[], { exact: true }>>(true)
		testType.false<IsObject<[], { exact: true }>>(true)
		testType.false<IsObject<[1, 2], { exact: true }>>(true)
	})

	it('returns false for function', () => {
		testType.false<IsObject<Function, { exact: true }>>(true)
	})

	it('returns false for special types', () => {
		testType.equal<IsObject<any, { exact: true }>, false>(true)
		testType.equal<IsObject<unknown, { exact: true }>, false>(true)
		testType.equal<IsObject<never, { exact: true }>, false>(true)
		testType.equal<IsObject<void, { exact: true }>, false>(true)
	})

	it('returns false for all other types', () => {
		testType.false<IsObject<undefined, { exact: true }>>(true)
		testType.false<IsObject<null, { exact: true }>>(true)
		testType.false<IsObject<boolean, { exact: true }>>(true)
		testType.false<IsObject<true, { exact: true }>>(true)
		testType.false<IsObject<false, { exact: true }>>(true)
		testType.false<IsObject<number, { exact: true }>>(true)
		testType.false<IsObject<1, { exact: true }>>(true)
		testType.false<IsObject<string, { exact: true }>>(true)
		testType.false<IsObject<'', { exact: true }>>(true)
		testType.false<IsObject<symbol, { exact: true }>>(true)
		testType.false<IsObject<bigint, { exact: true }>>(true)
		testType.false<IsObject<1n, { exact: true }>>(true)
	})

	it('distributes for union type', () => {
		testType.equal<IsObject<object | 1, { exact: true }>, boolean>(true)
		testType.equal<IsObject<object | boolean, { exact: true }>, boolean>(true)
		testType.equal<IsObject<{ a: 1 } | 1, { exact: true }>, false>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsObject<{ a: 1 } | 1, { exact: true }>, false>(true)
		testType.equal<IsObject<{ a: 1 } | 1, { distributive: false; exact: true }>, false>(true)
	})

	it('returns false for intersection type', () => {
		// `object` intersect with any non-object type always returns `never`,
		// and `object & object -> object` directly.
		// so there is no intersection type that can produce a strict object.
		testType.equal<IsObject<object & Function, { exact: true }>, false>(true)
		testType.equal<IsObject<object & Function, { distributive: false; exact: true }>, false>(true)

		testType.false<IsObject<object & [], { exact: true }>>(true)
		testType.false<IsObject<object & [], { distributive: false; exact: true }>>(true)

		testType.false<IsObject<object & { a: 1 }, { exact: true }>>(true)
		testType.false<IsObject<object & { a: 1 }, { distributive: false; exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsObject<object, { selection: 'filter'; exact: true }>, object>(true)
		testType.equal<IsObject<{ a: 1 }, { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsObject<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsObject<unknown, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsObject<object | boolean, { selection: 'filter'; exact: true }>, object>(true)
		testType.equal<IsObject<{ a: 1 } | boolean, { selection: 'filter'; exact: true }>, never>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsObject<object, IsObject.$Branch<{ exact: true }>>, $Then>(true)
		testType.equal<IsObject<{ a: 1 }, IsObject.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsObject<any, IsObject.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsObject<unknown, IsObject.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsObject<never, IsObject.$Branch<{ exact: true }>>, $Else>(true)
		testType.equal<IsObject<void, IsObject.$Branch<{ exact: true }>>, $Else>(true)

		testType.equal<IsObject<object | 1, IsObject.$Branch<{ exact: true }>>, $Then | $Else>(true)
	})
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsObject<any>, IsObject<any, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<unknown>, IsObject<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<never>, IsObject<never, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<void>, IsObject<void, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<{}>, IsObject<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<object>, IsObject<object, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<undefined>, IsObject<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<null>, IsObject<null, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<{} | null | undefined>, IsObject<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<string>, IsObject<string, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<'a'>, IsObject<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsObject<1>, IsObject<1, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<{ a: 1 }>, IsObject<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<() => void>, IsObject<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<string[]>, IsObject<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsObject<{} | 1>, IsObject<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<string | 1>, IsObject<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<object | undefined>, IsObject<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<void | undefined>, IsObject<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<never | 1>, IsObject<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsObject<unknown | 1>, IsObject<unknown | 1, { selection: 'predicate' }>>(true)
	})
})

describe('option keys', () => {
	it('accepts the known options', () => {
		testType.equal<IsObject<{}, { distributive: false; exact: true; selection: 'filter' }>, never>(true)
		testType.equal<IsObject<any, { $any: 1; $unknown: 2; $never: 3; $void: 4 }>, 1>(true)
	})

	it('rejects a misspelled key next to a valid one', () => {
		// @ts-expect-error 'exactt' is not a valid option. Did you mean 'exact'?
		testType.never<IsObject<{}, { distributive: false; exactt: true }>>(false)
		// @ts-expect-error '$thn' is not a valid option
		testType.never<IsObject<{}, { selection: 'filter'; $thn: 1 }>>(false)
	})

	it('rejects a misspelled key alone', () => {
		// @ts-expect-error 'exactt' is not a valid option. Did you mean 'exact'?
		testType.never<IsObject<{}, { exactt: true }>>(false)
	})
})

describe('IsObject.$Fn', () => {
	it('is IsObject as a type function', () => {
		testType.equal<$Fn.Apply<IsObject.$Fn, {}>, true>(true)
		testType.equal<$Fn.Apply<IsObject.$Fn, 1>, false>(true)
		testType.equal<$Fn.Apply<IsObject.$Fn, {} | 1>, boolean>(true)
	})

	it('applies the options', () => {
		testType.equal<$Fn.Apply<IsObject.$Fn<{ exact: true }>, {}>, false>(true)
		testType.equal<$Fn.Apply<IsObject.$Fn<{ exact: true }>, object>, true>(true)
		testType.equal<$Fn.Apply<IsObject.$Fn<{ selection: 'filter' }>, { a: 1 }>, { a: 1 }>(true)
	})

	it('works as the example shows', () => {
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn>, [{ a: 1 }, object]>(true)
		testType.equal<TuplePlus.Filter<[1, { a: 1 }, 'x', object], IsObject.$Fn<{ exact: true }>>, [object]>(true)
	})

	it('rejects unknown option keys', () => {
		// @ts-expect-error
		type _R = IsObject.$Fn<{ exactt: true }>
	})
})
