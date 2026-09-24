import type { _ResolveFail } from '../$type/errors/_resolve_fail.js'
import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
/**
 * Cast a string to a number literal type if possible.
 *
 * ```ts
 * StringToNumber<'1'> // 1
 * StringToNumber<'-1'> // -1
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
