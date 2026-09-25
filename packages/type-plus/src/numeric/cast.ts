import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { StringToBigint } from '../bigint/cast.js'
import type { StringToNumber } from '../number/cast.js'

/**
 * ⚗️ *transform*
 *
 * Casts a string to a numeric literal type (number or bigint) if possible.
 *
 * A string with the `n` suffix gets a bigint, as in `StringToBigint`;
 * any other gets a number, as in `StringToNumber`. A string that is neither
 * fails, with `never` unless the `$fail` option says otherwise.
 *
 * @example
 * ```ts
 * type R = StringToNumeric<'1'> // 1
 * type R = StringToNumeric<'1n'> // 1n
 * type R = StringToNumeric<'-1'> // -1
 * type R = StringToNumeric<'-1n'> // -1n
 * type R = StringToNumeric<'a'> // never
 * ```
 */
export type StringToNumeric<
	S extends string,
	$O extends $StrictOptions<$O, StringToNumeric.$Options> = {},
> = StringToBigint<S, { $fail: StringToNumber<S, $O> }>

export namespace StringToNumeric {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}

/**
 * ⚗️ *transform*
 *
 * Casts a numeric literal type (number or bigint) to string.
 *
 * A bigint keeps its `n` suffix, so the result casts back with `StringToNumeric`.
 *
 * @example
 * ```ts
 * type R = NumericToString<1> // '1'
 * type R = NumericToString<1.23> // '1.23'
 * type R = NumericToString<0.00123> // '0.00123'
 * type R = NumericToString<1n> // '1n'
 * type R = NumericToString<-1> // '-1'
 * type R = NumericToString<-1n> // '-1n'
 * ```
 */
export type NumericToString<N extends number | bigint> = N extends number ? `${N}` : `${N}n`
