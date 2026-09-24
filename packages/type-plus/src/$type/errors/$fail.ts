/**
 * Options for the `$fail` branch: the value a transform returns
 * when it cannot compute a result from its input,
 * such as `Add<number, 1>` or `StringToNumber<'x'>`.
 *
 * It replaces the positional `Fail` parameter of the transforms.
 *
 * @example
 * ```ts
 * type YourType<T, $O extends $StrictOptions<$O, YourType.$Options> = {}> = ...
 *
 * export namespace YourType {
 *   export interface $Options extends $Fail.$Options {}
 *   export interface $Default extends $Fail.$Default {}
 * }
 * ```
 */
export namespace $Fail {
	export type $Key = '$fail'

	/**
	 * Option to set the value returned when the transform fails.
	 */
	export interface $Options {
		$fail?: unknown
	}

	/**
	 * Default option for the `$fail` branch: `never`.
	 */
	export interface $Default {
		$fail: never
	}

	/**
	 * The `$fail` value of options `$O`, or `never` when `$O` leaves it out.
	 */
	export type _Resolve<$O> = '$fail' extends keyof $O ? $O['$fail' & keyof $O] : never
}
