/**
 * Pins the `@example` blocks in the `src/string/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/string/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import {
	type $Else,
	type $ExtractManipulatedString,
	type $Then,
	type IsNotString,
	type IsNotStringLiteral,
	type IsNotTemplateLiteral,
	type IsString,
	type IsStringLiteral,
	type IsTemplateLiteral,
	type StringIncludes,
	type StringPlus,
	type StringSplit,
	testType,
} from '../index.js'

it('IsString examples in TSDoc are accurate', () => {
	testType.equal<IsString<string>, true>(true)
	testType.equal<IsString<'a'>, true>(true)
	testType.equal<IsString<never>, false>(true)
	testType.equal<IsString<unknown>, false>(true)
	testType.equal<IsString<string | boolean>, boolean>(true)
	testType.equal<IsString<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsString<'a', { selection: 'filter' }>, 'a'>(true)
	testType.equal<IsString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsString<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsString<string | boolean, { selection: 'filter' }>, string>(true)
	testType.equal<IsString<string | 1>, boolean>(true)
	testType.equal<IsString<string | 1, { distributive: false }>, false>(true)
	testType.equal<IsString<string, IsString.$Branch>, $Then>(true)
	testType.equal<IsString<bigint, IsString.$Branch>, $Else>(true)
})

it('IsNotString examples in TSDoc are accurate', () => {
	testType.equal<IsNotString<string>, false>(true)
	testType.equal<IsNotString<'a'>, false>(true)
	testType.equal<IsNotString<never>, true>(true)
	testType.equal<IsNotString<unknown>, true>(true)
	testType.equal<IsNotString<string | boolean>, boolean>(true)
	testType.equal<IsNotString<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<'a', { selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotString<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotString<string | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotString<string | 1>, boolean>(true)
	testType.equal<IsNotString<string | 1, { distributive: false }>, true>(true)
	testType.equal<IsNotString<string, IsNotString.$Branch>, $Else>(true)
	testType.equal<IsNotString<bigint, IsNotString.$Branch>, $Then>(true)
})

it('IsStringLiteral examples in TSDoc are accurate', () => {
	testType.equal<IsStringLiteral<string>, false>(true)
	testType.equal<IsStringLiteral<'a'>, true>(true)
	testType.equal<IsStringLiteral<`${number}`>, true>(true)
	testType.equal<IsStringLiteral<never>, false>(true)
	testType.equal<IsStringLiteral<unknown>, false>(true)
	testType.equal<IsStringLiteral<'a' | boolean>, boolean>(true)
	testType.equal<IsStringLiteral<string, { selection: 'filter' }>, never>(true)
	testType.equal<IsStringLiteral<'a', { selection: 'filter' }>, 'a'>(true)
	testType.equal<IsStringLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsStringLiteral<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsStringLiteral<'a' | boolean, { selection: 'filter' }>, 'a'>(true)
	testType.equal<IsStringLiteral<'abc' | 1>, boolean>(true)
	testType.equal<IsStringLiteral<'abc' | 1, { distributive: false }>, false>(true)
	testType.equal<IsStringLiteral<`${number}`, { exact: true }>, false>(true)
	testType.equal<IsStringLiteral<'abc', IsStringLiteral.$Branch>, $Then>(true)
	testType.equal<IsStringLiteral<string, IsStringLiteral.$Branch>, $Else>(true)
})

it('IsNotStringLiteral examples in TSDoc are accurate', () => {
	testType.equal<IsNotStringLiteral<string>, true>(true)
	testType.equal<IsNotStringLiteral<'a'>, false>(true)
	testType.equal<IsNotStringLiteral<`${number}`>, false>(true)
	testType.equal<IsNotStringLiteral<never>, true>(true)
	testType.equal<IsNotStringLiteral<unknown>, true>(true)
	testType.equal<IsNotStringLiteral<'a' | boolean>, boolean>(true)
	testType.equal<IsNotStringLiteral<string, { selection: 'filter' }>, string>(true)
	testType.equal<IsNotStringLiteral<'a', { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStringLiteral<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotStringLiteral<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotStringLiteral<'a' | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotStringLiteral<'abc' | 1>, boolean>(true)
	testType.equal<IsNotStringLiteral<'abc' | 1, { distributive: false }>, true>(true)
	testType.equal<IsNotStringLiteral<`${number}`, { exact: true }>, true>(true)
	testType.equal<IsNotStringLiteral<'abc', IsNotStringLiteral.$Branch>, $Else>(true)
	testType.equal<IsNotStringLiteral<string, IsNotStringLiteral.$Branch>, $Then>(true)
})

it('IsTemplateLiteral examples in TSDoc are accurate', () => {
	testType.equal<IsTemplateLiteral<string>, false>(true)
	testType.equal<IsTemplateLiteral<'foo'>, false>(true)
	testType.equal<IsTemplateLiteral<`a${number}`>, true>(true)
	testType.equal<IsTemplateLiteral<`a${number}` | `${bigint}c`>, true>(true)
	testType.equal<IsTemplateLiteral<never>, false>(true)
	testType.equal<IsTemplateLiteral<unknown>, false>(true)
	testType.equal<IsTemplateLiteral<`${number}` | boolean>, boolean>(true)
	testType.equal<IsTemplateLiteral<`${number}`, { selection: 'filter' }>, `${number}`>(true)
	testType.equal<IsTemplateLiteral<'a', { selection: 'filter' }>, never>(true)
	testType.equal<IsTemplateLiteral<`${number}` | 1>, boolean>(true)
	testType.equal<IsTemplateLiteral<`${number}` | 1, { distributive: false }>, false>(true)
	testType.equal<IsTemplateLiteral<`${number}`, IsTemplateLiteral.$Branch>, $Then>(true)
	testType.equal<IsTemplateLiteral<bigint, IsTemplateLiteral.$Branch>, $Else>(true)
})

it('IsNotTemplateLiteral examples in TSDoc are accurate', () => {
	testType.equal<IsNotTemplateLiteral<string>, true>(true)
	testType.equal<IsNotTemplateLiteral<'foo'>, true>(true)
	testType.equal<IsNotTemplateLiteral<`a${number}`>, false>(true)
	testType.equal<IsNotTemplateLiteral<never>, true>(true)
	testType.equal<IsNotTemplateLiteral<unknown>, true>(true)
	testType.equal<IsNotTemplateLiteral<`${number}` | boolean>, boolean>(true)
	testType.equal<IsNotTemplateLiteral<`${number}`, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTemplateLiteral<'a', { selection: 'filter' }>, 'a'>(true)
	testType.equal<IsNotTemplateLiteral<`${number}` | 1>, boolean>(true)
	testType.equal<IsNotTemplateLiteral<`${number}` | 1, { distributive: false }>, true>(true)
	testType.equal<IsNotTemplateLiteral<`${number}`, IsNotTemplateLiteral.$Branch>, $Else>(true)
	testType.equal<IsNotTemplateLiteral<bigint, IsNotTemplateLiteral.$Branch>, $Then>(true)
})

it('StringIncludes and StringSplit examples in TSDoc are accurate', () => {
	testType.equal<StringIncludes<'abc', 'a'>, true>(true)
	testType.equal<StringIncludes<'abc', 'd'>, false>(true)
	testType.equal<StringSplit<'abc', ''>, ['a', 'b', 'c']>(true)
	testType.equal<StringSplit<'abc', 'a'>, ['', 'bc']>(true)
	testType.equal<StringSplit<'abc', 'b'>, ['a', 'c']>(true)
	testType.equal<StringSplit<'abc', 'c'>, ['ab', '']>(true)
})

it('$ExtractManipulatedString examples on the docs site are accurate', () => {
	// `Uppercase<'abc'>` resolves to `'ABC'` before the type sees it, so there is
	// no wrapper left to unwrap. Only an unresolved intrinsic can be seen through.
	testType.equal<$ExtractManipulatedString<Uppercase<string>>, string>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<'abc'>>, 'ABC'>(true)
	testType.equal<$ExtractManipulatedString<'abc'>, 'abc'>(true)
})

it('StringPlus examples in TSDoc are accurate', () => {
	testType.equal<StringPlus.Includes<'abc', 'a'>, true>(true)
	testType.equal<StringPlus.Includes<'abc', 'd'>, false>(true)
	testType.equal<StringPlus.Split<'abc', ''>, ['a', 'b', 'c']>(true)
	testType.equal<StringPlus.Split<'abc', 'a'>, ['', 'bc']>(true)
	testType.equal<StringPlus.Split<'abc', 'b'>, ['a', 'c']>(true)
	testType.equal<StringPlus.Split<'abc', 'c'>, ['ab', '']>(true)
})
