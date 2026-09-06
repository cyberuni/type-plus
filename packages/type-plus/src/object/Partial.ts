import type { UnionKeys } from '../union_keys.js'
import type { Omit } from './omit.js'
import type { Pick } from './pick.js'

/**
 * An alternative `Partial<T>` type that works with `exactOptionalPropertyTypes`
 */
export type Partial<T> = { [P in keyof T]?: T[P] | undefined }

/**
 * Apply `Partial<>` on the selected properties.
 */
export type PartialPick<T, U extends UnionKeys<T>> = T extends T ? Omit<T, U> & Partial<Pick<T, U>> : never

/**
 * ⚗️ *transform*
 *
 * Keeps the selected properties `U` as declared and applies `Partial<>` to the
 * rest -- the same body as `PartialOmit`.
 *
 * @deprecated replaced by `PartialOmit`, which says what it does: the selected
 * keys are the ones kept, not the ones excluded. This alias is kept for the v7
 * migration and will be dropped.
 *
 * @example
 * ```ts
 * type R = PartialExcept<{ a: 1; b: 2; c: 3 }, 'a'>
 * // { a: 1; b?: 2 | undefined; c?: 3 | undefined }
 * ```
 */
export type PartialExcept<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Omit<T, U>> : never

/**
 * Apply `Partial<>` on all not selected properties.
 */
export type PartialOmit<T, U extends UnionKeys<T>> = T extends T ? Pick<T, U> & Partial<Omit<T, U>> : never
