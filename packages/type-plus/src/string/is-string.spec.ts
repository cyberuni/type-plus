import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsString, testType } from '../index.js'

it('returns true for string', () => {
	testType.true<IsString<string>>(true)
})

it('returns true if T is a string literal', () => {
	testType.true<IsString<''>>(true)
	testType.true<IsString<'a'>>(true)
})

it('returns false for special types', () => {
	testType.false<IsString<any>>(true)
	testType.false<IsString<unknown>>(true)
	testType.false<IsString<void>>(true)
	testType.false<IsString<never>>(true)
})

it('returns false for other types', () => {
	testType.false<IsString<undefined>>(true)
	testType.false<IsString<null>>(true)
	testType.false<IsString<boolean>>(true)
	testType.false<IsString<true>>(true)
	testType.false<IsString<false>>(true)
	testType.false<IsString<number>>(true)
	testType.false<IsString<1>>(true)
	testType.false<IsString<symbol>>(true)
	testType.false<IsString<bigint>>(true)
	testType.false<IsString<1n>>(true)
	testType.false<IsString<{}>>(true)
	testType.false<IsString<string[]>>(true)
	testType.false<IsString<[]>>(true)
	testType.false<IsString<Function>>(true)
	testType.false<IsString<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsString<string | number>, boolean>(true)
	testType.equal<IsString<'' | number>, boolean>(true)
	testType.equal<IsString<string | boolean>, boolean>(true)
})

it('returns true if T is union of string and string literal', () => {
	testType.equal<IsString<string | 'a'>, true>(true)
})

it('returns false for intersection type of non string and record', () => {
	testType.false<IsString<123 & { a: 1 }>>(true)
})

it('returns true for intersection type of string and record', () => {
	testType.true<IsString<string & { a: 1 }>>(true)
})

it('returns true for intersection type of string literal and record', () => {
	testType.true<IsString<'' & { a: 1 }>>(true)
	testType.true<IsString<'abc' & { a: 1 }>>(true)
})

it('returns true for intersection type of template literal and record', () => {
	testType.true<IsString<`a-${number}` & { a: 1 }>>(true)
})

it('works as filter', () => {
	testType.equal<IsString<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsString<'', { selection: 'filter' }>, ''>(true)

	testType.equal<IsString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsString<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsString<string | number, { selection: 'filter' }>, string>(true)
	testType.equal<IsString<string | boolean, { selection: 'filter' }>, string>(true)

	testType.equal<IsString<'' | 1, { selection: 'filter' }>, ''>(true)
})

it('works with unique branches', () => {
	testType.equal<IsString<string, IsString.$Branch>, $Then>(true)
	testType.equal<IsString<'a', IsString.$Branch>, $Then>(true)
	testType.equal<IsString<'a', { $then: String; $else: never }>, String>(true)

	testType.equal<IsString<bigint, IsString.$Branch>, $Else>(true)
	testType.equal<IsString<any, IsString.$Branch>, $Else>(true)
	testType.equal<IsString<unknown, IsString.$Branch>, $Else>(true)
	testType.equal<IsString<never, IsString.$Branch>, $Else>(true)
	testType.equal<IsString<void, IsString.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsString<any>, false>(true)
	testType.equal<IsString<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsString<unknown>, false>(true)
	testType.equal<IsString<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsString<never>, false>(true)
	testType.equal<IsString<never, { $never: unknown }>, unknown>(true)
})

