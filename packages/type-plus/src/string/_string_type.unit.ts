import { it } from 'vitest'
import { testType } from '../index.js'
import type { _StringType } from './_string_type.js'

it('detects string as `string`', () => {
	testType.equal<_StringType<string>, 'string'>(true)
})

it('detects string literal as `stringLiteral`', () => {
	testType.equal<_StringType<''>, 'stringLiteral'>(true)
	testType.equal<_StringType<'a'>, 'stringLiteral'>(true)
	testType.equal<_StringType<'abc'>, 'stringLiteral'>(true)
	testType.equal<_StringType<'123'>, 'stringLiteral'>(true)
	testType.equal<_StringType<'true'>, 'stringLiteral'>(true)
})

it('detects string template as `stringTemplate`', () => {
	testType.equal<_StringType<`${number}`>, 'templateLiteral'>(true)
	testType.equal<_StringType<`a${number}`>, 'templateLiteral'>(true)
	testType.equal<_StringType<`${number}b`>, 'templateLiteral'>(true)
	testType.equal<_StringType<`a${number}b`>, 'templateLiteral'>(true)
})

it('detects string intersects with record as `string`', () => {
	testType.equal<_StringType<string & { a: 1 }>, 'string'>(true)
	testType.equal<_StringType<string & Record<number, unknown>>, 'string'>(true)
})

it('detects string literal intersects with record as `stringLiteral`', () => {
	testType.equal<_StringType<'' & { a: 1 }>, 'stringLiteral'>(true)
	testType.equal<_StringType<'a' & { a: 1 }>, 'stringLiteral'>(true)
	testType.equal<_StringType<'abc' & { a: 1 }>, 'stringLiteral'>(true)
	testType.equal<_StringType<'123' & { a: 1 }>, 'stringLiteral'>(true)
	testType.equal<_StringType<'true' & { a: 1 }>, 'stringLiteral'>(true)
	testType.equal<_StringType<`a${boolean}b` & { a: 1 }>, 'stringLiteral'>(true)
})

it('detects string literal intersects with a multi-member record as `stringLiteral`', () => {
	testType.equal<_StringType<'abc' & { a: 1; b: 2 }>, 'stringLiteral'>(true)
	testType.equal<_StringType<'abc' & { a: 1 } & { b: 2 }>, 'stringLiteral'>(true)
})

it('detects template literal intersects with record as `templateLiteral`', () => {
	testType.equal<_StringType<`${number}` & { a: 1 }>, 'templateLiteral'>(true)
	testType.equal<_StringType<`a${number}` & { a: 1 }>, 'templateLiteral'>(true)
	testType.equal<_StringType<`${number}b` & { a: 1 }>, 'templateLiteral'>(true)
	testType.equal<_StringType<`a${number}b` & { a: 1 }>, 'templateLiteral'>(true)
})

it('detects string with ManipulatedType as `string`', () => {
	testType.equal<_StringType<Uppercase<string>>, 'string'>(true)
	testType.equal<_StringType<Lowercase<string>>, 'string'>(true)
	testType.equal<_StringType<Lowercase<Uppercase<string>>>, 'string'>(true)
	testType.equal<_StringType<Uppercase<Lowercase<string>>>, 'string'>(true)
})

it('detects string literal with ManipulatedType as `stringLiteral`', () => {
	testType.equal<_StringType<Uppercase<''>>, 'stringLiteral'>(true)
	testType.equal<_StringType<Lowercase<''>>, 'stringLiteral'>(true)
	testType.equal<_StringType<Lowercase<Uppercase<''>>>, 'stringLiteral'>(true)
	testType.equal<_StringType<Uppercase<Lowercase<''>>>, 'stringLiteral'>(true)
	testType.equal<_StringType<Uppercase<'a'>>, 'stringLiteral'>(true)
	testType.equal<_StringType<Lowercase<'a'>>, 'stringLiteral'>(true)
	testType.equal<_StringType<Lowercase<Uppercase<'a'>>>, 'stringLiteral'>(true)
	testType.equal<_StringType<Uppercase<Lowercase<'a'>>>, 'stringLiteral'>(true)
})

it('detects template literal with ManipulatedType as `templateLiteral`', () => {
	testType.equal<_StringType<Uppercase<`${number}`>>, 'templateLiteral'>(true)
	testType.equal<_StringType<Lowercase<`${number}`>>, 'templateLiteral'>(true)
	testType.equal<_StringType<Lowercase<Uppercase<`${number}`>>>, 'templateLiteral'>(true)
	testType.equal<_StringType<Uppercase<Lowercase<`${number}`>>>, 'templateLiteral'>(true)
	testType.equal<_StringType<Uppercase<`a${number}`>>, 'templateLiteral'>(true)
	testType.equal<_StringType<Lowercase<`a${number}`>>, 'templateLiteral'>(true)
	testType.equal<_StringType<Lowercase<Uppercase<`a${number}`>>>, 'templateLiteral'>(true)
	testType.equal<_StringType<Uppercase<Lowercase<`a${number}`>>>, 'templateLiteral'>(true)
})
