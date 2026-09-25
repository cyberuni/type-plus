import type { UnionKeys } from '../union_keys.js'
import type { Omit } from './omit.js'
import type { Pick } from './pick.js'

/**
 * ⚗️ *transform*
 *
 * Makes every property of `T` optional, and also accepts `undefined` for it.
 *
 * Under `exactOptionalPropertyTypes`, the built-in `Partial<T>` makes a
 * property optional without letting it be set to `undefined`. This one adds
 * `| undefined` to each property, so the result works with or without the flag.
 *
 * @example
 * ```ts
 * type R = Partial<{ a: number }> // { a?: number | undefined }
 * ```
 */
export type Partial<T> = { [P in keyof T]?: T[P] | undefined }

/**
 * ⚗️ *transform*
 *
 * Applies `Partial<>` to the selected properties `U` and keeps the rest as declared.
 *
 * It distributes over a union `T`.
 *
 * @example
 * ```ts
 * type R = PartialPick<{ a: 1; b: 2; c: 3 }, 'a'>
 * // { b: 2; c: 3 } & { a?: 1 | undefined }
 * ```
 */
export type PartialPick<T, U extends UnionKeys<T>> = T extends T ? Omit<T, U> & Partial<Pick<T, U>> : never

/**
 * ⚗️ *transform*
 *
 * Keeps the selected properties `U` as declared and applies `Partial<>` to the rest.
 *
 * It distributes over a union `T`.
 *
 * @example
 * ```ts
 * type R = PartialOmit<{ a: 1; b: 2; c: 3 }, 'a'>
 * // { a: 1 } & { b?: 2 | undefined; c?: 3 | undefined }
 * ```
 */
export type PartialOmit<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Omit<T, U>> : never
