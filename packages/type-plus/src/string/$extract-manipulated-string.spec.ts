import { it } from 'vitest'
import { type $ExtractManipulatedString, testType } from '../index.js'

it('returns T if T is a string', () => {
	testType.equal<$ExtractManipulatedString<string>, string>(true)
})

it('returns T if T is a string literal', () => {
	testType.equal<$ExtractManipulatedString<''>, ''>(true)
	testType.equal<$ExtractManipulatedString<'a'>, 'a'>(true)
})

it('returns T if T can be reduced to a string literal', () => {
	testType.equal<$ExtractManipulatedString<`${''}`>, ''>(true)
	testType.equal<$ExtractManipulatedString<`${'b'}`>, 'b'>(true)
	testType.equal<$ExtractManipulatedString<`${boolean}`>, `true` | `false`>(true)
	testType.equal<$ExtractManipulatedString<`${true}`>, `true`>(true)
	testType.equal<$ExtractManipulatedString<`${false}`>, `false`>(true)
	testType.equal<$ExtractManipulatedString<`${1}`>, `1`>(true)
	testType.equal<$ExtractManipulatedString<`${1.1}`>, `1.1`>(true)
	testType.equal<$ExtractManipulatedString<`${1e99}`>, `1e+99`>(true)
	testType.equal<$ExtractManipulatedString<`${-1}`>, `-1`>(true)
	testType.equal<$ExtractManipulatedString<`${1n}`>, `1`>(true)
	testType.equal<$ExtractManipulatedString<`${null}`>, `null`>(true)
	testType.equal<$ExtractManipulatedString<`${undefined}`>, `undefined`>(true)
})

