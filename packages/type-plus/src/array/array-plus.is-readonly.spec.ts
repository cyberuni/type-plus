import { describe, it } from 'vitest'
import { type $Else, type $Fn, type $Then, type ArrayPlus, type IsArray, type TuplePlus, testType } from '../index.js'

testType.equal<readonly string[], Readonly<string[]>>(true)

it('detects readonly array as readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly string[]>, true>(true)
})

it('detects readonly tuple as readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly []>, true>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly [1, 2, 3]>, true>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly [1, 2, 3, 4, 5]>, true>(true)
})

it('detects regular array as not readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<string[]>, false>(true)
})

it('detects regular tuple as not readonly', () => {
	testType.equal<ArrayPlus.IsReadonly<[]>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<[1, 2, 3]>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<[1, 2, 3, 4, 5]>, false>(true)
})

it('returns false for non array', () => {
	testType.equal<ArrayPlus.IsReadonly<string>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<{ a: 1 }>, false>(true)
})

it('returns false for special types', () => {
	testType.equal<ArrayPlus.IsReadonly<any>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<unknown>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<never>, false>(true)
	testType.equal<ArrayPlus.IsReadonly<void>, false>(true)
})

it('can override special branches', () => {
	testType.equal<ArrayPlus.IsReadonly<any, { $any: 'a' }>, 'a'>(true)
	testType.equal<ArrayPlus.IsReadonly<unknown, { $unknown: 'u' }>, 'u'>(true)
	testType.equal<ArrayPlus.IsReadonly<never, { $never: 'n' }>, 'n'>(true)
	testType.equal<ArrayPlus.IsReadonly<void, { $void: 'v' }>, 'v'>(true)
})

it('replaces the removed `$notArray` branch by composing with IsArray', () => {
	type NotArrayAs<A, X> = IsArray<A, { $then: ArrayPlus.IsReadonly<A>; $else: X }>
	testType.equal<NotArrayAs<string, 'n'>, 'n'>(true)
	testType.equal<NotArrayAs<readonly string[], 'n'>, true>(true)
	testType.equal<NotArrayAs<string[], 'n'>, false>(true)
})

it('distributes over union', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly number[] | number[]>, boolean>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly string[] | number>, boolean>(true)
})

it('works with intersection type', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly number[] & { a: 1 }>, true>(true)

	// 🐞 known issue: `Readonly<A>` over an intersection is assignable back to `A`,
	// so a mutable array intersected with an object still reports `true`.
	testType.equal<ArrayPlus.IsReadonly<number[] & { a: 1 }>, true>(true)
})

it('can override the branches', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly string[], { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<ArrayPlus.IsReadonly<string[], { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	testType.equal<ArrayPlus.IsReadonly<string, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	// the special types resolve to `$else` unless their own branch is given
	testType.equal<ArrayPlus.IsReadonly<never, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})

it('resolves `IsReadonly.$Default` the same as no options', () => {
	// `IsReadonly.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<
		ArrayPlus.IsReadonly<readonly string[], ArrayPlus.IsReadonly.$Default>,
		ArrayPlus.IsReadonly<readonly string[]>
	>(true)
	testType.equal<ArrayPlus.IsReadonly<string[], ArrayPlus.IsReadonly.$Default>, ArrayPlus.IsReadonly<string[]>>(true)
	testType.equal<ArrayPlus.IsReadonly<string, ArrayPlus.IsReadonly.$Default>, ArrayPlus.IsReadonly<string>>(true)
	testType.equal<ArrayPlus.IsReadonly<never, ArrayPlus.IsReadonly.$Default>, ArrayPlus.IsReadonly<never>>(true)
	testType.equal<
		ArrayPlus.IsReadonly<readonly string[] | number[], ArrayPlus.IsReadonly.$Default>,
		ArrayPlus.IsReadonly<readonly string[] | number[]>
	>(true)
})

it('works as filter', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly string[], { selection: 'filter' }>, readonly string[]>(true)
	testType.equal<ArrayPlus.IsReadonly<number[], { selection: 'filter' }>, never>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly string[] | number[], { selection: 'filter' }>, readonly string[]>(true)
	testType.equal<ArrayPlus.IsReadonly<readonly string[] | number, { selection: 'filter' }>, readonly string[]>(true)
	testType.equal<ArrayPlus.IsReadonly<never, { selection: 'filter' }>, never>(true)
	testType.equal<ArrayPlus.IsReadonly<any, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<ArrayPlus.IsReadonly<readonly string[], ArrayPlus.IsReadonly.$Branch>, $Then>(true)
	testType.equal<ArrayPlus.IsReadonly<string[], ArrayPlus.IsReadonly.$Branch>, $Else>(true)
	testType.equal<ArrayPlus.IsReadonly<string, ArrayPlus.IsReadonly.$Branch>, $Else>(true)
})

describe('IsReadonly.$Fn', () => {
	it('is IsReadonly as a type function', () => {
		testType.equal<$Fn.Apply<ArrayPlus.IsReadonly.$Fn, readonly string[]>, true>(true)
		testType.equal<$Fn.Apply<ArrayPlus.IsReadonly.$Fn, string[]>, false>(true)
		testType.equal<
			TuplePlus.Filter<[readonly [1], [2], readonly string[]], ArrayPlus.IsReadonly.$Fn>,
			[readonly [1], readonly string[]]
		>(true)
	})

	it('applies its options', () => {
		testType.equal<$Fn.Apply<ArrayPlus.IsReadonly.$Fn<{ $then: 'yes'; $else: 'no' }>, string[]>, 'no'>(true)
		testType.equal<$Fn.Apply<ArrayPlus.IsReadonly.$Fn<{ selection: 'filter' }>, readonly string[]>, readonly string[]>(
			true,
		)
	})
})
