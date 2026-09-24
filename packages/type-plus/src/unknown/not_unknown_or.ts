import type { $Unknown } from '../$type/special/$unknown.js'
import type { $StrictOptions } from '../$type/utils/$strict_options.js'
import type { TypePlusOptions } from '../utils/options.js'
import type { IsUnknown } from './is_unknown.js'

/**
 * 🌪️ *filter*
 *
 * Returns `T` if `T` is not `unknown`, otherwise `$Unknown`.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<number> // number
 * type R = NotUnknownOr<unknown> // $Unknown
 *
 * ```
 *
 * 🔢 *customize*
 *
 * Replace the `unknown` branch with `$O['$unknown']`.
 *
 * @example
 * ```ts
 * type R = NotUnknownOr<unknown, { $unknown: number }> // number
 * ```
 */
export type NotUnknownOr<T, $O extends $StrictOptions<$O, NotUnknownOr.$Options> = {}> = IsUnknown<
	T,
	{
		$then: TypePlusOptions.Merge<$O, NotUnknownOr.$Default>['$unknown']
		$else: T
	}
>

export namespace NotUnknownOr {
	export interface $Options extends $Unknown.$Options {}
	export interface $Default {
		$unknown: $Unknown
	}
}