it('returns T for template literal', () => {
	testType.equal<$ExtractManipulatedString<`${number}`>, `${number}`>(true)
	testType.equal<$ExtractManipulatedString<`${string}`>, string>(true)
	testType.equal<$ExtractManipulatedString<`${bigint}`>, `${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<`a${number}`>, `a${number}`>(true)
	testType.equal<$ExtractManipulatedString<`a${string}`>, `a${string}`>(true)
	testType.equal<$ExtractManipulatedString<`a${bigint}`>, `a${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<`${number}c`>, `${number}c`>(true)
	testType.equal<$ExtractManipulatedString<`${string}c`>, `${string}c`>(true)
	testType.equal<$ExtractManipulatedString<`${bigint}c`>, `${bigint}c`>(true)

	testType.equal<$ExtractManipulatedString<`a${number}c`>, `a${number}c`>(true)
	testType.equal<$ExtractManipulatedString<`a${string}c`>, `a${string}c`>(true)
	testType.equal<$ExtractManipulatedString<`a${bigint}c`>, `a${bigint}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractManipulatedString<`${number | string | bigint}`>, string>(true)
	testType.equal<$ExtractManipulatedString<`${number | bigint}`>, `${number | bigint}`>(true)
	testType.equal<$ExtractManipulatedString<`a${number | string | bigint}`>, `a${number | string | bigint}`>(true)
	testType.equal<$ExtractManipulatedString<`${number | string | bigint}c`>, `${number | string | bigint}c`>(true)
	testType.equal<$ExtractManipulatedString<`a${number | string | bigint}c`>, `a${number | string | bigint}c`>(true)
})

it('unwraps T in Uppercase', () => {
	testType.equal<$ExtractManipulatedString<Uppercase<string>>, string>(true)

	testType.equal<$ExtractManipulatedString<Uppercase<''>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<'a'>>, 'A'>(true)

	testType.equal<$ExtractManipulatedString<Uppercase<`${''}`>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${'b'}`>>, 'B'>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${boolean}`>>, `TRUE` | `FALSE`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${true}`>>, `TRUE`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${false}`>>, `FALSE`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${1}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${1e99}`>>, `1E+99`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${null}`>>, `NULL`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${undefined}`>>, `UNDEFINED`>(true)

	testType.equal<$ExtractManipulatedString<Uppercase<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${string}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<Uppercase<`a${number}`>>, `A${Uppercase<`${number}`>}`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`a${string}`>>, `A${Uppercase<`${string}`>}`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`a${bigint}`>>, `A${Uppercase<`${bigint}`>}`>(true)

	testType.equal<$ExtractManipulatedString<Uppercase<`${number}c`>>, `${Uppercase<`${number}`>}C`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${string}c`>>, `${Uppercase<`${string}`>}C`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${bigint}c`>>, `${Uppercase<`${bigint}`>}C`>(true)

	testType.equal<$ExtractManipulatedString<Uppercase<`a${number}c`>>, `A${Uppercase<`${number}`>}C`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`a${string}c`>>, `A${Uppercase<`${string}`>}C`>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`a${bigint}c`>>, `A${Uppercase<`${bigint}`>}C`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Uppercase<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<
		$ExtractManipulatedString<Uppercase<`a${number | string | bigint}`>>,
		`A${Uppercase<`${number | string | bigint}`>}`
	>(true)
	testType.equal<
		$ExtractManipulatedString<Uppercase<`${number | string | bigint}c`>>,
		`${Uppercase<`${number | string | bigint}`>}C`
	>(true)
	testType.equal<
		$ExtractManipulatedString<Uppercase<`a${number | string | bigint}c`>>,
		`A${Uppercase<`${number | string | bigint}`>}C`
	>(true)
})

it('unwraps T in Lowercase', () => {
	testType.equal<$ExtractManipulatedString<Lowercase<string>>, string>(true)

	testType.equal<$ExtractManipulatedString<Lowercase<''>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<'a'>>, 'a'>(true)

	testType.equal<$ExtractManipulatedString<Lowercase<`${''}`>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${'b'}`>>, 'b'>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${boolean}`>>, `true` | `false`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${true}`>>, `true`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${false}`>>, `false`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${1}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${1e99}`>>, `1e+99`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${null}`>>, `null`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${undefined}`>>, `undefined`>(true)

	testType.equal<$ExtractManipulatedString<Lowercase<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${string}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<Lowercase<`a${number}`>>, `a${Lowercase<`${number}`>}`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`a${string}`>>, `a${Lowercase<`${string}`>}`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`a${bigint}`>>, `a${Lowercase<`${bigint}`>}`>(true)

	testType.equal<$ExtractManipulatedString<Lowercase<`${number}c`>>, `${Lowercase<`${number}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${string}c`>>, `${Lowercase<`${string}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${bigint}c`>>, `${Lowercase<`${bigint}`>}c`>(true)

	testType.equal<$ExtractManipulatedString<Lowercase<`a${number}c`>>, `a${Lowercase<`${number}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`a${string}c`>>, `a${Lowercase<`${string}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`a${bigint}c`>>, `a${Lowercase<`${bigint}`>}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Lowercase<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<
		$ExtractManipulatedString<Lowercase<`a${number | string | bigint}`>>,
		`a${Lowercase<`${number | string | bigint}`>}`
	>(true)
	testType.equal<
		$ExtractManipulatedString<Lowercase<`${number | string | bigint}c`>>,
		`${Lowercase<`${number | string | bigint}`>}c`
	>(true)
	testType.equal<
		$ExtractManipulatedString<Lowercase<`a${number | string | bigint}c`>>,
		`a${Lowercase<`${number | string | bigint}`>}c`
	>(true)
})

it('unwraps T in Capitalize', () => {
	testType.equal<$ExtractManipulatedString<Capitalize<string>>, string>(true)

	testType.equal<$ExtractManipulatedString<Capitalize<''>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<'a'>>, 'A'>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<'hello world'>>, 'Hello world'>(true)

	testType.equal<$ExtractManipulatedString<Capitalize<`${''}`>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${'b'}`>>, 'B'>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${boolean}`>>, `True` | `False`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${true}`>>, `True`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${false}`>>, `False`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${1}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${1e99}`>>, `1e+99`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${null}`>>, `Null`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${undefined}`>>, `Undefined`>(true)

	testType.equal<$ExtractManipulatedString<Capitalize<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${string}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<Capitalize<`a${number}`>>, `A${number}`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`a${string}`>>, `A${string}`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`a${bigint}`>>, `A${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<Capitalize<`${number}c`>>, `${Capitalize<`${number}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${string}c`>>, `${Capitalize<`${string}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${bigint}c`>>, `${Capitalize<`${bigint}`>}c`>(true)

	testType.equal<$ExtractManipulatedString<Capitalize<`a${number}c`>>, `A${number}c`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`a${string}c`>>, `A${string}c`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`a${bigint}c`>>, `A${bigint}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<$ExtractManipulatedString<Capitalize<`a${number | string | bigint}`>>, `A${number | string | bigint}`>(
		true,
	)
	testType.equal<
		$ExtractManipulatedString<Capitalize<`${number | string | bigint}c`>>,
		`${Capitalize<`${number | string | bigint}`>}c`
	>(true)
	testType.equal<
		$ExtractManipulatedString<Capitalize<`a${number | string | bigint}c`>>,
		`A${number | string | bigint}c`
	>(true)
})

it('unwraps T in Uncapitalize', () => {
	testType.equal<$ExtractManipulatedString<Uncapitalize<string>>, string>(true)

	testType.equal<$ExtractManipulatedString<Uncapitalize<''>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<'ABC'>>, 'aBC'>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<'HELLO WORLD'>>, 'hELLO WORLD'>(true)

	testType.equal<$ExtractManipulatedString<Uncapitalize<`${''}`>>, ''>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${'b'}`>>, 'b'>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${boolean}`>>, `true` | `false`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${true}`>>, `true`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${false}`>>, `false`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${1}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${1.1}`>>, `1.1`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${1e99}`>>, `1e+99`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${-1}`>>, `-1`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${1n}`>>, `1`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${null}`>>, `null`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${undefined}`>>, `undefined`>(true)

	testType.equal<$ExtractManipulatedString<Uncapitalize<`${number}`>>, `${number}`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${string}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${bigint}`>>, `${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<Uncapitalize<`a${number}`>>, `a${number}`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`a${string}`>>, `a${string}`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`a${bigint}`>>, `a${bigint}`>(true)

	testType.equal<$ExtractManipulatedString<Uncapitalize<`${number}c`>>, `${Uncapitalize<`${number}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${string}c`>>, `${Uncapitalize<`${string}`>}c`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${bigint}c`>>, `${Uncapitalize<`${bigint}`>}c`>(true)

	testType.equal<$ExtractManipulatedString<Uncapitalize<`a${number}c`>>, `a${number}c`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`a${string}c`>>, `a${string}c`>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`a${bigint}c`>>, `a${bigint}c`>(true)

	testType.equal<`${number | string | bigint}`, string>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${number | string | bigint}`>>, string>(true)
	testType.equal<$ExtractManipulatedString<Uncapitalize<`${number | bigint}`>>, `${number | bigint}`>(true)
	testType.equal<
		$ExtractManipulatedString<Uncapitalize<`a${number | string | bigint}`>>,
		`a${number | string | bigint}`
	>(true)
	testType.equal<
		$ExtractManipulatedString<Uncapitalize<`${number | string | bigint}c`>>,
		`${Uncapitalize<`${number | string | bigint}`>}c`
	>(true)
	testType.equal<
		$ExtractManipulatedString<Uncapitalize<`a${number | string | bigint}c`>>,
		`a${number | string | bigint}c`
	>(true)
})

it('unwraps nested T', () => {
	testType.equal<$ExtractManipulatedString<Uppercase<Lowercase<Capitalize<Uncapitalize<'ABC'>>>>>, 'ABC'>(true)

	testType.equal<$ExtractManipulatedString<Uppercase<Lowercase<Capitalize<Uncapitalize<`${number}`>>>>>, `${number}`>(
		true,
	)
	testType.equal<
		$ExtractManipulatedString<Uppercase<Lowercase<Capitalize<Uncapitalize<`a${number}`>>>>>,
		`A${Uppercase<Lowercase<`${number}`>>}`
	>(true)
})
