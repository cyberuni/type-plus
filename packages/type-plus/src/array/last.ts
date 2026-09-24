import type { $Never } from '../$type/special/$never.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsNever } from '../never/is_never.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * 🦴 *utilities*
 *
 * Gets the last entry in the tuple or the type of array `T`.
 *
 * @example
 * ```ts
 * type R = Last<[1, 2, 3]> // 3
 * type R = Last<string[]> // string
 *
 * type R = Last<[]> // never
 * type R = Last<[], { $emptyTuple: undefined }> // undefined
 * ```
 *
 * @typeParam $O['$never'] Return type when `T` is `never`.
 * Default to `never`.
 *
 * @typeParam $O['$emptyTuple'] Return type when `T` is `[]`.
 * Default to `never`.
 */
export type Last<
	T extends readonly unknown[],
	$O extends $StrictOptions<$O, Last.$Options> = {},
> = TypePlusOptions.Merge<$O, Last.$Default> extends infer O extends Required<Last.$Options>
	? IsNever<
			T,
			{
				$then: O['$never']
				$else: T['length'] extends 0 ? O['$emptyTuple'] : T extends readonly [...unknown[], infer R] ? R : T[0]
			}
		>
	: never

export namespace Last {
	export interface $Options extends $Never.$Options {
		$emptyTuple?: unknown
	}

	export interface $Default extends $Never.$Default {
		$emptyTuple: never
	}
}
