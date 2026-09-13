import type { $Branch } from '../branch/$branch.js'

/**
 * Branch selector for type `void`.
 *
 * A named interface extending `$Branch<'$void'>`, not a string.
 */
export interface $Void extends $Branch<'$void'> {}

declare const $void: '$void'

export namespace $Void {
	export type $Key = '$void'

	/**
	 * Options to specifically handles the `void` type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options extends $Void.$Options> = ...
	 * ```
	 */
	export type $Options = { [$void]?: unknown }

	/**
	 * Branch option to specifically handles the `void` type.
	 *
	 * Use this to finely customize the behavior of your type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options $Void.$Options> = ...
	 *
	 * type R = YourType<T, $Void.$Branch> extends $Void ? HandleNever : HandleOthers

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
