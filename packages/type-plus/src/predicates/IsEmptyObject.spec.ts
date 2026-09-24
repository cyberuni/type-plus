import { describe, test } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsEmptyObject, type TuplePlus, testType } from '../index.js'

test('true for {}', () => {
	testType.true<IsEmptyObject<{}>>(true)
})
test('true for anything `{}` extends, as `{}` means "not null or undefined"', () => {
	testType.true<IsEmptyObject<object>>(true)
	testType.true<IsEmptyObject<Record<string, never>>>(true)
})
test('false for everything else', () => {
	testType.false<IsEmptyObject<undefined>>(true)
	testType.false<IsEmptyObject<false>>(true)
	testType.false<IsEmptyObject<0>>(true)
	testType.false<IsEmptyObject<number>>(true)
	testType.false<IsEmptyObject<''>>(true)
	testType.false<IsEmptyObject<{ a: 1 }>>(true)
})
test('never for never', () => {
	testType.equal<IsEmptyObject<never>, never>(true)
})
test('distributes over union', () => {
	testType.equal<IsEmptyObject<{} | { a: 1 }>, boolean>(true)
	testType.equal<IsEmptyObject<{} | object>, true>(true)
})
test('can override the branches', () => {
	testType.equal<IsEmptyObject<{}, { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
	testType.equal<IsEmptyObject<{ a: 1 }, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	testType.equal<IsEmptyObject<number, { $then: 'yes'; $else: 'no' }>, 'no'>(true)
})
test('resolves `IsEmptyObject.$Default` the same as no options', () => {
	// `IsEmptyObject.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsEmptyObject<{}, IsEmptyObject.$Default>, IsEmptyObject<{}>>(true)
	testType.equal<IsEmptyObject<{ a: 1 }, IsEmptyObject.$Default>, IsEmptyObject<{ a: 1 }>>(true)
	testType.equal<IsEmptyObject<number, IsEmptyObject.$Default>, IsEmptyObject<number>>(true)
	testType.equal<IsEmptyObject<never, IsEmptyObject.$Default>, IsEmptyObject<never>>(true)
	testType.equal<IsEmptyObject<{} | { a: 1 }, IsEmptyObject.$Default>, IsEmptyObject<{} | { a: 1 }>>(true)
})
test('works as filter', () => {
	testType.equal<IsEmptyObject<{}, { selection: 'filter' }>, {}>(true)
	testType.equal<IsEmptyObject<object, { selection: 'filter' }>, object>(true)
	testType.equal<IsEmptyObject<{} | { a: 1 }, { selection: 'filter' }>, {}>(true)
	testType.equal<IsEmptyObject<{ a: 1 }, { selection: 'filter' }>, never>(true)
	testType.equal<IsEmptyObject<number, { selection: 'filter' }>, never>(true)
})
test('works with unique branches', () => {
	testType.equal<IsEmptyObject<{}, IsEmptyObject.$Branch>, $Then>(true)
	testType.equal<IsEmptyObject<{ a: 1 }, IsEmptyObject.$Branch>, $Else>(true)
})
describe('IsEmptyObject.$Fn', () => {
	test('is IsEmptyObject as a type function', () => {
		testType.equal<$Fn.Apply<IsEmptyObject.$Fn, {}>, true>(true)
		testType.equal<$Fn.Apply<IsEmptyObject.$Fn, { a: 1 }>, false>(true)
		testType.equal<TuplePlus.Filter<[{}, { a: 1 }, 1], IsEmptyObject.$Fn>, [{}]>(true)
	})
	test('applies its options', () => {
		testType.equal<$Fn.Apply<IsEmptyObject.$Fn<{ $then: 'yes'; $else: 'no' }>, { a: 1 }>, 'no'>(true)
	})
})
