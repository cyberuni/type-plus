import type { $Branch } from '../branch/$branch.js'

/**
 * Branch selector for type `never`.
 *
 * A named interface extending `$Branch<'$never'>`, not a string.
 * A predicate given `$Never.$Branch` resolves to it when `T` is `never`,
 * so the result for `never` can be told apart from `$then` and `$else`.
 *
 * @example
 * ```ts
 * type R = IsAny<never, $Never.$Branch> // $Never
 * ```
 */
export interface $Never extends $Branch<'$never'> {}

declare const $never: '$never'

export namespace $Never {
	export type $Key = '$never'

	/**
	 * Options to specifically handle the `never` type.
	 *
	 * A type whose options extend it lets the caller pick the result for `never`
	 * with the `$never` key.
	 *
	 * @example
	 * ```ts
	 * type R = IsAny<never, { $never: 'never' }> // 'never'
	 * ```
	 */
	export type $Options = { [$never]?: unknown }

	/**
	 * Branch option to specifically handle the `never` type.
	 *
	 * It sets `$never` to `$Never`, so a `never` input resolves to the `$Never` marker
	 * and can be handled apart from the other results.
	 *
	 * @example
	 * ```ts
	 * type R = IsAny<never, $Never.$Branch> // $Never
	 * type R = IsAny<1, $Never.$Branch> // false
	 * ```
	 */
	export type $Branch = { [$never]: $Never }

	/**
	 * Default option for the `$never` branch.
	 *
	 * Unsurprisingly, defaulting `$never` to `never`.
	 */
	export type $Default = { [$never]: never }
}

/**
 * Branch selector for type is not `never`.
 *
 * A named interface extending `$Branch<'$not_never'>`, not a string.
 *
 * It is used in [`IsNever`](../../never/is-never.ts).
 */
export interface $NotNever extends $Branch<'$not_never'> {}
