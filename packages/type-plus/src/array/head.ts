import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Never } from '../$type/special/$never.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { IsNever } from '../never/is_never.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Gets the first entry in the tuple or the type of array `T`.
 *
 * @example
 * ```ts
 * type R = Head<[1, 2, 3]> // 1
 * type R = Head<string[]> // string
 *
 * type R = Head<[]> // never
 * type R = Head<[], { $emptyTuple: undefined }> // undefined
 * ```
 *
 * @typeParam $O['$never'] Return type when `T` is `never`.
 * Default to `never`.
 *
 * @typeParam $O['$emptyTuple'] Return type when `T` is `[]`.
 * Default to `never`.
 */
export type Head<T extends readonly unknown[], $O extends $StrictOptions<$O, Head.$Options> = {}> = IsNever<
	T,
	$Selection.Branch
> extends infer R
	? R extends $Then
		? TypePlusOptions.Merge<$O, Head.$Default>['$never']
		: R extends $Else
			? T['length'] extends 0
				? TypePlusOptions.Merge<$O, Head.$Default>['$emptyTuple']
				: T[0]
			: never
	: never

export namespace Head {
	export interface $Options extends $Never.$Options {
		$emptyTuple?: unknown
	}

	export interface $Default extends $Never.$Default {
		$emptyTuple: never
	}
}
