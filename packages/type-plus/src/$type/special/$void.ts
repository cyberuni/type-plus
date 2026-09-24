import type { $Branch } from '../branch/$branch.js'

/**
 * Branch selector for type `void`.
 *
 * A named interface extending `$Branch<'$void'>`, not a string.
 * A predicate given `$Void.$Branch` resolves to it when `T` is `void`,
 * so the result for `void` can be told apart from `$then` and `$else`.
 *
 * @example
 * ```ts
 * type R = IsAny<void, $Void.$Branch> // $Void
 * ```
 */
export interface $Void extends $Branch<'$void'> {}

declare const $void: '$void'

export namespace $Void {
	export type $Key = '$void'

	/**
	 * Options to specifically handle the `void` type.
	 *
	 * A type whose options extend it lets the caller pick the result for `void`
	 * with the `$void` key.
	 *
	 * @example
	 * ```ts
	 * type R = IsAny<void, { $void: 'void' }> // 'void'
	 * ```
	 */
	export type $Options = { [$void]?: unknown }

	/**
	 * Branch option to specifically handle the `void` type.
	 *
	 * It sets `$void` to `$Void`, so a `void` input resolves to the `$Void` marker
	 * and can be handled apart from the other results.
	 *
	 * @example
	 * ```ts
	 * type R = IsAny<void, $Void.$Branch> // $Void
	 * type R = IsAny<1, $Void.$Branch> // false
	 * ```
	 */
	export type $Branch = { [$void]: $Void }

	/**
	 * Default option for the `$void` branch.
	 *
	 * Unsurprisingly, defaulting `$void` to `void`.
	 */
	export type $Default = { [$void]: void }
}
