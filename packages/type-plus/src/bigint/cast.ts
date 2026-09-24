import type { _ResolveFail } from '../$type/errors/_resolve_fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
/**
 * ⚗️ *transform*
 *
 * Casts a string to a bigint literal type if possible.
 *
 * The string needs the `n` suffix, and `'-0n'` gets `0n`.
 * Any other string fails, with `never` unless the `$fail` option says otherwise.
 *
 * @example
 * ```ts
 * type R = StringToBigint<'1n'> // 1n
 * type R = StringToBigint<'-1n'> // -1n
 * type R = StringToBigint<'1'> // never
 * type R = StringToBigint<'1', { $fail: 'no' }> // 'no'
 * ```
 */
export type StringToBigint<
	S extends string,
	$O extends $StrictOptions<$O, StringToBigint.$Options> = {},
> = S extends `-0n` ? 0n : S extends `${infer N extends bigint}n` ? N : _ResolveFail<$O>

export namespace StringToBigint {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
