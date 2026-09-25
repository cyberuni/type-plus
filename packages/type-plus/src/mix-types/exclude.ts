import type { $StrictOptions } from '../$type/utils/$strict-options.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * 🌪️ *filter*
 *
 * Exclude from `T` those types that are assignable to `U`,
 * and replace them with `$O['$excluded']`.
 *
 * With two arguments it is identical to the built-in `Exclude`, generic `T`
 * included, so importing it and shadowing the built-in changes nothing. Only
 * `$O['$excluded']` adds behavior.
 *
 * @example
 * ```ts
 * type R = Exclude<undefined, undefined> // never
 * type R = Exclude<undefined | 1, undefined> // 1
 *
 * type R = Exclude<undefined, undefined, { $excluded: 2 }> // 2
 * type R = Exclude<undefined | 1, undefined, { $excluded: 2 }> // 1 | 2
 * ```
 *
 * @typeParam $O['$excluded'] Replaces each member of `T` assignable to `U`.
 * Default to `never`.
 */
export type Exclude<T, U, $O extends $StrictOptions<$O, Exclude.$Options> = {}> = T extends U
	? TypePlusOptions.Merge<$O, Exclude.$Default>['$excluded']
	: T

export namespace Exclude {
	export interface $Options {
		$excluded?: unknown
	}
	export interface $Default {
		$excluded: never
	}
}
