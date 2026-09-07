import type { KeyTypes } from './KeyTypes.js'
import type { OptionalKeys } from './optional_key.js'

/**
 * ⚗️ *transform*
 *
 * The keys of `T` that are required, i.e. `keyof T` minus `OptionalKeys<T>`.
 *
 * Distributes over a union, so each member contributes its own required keys.
 *
 * @example
 * ```ts
 * type R = RequiredKeys<{ a: 1; b?: 2 }> // 'a'
 * type R = RequiredKeys<{ a: 1 } | { b: 2; c?: 3 }> // 'a' | 'b'
 * ```
 */
export type RequiredKeys<T extends Record<KeyTypes, any>> = T extends unknown ? RequiredKeys._<T> : never

export namespace RequiredKeys {
	export type _<T extends Record<KeyTypes, any>> = Exclude<keyof T, OptionalKeys<T>>
}