describe('disable distribution', () => {
	it('returns true for string', () => {
		testType.true<IsString<string, { distributive: false }>>(true)
	})

	it('returns true if T is a string literal', () => {
		testType.true<IsString<'', { distributive: false }>>(true)
		testType.true<IsString<'a', { distributive: false }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsString<any, { distributive: false }>>(true)
		testType.false<IsString<unknown, { distributive: false }>>(true)
		testType.false<IsString<void, { distributive: false }>>(true)
		testType.false<IsString<never, { distributive: false }>>(true)
	})

	it('returns false for other types', () => {
		testType.false<IsString<undefined, { distributive: false }>>(true)
		testType.false<IsString<null, { distributive: false }>>(true)
		testType.false<IsString<boolean, { distributive: false }>>(true)
		testType.false<IsString<true, { distributive: false }>>(true)
		testType.false<IsString<false, { distributive: false }>>(true)
		testType.false<IsString<number, { distributive: false }>>(true)
		testType.false<IsString<1, { distributive: false }>>(true)
		testType.false<IsString<symbol, { distributive: false }>>(true)
		testType.false<IsString<bigint, { distributive: false }>>(true)
		testType.false<IsString<1n, { distributive: false }>>(true)
		testType.false<IsString<{}, { distributive: false }>>(true)
		testType.false<IsString<string[], { distributive: false }>>(true)
		testType.false<IsString<[], { distributive: false }>>(true)
		testType.false<IsString<Function, { distributive: false }>>(true)
		testType.false<IsString<() => void, { distributive: false }>>(true)
	})

	it('can disable union distribution', () => {
		testType.equal<IsString<string | number, { distributive: false }>, false>(true)
		testType.equal<IsString<'' | number, { distributive: false }>, false>(true)
	})

	it('returns false for intersection type of non string and record', () => {
		testType.false<IsString<123 & { a: 1 }, { distributive: false }>>(true)
	})

	it('returns true for intersection type of string and record', () => {
		testType.true<IsString<string & { a: 1 }, { distributive: false }>>(true)
	})

	it('returns true for intersection type of string literal and record', () => {
		testType.true<IsString<'' & { a: 1 }, { distributive: false }>>(true)
		testType.true<IsString<'abc' & { a: 1 }, { distributive: false }>>(true)
	})

	it('returns true for intersection type of template literal and record', () => {
		testType.true<IsString<`a-${number}` & { a: 1 }, { distributive: false }>>(true)
	})
})

