import type { _ResolveFail } from '../$type/errors/_resolve-fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict-options.js'
/**
 * ⚗️ *transform*
 *
 * Casts a string to a number literal type if possible.
 *
 * Trailing zeros in the fraction are dropped, and `'-0'` gets `0`.
 * A string that is not a number fails, with `never` unless the `$fail`
 * option says otherwise.
 *
 * @example
 * ```ts
 * type R = StringToNumber<'1'> // 1
 * type R = StringToNumber<'-1'> // -1
 * type R = StringToNumber<'1.50'> // 1.5
 * type R = StringToNumber<'a'> // never
 * type R = StringToNumber<'a', { $fail: 'NaN' }> // 'NaN'
 * ```
 */
export type StringToNumber<
	S extends string,
	$O extends $StrictOptions<$O, StringToNumber.$Options> = {},
> = S extends `-0`
	? 0
	: S extends `${infer W}.0`
		? StringToNumber<W, $O>
		: S extends `${infer W}.${infer F}0`
			? StringToNumber<`${W}.${F}`, $O>
			: S extends `${infer N extends number}`
				? N
				: _ResolveFail<$O>

export namespace StringToNumber {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}
