/**
 * 🌪️ *filter*
 *
 * Filter the type `T` to ensure it is a union.
 *
 * @example
 * ```ts
 * type R = UnionType<'a' | 'b'> // 'a' | 'b'
 * type R = UnionType<boolean> // boolean
 * type R = UnionType<number> // never
 * ```
 */
export type UnionType<T, Then = T, Else = never> = UnionType.Device<T, Then, Else>

/**
 * 🎭 *predicate*
 *
 * Validate the type `T` is a union.
 *
 * @author Nurbol Alpysbayev
 * @see https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union
 *
 * @example
 * ```ts
 * type R = IsUnion<'a' | 'b'> // true
 * type R = IsUnion<boolean> // true
 * type R = IsUnion<number> // false
 * ```
 */
export type IsUnion<T, Then = true, Else = false> = UnionType.Device<T, Then, Else>

export namespace UnionType {
	export type Device<T, Then, Else, U = T> = (T extends unknown ? (U extends T ? 1 : 2) : never) extends 1 ? Else : Then
}
