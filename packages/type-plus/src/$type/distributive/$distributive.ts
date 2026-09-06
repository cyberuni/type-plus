import type { $ResolveOptions } from '../$resolve_options.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $Else, $Then } from '../branch/$selection.js'

/**
 * 🧰 *type util*
 *
 * The `distributive` half of the `$Options` convention.
 *
 * A predicate distributes over a union by default, so a union that is only
 * partly matched answers `boolean` rather than `true` or `false`. Setting
 * `{ distributive: false }` asks the question of the union as a whole instead,
 * which gives a decisive answer.
 *
 * `Parse` is the builder-facing member: a custom type calls it to resolve the
 * caller's `distributive` option against the default of `true`.
 *
 * @example
 * ```ts
 * type R = IsObject<{} | 1> // boolean
 * type R = IsObject<{} | 1, { distributive: false }> // false
 * ```
 */
export namespace $Distributive {
	/**
	 * Options for controlling if the type is distributive.
	 */
	export type Options = {
		distributive?: boolean | undefined
	}

	/**
	 * Default options for `distributive` behavior.
	 *
	 * By default it is `true`.
	 */
	export type Default = {
		distributive: true
	}

	/**
	 * Parse the options for `distributive`.
	 */
	export type Parse<$Options extends Options, $O extends $InputOptions<$Then | $Else> = {}> = $ResolveOptions<
		[$Options['distributive'], Default['distributive']]
	> extends true
		? '$then' extends keyof $O
			? $O['$then']
			: true
		: '$else' extends keyof $O
			? $O['$else']
			: false
}