describe('exact mode', () => {
	it('returns true for string', () => {
		testType.true<IsString<string, { exact: true }>>(true)
	})

	it('returns false if T is a string literal', () => {
		testType.false<IsString<'', { exact: true }>>(true)
		testType.false<IsString<'a', { exact: true }>>(true)
	})

	it('returns false for special types', () => {
		testType.false<IsString<any, { exact: true }>>(true)
		testType.false<IsString<unknown, { exact: true }>>(true)
		testType.false<IsString<void, { exact: true }>>(true)
		testType.false<IsString<never, { exact: true }>>(true)
	})

	it('returns false for other types', () => {
		testType.false<IsString<undefined, { exact: true }>>(true)
		testType.false<IsString<null, { exact: true }>>(true)
		testType.false<IsString<boolean, { exact: true }>>(true)
		testType.false<IsString<true, { exact: true }>>(true)
		testType.false<IsString<false, { exact: true }>>(true)
		testType.false<IsString<number, { exact: true }>>(true)
		testType.false<IsString<1, { exact: true }>>(true)
		testType.false<IsString<symbol, { exact: true }>>(true)
		testType.false<IsString<bigint, { exact: true }>>(true)
		testType.false<IsString<1n, { exact: true }>>(true)
		testType.false<IsString<{}, { exact: true }>>(true)
		testType.false<IsString<string[], { exact: true }>>(true)
		testType.false<IsString<[], { exact: true }>>(true)
		testType.false<IsString<Function, { exact: true }>>(true)
		testType.false<IsString<() => void, { exact: true }>>(true)
	})

	it('distributes over union type', () => {
		// `string | 'abc'` is pre-resolved by TypeScript to `string`
		testType.equal<string | 'abc', string>(true)
		testType.equal<IsString<string | 'abc', { exact: true }>, true>(true)
		testType.equal<IsString<string | number, { exact: true }>, boolean>(true)
	})

	it('returns false for intersection type of non string and record', () => {
		testType.false<IsString<123 & { a: 1 }, { exact: true }>>(true)
	})

	it('returns true for intersection type of string and record', () => {
		testType.true<IsString<string & { a: 1 }, { exact: true }>>(true)
	})

	it('returns false for intersection type of string literal and record', () => {
		testType.false<IsString<'' & { a: 1 }, { exact: true }>>(true)
		testType.false<IsString<'abc' & { a: 1 }, { exact: true }>>(true)
	})

	it('returns false for intersection type of template literal and record', () => {
		testType.false<IsString<`a-${number}` & { a: 1 }, { exact: true }>>(true)
	})

	it('works as filter', () => {
		testType.equal<IsString<string, { selection: 'filter'; exact: true }>, string>(true)
		testType.equal<IsString<'', { selection: 'filter'; exact: true }>, never>(true)

		testType.equal<IsString<never, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsString<unknown, { selection: 'filter'; exact: true }>, never>(true)
		testType.equal<IsString<string | number, { selection: 'filter'; exact: true }>, string>(true)
		testType.equal<IsString<string | number, { selection: 'filter'; exact: true; distributive: false }>, never>(true)
		testType.equal<IsString<'' | true, { selection: 'filter'; exact: true }>, never>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsString<string, IsString.$Branch & { exact: true }>, $Then>(true)
		testType.equal<IsString<'', IsString.$Branch & { exact: true }>, $Else>(true)

		testType.equal<IsString<any, IsString.$Branch & { exact: true }>, $Else>(true)
		testType.equal<IsString<unknown, IsString.$Branch & { exact: true }>, $Else>(true)
		testType.equal<IsString<never, IsString.$Branch & { exact: true }>, $Else>(true)
		testType.equal<IsString<void, IsString.$Branch & { exact: true }>, $Else>(true)
	})

	it('can override $any branch', () => {
		testType.equal<IsString<any, { exact: true }>, false>(true)
		testType.equal<IsString<any, { $any: unknown; exact: true }>, unknown>(true)
	})

	it('can override $unknown branch', () => {
		testType.equal<IsString<unknown, { exact: true }>, false>(true)
		testType.equal<IsString<unknown, { $unknown: unknown; exact: true }>, unknown>(true)
	})

	it('can override $never branch', () => {
		testType.equal<IsString<never, { exact: true }>, false>(true)
		testType.equal<IsString<never, { $never: unknown; exact: true }>, unknown>(true)
	})

	describe('disable distributive', () => {
		it('returns true for string', () => {
			testType.true<IsString<string, { distributive: false; exact: true }>>(true)
		})

		it('returns false if T is a string literal', () => {
			testType.false<IsString<'', { distributive: false; exact: true }>>(true)
			testType.false<IsString<'a', { distributive: false; exact: true }>>(true)
		})

		it('returns false for special types', () => {
			testType.false<IsString<any, { distributive: false; exact: true }>>(true)
			testType.false<IsString<unknown, { distributive: false; exact: true }>>(true)
			testType.false<IsString<void, { distributive: false; exact: true }>>(true)
			testType.false<IsString<never, { distributive: false; exact: true }>>(true)
		})

		it('returns false for other types', () => {
			testType.false<IsString<undefined, { distributive: false; exact: true }>>(true)
			testType.false<IsString<null, { distributive: false; exact: true }>>(true)
			testType.false<IsString<boolean, { distributive: false; exact: true }>>(true)
			testType.false<IsString<true, { distributive: false; exact: true }>>(true)
			testType.false<IsString<false, { distributive: false; exact: true }>>(true)
			testType.false<IsString<number, { distributive: false; exact: true }>>(true)
			testType.false<IsString<1, { distributive: false; exact: true }>>(true)
			testType.false<IsString<symbol, { distributive: false; exact: true }>>(true)
			testType.false<IsString<bigint, { distributive: false; exact: true }>>(true)
			testType.false<IsString<1n, { distributive: false; exact: true }>>(true)
			testType.false<IsString<{}, { distributive: false; exact: true }>>(true)
			testType.false<IsString<string[], { distributive: false; exact: true }>>(true)
			testType.false<IsString<[], { distributive: false; exact: true }>>(true)
			testType.false<IsString<Function, { distributive: false; exact: true }>>(true)
			testType.false<IsString<() => void, { distributive: false; exact: true }>>(true)
		})

		it('distributes over union type', () => {
			// `string | 'abc'` is pre-resolved by TypeScript to `string`
			testType.equal<string | 'abc', string>(true)
			testType.equal<IsString<string | 'abc', { distributive: false; exact: true }>, true>(true)
			testType.equal<IsString<string | number, { distributive: false; exact: true }>, false>(true)
		})

		it('returns false for intersection type of non string and record', () => {
			testType.false<IsString<123 & { a: 1 }, { distributive: false; exact: true }>>(true)
		})

		it('returns true for intersection type of string and record', () => {
			testType.true<IsString<string & { a: 1 }, { distributive: false; exact: true }>>(true)
		})

		it('returns false for intersection type of string literal and record', () => {
			testType.false<IsString<'' & { a: 1 }, { distributive: false; exact: true }>>(true)
			testType.false<IsString<'abc' & { a: 1 }, { distributive: false; exact: true }>>(true)
		})

		it('returns false for intersection type of template literal and record', () => {
			testType.false<IsString<`a-${number}` & { a: 1 }, { distributive: false; exact: true }>>(true)
		})

		it('works as filter', () => {
			testType.equal<IsString<string, { selection: 'filter'; distributive: false; exact: true }>, string>(true)
			testType.equal<IsString<'', { selection: 'filter'; distributive: false; exact: true }>, never>(true)

			testType.equal<IsString<never, { selection: 'filter'; distributive: false; exact: true }>, never>(true)
			testType.equal<IsString<unknown, { selection: 'filter'; distributive: false; exact: true }>, never>(true)
			testType.equal<IsString<string | number, { selection: 'filter'; distributive: false; exact: true }>, never>(true)
			testType.equal<IsString<'' | true, { selection: 'filter'; distributive: false; exact: true }>, never>(true)
		})

		it('works with unique branches', () => {
			testType.equal<IsString<string, IsString.$Branch & { distributive: false; exact: true }>, $Then>(true)
			testType.equal<IsString<'', IsString.$Branch & { distributive: false; exact: true }>, $Else>(true)

			testType.equal<IsString<any, IsString.$Branch & { distributive: false; exact: true }>, $Else>(true)
			testType.equal<IsString<unknown, IsString.$Branch & { distributive: false; exact: true }>, $Else>(true)
			testType.equal<IsString<never, IsString.$Branch & { distributive: false; exact: true }>, $Else>(true)
			testType.equal<IsString<void, IsString.$Branch & { distributive: false; exact: true }>, $Else>(true)
		})

		it('can override $any branch', () => {
			testType.equal<IsString<any, { distributive: false; exact: true }>, false>(true)
			testType.equal<IsString<any, { $any: unknown; distributive: false; exact: true }>, unknown>(true)
		})

		it('can override $unknown branch', () => {
			testType.equal<IsString<unknown, { distributive: false; exact: true }>, false>(true)
			testType.equal<IsString<unknown, { $unknown: unknown; distributive: false; exact: true }>, unknown>(true)
		})

		it('can override $never branch', () => {
			testType.equal<IsString<never, { distributive: false; exact: true }>, false>(true)
			testType.equal<IsString<never, { $never: unknown; distributive: false; exact: true }>, unknown>(true)
		})
	})
})

