import type { $SelectInvert } from '../equal/equal.js'

/**
 * Is `T` not a `Function`.
 *
 * ```ts
 * type R = IsNotFunction<Function> // false
 * type R = IsNotFunction<() => void> // false
 * type R = IsNotFunction<(() => void) | { a: 1 }> // false
 *
 * type R = IsNotFunction<{ a: 1 }> // true
 * type R = IsNotFunction<never> // true
 * ```
 */

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `Function` nor function signature.
 *
 * @example
 * ```ts
 * type R = IsNotFunction<Function> // false
 * type R = IsNotFunction<() => void> // false
 *
 * type R = IsNotFunction<never> // true
 * type R = IsNotFunction<unknown> // true
 * type R = IsNotFunction<number> // true
 *
 * type R = IsNotFunction<Function | number> // boolean
 * type R = IsNotFunction<(() => string) | number> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `Function` nor function signature, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotFunction<Function, { selection: 'filter' }> // never
 * type R = IsNotFunction<() => void, { selection: 'filter' }> // never
 *
 * type R = IsNotFunction<never, { selection: 'filter' }> // never
 * type R = IsNotFunction<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotFunction<Function | number, { selection: 'filter' }> // number
 *
 * type R = IsNotFunction<(() => string) | number, { selection: 'filter' }> // number
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = IsNotFunction<Function | 1> // boolean
 * type R = IsNotFunction<Function | 1, { distributive: false }> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotFunction<Function, IsNotFunction.$Branch> // $Else
 * type R = IsNotFunction<string, IsNotFunction.$Branch> // $Then
 * ```
 */
export type IsNotFunction<T, $O extends IsNotFunction.$Options = {}> = $SelectInvert<T, Function, $O>

export namespace IsNotFunction {
	export type $Options = $SelectInvert.$Options
	export type $Default = $SelectInvert.$Default
	export type $Branch = $SelectInvert.$Branch
}
