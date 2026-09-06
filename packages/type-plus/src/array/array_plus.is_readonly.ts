import type { $Selection } from '../$type/branch/$selection.js'
import type { $Never } from '../$type/special/$never.js'
import type { IsNever } from '../never/is_never.js'
import type { TypePlusOptions } from '../utils/options.js'
import type { IsArray } from './is_array.js'

/**
 * 🎭 *predicate*
 * 🔢 *customizable*
 *
 * Checks if `A` is a readonly array or tuple
 *
 * @example
 * ```ts
 * type R = IsReadonly<readonly string[]> // true
 * type R = IsReadonly<readonly [1, 2, 3, 4, 5]> // true
 *
 * type R = IsReadonly<[1, 2, 3, 4, 5]> // false
 * type R = IsReadonly<readonly string[] | number> // boolean
 * ```
 */
export type IsReadonly<A, $Options extends IsReadonly.Options = IsReadonly.DefaultOptions> = TypePlusOptions.Merge<
	$Options,
	IsReadonly.DefaultOptions
> extends infer O extends IsReadonly.Options
	? IsNever<
			A,
			{
				$then: O['$never']
				$else: A extends any
					? IsArray<A, { $then: Readonly<A> extends A ? O['$then'] : O['$else']; $else: O['$notArray'] }>
					: never
			}
		>
	: never

export namespace IsReadonly {
	export interface Options extends $Never.$Options, $Selection.Options, TypePlusOptions.NotArray {}

	export interface DefaultOptions {
		$then: true
		$else: false
		$never: false
		$notArray: false
	}
}
