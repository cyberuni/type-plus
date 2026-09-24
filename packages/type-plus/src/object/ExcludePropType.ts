/**
 * ⚗️ *transform*
 *
 * Excludes the type `U` from the type of each property in `T`.
 *
 * @example
 * ```ts
 * type R = ExcludePropType<{ name: string; age: number | null }, null>
 * // { name: string; age: number }
 * ```
 */
export type ExcludePropType<T extends Record<keyof any, any>, U> = {
	[k in keyof T]: Exclude<T[k], U>
}
