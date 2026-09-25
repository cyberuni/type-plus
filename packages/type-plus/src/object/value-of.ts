/**
 * ⚗️ *transform*
 *
 * The union of the property types of `T`.
 * The value-level counterpart of `keyof T`.
 *
 * @example
 * ```ts
 * type R = ValueOf<{ a: 1; b: 2 }> // 1 | 2
 * type R = ValueOf<{ a: number; b: string }> // number | string
 * type R = ValueOf<Record<string, boolean>> // boolean
 * ```
 */
export type ValueOf<T> = T[keyof T]
