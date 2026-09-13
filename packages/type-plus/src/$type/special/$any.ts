import type { $Branch } from '../branch/$branch.js'

/**
 * Branch selector for type `any`.
 *
 * A named interface extending `$Branch<'$any'>`, not a string.
 */
export interface $Any extends $Branch<'$any'> {}

declare const $any: '$any'

export namespace $Any {
	export type $Key = '$any'
	/**
	 * Options to specifically handles the `any` type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options extends $Any.$Options> = ...
	 * ```
	 */
	export type $Options = { [$any]?: unknown }

	/**
	 * Branch option to specifically handles the `any` type.
	 *
	 * Use this to finely customize the behavior of your type.
	 *
	 * ```ts
	 * type YourType<T, $Options extends $Any.Options> = ...
	 *
	 * type R = YourType<T, $Any.$Branch> extends $Any ? HandleAny : HandleOthers
	 * ```
	 */
	export type $Branch = { [$any]: $Any }
}
