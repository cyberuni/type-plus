import type { $Branch } from '../branch/$branch.js'

/**
 * Branch selector for type `any`.
 *
 * A named interface extending `$Branch<'$any'>`, not a string.
 * A predicate given `$Any.$Branch` resolves to it when `T` is `any`,
 * so the result for `any` can be told apart from `$then` and `$else`.
 *
 * @example
 * ```ts
 * type R = IsNever<any, $Any.$Branch> // $Any
 * ```
 */
export interface $Any extends $Branch<'$any'> {}

declare const $any: '$any'

export namespace $Any {
	export type $Key = '$any'
	/**
	 * Options to specifically handle the `any` type.
	 *
	 * A type whose options extend it lets the caller pick the result for `any`
	 * with the `$any` key.
	 *
	 * @example
	 * ```ts
	 * type R = IsNever<any, { $any: 'any' }> // 'any'
	 * ```
	 */
	export type $Options = { [$any]?: unknown }

	/**
	 * Branch option to specifically handle the `any` type.
	 *
	 * It sets `$any` to `$Any`, so an `any` input resolves to the `$Any` marker
	 * and can be handled apart from the other results.
	 *
	 * @example
	 * ```ts
	 * type R = IsNever<any, $Any.$Branch> // $Any
	 * type R = IsNever<1, $Any.$Branch> // false
	 * ```
	 */
	export type $Branch = { [$any]: $Any }
}