describe('without options', () => {
	// Without options the type takes a shortcut past the options machinery.
	// `{ selection: 'predicate' }` is the default spelled out, which takes the full path.
	it('equals the full path with default options', () => {
		testType.equal<IsString<any>, IsString<any, { selection: 'predicate' }>>(true)
		testType.equal<IsString<unknown>, IsString<unknown, { selection: 'predicate' }>>(true)
		testType.equal<IsString<never>, IsString<never, { selection: 'predicate' }>>(true)
		testType.equal<IsString<void>, IsString<void, { selection: 'predicate' }>>(true)
		testType.equal<IsString<{}>, IsString<{}, { selection: 'predicate' }>>(true)
		testType.equal<IsString<object>, IsString<object, { selection: 'predicate' }>>(true)
		testType.equal<IsString<undefined>, IsString<undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsString<null>, IsString<null, { selection: 'predicate' }>>(true)
		testType.equal<IsString<{} | null | undefined>, IsString<{} | null | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsString<string>, IsString<string, { selection: 'predicate' }>>(true)
		testType.equal<IsString<'a'>, IsString<'a', { selection: 'predicate' }>>(true)
		testType.equal<IsString<1>, IsString<1, { selection: 'predicate' }>>(true)
		testType.equal<IsString<{ a: 1 }>, IsString<{ a: 1 }, { selection: 'predicate' }>>(true)
		testType.equal<IsString<() => void>, IsString<() => void, { selection: 'predicate' }>>(true)
		testType.equal<IsString<string[]>, IsString<string[], { selection: 'predicate' }>>(true)
		testType.equal<IsString<{} | 1>, IsString<{} | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsString<string | 1>, IsString<string | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsString<object | undefined>, IsString<object | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsString<void | undefined>, IsString<void | undefined, { selection: 'predicate' }>>(true)
		testType.equal<IsString<never | 1>, IsString<never | 1, { selection: 'predicate' }>>(true)
		testType.equal<IsString<unknown | 1>, IsString<unknown | 1, { selection: 'predicate' }>>(true)
	})
})

