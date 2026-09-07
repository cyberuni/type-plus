import type { $ResolveOptions } from '../$resolve_options.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $Else, $Then } from '../branch/$selection.js'

/**
 * 🧰 *type util*
 *
 * The `exact` half of the `$Options` convention.
 *
 * A predicate asks "is `T` assignable to this?" by default. Setting
 * `{ exact: true }` asks "is `T` *exactly* this?", which is the difference
 * between `object` and `{}`, or between `number` and `1`.
 *
 * `Parse` is the builder-facing member: a custom type calls it to resolve the
 * caller's `exact` option against the default of `false`.
 *
 * @example
 * ```ts
 * type R = IsObject<{}> // true
 * type R = IsObject<{}, { exact: true }> // false
 * type R = IsObject<object, { exact: true }> // true
 * ```
 */
export namespace $Exact {
	/**
	 * Options for controlling if the type perform exact comparison.
	 */
	export type Options = {
		exact?: boolean | undefined
	}

	/**
	 * Default options for `exact` behavior.
	 *
	 * By default it is `false`.
	 */
	export type Default = {
		exact: false
	}

	/**
	 * Parse the options for `exact`.
	 */
	export type Parse<$Options extends Options, $O extends $InputOptions<$Then | $Else> = {}> = $ResolveOptions<
		[$Options['exact'], Default['exact']]
	> extends true
		? '$then' extends keyof $O
			? $O['$then']
			: true
		: '$else' extends keyof $O
			? $O['$else']
			: false
}
