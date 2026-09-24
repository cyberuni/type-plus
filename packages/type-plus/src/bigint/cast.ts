import type { $Fail } from '../$type/errors/$fail.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
/**
 * Cast a string to a bigint literal type if possible.
 *
 * ```ts
 * StringToBigint<'1n'> // 1n
 * StringToBigint<'-1n'> // -1n
 * ```
 */
export type StringToBigint<S extends string, $O extends $StrictOptions<$O, StringToBigint.$Options> = {}> = S extends `-0n`
	? 0n
	: S extends `${infer N extends bigint}n`
		? N
		: $Fail._Resolve<$O>


export namespace StringToBigint {
	export interface $Options extends $Fail.$Options {}
	export interface $Default extends $Fail.$Default {}
}