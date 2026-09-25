import type { $Branch } from '../branch/$branch.js'

/**
 * Branch selector for type `unknown`.
 *
 * A named interface extending `$Branch<'$unknown'>`, not a string.
 * A predicate given `$Unknown.$Branch` resolves to it when `T` is `unknown`,
 * so the result for `unknown` can be told apart from `$then` and `$else`.
 *
 * @example
 * ```ts
 * type R = IsAny<unknown, $Unknown.$Branch> // $Unknown
 * ```
 */
export interface $Unknown extends $Branch<'$unknown'> {}

declare const $unknown: '$unknown'

export namespace $Unknown {
	export type $Key = '$unknown'
	/**
	 * Options to specifically handle the `unknown` type.
	 *
	 * A type whose options extend it lets the caller pick the result for `unknown`
	 * with the `$unknown` key.
	 *
	 * @example
	 * ```ts
	 * type R = IsAny<unknown, { $unknown: 'unknown' }> // 'unknown'
	 * ```
	 */
	export type $Options = { [$unknown]?: unknown }

	/**
	 * Branch option to specifically handle the `unknown` type.
	 *
	 * It sets `$unknown` to `$Unknown`, so an `unknown` input resolves to the `$Unknown` marker
	 * and can be handled apart from the other results.
	 *
	 * @example
	 * ```ts
	 * type R = IsAny<unknown, $Unknown.$Branch> // $Unknown
	 * type R = IsAny<1, $Unknown.$Branch> // false
	 * ```
	 */
	export type $Branch = { [$unknown]: $Unknown }
}
