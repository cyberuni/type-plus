/**
 * @deprecated renamed to `KeysOfOptional`
 */
export type KeyofOptional<T> = T extends Record<infer U, any> ? U : never

/**
 * ⚗️ *transform*
 *
 * Infers the key type of `T` as a record, i.e. the `K` in `Record<K, any>`.
 *
 * ⚠️ The name promises more than the implementation delivers. This does *not*
 * select the optional keys of `T`: for a record whose properties are all
 * required it returns the whole key union, and the moment any property is
 * optional the inference fails and it returns `never`. Use `OptionalKeys<T>`
 * for the optional keys, and `keyof T` for the key union.
 *
 * @example
 * ```ts
 * type R = KeysOfOptional<{ a: 1; b: 2 }> // 'a' | 'b'
 * type R = KeysOfOptional<Record<'x' | 'y', number>> // 'x' | 'y'
 *
 * type R = KeysOfOptional<{ a?: 1; b: 2 }> // never
 * ```
 */
export type KeysOfOptional<T> = T extends Record<infer U, any> ? U : never
