import type { $SelectInvert } from '../equal/equal.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `number`, `bigint`, nor their literals.
 *
 * This is `IsNotNumber` widened to `number | bigint`.
 * Special types are not numeric, so they resolve to `true`.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<'1'> // true
 * type R = IsNotNumeric<string> // true
 *
 * type R = IsNotNumeric<1> // false
 * type R = IsNotNumeric<1.1> // false
 * type R = IsNotNumeric<1n> // false
 * type R = IsNotNumeric<number> // false
 * type R = IsNotNumeric<bigint> // false
 *
 * type R = IsNotNumeric<any> // true
 * type R = IsNotNumeric<unknown> // true
 * type R = IsNotNumeric<never> // true
 * type R = IsNotNumeric<void> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not numeric, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<string, { selection: 'filter' }> // string
 * type R = IsNotNumeric<1, { selection: 'filter' }> // never
 * type R = IsNotNumeric<string | number, { selection: 'filter' }> // string
 * ```
 *
 * 🔢 *customize*
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<1 | string> // boolean
 * type R = IsNotNumeric<1 | string, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNumeric<string, IsNotNumeric.$Branch> // $Then
 * type R = IsNotNumeric<1, IsNotNumeric.$Branch> // $Else
 * ```
 */

export type IsNotNumeric<T, $O extends IsNotNumeric.$Options = {}> = $SelectInvert<T, number | bigint, $O>

export namespace IsNotNumeric {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