describe('IsString.$Fn', () => {
	it('is IsString as a type function', () => {
		testType.equal<$Fn.Apply<IsString.$Fn, 'a'>, true>(true)
		testType.equal<$Fn.Apply<IsString.$Fn, 1>, false>(true)
	})
})

it('resolves `IsString.$Default` the same as no options', () => {
	// `IsString.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsString<any, IsString.$Default>, IsString<any>>(true)
	testType.equal<IsString<unknown, IsString.$Default>, IsString<unknown>>(true)
	testType.equal<IsString<never, IsString.$Default>, IsString<never>>(true)
	testType.equal<IsString<void, IsString.$Default>, IsString<void>>(true)
	testType.equal<IsString<undefined, IsString.$Default>, IsString<undefined>>(true)
	testType.equal<IsString<null, IsString.$Default>, IsString<null>>(true)
	testType.equal<IsString<boolean, IsString.$Default>, IsString<boolean>>(true)
	testType.equal<IsString<true, IsString.$Default>, IsString<true>>(true)
	testType.equal<IsString<1, IsString.$Default>, IsString<1>>(true)
	testType.equal<IsString<number, IsString.$Default>, IsString<number>>(true)
	testType.equal<IsString<'a', IsString.$Default>, IsString<'a'>>(true)
	testType.equal<IsString<string, IsString.$Default>, IsString<string>>(true)
	testType.equal<IsString<symbol, IsString.$Default>, IsString<symbol>>(true)
	testType.equal<IsString<1n, IsString.$Default>, IsString<1n>>(true)
	testType.equal<IsString<{}, IsString.$Default>, IsString<{}>>(true)
	testType.equal<IsString<[], IsString.$Default>, IsString<[]>>(true)
	testType.equal<IsString<() => void, IsString.$Default>, IsString<() => void>>(true)
	testType.equal<IsString<1 | string, IsString.$Default>, IsString<1 | string>>(true)
})
